/**
 * Intercom Messenger (replaces HubSpot chat). Official loader, lazy:
 * boots after first interaction or idle (≤4s), once, from __root.tsx.
 * - Needs VITE_INTERCOM_APP_ID; no-ops without it.
 * - Production hosts only, unless ?intercom_debug=1 (or localStorage sp_intercom_debug=1).
 * - Raw email goes ONLY to Intercom (its CRM); Segment/PostHog get hashed ids.
 */
import { environmentFor } from "./analytics-context";
import { standardProps } from "./analytics-context";
import { track } from "./segment";

type IC = ((cmd: string, ...args: unknown[]) => void) & { q?: unknown[]; c?: (a: unknown) => void };
declare global { interface Window { Intercom?: IC; intercomSettings?: Record<string, unknown> } }

const APP_ID = import.meta.env["VITE_INTERCOM_APP_ID"] as string | undefined;
const SKIP_PATHS = [/^\/scaffolding/, /^\/growth-ladders/]; // internal docs + reading surface
let booted = false;
let scheduled = false;

function debugOn(): boolean {
  try {
    if (new URLSearchParams(location.search).get("intercom_debug") === "1") localStorage.setItem("sp_intercom_debug", "1");
    return localStorage.getItem("sp_intercom_debug") === "1";
  } catch { return false; }
}

export function intercomAllowed(path = typeof location !== "undefined" ? location.pathname : "/"): boolean {
  if (typeof window === "undefined" || !APP_ID) return false;
  if (SKIP_PATHS.some((r) => r.test(path))) return false;
  return environmentFor(location.hostname) === "production" || debugOn();
}

/** Page context passed as Intercom attributes so chatflows can target audit / SPIIX / sprint. */
function pageContext(): Record<string, unknown> {
  const p = standardProps();
  const path = String(p["page_path"] ?? "/");
  const intent = path.startsWith("/audit") ? "intake_audit"
    : path.startsWith("/spiix") ? "spiix"
    : path.startsWith("/sprint") || path.startsWith("/faith") ? "sprint"
    : path.startsWith("/software") ? "software" : "general";
  const attrs: Record<string, unknown> = { page_intent: intent };
  for (const [k, v] of Object.entries(p)) if (v !== undefined && typeof v !== "object") attrs[k] = v;
  return attrs;
}

function loadScript() {
  const w = window;
  const ic: IC = function (...args: unknown[]) { ic.c?.(args); } as IC;
  ic.q = []; ic.c = (a) => ic.q!.push(a);
  w.Intercom = ic;
  const s = document.createElement("script");
  s.async = true; s.src = `https://widget.intercom.io/widget/${APP_ID}`;
  document.head.appendChild(s);
}

function boot() {
  if (booted || !intercomAllowed()) return;
  booted = true;
  loadScript();
  const ctx = pageContext();
  window.Intercom!("boot", { api_base: "https://api-iam.intercom.io", app_id: APP_ID, ...ctx });
  window.Intercom!("onShow", () => track("Messenger Opened", { page_intent: ctx["page_intent"] }));
  window.Intercom!("onUserEmailSupplied", () => track("Lead Captured", { form_id: "intercom", lead_type: "chat", source: "intercom" }));
  // Conversation Started: Intercom exposes no direct hook; first unread-count change after open is a proxy.
  let convo = false;
  window.Intercom!("onUnreadCountChange", () => { if (!convo) { convo = true; track("Conversation Started", { source: "intercom", inferred: true }); } });
}

/** Schedule lazy boot: first pointer/key/scroll, or idle, whichever first. */
export function scheduleIntercom() {
  if (scheduled || typeof window === "undefined" || !intercomAllowed()) return;
  scheduled = true;
  const go = () => { cleanup(); boot(); };
  const evs = ["pointerdown", "keydown", "scroll", "touchstart"] as const;
  const cleanup = () => evs.forEach((e) => window.removeEventListener(e, go));
  evs.forEach((e) => window.addEventListener(e, go, { once: true, passive: true }));
  const ric = (window as unknown as { requestIdleCallback?: (cb: () => void, o?: object) => void }).requestIdleCallback;
  if (ric) ric(go, { timeout: 4000 }); else setTimeout(go, 4000);
}

/** On route change: refresh page attrs (cheap; no-op before boot). */
export function intercomPage() {
  if (!booted || !window.Intercom) return;
  if (!intercomAllowed()) { window.Intercom("update", { hide_default_launcher: true }); return; }
  window.Intercom("update", { hide_default_launcher: false, ...pageContext() });
}

/** Known lead: give Intercom the real email + hashed user_id. Never forwarded to Segment/PostHog. */
export function intercomIdentify(userIdHash: string, email: string, traits?: Record<string, unknown>) {
  if (!booted || !window.Intercom) return;
  window.Intercom("update", { user_id: userIdHash, email, ...traits, ...pageContext() });
}
