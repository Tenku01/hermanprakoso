import type { ReactNode } from "react";

import * as tokens from "@/design/tokens";
import { cn } from "@/lib/cn";

export type BadgeProps = {
  id?: string;
  className?: string;
  children: ReactNode;
};

export function Badge({ id, className, children }: BadgeProps) {
  return (
    <span
      id={id}
      className={cn(
        "inline-flex items-center",
        tokens.components["badge-pill"],
        className,
      )}
    >
      {children}
    </span>
  );
}
