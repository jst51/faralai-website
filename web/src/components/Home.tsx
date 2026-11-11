import Image from "next/image";
import type { Dict } from "@/content/dictionary";
import { AuditSection } from "./AuditSection";
import { Behaviour } from "./Behaviour";
import { FutureSection } from "./FutureSection";
import { Header } from "./Header";
import { LogoCarousel } from "./LogoCarousel";
import { PlanHero } from "./plan/PlanHero";
import { Services } from "./Services";
import { SiteFooter } from "./SiteFooter";

// Line drawings for the five "sound familiar?" tiles, in the order of t.problem.pains.
const PAIN_ICONS = [
  // Marketing spend without knowing what works: a chart with a question mark.
  <g key="0"><path d="M4 36h48M10 36V22M20 36V12M30 36V26M40 36V16" /><path d="M46 8a4 4 0 1 1 4 4v3" /></g>,
  // An outdated website: a browser window.
  <g key="1"><rect x="4" y="4" width="48" height="32" rx="3" /><path d="M4 11h48" /><circle cx="9" cy="7.5" r="1" /><circle cx="13" cy="7.5" r="1" /><rect x="9" y="16" width="14" height="14" rx="1.5" strokeDasharray="2 2" /><path d="M28 18h19M28 24h14" /></g>,
  // International clients: a globe.
  <g key="2"><circle cx="28" cy="20" r="16" /><ellipse cx="28" cy="20" rx="7" ry="16" /><path d="M12 20h32M14.5 12h27M14.5 28h27" strokeDasharray="2 2.5" /></g>,
  // No hours left: a clock.
  <g key="3"><circle cx="28" cy="20" r="16" /><path d="M28 9v11l8 5" /><circle cx="28" cy="20" r="1.5" fill="currentColor" /></g>,
];

// Placement of the four pain tiles on the 12-column board, two rows beside the title tile.
const PAIN_SPANS = ["lg:col-span-4", "lg:col-span-3", "lg:col-span-3", "lg:col-span-4"];

