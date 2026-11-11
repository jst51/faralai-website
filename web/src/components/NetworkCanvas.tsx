"use client";

import { useEffect, useRef } from "react";

// The particle network from the original faralai.com hero: drifting points joined by fine lines,
// pushed away by the cursor, leaving soft trails. Redrawn in the brand colours, on a dark or light
// ground. It stops drawing when off screen, uses fewer points on small screens, and stays still for
// visitors who prefer reduced motion.

export type NetworkTheme = "dark" | "light";

const THEMES = {
  dark: { ground: "14,26,58", colours: ["#c8f02c", "#8e83e8"], line: ["rgba(200,240,44,0.16)", "rgba(142,131,232,0.22)"] },
  light: { ground: "255,255,255", colours: ["#6e9b00", "#6457d3"], line: ["rgba(110,155,0,0.22)", "rgba(100,87,211,0.24)"] },
} as const;

type Particle = { x: number; y: number; vx: number; vy: number; r: number; c: 0 | 1 };

export function NetworkCanvas({ theme }: { theme: NetworkTheme }) {
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const el = canvas.current;
    const ctx = el?.getContext("2d");
    if (!el || !ctx) return;
    const look = THEMES[theme];
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mouse = { x: -9999, y: -9999 };
    let particles: Particle[] = [];
    let width = 0;
    let height = 0;
    let raf = 0;
    let visible = false;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = el.clientWidth;
      height = el.clientHeight;
      el.width = Math.round(width * dpr);
      el.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = width < 768 ? 60 : 150;
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        r: Math.random() * 2.5 + 1,
        c: Math.random() > 0.5 ? 1 : 0,
      }));
      ctx.fillStyle = `rgb(${look.ground})`;
      ctx.fillRect(0, 0, width, height);
    };

    const frame = () => {
      // A translucent wash instead of a full clear leaves the soft trails of the original.
      ctx.fillStyle = `rgba(${look.ground},${still ? 1 : 0.06})`;
      ctx.fillRect(0, 0, width, height);
      for (const p of particles) {
        if (!still) {
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < 0 || p.x > width) p.vx *= -1;
          if (p.y < 0 || p.y > height) p.vy *= -1;
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          if (dx * dx + dy * dy < 120 * 120) {
            p.x -= dx * 0.02;
            p.y -= dy * 0.02;
          }
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = look.colours[p.c];
        ctx.fill();
        for (const q of particles) {
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          if (dx * dx + dy * dy < 100 * 100) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = look.line[p.c];
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
    };

    const loop = () => {
      frame();
      raf = visible && !still ? requestAnimationFrame(loop) : 0;
    };

    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const onLeave = () => {
      mouse.x = mouse.y = -9999;
    };

    resize();
    frame();
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !raf && !still) raf = requestAnimationFrame(loop);
    });
    io.observe(el);
    window.addEventListener("resize", resize);
    el.parentElement?.addEventListener("pointermove", onMove);
    el.parentElement?.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", resize);
      el.parentElement?.removeEventListener("pointermove", onMove);
      el.parentElement?.removeEventListener("pointerleave", onLeave);
    };
  }, [theme]);

  return <canvas ref={canvas} aria-hidden="true" className="absolute inset-0 h-full w-full" />;
}
