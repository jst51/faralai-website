"use client";

import { useEffect } from "react";

// Remembers the language when someone uses the ES/EN switch, so faralai.com sends them back to it.
export function LanguageMemory() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const link = (e.target as HTMLElement).closest("a[data-lang-switch]");
      if (!link) return;
      try {
        localStorage.setItem("faralai-lang", link.getAttribute("data-lang-switch") ?? "");
      } catch {}
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
  return null;
}
