import type { StaticImageData } from "next/image";

import type { IsoMonth, IsoMonthOrPresent } from "@/lib/duration";

export const SECTION_IDS = [
  "hero",
  "about",
  "work",
  "stack",
  "experience",
  "contact",
] as const;

export type SectionId = (typeof SECTION_IDS)[number];

// The hash arm only accepts real section ids, so a misspelled section link is
// a compile error instead of a silent dead link.
export type Href =
  | `#${SectionId}`
  | `/${string}`
  | `https://${string}`
  | `mailto:${string}`
  | `tel:${string}`;

export interface LinkItem {
  readonly label: string;
  readonly href: Href;
}

export interface Photo {
  readonly src: StaticImageData;
  readonly alt: string;
}

export type AvatarTone = "orange" | "pink" | "violet" | "emerald";

export interface InitialsAvatar {
  readonly initials: string;
  readonly tone: AvatarTone;
}

export type AvatarSource = Photo | InitialsAvatar;

export interface BandHeaderContent {
  readonly id: SectionId;
  readonly eyebrow: string;
  readonly heading: string;
  readonly subhead?: string;
}

export type BrandIconName = "github" | "x";

export interface SocialLink {
  readonly label: string;
  readonly href: `https://${string}`;
  readonly icon: BrandIconName;
}

export interface Availability {
  readonly available: boolean;
  readonly label: string;
}

export interface NotFoundContent {
  readonly title: string;
  readonly heading: string;
  readonly body: string;
  readonly link: LinkItem;
}

export interface ErrorPageContent {
  readonly title: string;
  readonly heading: string;
  readonly body: string;
  readonly retryLabel: string;
  readonly link: LinkItem;
  readonly digestLabel: string;
}

export interface SiteContent {
  readonly wordmark: string;
  readonly name: string;
  readonly jobTitle: string;
  readonly url: `https://${string}`;
  readonly title: string;
  readonly titleTemplate: string;
  readonly description: string;
  readonly keywords: readonly string[];
  readonly ogTitle: string;
  readonly ogDescription: string;
  readonly ogImageAlt: string;
  readonly twitterTitle: string;
  readonly twitterDescription: string;
  readonly locale: string;
  // A CSS colour name, never a hex code: check-tokens fails the build on any
  // hex literal under src/.
  readonly themeColor: string;
  readonly locationLabel: string;
  readonly locality: string;
  readonly region: string;
  readonly countryCode: string;
  readonly timeZone: string;
  readonly email: string;
  readonly emailHref: `mailto:${string}`;
  readonly phoneLabel: string;
  readonly phoneHref: `tel:${string}`;
  readonly cv: LinkItem;
  readonly availability: Availability;
  readonly social: readonly SocialLink[];
  readonly repoUrl: `https://${string}`;
  readonly figmaTemplateUrl: `https://${string}`;
  readonly skipLinkLabel: string;
  readonly mainLandmarkLabel: string;
  readonly notFound: NotFoundContent;
  readonly errorPage: ErrorPageContent;
}

export interface NavContent {
  readonly wordmark: LinkItem;
  readonly landmarkLabel: string;
  readonly links: readonly LinkItem[];
  readonly cv: LinkItem;
  readonly cta: LinkItem;
  readonly menuOpenLabel: string;
  readonly menuCloseLabel: string;
  readonly menuTitle: string;
}

export type TerminalLineKind = "prompt" | "result" | "branch" | "status";

// Data only — the glyph each kind renders as (">", "✓", tree bars) lives in
// the TerminalFrame primitive.
export interface TerminalLine {
  readonly kind: TerminalLineKind;
  readonly text: string;
  readonly cursor?: boolean;
}

export interface HeroTerminal {
  readonly title: string;
  // Line count is free — typewriter timing is computed per line from text
  // length — but keep around 8 lines so the hero columns stay balanced.
  readonly lines: readonly TerminalLine[];
}

export interface HeroContent {
  readonly id: SectionId;
  readonly eyebrow: string;
  readonly headlineLead: string;
  readonly wave: string;
  readonly headlineClaim: string;
  readonly subhead: string;
  readonly primary: LinkItem;
  readonly secondary: LinkItem;
  readonly location: string;
  readonly portrait: Photo;
  readonly terminal: HeroTerminal;
}

