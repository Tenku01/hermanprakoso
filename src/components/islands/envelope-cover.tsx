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
      eyebrow: "HERMAN PRAKOSO // FLEX FILE N° 01",
      title: "My Portfolio",
      scrollHint: "👇 Scroll down to know me!",
      openBtn: "Open up",
      quote:
        "Terbuka untuk pekerjaan kontrak, freelance, atau full-time remote. Hubungi saya lewat email atau WhatsApp untuk diskusi proyek.",
    },
    en: {
      eyebrow: "HERMAN PRAKOSO // FLEX FILE N° 01",
      title: "My Portfolio",
      scrollHint: "👇 Scroll down to know me!",
      openBtn: "Open up",
      quote:
        "Available for contract, freelance, or remote full-time roles. Reach out via email or WhatsApp to discuss your project.",
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

  // String unhooking physics:
  // Phase 1 (0 -> 0.06): Taut stretch between buttons
  // Phase 2 (0.06 -> 0.20): Loop unhooks from bottom button, flicks loose and swings
  // Phase 3 (0.20 -> 0.30): Loose dangling tail dissolves as flap ascends
  const isUnhooking = progress >= 0.06;
  const unhookPhase = Math.min(Math.max((progress - 0.06) / 0.14, 0), 1);

  const stringScaleY = reducedMotion
    ? 1
    : isUnhooking
      ? 1.25 - unhookPhase * 0.2
      : 1 + (progress / 0.06) * 0.25;

  const stringRotate = reducedMotion ? 0 : isUnhooking ? unhookPhase * 42 : 0;
  const stringTranslateX = reducedMotion ? 0 : isUnhooking ? unhookPhase * 20 : 0;
  const stringOpacity = Math.max(0, 1 - Math.max(0, progress - 0.16) * 7.5);

  // Underneath Hero content reveals smoothly as cover parts open
  const contentTranslateY = (1 - progress) * 20;
  const contentScale = reducedMotion ? 1 : 0.96 + progress * 0.04;
  const contentOpacity = Math.min(1, Math.max(0, (progress - 0.02) * 1.5));

  const isFullyOpen = progress >= 0.99;

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

        {/* Layer 2: The Top Envelope Flap Cover Sheet (z-30 so it sits above footer z-20) */}
        <div
          aria-hidden={isFullyOpen}
          className="absolute inset-x-0 top-0 flex flex-col items-center justify-start will-change-transform pt-8 sm:pt-12 z-30"
          style={{
            height: "60vh",
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

            {/* Big Headline (My Portfolio) */}
            <h1
              className="font-serif font-black tracking-tight text-neutral-900"
              style={{
                fontSize: "clamp(38px, 6.5vw, 84px)",
                lineHeight: 1.1,
              }}
            >
              {copy.title}
            </h1>

            {/* Tilted Interactive Stickers Area (Comfortably above the pin) */}
            <div className="relative mt-3 sm:mt-4 flex flex-col items-center gap-2">
              {/* Sticker 1: Scroll Hint (Yellow/Lime Tag, -3deg tilt) */}
              <div
                className="inline-flex items-center gap-2 rounded px-3.5 py-1.5 sm:px-4 sm:py-2 font-sans font-bold text-neutral-950 shadow-md select-none"
                style={{
                  backgroundColor: "rgb(225, 244, 90)",
                  transform: "rotate(-3deg)",
                }}
              >
                <span className="text-xs sm:text-sm">{copy.scrollHint}</span>
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
                <span className="text-sm sm:text-base">{copy.openBtn}</span>
              </button>
            </div>
          </div>

          {/* Top Fastener Grommet & String Tie (Anchored at the bottom edge of flap) */}
          <div
            onClick={handleOpenClick}
            className="cursor-pointer absolute left-1/2 -translate-x-1/2 flex flex-col items-center z-40 transition-transform hover:scale-105 active:scale-95"
            style={{
              bottom: "-26px",
            }}
            title="Click to open"
          >
            {/* Top Circular Button Grommet */}
            <div
              className="relative size-13 sm:size-14 rounded-full border-2 shadow-lg flex items-center justify-center"
              style={{
                backgroundColor: "rgb(208, 229, 56)",
                borderColor: "rgb(180, 205, 40)",
              }}
            >
              <span
                className="size-3.5 sm:size-4 rounded-full shadow-inner z-10"
                style={{ backgroundColor: "rgb(23, 23, 23)" }}
              />
            </div>

            {/* Connecting Vertical String Tie (Originates from center of top grommet) */}
            <div
              aria-hidden="true"
              className="pointer-events-none origin-top flex flex-col items-center will-change-transform absolute left-1/2 -translate-x-1/2"
              style={{
                top: "26px", // Aligned with the center of the 52px top grommet
                opacity: stringOpacity,
                transform: `scaleY(${stringScaleY}) rotate(${stringRotate}deg) translateX(${stringTranslateX}px)`,
              }}
            >
              <svg
                width="36"
                height="80"
                viewBox="0 0 36 80"
                fill="none"
                className="overflow-visible"
              >
                {/* Two parallel cords running on either side of the center hole down to bottom button */}
                <line
                  x1="10"
                  y1="0"
                  x2="10"
                  y2="64"
                  stroke="rgb(208, 229, 56)"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
                <line
                  x1="26"
                  y1="0"
                  x2="26"
                  y2="64"
                  stroke="rgb(208, 229, 56)"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
                {/* Bottom loop wrapped under bottom button - uncurls and snaps free during scroll */}
                <path
                  d={
                    isUnhooking
                      ? "M 10 56 C 12 70, 28 66, 38 48"
                      : "M 10 64 C 10 76, 26 76, 26 64"
                  }
                  stroke="rgb(208, 229, 56)"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Layer 3: The Bottom Dark Footer Surface (z-20) */}
        <div
          aria-hidden={isFullyOpen}
          className="absolute inset-x-0 bottom-0 flex flex-col justify-between px-6 sm:px-12 py-8 will-change-transform text-white select-none z-20"
          style={{
            height: "40vh",
            transform: `translate3d(0, ${footerTranslateY}%, 0)`,
            backgroundColor: "rgb(10, 10, 10)",
            visibility: isFullyOpen ? "hidden" : "visible",
            pointerEvents: isFullyOpen ? "none" : "auto",
          }}
        >
          {/* Bottom Fastener Grommet (Anchored on top of footer surface) */}
          <div
            className="pointer-events-none absolute left-1/2 -translate-x-1/2 flex flex-col items-center z-25"
            style={{
              top: "38px",
            }}
          >
            <div
              className="relative size-13 sm:size-14 rounded-full border-2 shadow-lg flex items-center justify-center"
              style={{
                backgroundColor: "rgb(208, 229, 56)",
                borderColor: "rgb(180, 205, 40)",
              }}
            >
              <span
                className="size-3.5 sm:size-4 rounded-full shadow-inner z-10"
                style={{ backgroundColor: "rgb(23, 23, 23)" }}
              />
            </div>
          </div>

          {/* Spacer to push content below the grommet */}
          <div className="h-12 sm:h-16" />

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

            {/* Right Column: Availability Quote (Clean, Grounded, Human) */}
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
