import type { Metadata } from "next";

import { Button } from "@/components/primitives/button";
import { Container } from "@/components/primitives/container";
import { Text } from "@/components/primitives/text";
import { SITE } from "@/content/site";
import { overrides } from "@/design/tokens";
import { cn } from "@/lib/cn";

export const metadata: Metadata = {
  title: SITE.notFound.title,
};

export default function NotFound() {
  return (
    <div className={cn(overrides["band-canvas"], overrides["band-padding"])}>
      <Container className="flex flex-col items-center text-center">
        <Text as="h1" variant="display-md" tone="ink">
          {SITE.notFound.heading}
        </Text>
        <Text
          as="p"
          variant="body-md"
          tone="body"
          className="mt-4 max-w-xl text-pretty"
        >
          {SITE.notFound.body}
        </Text>
        <div className="mt-8 flex">
          <Button variant="primary" asChild>
            <a href={SITE.notFound.link.href}>{SITE.notFound.link.label}</a>
          </Button>
        </div>
      </Container>
    </div>
  );
}
