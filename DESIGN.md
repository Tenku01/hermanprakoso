---
version: "1.0"
name: hermanpr.dev
target: Tailwind CSS v4
description: The as-built design system of hermanpr.dev — a single-page portfolio on a white canvas with near-black actions, Bricolage Grotesque display type, an emerald-only accent, and exactly two dark surfaces (hero terminal, footer). Every value is a stock Tailwind v4 class; the executable copy is src/design/tokens.ts, and the typography/components key sets below are machine-checked against it by scripts/check-tokens.mjs.

colors:
  primary: neutral-900
  primary-hover: neutral-800
  primary-press: neutral-700
  ink: neutral-900
  body: gray-700
  muted: gray-500
  hairline: gray-200
  hairline-strong: gray-300
  canvas: white
  surface-soft: gray-50
  surface-card: neutral-100
  surface-dark: neutral-950
  surface-dark-elevated: neutral-900
  disabled-surface: gray-200
  disabled-text: gray-500
  on-primary: white
  on-dark: white
  on-dark-soft: zinc-400
  on-dark-hover: zinc-100
  accent: emerald-500
  accent-on-dark: emerald-400
  dot-muted: gray-400
  avatar-orange: orange-400
  avatar-pink: pink-500
  avatar-violet: violet-600
  avatar-emerald: emerald-400

typography:
  display-xl: "font-display text-6xl font-bold leading-none tracking-tight"
  display-lg: "font-display text-5xl font-bold leading-none tracking-tight"
  display-md: "font-display text-4xl font-bold leading-tight tracking-tight"
  display-sm: "font-display text-3xl font-bold leading-tight tracking-normal"
  title-lg: "text-2xl font-semibold leading-tight tracking-tight"
  title-md: "text-lg font-semibold leading-snug"
  title-sm: "text-base font-semibold leading-snug"
  body-md: "text-base font-normal leading-normal"
  body-sm: "text-sm font-normal leading-normal"
  caption: "text-xs font-medium leading-snug"
  code: "font-mono text-sm font-normal leading-normal"
  button: "text-sm font-semibold leading-none"
  nav-link: "text-sm font-medium leading-snug"

rounded:
  focus-inline: rounded-sm
  inline: rounded-md
  control: rounded-lg
  card: rounded-xl
  frame: rounded-2xl
  pill: rounded-full
  avatar: rounded-full

spacing:
  band: 24
  band-compact: 12
  cta-card: 12
  card-lg: 8
  card-sm: 6
  gutter: 6
  footer-gap: 10

components:
  button-primary: "bg-neutral-900 text-white text-sm font-semibold leading-none px-5 py-3 h-10 rounded-lg"
  button-secondary: "bg-white text-neutral-900 border border-gray-200 text-sm font-semibold leading-none px-5 py-3 h-10 rounded-lg"
  button-icon-circular: "bg-white text-neutral-900 border border-gray-200 size-9 rounded-full"
  button-text-link: "bg-transparent text-neutral-900 text-sm font-semibold leading-none"
  text-link: "bg-transparent text-neutral-900 text-base font-normal leading-normal"
  top-nav: "bg-white text-neutral-900 text-sm font-medium leading-snug h-16"
  nav-pill-group: "bg-gray-50 text-neutral-900 text-sm font-medium leading-snug p-1.5 rounded-full"
  feature-card: "bg-neutral-100 text-neutral-900 rounded-xl p-8"
  feature-icon-card: "bg-white text-neutral-900 border border-gray-200 rounded-xl p-6"
  category-tab: "bg-transparent text-gray-500 text-sm font-medium leading-snug px-3.5 py-2 rounded-lg"
  avatar-circle: "bg-neutral-100 text-neutral-900 size-9 rounded-full"
  badge-pill: "bg-neutral-100 text-neutral-900 text-xs font-medium leading-snug px-3 py-1 rounded-full"
  footer: "bg-neutral-950 text-zinc-400 text-sm font-normal leading-normal py-16"
---

## Overview

