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
const LS_FIRST = "plx_attr_first";
const LS_LAST = "plx_attr_last";
const COOKIE = "plx_attr";
const COOKIE_DAYS = 365;
const CLICK_IDS = ["gclid", "fbclid", "msclkid", "ttclid", "li_fat_id"];
const UTM_PARAMS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"];
const SOCIAL_DOMAINS = new Set([
    "x.com", "twitter.com", "facebook.com", "instagram.com", "linkedin.com",
    "tiktok.com", "youtube.com", "reddit.com", "threads.net", "pinterest.com",
]);
const SEARCH_DOMAINS = new Set([
    "google.com", "bing.com", "duckduckgo.com", "yahoo.com", "baidu.com",
    "yandex.com", "ecosia.org",
]);
function getParam(url, name) {
    const v = url.searchParams.get(name);
    return v === null || v === "" ? undefined : v;
}
function domainOf(ref) {
    try {
        return new URL(ref).hostname.replace(/^www\./, "");
    }
    catch {
        return "";
    }
}
function isSearchDomain(d) {
    for (const s of SEARCH_DOMAINS)
        if (d === s || d.endsWith("." + s))
            return true;
    return false;
}
function isSocialDomain(d) {
    for (const s of SOCIAL_DOMAINS)
        if (d === s || d.endsWith("." + s))
            return true;
    return false;
}
/**
 * Pure function: parse a touch from a URL + referrer + timestamp.
 * Exported for unit testing — no DOM access.
 */
export function parseTouch(href, referrer, nowIso) {
    let url;
    try {
        url = new URL(href);
    }
    catch {
        return null;
    }
    const touch = {
        referrer,
        referring_domain: domainOf(referrer),
        landing_page: href,
        landing_path: url.pathname,
        touch_timestamp: nowIso ?? new Date().toISOString(),
        touch_type: "direct",
    };
    for (const p of UTM_PARAMS) {
        const v = getParam(url, p);
        if (v)
            touch[p] = v;
    }
    for (const p of CLICK_IDS) {
        const v = getParam(url, p);
        if (v)
            touch[p] = v;
    }
    const hasClickId = CLICK_IDS.some((p) => touch[p]);
    const utmMedium = (touch.utm_medium ?? "").toLowerCase();
    if (hasClickId || utmMedium === "cpc" || utmMedium === "ppc" || utmMedium === "paid" || utmMedium === "paid-social") {
        touch.touch_type = "paid";
    }
    else if (utmMedium === "email" || utmMedium === "newsletter") {
        touch.touch_type = "email";
    }
    else if (touch.referring_domain && isSearchDomain(touch.referring_domain)) {
        touch.touch_type = "organic";
    }
    else if (touch.referring_domain && isSocialDomain(touch.referring_domain)) {
        touch.touch_type = "social";
    }
    else if (touch.referring_domain) {
        touch.touch_type = "referral";
    }
    else if (touch.utm_source) {
        // UTM-tagged but no referrer (e.g. QR code, typed link) — classify by medium
        touch.touch_type = utmMedium === "social" ? "social" : "referral";
    }
    return touch;
}
/**
 * Does this touch carry any signal worth recording as a new "last" touch?
 * Direct visits with no referrer and no params don't overwrite last-touch
 * (prevents direct traffic from stealing credit from the real source).
 */
export function isMeaningfulTouch(t) {
    return !!(t.utm_source ||
        t.utm_medium ||
        t.utm_campaign ||
        t.gclid || t.fbclid || t.msclkid || t.ttclid || t.li_fat_id ||
        t.referrer);
}
function readLS(key) {
    try {
        const raw = localStorage.getItem(key);
        return raw ? JSON.parse(raw) : null;
    }
    catch {
        return null;
    }
}
function writeLS(key, t) {
    try {
        localStorage.setItem(key, JSON.stringify(t));
    }
    catch {
        /* storage full or blocked — non-fatal */
    }
}
function writeCookie(snapshot) {
    try {
        const val = encodeURIComponent(JSON.stringify(snapshot));
        const exp = new Date(Date.now() + COOKIE_DAYS * 864e5).toUTCString();
        document.cookie = `${COOKIE}=${val}; expires=${exp}; path=/; SameSite=Lax`;
    }
    catch {
        /* cookies blocked — non-fatal */
    }
}
/**
 * Capture the current touch. Call on init (and on SPA route changes if you
 * want mid-session touch updates — last-touch only, first is immutable).
 */
export function captureTouch() {
    const snapshot = {
        first: readLS(LS_FIRST),
        last: readLS(LS_LAST),
    };
    const touch = parseTouch(window.location.href, document.referrer);
    if (!touch) {
        writeCookie(snapshot);
        return snapshot;
    }
    if (!snapshot.first) {
        snapshot.first = touch;
        writeLS(LS_FIRST, touch);
    }
    if (isMeaningfulTouch(touch)) {
        snapshot.last = touch;
        writeLS(LS_LAST, touch);
    }
    else if (!snapshot.last) {
        // Very first visit was direct — still record it so last isn't null.
        snapshot.last = touch;
        writeLS(LS_LAST, touch);
    }
    writeCookie(snapshot);
    return snapshot;
}
/** Read the current snapshot without capturing a new touch. */
export function getAttribution() {
    return { first: readLS(LS_FIRST), last: readLS(LS_LAST) };
}
/** Flattened properties object attached to every event. */
export function attributionProps(s) {
    const out = {};
    if (s.first) {
        out["attribution_first_source"] = s.first.utm_source ?? s.first.referring_domain ?? "(direct)";
        out["attribution_first_medium"] = s.first.utm_medium ?? s.first.touch_type;
        out["attribution_first_campaign"] = s.first.utm_campaign;
        out["attribution_first_touch_at"] = s.first.touch_timestamp;
        out["attribution_first_landing_path"] = s.first.landing_path;
    }
    if (s.last) {
        out["attribution_last_source"] = s.last.utm_source ?? s.last.referring_domain ?? "(direct)";
        out["attribution_last_medium"] = s.last.utm_medium ?? s.last.touch_type;
        out["attribution_last_campaign"] = s.last.utm_campaign;
        out["attribution_last_touch_at"] = s.last.touch_timestamp;
        out["attribution_last_landing_path"] = s.last.landing_path;
    }
    return out;
}
