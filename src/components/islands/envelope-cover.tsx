"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { SITE } from "@/content/site";
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
      quote:
        "Saya saat ini terbuka untuk proyek baru. Hubungi saya jika Anda membutuhkan builder & desainer end-to-end!",
    },
    en: {
      eyebrow: "HERMAN PRAKOSO // DOSSIER FILE N° 01",
      title: "Design Portfolio",
      scrollHint: "👇 Scroll down to know me!",
      openBtn: "Open up",
      quote:
        "I'm currently available for new work, let me know if you need a builder. I'd love to talk about the next big thing!",
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
  const progress = scrollProgress;

  // Flap slides UP continuously: 0 -> -115%
  const flapTranslateY = progress * 115;

  // Footer slides DOWN continuously: 0 -> +115%
  const footerTranslateY = progress * 115;

  // String unhooks, stretches, and fades out within the first 25% of travel
  const stringProgress = Math.min(progress / 0.25, 1);
  const stringOpacity = Math.max(0, 1 - stringProgress * 1.6);
  const stringScaleY = reducedMotion ? 1 : 1 + stringProgress * 2.5;
  const stringRotate = reducedMotion ? 0 : stringProgress * 28;

  // Underneath Hero content reveals smoothly as cover parts open
  const contentTranslateY = (1 - progress) * 20;
  const contentScale = reducedMotion ? 1 : 0.96 + progress * 0.04;
  const contentOpacity = Math.min(1, Math.max(0, (progress - 0.02) * 1.5));

  const isFullyOpen = progress >= 0.99;
  const isPartiallyOpen = progress >= 0.85;

  return (
    <div
      ref={containerRef}
      style={{ height: "200vh" }}
      className="relative w-full"
    >
      {/* Sticky Full-Viewport Stage */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-white">
        {/* Layer 1: The Revealed Hero Content Section (Underneath) */}
        <div
          className="relative size-full z-10 flex flex-col justify-center will-change-transform pt-16"
          style={{
            transform: `translate3d(0, ${contentTranslateY}px, 0) scale(${contentScale})`,
            opacity: contentOpacity,
            pointerEvents: isFullyOpen ? "auto" : "none",
            visibility: progress <= 0.01 ? "hidden" : "visible",
          }}
        >
          {children}
        </div>

        {/* Layer 2: The Top Envelope Flap Cover Sheet */}
        <div
          aria-hidden={isFullyOpen}
          className="absolute inset-x-0 top-0 flex flex-col items-center justify-center will-change-transform"
          style={{
            height: "60vh",
            zIndex: isPartiallyOpen ? 25 : 50,
            transform: `translate3d(0, -${flapTranslateY}%, 0)`,
            borderBottomLeftRadius: "clamp(48px, 8vw, 99px)",
            borderBottomRightRadius: "clamp(48px, 8vw, 99px)",
            backgroundColor: "rgb(255, 255, 255)",
            backgroundImage:
              "radial-gradient(circle, rgba(203, 213, 225, 0.45) 1px, transparent 1px), linear-gradient(180deg, rgb(255, 255, 255) 65%, rgb(246, 246, 246) 100%)",
            backgroundSize: "24px 24px, 100% 100%",
            boxShadow:
              "0px 20px 80px 0px rgba(227, 245, 91, 0.42), 0 10px 30px rgba(0, 0, 0, 0.12)",
            visibility: isFullyOpen ? "hidden" : "visible",
            pointerEvents: isFullyOpen ? "none" : "auto",
          }}
        >
          {/* Main Content inside Envelope Cover */}
          <div className="flex flex-col items-center text-center px-4 sm:px-6 max-w-2xl select-none">
            {/* Top Micro Eyebrow */}
            <p className="font-mono text-xs uppercase tracking-widest text-neutral-400 mb-2 sm:mb-3">
              {copy.eyebrow}
            </p>

            {/* Big Headline (Design Portfolio) */}
            <h1
              className="font-serif font-black tracking-tight text-neutral-900"
              style={{
                fontSize: "clamp(34px, 7vw, 88px)",
                lineHeight: 1.05,
              }}
            >
              {copy.title}
            </h1>

            {/* Tilted Interactive Stickers Area */}
            <div className="relative mt-3 sm:mt-5 flex flex-col items-center gap-2">
              {/* Sticker 1: Scroll Hint (Yellow/Lime Tag, -3deg tilt) */}
              <div
                className="inline-flex items-center gap-2 rounded px-3.5 py-1.5 sm:px-4 sm:py-2 font-sans font-bold text-neutral-950 shadow-md select-none"
                style={{
                  backgroundColor: "rgb(225, 244, 90)",
                  transform: "rotate(-3deg)",
                }}
              >
                <span className="text-xs sm:text-base">{copy.scrollHint}</span>
              </div>

              {/* Sticker 2: Clickable Open Up Tag (Dark Tag, +3deg tilt) */}
              <button
                type="button"
                onClick={handleOpenClick}
                className="cursor-pointer inline-flex items-center justify-center rounded px-5 py-1.5 sm:px-6 sm:py-2 font-sans font-bold text-white shadow-xl hover:scale-105 active:scale-95 transition-transform select-none"
                style={{
                  backgroundColor: "rgb(38, 38, 38)",
                  transform: "rotate(3deg)",
                }}
                aria-label="Open portfolio dossier"
              >
                <span className="text-sm sm:text-lg">{copy.openBtn}</span>
              </button>
            </div>
          </div>

          {/* Top Fastener Grommet & String Tie on Bottom Edge of Flap */}
          <div
            onClick={handleOpenClick}
            className="cursor-pointer absolute left-1/2 -translate-x-1/2 flex flex-col items-center z-40 transition-transform hover:scale-110 active:scale-95"
            style={{
              bottom: "16px",
            }}
            title="Click to open"
          >
            {/* Top Circular Button Grommet */}
            <div
              className="relative size-12 sm:size-14 rounded-full border-2 shadow-lg flex items-center justify-center"
              style={{
                backgroundColor: "rgb(208, 229, 56)",
                borderColor: "rgb(180, 205, 40)",
              }}
            >
              <span
                className="size-3.5 sm:size-4 rounded-full shadow-inner"
                style={{ backgroundColor: "rgb(23, 23, 23)" }}
              />
            </div>

            {/* Connecting Vertical String / Thread (originates from top button) */}
            <div
              aria-hidden="true"
              className="pointer-events-none origin-top flex flex-col items-center will-change-transform"
              style={{
                opacity: stringOpacity,
                transform: `scaleY(${stringScaleY}) rotate(${stringRotate}deg)`,
                height: "56px",
              }}
            >
              <div className="flex items-center gap-1.5 h-full py-0.5">
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

        {/* Layer 3: The Bottom Dark Footer Surface */}
        <div
          aria-hidden={isFullyOpen}
          className="absolute inset-x-0 bottom-0 flex flex-col justify-between px-6 sm:px-12 py-8 will-change-transform text-white select-none"
          style={{
            height: "40vh",
            zIndex: isPartiallyOpen ? 20 : 50,
            transform: `translate3d(0, ${footerTranslateY}%, 0)`,
            backgroundColor: "rgb(10, 10, 10)",
            visibility: isFullyOpen ? "hidden" : "visible",
            pointerEvents: isFullyOpen ? "none" : "auto",
          }}
        >
          {/* Bottom Fastener Grommet (Anchored on top of footer surface) */}
          <div
            className="pointer-events-none absolute left-1/2 -translate-x-1/2 flex flex-col items-center z-30"
            style={{
              top: "24px",
            }}
          >
            <div
              className="relative size-12 sm:size-14 rounded-full border-2 shadow-lg flex items-center justify-center"
              style={{
                backgroundColor: "rgb(208, 229, 56)",
                borderColor: "rgb(180, 205, 40)",
              }}
            >
              <span
                className="size-3.5 sm:size-4 rounded-full shadow-inner"
                style={{ backgroundColor: "rgb(23, 23, 23)" }}
              />
            </div>
          </div>

          {/* Spacer to push content below the grommet */}
          <div className="h-10 sm:h-12" />

          {/* Footer Information Grid (matches reference) */}
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 max-w-6xl mx-auto w-full">
            {/* Left Column: Social & Contact Links */}
            <div className="flex flex-col gap-1.5 font-sans text-sm sm:text-base">
              <a
                href={SITE.social.find((s) => s.icon === "github")?.href || "https://github.com/Tenku01"}
                target="_blank"
                rel="noreferrer noopener"
                className="text-neutral-300 hover:text-white transition-colors cursor-pointer"
              >
                GitHub
              </a>
              <a
                href="https://linkedin.com/in/herman-prakoso"
                target="_blank"
                rel="noreferrer noopener"
                className="text-neutral-300 hover:text-white transition-colors cursor-pointer"
              >
                LinkedIn
              </a>
              <a
                href={SITE.emailHref}
                className="text-neutral-300 hover:text-white transition-colors cursor-pointer"
              >
                Email
              </a>
              <a
                href={SITE.phoneHref}
                className="text-neutral-400 hover:text-white transition-colors cursor-pointer font-mono text-xs sm:text-sm pt-1"
              >
                {SITE.phoneLabel}
              </a>
            </div>

            {/* Right Column: Availability Quote */}
            <div className="flex flex-col justify-end max-w-md sm:text-right">
              <p className="font-sans text-sm sm:text-base text-neutral-300 leading-relaxed">
                {copy.quote}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
