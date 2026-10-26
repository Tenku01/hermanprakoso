"use client";

import { BrandGitHub } from "@/components/icons/brand/github";
import { BrandX } from "@/components/icons/brand/x";
import { Container } from "@/components/primitives/container";
import { Link } from "@/components/primitives/link";
import { SocialList } from "@/components/primitives/social-list";
import { Text } from "@/components/primitives/text";
import type { RichLink } from "@/content/types";
import { FOOTER_I18N } from "@/content/footer";
import { SITE } from "@/content/site";
import { useLanguage } from "@/context/language-context";
import * as tokens from "@/design/tokens";
import { cn } from "@/lib/cn";
import { NOW } from "@/lib/now";

const BRAND_GLYPHS: Record<
  string,
  React.ComponentType<React.SVGProps<SVGSVGElement>> | undefined
> = {
  GitHub: BrandGitHub,
  X: BrandX,
};

const ROW_CLASS = cn(
  tokens.overrides["footer-link"],
  tokens.overrides["footer-link-hover"],
  tokens.overrides["focus-ring-dark"],
);

const isHandoff = (href: string) =>
  href.startsWith("mailto:") ||
  href.startsWith("tel:") ||
  href.startsWith("/files/");

export function SiteFooter() {
  const { lang } = useLanguage();
  const footer = FOOTER_I18N[lang];
  const availability = SITE.availability;

  const availabilityLabel =
    lang === "id"
      ? availability.label
      : availability.label.toLowerCase().includes("available")
        ? "Available for new projects"
        : availability.label;

  return (
    <footer
      aria-label={footer.landmarkLabel}
      className={tokens.components["footer"]}
    >
      <Container>
        <div className={tokens.layout["footer-grid"]}>
          <div className="flex flex-col items-start gap-4">
            <p className={tokens.overrides["wordmark-dark"]}>
              {footer.brand.wordmark}
            </p>
            <Text
              variant="body-sm"
              tone="on-dark-soft"
              className="max-w-xs text-pretty"
            >
              {footer.brand.tagline}
            </Text>
            <Text variant="body-sm" tone="on-dark-soft">
              {footer.brand.location}
            </Text>
            <p className={tokens.overrides["availability-pill-dark"]}>
              <span
                aria-hidden="true"
                className={
                  availability.available
                    ? tokens.overrides["availability-dot"]
                    : tokens.overrides["availability-dot-muted"]
                }
              />
              <Text as="span" variant="body-sm" tone="on-dark-soft">
                {availabilityLabel}
              </Text>
            </p>
          </div>

          {footer.columns.map((column) => {
            const socials = column.links.flatMap((link) => {
              const Glyph = BRAND_GLYPHS[link.label];
              return Glyph
                ? [{ label: link.label, href: link.href, Glyph }]
                : [];
            });
            const rows = column.links.filter(
              (link) => !BRAND_GLYPHS[link.label],
            );

            return (
              <div key={column.id} className="flex flex-col items-start gap-4">
                <h2 className={tokens.overrides["footer-heading"]}>
                  {column.heading}
                </h2>
                <ul role="list" className="flex flex-col gap-3">
                  {rows.map((link) => (
                    <li key={link.href}>
                      {isHandoff(link.href) ? (
                        <a
                          href={link.href}
                          download={
                            link.href.startsWith("/files/") || undefined
                          }
                          className={ROW_CLASS}
                        >
                          {link.label}
                        </a>
                      ) : (
                        <Link
                          href={link.href}
                          variant="unstyled"
                          className={ROW_CLASS}
                        >
                          {link.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
                {socials.length > 0 ? (
                  <SocialList items={socials} tone="dark" className="-ml-3" />
                ) : null}
              </div>
            );
          })}
        </div>

        <div className={cn(tokens.overrides["footer-divider"], "mt-12 pt-8")}>
          <Text variant="body-sm" tone="on-dark-soft" className="text-pretty">
            {footer.copyright.symbol} {NOW.getUTCFullYear()}{" "}
            {footer.copyright.owner} {footer.copyright.separator}{" "}
            {footer.copyright.segments.map((segment, idx) => {
              if (typeof segment === "string") {
                return <span key={idx}>{segment}</span>;
              }
              const link = segment as RichLink;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  variant="unstyled"
                  className={cn(ROW_CLASS, "underline underline-offset-4")}
                >
                  {link.text}
                </Link>
              );
            })}
          </Text>
        </div>
      </Container>
    </footer>
  );
}