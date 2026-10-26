import Image from "next/image";

import { Link } from "@/components/primitives/link";
import type { TrustMark, TrustMarkSize } from "@/content/types";
import * as tokens from "@/design/tokens";

const SIZE = {
  sm: tokens.overrides["client-logo-sm"],
  md: tokens.overrides["client-logo"],
  lg: tokens.overrides["client-logo-lg"],
} as const satisfies Record<TrustMarkSize, string>;

type TrustMarkItemProps = {
  mark: TrustMark;
};

export function TrustMarkItem({ mark }: TrustMarkItemProps) {
  // Named alt, unlike tech-item's empty one: the logo is the link's only
  // child, so an empty alt would leave the link with no name at all.
  const body = mark.logo ? (
    <Image
      src={mark.logo}
      alt={mark.name}
      sizes="160px"
      className={SIZE[mark.size ?? "md"]}
    />
  ) : (
    <span className={tokens.overrides["trust-wordmark"]}>{mark.name}</span>
  );

  return (
    <li className={tokens.overrides["client-logo-slot"]}>
      {mark.href ? (
        // h-11 on the link, not the logo: a 44px touch target around a mark
        // drawn at 20-28px. Link supplies target, rel and focus ring itself.
        <Link
          href={mark.href}
          variant="unstyled"
          className="inline-flex h-11 items-center"
        >
          {body}
        </Link>
      ) : (
        body
      )}
    </li>
  );
}
