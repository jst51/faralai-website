import type { Dict } from "@/content/dictionary";
import { LEGAL, type DocKey } from "@/content/legal";
import { Mark } from "../Mark";
import { CookieSettingsButton } from "./CookieConsent";

// Shared layout for the legal notice, privacy policy and cookie policy.

// Turns web addresses and the contact email into links, and highlights details still to be filled in.
function Rich({ text }: { text: string }) {
  return text.split(/(\[[^\]]+\]|https?:\/\/[^\s]+|info@faralai\.com)/).map((part, i) => {
    if (part.startsWith("[")) return <mark key={i} className="rounded bg-lime px-1 font-semibold text-ink">{part}</mark>;
    if (part.startsWith("http")) return <a key={i} href={part} rel="noopener" className="underline underline-offset-2">{part}</a>;
    if (part === "info@faralai.com") return <a key={i} href={`mailto:${part}`} className="underline underline-offset-2">{part}</a>;
    return part;
  });
}

export function LegalLinks({ t }: { t: Dict["legal"] }) {
  return (
    <nav aria-label={t.navLabel} className="flex flex-wrap gap-x-5 gap-y-1">
      {Object.values(t.links).map((l) => (
        <a key={l.href} href={l.href} className="no-underline hover:text-ink">{l.label}</a>
      ))}
      <CookieSettingsButton label={t.settings} />
    </nav>
  );
}

export function LegalPage({ t, doc }: { t: Dict; doc: DocKey }) {
  const content = LEGAL[t.locale as "es" | "en"][doc];
  return (
    <div className="mx-auto flex min-h-screen max-w-[1480px] flex-col gap-2 p-2">
      <header className="tile flex items-center justify-between gap-4 !py-3">
        <a href={t.nav.home} className="flex items-center gap-2.5 text-[1.2rem] font-extrabold tracking-[-0.02em] no-underline">
          <Mark size={32} /> Faralai
        </a>
        <div className="flex items-center gap-4 text-[0.95rem] font-medium text-ink-2">
          <a href={t.legal.others[doc]} data-lang-switch={t.nav.other.label.toLowerCase()} className="no-underline hover:text-ink">{t.nav.other.name}</a>
          <a href={t.nav.home} className="btn btn-line !min-h-10 !px-4 !text-[0.9rem]">{t.legal.back}</a>
        </div>
      </header>
      <main className="tile flex-1">
        <article className="mx-auto max-w-[780px] py-6 sm:py-10">
          <h1 className="display h-section">{content.title}</h1>
          <p className="mt-3 text-[0.9rem] text-mute">{t.legal.updated}</p>
          {content.intro && <p className="mt-6 text-[1.08rem] text-ink-2">{content.intro}</p>}
          {content.sections.map((s) => (
            <section key={s.h} className="mt-9">
              <h2 className="h-tile">{s.h}</h2>
              {s.p?.map((x) => <p key={x} className="mt-3 text-ink-2"><Rich text={x} /></p>)}
              {s.list && (
                <ul className="mt-3 flex list-disc flex-col gap-1.5 pl-5 text-ink-2">
                  {s.list.map((x) => <li key={x}><Rich text={x} /></li>)}
                </ul>
              )}
              {s.table && (
                <div className="mt-4 overflow-x-auto">
                  <table className="w-full min-w-[620px] border-collapse text-left text-[0.92rem]">
                    <thead>
                      <tr>{s.table.head.map((c) => <th key={c} className="border-b-2 border-ink py-2 pr-4 font-bold">{c}</th>)}</tr>
                    </thead>
                    <tbody className="align-top text-ink-2">
                      {s.table.rows.map((r) => (
                        <tr key={r[0]}>{r.map((c, i) => <td key={i} className="border-b border-line py-2.5 pr-4">{c}</td>)}</tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              {s.after?.map((x) => <p key={x} className="mt-3 text-ink-2"><Rich text={x} /></p>)}
            </section>
          ))}
        </article>
      </main>
      <footer className="flex flex-wrap justify-between gap-3 px-2 py-3 text-[0.84rem] text-mute">
        <p>{t.footer.rights}</p>
        <LegalLinks t={t.legal} />
      </footer>
    </div>
  );
}
