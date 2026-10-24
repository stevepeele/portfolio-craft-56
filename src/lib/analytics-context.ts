/** Standard props on every event (tracking plan v2). Client-only; safe on SSR. */
const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const;
const FIRST = "sp_utm_first";
const LAST = "sp_utm_last";

export type Environment = "production" | "preview" | "internal" | "local";

export function environmentFor(host: string): Environment {
  const h = host.toLowerCase();
  if (h === "localhost" || h.startsWith("127.") || h.endsWith(".local")) return "local";
  if (h.endsWith(".vercel.app")) return "preview";
  if (/^(missioncontrol|aiops|lab|mastery|dossier)\./.test(h)) return "internal";
  return "production";
}

export function siteFor(host: string): string {
  const h = host.toLowerCase().replace(/^www\./, "");
  if (h.endsWith("panlabs.io")) return "panlabs";
  if (h === "stevepeeleii.com" || h.startsWith("stevepeeleii-")) return "stevepeeleii";
  const sub = h.match(/^([a-z0-9-]+)\.stevepeeleii\.com$/);
  return sub?.[1] ?? h;
}

function pageType(path: string): string {
  const seg = path.split("/").filter(Boolean)[0] ?? "home";
  return seg;
}

function readJSON(store: Storage, k: string): Record<string, string> | null {
  try { return JSON.parse(store.getItem(k) ?? "null"); } catch { return null; }
}

/** Persist UTMs: first touch in localStorage (forever), last touch in session. */
export function captureUtms(): Record<string, string> {
  if (typeof window === "undefined") return {};
  const q = new URLSearchParams(window.location.search);
  const now: Record<string, string> = {};
  for (const k of UTM_KEYS) { const v = q.get(k); if (v) now[k] = v.toLowerCase(); }
  try {
    if (Object.keys(now).length) {
      if (!localStorage.getItem(FIRST)) localStorage.setItem(FIRST, JSON.stringify(now));
      sessionStorage.setItem(LAST, JSON.stringify(now));
    }
  } catch { /* storage blocked */ }
  return now;
}

export function standardProps(): Record<string, unknown> {
  if (typeof window === "undefined") return {};
  captureUtms();
  const host = window.location.hostname;
  const last = (() => { try { return readJSON(sessionStorage, LAST); } catch { return null; } })() ?? {};
  const first = (() => { try { return readJSON(localStorage, FIRST); } catch { return null; } })() ?? {};
  const out: Record<string, unknown> = {
    site: siteFor(host),
    app: "stevepeeleii-web",
    environment: environmentFor(host),
    page_path: window.location.pathname,
    page_type: pageType(window.location.pathname),
    ...last,
  };
  for (const [k, v] of Object.entries(first)) out[`first_${k}`] = v;
  return out;
}
