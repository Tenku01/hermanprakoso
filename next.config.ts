import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // images.qualities stays at the v16 default [75]. Every image on this site is a
  // flat UI screenshot; 75 is ample, and a `quality` prop outside the allow-list
  // coerces silently rather than erroring, so widening it only hides mistakes.
  //
  // reactCompiler: OFF. This page is RSC-heavy and effectively static — there is
  // no re-render pressure to optimise, and the Babel pass costs real build time.
  //
  // experimental.viewTransition: OFF. Still experimental in 16.2.12, and a
  // single-page site has no route navigations to animate.
  //
  // cssChunking: left at its default (true).
  //
  // experimental.inlineCss: measured OFF-vs-ON in Phase 13 (rule: keep only if
  // mobile FCP and LCP both improve >=50 ms with no category regression).
  // Verdict pending final comparison; numbers recorded in PHASE-13 file.

  // The OG route reads the TTF through join(process.cwd(), …), which output file
  // tracing cannot follow statically. Without this the route 500s on a
  // serverless or standalone host while working perfectly in `next start`.
  outputFileTracingIncludes: {
    "/opengraph-image": ["./src/assets/fonts/BricolageGrotesque-Bold.ttf"],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          // Deliberately NO script-src: a nonce CSP would force dynamic
          // rendering (per the Next CSP guide), and with no script-src the
          // JSON-LD blocks, gtag and hydration scripts can never be blocked.
          {
            key: "Content-Security-Policy",
            value:
              "base-uri 'self'; form-action 'self'; frame-ancestors 'none'; object-src 'none'",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
