import { Bricolage_Grotesque, Geist, Geist_Mono } from "next/font/google";

export const fontDisplay = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
  // Google pins opsz at its 14 default unless the axis is requested, which would
  // render a 60px headline with small-text apertures. Requesting `axes` is only
  // legal while `weight` is absent — the loader then defaults weight to "variable".
  axes: ["opsz"],
  // Never false: this is what emits the size-adjust'd Arial fallback face
  // (105.43% for Bricolage) that holds CLS at 0 through the font swap.
  adjustFontFallback: true,
  fallback: ["ui-sans-serif", "system-ui", "sans-serif"],
});

export const fontSans = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  display: "swap",
  adjustFontFallback: true,
  fallback: ["ui-sans-serif", "system-ui", "sans-serif"],
});

export const fontMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  // Consumed above the fold by the hero terminal card (plus the work band's
  // URL pills), yet preload stays OFF: a third preloaded face would compete
  // with Bricolage + Geist on the mobile critical path, and the swap from the
  // size-adjusted ui-monospace fallback shifts nothing (CLS 0).
  preload: false,
  adjustFontFallback: true,
  fallback: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
});
