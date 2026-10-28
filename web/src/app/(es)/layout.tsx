import "../globals.css";
import { es } from "@/content/dictionary";
import { Analytics, fontClasses, siteMetadata, StructuredData } from "@/lib/site";

export const metadata = siteMetadata(es);

export default function SpanishLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={fontClasses}>
      <body>
        {children}
        <StructuredData t={es} />
        <Analytics />
      </body>
    </html>
  );
}