// Page order: strategy + execution and the business case first; the founder's photo and story come
// last, just before the audit form.
export function Home({ t }: { t: Dict }) {
  return (
    <div className="mx-auto max-w-[1480px] p-2">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-night focus:px-4 focus:py-2 focus:text-white">
        {t.skip}
      </a>
      <Header t={t} />
      <Behaviour auditId={t.ids.audit} />

      {/* The header floats over the 3D hero, so the page content starts underneath it. */}
      <main id="main" className="-mt-[73px] flex flex-col gap-2">
        <PlanHero t={t} />

        {/* Problem board */}
        <section className="board" aria-labelledby="problem-title">
          <div className="tile col-span-2 flex flex-col justify-between gap-10 md:col-span-6 lg:col-span-5 lg:row-span-2">
            <h2 id="problem-title" className="display max-w-[12ch] text-[clamp(2.6rem,4.4vw,4.6rem)]">{t.problem.title}</h2>
            <p className="text-[1.3rem] font-semibold tracking-[-0.01em] text-violet">{t.problem.ask}</p>
          </div>
          {t.problem.pains.map((p, i) => (
            <div key={p} className={`tile col-span-2 flex min-h-[170px] flex-col justify-between gap-6 md:col-span-3 ${PAIN_SPANS[i]}`}>
              <svg viewBox="0 0 56 40" width="56" height="40" fill="none" stroke="currentColor" strokeWidth="1.4" className="text-mute" aria-hidden="true">
                {PAIN_ICONS[i]}
              </svg>
              <h3 className="h-tile max-w-[26ch]">{p}</h3>
            </div>
          ))}
          <div className="tile tile-violet col-span-2 flex flex-col justify-end gap-3 md:col-span-6 lg:col-span-12">
            <p className="text-[1.05rem] opacity-75">{t.problem.stance.before}</p>
            <p className="max-w-[46ch] text-[clamp(1.3rem,1.8vw,1.7rem)] font-bold leading-tight tracking-[-0.02em]">{t.problem.stance.after}</p>
          </div>
        </section>

        {/* Services board */}
        <section id={t.ids.services} className="board" aria-labelledby="services-title">
          <div className="tile col-span-2 flex flex-wrap items-end justify-between gap-6 md:col-span-6 lg:col-span-12">
            <h2 id="services-title" className="display h-section">{t.services.title}</h2>
            <div className="flex max-w-[52ch] flex-col items-start gap-3">
              <p className="text-ink-2">{t.services.lead}</p>
              <a href={t.pages.webDesign.href} className="font-semibold text-ink underline decoration-violet decoration-2 underline-offset-4 hover:decoration-ink">{t.pages.webDesign.label} →</a>
            </div>
          </div>
          <Services t={t.services} />
        </section>

        {/* Method board: the game plan as four steps joined by the route line */}
        <section id={t.ids.method} className="board" aria-labelledby="method-title">
          <div className="tile tile-night col-span-2 md:col-span-6 lg:col-span-12">
            <h2 id="method-title" className="display h-section">{t.method.title}</h2>
            <ol className="relative mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
              <span aria-hidden="true" className="absolute left-5 right-5 top-5 hidden h-px bg-[linear-gradient(90deg,var(--color-lime),var(--color-violet))] lg:block" />
              {t.method.steps.map((s, i) => (
                <li key={s.title} className="relative flex flex-col gap-3">
                  <span className={`relative grid h-10 w-10 place-items-center rounded-full border-2 border-lime font-display text-[1.2rem] font-extrabold ${i === 0 ? "bg-lime text-night" : "bg-night text-lime"}`}>{i + 1}</span>
                  <h3 className="mt-3 font-display text-[clamp(1.8rem,2.4vw,2.3rem)] font-extrabold uppercase leading-none">{s.title}</h3>
                  <p className="max-w-[32ch] text-night-mute">{s.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Track record: the brands behind the experience, with a short note on the founder */}
        <section id={t.ids.record} className="board" aria-labelledby="founder-title">
          <div className="tile col-span-2 flex items-center md:col-span-6 lg:col-span-8">
            <LogoCarousel />
          </div>
          <div className="tile col-span-2 flex gap-4 md:col-span-6 lg:col-span-4">
            <Image src="/images/jose-manzanedo.jpg" alt={t.founder.name} width={72} height={72} className="h-[72px] w-[72px] flex-none rounded-full object-cover object-[50%_22%]" />
            <div>
              <span className="tile-label">{t.founder.label}</span>
              <h2 id="founder-title" className="mt-1 text-[1.05rem] font-bold">{t.founder.name}, <span className="font-medium text-mute">{t.founder.role}</span></h2>
              <p className="mt-2 text-[0.92rem] leading-snug text-ink-2">{t.founder.bio}</p>
            </div>
          </div>
        </section>

        {/* FAQ: answers the questions people search for, marked up for Google as FAQPage */}
        <section id={t.ids.faq} className="board" aria-labelledby="faq-title">
          <div className="tile col-span-2 md:col-span-6 lg:col-span-4">
            <h2 id="faq-title" className="display h-section max-w-[10ch]">{t.faq.title}</h2>
          </div>
          <div className="tile col-span-2 !py-2 md:col-span-6 lg:col-span-8">
            {t.faq.items.map((f) => (
              <details key={f.q} className="group border-b border-line last:border-0">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-[1.05rem] font-semibold [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <span aria-hidden="true" className="grid h-8 w-8 flex-none place-items-center rounded-full bg-desk text-[1.2rem] transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="max-w-[62ch] pb-5 text-ink-2">{f.a}</p>
              </details>
            ))}
          </div>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "FAQPage",
                mainEntity: t.faq.items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
              }),
            }}
          />
        </section>

        <AuditSection t={t} />

        {/* Closing: the network from the original faralai.com */}
        <FutureSection t={t} />
      </main>

      <SiteFooter t={t} />
    </div>
  );
}
