import type { Dict } from "@/content/dictionary";
import type { ServiceCopy } from "@/content/webDesign";
import type { ReactNode } from "react";
import { SITE_URL } from "@/lib/site";
import { AuditSection } from "./AuditSection";
import { Behaviour } from "./Behaviour";
import { Header } from "./Header";
import { NetworkCanvas } from "./NetworkCanvas";
import { SiteFooter } from "./SiteFooter";

function Check({ dark = false }: { dark?: boolean }) {
  return (
    <span aria-hidden="true" className={`mt-[3px] grid h-5 w-5 flex-none place-items-center rounded-full ${dark ? "bg-night" : "bg-lime"}`}>
      <svg viewBox="0 0 20 20" width="20" height="20"><path d="M6 10.5l2.6 2.5L14 7.5" fill="none" stroke={dark ? "#c8f02c" : "#0e1a3a"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
    </span>
  );
}

// A service landing page (web design, marketing agency...): same board, header and footer as the home
// page. Each page brings its copy, six line icons for its service tiles and a hero illustration.
export function ServicePage({ t, c, icons, visual }: { t: Dict; c: ServiceCopy; icons: ReactNode[]; visual: ReactNode }) {
  const url = `${SITE_URL}${c.path}`;
  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: c.hero.title,
      serviceType: c.hero.title,
      description: c.meta.description,
      url,
      provider: { "@type": "ProfessionalService", name: "Faralai", url: `${SITE_URL}${t.nav.home}` },
      areaServed: [
        { "@type": "City", name: "Marbella" },
        { "@type": "City", name: "Málaga" },
        { "@type": "Place", name: "Costa del Sol" },
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: c.types.title,
        itemListElement: c.types.items.map((x) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: x.title, description: x.text } })),
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: c.crumbs.home, item: `${SITE_URL}${t.nav.home}` },
        { "@type": "ListItem", position: 2, name: c.crumbs.here, item: url },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: c.faq.items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    },
  ];

  return (
    <div className="mx-auto max-w-[1480px] p-2">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-night focus:px-4 focus:py-2 focus:text-white">
        {t.skip}
      </a>
      <Header t={t} base={t.nav.home} otherHref={c.other} />
      <Behaviour auditId={t.ids.audit} />

      <main id="main" className="mt-2 flex flex-col gap-2">
        {/* Hero */}
        <section className="board" aria-labelledby="page-title">
          <div className="tile col-span-2 flex flex-col gap-6 md:col-span-6 lg:col-span-7 lg:min-h-[640px] lg:justify-between">
            <nav aria-label="Breadcrumb" className="text-[0.86rem] font-medium text-mute">
              <ol className="flex flex-wrap gap-2">
                <li><a href={t.nav.home} className="no-underline hover:text-ink">{c.crumbs.home}</a></li>
                <li aria-hidden="true">/</li>
                <li aria-current="page" className="text-ink">{c.crumbs.here}</li>
              </ol>
            </nav>
            <div className="flex flex-col gap-5">
              <span className="tile-label">{c.hero.label}</span>
              <h1 id="page-title" className="display h-hero max-w-[11ch]">{c.hero.title}</h1>
              <p className="text-[clamp(1.3rem,1.9vw,1.75rem)] font-bold leading-tight tracking-[-0.02em] text-violet">{c.hero.sub}</p>
              <p className="max-w-[54ch] text-[1.08rem] text-ink-2">{c.hero.lead}</p>
              <div className="flex flex-wrap gap-2.5">
                <a href={`#${t.ids.audit}`} className="btn btn-ink">{c.hero.primary}</a>
                <a href="#incluye" className="btn btn-line">{c.hero.secondary}</a>
              </div>
            </div>
            <ul className="flex flex-wrap gap-2" aria-label={c.hero.label}>
              {c.hero.chips.map((x) => <li key={x} className="chip">{x}</li>)}
            </ul>
          </div>

          {/* The page's own illustration over the network */}
          <div aria-hidden="true" className="tile tile-night relative col-span-2 grid min-h-[360px] place-items-center !p-6 md:col-span-6 lg:col-span-5">
            <NetworkCanvas theme="dark" />
            {visual}
          </div>
        </section>

        {/* Why */}
        <section className="board" aria-labelledby="why-title">
          <div className="tile col-span-2 md:col-span-6 lg:col-span-5">
            <h2 id="why-title" className="display h-section max-w-[13ch]">{c.why.title}</h2>
          </div>
          <div className="tile col-span-2 flex flex-col justify-end gap-4 md:col-span-6 lg:col-span-7">
            {c.why.p.map((x) => <p key={x} className="max-w-[60ch] text-[1.08rem] text-ink-2">{x}</p>)}
          </div>
        </section>

        {/* Types of website */}
        <section className="board" aria-labelledby="types-title">
          <div className="tile col-span-2 md:col-span-6 lg:col-span-12">
            <h2 id="types-title" className="display h-section">{c.types.title}</h2>
          </div>
          {c.types.items.map((x, i) => (
            <article key={x.title} className="tile col-span-2 flex min-h-[220px] flex-col gap-4 md:col-span-3 lg:col-span-4">
              <svg viewBox="0 0 56 40" width="56" height="40" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" className="text-violet" aria-hidden="true">
                {icons[i]}
              </svg>
              <h3 className="h-tile mt-auto">{x.title}</h3>
              <p className="max-w-[40ch] text-ink-2">{x.text}</p>
            </article>
          ))}
        </section>

        {/* What's included */}
        <section id="incluye" className="board" aria-labelledby="includes-title">
          <div className="tile tile-lime col-span-2 flex flex-col gap-4 md:col-span-6 lg:col-span-5">
            <h2 id="includes-title" className="display h-section max-w-[11ch]">{c.includes.title}</h2>
            <p className="max-w-[40ch] text-[1.05rem]">{c.includes.lead}</p>
          </div>
          <div className="tile col-span-2 md:col-span-6 lg:col-span-7">
            <ul className="grid gap-x-8 sm:grid-cols-2">
              {c.includes.items.map((x) => (
                <li key={x} className="flex items-start gap-3 border-b border-line py-3">
                  <Check />
                  {x}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Process */}
        <section className="board" aria-labelledby="process-title">
          <div className="tile tile-night col-span-2 md:col-span-6 lg:col-span-12">
            <h2 id="process-title" className="display h-section">{c.process.title}</h2>
            <ol className="relative mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
              <span aria-hidden="true" className="absolute left-5 right-5 top-5 hidden h-px bg-[linear-gradient(90deg,var(--color-lime),var(--color-violet))] lg:block" />
              {c.process.steps.map((s, i) => (
                <li key={s.title} className="relative flex flex-col gap-3">
                  <span className={`relative grid h-10 w-10 place-items-center rounded-full border-2 border-lime font-display text-[1.2rem] font-extrabold ${i === 0 ? "bg-lime text-night" : "bg-night text-lime"}`}>{i + 1}</span>
                  <h3 className="mt-3 font-display text-[clamp(1.8rem,2.4vw,2.3rem)] font-extrabold uppercase leading-none">{s.title}</h3>
                  <p className="max-w-[32ch] text-night-mute">{s.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Local */}
        <section className="board" aria-labelledby="local-title">
          <div className="tile col-span-2 flex flex-col gap-5 md:col-span-6 lg:col-span-8">
            <h2 id="local-title" className="display h-section max-w-[16ch]">{c.local.title}</h2>
            {c.local.p.map((x) => <p key={x} className="max-w-[64ch] text-[1.08rem] text-ink-2">{x}</p>)}
          </div>
          <div className="tile tile-violet col-span-2 flex flex-col justify-between gap-6 md:col-span-6 lg:col-span-4">
            <p className="text-[clamp(1.2rem,1.6vw,1.5rem)] font-bold leading-tight tracking-[-0.02em]">{c.local.more.before}</p>
            <a href={`${t.nav.home}#${t.ids.services}`} className="btn btn-ink w-fit">{c.local.more.link} →</a>
          </div>
        </section>

        {/* FAQ */}
        <section className="board" aria-labelledby="faq-title">
          <div className="tile col-span-2 md:col-span-6 lg:col-span-4">
            <h2 id="faq-title" className="display h-section max-w-[10ch]">{c.faq.title}</h2>
          </div>
          <div className="tile col-span-2 !py-2 md:col-span-6 lg:col-span-8">
            {c.faq.items.map((f) => (
              <details key={f.q} className="group border-b border-line last:border-0">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-[1.05rem] font-semibold [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <span aria-hidden="true" className="grid h-8 w-8 flex-none place-items-center rounded-full bg-desk text-[1.2rem] transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="max-w-[62ch] pb-5 text-ink-2">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        <AuditSection t={t} title={c.audit.title} lead={c.audit.lead} />
      </main>

      <SiteFooter t={t} base={t.nav.home} otherHref={c.other} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </div>
  );
}
