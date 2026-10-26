"use client";

import React, {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from "react";

function subscribeReducedMotion(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  mediaQuery.addEventListener("change", callback);
  return () => mediaQuery.removeEventListener("change", callback);
}

function getReducedMotionSnapshot() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getReducedMotionServerSnapshot() {
  return false;
}

export interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  as?: ElementType;
  delay?: number; // Delay in milliseconds (useful for staggered cards)
  duration?: number; // Duration in milliseconds (default: 600ms)
  distance?: number; // Translate distance in px (default: 20px)
  threshold?: number; // Intersection threshold (default: 0.1)
  once?: boolean; // Only animate once (default: true)
}

export function ScrollReveal({
  children,
  className,
  style,
  as: Component = "div",
  delay = 0,
  duration = 600,
  distance = 20,
  threshold = 0.1,
  once = true,
}: ScrollRevealProps) {
  const elementRef = useRef<HTMLDivElement | null>(null);
  const [isIntersected, setIsIntersected] = useState(false);
  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot,
  );

  useEffect(() => {
    if (reducedMotion) return;

    const currentEl = elementRef.current;
    if (!currentEl) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsIntersected(true);
            if (once) {
              observer.unobserve(entry.target);
            }
          } else if (!once) {
            setIsIntersected(false);
          }
        });
      },
      {
        threshold,
        rootMargin: "0px 0px -40px 0px",
      },
    );

    observer.observe(currentEl);

    return () => {
      observer.disconnect();
    };
  }, [reducedMotion, threshold, once]);

  const isVisible = reducedMotion || isIntersected;

  const animationStyle: CSSProperties = reducedMotion
    ? { ...style }
    : {
        ...style,
        opacity: isVisible ? 1 : 0,
        transform: isVisible
          ? "translate3d(0, 0, 0) scale3d(1, 1, 1)"
          : `translate3d(0, ${distance}px, 0) scale3d(0.985, 0.985, 1)`,
        transitionProperty: "opacity, transform",
        transitionDuration: `${duration}ms`,
        transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
        transitionDelay: `${delay}ms`,
        willChange: isVisible ? "auto" : "opacity, transform",
      };

  return (
    <Component ref={elementRef} className={className} style={animationStyle}>
      {children}
    </Component>
  );
}
