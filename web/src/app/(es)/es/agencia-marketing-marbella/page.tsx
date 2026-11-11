import { ServicePage } from "@/components/ServicePage";
import { MARKETING_ICONS, marketingVisual } from "@/components/serviceArt";
import { es } from "@/content/dictionary";
import { marketingEs, marketingVisualLabels } from "@/content/marketingAgency";
import { servicePageMetadata } from "@/lib/site";

export const metadata = servicePageMetadata(marketingEs, "es");

export default function Page() {
  return <ServicePage t={es} c={marketingEs} icons={MARKETING_ICONS} visual={marketingVisual(marketingVisualLabels.es)} />;
}
