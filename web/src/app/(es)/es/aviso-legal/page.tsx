import { LegalPage } from "@/components/legal/LegalPage";
import { es } from "@/content/dictionary";
import { LEGAL } from "@/content/legal";
import { legalMetadata } from "@/lib/site";

export const metadata = legalMetadata(LEGAL.es.notice.title, "/es/aviso-legal/");

export default function Page() {
  return <LegalPage t={es} doc="notice" />;
}
