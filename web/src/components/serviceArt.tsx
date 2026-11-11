import type { ReactNode } from "react";

// Line drawings for the six website types, in the order of c.types.items.
export const WEB_ICONS: ReactNode[] = [
  // Corporate website: a page with a header block and columns.
  <g key="0"><rect x="6" y="4" width="44" height="32" rx="3" /><path d="M6 11h44" /><rect x="11" y="16" width="16" height="9" rx="1.5" /><path d="M31 17h14M31 21h10M11 30h34" /></g>,
  // Landing page: one page, one button.
  <g key="1"><rect x="14" y="2" width="28" height="36" rx="3" /><path d="M19 9h18M21 14h14" /><rect x="20" y="22" width="16" height="6" rx="3" /></g>,
  // Online shop: a bag.
  <g key="2"><path d="M12 14h32l-3 22H15z" /><path d="M21 14v-3a7 7 0 0 1 14 0v3" /></g>,
  // Multilingual: two speech bubbles.
  <g key="3"><path d="M6 6h26v16H16l-6 5v-5H6z" /><path d="M36 14h14v15h-4v5l-6-5H24v-3" /></g>,
  // Redesign: circular arrows around a frame.
  <g key="4"><rect x="19" y="13" width="18" height="14" rx="2" /><path d="M10 20a18 18 0 0 1 31-12l3 3M46 20a18 18 0 0 1-31 12l-3-3" /><path d="M44 5v6h-6M12 35v-6h6" /></g>,
  // SEO: a magnifier over a map pin.
  <g key="5"><circle cx="24" cy="18" r="13" /><path d="M33.5 27.5L46 38" /><path d="M24 25s-6-5.5-6-9.5a6 6 0 0 1 12 0c0 4-6 9.5-6 9.5z" /><circle cx="24" cy="15.5" r="1.6" /></g>,
];

// Hero illustration: a browser window floating over the network, the site live in several languages.
export const WEB_VISUAL = (
  <>
    <div className="relative w-full max-w-[420px] -rotate-2 rounded-[12px] bg-paper text-ink shadow-[0_30px_60px_-20px_rgba(0,0,0,.6)]">
      <div className="flex items-center gap-1.5 border-b border-line px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-line" />
        <span className="h-2.5 w-2.5 rounded-full bg-line" />
        <span className="h-2.5 w-2.5 rounded-full bg-line" />
        <span className="ml-3 flex-1 truncate rounded-md bg-desk px-3 py-1 text-[0.72rem] text-mute">tuempresa.com</span>
      </div>
      <div className="flex flex-col gap-3 p-5">
        <div className="flex gap-1.5 text-[0.7rem] font-bold">
          {["ES", "EN", "DE", "FR"].map((l, i) => (
            <span key={l} className={`rounded-md px-2 py-1 ${i === 1 ? "bg-night text-white" : "bg-desk text-mute"}`}>{l}</span>
          ))}
        </div>
        <div className="h-3 w-3/4 rounded bg-ink" />
        <div className="h-3 w-1/2 rounded bg-ink" />
        <div className="h-2 w-full rounded bg-line" />
        <div className="h-2 w-5/6 rounded bg-line" />
        <div className="mt-1 h-8 w-32 rounded-md bg-lime" />
        <div className="mt-2 grid grid-cols-3 gap-2">
          <div className="h-14 rounded-md bg-desk" />
          <div className="h-14 rounded-md bg-violet/40" />
          <div className="h-14 rounded-md bg-desk" />
        </div>
      </div>
    </div>
    <div className="absolute bottom-6 right-6 rotate-3 rounded-[10px] bg-lime px-3 py-2 text-[0.8rem] font-bold text-night shadow-lg">
      Google · Marbella
    </div>
  </>
);

