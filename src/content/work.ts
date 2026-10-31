import akaRentalShot from "@/assets/images/work/akarental.png";
import healthUiShot from "@/assets/images/work/HealthUI.png";
import kasTransparansiShot from "@/assets/images/work/kastransparansi.png";
import pusjianstralitbangShot from "@/assets/images/work/Pusjianstralitbang.png";
import rthpShot from "@/assets/images/work/RTHP.png";
import tenderplusShot from "@/assets/images/work/tenderplus.png";

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
          src: akaRentalShot,
          alt: "Tampilan antarmuka sistem manajemen reservasi rental mobil PT AKA",
        },
        linkLabel: "Lihat di GitHub",
      },
      {
        id: "website-dusun",
        name: "Website Dusun",
        domain: "dusundemangan.vercel.app",
        href: "https://dusundemangan.vercel.app/",
        featured: false,
        description:
          "Portal layanan publik dan transparansi keuangan kas Dusun Demangan. Memfasilitasi mutasi kas masuk-keluar secara akuntabel, katalog & peminjaman inventaris warga secara mandiri, tracking status pinjaman, serta rekapitulasi iuran listrik dusun.",
        role: "Full-stack Developer & UI/UX Designer — Menganalisis kebutuhan administrasi desa, merancang antarmuka responsif, membangun portal transparansi kas publik, alur pengajuan & persetujuan peminjaman barang, serta modul pencatatan iuran listrik warga.",
        stack: [
          "Laravel",
          "PHP",
          "Tailwind CSS",
          "Alpine.js",
          "MySQL",
          "Vercel",
        ],
        screenshot: {
          src: kasTransparansiShot,
          alt: "Tampilan antarmuka portal layanan dan transparansi kas Dusun Demangan",
        },
        linkLabel: "Kunjungi Website",
      },
      {
        id: "tenderplus",
        name: "Platform Monitoring Tender",
        domain: "tenderplus.id",
        href: "https://tenderplus.id/",
        featured: false,
        description:
          "Platform pemantauan informasi dan tahapan tender pengadaan barang/jasa bagi vendor pemerintah dengan visualisasi data terstruktur.",
        role: "UI/UX Designer — Merancang antarmuka website agar data spasial dan tabel pengadaan yang kompleks dapat dipahami dengan cepat dan mudah dinavigasi.",
        stack: [
          "Figma",
          "UI/UX Design",
          "Information Architecture",
          "Wireframing",
        ],
        screenshot: {
          src: tenderplusShot,
          alt: "Dashboard monitoring dan penyajian data pengadaan tender vendor TenderPlus",
        },
        linkLabel: "Kunjungi Website",
        figmaHref:
          "https://www.figma.com/design/kouH9jZh3HPCACEdyQ9Fsn/Tenderplus----Copy-?node-id=2228-41401&t=nXHJa05n1HmyqY0X-1",
        figmaLabel: "Lihat Desain Figma",
      },
      {
        id: "health-ui",
        name: "LIFE+ SuperApp Kesehatan",
        domain: "Juara 1 Lomba UI/UX",
        href: "https://www.figma.com/design/6iVSDNSshr5Cr1EXHY6LCU/Health---UI?node-id=304-23123&t=kAvNoIbWNS0yTL9i-1",
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
          src: healthUiShot,
          alt: "Mockup antarmuka aplikasi mobile kesehatan LIFE+",
        },
        linkLabel: "Lihat Desain Figma",
      },
      {
        id: "pusjianstralitbang",
        name: "Sistem Pengelolaan Arsip & Riset",
        domain: "Pusjianstralitbang",
        href: "https://www.figma.com/design/EkmrT7JtVGGp2O4smnA59L/PusjianStralitbang?node-id=0-1&t=UEiUVvktYoC2xBH9-1",
        featured: false,
        description:
          "Sistem berbasis web untuk manajemen pengarsipan dokumen dan pelacakan perkembangan (progress) penelitian secara terpusat, terstruktur, serta terintegrasi.",
        role: "UI/UX Designer & System Analyst — Menganalisis alur administrasi riset, menyusun arsitektur informasi, serta merancang wireframe dan prototipe antarmuka sistem.",
        stack: [
          "Figma",
          "UI/UX Design",
          "System Analysis",
          "Information Architecture",
        ],
        screenshot: {
          src: pusjianstralitbangShot,
          alt: "Antarmuka dashboard sistem arsip dan pelacakan riset Pusjianstralitbang",
        },
        linkLabel: "Lihat Desain Figma",
      },
      {
        id: "rthp",
        name: "Sistem Informasi RTHP Kota Yogyakarta",
        domain: "Pemerintah Kota Yogyakarta",
        href: "https://www.figma.com/design/CjAiulADb2mUAmiMhLD6Nw/RTHP-KOTA-YOGYAKARTA?node-id=83-228&t=kwjZzD9FLxei10gW-1",
        featured: false,
        description:
          "Perancangan antarmuka sistem informasi pemetaan spasial dan inventarisasi Ruang Terbuka Hijau Publik (RTHP) berbasis GIS untuk mempermudah monitoring kawasan perkotaan.",
        role: "UI/UX Designer — Merancang tata letak peta digital interaktif, navigasi data spasial persebaran RTHP, serta visualisasi dashboard status ruang terbuka hijau.",
        stack: [
          "Figma",
          "UI/UX Design",
          "GIS Interface",
          "Information Architecture",
          "Design System",
        ],
        screenshot: {
          src: rthpShot,
          alt: "Antarmuka sistem informasi pemetaan Ruang Terbuka Hijau Publik Kota Yogyakarta",
        },
        linkLabel: "Lihat Desain Figma",
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
          src: akaRentalShot,
          alt: "Fleet reservation management system interface for PT AKA",
        },
        linkLabel: "View on GitHub",
      },
      {
        id: "website-dusun",
        name: "Village Community Website",
        domain: "dusundemangan.vercel.app",
        href: "https://dusundemangan.vercel.app/",
        featured: false,
        description:
          "Integrated public service and financial transparency portal for Dusun Demangan. Enables public cash flow accountability, online community inventory borrowing with status tracking, and village utility fee administration.",
        role: "Full-stack Developer & UI/UX Designer — Analyzed community operational needs, designed responsive UI, implemented public financial ledger, asset loan workflows with admin approval, and utility billing management.",
        stack: [
          "Laravel",
          "PHP",
          "Tailwind CSS",
          "Alpine.js",
          "MySQL",
          "Vercel",
        ],
        screenshot: {
          src: kasTransparansiShot,
          alt: "User interface of Dusun Demangan public services and financial transparency portal",
        },
        linkLabel: "Visit Website",
      },
      {
        id: "tenderplus",
        name: "Tender Monitoring Platform",
        domain: "tenderplus.id",
        href: "https://tenderplus.id/",
        featured: false,
        description:
          "Procurement monitoring platform for government vendor tenders featuring structured spatial and tabular data visualizations.",
        role: "UI/UX Designer — Designed intuitive web dashboards to make complex procurement timelines and spatial data easy to navigate.",
        stack: [
          "Figma",
          "UI/UX Design",
          "Information Architecture",
          "Wireframing",
        ],
        screenshot: {
          src: tenderplusShot,
          alt: "TenderPlus procurement monitoring dashboard and vendor data presentation",
        },
        linkLabel: "Visit Website",
        figmaHref:
          "https://www.figma.com/design/kouH9jZh3HPCACEdyQ9Fsn/Tenderplus----Copy-?node-id=2228-41401&t=nXHJa05n1HmyqY0X-1",
        figmaLabel: "View Figma Design",
      },
      {
        id: "health-ui",
        name: "LIFE+ Healthcare SuperApp",
        domain: "1st Place UI/UX Competition",
        href: "https://www.figma.com/design/6iVSDNSshr5Cr1EXHY6LCU/Health---UI?node-id=304-23123&t=kAvNoIbWNS0yTL9i-1",
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
          src: healthUiShot,
          alt: "LIFE+ healthcare mobile app mockup",
        },
        linkLabel: "View Figma Design",
      },
      {
        id: "pusjianstralitbang",
        name: "Research & Archive Management System",
        domain: "Pusjianstralitbang",
        href: "https://www.figma.com/design/EkmrT7JtVGGp2O4smnA59L/PusjianStralitbang?node-id=0-1&t=UEiUVvktYoC2xBH9-1",
        featured: false,
        description:
          "Web-based archival management and research progress tracking system offering centralized and structured record keeping.",
        role: "UI/UX Designer & System Analyst — Analyzed research administrative processes, defined information architecture, and created wireframes and high-fidelity interactive prototypes.",
        stack: [
          "Figma",
          "UI/UX Design",
          "System Analysis",
          "Information Architecture",
        ],
        screenshot: {
          src: pusjianstralitbangShot,
          alt: "Dashboard interface for archival and research tracking system Pusjianstralitbang",
        },
        linkLabel: "View Figma Design",
      },
      {
        id: "rthp",
        name: "RTHP Yogyakarta Spatial Information System",
        domain: "Pemerintah Kota Yogyakarta",
        href: "https://www.figma.com/design/CjAiulADb2mUAmiMhLD6Nw/RTHP-KOTA-YOGYAKARTA?node-id=83-228&t=kwjZzD9FLxei10gW-1",
        featured: false,
        description:
          "UI/UX design for a spatial GIS mapping and public green open space (RTHP) inventory system, facilitating urban land conservation and environmental monitoring.",
        role: "UI/UX Designer — Designed interactive map interfaces, thematic spatial navigation for green open space distributions, and summary dashboard visualizations.",
        stack: [
          "Figma",
          "UI/UX Design",
          "GIS Interface",
          "Information Architecture",
          "Design System",
        ],
        screenshot: {
          src: rthpShot,
          alt: "Spatial mapping interface design for Public Green Open Spaces in Yogyakarta City",
        },
        linkLabel: "View Figma Design",
      },
    ],
  },
} as const satisfies Record<"id" | "en", WorkContent>;

export const WORK = WORK_I18N.id;