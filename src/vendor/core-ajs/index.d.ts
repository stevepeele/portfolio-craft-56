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
export declare const TAXONOMY_VERSION = "1.0.0";
export declare const LIB_VERSION = "1.0.0";
export interface CoreAjsConfig {
    /** Segment write key for the source. */
    writeKey: string;
    /** App identifier from the orchestration doc §7 (e.g. "stevepeeleii", "binsly"). */
    appId: string;
    /** App version string (e.g. package version or git sha). */
    appVersion?: string;
    /** Enable console debug logging of every payload pre-send. */
    debug?: boolean;
    /** Session timeout in ms (default 30 min). */
    sessionTimeoutMs?: number;
}
/**
 * Initialize core-ajs. Safe to call multiple times (subsequent calls no-op).
 * Captures the attribution touch, injects the Segment snippet, registers
 * middleware, and fires the initial page view.
 */
export declare function init(cfg: CoreAjsConfig): void;
/** Track a page view. Call on SPA route changes. */
export declare function page(name?: string, props?: Record<string, unknown>): void;
/** Track a custom event (taxonomy §2). */
export declare function track(event: string, props?: Record<string, unknown>): void;
/**
 * Identify a user. Prefer the auth UUID; fallback is SHA-256(email).
 * Triggers alias() automatically when the previous state was anonymous —
 * callers can also call alias() explicitly for full control.
 */
export declare function identify(userId: string, traits?: Record<string, unknown>): void;
/** SHA-256 hex of a string (for email → userId fallback). */
export declare function hashEmail(email: string): Promise<string>;
/** Alias an anonymous identity to a known userId (anonymous → identified stitch). */
export declare function alias(userId: string, previousId?: string): void;
/** Associate the user with a group (org, church, team). */
export declare function group(groupId: string, traits?: Record<string, unknown>): void;
/** Read the anonymousId Segment assigned (for cross-domain ajs_aid passthrough). */
export declare function getAnonymousId(cb: (id: string | undefined) => void): void;
/** Adopt an anonymousId passed cross-domain (?ajs_aid=…). */
export declare function adoptAnonymousId(id: string): void;
/** Check ?ajs_aid= on load and adopt it (Phase 2 cross-domain stitching). */
export declare function adoptCrossDomainId(): void;
export { getAttribution, attributionProps } from "./attribution.js";
export type { AttributionTouch, AttributionSnapshot } from "./attribution.js";
//# sourceMappingURL=index.d.ts.map