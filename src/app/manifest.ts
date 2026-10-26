import type { MetadataRoute } from "next";

import { SITE } from "@/content/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE.name,
    short_name: SITE.name,
    description: SITE.description,
    start_url: "/",
    display: "standalone",
    background_color: SITE.themeColor,
    theme_color: SITE.themeColor,
    icons: [
      {
        src: "/herman-headshot.jpeg",
        sizes: "48x48 32x32 16x16",
        type: "image/x-icon",
      },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
      {
        src: "/herman-headshot.jpeg",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/herman-headshot.jpeg",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      // Separate file, not `purpose: "any maskable"` on one: Android crops a
      // maskable icon to the middle 80%, so a single dual-purpose file is
      // either padded wrong unmasked or clipped when masked.
      {
        src: "/herman-headshot.jpeg",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
