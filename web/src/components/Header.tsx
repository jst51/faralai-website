import type { Dict } from "@/content/dictionary";
import { Mark } from "./Mark";

export function Header({ t }: { t: Dict }) {
  return (
    <header className="sticky top-2 z-50">
      <div className="tile flex items-center justify-between gap-4 !py-3 shadow-[0_10px_30px_-24px_rgba(22,22,22,.6)]">
        <a href={t.nav.home} className="flex items-center gap-2.5 text-[1.2rem] font-extrabold tracking-[-0.02em] no-underline">
          <Mark size={32} />
          <span className="hidden min-[420px]:inline">Faralai</span>
        </a>
        <nav aria-label="Main" className="hidden items-center gap-7 text-[0.95rem] font-medium text-ink-2 md:flex">
          {t.nav.links.map((l) => (
            <a key={l.href} href={l.href} className="no-underline hover:text-ink">
              {l.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="flex rounded-[10px] bg-desk p-1 text-[0.8rem] font-bold">
            <span className="rounded-[7px] bg-paper px-2.5 py-1.5" aria-current="true">
              {t.nav.current}
            </span>
            <a href={t.nav.other.href} data-lang-switch={t.nav.other.label.toLowerCase()} hrefLang={t.nav.other.label.toLowerCase()} lang={t.nav.other.label.toLowerCase()} aria-label={t.nav.other.name} className="px-2.5 py-1.5 text-mute no-underline hover:text-ink">
              {t.nav.other.label}
            </a>
          </div>
          <a href={`#${t.ids.audit}`} className="btn btn-ink !min-h-10 whitespace-nowrap !px-4 !text-[0.9rem]">
            {t.nav.cta}
          </a>
        </div>
      </div>
    </header>
  );
}
