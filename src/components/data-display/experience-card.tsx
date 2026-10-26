import Image from "next/image";

import { Card3DTilt } from "@/components/islands/card-3d-tilt";
import { Card } from "@/components/primitives/card";
import { Text } from "@/components/primitives/text";
import type { Role } from "@/content/types";
import * as tokens from "@/design/tokens";
import { cn } from "@/lib/cn";
import { formatDuration, formatMonth, monthsBetween } from "@/lib/duration";
import { NOW } from "@/lib/now";

// The same two characters formatRange() uses, so this card and that function
// can never render the range differently.
const EN_DASH = " – ";
const MIDDLE_DOT = " · ";

type ExperienceCardProps = {
  role: Role;
};

export function ExperienceCard({ role }: ExperienceCardProps) {
  const duration = formatDuration(
    monthsBetween(role.startISO, role.endISO, NOW),
  );

  return (
    <Card3DTilt maxTilt={3} scale={1.008} glare={true} glareOpacity={0.06}>
      <Card
        as="article"
        surface="outlined"
        className="flex flex-col gap-6 md:flex-row md:items-start md:gap-8"
      >
      {/* w-32 is exactly the logo token's own box. A quarter-width column
          would be 212px on a large screen — 84px wasted that the bullet text
          needs. */}
      <div className="md:w-32 md:shrink-0">
        <Image
          src={role.logo}
          alt=""
          sizes="128px"
          className={tokens.overrides["company-logo"]}
        />
      </div>

      {/* flex-1, not a fraction: both side columns have fixed widths, so the
          text column takes whatever is left. */}
      <div className="flex flex-col gap-3 md:flex-1">
        <div className="flex flex-col gap-1">
          <Text as="h3" variant="title-md">
            {role.position}
          </Text>
          <Text variant="body-sm" tone="muted">
            {role.company}
          </Text>
        </div>

        {/* ps-5 keeps the list-disc markers inside the card's content box. */}
        <ul role="list" className="flex list-disc flex-col gap-2 ps-5">
          {role.bullets.map((bullet) => (
            <Text as="li" key={bullet} variant="body-md">
              {bullet}
            </Text>
          ))}
        </ul>
      </div>

      {/* Built from formatMonth pieces, not formatRange: that returns one flat
          string with nowhere to attach <time> elements. "Present" stays a bare
          word — HTML has no datetime value for "still ongoing", and writing
          today's date would claim the role ended today. */}
      {/* Fixed w-56 (224px), not a quarter column: the longest date line
          measures 219px, and anything narrower wraps "4 yrs 4 mos" onto a
          second line, breaking the digit alignment the date token exists for.
          The text width does not scale with the card, so the column must not
          either. */}
      <p
        className={cn(
          tokens.overrides["date-range"],
          "md:w-56 md:shrink-0 md:text-right",
        )}
      >
        <time dateTime={role.startISO}>{formatMonth(role.startISO)}</time>
        {EN_DASH}
        {role.endISO === "present" ? (
          "Present"
        ) : (
          <time dateTime={role.endISO}>{formatMonth(role.endISO)}</time>
        )}
        {MIDDLE_DOT}
        {duration}
      </p>
      </Card>
    </Card3DTilt>
  );
}
