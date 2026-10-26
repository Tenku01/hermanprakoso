import type { ElementType, ReactNode } from "react";

// Heading tags are allowed so a hidden dialog title can be a real <h2> — an
// <h2> inside a <span> is invalid HTML and the browser moves it out.
type VisuallyHiddenElement = "span" | "div" | "p" | "h2" | "h3" | "legend";

export type VisuallyHiddenProps = {
  as?: VisuallyHiddenElement;
  id?: string;
  children: ReactNode;
};

export function VisuallyHidden({
  as = "span",
  id,
  children,
}: VisuallyHiddenProps) {
  const Comp: ElementType = as;
  return (
    <Comp id={id} className="sr-only">
      {children}
    </Comp>
  );
}
