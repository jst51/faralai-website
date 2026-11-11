import { ServicePage } from "@/components/ServicePage";
import { WEB_ICONS, WEB_VISUAL } from "@/components/serviceArt";
import { en } from "@/content/dictionary";
import { webDesignEn } from "@/content/webDesign";
import { servicePageMetadata } from "@/lib/site";

export const metadata = servicePageMetadata(webDesignEn, "en");

export default function Page() {
  return <ServicePage t={en} c={webDesignEn} icons={WEB_ICONS} visual={WEB_VISUAL} />;
}
