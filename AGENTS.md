<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# hermanpr.dev v2

Single-page portfolio (live at hermanpr.dev). Next.js 16.2.12 (App Router, Turbopack default) · React 19 · TypeScript 5.9 strict · Tailwind CSS v4 (CSS-first — there is no `tailwind.config.*`; the theme lives in `src/app/globals.css` via `@theme`). Package manager: npm. Node >= 22.18 required — `scripts/check-*.mjs` import `.ts` files relying on Node's built-in type stripping.

Deliberately minimal dependencies: no UI/animation/state libraries. Runtime deps beyond the framework are only `lucide-react`, `clsx`, `tailwind-merge`, `@next/third-parties`, `@vercel/analytics` + `@vercel/speed-insights`. Keep it that way.

## Commands

- `npm run dev` — dev server (never add `--turbopack`; it is the Next 16 default)
- `npm run verify` — **the gate**: `tsc --noEmit && eslint . && check-tokens && check-anchors && check-duration && next build`. Run before declaring any task done.
- `npm run typecheck` / `npm run lint` — individual steps (`next lint` no longer exists in Next 16; lint is bare eslint)
- `npm run check:duration` — `node:assert` checks for `src/lib/duration.ts`; the closest thing to unit tests. There is no test framework. It also asserts total career length stays in [120, 144) months — around late 2027 this starts failing `verify` **by design** (staleness alarm: revisit the "decade" copy and the bounds; do not patch `duration.ts` to silence it).
- `npm run icons:generate` — rebuilds the `public/` PWA icons from a 1024px master (Next's vendored `@vercel/og` + `sharp`). Not part of `verify`. Its hardcoded `rgb()` literals are deliberate — Satori resolves no CSS variables and `check-tokens` scans only `src/` — do not "fix" them into tokens.
- Lighthouse: `npm run build && npm start`, then `npm run lh:mobile` / `npm run lh:desktop` (reports land in `.next/lighthouse/`, wiped by each build). Never audit the dev server — if `/tokens` returns 200 you are on dev and every number is wrong.
- Prettier (+ `prettier-plugin-tailwindcss`) is editor-only: no format script, not in `verify`.

## Token contract (strongest rule in the repo)

Every colour, type-size, radius, shadow, and border class string lives **only** in `src/design/tokens.ts`. Files under `src/components/sections/`, `src/components/data-display/`, and `src/app/page.tsx` must never hand-write such utilities (20 prefixes incl. `ring-` `from-/via-/to-` `fill-` `stroke-` — authoritative list is `BANNED_PREFIXES` in `scripts/check-tokens.mjs`; text-*flow* utilities like `text-center`/`text-balance` are allowlisted) — `scripts/check-tokens.mjs` fails `verify` if they do. Separately, **everywhere** under `src/` (every `.ts`/`.tsx`, primitives included): no hex literals, no `oklch()`, and no Tailwind arbitrary values — `p-[13px]` fails `verify`; snap to the nearest scale step.

- Adding a token key: only the `typography` and `components` maps are mirrored key-for-key in `DESIGN.md`'s YAML front matter — edit both sides or `check-tokens.mjs` breaks the build. `overrides`/`layout`/`typographyResponsive` are **not** diffed against DESIGN.md, but `typographyResponsive` must expose exactly the same key set as `typography` (a separate hard gate in the same script).
- `src/components/primitives/` is exempt by design — a primitive is where a token becomes a className.
- Layout utilities (grid, flex, gap, column counts) are deliberately hand-written in section files; only the token categories above are restricted.
- Restyle procedure: edit strings in `tokens.ts`; for typeface changes edit the `next/font/google` loaders in `src/app/fonts.ts` — the three `--font-*` lines in `globals.css` are only aliases of those loaders. Then `npm run verify`.

## Architecture

- **One route (`/`).** Sections are in-page anchors, composed in fixed order in `src/app/page.tsx`. The only other route is `src/app/llms.txt/route.ts` — a `force-static` text handler deriving `/llms.txt` from the content layer. No dynamic API routes, no server actions, no middleware/proxy, no dynamic segments. `src/app/(dev)/tokens` is a dev-only token gallery (`notFound()` in production). Metadata is code, not static files: `manifest.ts`, `robots.ts`, `sitemap.ts`, `opengraph-image.tsx` live in `src/app/` alongside `not-found.tsx` and `fonts.ts` — never add `robots.txt`/`sitemap.xml` to `public/`.
- **Five dirs under `src/components/`** — four tiers: `primitives/` (token-aware building blocks; hand-rolled `Slot` powers `asChild` composition) → `data-display/` (one card per data type) → `sections/` (one per page band) → `islands/`, plus `icons/brand/` (hand-rolled GitHub/X SVGs — lucide ships no brand icons). Exactly **three `"use client"` files** exist: `islands/mobile-nav.tsx`, `islands/copy-button.tsx`, `app/global-error.tsx`. Interactivity is CSS/native-HTML first: native `<dialog>` mobile nav (no React state), native `<details name>` FAQ accordion (zero JS), keyframe animations in `globals.css` (hero terminal typewriter + blink, wave, copy-button icon pop) — all behind `motion-safe:`; the `marquee`/`sheet-*`/`fade-out` `@theme` entries are currently unreferenced by any TSX.
- **Content layer:** all copy lives in `src/content/*.ts`, typed via `as const satisfies` against `src/content/types.ts`. `SECTION_IDS` plus the `Href` template type make a dead anchor a compile error. `src/content/` **never imports from `src/components/`** — content stores plain strings (`icon: "github"`); a lookup map in the consuming component turns the string into a component — `CAPABILITY_ICONS` (`primitives/icon.tsx`), `GLYPHS` (`sections/hero.tsx`), `BRAND_GLYPHS` (`sections/site-footer.tsx`; keyed by the footer link's *label*, so renaming a label silently drops its icon). Content files do import images (static imports → `StaticImageData`). `check-anchors.mjs` closes the runtime gap in three passes: every `#hash` in content resolves to a rendered id, every `SECTION_ID` actually renders, **and** every `SECTION_ID` is linked from somewhere in `src/content/` (orphan check — `hero` is the sole allowlisted exception).
- **`src/lib/`:** `cn.ts` (clsx+twMerge), `now.ts` (`NOW` — the only permitted `new Date()`, prevents hydration mismatch), `duration.ts` (kept import-free so the check script can load it), `json-ld.ts`, `llms.ts` (builds `/llms.txt` from content).
- **Images:** always static imports from `src/assets/`; `sizes` is required on `ProjectCard` (no default — only the layout knows the slot). `public/` holds only PWA icons and the CV PDF.
- **No dark mode.** `colorScheme` is hard-set to light; "dark" is two dark surfaces (footer band, hero terminal) with their own measured-contrast token sets.

## Gotchas

- The `nextjs-agent-rules` block at the top of this file is machine-managed — project text stays outside the markers.
- **Code comments are load-bearing spec**: measured contrast ratios, WCAG target sizes, browser quirks (Safari/VoiceOver, iOS overscroll, `<dialog>` UA styles), and explicit "never do X" rules. Do not strip or "clean up" these comments. References to `PHASE-*.md` (e.g. in `next.config.ts`) point at the build journal deleted in commit `ecdad38` — it exists only in git history now.
- `role="list"` on `ul`/`ol` is intentional (Tailwind preflight breaks list semantics in Safari/VoiceOver); `eslint.config.mjs` is configured to allow it. The same config raises eight `jsx-a11y` rules to error and switches two of them off for `islands/` only (the `<dialog>` backdrop light-dismiss pattern).
- `next.config.ts` is deliberately minimal and effectively frozen: the CSP omits `script-src` on purpose (a nonce CSP would force dynamic rendering); `outputFileTracingIncludes` bundles the OG-image font — `/opengraph-image` 500s without it; `reactCompiler` and `viewTransition` stay off.
- Env: exactly one variable, `GOOGLE_ANALYTICS_ID` (read server-side in `layout.tsx`; deliberately not `NEXT_PUBLIC_`).
- This repo does **not** enable `cacheComponents` — for caching questions read `node_modules/next/dist/docs/01-app/02-guides/caching-without-cache-components.md`. For "does this API still exist" questions read `.../01-app/02-guides/upgrading/version-16.md` first.
