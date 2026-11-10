import "../globals.css";
import { fontClasses } from "@/lib/site";

export default function RootRouterLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={fontClasses}>
      <body>{children}</body>
    </html>
  );
}
