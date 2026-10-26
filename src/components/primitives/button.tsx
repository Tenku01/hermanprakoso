import type { ComponentProps, ReactNode } from "react";

import { Slot } from "@/components/primitives/slot";
import * as tokens from "@/design/tokens";
import { cn } from "@/lib/cn";

export type ButtonVariant = "primary" | "secondary" | "icon" | "text-link";

type ButtonBase = Omit<
  ComponentProps<"button">,
  "type" | "className" | "children"
> & {
  asChild?: boolean;
  className?: string;
  children?: ReactNode;
  type?: "button" | "submit" | "reset";
};

export type ButtonProps =
  // size?: never keeps the destructure compiling while making `size` on a
  // non-icon button a type error.
  | (ButtonBase & {
      variant: "primary" | "secondary" | "text-link";
      size?: never;
    })
  | (ButtonBase & {
      variant: "icon";
      size?: "compact" | "touch";
      // An icon-only button with no accessible name must not compile.
      "aria-label": string;
    });

const BASE = "inline-flex items-center justify-center gap-2 whitespace-nowrap";

const ICON_COMPACT = tokens.components["button-icon-circular"];
// The touch override only swaps the 36px size for 44px; twMerge keeps the
// border and radius from the base token.
const ICON_TOUCH = cn(
  tokens.components["button-icon-circular"],
  tokens.overrides["button-icon-touch"],
);

const VARIANT = {
  primary: cn(
    tokens.components["button-primary"],
    tokens.overrides["button-primary-hover"],
    tokens.overrides["button-primary-press"],
    tokens.overrides["button-disabled"],
    tokens.overrides["focus-ring"],
  ),
  secondary: cn(
    tokens.components["button-secondary"],
    tokens.overrides["button-secondary-hover"],
    tokens.overrides["button-disabled"],
    tokens.overrides["focus-ring"],
  ),
  icon: cn(
    ICON_TOUCH,
    tokens.overrides["button-secondary-hover"],
    tokens.overrides["button-disabled"],
    tokens.overrides["focus-ring"],
  ),
  "text-link": cn(
    tokens.components["button-text-link"],
    tokens.overrides["link-hover"],
    tokens.overrides["button-disabled"],
    tokens.overrides["focus-ring-inline"],
  ),
} as const satisfies Record<ButtonVariant, string>;

export function Button({
  variant,
  size,
  asChild = false,
  className,
  children,
  type = "button",
  ...rest
}: ButtonProps) {
  const shape =
    variant === "icon" && size === "compact"
      ? cn(
          ICON_COMPACT,
          tokens.overrides["button-secondary-hover"],
          tokens.overrides["button-disabled"],
          tokens.overrides["focus-ring"],
        )
      : VARIANT[variant];

  const classes = cn(BASE, shape, className);

  if (asChild) {
    return (
      <Slot className={classes} {...rest}>
        {children}
      </Slot>
    );
  }

  return (
    <button type={type} className={classes} {...rest}>
      {children}
    </button>
  );
}
