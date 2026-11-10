import { LegalPage } from "@/components/legal/LegalPage";
import { es } from "@/content/dictionary";
import { LEGAL } from "@/content/legal";
import { legalMetadata } from "@/lib/site";

export const metadata = legalMetadata(LEGAL.es.cookies.title, "/es/cookies/");

export default function Page() {
  return <LegalPage t={es} doc="cookies" />;
}
