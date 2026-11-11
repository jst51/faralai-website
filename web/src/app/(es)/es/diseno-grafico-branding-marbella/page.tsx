import { ServicePage } from "@/components/ServicePage";
import { BRANDING_ICONS, brandingVisual } from "@/components/serviceArt";
import { es } from "@/content/dictionary";
import { brandingEs, brandingVisualLabels } from "@/content/branding";
import { servicePageMetadata } from "@/lib/site";

export const metadata = servicePageMetadata(brandingEs, "es");

export default function Page() {
  return <ServicePage t={es} c={brandingEs} icons={BRANDING_ICONS} visual={brandingVisual(brandingVisualLabels.es)} />;
}
