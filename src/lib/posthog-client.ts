import posthog from "posthog-js";

/** Shared PostHog client. No-ops unless VITE_POSTHOG_KEY is set; never throws. */
const KEY = import.meta.env["VITE_POSTHOG_KEY"] as string | undefined;
const HOST = (import.meta.env["VITE_POSTHOG_HOST"] as string | undefined) ?? "https://us.i.posthog.com";
let ready = false;

export function ensurePostHog(): boolean {
  if (ready) return true;
  if (typeof window === "undefined" || !KEY) return false;
  try {
    posthog.init(KEY, { api_host: HOST, capture_pageview: false, autocapture: false, persistence: "localStorage" });
    ready = true;
  } catch { return false; }
  return ready;
}
export function phCapture(event: string, props?: Record<string, unknown>) {
  if (!ensurePostHog()) return;
  try { posthog.capture(event, props); } catch { /* never break the site */ }
}
export function phIdentify(id: string, traits?: Record<string, unknown>) {
  if (!ensurePostHog()) return;
  try { posthog.identify(id, traits); } catch { /* never break the site */ }
}
