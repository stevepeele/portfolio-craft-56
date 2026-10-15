/**
 * PII scrubbing — Layer 1 of the defense-in-depth PII policy.
 * Runs in source middleware, pre-send, on every event's properties + traits.
 */
export declare function scrubValue(value: unknown, key?: string): unknown;
/** Scrub event properties (L1). Query keys become length-only. */
export declare function scrubProperties(props: Record<string, unknown> | undefined): Record<string, unknown>;
/**
 * Scrub identify traits. Email/phone/name are allowed through (they belong
 * in traits, hashed downstream); everything else gets the same treatment
 * as properties.
 */
export declare function scrubTraits(traits: Record<string, unknown> | undefined): Record<string, unknown>;
//# sourceMappingURL=pii.d.ts.map