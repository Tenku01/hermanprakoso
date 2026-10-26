"use client";

import { ExperienceCard } from "@/components/data-display/experience-card";
import { ScrollReveal } from "@/components/islands/scroll-reveal";
import { BandHeader, headingId } from "@/components/primitives/band-header";
import { Container } from "@/components/primitives/container";
import { Section } from "@/components/primitives/section";
import { EXPERIENCE_I18N } from "@/content/experience";
import { useLanguage } from "@/context/language-context";

export function Experience() {
  const { lang } = useLanguage();
  const experience = EXPERIENCE_I18N[lang];

  return (
    <Section
      id="experience"
      surface="soft"
      labelledBy={headingId("experience")}
    >
      <Container>
        <BandHeader
          id="experience"
          eyebrow={experience.header.eyebrow}
          heading={experience.header.heading}
          subhead={experience.header.subhead}
        />

        <ul role="list" className="mx-auto mt-16 flex max-w-4xl flex-col gap-6">
          {experience.roles.map((role, index) => (
            <ScrollReveal as="li" key={role.id} delay={index * 120}>
              <ExperienceCard role={role} />
            </ScrollReveal>
          ))}
        </ul>
      </Container>
    </Section>
  );
}