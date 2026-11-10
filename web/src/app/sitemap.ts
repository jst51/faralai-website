import type { MetadataRoute } from "next";
import { languageAlternates, SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const alternates = { languages: languageAlternates };
  return [
    { url: `${SITE_URL}/es/`, lastModified, priority: 1, alternates },
    { url: `${SITE_URL}/en/`, lastModified, priority: 1, alternates },
  ];
}
