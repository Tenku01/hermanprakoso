import { buildLlmsTxt } from "@/lib/llms";

// GET route handlers default to dynamic since Next 15; force-static prerenders
// this at build time, keeping the whole site static (NOW evaluates once per
// build, same convention as sitemap.ts).
export const dynamic = "force-static";

// next.config.ts sends X-Content-Type-Options: nosniff on every path, so the
// Content-Type must be explicit or browsers download instead of display.
export function GET(): Response {
  return new Response(buildLlmsTxt(), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
