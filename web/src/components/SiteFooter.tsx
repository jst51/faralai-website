import type { Dict } from "@/content/dictionary";
import { LegalLinks } from "./legal/LegalPage";
import { Mark } from "./Mark";

// Site footer. `base` prefixes the section links so they also work from pages other than the home
// page, and `otherHref` points the language link at the same page in the other language.
export function SiteFooter({ t, base = "", otherHref }: { t: Dict; base?: string; otherHref?: string }) {
  return (
    <footer className="board mt-2">
      <div className="tile col-span-2 flex flex-col gap-4 md:col-span-6 lg:col-span-6">
        <a href={t.nav.home} className="flex w-fit items-center gap-2.5 text-[1.2rem] font-extrabold tracking-[-0.02em] no-underline">
          <Mark size={32} /> Faralai
        </a>
        <p className="max-w-[40ch] text-ink-2">{t.footer.about}</p>
      </div>
      <div className="tile col-span-1 md:col-span-3 lg:col-span-3">
        <ul className="flex flex-col gap-2 text-ink-2">
          {t.nav.links.map((l) => <li key={l.href}><a href={`${base}${l.href}`} className="no-underline hover:text-ink">{l.label}</a></li>)}
          <li><a href={t.pages.webDesign.href} className="no-underline hover:text-ink">{t.pages.webDesign.label}</a></li>
          <li><a href={`${base}#${t.ids.audit}`} className="no-underline hover:text-ink">{t.nav.cta}</a></li>
        </ul>
      </div>
      <div className="tile col-span-1 md:col-span-3 lg:col-span-3">
        <ul className="flex flex-col gap-2 text-ink-2">
          <li><a href="mailto:info@faralai.com" className="no-underline hover:text-ink">info@faralai.com</a></li>
          <li>{t.footer.place}</li>
          <li><a href="https://www.instagram.com/faralai/" rel="noopener" className="no-underline hover:text-ink">Instagram</a></li>
          <li><a href={otherHref ?? t.nav.other.href} data-lang-switch={t.nav.other.label.toLowerCase()} lang={t.nav.other.label.toLowerCase()} className="no-underline hover:text-ink">{t.nav.other.name}</a></li>
        </ul>
      </div>
      <div className="col-span-2 flex flex-col gap-1.5 px-2 py-3 text-[0.8rem] text-mute md:col-span-6 lg:col-span-12">
        <div className="flex flex-wrap justify-between gap-3">
          <p>{t.footer.rights}</p>
          <LegalLinks t={t.legal} />
        </div>
      </div>
    </footer>
  );
}
