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

const WRITE_KEY = "nVAni0C30OpRgeXayoLejzUCGTPxuuAG";
const APP_ID = "stevepeeleii";

/** Initialize Segment. Safe to call multiple times (core-ajs no-ops after first). */
export function initSegment() {
  if (typeof window === "undefined") return;
  coreInit({
    writeKey: WRITE_KEY,
    appId: APP_ID,
    appVersion: "1.0.0",
    debug: false,
  });
}

/** Track a page view (call on route changes). */
export function segmentPage(name?: string, props?: Record<string, unknown>) {
  corePage(name, props);
}

/** Track a custom event (taxonomy: past tense, Title Case). */
export function track(event: string, props?: Record<string, unknown>) {
  coreTrack(event, props);
}

/**
 * Identify a user. Pass the auth UUID when available; otherwise pass an
 * email and we'll hash it. Automatically aliases the anonymous identity.
 */
export async function identify(idOrEmail: string, traits?: Record<string, unknown>) {
  const userId = idOrEmail.includes("@") ? await hashEmail(idOrEmail) : idOrEmail;
  coreAlias(userId);
  coreIdentify(userId, traits);
}

/** Alias an anonymous identity to a known userId. */
export function alias(userId: string, previousId?: string) {
  coreAlias(userId, previousId);
}

/** Associate the user with a group (org, team). */
export function group(groupId: string, traits?: Record<string, unknown>) {
  coreGroup(groupId, traits);
}

export { hashEmail };

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
