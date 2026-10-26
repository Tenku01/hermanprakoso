"use client";

import "./globals.css";
import { SITE } from "@/content/site";
import { components, overrides, typographyResponsive } from "@/design/tokens";
import { cn } from "@/lib/cn";

import { fontDisplay, fontMono, fontSans } from "./fonts";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    // global-error replaces the root layout entirely, so it must render the
    // document itself: html/body, the stylesheet import above, and the font
    // variables — none are inherited here.
    <html
      lang="en"
      className={`${fontDisplay.variable} ${fontSans.variable} ${fontMono.variable} h-full antialiased`}
    >
      <body
        className={cn(
          "flex min-h-full flex-col",
          overrides["band-canvas"],
          "font-sans",
          overrides["text-body"],
        )}
      >
        <title>{`${SITE.errorPage.title} | ${SITE.name}`}</title>
        {/* The lone landmark: axe's region rule requires all content inside one,
            and this document has no header or footer to provide others. */}
        <main className="flex flex-1 flex-col items-center justify-center gap-6 p-6 text-center">
          <h1
            className={cn(
              typographyResponsive["display-md"],
              overrides["text-ink"],
            )}
          >
            {SITE.errorPage.heading}
          </h1>
          <p
            className={cn(
              typographyResponsive["body-md"],
              "max-w-xl text-pretty",
            )}
          >
            {SITE.errorPage.body}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => reset()}
              className={cn(
                components["button-primary"],
                overrides["focus-ring"],
                "inline-flex items-center justify-center",
              )}
            >
              {SITE.errorPage.retryLabel}
            </button>
            <a
              href={SITE.errorPage.link.href}
              className={cn(
                components["button-secondary"],
                overrides["focus-ring"],
                "inline-flex items-center justify-center",
              )}
            >
              {SITE.errorPage.link.label}
            </a>
          </div>
          {error.digest ? (
            <p className={overrides["caption-muted"]}>
              {`${SITE.errorPage.digestLabel}: ${error.digest}`}
            </p>
          ) : null}
        </main>
      </body>
    </html>
  );
}
