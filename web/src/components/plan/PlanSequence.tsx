"use client";

import { useEffect, useRef, type RefObject } from "react";
import { sceneAt } from "./timing";

// The phone version of the 3D hero: the same animation, pre-rendered as frames and played by scroll
// on a 2D canvas, which phones handle smoothly where live WebGL stutters. The shown position eases
// towards the scroll position at a capped speed, so even a fast swipe plays through every step,
// each on screen for about half a second, instead of jumping.
// The frames in public/images/plan/ were rendered from the live scene at phone size with
// "?plan=live": render them again if the scene changes.

export const FRAME_COUNT = 96;
// Fastest the animation may run, in timeline per second: one step (0.09) takes at least 0.5 s.
const MAX_SPEED = 0.18;
const src = (i: number) => `/images/plan/seq-${String(i).padStart(3, "0")}.webp`;

// Loads coarse frames first (every 16th, then every 8th...) so the whole range is soon playable.
function loadOrder() {
  const order: number[] = [];
  for (let step = 16; step >= 1; step /= 2) {
    for (let i = 0; i < FRAME_COUNT; i += step) if (!order.includes(i)) order.push(i);
  }
  return order;
}

export function PlanSequence({ progress, onScene }: { progress: RefObject<number>; onScene: (scene: number) => void }) {
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const el = canvas.current;
    const ctx = el?.getContext("2d");
    if (!el || !ctx) return;

    const frames: (HTMLImageElement | null)[] = Array(FRAME_COUNT).fill(null);
    let cancelled = false;
    (async () => {
      for (const i of loadOrder()) {
        if (cancelled) return;
        const img = new Image();
        img.src = src(i);
        try {
          await img.decode();
          frames[i] = img;
        } catch {}
      }
    })();

    // Nearest frame that has loaded, so the scene never goes blank while the rest arrive.
    const nearest = (i: number) => {
      for (let d = 0; d < FRAME_COUNT; d++) {
        if (frames[i - d]) return frames[i - d];
        if (frames[i + d]) return frames[i + d];
      }
      return null;
    };

    let shown = progress.current;
    let drawn = -1;
    let scene = Number.NaN;
    let raf = 0;
    let last = performance.now();

    const fit = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      el.width = Math.round(el.clientWidth * dpr);
      el.height = Math.round(el.clientHeight * dpr);
      drawn = -1;
    };
    fit();
    window.addEventListener("resize", fit);

    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 1 / 20);
      last = now;
      const eased = (progress.current - shown) * (1 - Math.exp(-8 * dt));
      shown += Math.sign(eased) * Math.min(Math.abs(eased), MAX_SPEED * dt);
      if (Math.abs(progress.current - shown) < 0.0002) shown = progress.current;

      const i = Math.round(shown * (FRAME_COUNT - 1));
      const img = nearest(i);
      const key = img ? frames.indexOf(img) : -1;
      if (img && key !== drawn) {
        // Cover the canvas, like object-fit: cover.
        const s = Math.max(el.width / img.naturalWidth, el.height / img.naturalHeight);
        const w = img.naturalWidth * s;
        const h = img.naturalHeight * s;
        ctx.drawImage(img, (el.width - w) / 2, (el.height - h) / 2, w, h);
        drawn = key;
      }
      const next = sceneAt(shown);
      if (next !== scene) {
        scene = next;
        onScene(next);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", fit);
    };
  }, [progress, onScene]);

  return <canvas ref={canvas} className="absolute inset-0 h-full w-full" />;
}
