import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

import { Card3DTilt } from "@/components/islands/card-3d-tilt";
import { Badge } from "@/components/primitives/badge";
import { BrowserFrame } from "@/components/primitives/browser-frame";
import { Button } from "@/components/primitives/button";
import { Card } from "@/components/primitives/card";
import { Icon } from "@/components/primitives/icon";
import { Link } from "@/components/primitives/link";
import { Text } from "@/components/primitives/text";
import type { Project } from "@/content/types";
import * as tokens from "@/design/tokens";
import { cn } from "@/lib/cn";

type ProjectCardProps = {
  project: Project;
  // Required on purpose: sizes describes the slot the card sits in, and only
  // the layout placing the card knows if that is full-width or half.
  sizes: string;
  className?: string;
};

export function ProjectCard({ project, sizes, className }: ProjectCardProps) {
  return (
    <Card3DTilt maxTilt={5} scale={1.01} className="h-full">
      <Card
        surface="outlined"
        className={cn("group flex h-full flex-col gap-6", className)}
      >
        <div style={{ transform: "translateZ(14px)", transformStyle: "preserve-3d" }}>
          <BrowserFrame domain={project.domain}>
            {/* Below the fold, so the lazy default is right — no eager-load prop
                belongs here. aspect-video holds the 16:9 box even if a future
                screenshot ships at the wrong ratio. */}
            <Image
              src={project.screenshot.src}
              alt={project.screenshot.alt}
              sizes={sizes}
              placeholder="blur"
              className="aspect-video w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            />
          </BrowserFrame>
        </div>

        <div className="flex flex-col gap-3">
          <Text as="h3" variant="title-lg">
            {project.name}
          </Text>
          <Text variant="body-md" className="text-pretty">
            {project.description}
          </Text>
          {/* Plain <p> with one token: Text would stack its own size and colour
              classes on top of card-meta and leave twMerge to pick between
              them. */}
          <p className={tokens.overrides["card-meta"]}>{project.role}</p>
        </div>

        <ul role="list" className="flex flex-wrap gap-2">
          {project.stack.map((item) => (
            <li key={item}>
              <Badge>{item}</Badge>
            </li>
          ))}
        </ul>

        {/* py-2 is a WCAG target-size fix: the button-text-link token has no
            padding, so the click area would be ~16px tall against the 24px
            minimum. mt-auto pins the link to the bottom of equal-height
            cards. */}
        <Button
          variant="text-link"
          asChild
          className="mt-auto inline-flex items-center gap-1.5 self-start py-2"
        >
          <Link
            href={project.href}
            variant="unstyled"
            className="group/link inline-flex items-center gap-1.5"
          >
            {project.linkLabel}
            <span className="inline-block transition-transform duration-200 ease-out group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5">
              <Icon icon={ArrowUpRight} />
            </span>
          </Link>
        </Button>
      </Card>
    </Card3DTilt>
  );
}
