import type { Dict } from "@/content/dictionary";
import { NetworkCanvas } from "./NetworkCanvas";

// Closing section: the original faralai.com particle network on night blue behind a last call to action.
export function FutureSection({ t }: { t: Dict }) {
  return (
    <section aria-labelledby="future-title" className="relative min-h-[78svh] overflow-hidden rounded-tile bg-night text-white">
      <NetworkCanvas theme="dark" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(14,26,58,.85)_25%,rgba(14,26,58,0)_70%)]" />
      <div className="pointer-events-none relative flex min-h-[78svh] max-w-[680px] flex-col justify-center gap-6 p-6 sm:p-10 lg:p-14">
        <h2 id="future-title" className="display text-[clamp(2.3rem,7vw,6.4rem)]">{t.future.title}</h2>
        <p className="max-w-[48ch] text-[1.08rem] text-night-mute">{t.future.lead}</p>
        <div className="pointer-events-auto flex flex-wrap gap-2.5">
          <a href={`#${t.ids.audit}`} className="btn btn-lime">{t.future.primary}</a>
          <a href={`#${t.ids.method}`} className="btn border-night-line text-white hover:border-white">{t.future.secondary}</a>
        </div>
      </div>
    </section>
  );
}
