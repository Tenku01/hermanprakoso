"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
} from "react";

export type Language = "id" | "en";

interface LanguageContextType {
  lang: Language;
  toggleLang: () => void;
  setLang: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "id",
  toggleLang: () => {},
  setLang: () => {},
});

let memoryLang: Language = "id";
const listeners = new Set<() => void>();

function notify() {
  listeners.forEach((listener) => listener());
}

function subscribe(callback: () => void) {
  listeners.add(callback);
  const onStorage = (e: StorageEvent) => {
    if (e.key === "site-lang" && (e.newValue === "id" || e.newValue === "en")) {
      memoryLang = e.newValue;
      notify();
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(callback);
    window.removeEventListener("storage", onStorage);
  };
}

function getSnapshot(): Language {
  if (typeof window !== "undefined") {
    try {
      const saved = localStorage.getItem("site-lang");
      if (saved === "id" || saved === "en") {
        memoryLang = saved;
      }
    } catch {
      // Ignore if localStorage is restricted
    }
  }
  return memoryLang;
}

function getServerSnapshot(): Language {
  return "id";
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const lang = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const setLang = useCallback((nextLang: Language) => {
    memoryLang = nextLang;
    try {
      localStorage.setItem("site-lang", nextLang);
    } catch {}
    notify();
  }, []);

  const toggleLang = useCallback(() => {
    const next: Language = memoryLang === "id" ? "en" : "id";
    setLang(next);
  }, [setLang]);

  const value = useMemo(
    () => ({
      lang,
      toggleLang,
      setLang,
    }),
    [lang, toggleLang, setLang],
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}