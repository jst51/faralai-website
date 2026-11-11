import type { Dict } from "@/content/dictionary";
import { AuditForm } from "./AuditForm";

// The free audit board: what the audit covers on the left, the form on the right.
// Service pages pass their own title and lead; the rest of the copy is shared.
export function AuditSection({ t, title, lead }: { t: Dict; title?: string; lead?: string }) {
  return (
    <section id={t.ids.audit} className="board" aria-labelledby="audit-title">
      <div className="tile tile-night col-span-2 flex flex-col gap-6 md:col-span-6 lg:col-span-5">
        <h2 id="audit-title" className="display h-section max-w-[12ch]">{title ?? t.audit.title}</h2>
        <p className="max-w-[46ch] text-night-mute">{lead ?? t.audit.lead}</p>
        <ul className="flex flex-col gap-2.5">
          {t.audit.includes.map((x) => (
            <li key={x} className="flex items-start gap-3">
              <span aria-hidden="true" className="mt-[3px] grid h-5 w-5 flex-none place-items-center rounded-full bg-lime">
                <svg viewBox="0 0 20 20" width="20" height="20"><path d="M6 10.5l2.6 2.5L14 7.5" fill="none" stroke="#0e1a3a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </span>
              {x}
            </li>
          ))}
        </ul>
        <p className="mt-auto pt-4 text-night-mute">
          {t.audit.email.before}{" "}
          <a href={`mailto:${t.audit.email.address}`} className="text-white underline-offset-4">{t.audit.email.address}</a>
        </p>
      </div>
      <div className="tile col-span-2 md:col-span-6 lg:col-span-7">
        <AuditForm t={t.audit.form} locale={t.locale} />
      </div>
    </section>
  );
}
