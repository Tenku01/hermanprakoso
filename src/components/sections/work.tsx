"use client";

import { ProjectCard } from "@/components/data-display/project-card";
import { ScrollReveal } from "@/components/islands/scroll-reveal";
import { BandHeader, headingId } from "@/components/primitives/band-header";
import { Container } from "@/components/primitives/container";
import { Section } from "@/components/primitives/section";
import { WORK_I18N } from "@/content/work";
import { useLanguage } from "@/context/language-context";
import * as tokens from "@/design/tokens";
import { cn } from "@/lib/cn";

const FLAGSHIP_SIZES = "(min-width: 1280px) 1232px, 100vw";
const TWO_UP_SIZES = "(min-width: 768px) 50vw, 100vw";

export function Work() {
  const { lang } = useLanguage();
  const work = WORK_I18N[lang];

  const flagship = work.projects.find((project) => project.featured);
  if (!flagship) {
    throw new Error("work: WORK.projects has no entry with featured: true");
  }
  const rest = work.projects.filter((project) => project !== flagship);

  return (
    <Section id="work" surface="canvas" labelledBy={headingId("work")}>
      <Container>
        <BandHeader
          id="work"
          eyebrow={work.header.eyebrow}
          heading={work.header.heading}
          subhead={work.header.subhead}
        />

        <ul
          role="list"
          className={cn(tokens.layout["feature-grid-2"], "mt-16")}
        >
          <ScrollReveal as="li" delay={50} className="md:col-span-2">
            <ProjectCard project={flagship} sizes={FLAGSHIP_SIZES} />
          </ScrollReveal>
          {rest.map((project, index) => (
            <ScrollReveal
              as="li"
              key={project.id}
              delay={120 + index * 100}
            >
              <ProjectCard project={project} sizes={TWO_UP_SIZES} />
            </ScrollReveal>
          ))}
        </ul>
      </Container>
    </Section>
  );
}