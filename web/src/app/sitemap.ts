import type { MetadataRoute } from "next";
import { languageAlternates, SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const alternates = { languages: languageAlternates };
  const webDesign = { languages: { es: `${SITE_URL}/es/diseno-web-marbella/`, en: `${SITE_URL}/en/web-design-marbella/` } };
  return [
    { url: `${SITE_URL}/es/`, lastModified, priority: 1, alternates },
    { url: `${SITE_URL}/en/`, lastModified, priority: 1, alternates },
    { url: `${SITE_URL}/es/diseno-web-marbella/`, lastModified, priority: 0.8, alternates: webDesign },
    { url: `${SITE_URL}/en/web-design-marbella/`, lastModified, priority: 0.8, alternates: webDesign },
  ];
}
