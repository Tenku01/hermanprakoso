"use client";

import { Menu, X } from "lucide-react";
import { useRef } from "react";

import { Icon } from "@/components/primitives/icon";
import { Link } from "@/components/primitives/link";
import { VisuallyHidden } from "@/components/primitives/visually-hidden";
import type { LinkItem } from "@/content/types";
import * as tokens from "@/design/tokens";
import { cn } from "@/lib/cn";

type MobileNavProps = {
  wordmark: LinkItem;
  links: readonly LinkItem[];
  cv: LinkItem;
  cta: LinkItem;
  openLabel: string;
  closeLabel: string;
  title: string;
  className?: string;
};

export function MobileNav({
  wordmark,
  links,
  cv,
  cta,
  openLabel,
  closeLabel,
  title,
  className,
}: MobileNavProps) {
  // No React open/closed state: the dialog's own `open` attribute is the
  // source of truth, and body:has(dialog[open]) reads it for the scroll lock.
  const dialogRef = useRef<HTMLDialogElement>(null);

  const close = () => dialogRef.current?.close();

  return (
    <>
      <button
        type="button"
        aria-label={openLabel}
        onClick={() => dialogRef.current?.showModal()}
        className={cn(
          tokens.overrides["button-icon-touch"],
          tokens.overrides["focus-ring"],
          className,
        )}
      >
        <Icon icon={Menu} size="md" />
      </button>

      {/* showModal() supplies the focus trap, Escape, top-layer paint, inert
          background and focus restore — nothing to hand-write. transition-all
          plus transition-discrete is what lets `display` and `overlay`
          animate; without both the sheet snaps instead of sliding. */}
      <dialog
        ref={dialogRef}
        aria-labelledby="mobile-nav-title"
        // A click on the backdrop reports the <dialog> itself as the target;
        // a click inside the sheet reports a child. That one check is
        // click-outside-to-close with no document listener.
        onClick={(event) => {
          if (event.target === dialogRef.current) close();
        }}
        className={cn(
          // left-auto matters: the browser's built-in dialog styles set
          // left:0, which fights right-0 plus a fixed width and wins.
          "fixed inset-y-0 right-0 left-auto m-0 h-dvh max-h-none w-full max-w-xs p-0",
          "translate-x-full opacity-0 transition-all transition-discrete duration-200 ease-out",
          "open:translate-x-0 open:opacity-100",
          "starting:open:translate-x-full starting:open:opacity-0",
          "backdrop:opacity-0 backdrop:transition-opacity backdrop:duration-200",
          "open:backdrop:opacity-100 starting:open:backdrop:opacity-0",
          tokens.overrides["band-canvas"],
          tokens.overrides["sheet-backdrop"],
        )}
      >
        <VisuallyHidden as="h2" id="mobile-nav-title">
          {title}
        </VisuallyHidden>

        <div className="flex h-full flex-col">
          <div
            className={cn(
              "flex h-16 items-center justify-between px-4",
              tokens.overrides["hairline-bottom"],
            )}
          >
            {/* Same wordmark as the header the sheet slides over: h-16 + px-4
                keep it at the header's position. Closing first is safe for the
                same reason as the nav links below. */}
            <Link
              href={wordmark.href}
              variant="unstyled"
              onClick={close}
              className={cn(
                tokens.overrides["wordmark"],
                tokens.overrides["wordmark-hover"],
              )}
            >
              {wordmark.label}
            </Link>

            {/* method="dialog" closes the containing dialog natively. */}
            <form method="dialog">
              <button
                type="submit"
                aria-label={closeLabel}
                className={cn(
                  tokens.overrides["button-icon-touch"],
                  tokens.overrides["focus-ring"],
                )}
              >
                <Icon icon={X} size="md" />
              </button>
            </form>
          </div>

          {/* overscroll-contain is the iOS fallback if page scroll leaks past
              body:has(dialog[open]). */}
          <ul className="flex flex-1 flex-col gap-2 overflow-y-auto overscroll-contain p-4">
            {links.map((link) => (
              <li key={link.href}>
                {/* Safe to close here: the handler runs before the browser
                    follows the link, and closing does not remove the target. */}
                <a
                  href={link.href}
                  onClick={close}
                  className={cn(
                    tokens.components["category-tab"],
                    tokens.overrides["focus-ring"],
                    "flex min-h-11 items-center",
                  )}
                >
                  {/* Same .nav-label hook as the desktop nav: globals.css
                      highlights the label of the section in view. That reaches
                      into the dialog because it is still a child of <body>
                      even while painting in the top layer, and the scroll lock
                      freezes the highlight on the right section. */}
                  <span className="nav-label">{link.label}</span>
                </a>
              </li>
            ))}
          </ul>

          <div
            className={cn(
              "flex flex-col gap-3 p-4",
              tokens.overrides["hairline-top"],
            )}
          >
            <a
              href={cv.href}
              download
              onClick={close}
              className={cn(
                tokens.components["button-secondary"],
                tokens.overrides["focus-ring"],
                "inline-flex items-center justify-center",
              )}
            >
              {cv.label}
            </a>
            <a
              href={cta.href}
              onClick={close}
              className={cn(
                tokens.components["button-primary"],
                tokens.overrides["focus-ring"],
                "inline-flex items-center justify-center",
              )}
            >
              {cta.label}
            </a>
          </div>
        </div>
      </dialog>
    </>
  );
}
