import type { CSSProperties } from "react";

import type { TerminalLine, TerminalLineKind } from "@/content/types";
import * as tokens from "@/design/tokens";
import { cn } from "@/lib/cn";

type TerminalFrameProps = {
  title: string;
  lines: readonly TerminalLine[];
  className?: string;
};

// Content stores plain strings; this map is the one place a line kind becomes
// a visible glyph.
const GLYPH: Record<TerminalLineKind, string> = {
  prompt: ">",
  result: "●",
  branch: "├",
  status: "✓",
};
const BRANCH_LAST = "└";

const LINE_TONE: Record<TerminalLineKind, string> = {
  prompt: tokens.overrides["terminal-line-command"],
  result: tokens.overrides["terminal-line-command"],
  branch: "",
  status: tokens.overrides["terminal-line-status"],
};

const GLYPH_TONE: Record<TerminalLineKind, string> = {
  prompt: tokens.overrides["terminal-glyph"],
  result: tokens.overrides["terminal-glyph"],
  branch: "",
  status: tokens.overrides["terminal-glyph"],
};

// Streaming pace. Prompts type at human speed; output streams like tool
// output. ~6.7s total for the hero content, ending on the blinking cursor.
// Timing travels as inline custom properties (read by the typewriter-*
// utilities in globals.css), which Tailwind never needs to see — so no class
// ladder and no line-count cap.
const TYPE_MS: Record<TerminalLineKind, number> = {
  prompt: 55,
  result: 18,
  branch: 18,
  status: 18,
};
const START_MS = 300; // beat before the shell "wakes"
const STREAM_GAP_MS = 80; // between streamed output lines
const RUN_MS = 500; // command typed -> output starts
const RETURN_MS = 600; // output done -> fresh prompt returns

type TimedLine = {
  readonly line: TerminalLine;
  readonly delay: number;
  readonly duration: number;
  readonly steps: number;
};

const timeline = (lines: readonly TerminalLine[]): TimedLine[] => {
  const out: TimedLine[] = [];
  let clock = START_MS;
  lines.forEach((line, i) => {
    if (i > 0) {
      clock +=
        lines[i - 1]?.kind === "prompt"
          ? RUN_MS
          : line.kind === "prompt"
            ? RETURN_MS
            : STREAM_GAP_MS;
    }
    // Code points, not UTF-16 units; steps() needs a positive integer.
    const steps = Math.max(Array.from(line.text).length, 1);
    const duration = steps * TYPE_MS[line.kind];
    out.push({ line, delay: clock, duration, steps });
    clock += duration;
  });
  return out;
};

// CSSProperties has no index signature for --* keys; the intersection
// declares the three vars, so no `as` cast is needed.
type TypewriterVars = CSSProperties & {
  readonly "--typewriter-delay": string;
  readonly "--typewriter-duration": string;
  readonly "--typewriter-steps": string;
};

const typewriterVars = (t: TimedLine): TypewriterVars => ({
  "--typewriter-delay": `${t.delay}ms`,
  "--typewriter-duration": `${t.duration}ms`,
  "--typewriter-steps": `${t.steps}`,
});

export function TerminalFrame({ title, lines, className }: TerminalFrameProps) {
  return (
    <div className={cn(tokens.overrides["terminal-frame"], className)}>
      {/* Simulated chrome, hidden for the same reason as BrowserFrame's bar. */}
      <div
        aria-hidden="true"
        className={cn(
          "flex items-center gap-3",
          tokens.overrides["terminal-bar"],
        )}
      >
        <div className="flex shrink-0 items-center gap-1.5">
          <span className={tokens.overrides["terminal-dot"]} />
          <span className={tokens.overrides["terminal-dot"]} />
          <span className={tokens.overrides["terminal-dot"]} />
        </div>
        <span className={cn("truncate", tokens.overrides["terminal-title"])}>
          {title}
        </span>
      </div>
      {/* role="list": VoiceOver drops list semantics on marker-less lists
          without it. The line text is real content — only chrome, glyphs and
          the cursor are hidden from screen readers; the typewriter clips
          visually via width, so assistive tech gets the full pitch at once. */}
      <ul
        role="list"
        className={cn("flex flex-col gap-2", tokens.overrides["terminal-body"])}
      >
        {timeline(lines).map((timed, index) => {
          const { line } = timed;
          const glyph =
            line.kind === "branch" && lines[index + 1]?.kind !== "branch"
              ? BRANCH_LAST
              : GLYPH[line.kind];
          return (
            <li
              key={index}
              style={typewriterVars(timed)}
              className={cn(
                "flex items-baseline gap-3",
                index > 0 && line.kind === "prompt" && "mt-2",
                line.kind === "branch" && "pl-4",
                LINE_TONE[line.kind],
              )}
            >
              <span
                aria-hidden="true"
                className={cn(
                  "shrink-0",
                  GLYPH_TONE[line.kind],
                  "motion-safe:typewriter-glyph",
                )}
              >
                {glyph}
              </span>
              <span className="min-w-0">
                {/* Clip span wraps ONLY the text: its width target is the text
                    char count, so the cursor must stay a sibling or it would
                    be clipped forever. */}
                <span className="motion-safe:typewriter-text motion-safe:typewriter-caret">
                  {line.text}
                </span>
                {line.cursor ? (
                  <span
                    aria-hidden="true"
                    className={cn(
                      tokens.overrides["terminal-cursor"],
                      "motion-safe:typewriter-cursor",
                    )}
                  >
                    {" ▋"}
                  </span>
                ) : null}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
