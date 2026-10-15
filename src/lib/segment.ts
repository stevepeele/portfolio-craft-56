/**
 * Segment analytics — sitewide tracking with useful events.
 * Write key: nVAni0C30OpRgeXayoLejzUCGTPxuuAG
 *
 * Usage:
 *   import { track } from "@/lib/segment";
 *   track("CTA Clicked", { cta: "Try Stampd", location: "hacking/stampd hero" });
 */

const WRITE_KEY = "nVAni0C30OpRgeXayoLejzUCGTPxuuAG";

declare global {
  interface Window {
    analytics?: {
      page: (name?: string, props?: Record<string, unknown>) => void;
      track: (event: string, props?: Record<string, unknown>) => void;
      identify: (id: string, traits?: Record<string, unknown>) => void;
    };
  }
}

let loaded = false;

/** Inject the Segment snippet. Safe to call multiple times. */
export function initSegment() {
  if (typeof window === "undefined" || loaded) return;
  loaded = true;

  (function () {
    var w: any = window; var i = "analytics", analytics: any = (w[i] = w[i] || []);
    if (!analytics.initialize)
      if (analytics.invoked) window.console && console.error && console.error("Segment snippet included twice.");
      else {
        analytics.invoked = !0;
        analytics.methods = ["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","reset","group","track","ready","alias","debug","page","screen","once","off","on","addSourceMiddleware","addIntegrationMiddleware","setAnonymousId","addDestinationMiddleware","register"];
        analytics.factory = function (e: any) {
          return function () {
            if (w[i].initialized) return w[i][e].apply(w[i], arguments);
            var n = Array.prototype.slice.call(arguments);
            if (["track","screen","alias","group","page","identify"].indexOf(e) > -1) {
              var c = document.querySelector("link[rel='canonical']");
              n.push({ __t: "bpc", c: (c && c.getAttribute("href")) || void 0, p: location.pathname, u: location.href, s: location.search, t: document.title, r: document.referrer });
            }
            n.unshift(e);
            analytics.push(n);
            return analytics;
          };
        };
        for (var n = 0; n < analytics.methods.length; n++) {
          var key = analytics.methods[n];
          analytics[key] = analytics.factory(key);
        }
        analytics.load = function (key: string, n?: any) {
          var t = document.createElement("script");
          t.type = "text/javascript";
          t.async = !0;
          t.setAttribute("data-global-segment-analytics-key", i);
          t.src = "https://cdn.segment.com/analytics.js/v1/" + key + "/analytics.min.js";
          var r = document.getElementsByTagName("script")[0];
          if (r && r.parentNode) r.parentNode.insertBefore(t, r); else document.head.appendChild(t);
          analytics._loadOptions = n;
        };
        analytics._writeKey = WRITE_KEY;
        analytics.SNIPPET_VERSION = "5.2.0";
        analytics.load(WRITE_KEY);
        analytics.page();
      }
  })();
}

/** Track a page view (call on route changes). */
export function segmentPage(name?: string, props?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  window.analytics?.page(name, {
    path: location.pathname,
    url: location.href,
    title: document.title,
    referrer: document.referrer,
    ...props,
  });
}

/** Track a custom event. */
export function track(event: string, props?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  window.analytics?.track(event, props);
}

/** Identify a user (call after email capture / signup). */
export function identify(id: string, traits?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  window.analytics?.identify(id, traits);
}

// ---------- Useful site events ----------

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

/** Fire on /sprint firm preview link clicks. */
export function trackSprintPreview(firm: string, url: string) {
  track("Sprint Preview Clicked", { firm, url });
}
