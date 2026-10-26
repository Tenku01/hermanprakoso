import type { NavContent } from "./types";

export const NAV_I18N = {
  id: {
    landmarkLabel: "Navigasi utama",
    wordmark: {
      label: "hermanpr.dev",
      href: "#hero",
    },
    links: [
      { href: "#about", label: "Tentang" },
      { href: "#stack", label: "Keahlian" },
      { href: "#experience", label: "Pengalaman" },
      { href: "#work", label: "Proyek" },
      { href: "#contact", label: "Kontak" },
    ],
    cv: {
      label: "Unduh CV",
      href: "/files/cv-herman-prakoso.pdf",
    },
    cta: {
      label: "Hubungi Saya",
      href: "#contact",
    },
    menuOpenLabel: "Buka menu",
    menuCloseLabel: "Tutup menu",
    menuTitle: "Navigasi",
  },
  en: {
    landmarkLabel: "Main navigation",
    wordmark: {
      label: "hermanpr.dev",
      href: "#hero",
    },
    links: [
      { href: "#about", label: "About" },
      { href: "#stack", label: "Skills" },
      { href: "#experience", label: "Experience" },
      { href: "#work", label: "Projects" },
      { href: "#contact", label: "Contact" },
    ],
    cv: {
      label: "Download CV",
      href: "/files/cv-herman-prakoso.pdf",
    },
    cta: {
      label: "Get in Touch",
      href: "#contact",
    },
    menuOpenLabel: "Open menu",
    menuCloseLabel: "Close menu",
    menuTitle: "Navigation",
  },
} as const satisfies Record<"id" | "en", NavContent>;

// Ekspor fallback agar kompatibel jika ada file lain yang masih mengimpor NAV lama
export const NAV = NAV_I18N.id;