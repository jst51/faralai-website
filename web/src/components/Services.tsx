"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useId, useState } from "react";
import type { Dict } from "@/content/dictionary";

// The service tiles: strategy first (dark), then execution (light), four per row on desktop.
// Each opens in place to show what it includes; the board reflows around it.
export function Services({ t }: { t: Dict["services"] }) {
  const [open, setOpen] = useState<number | null>(null);
  const reduce = useReducedMotion();
  const uid = useId();

  return (
    <>
      {t.items.map((s, i) => {
        const isOpen = open === i;
        const dark = s.kind === "strategy";
        const panel = `${uid}-svc-${i}`;
        return (
          <motion.article
            key={s.title}
            layout={!reduce}
            transition={{ type: "spring", stiffness: 260, damping: 30 }}
            className={`tile col-span-2 md:col-span-3 lg:col-span-3 flex min-h-[300px] flex-col ${dark ? "tile-night" : ""}`}
          >
            <motion.span
              layout={!reduce ? "position" : false}
              className={`mb-5 w-fit rounded-full px-3 py-1 text-[0.8rem] font-bold ${dark ? "bg-lime text-night" : "bg-violet text-violet-ink"}`}
            >
              {t.kinds[s.kind as keyof typeof t.kinds]}
            </motion.span>
            <motion.h3 layout={!reduce ? "position" : false} className="h-tile max-w-[22ch] !text-[clamp(1.35rem,1.8vw,1.75rem)]">
              {s.title}
            </motion.h3>
            <motion.p layout={!reduce ? "position" : false} className={`mt-3 max-w-[44ch] ${dark ? "text-night-mute" : "text-ink-2"}`}>
              {s.summary}
            </motion.p>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.ul
                  id={panel}
                  key="list"
                  initial={reduce ? false : { opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={reduce ? undefined : { opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, ease: [0.2, 0.7, 0.2, 1] }}
                  className="grid gap-x-6 overflow-hidden sm:grid-cols-2 lg:grid-cols-1"
                >
                  {s.list.map((item) => (
                    <li key={item} className={`border-t py-2.5 text-[0.98rem] first:mt-5 sm:[&:nth-child(2)]:mt-5 lg:[&:nth-child(2)]:mt-0 ${dark ? "border-night-line" : "border-line"}`}>
                      {item}
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
            <motion.div layout={!reduce ? "position" : false} className="mt-auto pt-6">
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={panel}
                onClick={() => setOpen(isOpen ? null : i)}
                className={`btn !min-h-10 !px-4 !text-[0.9rem] ${dark ? "btn-lime" : "btn-line"}`}
              >
                {isOpen ? t.close : t.open}
              </button>
            </motion.div>
          </motion.article>
        );
      })}
    </>
  );
}
