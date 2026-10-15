/**
 * Attribution capture — parses and persists the full touch snapshot.
 *
 * Two snapshots are maintained:
 *  - first: the very first touch ever (never overwritten)
 *  - last:  the most recent touch (overwritten per session when a new touch arrives)
 *
 * Persisted to localStorage + cookie so it survives across sessions and
 * is available to server-side flows via cookie read.
 */
export interface AttributionTouch {
    utm_source?: string;
    utm_medium?: string;
    utm_campaign?: string;
    utm_term?: string;
    utm_content?: string;
    gclid?: string;
    fbclid?: string;
    msclkid?: string;
    ttclid?: string;
    li_fat_id?: string;
    referrer: string;
    referring_domain: string;
    landing_page: string;
    landing_path: string;
    touch_timestamp: string;
    touch_type: "paid" | "organic" | "social" | "direct" | "referral" | "email";
}
export interface AttributionSnapshot {
    first: AttributionTouch | null;
    last: AttributionTouch | null;
}
/**
 * Pure function: parse a touch from a URL + referrer + timestamp.
 * Exported for unit testing — no DOM access.
 */
export declare function parseTouch(href: string, referrer: string, nowIso?: string): AttributionTouch | null;
/**
 * Does this touch carry any signal worth recording as a new "last" touch?
 * Direct visits with no referrer and no params don't overwrite last-touch
 * (prevents direct traffic from stealing credit from the real source).
 */
export declare function isMeaningfulTouch(t: AttributionTouch): boolean;
/**
 * Capture the current touch. Call on init (and on SPA route changes if you
 * want mid-session touch updates — last-touch only, first is immutable).
 */
export declare function captureTouch(): AttributionSnapshot;
/** Read the current snapshot without capturing a new touch. */
export declare function getAttribution(): AttributionSnapshot;
/** Flattened properties object attached to every event. */
export declare function attributionProps(s: AttributionSnapshot): Record<string, unknown>;
//# sourceMappingURL=attribution.d.ts.map