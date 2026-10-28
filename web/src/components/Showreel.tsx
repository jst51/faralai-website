"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState, type ReactNode } from "react";
import type { Dict } from "@/content/dictionary";
import { Mark } from "./Mark";

// The hero showreel: a looping sequence of flat brand graphics and the work Faralai does, built from code rather than a video file so it stays sharp, light and bilingual.
// Every scene is one flat colour field with geometric shapes and one big word.
// It pauses on request, when the tab is hidden, and starts paused for reduced motion.

const SCENE_MS = 2800;
const EASE = [0.2, 0.7, 0.2, 1] as const;
const SPRING = { type: "spring", stiffness: 150, damping: 15 } as const;

type Scene = { id: string; caption: string; body: ReactNode };

function Word({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <motion.p
      initial={{ y: "40%", opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.25, duration: 0.6, ease: EASE }}
      className={`display text-[clamp(2.8rem,6.4vw,6.6rem)] ${className}`}
    >
      {children}
    </motion.p>
  );
}

const TOP_WORD = "absolute left-6 right-6 top-6 sm:left-8 sm:top-8";
const BOTTOM_WORD = "absolute bottom-16 left-6 right-6 sm:left-8";

// Marbella drawn flat: the sun, the Sierra Blanca peaks with their pale cap, and the sea.
// Used by the opening scene, a social post and the website mockup.
function MarbellaArt({ className = "", delay = 0 }: { className?: string; delay?: number }) {
  return (
    <svg viewBox="0 0 400 300" className={className} preserveAspectRatio="xMidYMax meet" aria-hidden="true">
      <motion.circle cx="292" cy="112" r="58" fill="var(--color-lime)" initial={{ y: 90, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: delay + 0.1, duration: 0.9, ease: EASE }} />
      <motion.g style={{ transformOrigin: "200px 250px" }} initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ delay: delay + 0.3, duration: 0.8, ease: EASE }}>
        <polygon points="0,250 110,120 175,180 255,82 400,250" fill="var(--color-night)" />
        <polygon points="232,110 255,82 280,112 266,104 256,118 245,104" fill="#fff" />
      </motion.g>
      {[0, 1, 2].map((i) => (
        <motion.rect
          key={i}
          x="0"
          y={256 + i * 15}
          height="8"
          rx="4"
          width={[400, 320, 220][i]}
          fill="var(--color-violet)"
          initial={{ x: -420 }}
          animate={{ x: 0 }}
          transition={{ delay: delay + 0.55 + i * 0.12, duration: 0.7, ease: EASE }}
        />
      ))}
    </svg>
  );
}

function MarbellaScene({ word }: { word: string }) {
  return (
    <div className="absolute inset-0 bg-paper text-night">
      <div className={TOP_WORD}>
        <Word>{word}</Word>
      </div>
      <MarbellaArt className="absolute inset-x-0 bottom-12 h-[62%] w-full" />
    </div>
  );
}

function StrategyScene({ word }: { word: string }) {
  const bars = [
    { top: "36%", width: "46%" },
    { top: "50%", width: "42%" },
    { top: "64%", width: "24%" },
  ];
  return (
    <div className="absolute inset-0 bg-night text-white">
      <div className={TOP_WORD}>
        <Word className="text-lime">{word}</Word>
      </div>
      <motion.div className="absolute bottom-[12%] right-[8%] aspect-square w-[min(52%,320px)] rounded-full bg-lime" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 140, damping: 16 }}>
        {bars.map((b, i) => (
          <motion.span
            key={b.top}
            className="absolute left-[27%] h-[7.5%] origin-left -translate-y-1/2 rounded-full bg-violet"
            style={{ top: b.top, width: b.width }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.45 + i * 0.15, duration: 0.6, ease: EASE }}
          />
        ))}
      </motion.div>
      <svg className="absolute bottom-6 left-6 w-[45%] text-night-line sm:left-8" viewBox="0 0 300 120" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <motion.path d="M4 110 L70 70 L130 90 L200 30 L296 10" stroke="var(--color-violet)" strokeWidth="3" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.3, duration: 1.4, ease: EASE }} />
        <path d="M4 116h292M4 80h292M4 44h292" />
      </svg>
    </div>
  );
}

