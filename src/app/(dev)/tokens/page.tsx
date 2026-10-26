import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import {
  components,
  layout,
  overrides,
  typographyResponsive,
} from "@/design/tokens";
import { cn } from "@/lib/cn";

export const metadata: Metadata = {
  title: "Design tokens",
  robots: { index: false, follow: false },
};

const SPECIMEN = "The quick brown fox jumps over the lazy dog";

const INTERACTIVE_OVERRIDES = new Set([
  "focus-ring",
  "focus-ring-dark",
  "skip-link",
  "button-icon-touch",
]);

// These carry a light foreground because they live on the dark footer. Rendering
// them on the white canvas would measure a pairing the site never ships.
const DARK_SURFACE_OVERRIDES = new Set([
  "wordmark-dark",
  "footer-heading",
  "footer-link",
]);

// A token with no foreground of its own is a surface, a rule or a dot. Putting
// the key name inside one measures the page's inherited body colour rather than
// anything the token declares.
const carriesForeground = (className: string) =>
  className.split(" ").some((c) => c.startsWith("text-"));

// Read back out of the token strings. A hand-typed surface colour in this file
// would (correctly) fail scripts/check-tokens.mjs.
const SWATCHES = Object.entries(components).flatMap(([key, value]) =>
  value
    .split(" ")
    .filter((c) => c.startsWith("bg-"))
    .map((className) => ({ key, className })),
);

export default function TokensPage() {
  // NODE_ENV is "production" during next build, so this prerenders as a 404 and
  // the strip never ships. It stays reachable under npm run dev.
  if (process.env.NODE_ENV === "production") notFound();

  return (
    <div className={cn(overrides["band-canvas"], overrides["band-padding"])}>
      <div className={cn(overrides.container, "space-y-16")}>
        <h1
          className={typographyResponsive["display-xl"]}
          data-token="display-xl"
        >
          display-xl
        </h1>

        <section id="typography" className="space-y-4">
          <h2 className={typographyResponsive["display-md"]}>Typography</h2>
          {Object.entries(typographyResponsive)
            .filter(([token]) => token !== "display-xl")
            .map(([token, className]) => (
              <p key={token} className={className} data-token={token}>
                {token} — {SPECIMEN}
              </p>
            ))}
        </section>

        <section className="space-y-4">
          <h2 className={typographyResponsive["display-md"]}>Components</h2>
          <div className={layout["feature-grid-3"]}>
            {Object.entries(components).map(([token, className]) => (
              <div key={token} className="space-y-2">
                <p className={overrides["caption-muted"]}>{token}</p>
                <div className={className} data-token={token}>
                  {token}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <h2 className={typographyResponsive["display-md"]}>Overrides</h2>
          <div className={layout["feature-grid-3"]}>
            {Object.entries(overrides)
              .filter(([token]) => !INTERACTIVE_OVERRIDES.has(token))
              .map(([token, className]) => (
                <div key={token} className="space-y-2">
                  <p className={overrides["caption-muted"]}>{token}</p>
                  {DARK_SURFACE_OVERRIDES.has(token) ? (
                    <div className={cn(overrides["band-dark"], "p-4")}>
                      <div className={className} data-token={token}>
                        {token}
                      </div>
                    </div>
                  ) : (
                    <div className={className} data-token={token}>
                      {carriesForeground(className) ? token : null}
                    </div>
                  )}
                </div>
              ))}
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <a
              href="#typography"
              className={cn(
                typographyResponsive["body-sm"],
                overrides["focus-ring"],
              )}
              data-token="focus-ring"
            >
              Back to typography
            </a>
            <button
              type="button"
              aria-label="Token proof icon button"
              className={cn(
                overrides["button-icon-touch"],
                overrides["focus-ring"],
              )}
              data-token="button-icon-touch"
            >
              <ArrowRight className="size-5" />
            </button>
            <span className={overrides["skip-link"]} data-token="skip-link">
              skip-link
            </span>
          </div>

          <div
            className={cn(
              overrides["band-dark"],
              overrides["band-padding-compact"],
              "flex justify-center",
            )}
          >
            <span
              className={cn(
                overrides["footer-link"],
                overrides["focus-ring-dark"],
              )}
              data-token="focus-ring-dark"
            >
              focus-ring-dark
            </span>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className={typographyResponsive["display-md"]}>Layout</h2>
          {Object.entries(layout).map(([token, className]) => (
            <div key={token} className="space-y-2">
              <p className={overrides["caption-muted"]}>{token}</p>
              <div className={className} data-token={token}>
                <div className={components["feature-card"]}>1</div>
                <div className={components["feature-card"]}>2</div>
                <div className={components["feature-card"]}>3</div>
                <div className={components["feature-card"]}>4</div>
              </div>
            </div>
          ))}
        </section>

        <section className="space-y-4">
          <h2 className={typographyResponsive["display-md"]}>
            Surface swatches
          </h2>
          <div className="flex flex-wrap gap-4">
            {SWATCHES.map((swatch) => (
              <div
                key={`${swatch.key}:${swatch.className}`}
                className="space-y-2"
              >
                <div
                  className={cn(
                    overrides["browser-frame"],
                    swatch.className,
                    "size-12",
                  )}
                />
                <p className={overrides["caption-muted"]}>{swatch.className}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
