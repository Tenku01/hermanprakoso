import { ChevronDown } from "lucide-react";

import { Icon } from "@/components/primitives/icon";
import { Text } from "@/components/primitives/text";
import type { FaqItem as FaqItemData } from "@/content/types";
import * as tokens from "@/design/tokens";
import { cn } from "@/lib/cn";

export type FaqItemProps = {
  item: FaqItemData;
  groupName: string;
};

export function FaqItem({ item, groupName }: FaqItemProps) {
  return (
    // The shared name attribute IS the accordion: the browser itself closes
    // the open sibling. Browsers that do not know the attribute simply allow
    // several open at once — a downgrade, not a break. The open/close slide
    // lives in globals.css (::details-content), not here.
    <details
      name={groupName}
      className={cn("group", tokens.overrides["hairline-bottom"])}
    >
      {/* list-none removes the native disclosure triangle; the rotating
          chevron replaces it. cursor-pointer because browsers give summary a
          text cursor. control-radius rounds the focus outline to match. */}
      <summary
        className={cn(
          "flex cursor-pointer list-none items-center justify-between gap-4 px-1 py-5",
          tokens.overrides["control-radius"],
          tokens.overrides["focus-ring"],
        )}
      >
        {/* span, not a heading: a heading inside summary makes screen readers
            announce "heading" and "button" back to back and report the open
            state unreliably. */}
        <Text as="span" variant="title-sm">
          {item.question}
        </Text>
        {/* Wrapper span carries the rotation because Icon exposes no className. */}
        <span className="inline-flex shrink-0 transition-transform duration-200 group-open:rotate-180">
          <Icon icon={ChevronDown} />
        </span>
      </summary>
      {/* Padding, never margin: the answer sits inside the clipped, animated
          box, and a margin can escape that box and make the text jump when
          the slide finishes. */}
      <Text variant="body-md" className="px-1 pb-5">
        {item.answer}
      </Text>
    </details>
  );
}
