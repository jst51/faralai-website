import { LegalPage } from "@/components/legal/LegalPage";
import { en } from "@/content/dictionary";
import { LEGAL } from "@/content/legal";
import { legalMetadata } from "@/lib/site";

export const metadata = legalMetadata(LEGAL.en.notice.title, "/en/legal-notice/");

export default function Page() {
  return <LegalPage t={en} doc="notice" />;
}
