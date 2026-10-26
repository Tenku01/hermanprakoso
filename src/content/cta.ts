import type { CtaContent } from "./types";

export const CTA_I18N = {
  id: {
    id: "contact",
    eyebrow: "Kontak & Diskusi",
    heading: "Tertarik berkolaborasi atau merekrut saya?",
    subhead:
      "Saya siap berkontribusi untuk posisi kerja penuh waktu (full-time) maupun freelance. Mari diskusikan bagaimana kemampuan analisis dan teknis saya dapat mendukung kebutuhan tim Anda.",
    primary: {
      label: "Hubungi via WhatsApp",
      href: "https://wa.me/6289673647187",
    },
    secondary: {
      label: "Unduh CV",
      href: "/files/cv-herman-prakoso.pdf",
    },
    contactsLead: "Anda juga dapat menghubungi saya melalui:",
    contacts: [
      {
        id: "email",
        label: "Email",
        value: "herman.prakoso33@gmail.com",
        href: "mailto:herman.prakoso33@gmail.com",
        copyLabel: "Salin alamat email",
        copiedLabel: "Tersalin!",
      },
      {
        id: "phone",
        label: "Telepon / WA",
        value: "+62 896-7364-7187",
        href: "https://wa.me/6289673647187",
        copyLabel: "Salin nomor telepon",
        copiedLabel: "Tersalin!",
      },
    ],
  },
  en: {
    id: "contact",
    eyebrow: "Get in Touch",
    heading: "Interested in collaborating or hiring me?",
    subhead:
      "Open to full-time engineering roles and contract opportunities. Let's discuss how my system analysis and technical skill set can support your team's goals.",
    primary: {
      label: "Reach via WhatsApp",
      href: "https://wa.me/6289673647187",
    },
    secondary: {
      label: "Download CV",
      href: "/files/cv-herman-prakoso.pdf",
    },
    contactsLead: "You can also reach me directly at:",
    contacts: [
      {
        id: "email",
        label: "Email",
        value: "herman.prakoso33@gmail.com",
        href: "mailto:herman.prakoso33@gmail.com",
        copyLabel: "Copy email address",
        copiedLabel: "Copied!",
      },
      {
        id: "phone",
        label: "Phone / WhatsApp",
        value: "+62 896-7364-7187",
        href: "https://wa.me/6289673647187",
        copyLabel: "Copy phone number",
        copiedLabel: "Copied!",
      },
    ],
  },
} as const satisfies Record<"id" | "en", CtaContent>;

export const CTA = CTA_I18N.id;