function SocialScene({ word, t }: { word: string; t: Dict["reel"]["social"] }) {
  const card = "relative aspect-[4/5] w-[40%] max-w-[270px] flex-none overflow-hidden rounded-2xl shadow-[0_30px_50px_-28px_rgba(14,26,58,.75)]";
  const head = (
    <div className="absolute left-2.5 top-2.5 z-10 flex items-center gap-1.5 rounded-full bg-white/90 py-1 pl-1 pr-2.5 text-[0.68rem] font-bold text-ink">
      <Mark size={18} /> faralai
    </div>
  );
  const cards: { className: string; content: ReactNode }[] = [
    {
      className: `${card} bg-violet`,
      content: (
        <>
          {head}
          <span className="absolute -bottom-[18%] -left-[18%] aspect-square w-[85%] rounded-full bg-lime" />
          <span className="absolute right-[10%] top-[28%] aspect-square w-[34%] rounded-tl-full bg-night" />
          <span className="absolute bottom-3 right-3 rounded-md bg-paper px-2 py-1 text-[0.7rem] font-bold text-ink">{t.post1}</span>
        </>
      ),
    },
    {
      className: `${card} z-10 bg-night text-white`,
      content: (
        <>
          {head}
          <span className="absolute -right-8 -top-8 aspect-square w-[55%] rounded-full bg-violet" />
          <p className="display absolute bottom-4 left-4 right-4 text-[clamp(1.3rem,2.4vw,2.3rem)]">{t.post2}</p>
        </>
      ),
    },
    {
      className: `${card} bg-paper text-night`,
      content: (
        <>
          {head}
          <MarbellaArt className="absolute inset-x-0 bottom-[22%] h-[52%] w-full" delay={0.4} />
          <p className="display absolute bottom-3 left-3.5 right-3 text-[clamp(1.1rem,2vw,1.9rem)]">{t.post3}</p>
        </>
      ),
    },
  ];
  return (
    <div className="absolute inset-0 bg-lime text-night">
      <div className={TOP_WORD}>
        <Word>{word}</Word>
      </div>
      <div className="absolute inset-x-0 bottom-14 flex items-end justify-center">
        {cards.map((c, i) => (
          <motion.div
            key={i}
            className={`${c.className} ${i ? "-ml-[5%]" : ""}`}
            initial={{ y: 120, opacity: 0, rotate: 0 }}
            animate={{ y: [0, -18, 0][i], opacity: 1, rotate: [-6, 0, 6][i] }}
            transition={{ delay: 0.2 + i * 0.14, type: "spring", stiffness: 120, damping: 15 }}
          >
            {c.content}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function WebScene({ word, t }: { word: string; t: Dict["reel"]["web"] }) {
  return (
    <div className="absolute inset-0 bg-desk text-night">
      <div className={TOP_WORD}>
        <Word>{word}</Word>
      </div>
      <motion.div
        className="absolute bottom-14 left-[5%] right-[5%] top-[30%] flex flex-col overflow-hidden rounded-xl bg-paper shadow-[0_40px_60px_-36px_rgba(14,26,58,.6)]"
        initial={{ y: 90, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.15, duration: 0.7, ease: EASE }}
      >
        <div className="flex items-center gap-1.5 border-b border-line px-3 py-2">
          <i className="h-2.5 w-2.5 rounded-full bg-line" /><i className="h-2.5 w-2.5 rounded-full bg-line" /><i className="h-2.5 w-2.5 rounded-full bg-line" />
          <span className="ml-3 h-4 flex-1 rounded bg-desk" />
        </div>
        <div className="flex items-center justify-between px-4 py-3 text-[0.78rem] font-semibold">
          <Mark size={22} />
          <span className="flex gap-4 text-ink-2">{t.nav.map((n) => <span key={n}>{n}</span>)}</span>
        </div>
        <div className="grid flex-1 grid-cols-[1.1fr_1fr] gap-4 px-4 pb-4">
          <div className="relative overflow-hidden rounded-lg bg-lime">
            <MarbellaArt className="absolute inset-x-0 bottom-0 h-[85%] w-full" delay={0.5} />
          </div>
          <div className="flex flex-col justify-center gap-3">
            <motion.p className="display text-[clamp(1.4rem,2.8vw,2.8rem)]" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6, duration: 0.5 }}>
              {t.title}
            </motion.p>
            <span className="h-2 w-4/5 rounded bg-desk" /><span className="h-2 w-3/5 rounded bg-desk" />
            <motion.span className="w-fit rounded-full bg-night px-4 py-2 text-[0.8rem] font-bold text-white" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.9, type: "spring", stiffness: 200, damping: 14 }}>
              {t.cta}
            </motion.span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function GraphicScene({ word }: { word: string }) {
  const shapes = [
    "rounded-full bg-lime",
    "rounded-tl-full bg-night",
    "rounded-full border-[10px] border-paper",
    "bg-paper rounded-br-full",
    "rounded-full bg-night",
    "rounded-t-full bg-lime",
    "bg-night rounded-bl-full",
    "rounded-full bg-paper",
  ];
  return (
    <div className="absolute inset-0 bg-violet text-violet-ink">
      <div className="absolute inset-x-6 top-6 grid grid-cols-4 gap-3 sm:inset-x-8 sm:top-8">
        {shapes.map((s, i) => (
          <motion.span key={i} className={`aspect-square ${s}`} initial={{ scale: 0, rotate: -90 }} animate={{ scale: 1, rotate: 0 }} transition={{ ...SPRING, delay: 0.1 + i * 0.07 }} />
        ))}
      </div>
      <div className={BOTTOM_WORD}>
        <Word>{word}</Word>
      </div>
    </div>
  );
}

// Analysis: the business read as data. Bars grow, and a lens settles on the one that matters.
function AnalysisScene({ word }: { word: string }) {
  const bars = [38, 62, 46, 80, 58, 92];
  return (
    <div className="absolute inset-0 bg-paper text-night">
      <div className={TOP_WORD}>
        <Word>{word}</Word>
      </div>
      <div className="absolute bottom-16 left-6 right-6 flex h-[48%] items-end gap-[3%] border-b-2 border-night sm:left-8 sm:right-8">
        {bars.map((h, i) => (
          <motion.span
            key={i}
            className={`flex-1 origin-bottom rounded-t-lg ${i === 3 ? "bg-violet" : "bg-night"}`}
            style={{ height: `${h}%` }}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ delay: 0.15 + i * 0.09, duration: 0.6, ease: EASE }}
          />
        ))}
        <motion.span
          className="absolute aspect-square w-[30%] rounded-full border-[10px] border-lime"
          style={{ left: "44%", bottom: "54%" }}
          initial={{ scale: 0, x: 60, y: -40 }}
          animate={{ scale: 1, x: 0, y: 0 }}
          transition={{ ...SPRING, delay: 0.9 }}
        >
          <span className="absolute -bottom-[38%] -right-[30%] h-[16%] w-[52%] origin-left rotate-45 rounded-full bg-lime" />
        </motion.span>
      </div>
    </div>
  );
}

// Consulting: connections. A central idea links out to the parts of the business, line by line.
function ConsultingScene({ word }: { word: string }) {
  const nodes = [
    [70, 70], [330, 60], [360, 190], [60, 200], [210, 30],
  ];
  return (
    <div className="absolute inset-0 bg-violet text-violet-ink">
      <svg viewBox="0 0 420 240" className="absolute inset-x-6 top-6 h-[58%] w-[calc(100%-3rem)] sm:inset-x-8 sm:w-[calc(100%-4rem)]" aria-hidden="true">
        {nodes.map(([x, y], i) => (
          <motion.line key={`l${i}`} x1="210" y1="135" x2={x} y2={y} stroke="var(--color-night)" strokeWidth="3" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.35 + i * 0.12, duration: 0.5, ease: EASE }} />
        ))}
        {nodes.map(([x, y], i) => (
          <motion.circle key={`n${i}`} cx={x} cy={y} r={i % 2 ? 16 : 22} fill={i === 1 ? "#fff" : "var(--color-night)"} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ ...SPRING, delay: 0.6 + i * 0.12 }} style={{ transformOrigin: `${x}px ${y}px` }} />
        ))}
        <motion.circle cx="210" cy="135" r="44" fill="var(--color-lime)" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ ...SPRING, delay: 0.1 }} style={{ transformOrigin: "210px 135px" }} />
      </svg>
      <div className={BOTTOM_WORD}>
        <Word>{word}</Word>
      </div>
    </div>
  );
}

