import type { SiteContent } from "./types";

export const SITE = {
  wordmark: "hermanprakoso.vercel.app",
  name: "Herman Prakoso",
  // Rendered verbatim into the OG image and JSON-LD. Keep it short or the OG
  // line wraps.
  jobTitle: "System Analyst & Fullstack Web Developer",
  url: "https://hermanprakoso.vercel.app",
  title:
    "Herman Prakoso — System Analyst, UI/UX Designer & Fullstack Web Developer",
  titleTemplate: "%s | Herman Prakoso",
  description:
    "System Analyst, UI/UX Designer, and Fullstack Web Developer based in Temanggung, Indonesia. Crafting end-to-end web solutions from system architecture and user-centric design to scalable code.",
  keywords: [
    "Herman Prakoso",
    "System Analyst",
    "UI/UX Designer",
    "Fullstack Web Developer",
    "Full Stack Developer",
    "Frontend Developer",
    "Backend Developer",
    "Web Developer Indonesia",
    "React Developer",
    "Next.js Developer",
    "TypeScript",
  ],
  ogTitle: "Herman Prakoso — System Analyst & Fullstack Web Developer",
  ogDescription:
    "Crafting functional, scalable web solutions from requirements analysis and UI/UX design to robust production code. Available for work and freelance projects.",
  ogImageAlt: "Herman Prakoso — System Analyst & Fullstack Web Developer",
  twitterTitle: "Herman Prakoso — System Analyst & Fullstack Web Developer",
  twitterDescription:
    "Crafting functional, scalable web solutions from requirements analysis and UI/UX design to robust production code.",
  locale: "en_US",
  themeColor: "white",
  locationLabel: "Temanggung, Indonesia · WIB (UTC+7)",
  locality: "Temanggung",
  region: "Jawa Tengah",
  countryCode: "ID",
  timeZone: "Asia/Jakarta",
  email: "herman.prakoso33@gmail.com",
  emailHref: "mailto:herman.prakoso33@gmail.com",
  phoneLabel: "+62 896-7364-7187",
  // Written by hand, not derived from phoneLabel — a string replace only swaps
  // the first match and once left a space in the number.
  phoneHref: "tel:+6289673647187",
  cv: {
    label: "Download CV",
    href: "/files/cv-herman-prakoso.pdf",
  },
  // One record read by both hero and footer, so they can never disagree. If
  // this flips to false: label becomes "Booked until <Month>" and the green
  // dot is not rendered at all.
  availability: { available: true, label: "Available for work / freelance" },
  social: [
    { label: "GitHub", href: "https://github.com/Tenku01", icon: "github" },
  ],
  repoUrl: "https://github.com/Tenku01/hermanprakoso",
  figmaTemplateUrl:
    "https://www.figma.com/community/file/1262992249991763120/Personal-Portfolio-Website-Template-%7C-Mobile-%26-Desktop",
  skipLinkLabel: "Skip to main content",
  mainLandmarkLabel: "Main content",
  notFound: {
    title: "Page not found",
    heading: "That page doesn't exist.",
    body: "The whole site lives on a single page, so there is not much to get lost in. The link below takes you back to it.",
    link: { label: "Back to the homepage", href: "/" },
  },
  errorPage: {
    title: "Something went wrong",
    heading: "Something went wrong.",
    body: "An unexpected error stopped this page from rendering. Trying again usually fixes it. If it keeps happening, email herman.prakoso33@gmail.com.",
    retryLabel: "Try again",
    link: { label: "Back to the homepage", href: "/" },
    digestLabel: "Error reference",
  },
} as const satisfies SiteContent;