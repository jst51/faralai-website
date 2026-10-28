// Sends conversion events to Google Analytics (and the Meta Pixel, once it's installed).
type Params = Record<string, unknown>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

export function track(event: string, params: Params = {}) {
  window.gtag?.("event", event, params);
  if (window.fbq) {
    if (event === "generate_lead") window.fbq("track", "Lead", params);
    if (event === "open_audit") window.fbq("track", "ViewContent", { content_name: "audit_form" });
  }
}
