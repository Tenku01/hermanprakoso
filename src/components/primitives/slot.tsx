import {
  Children,
  cloneElement,
  isValidElement,
  type ReactElement,
  type ReactNode,
} from "react";

import { cn } from "@/lib/cn";

type SlotProps = {
  children?: ReactNode;
  className?: string;
} & Record<string, unknown>;

export function Slot({ children, className, ...slotProps }: SlotProps) {
  // Throw, not a silent fallback: with asChild the child IS the rendered
  // element, so if it is missing there is nothing sane to attach props to.
  if (Children.count(children) !== 1 || !isValidElement(children)) {
    throw new Error(
      `Slot expects exactly one React element child. Received ${Children.count(children)} child(ren).`,
    );
  }

  const child = children as ReactElement<Record<string, unknown>>;
  const childProps = child.props;

  return cloneElement(child, {
    ...slotProps,
    // Child props last: an explicit href/id/aria-* on the child is the
    // author's intent; the slot's are only defaults.
    ...childProps,
    className: cn(className, childProps.className as string | undefined),
  });
}
