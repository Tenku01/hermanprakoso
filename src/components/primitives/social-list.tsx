import type { ComponentType, SVGProps } from "react";

import * as tokens from "@/design/tokens";
import { cn } from "@/lib/cn";

export type SocialItem = {
  readonly label: string;
  readonly href: string;
  readonly Glyph: ComponentType<SVGProps<SVGSVGElement>>;
};

export type SocialListProps = {
  items: readonly SocialItem[];
  tone?: "light" | "dark";
  className?: string;
};

export function SocialList({
  items,
  tone = "light",
  className,
}: SocialListProps) {
  return (
    // role="list" is not redundant: preflight sets list-style:none and Safari
    // with VoiceOver then drops list semantics entirely.
    <ul role="list" className={cn("flex items-center gap-1", className)}>
      {items.map((item) => (
        <li key={item.href}>
          <a
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${item.label} (opens in a new tab)`}
            className={cn(
              tokens.overrides["button-icon-touch"],
              tone === "dark" && tokens.overrides["text-on-dark-soft"],
              tone === "dark"
                ? cn(
                    tokens.overrides["footer-link-hover"],
                    tokens.overrides["focus-ring-dark"],
                  )
                : cn(
                    tokens.overrides["link-hover"],
                    tokens.overrides["focus-ring"],
                  ),
            )}
          >
            <item.Glyph className="size-5" aria-hidden="true" />
          </a>
        </li>
      ))}
    </ul>
  );
}
