import Image from "next/image";
import Icon from "tech-stack-icons";

import { Text } from "@/components/primitives/text";
import type { TechItem as TechItemContent } from "@/content/types";
import * as tokens from "@/design/tokens";
import { cn } from "@/lib/cn";

type TechItemProps = {
  item: TechItemContent;
};

export function TechItem({ item }: TechItemProps) {
  return (
    <li className="group flex items-center gap-2.5 transition-transform duration-200 ease-out hover:-translate-y-1">
      <span className={cn(tokens.overrides["tech-logo-slot"], "transition-transform duration-200 ease-out group-hover:scale-110")}>
        {typeof item.logo === "string" ? (
          <Icon name={item.logo} className="size-5 shrink-0" />
        ) : (
          <Image
            src={item.logo}
            alt=""
            width={20}
            height={20}
            className="size-5 shrink-0 object-contain"
          />
        )}
      </span>
      <Text as="span" variant="body-sm" tone="ink">
        {item.name}
      </Text>
    </li>
  );
}