import { Badge } from "@/components/primitives/badge";
import { Text } from "@/components/primitives/text";
import type { SectionId } from "@/content/types";
import { cn } from "@/lib/cn";

// The <h2> id and the <section> aria-labelledby both come from this one
// function, so a heading and its section can never drift apart.
export const headingId = (id: SectionId): `${SectionId}-heading` =>
  `${id}-heading`;

export type BandHeaderProps = {
  id: SectionId;
  eyebrow: string;
  heading: string;
  subhead?: string;
  className?: string;
};

export function BandHeader({
  id,
  eyebrow,
  heading,
  subhead,
  className,
}: BandHeaderProps) {
  return (
    // Centred on purpose: the pill's own padding starts its text ~12px inside
    // its edge, so a left-aligned pill looks misaligned with the heading below.
    <div className={cn("flex flex-col items-center text-center", className)}>
      <Badge>{eyebrow}</Badge>
      <Text
        as="h2"
        id={headingId(id)}
        variant="display-lg"
        className="mt-4 text-balance"
      >
        {heading}
      </Text>
      {subhead ? (
        <Text variant="body-md" className="mt-4 max-w-2xl text-pretty">
          {subhead}
        </Text>
      ) : null}
    </div>
  );
}
