import { Lock } from "lucide-react";
import type { ReactNode } from "react";

import { Icon } from "@/components/primitives/icon";
import * as tokens from "@/design/tokens";
import { cn } from "@/lib/cn";

export type BrowserFrameProps = {
  // A bare hostname like "fiskil.com", never a full URL — this bar is
  // decoration; the real link lives on the project card.
  domain: string;
  className?: string;
  children: ReactNode;
};

export function BrowserFrame({
  domain,
  className,
  children,
}: BrowserFrameProps) {
  return (
    // The token includes overflow-hidden so the frame's rounded corners clip
    // the screenshot's square ones.
    <div className={cn(tokens.overrides["browser-frame"], className)}>
      <div
        // Fake browser chrome, hidden from screen readers: the card's own
        // link already announces the site.
        aria-hidden="true"
        className={cn(
          "flex items-center gap-3",
          tokens.overrides["browser-frame-bar"],
        )}
      >
        <div className="flex shrink-0 items-center gap-1.5">
          <span className={tokens.overrides["browser-frame-dot"]} />
          <span className={tokens.overrides["browser-frame-dot"]} />
          <span className={tokens.overrides["browser-frame-dot"]} />
        </div>
        <div
          className={cn(
            "flex min-w-0 flex-1 items-center gap-1.5 px-2",
            tokens.overrides["browser-frame-url"],
          )}
        >
          <Icon icon={Lock} />
          <span className="truncate">{domain}</span>
        </div>
      </div>
      {children}
    </div>
  );
}
