"use client";

import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import type { Dict } from "@/content/dictionary";

// The hero's playbook: a pitch where each goal draws its own route, from the audit to the result.
// Point positions are in the SVG's 700×420 units; each goal's route has one point per step.
const ROUTES: Record<string, [number, number][]> = {
  clients: [[80, 310], [220, 170], [360, 285], [500, 140], [625, 215]],
  brand: [[80, 150], [215, 300], [355, 155], [495, 300], [625, 215]],
  expand: [[80, 230], [230, 110], [370, 320], [515, 130], [625, 215]],
};

export function Playbook({ t }: { t: Dict["play"] }) {
  const [goal, setGoal] = useState(t.goals[0].id);
  const reduce = useReducedMotion();
  const current = t.goals.find((g) => g.id === goal) ?? t.goals[0];
  const pts = ROUTES[current.id];
  const d = pts.map(([x, y], i) => `${i ? "L" : "M"}${x} ${y}`).join(" ");
  const draw = reduce ? { duration: 0 } : { duration: 0.9, ease: [0.4, 0, 0.2, 1] as const };

  return (
    <div className="flex h-full flex-col gap-4">
      <span className="tile-label">{t.label}</span>

      <svg viewBox="0 0 700 420" className="w-full flex-1" role="img" aria-label={`${current.label}: ${current.steps.join(", ")}`}>
        <g fill="none" stroke="var(--color-night-line)" strokeWidth="1.5">
          <rect x="20" y="30" width="660" height="360" rx="6" />
          <line x1="350" y1="30" x2="350" y2="390" />
          <circle cx="350" cy="210" r="58" />
          <rect x="20" y="130" width="80" height="160" />
          <rect x="600" y="130" width="80" height="160" />
        </g>

        <motion.path
          key={`route-${goal}`}
          d={d}
          fill="none"
          stroke="var(--color-violet)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: reduce ? 1 : 0 }}
          animate={{ pathLength: 1 }}
          transition={draw}
        />

        {pts.map(([x, y], i) => {
          const last = i === pts.length - 1;
          return (
            <motion.g
              key={`${goal}-${i}`}
              initial={{ opacity: reduce ? 1 : 0, scale: reduce ? 1 : 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={reduce ? { duration: 0 } : { delay: 0.12 + i * 0.17, duration: 0.3 }}
              style={{ transformOrigin: `${x}px ${y}px` }}
            >
              <circle cx={x} cy={y} r={last ? 15 : 10} fill={last ? "var(--color-lime)" : "var(--color-night)"} stroke="var(--color-lime)" strokeWidth="3" />
              <text x={x} y={y - 24} textAnchor="middle" fill="#fff" className="font-display" fontSize="24" fontWeight="800" letterSpacing=".02em">
                {current.steps[i].toUpperCase()}
              </text>
            </motion.g>
          );
        })}
      </svg>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div role="group" aria-label={t.label} className="flex flex-wrap gap-1.5">
          {t.goals.map((g) => (
            <button
              key={g.id}
              type="button"
              aria-pressed={g.id === goal}
              onClick={() => setGoal(g.id)}
              className="rounded-full border border-night-line px-4 py-2 text-[0.9rem] font-semibold transition-colors hover:border-lime aria-pressed:border-lime aria-pressed:bg-lime aria-pressed:text-ink"
            >
              {g.label}
            </button>
          ))}
        </div>
        <span className="text-[0.88rem] text-night-mute">{t.note}</span>
      </div>
    </div>
  );
}
