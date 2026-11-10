"use client";

import { useState, type FormEvent } from "react";
import type { Dict } from "@/content/dictionary";
import { track } from "@/lib/track";

// Sends to the same Formspree form the current site uses, so requests keep landing in the same inbox.
const ENDPOINT = "https://formspree.io/f/xreydpzb";

type Status = "idle" | "sending" | "ok" | "err";

export function AuditForm({ t, locale }: { t: Dict["audit"]["form"]; locale: string }) {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.reportValidity()) return;
    setStatus("sending");
    try {
      const res = await fetch(ENDPOINT, { method: "POST", body: new FormData(form), headers: { Accept: "application/json" } });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("ok");
      track("generate_lead", { form: "audit", page: location.pathname });
      form.reset();
    } catch {
      setStatus("err");
    }
  }

  const message = status === "sending" ? t.sending : status === "ok" ? t.ok : status === "err" ? t.err : "";

  return (
    <form onSubmit={onSubmit} action={ENDPOINT} method="POST" className="grid gap-x-4 gap-y-5 sm:grid-cols-2">
      <input type="hidden" name="_subject" value={t.subject} />
      <input type="hidden" name="idioma" value={locale} />
      <input type="hidden" name="origen" value={t.origin} />

      <div className="field">
        <label htmlFor="f-name">{t.name}*</label>
        <input id="f-name" name="nombre" autoComplete="name" required />
      </div>
      <div className="field">
        <label htmlFor="f-company">{t.company}*</label>
        <input id="f-company" name="empresa" autoComplete="organization" required />
      </div>
      <div className="field">
        <label htmlFor="f-email">{t.email}*</label>
        <input id="f-email" name="email" type="email" autoComplete="email" required />
      </div>
      <div className="field">
        <label htmlFor="f-phone">{t.phone}</label>
        <input id="f-phone" name="telefono" type="tel" autoComplete="tel" />
      </div>
      <div className="field sm:col-span-2">
        <label htmlFor="f-web">{t.web}</label>
        <input id="f-web" name="web" placeholder={t.webPlaceholder} />
      </div>
      <div className="field">
        <label htmlFor="f-sector">{t.sector}*</label>
        <select id="f-sector" name="sector" required defaultValue="">
          <option value="" disabled>{t.choose}</option>
          {t.sectors.map((s) => <option key={s}>{s}</option>)}
        </select>
      </div>
      <div className="field">
        <label htmlFor="f-need">{t.need}*</label>
        <select id="f-need" name="necesidad" required defaultValue="">
          <option value="" disabled>{t.choose}</option>
          {t.needs.map((s) => <option key={s}>{s}</option>)}
        </select>
      </div>

      <label htmlFor="f-consent" className="flex items-start gap-3 text-[0.88rem] leading-normal text-ink-2 sm:col-span-2">
        <input id="f-consent" type="checkbox" name="consentimiento" value="si" required className="mt-0.5 h-[18px] w-[18px] flex-none accent-violet" />
        <span>
          {t.consent.before}
          <a href={t.consent.href} className="underline underline-offset-2">{t.consent.link}</a>
          {t.consent.after}
        </span>
      </label>
      <p className="text-[0.78rem] leading-snug text-mute sm:col-span-2">{t.info}</p>

      <div className="flex flex-wrap items-center gap-x-5 gap-y-3 sm:col-span-2">
        <button type="submit" disabled={status === "sending"} className="btn btn-ink disabled:opacity-60">
          {t.submit}
        </button>
        <span className="text-[0.88rem] text-mute">{t.note}</span>
      </div>

      <p role="status" aria-live="polite" className={`min-h-6 font-medium sm:col-span-2 ${status === "ok" ? "text-[#2f7a3a]" : status === "err" ? "text-[#b4372b]" : "text-ink-2"}`}>
        {message}
      </p>
    </form>
  );
}