// Marketing plan: a roadmap. Workstreams slot into a timeline, the way a plan is laid out.
function PlanScene({ word }: { word: string }) {
  const rows = [
    { left: "0%", width: "38%", color: "bg-night" },
    { left: "22%", width: "46%", color: "bg-violet" },
    { left: "40%", width: "34%", color: "bg-paper" },
    { left: "58%", width: "42%", color: "bg-night" },
  ];
  return (
    <div className="absolute inset-0 bg-lime text-night">
      <div className={TOP_WORD}>
        <Word>{word}</Word>
      </div>
      <div className="absolute bottom-16 left-6 right-6 flex flex-col gap-3 sm:left-8 sm:right-8">
        <div className="grid grid-cols-4 border-b-2 border-night pb-1.5 text-[0.85rem] font-bold">
          {["Q1", "Q2", "Q3", "Q4"].map((q) => <span key={q}>{q}</span>)}
        </div>
        {rows.map((r, i) => (
          <div key={i} className="relative h-9">
            <motion.span
              className={`absolute inset-y-0 rounded-full ${r.color}`}
              style={{ left: r.left, width: r.width }}
              initial={{ opacity: 0, x: 80 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.25 + i * 0.15, duration: 0.6, ease: EASE }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

// Execution: the work getting done. Each service fills its bar and gets its tick, one after another.
function ExecutionScene({ word, items }: { word: string; items: string[] }) {
  return (
    <div className="absolute inset-0 bg-night text-white">
      <ul className="absolute inset-x-6 top-6 flex flex-col gap-1.5 sm:inset-x-8 sm:top-8 sm:gap-2 lg:gap-2.5">
        {items.map((item, i) => (
          <li key={item} className="flex items-center gap-3">
            <motion.span className="grid h-7 w-7 flex-none place-items-center rounded-full bg-lime text-night sm:h-8 sm:w-8 lg:h-10 lg:w-10" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ ...SPRING, delay: 0.7 + i * 0.14 }}>
              <svg viewBox="0 0 20 20" width="20" height="20" aria-hidden="true"><path d="M5.5 10.5l3 3L14.5 7" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </motion.span>
            <div className="relative h-7 flex-1 overflow-hidden rounded-full bg-white/10 sm:h-8 lg:h-10">
              <motion.span className="absolute inset-y-0 left-0 rounded-full bg-lime" initial={{ width: "0%" }} animate={{ width: "100%" }} transition={{ delay: 0.15 + i * 0.14, duration: 0.7, ease: EASE }} />
              <span className="absolute inset-y-0 left-4 flex items-center text-[0.8rem] font-semibold text-night sm:text-[0.9rem]">{item}</span>
            </div>
          </li>
        ))}
      </ul>
      <div className={BOTTOM_WORD}>
        <Word>{word}</Word>
      </div>
    </div>
  );
}

function EndScene({ words }: { words: string[] }) {
  return (
    <div className="absolute inset-0 flex flex-col justify-center gap-1 bg-night px-6 text-white sm:px-8">
      <Word>{words[0]}</Word>
      <motion.span className="display text-[clamp(4rem,9vw,9rem)] leading-[.7] text-lime" initial={{ scale: 0, rotate: -90 }} animate={{ scale: 1, rotate: 0 }} transition={{ delay: 0.45, type: "spring", stiffness: 160, damping: 13 }}>
        +
      </motion.span>
      <motion.p className="display text-[clamp(2.8rem,6.4vw,6.6rem)]" initial={{ y: "40%", opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.75, duration: 0.6, ease: EASE }}>
        {words[1]}
      </motion.p>
    </div>
  );
}

export function Showreel({ t }: { t: Dict["reel"] }) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hidden, setHidden] = useState(false);
  const s = t.scenes;

  const scenes: Scene[] = [
    { id: "marbella", caption: s.marbella, body: <MarbellaScene word={s.marbella} /> },
    // Strategy half: the chapter opener, then three strategy services.
    { id: "strategy", caption: s.strategy, body: <StrategyScene word={s.strategy} /> },
    { id: "analysis", caption: s.analysis, body: <AnalysisScene word={s.analysis} /> },
    { id: "consulting", caption: s.consulting, body: <ConsultingScene word={s.consulting} /> },
    { id: "plan", caption: s.plan, body: <PlanScene word={s.plan} /> },
    // Execution half: the chapter opener, then three execution services.
    { id: "execution", caption: s.execution, body: <ExecutionScene word={s.execution} items={t.executionList} /> },
    { id: "social", caption: s.social, body: <SocialScene word={s.social} t={t.social} /> },
    { id: "web", caption: s.web, body: <WebScene word={s.web} t={t.web} /> },
    { id: "graphic", caption: s.graphic, body: <GraphicScene word={s.graphic} /> },
    { id: "end", caption: s.end.join(" + "), body: <EndScene words={s.end} /> },
  ];

  // Start paused when the visitor prefers reduced motion.
  useEffect(() => {
    if (reduce) setPaused(true);
  }, [reduce]);

  useEffect(() => {
    const onVis = () => setHidden(document.visibilityState === "hidden");
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  const running = !paused && !hidden;
  useEffect(() => {
    if (!running) return;
    const id = setTimeout(() => setIndex((i) => (i + 1) % scenes.length), SCENE_MS);
    return () => clearTimeout(id);
  }, [running, index, scenes.length]);

  const scene = scenes[index];

  return (
    <div className="absolute inset-0" role="region" aria-roledescription="carousel" aria-label={t.label}>
      <AnimatePresence initial={false}>
        <motion.div
          key={scene.id}
          className="absolute inset-0"
          initial={{ clipPath: "inset(0 0 0 100%)" }}
          animate={{ clipPath: "inset(0 0 0 0%)" }}
          exit={{ opacity: 0, transition: { delay: 0.7, duration: 0 } }}
          transition={{ duration: 0.7, ease: [0.7, 0, 0.2, 1] }}
        >
          {scene.body}
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-x-0 bottom-0 z-10 flex items-center gap-3 bg-[linear-gradient(180deg,transparent,rgba(14,26,58,.55))] px-4 pb-3 pt-6 text-white sm:px-6">
        <button
          type="button"
          onClick={() => setPaused((p) => !p)}
          aria-label={paused ? t.play : t.pause}
          className="grid h-9 w-9 flex-none place-items-center rounded-full bg-white/15 backdrop-blur-sm hover:bg-white/25"
        >
          {paused ? (
            <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true"><path d="M4 2.5v11l9-5.5z" fill="currentColor" /></svg>
          ) : (
            <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true"><path d="M4 2.5h3v11H4zM9 2.5h3v11H9z" fill="currentColor" /></svg>
          )}
        </button>
        <p className="min-w-0 flex-1 truncate text-[0.88rem] font-semibold" aria-live="polite">{scene.caption}</p>
        <div className="hidden flex-none gap-1 sm:flex" aria-hidden="true">
          {scenes.map((sc, i) => (
            <span key={sc.id} className="relative h-1 w-5 overflow-hidden rounded-full bg-white/25">
              {i < index && <span className="absolute inset-0 bg-white" />}
              {i === index && (
                <span key={`${index}-${running}`} className="absolute inset-y-0 left-0 bg-lime" style={running ? { width: "100%", animation: `reel-fill ${SCENE_MS}ms linear` } : { width: "100%" }} />
              )}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
