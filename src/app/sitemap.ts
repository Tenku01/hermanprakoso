import type { MetadataRoute } from "next";

import { SITE } from "@/content/site";
import { NOW } from "@/lib/now";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE.url,
      lastModified: NOW,
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
