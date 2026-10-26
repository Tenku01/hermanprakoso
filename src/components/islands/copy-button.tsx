"use client";

import { Check, Copy } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/primitives/button";
import { Icon } from "@/components/primitives/icon";

export type CopyButtonProps = {
  value: string;
  label: string;
  copiedLabel: string;
};

export function CopyButton({ value, label, copiedLabel }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Unmount cleanup only: the old site cleared the timer inside the timer's
  // own callback (a no-op) and could set state after unmount.
  useEffect(
    () => () => {
      if (timerRef.current !== null) clearTimeout(timerRef.current);
    },
    [],
  );

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(value);
      if (timerRef.current !== null) clearTimeout(timerRef.current);
      setCopied(true);
      timerRef.current = setTimeout(() => setCopied(false), 1500);
    } catch {
      // The real mailto:/tel: link sits beside this button and the value is
      // selectable text, so a refused clipboard permission costs nothing.
      setCopied(false);
    }
  }

  return (
    <>
      <Button variant="icon" aria-label={label} onClick={handleCopy}>
        {/* The changing key remounts the span, which is what replays the pop —
            re-applying the same animation class to a surviving element never
            restarts it (same trick as the hero wave). The wrapper exists
            because Icon takes no className. The class rides only the copied
            state so the resting icon does not pop once at page load. */}
        <span
          key={copied ? "check" : "copy"}
          className={
            copied ? "inline-flex motion-safe:animate-icon-pop" : "inline-flex"
          }
        >
          <Icon icon={copied ? Check : Copy} />
        </span>
      </Button>
      {/* In the DOM, empty, from the first paint: a live region inserted at
          the same moment its text appears is often not announced at all. */}
      <span role="status" aria-live="polite" className="sr-only">
        {copied ? copiedLabel : ""}
      </span>
    </>
  );
}
