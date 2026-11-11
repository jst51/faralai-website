import { ServicePage } from "@/components/ServicePage";
import { WEB_ICONS, WEB_VISUAL } from "@/components/serviceArt";
import { es } from "@/content/dictionary";
import { webDesignEs } from "@/content/webDesign";
import { servicePageMetadata } from "@/lib/site";

export const metadata = servicePageMetadata(webDesignEs, "es");

export default function Page() {
  return <ServicePage t={es} c={webDesignEs} icons={WEB_ICONS} visual={WEB_VISUAL} />;
}
