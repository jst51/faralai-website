import "../globals.css";
import { es } from "@/content/dictionary";
import { CustomCursor } from "@/components/CustomCursor";
import { CookieConsent } from "@/components/legal/CookieConsent";
import { LanguageMemory } from "@/components/LanguageMemory";
import { fontClasses, siteMetadata, StructuredData } from "@/lib/site";

export const metadata = siteMetadata(es);

export default function SpanishLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={fontClasses}>
      <body>
        <LanguageMemory />
        <CustomCursor />
        {children}
        <StructuredData t={es} />
        <CookieConsent t={es.legal} />
      </body>
    </html>
  );
}
