import type { ReactNode } from "react";

import type { SectionId } from "@/content/types";
import * as tokens from "@/design/tokens";
import { cn } from "@/lib/cn";

export type SectionSurface = "canvas" | "soft" | "dark";

export type SectionProps = {
  id: SectionId;
  surface: SectionSurface;
  labelledBy: string;
  compact?: boolean;
  // Layout utilities only. Never a scroll margin: globals.css already sets the
  // one scroll offset for anchor jumps, and a second one would stack on top.
  className?: string;
  children: ReactNode;
};

const SURFACE = {
  canvas: tokens.overrides["band-canvas"],
  soft: tokens.overrides["band-soft"],
  dark: tokens.overrides["band-dark"],
} as const satisfies Record<SectionSurface, string>;

export function Section({
  id,
  surface,
  labelledBy,
  compact = false,
  className,
  children,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn(
        SURFACE[surface],
        compact
          ? tokens.overrides["band-padding-compact"]
          : tokens.overrides["band-padding"],
        className,
      )}
    >
      {children}
    </section>
  );
}
