import { ServicePage } from "@/components/ServicePage";
import { EVENT_ICONS, eventsVisual } from "@/components/serviceArt";
import { es } from "@/content/dictionary";
import { eventsEs, eventsVisualLabels } from "@/content/events";
import { servicePageMetadata } from "@/lib/site";

export const metadata = servicePageMetadata(eventsEs, "es");

export default function Page() {
  return <ServicePage t={es} c={eventsEs} icons={EVENT_ICONS} visual={eventsVisual(eventsVisualLabels.es)} />;
}
