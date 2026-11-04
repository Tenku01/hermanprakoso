"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Code2, Cpu, Layout, Sparkles, Terminal, Zap } from "lucide-react";

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

type PendulumConfig = {
  id: string;
  label: string;
  Icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  bgStyle: string;
  textColor: string;
  shadowColor: string;
  anchorPercentX: number;
  length: number;
  mobileVisible: boolean;
};

const PENDULUMS: PendulumConfig[] = [
  {
    id: "design",
    label: "UI/UX & Systems",
    Icon: Layout,
    bgStyle: "linear-gradient(135deg, rgb(168, 85, 247), rgb(126, 34, 206))",
    textColor: "rgb(255, 255, 255)",
    shadowColor: "rgba(147, 51, 234, 0.4)",
    anchorPercentX: 0.07,
    length: 155,
    mobileVisible: true,
  },
  {
    id: "frontend",
    label: "React & Next.js",
    Icon: Code2,
    bgStyle: "linear-gradient(135deg, rgb(34, 197, 94), rgb(13, 148, 136))",
    textColor: "rgb(255, 255, 255)",
    shadowColor: "rgba(16, 185, 129, 0.4)",
    anchorPercentX: 0.23,
    length: 240,
    mobileVisible: false,
  },
  {
    id: "systems",
    label: "System Analysis",
    Icon: Cpu,
    bgStyle: "linear-gradient(135deg, rgb(59, 130, 246), rgb(29, 78, 216))",
    textColor: "rgb(255, 255, 255)",
    shadowColor: "rgba(37, 99, 235, 0.4)",
    anchorPercentX: 0.48,
    length: 115,
    mobileVisible: true,
  },
  {
    id: "performance",
    label: "Clean & High Speed",
    Icon: Zap,
    bgStyle: "linear-gradient(135deg, rgb(251, 146, 60), rgb(234, 88, 12))",
    textColor: "rgb(255, 255, 255)",
    shadowColor: "rgba(245, 158, 11, 0.4)",
    anchorPercentX: 0.70,
    length: 190,
    mobileVisible: false,
  },
  {
    id: "terminal",
    label: "APIs & Databases",
    Icon: Terminal,
    bgStyle: "linear-gradient(135deg, rgb(38, 38, 38), rgb(15, 15, 15))",
    textColor: "rgb(255, 255, 255)",
    shadowColor: "rgba(0, 0, 0, 0.5)",
    anchorPercentX: 0.85,
    length: 270,
    mobileVisible: false,
  },
  {
    id: "creative",
    label: "Creative Craft",
    Icon: Sparkles,
    bgStyle: "linear-gradient(135deg, rgb(225, 244, 90), rgb(208, 229, 56))",
    textColor: "rgb(23, 23, 23)",
    shadowColor: "rgba(208, 229, 56, 0.45)",
    anchorPercentX: 0.94,
    length: 145,
    mobileVisible: true,
  },
];

type PendulumState = {
  theta: number; // Angle in radians
  omega: number; // Angular velocity in rad/s
  isDragging: boolean;
  prevTheta: number;
  wasInside: boolean;
  wasCuttingString: boolean;
};

