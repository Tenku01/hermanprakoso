import { Bot, Layers, PenTool, type LucideIcon } from "lucide-react";

import type { CapabilityIconName } from "@/content/types";

export type IconProps = {
  icon: LucideIcon;
  // sm is the inline/button size, md the card-header size. No className prop
  // on purpose: if callers could pass classes the page would grow a third
  // icon size. Colour still follows the text — the stroke is currentColor.
  size?: "sm" | "md";
};

const SIZE = { sm: "size-4", md: "size-5" } as const;

export function Icon({ icon: Glyph, size = "sm" }: IconProps) {
  return <Glyph aria-hidden="true" strokeWidth={1.5} className={SIZE[size]} />;
}

// Content files store icon names as plain strings and never import component
// code. This map is the one place a stored string becomes a component.
export const CAPABILITY_ICONS = {
  bot: Bot,
  layers: Layers,
  "pen-tool": PenTool,
} as const satisfies Record<CapabilityIconName, LucideIcon>;
