import headshot from "@/assets/images/herman-headshot.jpeg";

import type { HeroContent } from "./types";

export const HERO_I18N = {
  id: {
    id: "hero",
    eyebrow: "System Analyst · UI/UX Designer · Fullstack Dev",
    headlineLead: "Halo, saya Herman",
    wave: "👋",
    headlineClaim: "Membangun produk web secara end-to-end.",
    subhead:
      "System Analyst, UI/UX Designer, dan Fullstack Web Developer. Menghubungkan arsitektur sistem yang jelas, antarmuka intuitif, dan kode tangguh menjadi solusi digital berdampak tinggi. Temanggung, Indonesia — terbuka untuk kolaborasi jarak jauh.",
    primary: { label: "Mulai proyek", href: "#contact" },
    secondary: { label: "Lihat karya saya", href: "#work" },
    location: "Temanggung, Indonesia · WIB (UTC+7)",
    portrait: { src: headshot, alt: "" },
    terminal: {
      title: "herman@dev",
      lines: [
        { kind: "prompt", text: "cari builder end-to-end" },
        { kind: "result", text: "Ditemukan 1: Herman Prakoso" },
        { kind: "branch", text: "System Analysis & Flowchart" },
        { kind: "branch", text: "UI/UX Design in Figma" },
        { kind: "branch", text: "Fullstack Web & APIs" },
        { kind: "branch", text: "Solusi Bersih & Scalable" },
        { kind: "status", text: "Tersedia untuk kerja/proyek" },
        { kind: "prompt", text: "rekrut sekarang", cursor: true },
      ],
    },
  },
  en: {
    id: "hero",
    eyebrow: "System Analyst · UI/UX Designer · Fullstack Dev",
    headlineLead: "Hi, I'm Herman",
    wave: "👋",
    headlineClaim: "I build web products end to end.",
    subhead:
      "System Analyst, UI/UX Designer, and Fullstack Web Developer. Bridging clear system architecture, intuitive interfaces, and robust code into high-impact digital solutions. Temanggung, Indonesia — open for remote collaborations.",
    primary: { label: "Start a project", href: "#contact" },
    secondary: { label: "See my work", href: "#work" },
    location: "Temanggung, Indonesia · WIB (UTC+7)",
    portrait: { src: headshot, alt: "" },
    terminal: {
      title: "herman@dev",
      lines: [
        { kind: "prompt", text: "find an end-to-end builder" },
        { kind: "result", text: "Found 1 match: Herman Prakoso" },
        { kind: "branch", text: "System Analysis & Flowchart" },
        { kind: "branch", text: "UI/UX Design in Figma" },
        { kind: "branch", text: "Fullstack Web & APIs" },
        { kind: "branch", text: "Clean, Scalable Solutions" },
        { kind: "status", text: "Available for work/freelance" },
        { kind: "prompt", text: "hire him", cursor: true },
      ],
    },
  },
} as const satisfies Record<"id" | "en", HeroContent>;

export const HERO = HERO_I18N.id;