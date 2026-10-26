import fiskilShot from "@/assets/images/work/fiskil.png";
import lanternShot from "@/assets/images/work/lantern.png";
import mokobokoShot from "@/assets/images/work/mokoboko.png";
import pepehousingShot from "@/assets/images/work/pepehousing.png";

import type { WorkContent } from "./types";

export const WORK_I18N = {
  id: {
    header: {
      id: "work",
      eyebrow: "Portofolio Proyek",
      heading: "Produk & Sistem yang Pernah Saya Bangun.",
      subhead:
        "Kombinasi analisis kebutuhan, perancangan antarmuka intuitif, dan implementasi kode siap guna.",
    },
    projects: [
      {
        id: "aka-rental",
        name: "Sistem Informasi Rental Mobil",
        domain: "PT AKA Mendunia Sejahtera",
        href: "https://github.com/Tenku01",
        featured: true,
        description:
          "Sistem reservasi armada rental mobil terintegrasi. Mencakup alur pemesanan lengkap, manajemen armada dan transaksi, pembayaran digital, serta komunikasi real-time.",
        role: "Programmer & System Analyst — Menganalisis proses bisnis, mendesain UI/UX di Figma, membangun backend & frontend dengan 5 role akses, payment gateway, dan fitur live chat WebSocket.",
        stack: [
          "Laravel",
          "PHP",
          "MySQL",
          "WebSocket",
          "Laravel Reverb",
          "Tailwind CSS",
          "Payment Gateway",
          "Figma",
        ],
        screenshot: {
          src: mokobokoShot,
          alt: "Tampilan antarmuka sistem manajemen reservasi rental mobil",
        },
        linkLabel: "Lihat di GitHub",
      },
      {
        id: "life-plus",
        name: "LIFE+ SuperApp Kesehatan",
        domain: "Juara 1 Lomba UI/UX",
        href: "https://github.com/Tenku01",
        featured: false,
        description:
          "Aplikasi mobile superApp kesehatan yang berfokus pada gaya hidup sehat, kemudahan navigasi, dan pengalaman pengguna yang seamless.",
        role: "UI/UX Researcher & Designer — Melakukan riset pengguna (wawancara & kuesioner), menyusun user flow, wireframe, prototype interaktif, hingga high-fidelity design.",
        stack: [
          "Figma",
          "UI/UX Design",
          "User Research",
          "Wireframing",
          "Prototyping",
          "Design System",
        ],
        screenshot: {
          src: lanternShot,
          alt: "Mockup antarmuka aplikasi mobile kesehatan LIFE+",
        },
        linkLabel: "Lihat Detail Proyek",
      },
      {
        id: "tender-monitoring",
        name: "Platform Monitoring Tender",
        domain: "Tenderplus.id",
        href: "https://github.com/Tenku01",
        featured: false,
        description:
          "Platform pemantauan informasi dan tahapan tender pengadaan barang/jasa bagi vendor pemerintah dengan visualisasi data terstruktur.",
        role: "UI/UX Designer — Merancang antarmuka website agar data spasial dan tabel pengadaan yang kompleks dapat dipahami dengan cepat dan mudah dinavigasi.",
        stack: ["Figma", "UI/UX Design", "Information Architecture", "Wireframing"],
        screenshot: {
          src: fiskilShot,
          alt: "Dashboard monitoring dan penyajian data tender vendor",
        },
        linkLabel: "Lihat Detail Proyek",
      },
      {
        id: "pusjianstralitbang-arsip",
        name: "Sistem Pengelolaan Arsip & Riset",
        domain: "Pusjianstralitbang",
        href: "https://github.com/Tenku01",
        featured: false,
        description:
          "Sistem berbasis web untuk manajemen pengarsipan dokumen dan pelacakan perkembangan (progress) penelitian secara terpusat, terstruktur, serta terintegrasi.",
        role: "UI/UX Designer & System Analyst — Menganalisis alur administrasi riset, menyusun arsitektur informasi, serta merancang wireframe dan prototipe antarmuka sistem.",
        stack: ["Figma", "UI/UX Design", "System Analysis", "Information Architecture"],
        screenshot: {
          src: pepehousingShot,
          alt: "Antarmuka dashboard sistem arsip dan pelacakan riset Pusjianstralitbang",
        },
        linkLabel: "Lihat Detail Proyek",
      },
    ],
  },
  en: {
    header: {
      id: "work",
      eyebrow: "Featured Projects",
      heading: "Selected Products & Systems Built.",
      subhead:
        "A synthesis of requirements analysis, intuitive interface design, and robust implementation.",
    },
    projects: [
      {
        id: "aka-rental",
        name: "Car Rental Information System",
        domain: "PT AKA Mendunia Sejahtera",
        href: "https://github.com/Tenku01",
        featured: true,
        description:
          "Integrated car rental fleet reservation system. Features full booking flows, fleet and transaction management, digital payment processing, and real-time messaging.",
        role: "Programmer & System Analyst — Analyzed business requirements, designed UI/UX in Figma, implemented backend & frontend supporting 5 user roles, payment gateway, and live chat via WebSockets.",
        stack: [
          "Laravel",
          "PHP",
          "MySQL",
          "WebSocket",
          "Laravel Reverb",
          "Tailwind CSS",
          "Payment Gateway",
          "Figma",
        ],
        screenshot: {
          src: mokobokoShot,
          alt: "Fleet reservation management system interface",
        },
        linkLabel: "View on GitHub",
      },
      {
        id: "life-plus",
        name: "LIFE+ Healthcare SuperApp",
        domain: "1st Place UI/UX Competition",
        href: "https://github.com/Tenku01",
        featured: false,
        description:
          "Healthcare mobile super-app centered on healthy living, intuitive navigation, and seamless user experience.",
        role: "UI/UX Researcher & Designer — Conducted user research (surveys & interviews), built user flows, wireframes, interactive prototypes, and production high-fidelity designs.",
        stack: [
          "Figma",
          "UI/UX Design",
          "User Research",
          "Wireframing",
          "Prototyping",
          "Design System",
        ],
        screenshot: {
          src: lanternShot,
          alt: "LIFE+ healthcare mobile app mockup",
        },
        linkLabel: "View Project Details",
      },
      {
        id: "tender-monitoring",
        name: "Tender Monitoring Platform",
        domain: "Tenderplus.id",
        href: "https://github.com/Tenku01",
        featured: false,
        description:
          "Procurement monitoring platform for government vendor tenders featuring structured spatial and tabular data visualizations.",
        role: "UI/UX Designer — Designed intuitive web dashboards to make complex procurement timelines and spatial data easy to navigate.",
        stack: ["Figma", "UI/UX Design", "Information Architecture", "Wireframing"],
        screenshot: {
          src: fiskilShot,
          alt: "Vendor tender data monitoring dashboard",
        },
        linkLabel: "View Project Details",
      },
      {
        id: "pusjianstralitbang-arsip",
        name: "Research & Archive Management System",
        domain: "Pusjianstralitbang",
        href: "https://github.com/Tenku01",
        featured: false,
        description:
          "Web-based archival management and research progress tracking system offering centralized and structured record keeping.",
        role: "UI/UX Designer & System Analyst — Analyzed research administrative processes, defined information architecture, and created wireframes and high-fidelity interactive prototypes.",
        stack: ["Figma", "UI/UX Design", "System Analysis", "Information Architecture"],
        screenshot: {
          src: pepehousingShot,
          alt: "Dashboard interface for archival and research tracking system",
        },
        linkLabel: "View Project Details",
      },
    ],
  },
} as const satisfies Record<"id" | "en", WorkContent>;

export const WORK = WORK_I18N.id;