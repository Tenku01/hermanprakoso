import type { FooterContent } from "./types";

export const FOOTER_I18N = {
  id: {
    landmarkLabel: "Site footer",
    brand: {
      wordmark: "hermanprakoso.vercel.app",
      tagline: "System Analyst, UI/UX Designer & Fullstack Web Developer.",
      location: "Temanggung, Jawa Tengah · WIB (UTC+7)",
    },
    columns: [
      {
        id: "sections",
        heading: "Navigasi",
        links: [
          { label: "Proyek", href: "#work" },
          { label: "Tentang", href: "#about" },
          { label: "Keahlian", href: "#stack" },
          { label: "Pengalaman", href: "#experience" },
          { label: "Kontak", href: "#contact" },
        ],
      },
      {
        id: "connect",
        heading: "Hubungi Saya",
        links: [
          { label: "Email", href: "mailto:herman.prakoso33@gmail.com" },
          { label: "WhatsApp", href: "https://wa.me/6289673647187" },
          { label: "GitHub", href: "https://github.com/Tenku01" },
        ],
      },
      {
        id: "resources",
        heading: "Berkas & Tautan",
        links: [
          {
            label: "Unduh CV",
            href: "/files/cv-herman-prakoso.pdf",
          },
          {
            label: "Source Code GitHub",
            href: "https://github.com/Tenku01",
          },
        ],
      },
    ],
    copyright: {
      symbol: "©",
      owner: "Herman Prakoso",
      separator: "·",
      segments: [
        "Dibangun dengan Next.js & Tailwind CSS · Temanggung, Indonesia.",
      ],
    },
  },
  en: {
    landmarkLabel: "Site footer",
    brand: {
      wordmark: "hermanprakoso.vercel.app",
      tagline: "System Analyst, UI/UX Designer & Fullstack Web Developer.",
      location: "Temanggung, Central Java · WIB (UTC+7)",
    },
    columns: [
      {
        id: "sections",
        heading: "Navigation",
        links: [
          { label: "Projects", href: "#work" },
          { label: "About", href: "#about" },
          { label: "Skills", href: "#stack" },
          { label: "Experience", href: "#experience" },
          { label: "Contact", href: "#contact" },
        ],
      },
      {
        id: "connect",
        heading: "Connect",
        links: [
          { label: "Email", href: "mailto:herman.prakoso33@gmail.com" },
          { label: "WhatsApp", href: "https://wa.me/6289673647187" },
          { label: "GitHub", href: "https://github.com/Tenku01" },
        ],
      },
      {
        id: "resources",
        heading: "Resources & Links",
        links: [
          {
            label: "Download CV",
            href: "/files/cv-herman-prakoso.pdf",
          },
          {
            label: "GitHub Repository",
            href: "https://github.com/Tenku01",
          },
        ],
      },
    ],
    copyright: {
      symbol: "©",
      owner: "Herman Prakoso",
      separator: "·",
      segments: [
        "Built with Next.js & Tailwind CSS · Temanggung, Indonesia.",
      ],
    },
  },
} as const satisfies Record<"id" | "en", FooterContent>;

export const FOOTER = FOOTER_I18N.id;