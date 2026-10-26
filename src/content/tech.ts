import drawioLogo from "@/assets/images/tech/draw-io-seeklogo.svg";

import type { TechContent } from "./types";

const GROUPS_BASE = (lang: "id" | "en") => [
  {
    id: "analysis-design",
    title: lang === "id" ? "UI/UX & Analisis Sistem" : "UI/UX & System Analysis",
    descriptor:
      lang === "id"
        ? "Riset pengguna, pemodelan alur kerja sistem, dan prototyping interaktif."
        : "User research, system workflow modeling, and interactive prototyping.",
    items: [
      { name: "Figma", href: "https://www.figma.com/", logo: "figma" },
      { name: "Draw.io", href: "https://app.diagrams.net/", logo: drawioLogo },
    ],
  },
  {
    id: "frontend",
    title: "Frontend Development",
    descriptor:
      lang === "id"
        ? "Membangun antarmuka web modern yang responsif, modular, dan terstruktur."
        : "Building responsive, modular, and cleanly structured modern web interfaces.",
    items: [
      { name: "Tailwind CSS", href: "https://tailwindcss.com/", logo: "tailwindcss" },
      { name: "JavaScript", href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript", logo: "js" },
      { name: "TypeScript", href: "https://www.typescriptlang.org/", logo: "typescript" },
      { name: "Next.js", href: "https://nextjs.org/", logo: "nextjs" },
    ],
  },
  {
    id: "backend-data",
    title: "Backend & Database",
    descriptor:
      lang === "id"
        ? "Pengelolaan database relasional, logika backend, dan arsitektur RESTful API."
        : "Relational database design, backend business logic, and RESTful API architecture.",
    items: [
      { name: "PHP", href: "https://www.php.net/", logo: "php" },
      { name: "Laravel", href: "https://laravel.com/", logo: "laravel" },
      { name: "MySQL", href: "https://www.mysql.com/", logo: "mysql" },
      { name: "Node.js", href: "https://nodejs.org/", logo: "nodejs" },
    ],
  },
  {
    id: "tooling-docs",
    title: lang === "id" ? "Dokumentasi & Alat Kerja" : "Tooling & Documentation",
    descriptor:
      lang === "id"
        ? "Penyusunan dokumen SRS/alur sistem, version control, dan text editor."
        : "Software requirements specifications, version control, and dev environment.",
    items: [
      { name: "VS Code", href: "https://code.visualstudio.com/", logo: "vscode" },
      { name: "Git", href: "https://git-scm.com/", logo: "git" },
      { name: "GitHub", href: "https://github.com/", logo: "github" },
    ],
  },
];

export const TECH_I18N = {
  id: {
    header: {
      id: "stack",
      eyebrow: "Keahlian & Perangkat",
      heading: "Tools & Teknologi Andalan.",
      subhead:
        "Perangkat analisis kebutuhan, desain antarmuka, arsitektur database, dan pengembangan aplikasi web.",
    },
    groups: GROUPS_BASE("id"),
  },
  en: {
    header: {
      id: "stack",
      eyebrow: "Skills & Tooling",
      heading: "Core Stack & Technologies.",
      subhead:
        "Tools for requirements analysis, interface design, database architecture, and web application development.",
    },
    groups: GROUPS_BASE("en"),
  },
} as const satisfies Record<"id" | "en", TechContent>;

export const TECH = TECH_I18N.id;