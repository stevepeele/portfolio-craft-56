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
    // @ts-expect-error — Segment snippet pattern
    var i = "analytics", analytics = (window[i] = window[i] || []);
    // @ts-expect-error
    if (!analytics.initialize)
      // @ts-expect-error
      if (analytics.invoked) window.console && console.error && console.error("Segment snippet included twice.");
      else {
        // @ts-expect-error
        analytics.invoked = !0;
        // @ts-expect-error
        analytics.methods = ["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","reset","group","track","ready","alias","debug","page","screen","once","off","on","addSourceMiddleware","addIntegrationMiddleware","setAnonymousId","addDestinationMiddleware","register"];
        // @ts-expect-error
        analytics.factory = function (e) {
          return function () {
            // @ts-expect-error
            if (window[i].initialized) return window[i][e].apply(window[i], arguments);
            // @ts-expect-error
            var n = Array.prototype.slice.call(arguments);
            if (["track","screen","alias","group","page","identify"].indexOf(e) > -1) {
              var c = document.querySelector("link[rel='canonical']");
              n.push({ __t: "bpc", c: (c && c.getAttribute("href")) || void 0, p: location.pathname, u: location.href, s: location.search, t: document.title, r: document.referrer });
            }
            n.unshift(e);
            // @ts-expect-error
            analytics.push(n);
            // @ts-expect-error
            return analytics;
          };
        };
        // @ts-expect-error
        for (var n = 0; n < analytics.methods.length; n++) {
          // @ts-expect-error
          var key = analytics.methods[n];
          // @ts-expect-error
          analytics[key] = analytics.factory(key);
        }
        // @ts-expect-error
        analytics.load = function (key, n) {
          var t = document.createElement("script");
          t.type = "text/javascript";
          t.async = !0;
          t.setAttribute("data-global-segment-analytics-key", i);
          t.src = "https://cdn.segment.com/analytics.js/v1/" + key + "/analytics.min.js";
          var r = document.getElementsByTagName("script")[0];
          r.parentNode.insertBefore(t, r);
          // @ts-expect-error
          analytics._loadOptions = n;
        };
        // @ts-expect-error
        analytics._writeKey = WRITE_KEY;
        // @ts-expect-error
        analytics.SNIPPET_VERSION = "5.2.0";
        // @ts-expect-error
        analytics.load(WRITE_KEY);
        // @ts-expect-error
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
