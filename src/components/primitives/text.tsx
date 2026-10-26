import type { ElementType, ReactNode } from "react";

import * as tokens from "@/design/tokens";
import { cn } from "@/lib/cn";

export type TextVariant =
  | "display-xl"
  | "display-lg"
  | "display-md"
  | "display-sm"
  | "title-lg"
  | "title-md"
  | "title-sm"
  | "body-md"
  | "body-sm"
  | "caption"
  | "code"
  | "button"
  | "nav-link";

export type TextTone =
  "ink" | "body" | "muted" | "on-dark" | "on-dark-soft" | "inherit";

export type TextElement =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "p"
  | "span"
  | "div"
  | "code"
  | "strong"
  | "em"
  | "li"
  | "dt"
  | "dd"
  | "time"
  | "blockquote"
  | "figcaption";

type TextBase = {
  as?: TextElement;
  id?: string;
  className?: string;
  children: ReactNode;
  // Only meaningful with as="time"; React drops it when undefined.
  dateTime?: string;
};

// Two arms so the type system can ban one combination: caption text renders at
// 12px, where the muted grey fails the contrast minimum, so the caption arm
// simply does not offer tone="muted".
export type TextProps =
  | (TextBase & { variant?: Exclude<TextVariant, "caption">; tone?: TextTone })
  | (TextBase & {
      variant: "caption";
      tone?: Exclude<TextTone, "muted">;
    });

const DEFAULT_ELEMENT = {
  "display-xl": "h1",
  "display-lg": "h2",
  "display-md": "h3",
  "display-sm": "h3",
  "title-lg": "h3",
  "title-md": "h4",
  "title-sm": "h4",
  "body-md": "p",
  "body-sm": "p",
  caption: "span",
  code: "code",
  button: "span",
  "nav-link": "span",
} as const satisfies Record<TextVariant, TextElement>;

const DEFAULT_TONE = {
  "display-xl": "ink",
  "display-lg": "ink",
  "display-md": "ink",
  "display-sm": "ink",
  "title-lg": "ink",
  "title-md": "ink",
  "title-sm": "ink",
  "body-md": "body",
  "body-sm": "body",
  caption: "body",
  code: "body",
  button: "ink",
  "nav-link": "ink",
} as const satisfies Record<TextVariant, TextTone>;

const TONE = {
  ink: tokens.overrides["text-ink"],
  body: tokens.overrides["text-body"],
  muted: tokens.overrides["text-muted"],
  "on-dark": tokens.overrides["text-on-dark"],
  "on-dark-soft": tokens.overrides["text-on-dark-soft"],
  inherit: "",
} as const satisfies Record<TextTone, string>;

export function Text({
  as,
  id,
  className,
  children,
  dateTime,
  variant = "body-md",
  tone,
}: TextProps) {
  const Comp: ElementType = as ?? DEFAULT_ELEMENT[variant];
  return (
    <Comp
      id={id}
      dateTime={dateTime}
      className={cn(
        tokens.typographyResponsive[variant],
        TONE[tone ?? DEFAULT_TONE[variant]],
        className,
      )}
    >
      {children}
    </Comp>
  );
}
