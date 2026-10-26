"use client";

import { MapPin } from "lucide-react";

import { BrandGitHub } from "@/components/icons/brand/github";
import { BrandX } from "@/components/icons/brand/x";
import { Card3DTilt } from "@/components/islands/card-3d-tilt";
import { Avatar } from "@/components/primitives/avatar";
import { Badge } from "@/components/primitives/badge";
import { headingId } from "@/components/primitives/band-header";
import { Button } from "@/components/primitives/button";
import { Container } from "@/components/primitives/container";
import { Icon } from "@/components/primitives/icon";
import { Link } from "@/components/primitives/link";
import { Section } from "@/components/primitives/section";
import { SocialList } from "@/components/primitives/social-list";
import { TerminalFrame } from "@/components/primitives/terminal-frame";
import { Text } from "@/components/primitives/text";
import { HERO_I18N } from "@/content/hero";
import { SITE } from "@/content/site";
import { useLanguage } from "@/context/language-context";
import * as tokens from "@/design/tokens";
import { cn } from "@/lib/cn";

const GLYPHS = {
  github: BrandGitHub,
  x: BrandX,
} as const;

export function Hero() {
  const { lang } = useLanguage();
  const hero = HERO_I18N[lang];

  const socials = SITE.social.map((social) => ({
    label: social.label,
    href: social.href,
    Glyph: GLYPHS[social.icon],
  }));

  return (
    <Section id="hero" surface="canvas" labelledBy={headingId("hero")}>
      <Container>
        <div className={tokens.layout["hero-grid"]}>
          <div
            className={cn(
              tokens.layout["hero-col-content"],
              "flex flex-col items-start gap-6",
            )}
          >
            <div className="flex items-center gap-3">
              <Avatar source={hero.portrait} loading="eager" sizes="36px" />
              <Badge>{hero.eyebrow}</Badge>
            </div>

            <Text
              as="h1"
              id={headingId("hero")}
              variant="display-xl"
              className="text-balance"
            >
              <span className="block">
                {hero.headlineLead}{" "}
                <span
                  aria-hidden="true"
                  className="group inline-block wave-origin motion-safe:animate-wave"
                >
                  <span className="inline-block wave-origin group-hover:motion-safe:animate-wave">
                    {hero.wave}
                  </span>
                </span>
              </span>
              <span className="block">{hero.headlineClaim}</span>
            </Text>

            <Text
              variant="body-md"
              className={cn(
                tokens.overrides["hero-subhead"],
                "max-w-xl text-pretty",
              )}
            >
              {hero.subhead}
            </Text>

            <div className="flex flex-wrap items-center gap-3">
              <Button
                variant="primary"
                asChild
                className="transition-transform duration-200 hover:-translate-y-0.5"
              >
                <Link href={hero.primary.href} variant="unstyled">
                  {hero.primary.label}
                </Link>
              </Button>
              <Button
                variant="secondary"
                asChild
                className="transition-transform duration-200 hover:-translate-y-0.5"
              >
                <Link href={hero.secondary.href} variant="unstyled">
                  {hero.secondary.label}
                </Link>
              </Button>
            </div>

            <div className="flex flex-col gap-2">
              <p className="flex items-center gap-2">
                <Icon icon={MapPin} />
                <Text as="span" variant="body-sm">
                  {hero.location}
                </Text>
              </p>
              <p className="flex items-center gap-2 ml-1">
                <span className="relative flex size-2 shrink-0">
                  {SITE.availability.available ? (
                    <span
                      aria-hidden="true"
                      className={cn(
                        tokens.overrides["availability-dot"],
                        "absolute inset-0 opacity-75 motion-safe:animate-ping",
                      )}
                    />
                  ) : null}
                  <span
                    aria-hidden="true"
                    className={cn(
                      SITE.availability.available
                        ? tokens.overrides["availability-dot"]
                        : tokens.overrides["availability-dot-muted"],
                      "relative",
                    )}
                  />
                </span>
                <Text as="span" variant="body-sm">
                  {SITE.availability.label}
                </Text>
              </p>
            </div>

            <SocialList items={socials} />
          </div>

          <div
            className={cn(tokens.layout["hero-col-mockup"], "lg:self-center")}
          >
            <Card3DTilt
              maxTilt={4}
              scale={1.01}
              glare={true}
              glareOpacity={0.08}
            >
              <TerminalFrame
                title={hero.terminal.title}
                lines={hero.terminal.lines}
              />
            </Card3DTilt>
          </div>
        </div>
      </Container>
    </Section>
  );
}