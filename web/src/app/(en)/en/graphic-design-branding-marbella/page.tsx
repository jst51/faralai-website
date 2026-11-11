import { ServicePage } from "@/components/ServicePage";
import { BRANDING_ICONS, brandingVisual } from "@/components/serviceArt";
import { en } from "@/content/dictionary";
import { brandingEn, brandingVisualLabels } from "@/content/branding";
import { servicePageMetadata } from "@/lib/site";

export const metadata = servicePageMetadata(brandingEn, "en");

export default function Page() {
  return <ServicePage t={en} c={brandingEn} icons={BRANDING_ICONS} visual={brandingVisual(brandingVisualLabels.en)} />;
}
