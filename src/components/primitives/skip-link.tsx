import * as tokens from "@/design/tokens";
import { cn } from "@/lib/cn";

// A raw <a>, not the Link primitive: "#main" points at the <main> landmark,
// not a section, so the Href type rejects it — correctly.
export function SkipLink() {
  return (
    <a
      href="#main"
      className={cn(
        tokens.overrides["skip-link"],
        // focus-ring, not focus-ring-dark: the dark variant's ring is white
        // and would be invisible on the white page behind this link.
        tokens.overrides["focus-ring"],
      )}
    >
      Skip to main content
    </a>
  );
}
