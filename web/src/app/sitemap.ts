import type { MetadataRoute } from "next";
import { languageAlternates, SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

// Each service page in Spanish and English.
const SERVICE_PAGES = [
  ["/es/diseno-web-marbella/", "/en/web-design-marbella/"],
  ["/es/agencia-marketing-marbella/", "/en/marketing-agency-marbella/"],
  ["/es/organizacion-eventos-marbella/", "/en/event-planner-marbella/"],
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const alternates = { languages: languageAlternates };
  return [
    { url: `${SITE_URL}/es/`, lastModified, priority: 1, alternates },
    { url: `${SITE_URL}/en/`, lastModified, priority: 1, alternates },
    ...SERVICE_PAGES.flatMap(([es, en]) => {
      const pair = { languages: { es: `${SITE_URL}${es}`, en: `${SITE_URL}${en}` } };
      return [es, en].map((path) => ({ url: `${SITE_URL}${path}`, lastModified, priority: 0.8, alternates: pair }));
    }),
  ];
}
