import type { Metadata } from "next";
import { Mark } from "@/components/Mark";
import { languageAlternates, SITE_URL } from "@/lib/site";

// faralai.com itself: picks the visitor's language and sends them to /es/ or /en/. Each language has
// its own permanent address that never redirects, and this page is declared to Google as "x-default",
// which is the arrangement Google documents for auto-detecting homepages.
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Faralai | Strategy and execution / Estrategia y ejecución",
  description: "Business consulting, marketing, social media and design from Marbella. Consultoría de negocio, marketing, redes sociales y diseño desde Marbella.",
  alternates: { canonical: `${SITE_URL}/`, languages: languageAlternates },
};

const CHOOSE_LANGUAGE = `(function(){
var saved=null;try{saved=localStorage.getItem('faralai-lang')}catch(x){}
var lang=saved||((navigator.languages&&navigator.languages[0])||navigator.language||'').toLowerCase();
location.replace((lang.indexOf('es')===0?'/es/':'/en/')+location.search+location.hash);
})();`;

export default function Page() {
  return (
    <main className="grid min-h-screen place-items-center bg-desk p-6">
      <script dangerouslySetInnerHTML={{ __html: CHOOSE_LANGUAGE }} />
      <div className="flex flex-col items-center gap-5">
        <Mark size={56} />
        <nav aria-label="Language" className="flex gap-2">
          <a href="/es/" className="btn btn-ink">Español</a>
          <a href="/en/" className="btn btn-ink">English</a>
        </nav>
      </div>
    </main>
  );
}
