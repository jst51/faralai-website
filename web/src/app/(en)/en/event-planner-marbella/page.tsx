import { ServicePage } from "@/components/ServicePage";
import { EVENT_ICONS, eventsVisual } from "@/components/serviceArt";
import { en } from "@/content/dictionary";
import { eventsEn, eventsVisualLabels } from "@/content/events";
import { servicePageMetadata } from "@/lib/site";

export const metadata = servicePageMetadata(eventsEn, "en");

export default function Page() {
  return <ServicePage t={en} c={eventsEn} icons={EVENT_ICONS} visual={eventsVisual(eventsVisualLabels.en)} />;
}
