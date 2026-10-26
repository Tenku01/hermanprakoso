import type { StaticImageData } from "next/image";

import gamalogo from "@/assets/images/companies/logo-gama.webp";
import swevellogo from "@/assets/images/companies/logo-swevel.jpg";
import akalogo from "@/assets/images/companies/logoakarentcar.png";

import type { ExperienceContent } from "./types";

const LOGOS: Readonly<Record<string, StaticImageData>> = {
  aka: akalogo,
  swevel: swevellogo,
  gama: gamalogo,
};

export const EXPERIENCE_I18N = {
  id: {
    header: {
      id: "experience",
      eyebrow: "Pengalaman Kerja",
      heading: "Riwayat Profesional & Praktik Industri.",
      subhead:
        "Perjalanan dalam analisis kebutuhan, perancangan antarmuka UI/UX, hingga implementasi kode sistem nyata.",
    },
    roles: [
      {
        id: "aka-mendunia",
        company: "PT AKA Mendunia Sejahtera",
        position: "Programmer & System Analyst",
        logo: LOGOS.aka,
        startISO: "2026-02",
        endISO: "2026-06",
        bullets: [
          "Menganalisis proses bisnis dan kebutuhan pengguna untuk perancangan sistem informasi rental mobil berbasis web.",
          "Merancang alur sistem, arsitektur database MySQL, serta purwarupa antarmuka di Figma.",
          "Mengembangkan aplikasi web menggunakan Laravel dengan 5 role akses pengguna yang berbeda.",
          "Mengintegrasikan payment gateway digital dan fitur live chat real-time menggunakan WebSocket (Laravel Reverb).",
          "Menyusun dokumentasi teknis menyeluruh serta melakukan pengujian fungsionalitas fitur sistem.",
        ],
      },
      {
        id: "swevel",
        company: "PT Swevel Universal Media",
        position: "UI/UX Designer & System Analyst Intern",
        logo: LOGOS.swevel,
        startISO: "2025-09",
        endISO: "2026-01",
        bullets: [
          "Merancang antarmuka web dan aplikasi di Figma dengan memprioritaskan usability dan konsistensi visual.",
          "Menyusun user flow, wireframe, prototype interaktif, hingga high-fidelity design siap serah-terima pengembang.",
          "Menyusun dokumen spesifikasi kebutuhan perangkat lunak (SRS), Software Design Description (SDD), dan Manual Book.",
          "Berkolaborasi langsung dengan tim pengembang untuk memvalidasi kelayakan implementasi desain.",
          "Melakukan iterasi berkala berdasarkan umpan balik pengguna dan hasil evaluasi pengujian antarmuka.",
        ],
      },
      {
        id: "gama-integra",
        company: "PT Gama Integra Informatika",
        position: "UI/UX Designer & System Analyst Intern",
        logo: LOGOS.gama,
        startISO: "2025-01",
        endISO: "2025-06",
        bullets: [
          "Merancang antarmuka produk digital berbasis web dan mobile mengadopsi prinsip user-centered design.",
          "Mengembangkan wireframe, prototype, serta panduan gaya (design system) untuk memudahkan tim developer.",
          "Melakukan wawancara dan penggalian kebutuhan pengguna sebagai basis perumusan solusi antarmuka.",
          "Menjalankan evaluasi usability dan perbaikan desain berkelanjutan guna meningkatkan user experience.",
        ],
      },
    ],
  },
  en: {
    header: {
      id: "experience",
      eyebrow: "Work Experience",
      heading: "Professional History & Industry Practice.",
      subhead:
        "Track record spanning requirements analysis, UI/UX interface design, and production system development.",
    },
    roles: [
      {
        id: "aka-mendunia",
        company: "PT AKA Mendunia Sejahtera",
        position: "Programmer & System Analyst",
        logo: LOGOS.aka,
        startISO: "2026-02",
        endISO: "2026-06",
        bullets: [
          "Analyzed business workflows and user requirements to architect a web-based car rental information system.",
          "Engineered system architecture, MySQL database schemas, and interactive interface prototypes in Figma.",
          "Developed web application using Laravel with 5 distinct role-based access control levels.",
          "Integrated digital payment gateways and implemented real-time chat via WebSockets (Laravel Reverb).",
          "Authored technical documentation and led comprehensive functional testing across all features.",
        ],
      },
      {
        id: "swevel",
        company: "PT Swevel Universal Media",
        position: "UI/UX Designer & System Analyst Intern",
        logo: LOGOS.swevel,
        startISO: "2025-09",
        endISO: "2026-01",
        bullets: [
          "Crafted web and application interfaces in Figma prioritizing usability, accessibility, and visual hierarchy.",
          "Produced user flows, wireframes, interactive prototypes, and production-ready high-fidelity handoffs.",
          "Authored Software Requirements Specifications (SRS), Software Design Descriptions (SDD), and user guides.",
          "Collaborated directly with engineering teams to evaluate technical feasibility and design fidelity.",
          "Executed design iterations guided by user testing feedback and cognitive walkthrough evaluations.",
        ],
      },
      {
        id: "gama-integra",
        company: "PT Gama Integra Informatika",
        position: "UI/UX Designer & System Analyst Intern",
        logo: LOGOS.gama,
        startISO: "2025-01",
        endISO: "2025-06",
        bullets: [
          "Designed digital web and mobile product interfaces following user-centered design principles.",
          "Created wireframes, interactive prototypes, and scalable design systems for engineering teams.",
          "Conducted stakeholder interviews and user inquiries to define concrete interface requirements.",
          "Conducted usability evaluations and iterative UI enhancements to elevate user experience.",
        ],
      },
    ],
  },
} as const satisfies Record<"id" | "en", ExperienceContent>;

export const EXPERIENCE = EXPERIENCE_I18N.id;