"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { useLanguage } from "@/context/language-context";

function subscribeMotionCapabilities(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  mediaQuery.addEventListener("change", callback);
  return () => mediaQuery.removeEventListener("change", callback);
}

function getMotionCapabilitiesSnapshot() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getMotionCapabilitiesServerSnapshot() {
  return false;
}

export type EnvelopeCoverProps = {
  children: React.ReactNode;
};

export function EnvelopeCover({ children }: EnvelopeCoverProps) {
  const { lang } = useLanguage();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const reducedMotion = useSyncExternalStore(
    subscribeMotionCapabilities,
    getMotionCapabilitiesSnapshot,
    getMotionCapabilitiesServerSnapshot,
  );

  const copy = {
    id: {
      eyebrow: "HERMAN PRAKOSO // DOSSIER FILE N° 01",
      title: "Design Portfolio",
      scrollHint: "👇 Scroll down to know me!",
      openBtn: "Open up",
    },
    en: {
      eyebrow: "HERMAN PRAKOSO // DOSSIER FILE N° 01",
      title: "Design Portfolio",
      scrollHint: "👇 Scroll down to know me!",
      openBtn: "Open up",
    },
  }[lang];

  useEffect(() => {
    let rafId: number | null = null;

    function handleScroll() {
      if (rafId !== null) return;
      rafId = window.requestAnimationFrame(() => {
        rafId = null;
        const container = containerRef.current;
        if (!container) return;

        const rect = container.getBoundingClientRect();
        const totalScrollable = rect.height - window.innerHeight;
        if (totalScrollable <= 0) return;

        const currentScrolled = -rect.top;
        const rawProgress = currentScrolled / totalScrollable;
        const clamped = Math.min(Math.max(rawProgress, 0), 1);
        setScrollProgress(clamped);
      });
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, []);

  const handleOpenClick = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const currentScrollTop = window.scrollY || window.pageYOffset;
    const containerTop = rect.top + currentScrollTop;
    const totalScrollable = rect.height - window.innerHeight;

    window.scrollTo({
      top: containerTop + totalScrollable,
      behavior: "smooth",
    });
  }, []);

  // Compute animations based on scrollProgress
  const effectiveProgress = reducedMotion ? (scrollProgress > 0.05 ? 1 : 0) : scrollProgress;

  // Flap slides up: translateY(-105%)
  const flapTranslateY = effectiveProgress * 105;

  // String unhooks and fades out rapidly after 12% progress
  const stringProgress = Math.min(effectiveProgress / 0.25, 1);
  const stringOpacity = Math.max(0, 1 - stringProgress * 1.5);
  const stringScaleY = 1 + stringProgress * 0.8;
  const stringRotate = stringProgress * 25;

  // Underneath Hero content slight elevation and fade-in
  const contentTranslateY = (1 - effectiveProgress) * 20;
  const contentOpacity = Math.min(1, 0.4 + effectiveProgress * 0.6);

  return (
    <div
      ref={containerRef}
      style={{ height: "175vh" }}
      className="relative w-full"
    >
      {/* Sticky Full-Viewport Stage */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-white">
        {/* Layer 1: The Revealed Hero Content Section (Underneath) */}
        <div
          className="relative size-full z-10 flex flex-col justify-center will-change-transform"
          style={{
            transform: `translate3d(0, ${contentTranslateY}px, 0)`,
            opacity: contentOpacity,
          }}
        >
          {children}

          {/* Bottom Fastener Grommet (Anchored on the underneath surface) */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 -translate-x-1/2 z-15 flex flex-col items-center"
            style={{
              top: "calc(50% + 140px)",
              opacity: effectiveProgress < 0.95 ? 1 : 0,
              transition: "opacity 300ms ease-out",
            }}
          >
            {/* Circular Fastener Disc (Bottom Button) */}
            <div className="relative size-14 rounded-full bg-lime-300 border-2 border-lime-400 shadow-md flex items-center justify-center">
              <span className="size-4 rounded-full bg-neutral-900 shadow-inner" />
            </div>
          </div>
        </div>

        {/* Layer 2: The Top Envelope Flap Cover Sheet */}
        <div
          className="absolute inset-x-0 top-0 z-30 flex flex-col items-center justify-center bg-white shadow-2xl transition-transform duration-75 will-change-transform"
          style={{
            height: "100vh",
            transform: `translate3d(0, -${flapTranslateY}%, 0)`,
            borderBottomLeftRadius: "clamp(48px, 8vw, 99px)",
            borderBottomRightRadius: "clamp(48px, 8vw, 99px)",
            backgroundImage:
              "radial-gradient(circle, rgba(203, 213, 225, 0.5) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
            boxShadow:
              "0 25px 50px -12px rgba(0, 0, 0, 0.15), 0 12px 24px -8px rgba(234, 179, 8, 0.2)",
          }}
        >
          {/* Main Content inside Envelope Cover */}
          <div className="flex flex-col items-center text-center px-6 max-w-2xl select-none">
            {/* Top Micro Eyebrow */}
            <p className="font-mono text-xs uppercase tracking-widest text-neutral-500 mb-4 sm:mb-6">
              {copy.eyebrow}
            </p>

            {/* Big Headline (Design Portfolio) */}
            <h1
              className="font-serif font-black tracking-tight text-neutral-900"
              style={{
                fontSize: "clamp(42px, 7.5vw, 96px)",
                lineHeight: 1.05,
              }}
            >
              {copy.title}
            </h1>

            {/* Tilted Interactive Stickers Area */}
            <div className="relative mt-8 sm:mt-10 flex flex-col items-center gap-3">
              {/* Sticker 1: Scroll Hint (Yellow/Lime Tag, -3deg tilt) */}
              <div
                className="inline-flex items-center gap-2 rounded px-4 py-2 font-sans font-bold text-neutral-950 shadow-md transition-transform hover:scale-105"
                style={{
                  backgroundColor: "rgb(225, 244, 90)",
                  transform: "rotate(-3deg)",
                }}
              >
                <span className="text-sm sm:text-base">{copy.scrollHint}</span>
              </div>

              {/* Sticker 2: Clickable Open Up Tag (Dark Tag, +3deg tilt) */}
              <button
                type="button"
                onClick={handleOpenClick}
                className="cursor-pointer inline-flex items-center justify-center rounded px-6 py-2.5 font-sans font-bold text-white shadow-xl transition-transform hover:scale-110 active:scale-95"
                style={{
                  backgroundColor: "rgb(38, 38, 38)",
                  transform: "rotate(3deg)",
                }}
                aria-label="Open portfolio dossier"
              >
                <span className="text-base sm:text-lg">{copy.openBtn}</span>
              </button>
            </div>
          </div>

          {/* Top Fastener Grommet & String Tie on Bottom Edge of Flap */}
          <div
            onClick={handleOpenClick}
            className="cursor-pointer absolute left-1/2 -translate-x-1/2 flex flex-col items-center"
            style={{
              bottom: "-28px",
            }}
          >
            {/* Top Circular Button Grommet */}
            <div className="relative size-14 rounded-full bg-lime-300 border-2 border-lime-400 shadow-lg flex items-center justify-center transition-transform hover:scale-110">
              <span className="size-4 rounded-full bg-neutral-900 shadow-inner" />
            </div>

            {/* Connecting Vertical String / Thread */}
            <div
              aria-hidden="true"
              className="pointer-events-none origin-top flex flex-col items-center"
              style={{
                opacity: stringOpacity,
                transform: `scaleY(${stringScaleY}) rotate(${stringRotate}deg)`,
                transition: "opacity 150ms ease-out",
              }}
            >
              {/* Two parallel vertical cords connecting top and bottom discs */}
              <div className="flex items-center gap-2 h-12 py-1">
                <span
                  className="w-1 h-full rounded-full"
                  style={{ backgroundColor: "rgb(208, 229, 56)" }}
                />
                <span
                  className="w-1 h-full rounded-full"
                  style={{ backgroundColor: "rgb(208, 229, 56)" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
