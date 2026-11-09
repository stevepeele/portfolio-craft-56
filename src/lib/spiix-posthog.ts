/**
 * SPIIX standard PostHog module for bundled apps (SPIIX-1227, 2026-11-09).
 * Same contract as spiix-posthog.js, for apps that already depend on posthog-js
 * (Vite / Next). PostHog project 613918 is the single pipe. No Segment, no GA tags.
 *
 * Usage:
 *   import { initSpiix, spiixTrack, spiixIdentify } from "./spiix-posthog";
 *   initSpiix({ key: import.meta.env.VITE_POSTHOG_KEY ?? "<public project key>",
 *               property_id: "product.stampd", brand: "product", surface: "web",
 *               person_profiles: "always", autocapture: false });
 *
 * The key is a public client key. It may be inlined as a fallback so a missing
 * env var can never ship a placeholder or silently kill analytics again
 * (the panlabs.io %VITE_POSTHOG_KEY% failure mode, 2026-10-24 to 2026-11-09).
 */
import posthog from "posthog-js";

export interface SpiixConfig {
  key: string;
  property_id: string;
  brand: "stevepeeleii" | "panlabs" | "product" | "internal" | "community" | "prospect";
  surface?: string;
  person_profiles?: "always" | "identified_only";
  autocapture?: boolean;
  api_host?: string;
  env?: string;
}

const TAXONOMY_VERSION = "1.1.0";
const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"];
const CLICK_IDS = ["gclid", "fbclid", "msclkid", "ttclid", "li_fat_id"];
const ESTATE_HOSTS = /(stevepeeleii\.com|panlabs\.io|heybinsly\.lol)$/;

type Touch = Record<string, string>;
let attrFirst: Touch = {};
let attrLast: Touch = {};
let cfgRef: SpiixConfig | null = null;
let initialized = false;

function detectEnv(cfg: SpiixConfig): string {
  if (cfg.env) return cfg.env;
  if (typeof window === "undefined") return "server";
  const host = window.location.hostname;
  if (host === "localhost" || host === "127.0.0.1" || host === "::1") return "development";
  if (/\.vercel\.app$/.test(host)) return "preview";
  if (/preview|staging/.test(host)) return "preview";
  return "production";
}

function cookieDomain(): string | null {
  const host = window.location.hostname;
  if (/stevepeeleii\.com$/.test(host)) return ".stevepeeleii.com";
  if (/panlabs\.io$/.test(host)) return ".panlabs.io";
  return null;
}
function setCookie(name: string, value: string, days: number) {
  const d = new Date(); d.setTime(d.getTime() + days * 864e5);
  let s = `${name}=${encodeURIComponent(value)};expires=${d.toUTCString()};path=/;SameSite=Lax`;
  const dom = cookieDomain(); if (dom) s += `;domain=${dom}`;
  if (window.location.protocol === "https:") s += ";Secure";
  document.cookie = s;
}
function getCookie(name: string): string | null {
  const m = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return m ? decodeURIComponent(m[1]) : null;
}
function touchType(t: Touch): string {
  if (t.utm_medium === "cpc" || t.gclid || t.fbclid || t.msclkid) return "paid";
  if (t.utm_medium === "email") return "email";
  if (t.utm_medium === "social" || /facebook|instagram|linkedin|twitter|x\.com|tiktok/.test(t.referring_domain || "")) return "social";
  if (t.utm_medium === "organic" || /google|bing|duckduckgo/.test(t.referring_domain || "")) return "organic";
  if (t.referring_domain && !window.location.hostname.includes(t.referring_domain)) return "referral";
  return "direct";
}
function currentTouch(): Touch {
  const q = new URLSearchParams(window.location.search);
  const t: Touch = {};
  UTM_KEYS.forEach((k) => { const v = q.get(k); if (v) t[k] = v.toLowerCase(); });
  CLICK_IDS.forEach((k) => { const v = q.get(k); if (v) t[k] = v; });
  let refDomain = "";
  try { refDomain = document.referrer ? new URL(document.referrer).hostname : ""; } catch { /* ignore */ }
  t.referrer = document.referrer || "";
  t.referring_domain = refDomain;
  t.landing_page = window.location.origin + window.location.pathname;
  t.landing_path = window.location.pathname;
  t.touch_timestamp = new Date().toISOString();
  t.touch_type = touchType(t);
  return t;
}
function loadAttribution(): void {
  let stored: { first?: Touch; last?: Touch } = {};
  try {
    const raw = getCookie("spiix_attr") || window.localStorage.getItem("spiix_attr");
    if (raw) stored = JSON.parse(raw);
  } catch { /* ignore */ }
  const touch = currentTouch();
  const isNewSession = !window.sessionStorage.getItem("spiix_session");
  try { window.sessionStorage.setItem("spiix_session", "1"); } catch { /* ignore */ }
  if (!stored.first) stored.first = touch;
  if (isNewSession || touch.utm_source || touch.gclid || touch.fbclid) stored.last = touch;
  if (!stored.last) stored.last = touch;
  attrFirst = stored.first; attrLast = stored.last;
  const raw = JSON.stringify(stored);
  try { setCookie("spiix_attr", raw, 365); } catch { /* ignore */ }
  try { window.localStorage.setItem("spiix_attr", raw); } catch { /* ignore */ }
}
function flatten(prefix: string, obj: Touch): Record<string, string> {
  const out: Record<string, string> = {};
  Object.keys(obj || {}).forEach((k) => { out[prefix + k] = obj[k]; });
  return out;
}

