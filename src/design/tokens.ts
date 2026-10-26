/**
 * The `typography` and `components` key names must stay exactly in sync with
 * DESIGN.md's front matter — scripts/check-tokens.mjs compares the two lists
 * and fails the build on any added, missing or renamed key. Values may differ.
 *
 * To restyle the site: paste new values here, update the three font lines in
 * globals.css, run `npm run verify`.
 */

export const typography = {
  "display-xl": "font-display text-6xl font-bold leading-none tracking-tight",
  "display-lg": "font-display text-5xl font-bold leading-none tracking-tight",
  "display-md": "font-display text-4xl font-bold leading-tight tracking-tight",
  "display-sm": "font-display text-3xl font-bold leading-tight tracking-normal",
  "title-lg": "text-2xl font-semibold leading-tight tracking-tight",
  "title-md": "text-lg font-semibold leading-snug",
  "title-sm": "text-base font-semibold leading-snug",
  "body-md": "text-base font-normal leading-normal",
  "body-sm": "text-sm font-normal leading-normal",
  caption: "text-xs font-medium leading-snug",
  code: "font-mono text-sm font-normal leading-normal",
  button: "text-sm font-semibold leading-none",
  "nav-link": "text-sm font-medium leading-snug",
} as const;

/** The set components actually use. Same keys as `typography`, but the four
 *  display sizes already include their mobile-to-desktop steps, so components
 *  never write breakpoint prefixes like `md:text-5xl` themselves. */
export const typographyResponsive = {
  "display-xl":
    "font-display text-3xl md:text-5xl lg:text-6xl font-bold leading-none tracking-tight",
  "display-lg":
    "font-display text-3xl md:text-4xl lg:text-5xl font-bold leading-none tracking-tight",
  "display-md":
    "font-display text-2xl md:text-4xl font-bold leading-tight tracking-tight",
  "display-sm":
    "font-display text-2xl md:text-3xl font-bold leading-tight tracking-normal",
  "title-lg": "text-2xl font-semibold leading-tight tracking-tight",
  "title-md": "text-lg font-semibold leading-snug",
  "title-sm": "text-base font-semibold leading-snug",
  "body-md": "text-base font-normal leading-normal",
  "body-sm": "text-sm font-normal leading-normal",
  caption: "text-xs font-medium leading-snug",
  code: "font-mono text-sm font-normal leading-normal",
  button: "text-sm font-semibold leading-none",
  "nav-link": "text-sm font-medium leading-snug",
} as const;

/** The component tokens the site renders, mirrored key-for-key in DESIGN.md's
 *  front matter. Interactive states are not separate entries — they are the
 *  prefixed delta keys in `overrides` (hover/press/disabled). */
export const components = {
  "button-primary":
    "bg-neutral-900 text-white text-sm font-semibold leading-none px-5 py-3 h-10 rounded-lg",
  "button-secondary":
    "bg-white text-neutral-900 border border-gray-200 text-sm font-semibold leading-none px-5 py-3 h-10 rounded-lg",
  "button-icon-circular":
    "bg-white text-neutral-900 border border-gray-200 size-9 rounded-full",
  "button-text-link":
    "bg-transparent text-neutral-900 text-sm font-semibold leading-none",
  "text-link":
    "bg-transparent text-neutral-900 text-base font-normal leading-normal",
  "top-nav": "bg-white text-neutral-900 text-sm font-medium leading-snug h-16",
  "nav-pill-group":
    "bg-gray-50 text-neutral-900 text-sm font-medium leading-snug p-1.5 rounded-full",
  "feature-card": "bg-neutral-100 text-neutral-900 rounded-xl p-8",
  "feature-icon-card":
    "bg-white text-neutral-900 border border-gray-200 rounded-xl p-6",
  "category-tab":
    "bg-transparent text-gray-500 text-sm font-medium leading-snug px-3.5 py-2 rounded-lg",
  "avatar-circle": "bg-neutral-100 text-neutral-900 size-9 rounded-full",
  "badge-pill":
    "bg-neutral-100 text-neutral-900 text-xs font-medium leading-snug px-3 py-1 rounded-full",
  footer:
    "bg-neutral-950 text-zinc-400 text-sm font-normal leading-normal py-16",
} as const;

/** Keys beyond the machine-checked front-matter maps. DESIGN.md's appendix
 *  indexes them by purpose, but this file is the source of truth for the
 *  class strings — check-tokens does not diff this map. */
