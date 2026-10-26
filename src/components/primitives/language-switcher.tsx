"use client";

import { useLanguage } from "@/context/language-context";

export function LanguageSwitcher() {
  const { lang, toggleLang } = useLanguage();

  return (
    <button
      type="button"
      onClick={toggleLang}
      className="inline-flex h-9 cursor-pointer items-center gap-1.5 rounded-full border border-gray-200 bg-white px-3 text-xs font-semibold tracking-wider text-gray-700 transition-colors hover:bg-gray-50 hover:text-neutral-900"
      aria-label="Toggle language"
    >
      <span className={lang === "id" ? "rounded bg-neutral-900 px-1 py-0.5 text-white" : "text-gray-400"}>
        ID
      </span>
      <span className="text-gray-300">/</span>
      <span className={lang === "en" ? "rounded bg-neutral-900 px-1 py-0.5 text-white" : "text-gray-400"}>
        EN
      </span>
    </button>
  );
}