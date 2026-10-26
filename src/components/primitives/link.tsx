import NextLink from "next/link";
import type { ComponentProps, ReactNode } from "react";

import type { Href } from "@/content/types";
import * as tokens from "@/design/tokens";
import { cn } from "@/lib/cn";

export type LinkVariant = "nav" | "inline" | "unstyled";

// target and rel are stripped from the prop type: the component derives them
// from href, and letting callers pass their own would silently override that.
export type LinkProps = Omit<
  ComponentProps<"a">,
  "href" | "target" | "rel" | "className" | "children"
> & {
  href: Href;
  variant: LinkVariant;
  className?: string;
  children: ReactNode;
};

const EXTERNAL = /^(https?:|mailto:|tel:)/;

const VARIANT = {
  nav: cn(
    tokens.typographyResponsive["nav-link"],
    tokens.overrides["text-ink"],
    tokens.overrides["link-hover"],
  ),
  inline: cn(
    tokens.components["text-link"],
    tokens.overrides["link-hover"],
    "underline underline-offset-4",
  ),
  unstyled: "",
} as const satisfies Record<LinkVariant, string>;

export function Link({
  href,
  variant,
  className,
  children,
  ...rest
}: LinkProps) {
  const classes = cn(
    VARIANT[variant],
    tokens.overrides["focus-ring-inline"],
    className,
  );

  if (EXTERNAL.test(href)) {
    return (
      <a
        {...rest}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
      >
        {children}
        {/* Leading space: without it a screen reader reads
            "Fiskil(opens in a new tab)" as one token. */}
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    );
  }

  if (href.startsWith("#") || href.startsWith("/#")) {
    // Plain <a> for in-page jumps: the browser scrolls natively and the CSS
    // scroll offset applies. "/#..." belongs here too — on "/" the browser
    // treats it as a same-page jump, while next/link would treat it as a
    // navigation to the page you are already on and do nothing at all.
    return (
      <a {...rest} href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <NextLink {...rest} href={href} className={classes}>
      {children}
    </NextLink>
  );
}
