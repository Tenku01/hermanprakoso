import { HERO } from "@/content/hero";
import { SITE } from "@/content/site";
import { TECH } from "@/content/tech";

type JsonLdGraph = Record<string, unknown>;

// Fragment ids deliberately contain non-hex letters so scripts/check-tokens.mjs
// cannot mistake them for #rrggbb literals.
const PERSON_ID = `${SITE.url}/#person`;
const PROFILE_ID = `${SITE.url}/#profile`;

// StaticImageData.src is a build-hashed /_next/static/media/... path. Absolutising
// it is required: schema.org consumers reject relative URLs.
const absolute = (path: string): string => new URL(path, SITE.url).toString();

export function buildPersonGraph(): JsonLdGraph {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": PROFILE_ID,
    url: SITE.url,
    name: SITE.title,
    inLanguage: "id",
    mainEntity: {
      "@type": "Person",
      "@id": PERSON_ID,
      name: SITE.name,
      jobTitle: SITE.jobTitle,
      description: SITE.description,
      url: SITE.url,
      image: absolute(HERO.portrait.src.src),
      email: SITE.email,
      telephone: SITE.phoneLabel,
      address: {
        "@type": "PostalAddress",
        addressLocality: SITE.locality,
        addressRegion: SITE.region,
        addressCountry: SITE.countryCode,
      },
      sameAs: SITE.social.map((link) => link.href),
      knowsAbout: TECH.groups.flatMap((group) =>
        group.items.map((item) => item.name),
      ),
    },
  };
}

// JSON.stringify does not escape "<", so a "</script>" inside any content string
// would close the tag early. The Next JSON-LD guide's documented scrub.
export function jsonLdScript(graph: JsonLdGraph): string {
  return JSON.stringify(graph).replace(/</g, "\\u003c");
}
