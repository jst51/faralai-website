import "../../globals.css";
import { en } from "@/content/dictionary";
import { Analytics, fontClasses, siteMetadata, StructuredData } from "@/lib/site";

export const metadata = siteMetadata(en);

export default function EnglishLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={fontClasses}>
      <body>
        {children}
        <StructuredData t={en} />
        <Analytics />
      </body>
    </html>
  );
}
