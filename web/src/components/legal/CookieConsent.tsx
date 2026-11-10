"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import type { Dict } from "@/content/dictionary";

// Cookie banner and Google Analytics. Analytics only loads after the visitor accepts; accept and
// reject carry the same weight, as the Spanish regulator (AEPD) requires.

const GA_ID = "G-5Z6D130GKW";
const KEY = "faralai-consent";
const VERSION = 1; // Raise this when the cookie policy changes, so visitors are asked again.
const MAX_AGE_MS = 730 * 24 * 60 * 60 * 1000;
const SETTINGS_EVENT = "faralai:cookie-settings";

type Choice = "granted" | "denied";

function readChoice(): Choice | null {
  try {
    const saved = JSON.parse(localStorage.getItem(KEY) ?? "null");
    if (saved?.v === VERSION && Date.now() - saved.at < MAX_AGE_MS) return saved.choice;
  } catch {}
  return null;
}

function clearAnalyticsCookies() {
  const host = location.hostname;
  const domains = ["", `;domain=${host}`, `;domain=.${host.replace(/^www\./, "")}`];
  document.cookie.split(";").map((c) => c.split("=")[0].trim()).filter((n) => n.startsWith("_ga") || n.startsWith("_gcl")).forEach((name) => {
    domains.forEach((d) => {
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/${d}`;
    });
  });
}

export function CookieConsent({ t }: { t: Dict["legal"] }) {
  const [choice, setChoice] = useState<Choice | null>(null);
  const [ready, setReady] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setChoice(readChoice());
    setReady(true);
    const reopen = () => setOpen(true);
    window.addEventListener(SETTINGS_EVENT, reopen);
    return () => window.removeEventListener(SETTINGS_EVENT, reopen);
  }, []);

  function save(next: Choice) {
    try {
      localStorage.setItem(KEY, JSON.stringify({ v: VERSION, choice: next, at: Date.now() }));
    } catch {}
    const revoked = choice === "granted" && next === "denied";
    setChoice(next);
    setOpen(false);
    if (revoked) {
      // Silence Analytics first, or it writes its cookies back before the page reloads.
      (window as unknown as Record<string, boolean>)[`ga-disable-${GA_ID}`] = true;
      clearAnalyticsCookies();
      location.reload(); // Analytics is already running on this page; a reload stops it.
    }
  }

  return (
    <>
      {choice === "granted" && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
          <Script id="ga" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'granted'});gtag('js',new Date());gtag('config','${GA_ID}');`}
          </Script>
        </>
      )}
      {ready && (choice === null || open) && (
        <div role="dialog" aria-label={t.banner.title} className="tile fixed bottom-2 left-2 right-2 z-[60] shadow-[0_24px_60px_-20px_rgba(14,26,58,.55)] sm:left-auto sm:w-[430px]">
          <p className="font-bold">{t.banner.title}</p>
          <p className="mt-1.5 text-[0.92rem] leading-snug text-ink-2">
            {t.banner.text} <a href={t.links.cookies.href} className="underline underline-offset-2">{t.banner.more}</a>
          </p>
          <div className="mt-4 grid grid-cols-2 gap-2">
            <button type="button" onClick={() => save("denied")} className="btn btn-ink">{t.banner.reject}</button>
            <button type="button" onClick={() => save("granted")} className="btn btn-ink">{t.banner.accept}</button>
          </div>
        </div>
      )}
    </>
  );
}

export function CookieSettingsButton({ label }: { label: string }) {
  return (
    <button type="button" onClick={() => window.dispatchEvent(new Event(SETTINGS_EVENT))} className="cursor-pointer underline-offset-2 hover:text-ink">
      {label}
    </button>
  );
}
