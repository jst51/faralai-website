"use client";

import { useEffect, useRef } from "react";

// The cursor from the original faralai.com: a lime dot with a ring that follows a little behind and a
// short trail. It grows over anything clickable. Only on large screens with a mouse, and never for
// visitors who prefer reduced motion; everyone else keeps the normal pointer.

const TRAIL = 5;
const CLICKABLE = "a, button, summary, label, [data-hover]";

export function CustomCursor() {
  const ring = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLDivElement>(null);
  const trail = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine) and (min-width: 1024px)").matches;
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || calm || !ring.current || !dot.current) return;
    document.documentElement.classList.add("custom-cursor");

    const mouse = { x: -100, y: -100 };
    const ringPos = { x: -100, y: -100 };
    const trailPos = Array.from({ length: TRAIL }, () => ({ x: -100, y: -100 }));
    let raf = 0;

    const move = (e: PointerEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      dot.current!.style.transform = `translate(${mouse.x - 4}px, ${mouse.y - 4}px)`;
      ring.current!.classList.toggle("is-hover", Boolean((e.target as Element).closest?.(CLICKABLE)));
    };
    const down = () => ring.current!.classList.add("is-down");
    const up = () => ring.current!.classList.remove("is-down");

    const animate = () => {
      ringPos.x += (mouse.x - ringPos.x) * 0.12;
      ringPos.y += (mouse.y - ringPos.y) * 0.12;
      ring.current!.style.transform = `translate(${ringPos.x}px, ${ringPos.y}px)`;
      let prev = mouse;
      trailPos.forEach((t, i) => {
        const speed = 0.3 - i * 0.04;
        t.x += (prev.x - t.x) * speed;
        t.y += (prev.y - t.y) * speed;
        const el = trail.current[i];
        if (el) el.style.transform = `translate(${t.x - 3}px, ${t.y - 3}px)`;
        prev = t;
      });
      raf = requestAnimationFrame(animate);
    };

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up);
    raf = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
      document.documentElement.classList.remove("custom-cursor");
    };
  }, []);

  return (
    <div aria-hidden="true" className="cursor-layer">
      {Array.from({ length: TRAIL }, (_, i) => (
        <div
          key={i}
          ref={(el) => {
            trail.current[i] = el;
          }}
          className="cursor-trail"
          style={{ opacity: (1 - i / TRAIL) * 0.5, width: 8 - i, height: 8 - i }}
        />
      ))}
      <div ref={ring} className="cursor-ring" />
      <div ref={dot} className="cursor-dot" />
    </div>
  );
}
