/**
 * Evaluated once, on the server, during prerender. This is the ONLY `new Date()`
 * permitted in the codebase: a second one lets two parts of the same page disagree
 * about "now", and a client-side clock risks a hydration mismatch. Consumed by the
 * duration math in src/lib/duration.ts (Phase 03) and the footer copyright year.
 */
export const NOW = new Date();
