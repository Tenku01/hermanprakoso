"use client";

import { MobileNav } from "@/components/islands/mobile-nav";
import { Button } from "@/components/primitives/button";
import { Container } from "@/components/primitives/container";
import { LanguageSwitcher } from "@/components/primitives/language-switcher";
import { Link } from "@/components/primitives/link";
import { NAV_I18N } from "@/content/nav";
import { useLanguage } from "@/context/language-context";
import * as tokens from "@/design/tokens";
import { cn } from "@/lib/cn";

export function SiteHeader() {
  const { lang } = useLanguage();
  const nav = NAV_I18N[lang];

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full",
        tokens.components["top-nav"],
        tokens.overrides["hairline-bottom"],
      )}
    >
      <Container className="flex h-full items-center justify-between gap-4">
        <Link
          href={nav.wordmark.href}
          variant="unstyled"
          className={cn(
            tokens.overrides["wordmark"],
            tokens.overrides["wordmark-hover"],
          )}
        >
          {nav.wordmark.label}
        </Link>

        <nav aria-label={nav.landmarkLabel} className="hidden md:block">
          <ul
            className={cn(
              tokens.components["nav-pill-group"],
              "flex items-center gap-1",
            )}
          >
            {nav.links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  variant="unstyled"
                  className={cn(
                    tokens.components["category-tab"],
                    tokens.overrides["category-tab-hover"],
                    "inline-flex items-center",
                  )}
                >
                  <span className="nav-label">{link.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <LanguageSwitcher />

          <Button variant="text-link" asChild className="hidden lg:inline-flex">
            <a href={nav.cv.href} download>
              {nav.cv.label}
            </a>
          </Button>
          <Button variant="primary" asChild className="hidden md:inline-flex">
            <a href={nav.cta.href}>{nav.cta.label}</a>
          </Button>
          <MobileNav
            wordmark={nav.wordmark}
            links={nav.links}
            cv={nav.cv}
            cta={nav.cta}
            openLabel={nav.menuOpenLabel}
            closeLabel={nav.menuCloseLabel}
            title={nav.menuTitle}
            className="md:hidden"
          />
        </div>
      </Container>
    </header>
  );
}