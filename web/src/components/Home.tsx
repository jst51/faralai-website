import Image from "next/image";
import type { Dict } from "@/content/dictionary";
import { AuditForm } from "./AuditForm";
import { Behaviour } from "./Behaviour";
import { Header } from "./Header";
import { LegalLinks } from "./legal/LegalPage";
import { LogoCarousel } from "./LogoCarousel";
import { Mark } from "./Mark";
import { PlanHero } from "./plan/PlanHero";
import { Playbook } from "./Playbook";
import { Services } from "./Services";

// Line drawings for the five "sound familiar?" tiles, in the order of t.problem.pains.
const PAIN_ICONS = [
  <g key="0"><circle cx="28" cy="20" r="3" /><circle cx="28" cy="20" r="10" strokeDasharray="2 3" /><circle cx="28" cy="20" r="18" strokeDasharray="1.5 4" opacity=".6" /></g>,
  <g key="1"><path d="M4 36h48M10 36V22M20 36V12M30 36V26M40 36V16" /><path d="M46 8a4 4 0 1 1 4 4v3" /></g>,
  <g key="2"><path d="M8 6h20l20 20-14 12L8 18z" /><circle cx="17" cy="14" r="3" /></g>,
  <g key="3"><path d="M4 4h28v16H16l-6 6v-6H4z" /><path d="M24 20h28v14h-6v6l-6-6H24z" strokeDasharray="3 3" /></g>,
  <g key="4"><path d="M4 34c8 0 7-12 15-12s6 9 13 5 2-16 11-18 9 12 9 4" strokeDasharray="3 3" /><circle cx="4" cy="34" r="2" fill="currentColor" /></g>,
];

