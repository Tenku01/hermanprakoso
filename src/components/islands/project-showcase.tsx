"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { ArrowUpRight, ExternalLink } from "lucide-react";

import { Badge } from "@/components/primitives/badge";
import { Button } from "@/components/primitives/button";
import { Icon } from "@/components/primitives/icon";
import { Link } from "@/components/primitives/link";
import { Text } from "@/components/primitives/text";
import type { Project } from "@/content/types";
import { cn } from "@/lib/cn";

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

export type ProjectShowcaseProps = {
  projects: readonly Project[];
};

export function ProjectShowcase({ projects }: ProjectShowcaseProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);

  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeCardHover, setActiveCardHover] = useState(false);
  const [cardTilt, setCardTilt] = useState({ rx: 0, ry: 0 });
  const [isDesktop, setIsDesktop] = useState(false);

  const mousePosRef = useRef({ x: 0, y: 0 });
  const mouseLerpRef = useRef({ x: 0, y: 0 });
  const scrollRef = useRef(0);
  const touchStartXRef = useRef<number | null>(null);

  const total = projects.length;

  const reducedMotion = useSyncExternalStore(
    subscribeMotionCapabilities,
    getMotionCapabilitiesSnapshot,
    getMotionCapabilitiesServerSnapshot,
  );

  // Track responsive viewport for layout shift
  useEffect(() => {
    function checkViewport() {
      setIsDesktop(window.innerWidth >= 1024);
    }
    checkViewport();
    window.addEventListener("resize", checkViewport, { passive: true });
    return () => window.removeEventListener("resize", checkViewport);
  }, []);

  // Jump to project on user request
  const scrollToProject = useCallback(
    (index: number) => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const currentScrollTop = window.scrollY || window.pageYOffset;
      const containerTop = rect.top + currentScrollTop;
      const totalScrollable = rect.height - window.innerHeight;
      const targetScroll = containerTop + (index / (total - 1)) * totalScrollable;

      window.scrollTo({
        top: targetScroll,
        behavior: "smooth",
      });
    },
    [total],
  );

  // Touch swipe support for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const diff = touchStartXRef.current - e.changedTouches[0].clientX;
    touchStartXRef.current = null;
    const continuous = scrollRef.current * (total - 1);
    const active = Math.min(Math.max(Math.round(continuous), 0), total - 1);
    if (Math.abs(diff) > 45) {
      if (diff > 0 && active < total - 1) {
        scrollToProject(active + 1);
      } else if (diff < 0 && active > 0) {
        scrollToProject(active - 1);
      }
    }
  };

  // Scroll listener tracking position through sticky track
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
        scrollRef.current = clamped;
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

  // Mouse move listener for 3D camera parallax & hover tilt
  useEffect(() => {
    function handlePointerMove(e: PointerEvent) {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      mousePosRef.current = { x: nx, y: ny };
    }

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, []);

  // 3D Perspective Tunnel Canvas Render Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let isVisible = true;

    function handleResize() {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
        canvas.width = w * dpr;
        canvas.height = h * dpr;
      }
    }

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(canvas);
    handleResize();

    const visibilityObserver = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    });
    visibilityObserver.observe(canvas);

    function lerp(a: number, b: number, t: number) {
      return a + (b - a) * t;
    }

    function render() {
      if (isVisible && canvas && ctx) {
        // Smoothly interpolate mouse parallax
        const lerpFactor = reducedMotion ? 0.01 : 0.06;
        mouseLerpRef.current.x = lerp(mouseLerpRef.current.x, mousePosRef.current.x, lerpFactor);
        mouseLerpRef.current.y = lerp(mouseLerpRef.current.y, mousePosRef.current.y, lerpFactor);

        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const w = canvas.width / dpr;
        const h = canvas.height / dpr;

        ctx.save();
        ctx.scale(dpr, dpr);
        ctx.clearRect(0, 0, w, h);

        // Dynamic vanishing point driven by mouse parallax
        const isPortrait = w < h;
        const baseVy = isPortrait ? 0.38 : 0.5;
        const mx = mouseLerpRef.current.x;
        const my = mouseLerpRef.current.y;
        const vx = w * (0.5 + mx * 0.08);
        const vy = h * (baseVy + my * 0.08);

        // 1. Perspective Guide Rays from Screen Edges into Vanishing Point
        ctx.lineWidth = 1;

        // Subtle orange horizon line (matching Yassin Farag screenshot)
        ctx.strokeStyle = "rgba(249, 115, 22, 0.4)";
        ctx.beginPath();
        ctx.moveTo(0, vy);
        ctx.lineTo(w, vy);
        ctx.stroke();

        // Subtle room rays (Floor, Ceiling, Walls)
        ctx.strokeStyle = "rgba(226, 232, 240, 0.85)"; // slate-200
        const rayStepsX = [0.08, 0.22, 0.36, 0.5, 0.64, 0.78, 0.92];
        const rayStepsY = [0.18, 0.38, 0.62, 0.82];

        // Floor longitudinal lines
        ctx.beginPath();
        for (const px of rayStepsX) {
          ctx.moveTo(w * px, h);
          ctx.lineTo(vx, vy);
        }
        // Ceiling longitudinal lines
        for (const px of rayStepsX) {
          ctx.moveTo(w * px, 0);
          ctx.lineTo(vx, vy);
        }
        // Wall longitudinal lines
        for (const py of rayStepsY) {
          ctx.moveTo(0, h * py);
          ctx.lineTo(vx, vy);
          ctx.moveTo(w, h * py);
          ctx.lineTo(vx, vy);
        }
        ctx.stroke();

        // Corner primary structural tunnel edges
        ctx.strokeStyle = "rgba(203, 213, 225, 0.9)"; // slate-300
        ctx.lineWidth = 1.25;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(vx, vy);
        ctx.moveTo(w, 0);
        ctx.lineTo(vx, vy);
        ctx.moveTo(0, h);
        ctx.lineTo(vx, vy);
        ctx.moveTo(w, h);
        ctx.lineTo(vx, vy);
        ctx.stroke();

        // 2. Concentric Tunnel Rings Moving Along Depth with Scroll
        const ringCount = 18;
        const scrollOffset = (scrollRef.current * 16) % 1;

        for (let i = 0; i < ringCount; i++) {
          const depthProgress = (i + scrollOffset) / ringCount;
          const t = Math.pow(depthProgress, 2.2);

          const rx1 = lerp(0, vx, t);
          const ry1 = lerp(0, vy, t);
          const rx2 = lerp(w, vx, t);
          const ry2 = lerp(h, vy, t);
          const rw = rx2 - rx1;
          const rh = ry2 - ry1;

          if (rw <= 0 || rh <= 0) continue;

          // Fade rings as they approach vanishing point
          const alpha = (1 - depthProgress) * 0.75;
          const isAccentRing = i % 4 === 0;

          ctx.beginPath();
          if (isAccentRing) {
            // Accent laser ring (orange / slate)
            ctx.strokeStyle = `rgba(249, 115, 22, ${alpha * 0.45})`;
            ctx.lineWidth = 1.5;
          } else {
            ctx.strokeStyle = `rgba(226, 232, 240, ${alpha})`;
            ctx.lineWidth = 1;
          }
          ctx.strokeRect(rx1, ry1, rw, rh);
        }

        // 3. Vanishing Point Tech Target Reticle
        ctx.strokeStyle = "rgba(249, 115, 22, 0.5)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(vx, vy, 12, 0, Math.PI * 2);
        ctx.moveTo(vx - 18, vy);
        ctx.lineTo(vx + 18, vy);
        ctx.moveTo(vx, vy - 18);
        ctx.lineTo(vx, vy + 18);
        ctx.stroke();

        ctx.restore();
      }

      animId = requestAnimationFrame(render);
    }

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
    };
  }, [reducedMotion]);

  // Compute active project index and continuous floating step
  const continuousStep = scrollProgress * (total - 1);
  const activeIndex = Math.min(Math.max(Math.round(continuousStep), 0), total - 1);
  const currentProject = projects[activeIndex] ?? projects[0];
  const isEven = activeIndex % 2 === 0;

  // Card Mouse Hover 3D Tilt Handler
  const handleCardMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (reducedMotion) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      setCardTilt({ rx: -y * 14, ry: x * 16 });
    },
    [reducedMotion],
  );

  const handleCardMouseLeave = useCallback(() => {
    setCardTilt({ rx: 0, ry: 0 });
    setActiveCardHover(false);
  }, []);

  return (
    <div
      ref={containerRef}
      style={{ height: `${total * 105}vh` }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="relative w-full"
    >
      {/* Sticky Full-Viewport 3D Stage */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-white">
        {/* Full-Screen 3D Perspective Tunnel Canvas */}
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          className="absolute inset-0 size-full block pointer-events-none"
        />

        {/* Top Radial Vignette Overlay for Depth Atmosphere */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-radial from-transparent via-transparent to-slate-100/40"
        />

        {/* Top HUD Header */}
        <div className="absolute inset-x-0 top-0 z-30 flex flex-col pointer-events-none">
          <div className="flex items-center justify-between px-5 py-4 sm:px-12 sm:py-6">
            <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-neutral-600">
              <span className="font-bold text-orange-500">{"//"}</span>
              <span className="font-semibold text-neutral-900">MISSION FILES</span>
              <span className="text-gray-400">/</span>
              <span>0{total} RECORDS</span>
            </div>

            <div className="hidden font-mono text-xs text-gray-500 sm:flex items-center gap-2">
              <span>SCROLL TO TRAVERSE 3D TUNNEL</span>
              <span className="inline-block size-1.5 rounded-full bg-orange-500 animate-ping" />
            </div>
          </div>
          <div className="h-px w-full bg-orange-500/25" />
        </div>

        {/* Right-Hand HUD Indicator (Matching Yassin Farag's side ticks) */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-3 sm:right-8 top-1/2 z-30 flex -translate-y-1/2 flex-col items-end gap-2.5"
        >
          {projects.map((p, idx) => {
            const isActive = idx === activeIndex;
            return (
              <span
                key={p.id}
                className={cn(
                  "block h-0.5 rounded-full transition-all duration-300",
                  isActive
                    ? "w-6 sm:w-8 bg-orange-500 scale-x-100"
                    : "w-3.5 sm:w-5 bg-neutral-300 scale-x-75 opacity-40",
                )}
                style={{ transformOrigin: "right" }}
              />
            );
          })}
        </div>

        {/* 3D Floating Project Images in the Tunnel Room */}
        <div
          className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none"
          style={{ perspective: 1200 }}
        >
          {projects.map((project, idx) => {
            const dist = idx - continuousStep;

            // Only render cards close to current view for optimal performance
            if (Math.abs(dist) > 2.2) return null;

            // Real 3D depth parameters
            let scale = 1;
            let translateZ = 0;
            let opacity = 1;
            let blurPx = 0;

            if (dist >= 0) {
              // Upcoming project deeper in tunnel
              scale = Math.max(0.3, 1 - dist * 0.45);
              translateZ = -dist * 340;
              opacity = Math.max(0, 1 - dist * 0.85);
              blurPx = Math.min(5, dist * 3.5);
            } else {
              // Past project zooming forward past the camera
              const absDist = Math.abs(dist);
              scale = 1 + absDist * 0.4;
              translateZ = absDist * 220;
              opacity = Math.max(0, 1 - absDist * 1.8);
              blurPx = Math.min(5, absDist * 2.5);
            }

            const isCurrent = idx === activeIndex;

            // Layout positioning: desktop alternates left/right; mobile centers in upper zone
            const planeX = isDesktop ? (idx % 2 === 0 ? 1 : -1) * 22 : 0;
            const currentTiltX = isCurrent && activeCardHover ? cardTilt.rx : 0;
            const currentTiltY = isCurrent && activeCardHover ? cardTilt.ry : 0;

            return (
              <div
                key={project.id}
                ref={isCurrent ? cardRef : undefined}
                onMouseEnter={() => isCurrent && setActiveCardHover(true)}
                onMouseMove={isCurrent ? handleCardMouseMove : undefined}
                onMouseLeave={handleCardMouseLeave}
                className={cn(
                  "absolute flex items-center justify-center transition-opacity duration-200",
                  isCurrent ? "pointer-events-auto z-20 cursor-pointer" : "pointer-events-none z-10",
                )}
                style={{
                  top: isDesktop ? "16%" : "13%",
                  bottom: isDesktop ? "32%" : "auto",
                  left: isDesktop ? "6%" : "5%",
                  right: isDesktop ? "6%" : "5%",
                  height: isDesktop ? "auto" : "32vh",
                  maxHeight: isDesktop ? "none" : "260px",
                  transform: `translate3d(${planeX}vw, 0px, ${translateZ}px) scale(${scale}) rotateX(${currentTiltX}deg) rotateY(${currentTiltY}deg)`,
                  transformStyle: "preserve-3d",
                  opacity,
                  filter: blurPx > 0.5 ? `blur(${blurPx}px)` : undefined,
                  willChange: "transform, opacity",
                }}
              >
                {/* 3D Floating Frame */}
                <div
                  className={cn(
                    "group relative aspect-16/10 w-full max-w-sm sm:max-w-md lg:max-w-xl overflow-hidden rounded-xl border bg-white shadow-xl transition-all duration-300",
                    isCurrent
                      ? "border-orange-500 shadow-2xl scale-100"
                      : "border-gray-200 shadow-md",
                  )}
                >
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block size-full"
                    aria-label={`Open ${project.name}`}
                  >
                    <Image
                      src={project.screenshot.src}
                      alt={project.screenshot.alt}
                      priority={idx === 0 || idx === 1}
                      sizes="(min-width: 1024px) 45vw, 92vw"
                      className="size-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    />

                    {/* Corner Reticle Brackets (Yassin Farag Signature Frame) */}
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute top-1.5 left-1.5 size-2 border-t-2 border-l-2 border-orange-500"
                    />
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute top-1.5 right-1.5 size-2 border-t-2 border-r-2 border-orange-500"
                    />
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute bottom-1.5 left-1.5 size-2 border-b-2 border-l-2 border-orange-500"
                    />
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute bottom-1.5 right-1.5 size-2 border-b-2 border-r-2 border-orange-500"
                    />

                    {/* Scanline Effect on Hover */}
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-repeating-linear from-transparent via-transparent to-black/5"
                      style={{ backgroundSize: "100% 4px" }}
                    />

                    {/* View Project Floating Badge */}
                    <div className="absolute bottom-2.5 right-2.5 flex items-center gap-1 rounded bg-neutral-900/85 px-2 py-1 text-xs font-mono text-white opacity-90 shadow backdrop-blur-xs transition-opacity duration-200 group-hover:opacity-100 sm:bottom-3 sm:right-3 sm:px-3 sm:py-1.5">
                      <span>OPEN</span>
                      <Icon icon={ArrowUpRight} size="sm" />
                    </div>
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Floating Typography & Project Information Block (Full Section) */}
        <div
          className={cn(
            "absolute z-20 flex flex-col gap-2 transition-all duration-500 pointer-events-auto",
            isDesktop
              ? isEven
                ? "left-6 sm:left-14 lg:left-20 bottom-10 sm:bottom-12 items-start text-left"
                : "left-6 sm:left-auto sm:right-14 lg:right-20 bottom-10 sm:bottom-12 items-start sm:items-end text-left sm:text-right"
              : "left-5 right-5 bottom-12 items-start text-left",
          )}
          style={{ maxWidth: isDesktop ? "min(88vw, 560px)" : "calc(100vw - 2.5rem)" }}
        >
          {/* Large Outlined Number (Yassin Farag Signature HUD Numeral) */}
          <div
            className="font-display font-black tracking-tighter text-transparent select-none"
            style={{
              fontSize: "clamp(42px, 8.5vw, 130px)",
              lineHeight: 0.8,
              WebkitTextStroke: "1.5px currentColor",
              color: "transparent",
            }}
          >
            <span className="text-orange-500">
              0{activeIndex + 1}
            </span>
          </div>

          {/* Giant Title */}
          <a
            href={currentProject.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group/title inline-block font-display font-extrabold uppercase tracking-tight text-neutral-900 transition-colors hover:text-orange-500"
            style={{
              fontSize: "clamp(22px, 5vw, 68px)",
              lineHeight: 0.95,
            }}
          >
            <span>{currentProject.name}</span>
          </a>

          {/* Metadata Row with Slashes */}
          <div className="flex flex-wrap items-center gap-2 font-mono text-xs uppercase tracking-wider text-neutral-600">
            <span className="font-semibold text-neutral-900">{currentProject.stack[0]}</span>
            <span className="text-orange-500 font-bold">/</span>
            <span>{currentProject.domain}</span>
            <span className="text-orange-500 font-bold">/</span>
            <span>2026</span>
          </div>

          {/* Description - clamped to 2 lines on mobile, full on desktop */}
          <Text
            variant="body-md"
            className="mt-0.5 text-pretty text-neutral-600 max-w-lg line-clamp-2 sm:line-clamp-none text-xs sm:text-base leading-relaxed"
          >
            {currentProject.description}
          </Text>

          {/* Stack Badges - displayed on tablet/desktop */}
          <ul role="list" className="hidden sm:flex flex-wrap gap-2 pt-0.5">
            {currentProject.stack.map((item) => (
              <li key={item}>
                <Badge>{item}</Badge>
              </li>
            ))}
          </ul>

          {/* Action Links */}
          <div className="mt-1 flex flex-wrap items-center gap-2.5">
            <Button
              variant="primary"
              asChild
              className="inline-flex items-center gap-1.5"
            >
              <Link
                href={currentProject.href}
                variant="unstyled"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium"
              >
                <span>{currentProject.linkLabel}</span>
                <Icon icon={ArrowUpRight} size="sm" />
              </Link>
            </Button>

            {currentProject.figmaHref && (
              <Button
                variant="secondary"
                asChild
                className="inline-flex items-center gap-1.5"
              >
                <Link
                  href={currentProject.figmaHref}
                  variant="unstyled"
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm"
                >
                  <span>{currentProject.figmaLabel ?? "Desain Figma"}</span>
                  <Icon icon={ExternalLink} size="sm" />
                </Link>
              </Button>
            )}
          </div>
        </div>

        {/* Bottom Horizontal Quick-Scrubber (Click to Jump Directly) */}
        <div className="absolute inset-x-4 sm:inset-x-8 bottom-2 z-30 flex items-center justify-between border-t border-gray-200/80 pt-1.5 font-mono text-xs text-neutral-500">
          <div className="flex items-center gap-1 sm:gap-2">
            {projects.map((p, idx) => {
              const isActive = idx === activeIndex;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => scrollToProject(idx)}
                  className={cn(
                    "cursor-pointer px-2 py-1 transition-colors min-h-8 min-w-8 flex items-center justify-center",
                    isActive
                      ? "font-bold text-orange-500"
                      : "text-neutral-400 hover:text-neutral-900",
                  )}
                  aria-label={`Jump to project 0${idx + 1}`}
                >
                  0{idx + 1}
                </button>
              );
            })}
          </div>

          <span className="hidden sm:inline text-neutral-400">
            {currentProject.role}
          </span>
        </div>
      </div>
    </div>
  );
}
