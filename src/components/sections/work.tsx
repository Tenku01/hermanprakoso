"use client";

import { ProjectShowcase } from "@/components/islands/project-showcase";
import { BandHeader, headingId } from "@/components/primitives/band-header";
import { Container } from "@/components/primitives/container";
import { Section } from "@/components/primitives/section";
import { WORK_I18N } from "@/content/work";
import { useLanguage } from "@/context/language-context";

export function Work() {
  const { lang } = useLanguage();
  const work = WORK_I18N[lang];

  return (
    <Section
      id="work"
      surface="canvas"
      labelledBy={headingId("work")}
      className="py-0"
    >
      <div className="pt-20">
        <Container>
          <BandHeader
            id="work"
            eyebrow={work.header.eyebrow}
            heading={work.header.heading}
            subhead={work.header.subhead}
          />
        </Container>
      </div>

      <div className="mt-6">
        <ProjectShowcase projects={work.projects} />
      </div>
    </Section>
  );
}
