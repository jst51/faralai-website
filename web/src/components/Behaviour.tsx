"use client";

import Lenis from "lenis";
import { useEffect } from "react";
import { track } from "@/lib/track";

// Page-wide behaviour with no markup of its own: smooth scrolling (skipped for reduced motion)
// and an "open_audit" event whenever someone clicks a link to the audit form.
export function Behaviour({ auditId }: { auditId: string }) {
  useEffect(() => {
    let lenis: Lenis | null = null;
    let frame = 0;
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      lenis = new Lenis({ anchors: { offset: -88 }, lerp: 0.12 });
      const raf = (time: number) => {
        lenis?.raf(time);
        frame = requestAnimationFrame(raf);
      };
      frame = requestAnimationFrame(raf);
    }

    const onClick = (e: MouseEvent) => {
      const link = (e.target as HTMLElement).closest(`a[href="#${auditId}"]`);
      if (link) track("open_audit", { location: link.closest("header") ? "header" : "page" });
    };
    document.addEventListener("click", onClick);

    return () => {
      cancelAnimationFrame(frame);
      lenis?.destroy();
      document.removeEventListener("click", onClick);
    };
  }, [auditId]);

  return null;
}