export const overrides = {
  wordmark:
    "font-display text-lg font-semibold tracking-tight text-neutral-900",
  "wordmark-dark":
    "font-display text-2xl font-semibold tracking-tight text-white",
  // gray-500 on white measures 4.84:1 — it only just passes the WCAG AA
  // contrast minimum (4.5:1). For text smaller than 14px use gray-700 (10.3:1).
  "caption-muted": "text-xs font-medium leading-snug text-gray-700",
  "trust-wordmark":
    "font-display text-lg font-semibold tracking-tight text-gray-500",
  // gray-700, never gray-500: this renders at 12px, where the 4.84:1
  // measurement above is not enough.
  "trust-caption":
    "text-xs font-medium leading-snug tracking-wide uppercase text-gray-700",
  // No other token is 18px + normal weight + muted (title-md is 18px but bold).
  "hero-subhead": "text-lg font-normal leading-normal text-gray-500",
  // WHITE BACKGROUNDS ONLY: gray-500 is 4.83:1 on white (passes AA) but 4.43:1
  // on neutral-100 (fails). On grey cards use the default gray-700 instead.
  "card-meta": "text-sm font-normal leading-normal text-gray-500",
  // DESIGN.md names text colours as roles. These five carry those roles so the
  // Text component never hard-codes a colour.
  "text-ink": "text-neutral-900",
  "text-body": "text-gray-700",
  // Banned below 14px text (same 4.84:1 measurement as caption-muted). The
  // Text component's props make that combination a compile error.
  "text-muted": "text-gray-500",
  "text-on-dark": "text-white",
  "text-on-dark-soft": "text-zinc-400",
  "band-canvas": "bg-white",
  "band-soft": "bg-gray-50",
  "band-dark": "bg-neutral-950",
  "band-padding": "py-24",
  "band-padding-compact": "py-12",
  container: "mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8",
  "focus-ring":
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900",
  "focus-ring-dark":
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white",
  // Has a radius because a focus outline on a square inline element draws a
  // hard rectangle. A caller can pass its own radius; twMerge keeps the last.
  "focus-ring-inline":
    "rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900",
  // The control radius as its own key, because section files are banned from
  // writing rounded classes directly.
  "control-radius": "rounded-lg",
  // Press is neutral-700, one step past hover's neutral-800 — a press that
  // matches hover would be invisible while the pointer is on the button.
  "button-primary-press": "active:bg-neutral-700",
  // Hovers change colour only — no movement, no shadow. globals.css switches
  // the transition off for people who prefer reduced motion.
  "button-primary-hover": "transition-colors hover:bg-neutral-800",
  "button-secondary-hover":
    "transition-colors hover:bg-gray-50 hover:border-gray-300",
  "link-hover": "transition-colors hover:text-neutral-600",
  "category-tab-hover": "transition-colors hover:text-neutral-900",
  "footer-link-hover": "transition-colors hover:text-zinc-100",
  "wordmark-hover": "transition-opacity hover:opacity-75",
  // pointer-events-none only stops the cursor changing over the padding; a
  // disabled <button> already ignores clicks.
  "button-disabled":
    "disabled:bg-gray-200 disabled:text-gray-500 disabled:pointer-events-none",
  // DESIGN.md's circular icon button is 36px — under the 44px touch-target
  // minimum (WCAG). Anything tappable uses this 44px version instead.
  "button-icon-touch":
    "inline-flex items-center justify-center size-11 rounded-full text-neutral-900",
  "browser-frame": "rounded-lg border border-gray-200 overflow-hidden",
  "browser-frame-bar": "h-9 bg-gray-50 border-b border-gray-200 px-3",
  "browser-frame-dot": "size-2.5 rounded-full bg-gray-300",
  "browser-frame-url":
    "h-5 rounded-md bg-white border border-gray-200 font-mono text-xs text-gray-700",
  "hairline-top": "border-t border-gray-200",
  "hairline-bottom": "border-b border-gray-200",
  // A dialog's ::backdrop inherits nothing from the page, so its colour can
  // only be set here. neutral-950 is DESIGN.md's dark surface.
  "sheet-backdrop": "backdrop:bg-neutral-950/40",
  // 10% white, never solid grey: a grey line on near-black looks like a gap
  // between two panels instead of a divider.
  "footer-divider": "border-t border-white/10",
  "footer-heading": "text-sm font-semibold leading-snug text-white",
  "footer-link": "text-sm font-normal leading-normal text-zinc-400",
  "skip-link":
    "sr-only focus:not-sr-only focus:absolute focus:z-50 focus:m-3 focus:rounded-lg focus:bg-neutral-900 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white",
  // Text colour picked by measurement, not taste: dark ink beats white on
  // orange-400 (7.54:1 vs 2.38), pink-500 (5.00 vs 3.58) and emerald-400
  // (9.25 vs 1.94). On violet-500 neither passes AA, so the background itself
  // steps to violet-600, where white reads 5.89:1.
  "avatar-tone-orange": "bg-orange-400 text-neutral-900",
  "avatar-tone-pink": "bg-pink-500 text-neutral-900",
  "avatar-tone-violet": "bg-violet-600 text-white",
  "avatar-tone-emerald": "bg-emerald-400 text-neutral-900",
  "availability-dot": "size-2 rounded-full bg-emerald-500",
  "availability-dot-muted": "size-2 rounded-full bg-gray-400",
  // The clip and the radius must travel together: without overflow-hidden the
  // image's square corners sit on top of the rounded frame.
  "photo-frame": "overflow-hidden rounded-2xl",
  // Brand logos come in wildly different shapes, so one shared height would
  // make some read much bigger than others. These four heights were measured
  // together against the 40px slot — change one, re-check all four.
  "tech-logo": "h-8 w-auto",
  "tech-logo-wide": "h-6 w-auto",
  "tech-logo-narrow": "h-10 w-auto",
  "tech-logo-slot": "flex size-10 shrink-0 items-center justify-center",
  // Trust-bar logos are sized per logo, not by shape — see TrustMarkSize in
  // content/types.ts. 24px is the base; 20px pulls back the two tight crops,
  // 28px lifts the two padded ones. Change one, re-measure all three.
  "client-logo": "h-6 w-auto object-contain",
  "client-logo-sm": "h-5 w-auto object-contain",
  "client-logo-lg": "h-7 w-auto object-contain",
  "client-logo-slot": "flex h-8 items-center",
  // These are wide wordmarks, so height alone is not enough — greenapex would
  // render 142px wide next to a 91px dotnpixel. object-left keeps each one
  // flush with the card edge.
  "company-logo": "h-10 w-32 object-contain object-left",
  // tabular-nums gives every digit the same width, so the three date columns
  // line up. gray-700 because tenure is real information, not fine print.
  "date-range": "text-sm font-normal leading-normal tabular-nums text-gray-700",
  // Underlined on purpose: a link told apart from body text by colour alone
  // fails WCAG 1.4.1 — some people cannot see the colour difference.
  "contact-link":
    "bg-transparent text-neutral-900 text-base font-normal leading-normal underline underline-offset-4",
  // Carries no text colour on purpose — it inherits the footer's zinc-400.
  "availability-pill-dark":
    "inline-flex items-center gap-2 rounded-full bg-neutral-900 px-3 py-1",
  // The site's second dark surface (after the footer). Measured on
  // neutral-950: zinc-400 is 7.5:1, white 19.8:1, emerald-400 11.4:1
  // (emerald-500 is only 8.0:1 — that is why the accent steps to 400 here).
  // gray-500 measures 4.1:1 and FAILS — never use text-muted or card-meta
  // tones inside the terminal. No border: on near-black it reads as a seam.
  "terminal-frame": "bg-neutral-950 rounded-2xl shadow-md",
  // px-6 so the dots line up with the body text below. 10% white line for the
  // same reason as footer-divider.
  "terminal-bar": "h-9 border-b border-white/10 px-6",
  // Monochrome on purpose, not red/yellow/green traffic lights — emerald is
  // the page's only accent and decoration must not compete with it.
  "terminal-dot": "size-2.5 rounded-full bg-white/15",
  "terminal-title": "font-mono text-xs font-medium leading-snug text-zinc-400",
  "terminal-body":
    "p-6 font-mono text-sm font-normal leading-normal text-zinc-400",
  "terminal-line-command": "text-white",
  "terminal-line-status": "text-emerald-400",
  "terminal-glyph": "text-emerald-400",
  "terminal-cursor": "select-none text-white",
} as const;

/** Only the six responsive collapses DESIGN.md itself names. Every other grid,
 *  flex and gap class is written directly in section files, on purpose. */
export const layout = {
  "hero-grid": "grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16",
  "hero-col-content": "lg:col-span-7",
  "hero-col-mockup": "lg:col-span-5",
  "feature-grid-3": "grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3",
  "feature-grid-2": "grid grid-cols-1 gap-6 md:grid-cols-2",
  "footer-grid": "grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4",
} as const;
