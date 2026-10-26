import Image from "next/image";

import type { AvatarSource, AvatarTone } from "@/content/types";
import * as tokens from "@/design/tokens";
import { cn } from "@/lib/cn";

export type AvatarProps = {
  source: AvatarSource;
  loading?: "eager" | "lazy";
  sizes?: string;
  className?: string;
};

const TONE = {
  orange: tokens.overrides["avatar-tone-orange"],
  pink: tokens.overrides["avatar-tone-pink"],
  violet: tokens.overrides["avatar-tone-violet"],
  emerald: tokens.overrides["avatar-tone-emerald"],
} as const satisfies Record<AvatarTone, string>;

export function Avatar({
  source,
  loading = "lazy",
  sizes = "36px",
  className,
}: AvatarProps) {
  if ("src" in source) {
    return (
      <Image
        src={source.src}
        // The person's name is always adjacent visible text; a matching alt
        // makes a screen reader announce it twice.
        alt=""
        sizes={sizes}
        loading={loading}
        className={cn("size-9 rounded-full object-cover", className)}
      />
    );
  }

  return (
    <span
      aria-hidden="true"
      className={cn(
        "inline-flex items-center justify-center",
        tokens.components["avatar-circle"],
        // Tone after avatar-circle: both set colours, and twMerge keeps the
        // later one while the circle's size and shape survive.
        TONE[source.tone],
        tokens.typographyResponsive["caption"],
        className,
      )}
    >
      {source.initials}
    </span>
  );
}
