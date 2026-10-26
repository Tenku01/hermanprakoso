"use client";

import { Mail, Phone } from "lucide-react";

import { Card3DTilt } from "@/components/islands/card-3d-tilt";
import { CopyButton } from "@/components/islands/copy-button";
import { Badge } from "@/components/primitives/badge";
import { headingId } from "@/components/primitives/band-header";
import { Button } from "@/components/primitives/button";
import { Card } from "@/components/primitives/card";
import { Container } from "@/components/primitives/container";
import { Icon } from "@/components/primitives/icon";
import { Section } from "@/components/primitives/section";
import { Text } from "@/components/primitives/text";
import { CTA_I18N } from "@/content/cta";
import { useLanguage } from "@/context/language-context";
import * as tokens from "@/design/tokens";
import { cn } from "@/lib/cn";

const ROW_ICONS = { email: Mail, phone: Phone } as const;

export function CtaBand() {
  const { lang } = useLanguage();
  const cta = CTA_I18N[lang];

  return (
    <Section id="contact" surface="canvas" labelledBy={headingId("contact")}>
      <Container>
        <Card3DTilt maxTilt={2.5} scale={1.005} glare={true} glareOpacity={0.06}>
          <Card surface="muted" className="p-12">
            <div className="flex flex-col items-center text-center">
              <Badge>{cta.eyebrow}</Badge>

              <Text
                as="h2"
                id={headingId("contact")}
                variant="display-sm"
                className="mt-4 text-balance"
              >
                {cta.heading}
              </Text>

              <Text
                variant="body-md"
                tone="body"
                className="mt-4 max-w-xl text-pretty"
              >
                {cta.subhead}
              </Text>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <Button
                  variant="primary"
                  asChild
                  className="transition-transform duration-200 hover:-translate-y-0.5"
                >
                  <a href={cta.primary.href}>{cta.primary.label}</a>
                </Button>
                <Button
                  variant="secondary"
                  asChild
                  className="transition-transform duration-200 hover:-translate-y-0.5"
                >
                  <a href={cta.secondary.href} download>
                    {cta.secondary.label}
                  </a>
                </Button>
              </div>

            <Text variant="body-sm" tone="body" className="mt-10">
              {cta.contactsLead}
            </Text>

            <ul role="list" className="mt-4 flex flex-col items-center gap-3">
              {cta.contacts.map((row) => (
                <li key={row.id} className="flex items-center gap-3">
                  <Icon icon={ROW_ICONS[row.id as keyof typeof ROW_ICONS]} />
                  <a
                    href={row.href}
                    className={cn(
                      tokens.overrides["contact-link"],
                      tokens.overrides["focus-ring-inline"],
                    )}
                  >
                    {row.value}
                  </a>
                  <CopyButton
                    value={row.value}
                    label={row.copyLabel}
                    copiedLabel={row.copiedLabel}
                  />
                </li>
              ))}
            </ul>
          </div>
        </Card>
      </Card3DTilt>
      </Container>
    </Section>
  );
}