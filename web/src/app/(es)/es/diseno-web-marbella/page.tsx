import { WebDesignPage } from "@/components/WebDesignPage";
import { es } from "@/content/dictionary";
import { webDesignEs } from "@/content/webDesign";
import { servicePageMetadata } from "@/lib/site";

export const metadata = servicePageMetadata(webDesignEs, "es");

export default function Page() {
  return <WebDesignPage t={es} c={webDesignEs} />;
}
