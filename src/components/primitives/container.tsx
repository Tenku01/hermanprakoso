import type { ReactNode } from "react";

import * as tokens from "@/design/tokens";
import { cn } from "@/lib/cn";

export type ContainerProps = {
  // Layout utilities only — never a colour, radius or type class.
  className?: string;
  children: ReactNode;
};

export function Container({ className, children }: ContainerProps) {
  return (
    <div className={cn(tokens.overrides["container"], className)}>
      {children}
    </div>
  );
}
