"use client";

import React, {
  useCallback,
  useRef,
  useState,
  useSyncExternalStore,
  type CSSProperties,
  type ElementType,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";

function subscribeMotionCapabilities(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  const coarseQuery = window.matchMedia("(pointer: coarse)");
  mediaQuery.addEventListener("change", callback);
  coarseQuery.addEventListener("change", callback);
  return () => {
    mediaQuery.removeEventListener("change", callback);
    coarseQuery.removeEventListener("change", callback);
  };
}

function getMotionCapabilitiesSnapshot() {
  if (typeof window === "undefined") return false;
  return (
    window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
    window.matchMedia("(pointer: coarse)").matches
  );
}

function getMotionCapabilitiesServerSnapshot() {
  return false;
}

export interface Card3DTiltProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  as?: ElementType;
  maxTilt?: number; // Maximum tilt angle in degrees (default: 6)
  perspective?: number; // Perspective distance in px (default: 1000)
  scale?: number; // Scale factor on hover (default: 1.015)
  glare?: boolean; // Enable dynamic cursor-following spotlight glare (default: true)
  glareOpacity?: number; // Maximum glare opacity (default: 0.12)
  disabled?: boolean;
}

export function Card3DTilt({
  children,
  className,
  style,
  as: Component = "div",
  maxTilt = 6,
  perspective = 1000,
  scale = 1.015,
  glare = true,
  glareOpacity = 0.12,
  disabled = false,
}: Card3DTiltProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const reducedMotion = useSyncExternalStore(
    subscribeMotionCapabilities,
    getMotionCapabilitiesSnapshot,
    getMotionCapabilitiesServerSnapshot,
  );

  // Transform states
  const [transform, setTransform] = useState({
    rotateX: 0,
    rotateY: 0,
    scale: 1,
  });

  // Spotlight glare coordinates (percentages 0-100)
  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50 });
  const rafId = useRef<number | null>(null);

  const handlePointerMove = useCallback(
    (e: ReactPointerEvent<HTMLDivElement>) => {
      if (disabled || reducedMotion) return;

      const element = containerRef.current;
      if (!element) return;

      const rect = element.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      if (width === 0 || height === 0) return;

      const clientX = e.clientX;
      const clientY = e.clientY;

      const x = Math.min(Math.max((clientX - rect.left) / width, 0), 1);
      const y = Math.min(Math.max((clientY - rect.top) / height, 0), 1);

      // Calculate tilt angles:
      // When cursor is at top (y = 0), tilt forward (rotateX > 0)
      // When cursor is at right (x = 1), tilt rightward (rotateY > 0)
      const targetRotateX = (0.5 - y) * (maxTilt * 2);
      const targetRotateY = (x - 0.5) * (maxTilt * 2);

      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }

      rafId.current = requestAnimationFrame(() => {
        setTransform({
          rotateX: parseFloat(targetRotateX.toFixed(2)),
          rotateY: parseFloat(targetRotateY.toFixed(2)),
          scale,
        });
        setGlarePosition({
          x: Math.round(x * 100),
          y: Math.round(y * 100),
        });
      });
    },
    [disabled, reducedMotion, maxTilt, scale],
  );

  const handlePointerEnter = useCallback(() => {
    if (disabled || reducedMotion) return;
    setIsHovered(true);
  }, [disabled, reducedMotion]);

  const handlePointerLeave = useCallback(() => {
    if (disabled || reducedMotion) return;
    if (rafId.current) {
      cancelAnimationFrame(rafId.current);
    }
    setIsHovered(false);
    setTransform({
      rotateX: 0,
      rotateY: 0,
      scale: 1,
    });
  }, [disabled, reducedMotion]);

  const isActive = isHovered && !reducedMotion && !disabled;

  const containerStyle: CSSProperties = {
    perspective: `${perspective}px`,
    transformStyle: "preserve-3d",
    ...style,
  };

  const transformStyle: CSSProperties = reducedMotion
    ? {}
    : {
        transform: isActive
          ? `perspective(${perspective}px) rotateX(${transform.rotateX}deg) rotateY(${transform.rotateY}deg) scale3d(${transform.scale}, ${transform.scale}, 1)`
          : `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`,
        transition: isActive
          ? "transform 150ms cubic-bezier(0.16, 1, 0.3, 1)"
          : "transform 500ms cubic-bezier(0.16, 1, 0.3, 1)",
        transformStyle: "preserve-3d",
      };

  const glareStyle: CSSProperties = {
    position: "absolute",
    inset: 0,
    pointerEvents: "none",
    borderRadius: "inherit",
    zIndex: 20,
    opacity: isActive ? 1 : 0,
    transition: "opacity 300ms ease",
    background: `radial-gradient(circle 380px at ${glarePosition.x}% ${glarePosition.y}%, rgba(255, 255, 255, ${glareOpacity}), rgba(255, 255, 255, 0) 70%)`,
    mixBlendMode: "overlay",
  };

  return (
    <Component
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      className={className}
      style={containerStyle}
    >
      <div style={transformStyle} className="relative h-full w-full">
        {children}
        {glare && !reducedMotion && <div style={glareStyle} aria-hidden="true" />}
      </div>
    </Component>
  );
}
