import { WebDesignPage } from "@/components/WebDesignPage";
import { en } from "@/content/dictionary";
import { webDesignEn } from "@/content/webDesign";
import { servicePageMetadata } from "@/lib/site";

export const metadata = servicePageMetadata(webDesignEn, "en");

export default function Page() {
  return <WebDesignPage t={en} c={webDesignEn} />;
}
