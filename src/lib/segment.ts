/**
 * Segment analytics — now powered by @plxio/core-ajs.
 *
 * This module is the app-specific wrapper: it initializes core-ajs with this
 * app's config and re-exports the shared helpers. All event helpers from the
 * old hand-rolled implementation are preserved with identical signatures.
 *
 * Orchestration doc: ~/workspace/analytics/SEGMENT-ORCHESTRATION.md
 * Library source:    ~/workspace/analytics/core-ajs/
 * Vendored build:    ./vendor/core-ajs/ (rebuild from source when it changes)
 *
 * Usage:
 *   import { track } from "@/lib/segment";
 *   track("CTA Clicked", { cta: "Try Stampd", location: "hacking/stampd hero" });
 */

import {
  init as coreInit,
  page as corePage,
  track as coreTrack,
  identify as coreIdentify,
  alias as coreAlias,
  group as coreGroup,
  hashEmail,
} from "../vendor/core-ajs/index";
import { phCapture, phIdentify } from "./posthog-client";
import { standardProps } from "./analytics-context";

const WRITE_KEY = "nVAni0C30OpRgeXayoLejzUCGTPxuuAG";
const APP_ID = "stevepeeleii";

/** Initialize Segment. Safe to call multiple times (core-ajs no-ops after first). */
export function initSegment() {
  if (typeof window === "undefined") return;
  coreInit({ writeKey: WRITE_KEY, appId: APP_ID, appVersion: "2.0.0", debug: false });
}

/** Page view -> Segment page() + PostHog $pageview, both with standard props. */
export function segmentPage(name?: string, props?: Record<string, unknown>) {
  const p = { ...standardProps(), ...props };
  corePage(name, p);
  phCapture("$pageview", { ...p, page_name: name });
}

/**
 * Track v2 (Object Action, Title Case, past tense; props snake_case).
 * Sends to Segment (unchanged path) AND PostHog directly, with standard props:
 * site, app, environment, page_path, page_type, utm_* (first + last touch).
 */
export function track(event: string, props?: Record<string, unknown>) {
  const p = { ...standardProps(), ...props, taxonomy_version: 2 };
  coreTrack(event, p);
  phCapture(event, p);
}

/** Identify with SHA-256(email) — never send raw email. */
export async function identify(idOrEmail: string, traits?: Record<string, unknown>) {
  const userId = idOrEmail.includes("@") ? await hashEmail(idOrEmail) : idOrEmail;
  const safe = { ...traits };
  delete (safe as Record<string, unknown>).email;
  coreAlias(userId);
  coreIdentify(userId, safe);
  phIdentify(userId, safe);
}

export function alias(userId: string, previousId?: string) { coreAlias(userId, previousId); }
export function group(groupId: string, traits?: Record<string, unknown>) { coreGroup(groupId, traits); }
export { hashEmail };

// ---------- Helpers (signatures unchanged; emit v2 names) ----------

function deriveFunnel(destination: string | undefined, location: string) {
  if (!destination) return;
  if (/cal\.com|meet\.stevepeeleii\.com/.test(destination)) trackBookingStarted("sprint-call", location);
  if (/buy\.stripe\.com|checkout\.stripe\.com/.test(destination)) trackCheckoutStarted("intake_audit", undefined, destination);
}
export function trackCta(cta: string, location: string, destination?: string) {
  track("CTA Clicked", { cta_label: cta, cta_location: location, destination_url: destination });
  deriveFunnel(destination, location);
}
export function trackAppCard(app: string, location: string) {
  track("CTA Clicked", { cta_label: app, cta_location: location, cta_type: "app_card" });
}
/** Lead capture: Form Submitted + Lead Captured + identify(hashed email). */
export async function trackLead(form: string, location: string, leadType: string, email?: string, traits?: Record<string, unknown>) {
  track("Form Submitted", { form_id: form, form_location: location });
  track("Lead Captured", { form_id: form, form_location: location, lead_type: leadType });
  if (email && email.includes("@")) {
    try { await identify(email, { ...traits, lead_type: leadType, first_form: form }); } catch { /* never break */ }
  }
}
/** @deprecated use trackLead — kept for callers; now emits Lead Captured. */
export function trackEmailCapture(form: string, location: string) {
  track("Lead Captured", { form_id: form, form_location: location, lead_type: form });
}
export function trackSignalStart(location: string) {
  track("Form Started", { form_id: "signal", form_location: location });
}
export function trackFormStart(form: string, location: string) {
  track("Form Started", { form_id: form, form_location: location });
}
export function trackFormComplete(form: string, location: string) {
  track("Form Submitted", { form_id: form, form_location: location });
}
export function trackSignalStep(step: string) { track("Signal Step Completed", { step }); }
export function trackSignalComplete(flow: string) { track("Signal Flow Completed", { flow }); }
export function trackSprintCta(cta: string, section: string, destination: string) {
  track("CTA Clicked", { cta_label: cta, cta_location: section, destination_url: destination, offer: "sprint" });
  deriveFunnel(destination, section);
}
export function trackFaithCta(cta: string, section: string, destination: string) {
  track("CTA Clicked", { cta_label: cta, cta_location: section, destination_url: destination, offer: "faith" });
  deriveFunnel(destination, section);
}
export function trackPricingViewed(page: string, price: string) {
  const n = Number(String(price).replace(/[^0-9.]/g, ""));
  track("Pricing Viewed", { offer: page, price_label: price, price_usd: Number.isFinite(n) && n > 0 ? n : undefined });
}
export function trackSprintPreview(firm: string, url: string) {
  track("CTA Clicked", { cta_label: firm, cta_location: "sprint previews", destination_url: url, cta_type: "preview" });
}
export function trackCheckoutStarted(product: string, priceUsd: number | undefined, destination: string) {
  track("Checkout Started", { product, price_usd: priceUsd, destination_url: destination });
}
export function trackBookingStarted(calendar: string, location: string) {
  track("Booking Started", { calendar, cta_location: location });
}
