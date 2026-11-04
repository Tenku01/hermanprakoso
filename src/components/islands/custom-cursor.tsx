"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

function subscribeReducedMotion(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

function getReducedMotionSnapshot() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getReducedMotionServerSnapshot() {
  return false;
}

function subscribeFinePointer(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  const mq = window.matchMedia("(pointer: fine) and (hover: hover)");
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

function getFinePointerSnapshot() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(pointer: fine) and (hover: hover)").matches;
}

function getFinePointerServerSnapshot() {
  return false;
}

export function CustomCursor() {
  const [visible, setVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot,
  );

  const isFinePointer = useSyncExternalStore(
    subscribeFinePointer,
    getFinePointerSnapshot,
    getFinePointerServerSnapshot,
  );

  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);

  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    if (!isFinePointer || reducedMotion) return;

    document.documentElement.classList.add("has-custom-cursor");

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;

      if (!visible) setVisible(true);

      // Check if target or parent is clickable
      const target = e.target as HTMLElement | null;
      if (target) {
        const interactive = target.closest(
          'a, button, [role="button"], input, textarea, select, label, summary, .cursor-pointer, [data-cursor-interactive]',
        );
        setIsHovered(Boolean(interactive));
      }
    };

    const onMouseDown = () => setIsPressed(true);
    const onMouseUp = () => setIsPressed(false);
    const onMouseLeave = () => setVisible(false);
    const onMouseEnter = () => setVisible(true);

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mousedown", onMouseDown, { passive: true });
    window.addEventListener("mouseup", onMouseUp, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave, { passive: true });
    document.addEventListener("mouseenter", onMouseEnter, { passive: true });

    // Smooth animation loop for ring interpolation
    const updateCursor = () => {
      // Lerp outer ring towards mouse position (0.22 for snappy responsive spring feel)
      const ease = 0.22;
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * ease;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * ease;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0)`;
      }

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`;
      }

      rafId.current = window.requestAnimationFrame(updateCursor);
    };

    rafId.current = window.requestAnimationFrame(updateCursor);

    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      if (rafId.current !== null) {
        window.cancelAnimationFrame(rafId.current);
      }
    };
  }, [isFinePointer, reducedMotion, visible]);

  if (!isFinePointer || reducedMotion) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-50 overflow-hidden select-none transition-opacity duration-300"
      style={{
        opacity: visible ? 1 : 0,
      }}
    >
      {/* Precision Inner Dot (Instant 1:1 response) */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 -ml-1 -mt-1 will-change-transform pointer-events-none"
      >
        <div
          className="size-2 rounded-full transition-transform duration-150"
          style={{
            backgroundColor: isHovered ? "rgb(208, 229, 56)" : "rgb(23, 23, 23)",
            boxShadow: isHovered
              ? "0 0 8px rgba(208, 229, 56, 0.9)"
              : "0 0 4px rgba(0, 0, 0, 0.3)",
            transform: `scale(${isHovered ? 0.6 : 1.0})`,
          }}
        />
      </div>

      {/* Playful Spring Outer Ring (Fluid spring trailing with morph on hover/click) */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 -ml-4 -mt-4 will-change-transform pointer-events-none"
      >
        <div
          className="size-8 rounded-full border flex items-center justify-center transition-all duration-200"
          style={{
            borderColor: isHovered ? "rgb(208, 229, 56)" : "rgba(38, 38, 38, 0.35)",
            backgroundColor: isHovered
              ? "rgba(208, 229, 56, 0.15)"
              : "rgba(38, 38, 38, 0.03)",
            backdropFilter: isHovered ? "blur(1px)" : "none",
            transform: `scale(${isPressed ? 0.75 : isHovered ? 1.55 : 1.0})`,
          }}
        />
      </div>
    </div>
  );
}
