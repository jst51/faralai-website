import type { Metadata } from "next";
import { Big_Shoulders, Schibsted_Grotesk } from "next/font/google";
import type { Dict } from "@/content/dictionary";

// Shared pieces of the two root layouts (Spanish at /, English at /en/).

export const SITE_URL = "https://faralai.com";

// How Google is told the language versions relate: "/" is the page that picks the language.
export const languageAlternates = { es: `${SITE_URL}/es/`, en: `${SITE_URL}/en/`, "x-default": `${SITE_URL}/` };

export const font = Schibsted_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-schibsted",
  display: "swap",
});

export const displayFont = Big_Shoulders({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-shoulders",
  display: "swap",
});

export const fontClasses = `${font.variable} ${displayFont.variable}`;

export function siteMetadata(t: Dict): Metadata {
  const url = `${SITE_URL}${t.nav.home}`;
  return {
    metadataBase: new URL(SITE_URL),
    title: t.meta.title,
    description: t.meta.description,
    alternates: {
      canonical: url,
      languages: languageAlternates,
    },
    openGraph: {
      type: "website",
      url,
      title: t.meta.ogTitle,
      description: t.meta.description,
      images: ["/images/og.jpg"],
      locale: t.locale === "es" ? "es_ES" : "en_GB",
    },
    twitter: { card: "summary_large_image" },
  };
}

// Legal pages have their own canonical address and stay out of search results.
export function legalMetadata(title: string, path: string): Metadata {
  return { title: `${title} | Faralai`, alternates: { canonical: `${SITE_URL}${path}` }, robots: { index: false, follow: true } };
}

export function StructuredData({ t }: { t: Dict }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Faralai",
    url: `${SITE_URL}${t.nav.home}`,
    logo: `${SITE_URL}/images/faralai-mark.svg`,
    image: `${SITE_URL}/images/og.jpg`,
    email: "info@faralai.com",
    description: t.meta.description,
    address: { "@type": "PostalAddress", addressLocality: "Marbella", addressRegion: "Málaga", addressCountry: "ES" },
    areaServed: ["Marbella", "Costa del Sol", "Spain", "Europe", "Worldwide"],
    founder: { "@type": "Person", name: "Jose Manzanedo" },
    knowsLanguage: ["es", "en"],
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