export function HangingPendulums() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [containerWidth, setContainerWidth] = useState(1200);

  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot,
  );

  // Store physics state for each pendulum
  const statesRef = useRef<Record<string, PendulumState>>(
    Object.fromEntries(
      PENDULUMS.map((item, i) => [
        item.id,
        {
          theta: Math.sin(i * 1.5) * 0.08, // Initial organic resting angle
          omega: 0,
          isDragging: false,
          prevTheta: 0,
          wasInside: false,
          wasCuttingString: false,
        },
      ]),
    ),
  );

  // Mouse tracking
  const mouseRef = useRef({
    x: -1000,
    y: -1000,
    prevX: -1000,
    prevY: -1000,
    vx: 0,
    vy: 0,
    lastTime: 0,
  });

  const draggingIdRef = useRef<string | null>(null);

  // Elements refs for zero-react-render 60fps DOM updates
  const svgLinesRef = useRef<Record<string, SVGLineElement | null>>({});
  const svgBadgeRingsRef = useRef<Record<string, SVGCircleElement | null>>({});
  const badgeNodesRef = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ro = new ResizeObserver(([entry]) => {
      if (entry?.contentRect) {
        setContainerWidth(entry.contentRect.width);
      }
    });
    ro.observe(container);

    const onPointerMove = (e: MouseEvent | TouchEvent) => {
      const clientX = "touches" in e ? e.touches[0]?.clientX ?? 0 : e.clientX;
      const clientY = "touches" in e ? e.touches[0]?.clientY ?? 0 : e.clientY;

      const rect = container.getBoundingClientRect();
      const currentX = clientX - rect.left;
      const currentY = clientY - rect.top;
      const now = performance.now();
      const dt = Math.max(now - mouseRef.current.lastTime, 1) / 1000;

      const vx = (currentX - mouseRef.current.prevX) / dt;
      const vy = (currentY - mouseRef.current.prevY) / dt;

      mouseRef.current = {
        x: currentX,
        y: currentY,
        prevX: currentX,
        prevY: currentY,
        vx,
        vy,
        lastTime: now,
      };

      // Check if user is actively dragging one pendulum
      const draggingId = draggingIdRef.current;
      if (draggingId !== null) {
        const item = PENDULUMS.find((p) => p.id === draggingId);
        const state = statesRef.current[draggingId];
        if (item && state) {
          const ax = rect.width * item.anchorPercentX;
          const ay = 0;
          const targetAngle = Math.atan2(currentX - ax, Math.max(10, currentY - ay));
          const clamped = Math.min(Math.max(targetAngle, -1.15), 1.15); // ~65 deg max
          state.theta = clamped;
          state.omega = (clamped - state.prevTheta) / dt;
          state.prevTheta = clamped;
        }
        return;
      }

      // Nudge / Brush trigger: When mouse brushes against badge or cuts string
      PENDULUMS.forEach((item) => {
        const state = statesRef.current[item.id];
        if (!state || state.isDragging) return;

        const ax = rect.width * item.anchorPercentX;
        const L = item.length;
        const bx = ax + L * Math.sin(state.theta);
        const by = L * Math.cos(state.theta);

        // 1. Badge Collision Check (radius ~40px)
        const dist = Math.hypot(currentX - bx, currentY - by);
        const isInside = dist < 42;

        if (isInside && !state.wasInside) {
          // Tangent impulse on entering badge area
          const speed = Math.hypot(vx, vy);
          const dir = Math.sign(vx) || (currentX > bx ? 1 : -1);
          const impulse = Math.min(Math.max(dir * Math.max(speed * 0.0028, 0.45), -2.4), 2.4);
          state.omega += impulse;
        }
        state.wasInside = isInside;

        // 2. String Pluck Check (cursor crossing cable)
        if (currentY > 15 && currentY < by - 25) {
          const stringXAtY = ax + (bx - ax) * (currentY / by);
          const distToString = Math.abs(currentX - stringXAtY);
          const isCuttingString = distToString < 16;

          if (isCuttingString && !state.wasCuttingString) {
            const dir = Math.sign(vx) || (currentX > stringXAtY ? 1 : -1);
            const pluck = Math.min(Math.max(dir * 0.35, -1.6), 1.6);
            state.omega += pluck;
          }
          state.wasCuttingString = isCuttingString;
        } else {
          state.wasCuttingString = false;
        }
      });
    };

    const onPointerUp = () => {
      draggingIdRef.current = null;
      Object.values(statesRef.current).forEach((st) => {
        st.isDragging = false;
      });
    };

    window.addEventListener("mousemove", onPointerMove, { passive: true });
    window.addEventListener("touchmove", onPointerMove, { passive: true });
    window.addEventListener("mouseup", onPointerUp, { passive: true });
    window.addEventListener("touchend", onPointerUp, { passive: true });

    // Physics Animation Loop
    let animId: number;
    let lastAnimTime = performance.now();

    const loop = (time: number) => {
      const dt = Math.min(Math.max((time - lastAnimTime) / 1000, 0.001), 0.033);
      lastAnimTime = time;

      const rectWidth = container.getBoundingClientRect().width || 1200;

      PENDULUMS.forEach((item, i) => {
        const state = statesRef.current[item.id];
        if (!state) return;

        const ax = rectWidth * item.anchorPercentX;
        const L = item.length;

        if (!state.isDragging && !reducedMotion) {
          // Gravity restoring torque: alpha = -(g/L) * sin(theta)
          const g = 650;
          const alpha = -(g / L) * Math.sin(state.theta);

          // Subtle natural micro-breeze when nearly motionless
          let ambientBreeze = 0;
          if (Math.abs(state.theta) < 0.03 && Math.abs(state.omega) < 0.03) {
            ambientBreeze = Math.sin(time * 0.0015 + i * 1.8) * 0.0012;
          }

          // Fluid damping
          const damping = 0.991;
          state.omega = (state.omega + (alpha + ambientBreeze) * dt) * damping;
          state.theta += state.omega * dt;

          // Elastic boundary bounce if swung too high
          if (state.theta > 1.2) {
            state.theta = 1.2;
            state.omega *= -0.4;
          } else if (state.theta < -1.2) {
            state.theta = -1.2;
            state.omega *= -0.4;
          }
        }

        const theta = reducedMotion ? 0 : state.theta;
        const bx = ax + L * Math.sin(theta);
        const by = L * Math.cos(theta);
        const deg = (theta * 180) / Math.PI;

        // Direct DOM update: line
        const line = svgLinesRef.current[item.id];
        if (line) {
          line.setAttribute("x1", String(ax));
          line.setAttribute("y1", "0");
          line.setAttribute("x2", bx.toFixed(1));
          line.setAttribute("y2", by.toFixed(1));
        }

        // Direct DOM update: badge top eyelet
        const ring = svgBadgeRingsRef.current[item.id];
        if (ring) {
          ring.setAttribute("cx", bx.toFixed(1));
          ring.setAttribute("cy", by.toFixed(1));
        }

        // Direct DOM update: badge container
        const node = badgeNodesRef.current[item.id];
        if (node) {
          node.style.transform = `translate3d(${bx.toFixed(1)}px, ${by.toFixed(1)}px, 0) rotate(${deg.toFixed(1)}deg)`;
        }
      });

      animId = window.requestAnimationFrame(loop);
    };

    animId = window.requestAnimationFrame(loop);

    return () => {
      ro.disconnect();
      window.removeEventListener("mousemove", onPointerMove);
      window.removeEventListener("touchmove", onPointerMove);
      window.removeEventListener("mouseup", onPointerUp);
      window.removeEventListener("touchend", onPointerUp);
      window.cancelAnimationFrame(animId);
    };
  }, [reducedMotion]);

  const handleBadgeDown = (id: string) => {
    draggingIdRef.current = id;
    const st = statesRef.current[id];
    if (st) {
      st.isDragging = true;
      st.omega = 0;
    }
  };

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 top-0 h-full overflow-hidden select-none z-10"
    >
      {/* SVG Cables & Mounting Layer */}
      <svg className="absolute inset-0 size-full pointer-events-none overflow-visible">
        {PENDULUMS.map((item) => {
          const ax = containerWidth * item.anchorPercentX;
          const isMobileHidden = containerWidth < 768 && !item.mobileVisible;
          if (isMobileHidden) return null;

          return (
            <g key={`pendulum-cable-${item.id}`}>
              {/* Ceiling Mounting Pin */}
              <circle cx={ax} cy={2} r={3.5} fill="rgb(163, 163, 163)" />
              <circle cx={ax} cy={2} r={1.5} fill="rgb(38, 38, 38)" />

              {/* Dynamic Hanging Wire */}
              <line
                ref={(el) => {
                  svgLinesRef.current[item.id] = el;
                }}
                x1={ax}
                y1={0}
                x2={ax}
                y2={item.length}
                stroke="rgba(163, 163, 163, 0.45)"
                strokeWidth="1.5"
                strokeLinecap="round"
              />

              {/* Eyelet connecting wire to badge top */}
              <circle
                ref={(el) => {
                  svgBadgeRingsRef.current[item.id] = el;
                }}
                cx={ax}
                cy={item.length}
                r={3}
                fill="rgb(115, 115, 115)"
              />
            </g>
          );
        })}
      </svg>

      {/* Floating Badges Layer */}
      {PENDULUMS.map((item) => {
        const { Icon } = item;
        const isMobileHidden = containerWidth < 768 && !item.mobileVisible;
        if (isMobileHidden) return null;

        return (
          <div
            key={`pendulum-badge-${item.id}`}
            ref={(el) => {
              badgeNodesRef.current[item.id] = el;
            }}
            onMouseDown={() => handleBadgeDown(item.id)}
            onTouchStart={() => handleBadgeDown(item.id)}
            data-cursor-interactive="true"
            className="group pointer-events-auto absolute top-0 left-0 -ml-6 -mt-3 flex flex-col items-center cursor-grab active:cursor-grabbing will-change-transform"
            title={item.label}
          >
            {/* 3D-ish Squircle Pot Badge */}
            <div
              className="relative size-11 sm:size-12 rounded-2xl flex items-center justify-center transition-transform duration-150 group-hover:scale-110 active:scale-95"
              style={{
                background: item.bgStyle,
                boxShadow: `0 12px 24px -4px ${item.shadowColor}, 0 4px 8px -2px rgba(0, 0, 0, 0.2)`,
                border: "1px solid rgba(255, 255, 255, 0.35)",
              }}
            >
              <Icon
                className="size-5 sm:size-6 transition-transform group-hover:scale-110"
                style={{ color: item.textColor }}
              />
            </div>

            {/* Micro Tooltip Pill on Hover */}
            <div className="pointer-events-none mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <span
                className="inline-block px-2.5 py-1 rounded-full text-xs font-sans font-medium whitespace-nowrap shadow-md"
                style={{
                  backgroundColor: "rgba(23, 23, 23, 0.9)",
                  color: "rgb(255, 255, 255)",
                  backdropFilter: "blur(4px)",
                }}
              >
                {item.label}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