export function initSpiix(cfg: SpiixConfig): boolean {
  if (initialized || typeof window === "undefined") return initialized;
  cfgRef = cfg;
  const env = detectEnv(cfg);
  if (env !== "production" || !cfg.key || cfg.key.startsWith("%")) return false;
  loadAttribution();
  const appId = cfg.property_id.split(".").pop() || "";
  posthog.init(cfg.key, {
    api_host: cfg.api_host || "https://us.i.posthog.com",
    capture_pageview: false,
    capture_pageleave: true,
    autocapture: !!cfg.autocapture,
    person_profiles: cfg.person_profiles || "identified_only",
    persistence: "localStorage+cookie",
  });
  posthog.register({
    org: "spiix",
    brand: cfg.brand,
    property_id: cfg.property_id,
    surface: cfg.surface || "web",
    env,
    taxonomy_version: TAXONOMY_VERSION,
    app_id: appId,
    attribution_first: attrFirst,
    attribution_last: attrLast,
    ...flatten("attr_first_", attrFirst),
    ...flatten("attr_last_", attrLast),
  });
  // Cross-door stitching: adopt inbound ph_did before first capture.
  try {
    const inbound = new URLSearchParams(window.location.search).get("ph_did");
    const cur = posthog.get_distinct_id();
    if (inbound && cur && cur !== inbound) posthog.identify(inbound, {}, {});
  } catch { /* ignore */ }
  let lastUrl = window.location.href;
  const pv = () => spiixPageview();
  const routeChanged = () => {
    if (window.location.href !== lastUrl) { lastUrl = window.location.href; pv(); }
  };
  (["pushState", "replaceState"] as const).forEach((m) => {
    const orig = history[m];
    history[m] = function (this: History, ...args: unknown[]) {
      const r = (orig as (...a: unknown[]) => unknown).apply(this, args);
      setTimeout(routeChanged, 0);
      return r;
    } as typeof history.pushState;
  });
  window.addEventListener("popstate", routeChanged);
  window.addEventListener("hashchange", routeChanged);
  document.addEventListener("click", (ev) => {
    const a = (ev.target as HTMLElement)?.closest?.("a[href]") as HTMLAnchorElement | null;
    if (!a) return;
    const next = spiixDecorate(a.getAttribute("href") || "");
    if (next && next !== a.getAttribute("href")) a.setAttribute("href", next);
  }, true);
  initialized = true;
  pv();
  return true;
}

export function spiixPageview(extra?: Record<string, unknown>): void {
  if (!initialized) return;
  posthog.capture("$pageview", {
    $current_url: window.location.href,
    title: document.title,
    attribution_first: attrFirst,
    attribution_last: attrLast,
    ...(extra || {}),
  });
}

export function spiixTrack(name: string, props?: Record<string, unknown>): void {
  if (!initialized) return;
  posthog.capture(name, {
    attribution_first: attrFirst,
    attribution_last: attrLast,
    ...(props || {}),
  });
}

export function spiixIdentify(userId: string, traits?: Record<string, unknown>): void {
  if (!initialized || !userId) return;
  try {
    const anon = posthog.get_distinct_id();
    if (anon && anon !== userId) { try { posthog.alias(userId, anon); } catch { /* ignore */ } }
    posthog.identify(userId, traits || {}, {
      initial_utm_source: attrFirst.utm_source || null,
      initial_utm_campaign: attrFirst.utm_campaign || null,
      initial_utm_medium: attrFirst.utm_medium || null,
      initial_referring_domain: attrFirst.referring_domain || null,
      initial_landing_page: attrFirst.landing_page || null,
      first_seen_at: attrFirst.touch_timestamp || new Date().toISOString(),
      first_property_id: cfgRef?.property_id || "",
    });
  } catch { /* ignore */ }
}

export function spiixDecorate(url: string): string {
  try {
    const u = new URL(url, window.location.href);
    if (u.hostname === window.location.hostname) return url;
    if (!ESTATE_HOSTS.test(u.hostname)) return url;
    const did = posthog.get_distinct_id();
    if (did && !u.searchParams.get("ph_did")) u.searchParams.set("ph_did", did);
    return u.toString();
  } catch { return url; }
}

export function spiixDistinctId(): string | null {
  try { return posthog.get_distinct_id(); } catch { return null; }
}

export { posthog };
