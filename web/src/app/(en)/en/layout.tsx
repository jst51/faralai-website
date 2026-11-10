import "../../globals.css";
import { en } from "@/content/dictionary";
import { CookieConsent } from "@/components/legal/CookieConsent";
import { LanguageMemory } from "@/components/LanguageMemory";
import { fontClasses, siteMetadata, StructuredData } from "@/lib/site";

export const metadata = siteMetadata(en);

export default function EnglishLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={fontClasses}>
      <body>
        <LanguageMemory />
        {children}
        <StructuredData t={en} />
        <CookieConsent t={en.legal} />
      </body>
    </html>
  );
}