// Line drawings for the six marketing services, in the order of the marketing page's types.items.
export const MARKETING_ICONS: ReactNode[] = [
  // Strategy: a route between two points with a flag.
  <g key="0"><circle cx="10" cy="32" r="4" /><path d="M14 30c10-4 6-14 16-16s10 4 14-2" strokeDasharray="2.5 2.5" /><path d="M44 4v12M44 4h8l-2.5 3 2.5 3h-8" /></g>,
  // Social media: a phone with a heart and a speech bubble.
  <g key="1"><rect x="16" y="2" width="22" height="36" rx="3" /><path d="M24 34h6" /><path d="M27 21s-5-3-5-6.2a2.6 2.6 0 0 1 5-1 2.6 2.6 0 0 1 5 1C32 18 27 21 27 21z" /><path d="M42 8h10v8h-4l-3 3v-3h-3z" /></g>,
  // Online advertising: a cursor clicking a button.
  <g key="2"><rect x="4" y="8" width="34" height="14" rx="7" /><path d="M14 15h14" /><path d="M36 20l12 5-5 2-2 5z" /></g>,
  // SEO: a results list with the first result highlighted.
  <g key="3"><rect x="6" y="4" width="44" height="10" rx="2" /><path d="M10 9h20" /><path d="M10 21h26M10 26h18M10 32h24M10 37h14" /></g>,
  // Content and graphic design: a picture frame and a pen.
  <g key="4"><rect x="4" y="6" width="32" height="26" rx="2" /><path d="M4 26l9-8 7 6 5-4 11 9" /><circle cx="27" cy="13" r="2.5" /><path d="M40 34l10-24 3 1.5-10 24-4 2z" /></g>,
  // Analytics: bars with a rising line.
  <g key="5"><path d="M4 36h48" /><path d="M10 36V26M20 36V20M30 36V22M40 36V12" /><path d="M8 20l12-8 10 4 14-12" /><path d="M38 4h6v6" /></g>,
];

// Hero illustration: a campaign panel, one plan across every channel, with leads trending up.
const CHANNELS = [
  { name: "Google Ads", dot: "bg-lime", w: "w-[82%]" },
  { name: "Instagram", dot: "bg-violet", w: "w-[64%]" },
  { name: "LinkedIn", dot: "bg-night", w: "w-[48%]" },
  { name: "SEO", dot: "bg-lime", w: "w-[70%]" },
];

export function marketingVisual(labels: { panel: string; leads: string; badge: string }) {
  return (
    <>
      <div className="relative w-full max-w-[420px] rotate-2 rounded-[12px] bg-paper p-5 text-ink shadow-[0_30px_60px_-20px_rgba(0,0,0,.6)]">
        <div className="flex items-center justify-between">
          <span className="text-[0.8rem] font-bold">{labels.panel}</span>
          <span className="flex gap-1">
            <span className="h-2 w-2 rounded-full bg-line" />
            <span className="h-2 w-2 rounded-full bg-line" />
          </span>
        </div>
        <div className="mt-4 rounded-[10px] bg-desk p-3">
          <span className="text-[0.7rem] font-semibold text-mute">{labels.leads}</span>
          <svg viewBox="0 0 200 64" className="mt-1 h-16 w-full" fill="none">
            <path d="M0 56 L28 50 L56 52 L84 40 L112 42 L140 28 L168 22 L200 8 L200 64 L0 64 Z" fill="#c8f02c" opacity=".35" />
            <path d="M0 56 L28 50 L56 52 L84 40 L112 42 L140 28 L168 22 L200 8" stroke="#0e1a3a" strokeWidth="2.2" strokeLinejoin="round" />
            <circle cx="200" cy="8" r="3.5" fill="#0e1a3a" />
          </svg>
        </div>
        <ul className="mt-4 flex flex-col gap-2.5">
          {CHANNELS.map((c) => (
            <li key={c.name} className="grid grid-cols-[96px_1fr] items-center gap-3 text-[0.75rem] font-semibold">
              <span className="flex items-center gap-2"><span className={`h-2.5 w-2.5 rounded-full ${c.dot}`} />{c.name}</span>
              <span className="h-2 rounded-full bg-desk"><span className={`block h-2 rounded-full bg-violet/60 ${c.w}`} /></span>
            </li>
          ))}
        </ul>
      </div>
      <div className="absolute bottom-6 left-6 hidden -rotate-3 rounded-[10px] sm:block bg-lime px-3 py-2 text-[0.8rem] font-bold text-night shadow-lg">
        {labels.badge}
      </div>
    </>
  );
}
