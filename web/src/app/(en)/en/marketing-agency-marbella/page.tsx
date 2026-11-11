import { ServicePage } from "@/components/ServicePage";
import { MARKETING_ICONS, marketingVisual } from "@/components/serviceArt";
import { en } from "@/content/dictionary";
import { marketingEn, marketingVisualLabels } from "@/content/marketingAgency";
import { servicePageMetadata } from "@/lib/site";

export const metadata = servicePageMetadata(marketingEn, "en");

export default function Page() {
  return <ServicePage t={en} c={marketingEn} icons={MARKETING_ICONS} visual={marketingVisual(marketingVisualLabels.en)} />;
}
