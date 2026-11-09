/**
 * Analytics event API for the main site (SPIIX-1227, 2026-11-09).
 *
 * This module used to be the Segment wrapper (core-ajs). Segment is out of
 * the critical path by Steve's decision: PostHog project 613918 is the single
 * pipe, initialized once at the app root via the standard module
 * (src/lib/spiix-posthog.ts, initSpiix). No Segment client code loads or
 * initializes on this property anymore; the vendored core-ajs bundle is
 * unreferenced and ships nothing.
 *
 * The exported signatures are preserved so existing call sites keep working;
 * every helper now routes to PostHog through the standard module, which
 * attaches org / brand / property_id / surface / env / taxonomy_version and
 * the first and last touch attribution snapshots to every event.
 *
 * Usage:
 *   import { track } from "@/lib/segment";
 *   track("CTA Clicked", { cta: "Try Stampd", location: "hacking/stampd hero" });
 */

import {
  spiixTrack,
  spiixIdentify,
  posthog,
} from "./spiix-posthog";

/** SHA-256 hex of the lowercase email. The only form an email may take as a userId. */
export async function hashEmail(email: string): Promise<string> {
  const data = new TextEncoder().encode(email.trim().toLowerCase());
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function markIdentified() {
  try {
    sessionStorage.setItem("spiix_identified", "1");
  } catch {
    /* ignore */
  }
}

/**
 * Deprecated no-op kept for call-site compatibility. PostHog initialization
 * happens once in src/routes/__root.tsx via initSpiix; there is no Segment
 * snippet to inject anymore.
 */
export function initSegment() {
  /* PostHog is the single pipe; see src/lib/spiix-posthog.ts */
}

/** Named page view helper. Plain route pageviews are captured by the standard module. */
export function segmentPage(name?: string, props?: Record<string, unknown>) {
  if (name) spiixTrack("Page Viewed", { name, ...(props || {}) });
}

/** Track a custom event (taxonomy: past tense, Title Case). */
export function track(event: string, props?: Record<string, unknown>) {
  spiixTrack(event, props);
}

/**
 * Identify a user. Pass the auth UUID when available; otherwise pass an
 * email and it is SHA-256 hashed first. Never identifies by raw email.
 * The standard module aliases the anonymous identity before identifying.
 */
export async function identify(idOrEmail: string, traits?: Record<string, unknown>) {
  const userId = idOrEmail.includes("@") ? await hashEmail(idOrEmail) : idOrEmail;
  spiixIdentify(userId, traits);
  markIdentified();
}

/**
 * Identify from an email capture or signup form: userId is the SHA-256 hash
 * of the lowercase email, never the raw email.
 */
export async function identifyByEmail(email: string, traits?: Record<string, unknown>) {
  const cleaned = email.trim().toLowerCase();
  if (!cleaned.includes("@")) return;
  const userId = await hashEmail(cleaned);
  spiixIdentify(userId, { email: cleaned, ...(traits || {}) });
  markIdentified();
}

/** Alias an anonymous identity to a known userId. */
export function alias(userId: string, previousId?: string) {
  try {
    if (previousId) posthog.alias(userId, previousId);
  } catch {
    /* analytics must never break the site */
  }
}

/** Associate the user with a group (org, team). */
export function group(groupId: string, traits?: Record<string, unknown>) {
  try {
    posthog.group("company", groupId, traits);
  } catch {
    /* analytics must never break the site */
  }
}

// ---------- App-specific event helpers (signatures unchanged) ----------

/** Fire when a "try it" / primary CTA is clicked. */
export function trackCta(cta: string, location: string, destination?: string) {
  track("CTA Clicked", { cta, location, destination });
}

/** Fire when an app card/property is clicked. */
export function trackAppCard(app: string, location: string) {
  track("App Card Clicked", { app, location });
}

/** Fire on email captures (newsletter, waitlists, lead forms). */
export function trackEmailCapture(form: string, location: string) {
  track("Email Captured", { form, location });
}

/** Fire when someone starts the SPIIX signal flow. */
export function trackSignalStart(location: string) {
  track("Signal Flow Started", { location });
}

/** Fire when a form is first interacted with. */
export function trackFormStart(form: string, location: string) {
  track("Form Started", { form, location });
}

/** Fire when a form submits successfully. */
export function trackFormComplete(form: string, location: string) {
  track("Form Completed", { form, location });
}

/** Fire when a step of the SPIIX connect flow completes. */
export function trackSignalStep(step: string) {
  track("Signal Step Completed", { step });
}

/** Fire when a SPIIX flow finishes (signal unlock or connect brief ready). */
export function trackSignalComplete(flow: string) {
  track("Signal Flow Completed", { flow });
}

/** Fire on /sprint booking CTA clicks. */
export function trackSprintCta(cta: string, section: string, destination: string) {
  track("Sprint CTA Clicked", { cta, section, destination });
}

/** Fire on /faith booking CTA clicks. */
export function trackFaithCta(cta: string, section: string, destination: string) {
  track("Faith CTA Clicked", { cta, section, destination });
}

/** Fire once when a money page's price section scrolls into view (funnel: view → pricing → CTA). */
export function trackPricingViewed(page: "sprint" | "faith", price: string) {
  track("Pricing Viewed", { page, price });
}

/** Fire on /sprint firm preview link clicks. */
export function trackSprintPreview(firm: string, url: string) {
  track("Sprint Preview Clicked", { firm, url });
}