// Logo files crop very differently — shosho is edge-to-edge letters, wingie
// has tall padding — so equal file height does not look equal on screen. Each
// mark's size is measured by eye, not computed.
export type TrustMarkSize = "sm" | "md" | "lg";

export interface TrustMark {
  readonly name: string;
  readonly href?: `https://${string}`;
  readonly logo?: StaticImageData;
  readonly size?: TrustMarkSize;
}

export interface TrustBarContent {
  readonly intro: string;
  readonly marks: readonly TrustMark[];
}

export type CapabilityIconName = "bot" | "layers" | "pen-tool";

export interface Capability {
  readonly id: string;
  readonly icon: CapabilityIconName;
  readonly title: string;
  readonly body: string;
}

export interface CapabilitiesContent {
  readonly header: BandHeaderContent;
  readonly items: readonly Capability[];
}

export interface RichLink {
  readonly text: string;
  readonly href: Href;
}

export type RichParagraph = readonly (string | RichLink)[];

export interface AboutContent {
  readonly header: BandHeaderContent;
  readonly photo: Photo;
  readonly paragraphs: readonly RichParagraph[];
  readonly quickBitsLead: string;
  readonly quickBits: readonly string[];
  readonly closing: string;
}

export interface Project {
  readonly id: string;
  readonly name: string;
  readonly domain: string;
  readonly href: `https://${string}`;
  readonly featured: boolean;
  readonly description: string;
  readonly role: string;
  readonly stack: readonly string[];
  readonly screenshot: Photo;
  readonly linkLabel: string;
}

export interface WorkContent {
  readonly header: BandHeaderContent;
  readonly projects: readonly Project[];
}

export interface TechItem {
  name: string;
  href: string;
  logo: string | StaticImageData;
}

export interface TechGroup {
  readonly id: string;
  readonly title: string;
  readonly descriptor: string;
  readonly items: readonly TechItem[];
}

export interface TechContent {
  readonly header: BandHeaderContent;
  readonly groups: readonly TechGroup[];
}

export interface Role {
  readonly id: string;
  readonly company: string;
  readonly position: string;
  readonly logo: StaticImageData;
  readonly startISO: IsoMonth;
  readonly endISO: IsoMonthOrPresent;
  readonly bullets: readonly string[];
}

export interface ExperienceContent {
  readonly header: BandHeaderContent;
  readonly roles: readonly Role[];
}

export interface Testimonial {
  readonly id: string;
  readonly name: string;
  readonly title: string;
  readonly quote: string;
  readonly avatar: AvatarSource;
}

export interface TestimonialsContent {
  readonly header: BandHeaderContent;
  readonly items: readonly Testimonial[];
}

export interface FaqItem {
  readonly id: string;
  readonly question: string;
  readonly answer: string;
}

export interface FaqContent {
  readonly header: BandHeaderContent;
  readonly groupName: string;
  readonly items: readonly FaqItem[];
}

export interface ContactRow {
  readonly id: string;
  readonly label: string;
  readonly value: string;
  readonly href: Href;
  readonly copyLabel: string;
  readonly copiedLabel: string;
}

export interface CtaContent {
  readonly id: SectionId;
  readonly eyebrow: string;
  readonly heading: string;
  readonly subhead: string;
  readonly primary: LinkItem;
  readonly secondary: LinkItem;
  readonly contactsLead: string;
  readonly contacts: readonly ContactRow[];
}

export interface FooterBrand {
  readonly wordmark: string;
  readonly tagline: string;
  readonly location: string;
}

export interface FooterColumn {
  readonly id: string;
  readonly heading: string;
  readonly links: readonly LinkItem[];
}

export interface FooterCopyright {
  readonly symbol: string;
  readonly owner: string;
  readonly separator: string;
  readonly segments: RichParagraph;
}

export interface FooterContent {
  readonly landmarkLabel: string;
  readonly brand: FooterBrand;
  readonly columns: readonly FooterColumn[];
  readonly copyright: FooterCopyright;
}
