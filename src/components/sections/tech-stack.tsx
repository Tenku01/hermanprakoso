"use client";

import { TechItem } from "@/components/data-display/tech-item";
import { Card3DTilt } from "@/components/islands/card-3d-tilt";
import { ScrollReveal } from "@/components/islands/scroll-reveal";
import { BandHeader, headingId } from "@/components/primitives/band-header";
import { Card } from "@/components/primitives/card";
import { Container } from "@/components/primitives/container";
import { Section } from "@/components/primitives/section";
import { Text } from "@/components/primitives/text";
import { TECH_I18N } from "@/content/tech";
import { useLanguage } from "@/context/language-context";
import * as tokens from "@/design/tokens";
import { cn } from "@/lib/cn";

export function TechStack() {
  const { lang } = useLanguage();
  const tech = TECH_I18N[lang];
  const leadSpansFullRow = tech.groups.length % 2 === 1;

  return (
    <Section id="stack" surface="canvas" labelledBy={headingId("stack")}>
      <Container>
        <BandHeader
          id="stack"
          eyebrow={tech.header.eyebrow}
          heading={tech.header.heading}
          subhead={tech.header.subhead}
        />

        <ul
          role="list"
          className={cn(tokens.layout["feature-grid-2"], "mt-16")}
        >
          {tech.groups.map((group, index) => (
            <ScrollReveal
              key={group.id}
              as="li"
              delay={index * 100}
              className={leadSpansFullRow && index === 0 ? "md:col-span-2" : undefined}
            >
              <Card3DTilt maxTilt={3} scale={1.008} glare={true} glareOpacity={0.06} className="h-full">
                <Card
                  surface="muted"
                  className="flex h-full flex-col gap-5"
                >
                  <div className="flex flex-col gap-1">
                    <Text as="h3" variant="title-sm">
                      {group.title}
                    </Text>
                    <Text variant="body-sm">{group.descriptor}</Text>
                  </div>

                  <ul role="list" className="flex flex-wrap gap-x-6 gap-y-4">
                    {group.items.map((item) => (
                      <TechItem key={item.name} item={item} />
                    ))}
                  </ul>
                </Card>
              </Card3DTilt>
            </ScrollReveal>
          ))}
        </ul>
      </Container>
    </Section>
  );
}