/**
 * PII scrubbing — Layer 1 of the defense-in-depth PII policy.
 * Runs in source middleware, pre-send, on every event's properties + traits.
 */
const EMAIL_RE = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
const PHONE_RE = /(?:\+?1[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/g;
/** Property keys that must never be sent, in any casing. */
const DENIED_KEYS = new Set([
    "ssn", "social_security", "socialsecurity",
    "password", "passwd", "pwd",
    "credit_card", "creditcard", "card_number", "cardnumber", "cc_number",
    "cvv", "cvc", "expiry", "expiration",
    "bank_account", "routing_number",
    "api_key", "apikey", "secret", "token",
]);
/** Traits allowed to carry email/phone — everything else gets scrubbed. */
const IDENTITY_TRAIT_ALLOWLIST = new Set(["email", "phone", "name", "firstName", "lastName", "username"]);
function isDeniedKey(key) {
    return DENIED_KEYS.has(key.toLowerCase().replace(/[^a-z]/g, ""));
}
function scrubString(s) {
    return s.replace(EMAIL_RE, "[redacted-email]").replace(PHONE_RE, "[redacted-phone]");
}
/**
 * Deep-scrub an arbitrary value. Returns a scrubbed copy; never mutates input.
 * - strings: redact email/phone patterns
 * - denied keys: dropped entirely
 * - query-like keys ("query", "q", "search", "prompt", "message", "question"):
 *   replaced with { <key>_length: n } to preserve analytics value without content
 */
const QUERY_KEYS = new Set(["query", "q", "search", "search_query", "prompt", "message", "question", "input", "text_query"]);
export function scrubValue(value, key) {
    if (value === null || value === undefined)
        return value;
    if (typeof value === "string") {
        if (key && QUERY_KEYS.has(key.toLowerCase())) {
            return { [`${key}_length`]: value.length };
        }
        return scrubString(value);
    }
    if (Array.isArray(value)) {
        return value.map((v) => scrubValue(v));
    }
    if (typeof value === "object") {
        const out = {};
        for (const [k, v] of Object.entries(value)) {
            if (isDeniedKey(k))
                continue; // drop denied keys entirely
            const scrubbed = scrubValue(v, k);
            // scrubValue may return { key_length: n } for query keys — merge it
            if (scrubbed !== null && typeof scrubbed === "object" && !Array.isArray(scrubbed)) {
                const entries = Object.entries(scrubbed);
                if (entries.length === 1 && entries[0][0].endsWith("_length")) {
                    out[entries[0][0]] = entries[0][1];
                    continue;
                }
            }
            out[k] = scrubbed;
        }
        return out;
    }
    return value;
}
/** Scrub event properties (L1). Query keys become length-only. */
export function scrubProperties(props) {
    if (!props)
        return {};
    return scrubValue(props);
}
/**
 * Scrub identify traits. Email/phone/name are allowed through (they belong
 * in traits, hashed downstream); everything else gets the same treatment
 * as properties.
 */
export function scrubTraits(traits) {
    if (!traits)
        return {};
    const out = {};
    for (const [k, v] of Object.entries(traits)) {
        if (isDeniedKey(k))
            continue;
        if (IDENTITY_TRAIT_ALLOWLIST.has(k)) {
            out[k] = v; // identity traits pass through — Segment hashes for ad destinations
            continue;
        }
        out[k] = scrubValue(v, k);
    }
    return out;
}