hermanpr.dev is one page: nine in-page bands composed in fixed order in `src/app/page.tsx`, a sticky white header above them, and a dark footer that closes the scroll. The system is near-monochrome — near-black actions and ink on a white canvas, grey support text, light-grey cards — with **emerald as the only accent** (availability signals and the terminal's status lines). Display type is **Bricolage Grotesque** at `font-bold`; everything else is **Geist**; the hero terminal and browser-frame chrome are **Geist Mono**.

The page is light-only: `colorScheme` is hard-set to light, there is no dark mode and no `dark:` utility anywhere in `src/`. Exactly **two dark surfaces** exist — the footer and the hero terminal card — plus the transient mobile-menu backdrop. Both dark surfaces are deliberate, scarce signals; adding a third needs a reason as strong as theirs.

This file is the spec; the executable copy is `src/design/tokens.ts`. The `typography:` and `components:` maps in the front matter are mirrored key-for-key against that file by `scripts/check-tokens.mjs`, which fails `npm run verify` on any added, missing or renamed key. The rationale comments inside `tokens.ts` (contrast measurements, calibration notes) are part of this spec, not decoration.

## Colour

Every colour is a stock Tailwind v4 palette entry, used via `bg-`, `text-`, or `border-`. The system deliberately mixes two grey families: text uses the cool-tinted `gray-*` scale (`gray-700` body, `gray-500` muted) while surfaces use the pure `neutral-*` scale (`neutral-100` cards, `neutral-900` actions, `neutral-950` dark surfaces). The faint blue cast of body text against pure-grey surfaces is part of the look — don't collapse the families.

### Roles

- **Action ladder** — `neutral-900` rest, `neutral-800` hover, `neutral-700` press. Press sits one step past hover because a press state that matches hover is invisible while the pointer is on the button.
- **Ink / body / muted** — `neutral-900` headlines, `gray-700` running text, `gray-500` secondary text (usage rules below).
- **Surfaces** — `white` canvas, `gray-50` soft bands and the nav pill group, `neutral-100` grey cards, `neutral-950` the two dark surfaces, `neutral-900` elevated-on-dark (the footer availability pill).
- **Hairlines** — `gray-200` borders on light surfaces; `gray-300` for the secondary button's hover border and the browser-frame dots; `white/10` for dividers on dark surfaces (a solid grey line on near-black reads as a gap between panels, not a divider).
- **Accent** — `emerald-500` on light (availability dot), `emerald-400` on dark (terminal status/glyphs). Nothing else is allowed to carry accent colour; the action layer stays monochrome.
- **Avatar tones** — `orange-400`, `pink-500`, `violet-600`, `emerald-400` initial-chip fills, the only place pastels appear.

### Measured contrast rules (hard rules, not guidance)

`gray-500` is the tightest tone in the system and carries three bans, all from measurement:

1. **White surfaces only.** `gray-500` measures 4.83:1 on `white` (passes WCAG AA's 4.5:1 with almost no margin) but **4.43:1 on `neutral-100` — fail**. On grey cards, meta text takes `gray-700` (9.45:1 there) instead. `card-meta` is therefore a white-surface key.
2. **Never below `text-sm`.** At 12px, 4.84:1 is the difference between readable and strained — `caption-muted` and `trust-caption` use `gray-700` (10.3:1 on white). The `Text` primitive makes `caption` + `tone="muted"` a compile error.
3. **Never on dark surfaces.** On `neutral-950`, `gray-500` measures **4.1:1 — fail**. Muted tones inside the terminal or footer come from `zinc-400`.

On `neutral-950`, measured: `zinc-400` **7.5:1** (AA and AAA at any size), `white` **19.8:1**, `emerald-400` **11.4:1**, `emerald-500` only 8.0:1 — which is why the accent steps from 500 (light surfaces) to 400 (dark) for margin at `text-sm`.

Avatar tone foregrounds are chosen by measurement, not taste. Dark ink beats white on three of four: `orange-400` 7.54:1 (white 2.38), `pink-500` 5.00:1 (white 3.58), `emerald-400` 9.25:1 (white 1.94). On `violet-500` neither ink (4.07) nor white (4.40) reaches AA, so the fill itself is `violet-600`, where white measures **5.89:1** — the one place the palette moved a step for legibility.

## Typography

### Faces

| Role | Face | Loader | Notes |
|---|---|---|---|
| `font-display` | **Bricolage Grotesque** | `next/font/google`, variable `--font-bricolage`, axis `opsz` 12–96 | Optical sizing lets one file render correctly at 60px and 30px with no per-size hacks |
| `font-sans` | **Geist** | `next/font/google`, variable `--font-geist` | Body default on `<body>` |
| `font-mono` | **Geist Mono** | `next/font/google`, variable `--font-geist-mono`, `preload: false` | Terminal + browser-frame URL; not preloaded to keep mobile to two font fetches |

Loaders live in `src/app/fonts.ts`; `globals.css` maps them with `@theme inline`. The `inline` keyword is required — plain `@theme` emits a var-to-var indirection that resolves to nothing once the font classes move off `<html>`. Geist and Geist Mono share a cap height of 0.710em and x-height of 0.530em exactly, so inline `<code>` sits on the same optical line as body text with no size compensation.

### Display weight is `font-bold` — never `font-semibold`, never heavier

Bricolage's cap height is 0.660em — at identical `font-size` its capitals render ~7–9% smaller than the humanist sans faces this layout was scaled around, so weight 600 reads measurably lighter than intended. 700 restores the presence; 800 tips into bombast; **`font-black` is banned outright** — Bricolage's `wght` axis stops at 800, so 900 produces synthetic (fake) bolding. One weight across all four display sizes. When in doubt about emphasis: bigger before bolder.

### Tracking is size-conditional

| Size | Tracking |
|---|---|
| `display-xl` / `display-lg` / `display-md` (60/48/36px) | `tracking-tight` |
| `display-sm` (30px) | `tracking-normal` |

At 30px the `opsz` axis has already widened the fitting and opened the counters; layering −0.025em on top undoes that compensation. At 36px and above the axis tightens the drawing, so negative tracking reinforces it. `tracking-tighter` is banned at every size.

### The ladder

The 13 `typography` tokens in the front matter are the complete type system. Sizes: 60 · 48 · 36 · 30 · 24 · 18 · 16 · 14 · 12. Tailwind's `text-*` classes carry their own default line-height, so every token writes `leading-*` after `text-*` — keep that order when editing values. The boundary is strict: display headlines are always `font-display`; body, buttons, nav and captions are always `font-sans`; never blur it.

Components consume `typographyResponsive`, not `typography` — same 13 keys (a hard gate in `check-tokens.mjs`), but the four display sizes carry their mobile-to-desktop steps inside the class string, so **no call site ever writes a breakpoint prefix for type size**:

| Token | Responsive string |
|---|---|
| `display-xl` | `font-display text-3xl md:text-5xl lg:text-6xl font-bold leading-none tracking-tight` |
| `display-lg` | `font-display text-3xl md:text-4xl lg:text-5xl font-bold leading-none tracking-tight` |
| `display-md` | `font-display text-2xl md:text-4xl font-bold leading-tight tracking-tight` |
| `display-sm` | `font-display text-2xl md:text-3xl font-bold leading-tight tracking-normal` |

## Layout & band rhythm

- **Container:** `max-w-7xl` (1280px) with `px-4 sm:px-6 lg:px-8`, via the `container` override. 7xl was chosen over 6xl so the hero terminal and project cards render larger; inner text caps (`max-w-xl`–`max-w-4xl`) keep line lengths readable.
- **Base unit:** Tailwind's 4px. Steps in use: 1 · 1.5 · 2 · 3 · 4 · 6 · 8 · 10 · 12 · 16 · 24.
- **Band padding:** `py-24` (`band-padding`); `py-12` (`band-padding-compact`) where a band needs to sit tighter.

### Band order and surfaces

| # | Band | id | Surface |
|---|---|---|---|
| — | Header | — | white, sticky, `h-16` |
| 1 | Hero (+ trust bar) | `hero` | canvas |
| 2 | Services | `services` | soft |
| 3 | Work | `work` | canvas |
| 4 | About | `about` | soft |
| 5 | Stack | `stack` | canvas |
| 6 | Experience | `experience` | soft |
| 7 | Testimonials | `testimonials` | canvas |
| 8 | FAQ | `faq` | soft |
| 9 | Contact | `contact` | canvas |
| — | Footer | — | dark (`neutral-950`) |

**Rule: never two consecutive bands with the same surface colour.** The strict canvas/soft alternation is the page's pacing, and the dark footer is its full stop. This is why the trust bar renders *inside* the hero band (separated by a `hairline-top`) rather than as its own band — a second consecutive canvas band would break the rhythm.

### The six layout tokens

Only the responsive collapses this spec names are tokenised, in the `layout` export: `hero-grid` (12-col, 7/5 split via `hero-col-content` / `hero-col-mockup`), `feature-grid-3` (1 → 2 → 3 columns), `feature-grid-2` (1 → 2), `footer-grid` (1 → 2 → 4). Every other grid, flex and gap utility is hand-written in section files on purpose — layout beyond these six is **outside the token contract**, and a future change to the band grid system will require section edits.

## Radius & elevation

| Role | Class | Use |
|---|---|---|
| Focus inline | `rounded-sm` | Default radius on `focus-ring-inline` so inline-link outlines aren't hard rectangles |
| Inline | `rounded-md` | Browser-frame URL pill |
| Control | `rounded-lg` | Buttons, browser frame, FAQ summary outline (`control-radius`) |
| Card | `rounded-xl` | All cards |
| Frame | `rounded-2xl` | Terminal frame, about-photo frame |
| Pill / avatar | `rounded-full` | Nav pill group, badges, avatars, dots, icon buttons |

Elevation is nearly flat: hairline borders on white cards, no shadow on grey cards, and a single `shadow-md` on the terminal frame. Never go above `shadow-md`; no neumorphism, no glassmorphism. Two structural rules:

- **A card is either grey with no border, or white with a `gray-200` border — never a grey surface with a border on top.**
- **Dark surfaces are borderless.** On near-black, contrast does the elevation work and a border reads as a seam; separation inside them comes from `white/10` hairlines.

## Components

Class strings live in the front matter above and in `src/design/tokens.ts` — the body of this spec references keys and never re-quotes strings, so there is exactly one copy to drift.

### Header

Sticky `top-nav` (white, `h-16`) with a `hairline-bottom`. Left: the wordmark (`wordmark` — display face at `font-semibold`, the one non-bold display use, because at 18px bold Bricolage reads clenched). Center, from `md:`: `nav-pill-group` — a `gray-50` `rounded-full` wrapper holding `category-tab` links (Services, Work, About, Experience, Testimonials). Right: CV `button-text-link` (from `lg:`) and the primary CTA (from `md:`).

The "current section" highlight is not a class: each band publishes a CSS view timeline and the matching label runs the `nav-current` colour animation in `globals.css` (with a `:target` fallback for engines without scroll timelines). Hover ink comes from `category-tab-hover`.

### Hero & terminal

7/5 split (`hero-grid`). Content column: avatar + `badge-pill` eyebrow, the `display-xl` h1 (with the waving 👋, see Motion), `hero-subhead` (the only 18px-normal-muted text in the system — no ladder token is 18px + normal + muted), primary + secondary buttons, location row, availability row (`availability-dot` emerald with an `animate-ping` ring while available, `availability-dot-muted` grey otherwise), social icons.

The mockup column is `terminal-frame` — the site's second dark surface and the hero's brand artifact: a CLI transcript typed out character by character. It reuses the footer's surface family: `neutral-950` ground, `zinc-400` soft text, `white/10` hairline bar, borderless. Line tones: commands `white`, status/glyphs `emerald-400`. The three bar dots are monochrome `white/15`, not traffic-light colours — decoration must not compete with the page's single accent. The §Colour dark-surface rules apply verbatim: no `gray-500`-based token may appear inside it.

The trust bar closes the hero band under a `hairline-top`: `trust-caption` (12px uppercase, `gray-700` per the contrast floor) over six client logos. The three `client-logo*` heights (20/24/28px) were set by rendering every mark at a common height, measuring its wordmark ink, and scaling to a shared 70% cap — the step is stored per mark in `TRUST_BAR.marks`, not derived at render time. **Change one height and re-measure all three.**

### Buttons & links

Four button variants, all from the `Button` primitive: `button-primary`, `button-secondary`, `button-icon-circular`, `button-text-link`. Interactive states are **prefixed delta keys**, not separate full recipes: `button-primary-hover` (`neutral-800`), `button-primary-press` (`neutral-700`), `button-secondary-hover` (`gray-50` fill + `gray-300` border), `button-disabled`. The primary ladder exists because hover occupies the old press colour — see §Interaction states.

Touch targets: `button-icon-circular` is 36px and reserved for non-tappable/compact contexts; anything actually tappable uses `button-icon-touch` (`size-11`, 44px — the WCAG minimum). The copy buttons in Contact are the live consumer.

Inline links: `text-link` (via the `Link` primitive) for prose links; `contact-link` adds a **permanent** `underline underline-offset-4` — a link distinguished from surrounding body copy by colour alone fails WCAG 1.4.1 (Use of Colour), so the underline never moves to hover-only. Hover adds a colour shift on top (`link-hover`); it never carries the distinction by itself.

### Cards

Two card surfaces, one primitive (`Card`):

- **muted** = `feature-card` — `neutral-100`, no border, `p-8`. Services capabilities, stack groups, testimonials, the contact CTA.
- **outlined** = `feature-icon-card` — white, `gray-200` border, `p-6`. Project cards, experience rows.

Padding variants ride `className` and win via `twMerge`: **the testimonial card is the muted surface at `p-6`; the contact CTA card is the muted surface at `p-12`.** Grey cards signal editorial claims; white outlined cards signal artifacts (real screenshots, real dates).

Meta text on cards follows the §Colour rule: `card-meta` (`gray-500`) only on white cards; on `neutral-100` use `body-sm` with its `gray-700` default.

### Browser frame

Project screenshots sit inside `browser-frame` — fake, `aria-hidden` browser chrome: `rounded-lg` `gray-200` border, `h-9` `gray-50` bar with three `gray-300` dots, and a mono URL pill (`browser-frame-url`, `gray-700` per the 12px floor). The frame is the "this is a real shipped product" signal; screenshots stay 16:9.

### Badges, avatars, logos, dates

- `badge-pill` — section eyebrows and project stack chips.
- `avatar-circle` — `size-9` circle: photo, or initials over one of the four measured `avatar-tone-*` fills.
- `tech-logo*` — three height tiers (24/32/40px against the fixed 40px `tech-logo-slot`) assigned by aspect ratio, because a single height makes wide marks read ~85% larger than tall ones (apparent size ≈ √(width × height)). The tiers were measured together — **change one and re-measure all four.**
- `company-logo` — experience wordmarks in a fixed 128×40 `object-contain object-left` box, so a 4.4:1 wordmark doesn't render at twice the width of its neighbours.
- `date-range` — `tabular-nums` so the three right-aligned experience date columns align digit-for-digit; `gray-700` because a tenure is information, not fine print.

### Footer family

`footer` is the page's full stop: `neutral-950`, `zinc-400` body, `py-16`, on the 4-column `footer-grid`. Inside it: `wordmark-dark`, `footer-heading` (white), `footer-link` + `footer-link-hover` (`zinc-100`), `footer-divider` (`white/10`) above the copyright line, and `availability-pill-dark` — a `neutral-900` pill that deliberately sets no text colour, inheriting the footer's `zinc-400` so its label can set its own tone.

### Mobile sheet

Below `md:` the nav is a native `<dialog>` bottom sheet (no React open state). Its backdrop is `sheet-backdrop` (`neutral-950/40` — a `::backdrop` inherits nothing, so its colour can only live here). The sheet reuses `category-tab` for links and the standard primary/secondary buttons for actions.

### Focus & skip

The spec documents focus states because keyboard users need them: `focus-ring` (2px `neutral-900` outline, offset 2) on light surfaces, `focus-ring-dark` (white) on dark, `focus-ring-inline` (adds `rounded-sm`; a caller's own radius wins via `twMerge`) on inline links. `skip-link` is the sr-only-until-focused jump to `#main`.

## Motion

All motion is CSS — keyframes and utilities in `globals.css`, applied behind `motion-safe:`; a global reduced-motion kill switch zeroes durations (including the FAQ's `::details-content` slide).

| Animation | Consumer | Notes |
|---|---|---|
| `wave` | Hero 👋 | Runs 3× on load, replays on hover; `wave-origin` pivots at the wrist (70%/70%), not the glyph centre |
| `typewriter-*` | Terminal lines | Per-line reveal: width animates 0 → `chars × 1ch` with `steps(chars)`, driven by `--typewriter-delay/duration/steps` custom properties `TerminalFrame` sets inline. `backwards` fill (not `both`) on purpose: Geist Mono loads `preload: false`, and a persisted end width would freeze a `ch` value snapshotted against the fallback font |
| `terminal-blink` | Terminal cursor | `step-end` — the hard on/off is what reads as a cursor |
| `icon-pop` | Copy button ✓ | Overshoots to 1.15 before settling; a plain scale-to-1 reads as a fade, not a confirmation |
| `animate-ping` (built-in) | Availability dot | Only while available |
| `::details-content` transition | FAQ accordion | `interpolate-size: allow-keywords`; Chromium animates, elsewhere it snaps — acceptable degradation |
| `nav-current` | Header labels | Scroll-driven view-timeline scroll-spy; `:target` fallback for Firefox / reduced motion |

Reserve keyframes — defined in `@theme`, unreferenced by any TSX: `sheet-in`, `sheet-out`, `fade-out`, `marquee` (the mobile sheet uses discrete transitions instead; there is no marquee). `fade-in` looks unreferenced too but is consumed inside the typewriter utilities.

## Interaction states

Hover feedback follows three hard rules:

1. **Colour (or opacity) shifts only.** No `hover:scale-*`, no `hover:-translate-*`, no `hover:shadow-*`. Nothing moves, lifts, or grows.
2. **Every hover token carries its own `transition-colors`.** The reduced-motion kill switch zeroes the transition; Tailwind v4 gates `hover:` behind `@media (hover: hover)`, so touch devices never see a stuck state.
3. **Hover never carries meaning alone.** Underlines that distinguish links stay permanent; hover only reinforces.

| Key | Consumers |
|---|---|
| `button-primary-hover` | Primary buttons |
| `button-secondary-hover` | Secondary + icon buttons |
| `link-hover` | Nav/inline links, text-link buttons, social icons (light) |
| `category-tab-hover` | Header nav pills |
| `footer-link-hover` | Footer links, social icons (dark) |
| `wordmark-hover` | Header wordmark — opacity, not colour: it is already ink-black, and a grey step would read as a weight change |

Because hover took `neutral-800`, press moved one step further down the ladder: rest `900` → hover `800` → press `700`. The copy button's `icon-pop` is a state-change confirmation, not a hover — same feedback budget, different trigger.

## Accessibility rules

The consolidated hard rules, each grounded in a measurement or WCAG criterion above:

- `gray-500` only on white, never below `text-sm`, never on dark surfaces (§Colour).
- Muted terminal/footer text is `zinc-400`; the accent on dark is `emerald-400`, not 500.
- Tappable targets are ≥ 44px (`button-icon-touch`, social links, trust-bar links); the 36px `button-icon-circular` is for non-tappable/compact contexts only.
- Links inside body copy carry a permanent underline (WCAG 1.4.1).
- Every focusable element gets a visible `focus-visible` outline from the `focus-ring` family; the page starts with `skip-link`.
- `colorScheme` stays `light` — the two dark surfaces are content, not a theme.

## Do / Don't

**Do**

- Keep the action layer monochrome: `neutral-900` buttons, `neutral-900` ink.
- Put every display headline in `font-display font-bold`; body in `font-sans`. Bigger before bolder.
- Alternate band surfaces; end with the dark footer.
- Show real artifacts — screenshots in browser frames, real dates, real logos — instead of decoration.
- Measure contrast before introducing any new tone/surface pair; record the ratio in `tokens.ts`.

**Don't**

- Don't add a third dark surface, or accent colour on any CTA.
- Don't use `font-extrabold`/`font-black` or `tracking-tighter` anywhere.
- Don't exceed `rounded-2xl` or `shadow-md`.
- Don't put two same-surface bands in a row.
- Don't move, lift, or grow anything on hover.
- Don't hand-write colour/type/radius/shadow/border utilities in sections or data-display files, and never write hex, `oklch()`, or arbitrary values (`p-[13px]`) anywhere in `src/` — `check-tokens` fails the build.

## Responsive behavior

Tailwind's default breakpoints, unmodified.

| Range | What changes |
|---|---|
| < `md` | Header collapses to the dialog sheet; hero stacks (content first, terminal below); all grids 1-up; footer single column |
| ≥ `md` | Pill nav + CTA appear; `feature-grid-3` → 2-up, `feature-grid-2` → 2-up; hero still stacked; footer 2-col |
| ≥ `lg` | Hero 7/5 split; 3-up grids complete; CV link appears; footer 4-col |
| ≥ `xl` | Only outer margin grows — content is capped at `max-w-7xl` |

Display type never changes at call sites — the ladder lives inside `typographyResponsive`. Images are static imports; `ProjectCard` requires an explicit `sizes` (only the layout knows the slot); screenshots keep 16:9; avatars stay circles.

## Iteration guide

1. **Restyle** = edit class strings in `tokens.ts`. **Typeface change** = edit the loaders in `src/app/fonts.ts` (the three `--font-*` lines in `globals.css` are aliases of them). Then `npm run verify`.
2. **The check-tokens contract:** the front matter's `typography:` and `components:` blocks must open this file and mirror the `tokens.ts` exports key-for-key — keys exactly 2-space indented, block headers at column 0. Values aren't diffed, but keep them byte-identical to `tokens.ts`: the script detects renames by matching values, and a drifted copy disarms that. `typographyResponsive` must expose exactly the `typography` key set. `overrides` and `layout` are not machine-checked.
3. **Adding or removing a key** = edit `tokens.ts` and this front matter in the same change.
4. The body of this spec references token keys and never repeats class strings — keep it that way; a second copy is a copy that drifts.
5. When a value needs a why (a ratio, a calibration, a browser quirk), the why lives as a comment next to the value in `tokens.ts`.

## Appendix — overrides & layout index

Purpose index for the keys outside the machine-checked maps. Class strings and their rationale comments live in `src/design/tokens.ts`.

### `overrides` (70)

**Bands & shell** — `band-canvas` / `band-soft` / `band-dark` band surfaces · `band-padding` / `band-padding-compact` band rhythm · `container` the 1280px page column.

**Text roles** — `text-ink` / `text-body` / `text-muted` / `text-on-dark` / `text-on-dark-soft` the colour roles as classes (so `Text` never hard-codes one) · `wordmark` / `wordmark-dark` header/footer brand marks · `caption-muted` 12px meta at the `gray-700` floor · `trust-wordmark` / `trust-caption` trust-bar text · `hero-subhead` the 18px muted subhead · `card-meta` white-card meta (see §Colour) · `date-range` tabular-nums tenure columns · `contact-link` permanently underlined contact links.

**Interaction deltas** — `button-primary-hover` / `button-primary-press` / `button-secondary-hover` / `button-disabled` button states · `link-hover` / `category-tab-hover` / `footer-link-hover` / `wordmark-hover` link states · `control-radius` the control radius as a standalone key (FAQ summary outline).

**Focus & touch** — `focus-ring` / `focus-ring-dark` / `focus-ring-inline` visible focus · `skip-link` skip to content · `button-icon-touch` the 44px tappable icon button.

**Hairlines & chrome** — `hairline-top` / `hairline-bottom` light dividers · `browser-frame` / `browser-frame-bar` / `browser-frame-dot` / `browser-frame-url` project-card chrome · `sheet-backdrop` mobile dialog backdrop · `photo-frame` rounded-2xl clip for the about photo.

**Footer & availability** — `footer-divider` / `footer-heading` / `footer-link` footer internals · `availability-pill-dark` the footer pill · `availability-dot` / `availability-dot-muted` status dots.

**Avatars & logos** — `avatar-tone-orange` / `-pink` / `-violet` / `-emerald` measured initial-chip fills · `tech-logo` / `tech-logo-wide` / `tech-logo-narrow` / `tech-logo-slot` the stack-logo calibration set · `client-logo` / `client-logo-sm` / `client-logo-lg` / `client-logo-slot` the trust-bar calibration set · `company-logo` experience wordmark box.

**Terminal** — `terminal-frame` / `terminal-bar` / `terminal-dot` / `terminal-title` / `terminal-body` / `terminal-line-command` / `terminal-line-status` / `terminal-glyph` / `terminal-cursor` the hero terminal family.

### `layout` (6)

`hero-grid` + `hero-col-content` + `hero-col-mockup` — the hero's 12-column 7/5 split · `feature-grid-3` / `feature-grid-2` — the card grids · `footer-grid` — the footer's 1→2→4 columns.
