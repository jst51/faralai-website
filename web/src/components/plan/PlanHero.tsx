"use client";

import { AnimatePresence, motion } from "motion/react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { Dict } from "@/content/dictionary";
import { sceneAt, STATIONS } from "./timing";

// The homepage hero: a pinned section where scrolling builds the 3D scene, with the text on top.
// Visitors who prefer reduced motion, or whose device has no WebGL, get a still of the finished scene.
const Plan3D = dynamic(() => import("./Plan3D"), { ssr: false });

const EASE = [0.2, 0.7, 0.2, 1] as const;
const STICKY_TOP = 8;

function webglAvailable() {
  try {
    const c = document.createElement("canvas");
    return Boolean(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

function Intro({ t }: { t: Dict }) {
  return (
    <>
      <h1 className="display max-w-[13ch] text-[clamp(3rem,7vw,7rem)]">{t.hero.title}</h1>
      <p className="mt-4 max-w-[46ch] text-[1.02rem] text-night-mute">{t.hero.lead}</p>
      <div className="mt-5 flex flex-wrap gap-2.5">
        <a href={`#${t.ids.audit}`} className="btn btn-lime">{t.hero.primary}</a>
        <a href={`#${t.ids.services}`} className="btn border-night-line text-white hover:border-white">{t.hero.secondary}</a>
      </div>
    </>
  );
}

export function PlanHero({ t }: { t: Dict }) {
  const track = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const progress = useRef(0);
  const [scene, setScene] = useState(-1);
  const [still, setStill] = useState(false);
  const [active, setActive] = useState(true);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !webglAvailable()) setStill(true);
  }, []);

  useEffect(() => {
    if (still) return;
    const onScroll = () => {
      if (!track.current || !stage.current) return;
      const rect = track.current.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, (STICKY_TOP - rect.top) / (rect.height - stage.current.offsetHeight)));
      progress.current = p;
      setScene(sceneAt(p));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    // Stop drawing once the hero has scrolled away.
    const io = new IntersectionObserver(([e]) => setActive(e.isIntersecting), { rootMargin: "120px" });
    if (track.current) io.observe(track.current);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      io.disconnect();
    };
  }, [still]);

  if (still) {
    return (
      <section className="relative h-[calc(100svh-16px)] min-h-[600px] overflow-hidden rounded-tile bg-night text-white">
        <Image src="/images/plan-built.jpg" alt="" fill priority sizes="100vw" className="object-cover object-right md:object-center" />
        <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(14,26,58,.9),rgba(14,26,58,0)_62%)]" />
        <div className="absolute inset-0 hidden bg-[linear-gradient(90deg,rgba(14,26,58,.94)_18%,rgba(14,26,58,0)_62%)] md:block" />
        <div className="absolute bottom-7 left-5 right-5 sm:bottom-9 sm:left-7 sm:right-7">
          <Intro t={t} />
        </div>
      </section>
    );
  }

  const service = scene >= 0 && scene < STATIONS ? t.services.items[scene] : null;

  return (
    <section ref={track} className="relative" style={{ height: "820svh" }}>
      <div ref={stage} className="sticky h-[calc(100svh-16px)] overflow-hidden rounded-tile bg-night text-white" style={{ top: STICKY_TOP }}>
        <div aria-hidden="true">
          <Plan3D progress={progress} active={active} />
        </div>

        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(0deg,rgba(14,26,58,.82),rgba(14,26,58,0)_52%)]" />
        <div className={`pointer-events-none absolute inset-0 hidden bg-[linear-gradient(90deg,rgba(14,26,58,.94)_18%,rgba(14,26,58,0)_62%)] transition-opacity duration-500 md:block ${scene === -1 ? "opacity-100" : "opacity-0"}`} />

        <div className="absolute bottom-7 left-5 right-5 sm:bottom-9 sm:left-7 sm:right-7">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={scene}
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.32, ease: EASE }}
            >
              {scene === -1 && (
                <>
                  <Intro t={t} />
                  <p className="mt-4 text-[0.95rem] font-semibold text-lime">{t.plan.hint}</p>
                </>
              )}
              {service && (
                <>
                  <span className={`inline-block rounded-full px-3 py-1 text-[0.8rem] font-bold ${service.kind === "strategy" ? "bg-lime text-night" : "bg-violet text-violet-ink"}`}>
                    {t.services.kinds[service.kind as keyof typeof t.services.kinds]}
                  </span>
                  <p className="display mt-3 max-w-[14ch] text-[clamp(2.6rem,5.6vw,5.6rem)]">{service.title}</p>
                  <p className="mt-3 max-w-[42ch] text-[1.02rem] text-night-mute">{service.summary}</p>
                </>
              )}
              {scene === STATIONS && (
                <>
                  <p className="display text-[clamp(2.8rem,6vw,6rem)]">
                    {t.plan.end[0]} <span className="text-lime">+</span> {t.plan.end[1]}
                  </p>
                  <p className="mt-3 max-w-[42ch] text-[1.02rem] text-night-mute">{t.hero.pair.join}</p>
                  <a href={`#${t.ids.audit}`} className="btn btn-lime mt-5">{t.hero.primary}</a>
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="absolute bottom-9 right-7 hidden gap-1 md:flex" aria-hidden="true">
          {Array.from({ length: STATIONS }, (_, i) => (
            <span key={i} className={`h-1 w-6 rounded-full ${i <= scene ? (i < 4 ? "bg-lime" : "bg-violet") : "bg-white/20"} ${i === 4 ? "ml-2" : ""}`} />
          ))}
        </div>
      </div>
    </section>
  );
}
