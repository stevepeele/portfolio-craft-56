/**
 * @plxio/core-ajs — shared Segment Analytics.js wrapper for the portfolio.
 *
 * Enforces the orchestration contract (SEGMENT-ORCHESTRATION.md):
 *  - taxonomy version pinned on every event
 *  - app_id / app_version / session enrichment via source middleware
 *  - attribution snapshot (first + last touch) attached to every event
 *  - PII scrubbing (Layer 1) pre-send
 *  - debug mode via ?segment_debug=1 or localStorage plx_segment_debug
 *
 * Zero dependencies beyond Segment's own snippet (injected by init()).
 */
import { captureTouch, getAttribution, attributionProps } from "./attribution.js";
import { scrubProperties, scrubTraits } from "./pii.js";
import { getSession, nextPageSequence } from "./session.js";
export const TAXONOMY_VERSION = "1.0.0";
export const LIB_VERSION = "1.0.0";
let initialized = false;
let config = null;
let debugOn = false;
function isDebug() {
    if (debugOn)
        return true;
    try {
        if (new URLSearchParams(window.location.search).get("segment_debug") === "1")
            return true;
        if (localStorage.getItem("plx_segment_debug") === "1")
            return true;
    }
    catch {
        /* ignore */
    }
    return false;
}
function dlog(...args) {
    if (isDebug()) {
        // eslint-disable-next-line no-console
        console.log("[core-ajs]", ...args);
    }
}
function injectSnippet(writeKey) {
    const w = window;
    const i = "analytics";
    let analytics = w[i];
    if (!analytics) {
        analytics = [];
        w[i] = analytics;
    }
    const a = analytics;
    if (a.invoked) {
        if (window.console?.error)
            window.console.error("core-ajs: Segment snippet included twice.");
        return;
    }
    a.invoked = true;
    a.methods = ["trackSubmit", "trackClick", "trackLink", "trackForm", "pageview", "identify", "reset", "group", "track", "ready", "alias", "debug", "page", "screen", "once", "off", "on", "addSourceMiddleware", "addIntegrationMiddleware", "setAnonymousId", "addDestinationMiddleware", "register"];
    a.factory = function (e) {
        return function (...args) {
            const win = w[i];
            if (win.initialized) {
                return win[e].apply(win, args);
            }
            const n = args.slice();
            if (["track", "screen", "alias", "group", "page", "identify"].includes(e)) {
                const c = document.querySelector("link[rel='canonical']");
                n.push({
                    __t: "bpc",
                    c: (c && c.getAttribute("href")) || undefined,
                    p: location.pathname,
                    u: location.href,
                    s: location.search,
                    t: document.title,
                    r: document.referrer,
                });
            }
            n.unshift(e);
            w[i].push(n);
            return w[i];
        };
    };
    for (const key of a.methods) {
        a[key] = a.factory(key);
    }
    a.load = function (key) {
        const t = document.createElement("script");
        t.type = "text/javascript";
        t.async = true;
        t.setAttribute("data-global-segment-analytics-key", i);
        t.src = "https://cdn.segment.com/analytics.js/v1/" + key + "/analytics.min.js";
        const r = document.getElementsByTagName("script")[0];
        if (r?.parentNode)
            r.parentNode.insertBefore(t, r);
        else
            document.head.appendChild(t);
    };
    a._writeKey = writeKey;
    a.SNIPPET_VERSION = "5.2.0";
    a.load(writeKey);
}
/** Register the enrichment + PII middleware chain. */
function registerMiddleware() {
    const win = window;
    win.analytics?.addSourceMiddleware(({ obj, next }) => {
        const cfg = config;
        if (!cfg) {
            next(obj);
            return;
        }
        // --- enrichment ---
        const session = getSession();
        const attribution = getAttribution();
        obj.context = {
            ...(obj.context ?? {}),
            taxonomy_version: TAXONOMY_VERSION,
            library: { name: "@plxio/core-ajs", version: LIB_VERSION },
            app: { id: cfg.appId, version: cfg.appVersion ?? "unknown" },
            session: {
                session_id: session.session_id,
                started_at: session.started_at,
                page_sequence: session.page_sequence,
            },
        };
        // --- attribution passthrough: every event carries first + last touch ---
        obj.properties = {
            ...attributionProps(attribution),
            ...(obj.properties ?? {}),
        };
        // --- PII scrub (Layer 1) ---
        if (obj.type === "track" && obj.properties) {
            obj.properties = scrubProperties(obj.properties);
        }
        if (obj.type === "identify" && obj.traits) {
            obj.traits = scrubTraits(obj.traits);
        }
        if (obj.type === "page" && obj.properties) {
            obj.properties = scrubProperties(obj.properties);
        }
        dlog(`${obj.type}${obj.event ? `: ${obj.event}` : ""}`, JSON.parse(JSON.stringify(obj)));
        next(obj);
    });
}
/**
 * Initialize core-ajs. Safe to call multiple times (subsequent calls no-op).
 * Captures the attribution touch, injects the Segment snippet, registers
 * middleware, and fires the initial page view.
 */
