"use client";

import Image from "next/image";

import { Card3DTilt } from "@/components/islands/card-3d-tilt";
import { ScrollReveal } from "@/components/islands/scroll-reveal";
import { BandHeader, headingId } from "@/components/primitives/band-header";
import { Container } from "@/components/primitives/container";
import { Link } from "@/components/primitives/link";
import { Section } from "@/components/primitives/section";
import { Text } from "@/components/primitives/text";
import { ABOUT_I18N } from "@/content/about";
import type { RichParagraph as ParagraphSegments } from "@/content/types";
import { useLanguage } from "@/context/language-context";
import * as tokens from "@/design/tokens";
import { cn } from "@/lib/cn";

const paragraphKey = (segments: ParagraphSegments) =>
  segments
    .map((segment) => (typeof segment === "string" ? segment : segment.text))
    .join("");

function RichParagraph({ segments }: { readonly segments: ParagraphSegments }) {
  return (
    <Text variant="body-md" className="text-pretty">
      {segments.map((segment) =>
        typeof segment === "string" ? (
          segment
        ) : (
          <Link key={segment.href} href={segment.href} variant="inline">
            {segment.text}
          </Link>
        ),
      )}
    </Text>
  );
}

export function About() {
  const { lang } = useLanguage();
  const about = ABOUT_I18N[lang];

  return (
    <Section id="about" surface="soft" labelledBy={headingId("about")}>
      <Container>
        <BandHeader
          id={about.header.id}
          eyebrow={about.header.eyebrow}
          heading={about.header.heading}
        />

        <div className="mt-16 grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-5">
            <ScrollReveal delay={50}>
              <Card3DTilt
                maxTilt={6}
                scale={1.02}
                glare={true}
                glareOpacity={0.15}
                className={tokens.overrides["photo-frame"]}
              >
                <div
                  className={cn(
                    tokens.overrides["photo-frame"],
                    "aspect-4/5 w-full",
                  )}
                >
                  <Image
                    src={about.photo.src}
                    alt={about.photo.alt}
                    sizes="(min-width: 768px) 45vw, 100vw"
                    placeholder="blur"
                    className="h-full w-full object-cover transition-transform duration-500 ease-out hover:scale-105"
                  />
                </div>
              </Card3DTilt>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={150} className="flex flex-col gap-6 md:col-span-7">
            {about.paragraphs.map((segments) => (
              <RichParagraph key={paragraphKey(segments)} segments={segments} />
            ))}

            <Text as="p" variant="title-sm">
              {about.quickBitsLead}
            </Text>

            <ul
              role="list"
              className="grid list-inside list-disc grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-x-8"
            >
              {about.quickBits.map((bit) => (
                <Text as="li" key={bit} variant="body-md">
                  {bit}
                </Text>
              ))}
            </ul>

            <Text variant="body-md" className="text-pretty">
              {about.closing}
            </Text>
          </ScrollReveal>
        </div>
      </Container>
    </Section>
  );
}