// Placement of the pain tiles on the 12-column board, alongside the title tile.
const PAIN_SPANS = ["lg:col-span-4", "lg:col-span-3", "lg:col-span-3", "lg:col-span-4", "lg:col-span-5"];

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

        {/* Strategy + execution side by side */}
        <section className="board" aria-label={t.services.title}>
          <div className="tile tile-night col-span-2 md:col-span-3 lg:col-span-6">
            <h2 className="display text-[clamp(2.4rem,3.6vw,3.6rem)] text-lime">{t.hero.pair.strategy.title}</h2>
            <ul className="mt-5 grid gap-x-6 sm:grid-cols-2">
              {t.hero.pair.strategy.items.map((x) => (
                <li key={x} className="border-t border-night-line py-2.5 text-[1.02rem]">{x}</li>
              ))}
            </ul>
          </div>

          <div className="tile tile-lime relative col-span-2 !overflow-visible md:col-span-3 lg:col-span-6">
            <span aria-hidden="true" className="display absolute -left-[26px] top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-paper text-[2rem] leading-none text-night lg:grid">+</span>
            <h2 className="display text-[clamp(2.4rem,3.6vw,3.6rem)]">{t.hero.pair.execution.title}</h2>
            <ul className="mt-5 grid gap-x-6 sm:grid-cols-2">
              {t.hero.pair.execution.items.map((x) => (
                <li key={x} className="border-t border-ink/15 py-2.5 text-[1.02rem] font-medium">{x}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* Problem board */}
        <section className="board" aria-labelledby="problem-title">
          <div className="tile col-span-2 flex flex-col justify-between gap-10 md:col-span-6 lg:col-span-5 lg:row-span-2">
            <h2 id="problem-title" className="display max-w-[17ch] text-[clamp(2.2rem,3.4vw,3.5rem)]">{t.problem.title}</h2>
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
          <div className="tile tile-violet col-span-2 flex flex-col justify-end gap-3 md:col-span-6 lg:col-span-7">
            <p className="text-[1.05rem] opacity-75">{t.problem.stance.before}</p>
            <p className="max-w-[34ch] text-[clamp(1.4rem,2.1vw,1.9rem)] font-bold leading-tight tracking-[-0.02em]">{t.problem.stance.after}</p>
          </div>
        </section>

        {/* Services board */}
        <section id={t.ids.services} className="board" aria-labelledby="services-title">
          <div className="tile col-span-2 flex flex-wrap items-end justify-between gap-6 md:col-span-6 lg:col-span-12">
            <h2 id="services-title" className="display h-section">{t.services.title}</h2>
            <p className="max-w-[52ch] text-ink-2">{t.services.lead}</p>
          </div>
          <Services t={t.services} />
        </section>

        {/* Playbook board: pick a goal and see the route from strategy to execution */}
        <section className="board" aria-labelledby="play-title">
          <div className="tile col-span-2 flex flex-col justify-between gap-6 md:col-span-6 lg:col-span-4">
            <h2 id="play-title" className="display h-section max-w-[10ch]">{t.play.title}</h2>
            <p className="max-w-[40ch] text-ink-2">{t.play.lead}</p>
          </div>
          <div className="tile tile-night col-span-2 min-h-[420px] md:col-span-6 lg:col-span-8">
            <Playbook t={t.play} />
          </div>
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

        {/* Founder and track record board, deliberately last before the audit */}
        <section id={t.ids.record} className="board" aria-labelledby="founder-title">
          <figure className="tile col-span-2 m-0 min-h-[420px] !p-0 md:col-span-3 lg:col-span-4">
            <Image src="/images/jose-manzanedo.jpg" alt={t.founder.name} fill sizes="(min-width:1100px) 33vw, 100vw" className="object-cover object-[50%_22%]" />
          </figure>
          <div className="tile col-span-2 md:col-span-3 lg:col-span-8">
            <span className="tile-label">{t.founder.label}</span>
            <h2 id="founder-title" className="display h-section mt-3">{t.founder.name}</h2>
            <p className="mt-2 font-medium text-mute">{t.founder.role}</p>
            <p className="mt-6 max-w-[34ch] text-[clamp(1.3rem,1.9vw,1.7rem)] font-semibold leading-snug tracking-[-0.015em]">{t.founder.intro}</p>
            <div className="mt-5 grid gap-4 text-ink-2 lg:grid-cols-2">
              {t.founder.bio.map((p) => <p key={p}>{p}</p>)}
            </div>
          </div>
          <div className="tile col-span-2 md:col-span-6 lg:col-span-12">
            <LogoCarousel />
          </div>
        </section>

        {/* Audit board */}
        <section id={t.ids.audit} className="board" aria-labelledby="audit-title">
          <div className="tile tile-night col-span-2 flex flex-col gap-6 md:col-span-6 lg:col-span-5">
            <h2 id="audit-title" className="display h-section max-w-[12ch]">{t.audit.title}</h2>
            <p className="max-w-[46ch] text-night-mute">{t.audit.lead}</p>
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
      </main>

      <footer className="board mt-2">
        <div className="tile col-span-2 flex flex-col gap-4 md:col-span-6 lg:col-span-6">
          <a href={t.nav.home} className="flex w-fit items-center gap-2.5 text-[1.2rem] font-extrabold tracking-[-0.02em] no-underline">
            <Mark size={32} /> Faralai
          </a>
          <p className="max-w-[40ch] text-ink-2">{t.footer.about}</p>
        </div>
        <div className="tile col-span-1 md:col-span-3 lg:col-span-3">
          <ul className="flex flex-col gap-2 text-ink-2">
            {t.nav.links.map((l) => <li key={l.href}><a href={l.href} className="no-underline hover:text-ink">{l.label}</a></li>)}
            <li><a href={`#${t.ids.audit}`} className="no-underline hover:text-ink">{t.nav.cta}</a></li>
          </ul>
        </div>
        <div className="tile col-span-1 md:col-span-3 lg:col-span-3">
          <ul className="flex flex-col gap-2 text-ink-2">
            <li><a href="mailto:info@faralai.com" className="no-underline hover:text-ink">info@faralai.com</a></li>
            <li>{t.footer.place}</li>
            <li><a href="https://www.instagram.com/faralai/" rel="noopener" className="no-underline hover:text-ink">Instagram</a></li>
            <li><a href={t.nav.other.href} data-lang-switch={t.nav.other.label.toLowerCase()} lang={t.nav.other.label.toLowerCase()} className="no-underline hover:text-ink">{t.nav.other.name}</a></li>
          </ul>
        </div>
        <div className="col-span-2 flex flex-col gap-1.5 px-2 py-3 text-[0.8rem] text-mute md:col-span-6 lg:col-span-12">
          <div className="flex flex-wrap justify-between gap-3">
            <p>{t.footer.rights}</p>
            <LegalLinks t={t.legal} />
          </div>
        </div>
      </footer>
    </div>
  );
}
