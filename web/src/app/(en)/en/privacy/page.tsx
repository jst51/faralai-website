import { LegalPage } from "@/components/legal/LegalPage";
import { en } from "@/content/dictionary";
import { LEGAL } from "@/content/legal";
import { legalMetadata } from "@/lib/site";

export const metadata = legalMetadata(LEGAL.en.privacy.title, "/en/privacy/");

export default function Page() {
  return <LegalPage t={en} doc="privacy" />;
}