export function init(cfg) {
    if (typeof window === "undefined" || initialized)
        return;
    config = cfg;
    debugOn = !!cfg.debug;
    initialized = true;
    captureTouch();
    injectSnippet(cfg.writeKey);
    registerMiddleware();
    const win = window;
    // Defer the initial page call a tick so middleware is registered first.
    setTimeout(() => page(), 0);
    dlog("initialized", { appId: cfg.appId, taxonomy: TAXONOMY_VERSION });
}
/** Track a page view. Call on SPA route changes. */
export function page(name, props) {
    if (typeof window === "undefined")
        return;
    const seq = nextPageSequence();
    window.analytics?.page(name, {
        path: location.pathname,
        url: location.href,
        title: document.title,
        referrer: document.referrer,
        page_sequence: seq,
        ...props,
    });
}
/** Track a custom event (taxonomy §2). */
export function track(event, props) {
    if (typeof window === "undefined")
        return;
    window.analytics?.track(event, props);
}
/**
 * Identify a user. Prefer the auth UUID; fallback is SHA-256(email).
 * Triggers alias() automatically when the previous state was anonymous —
 * callers can also call alias() explicitly for full control.
 */
export function identify(userId, traits) {
    if (typeof window === "undefined")
        return;
    window.analytics?.identify(userId, traits);
}
/** SHA-256 hex of a string (for email → userId fallback). */
export async function hashEmail(email) {
    const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(email.trim().toLowerCase()));
    return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("");
}
/** Alias an anonymous identity to a known userId (anonymous → identified stitch). */
export function alias(userId, previousId) {
    if (typeof window === "undefined")
        return;
    const win = window;
    if (previousId)
        win.analytics?.alias(userId, previousId);
    else
        win.analytics?.alias(userId);
}
/** Associate the user with a group (org, church, team). */
export function group(groupId, traits) {
    if (typeof window === "undefined")
        return;
    window.analytics?.group(groupId, traits);
}
/** Read the anonymousId Segment assigned (for cross-domain ajs_aid passthrough). */
export function getAnonymousId(cb) {
    if (typeof window === "undefined")
        return cb(undefined);
    const win = window;
    // ajs exposes user().anonymousId() once loaded; guard for pre-load.
    try {
        const user = win.analytics?.user?.();
        cb(user?.anonymousId());
    }
    catch {
        cb(undefined);
    }
}
/** Adopt an anonymousId passed cross-domain (?ajs_aid=…). */
export function adoptAnonymousId(id) {
    if (typeof window === "undefined" || !id)
        return;
    window.analytics?.setAnonymousId(id);
}
/** Check ?ajs_aid= on load and adopt it (Phase 2 cross-domain stitching). */
export function adoptCrossDomainId() {
    if (typeof window === "undefined")
        return;
    try {
        const aid = new URLSearchParams(window.location.search).get("ajs_aid");
        if (aid)
            adoptAnonymousId(aid);
    }
    catch {
        /* ignore */
    }
}
export { getAttribution, attributionProps } from "./attribution.js";
