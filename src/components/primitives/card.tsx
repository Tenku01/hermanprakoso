import type { ElementType, ReactNode } from "react";

import * as tokens from "@/design/tokens";
import { cn } from "@/lib/cn";

export type CardSurface = "muted" | "outlined";
export type CardElement = "div" | "article" | "li" | "figure";

export type CardProps = {
  surface: CardSurface;
  as?: CardElement;
  id?: string;
  // Padding differences ride here: the testimonial card is this same muted
  // surface at p-6, the cta band at p-12 — twMerge lets the later p-* win.
  className?: string;
  children: ReactNode;
};

// A card is either grey (bg-neutral-100) with no border and no shadow, or
// white with a gray-200 border. Never a grey surface with a border on top.
const SURFACE = {
  muted: tokens.components["feature-card"],
  outlined: tokens.components["feature-icon-card"],
} as const satisfies Record<CardSurface, string>;

export function Card({
  surface,
  as = "div",
  id,
  className,
  children,
}: CardProps) {
  const Comp: ElementType = as;
  return (
    <Comp id={id} className={cn(SURFACE[surface], className)}>
      {children}
    </Comp>
  );
}
