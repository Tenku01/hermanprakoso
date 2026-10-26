import familyPhoto from "@/assets/images/herman-full.jpeg";

import type { AboutContent } from "./types";

export const ABOUT_I18N = {
  id: {
    header: {
      id: "about",
      eyebrow: "Tentang Saya",
      heading: "Menghubungkan analisis sistem, desain intuitif, dan kode yang andal.",
    },
    photo: {
      src: familyPhoto,
      alt: "Foto profil Herman Prakoso",
    },
    paragraphs: [
      [
        "Saya seorang praktisi teknologi yang bergerak dari hulu ke hilir pengembangan produk digital — mulai dari analisis kebutuhan sistem, perancangan antarmuka (UI/UX), hingga penulisan kode siap pakai. Bagi saya, kejelasan alur logika, kemudahan pengguna, dan struktur kode yang rapi memiliki prioritas yang setara.",
      ],
      [
        "Pendekatan kerja saya selalu berpusat pada solusi nyata: memahami permasalahan bisnis terlebih dahulu, merancang wireframe dan prototipe interaktif di Figma, lalu menerjemahkannya menjadi aplikasi web fungsional yang responsif dan terukur.",
      ],
      [
        "Memiliki latar belakang di analisis sistem dan desain membuat proses pengembangan jadi jauh lebih efisien. Minim miskomunikasi antara perancangan dan teknis, keputusan arsitektur bisa diambil lebih cepat, dan produk akhir tetap sesuai dengan rencana awal.",
      ],
      [
        "Saat tidak sedang menyusun sistem atau menulis kode, saya senang mengeksplorasi tren teknologi terbaru, memperdalam arsitektur aplikasi modern, serta mendokumentasikan progres proyek di ",
        { text: "GitHub", href: "https://github.com/Tenku01" },
        ".",
      ],
    ],
    quickBitsLead: "Sekilas tentang saya:",
    quickBits: [
      "System Analyst & UI/UX Designer",
      "Fullstack Web Developer",
      "Berbasis di Temanggung, Jawa Tengah (WIB)",
      "Fokus pada workflow efisien & arsitektur rapi",
      "Terbiasa dari tahap riset hingga deployment",
      "Terbuka untuk kolaborasi jarak jauh (remote)",
    ],
    closing:
      "Tertarik berkolaborasi atau punya proyek yang ingin direalisasikan? Mari berdiskusi santai.",
  },
  en: {
    header: {
      id: "about",
      eyebrow: "About Me",
      heading: "Bridging system analysis, intuitive design, and reliable code.",
    },
    photo: {
      src: familyPhoto,
      alt: "Profile photo of Herman Prakoso",
    },
    paragraphs: [
      [
        "I am a technology practitioner working end-to-end across digital product development — from system requirements analysis and UI/UX design to writing production-ready code. For me, logical clarity, user ease, and clean code structure share equal priority.",
      ],
      [
        "My workflow is grounded in pragmatic solutions: deeply understanding business constraints first, building wireframes and interactive prototypes in Figma, and translating them into responsive, scalable web applications.",
      ],
      [
        "A background spanning system analysis and design bridges the gap between design and engineering. Miscommunications are minimized, architectural decisions happen faster, and the final build aligns precisely with original specifications.",
      ],
      [
        "When not designing systems or writing code, I enjoy exploring emerging tech stacks, refining modern web architecture, and documenting project progress on ",
        { text: "GitHub", href: "https://github.com/Tenku01" },
        ".",
      ],
    ],
    quickBitsLead: "Quick facts:",
    quickBits: [
      "System Analyst & UI/UX Designer",
      "Fullstack Web Developer",
      "Based in Temanggung, Central Java (UTC+7)",
      "Focus on efficient workflows & clean architecture",
      "Experienced from initial research to deployment",
      "Open to remote opportunities & collaborations",
    ],
    closing:
      "Interested in collaborating or have a project to bring to life? Let's connect.",
  },
} as const satisfies Record<"id" | "en", AboutContent>;

export const ABOUT = ABOUT_I18N.id;