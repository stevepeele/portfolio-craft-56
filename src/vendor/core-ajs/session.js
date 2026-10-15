/**
 * Session management — session ID with timeout + page sequence numbering.
 */
const LS_SESSION = "plx_session";
const SESSION_TIMEOUT_MS = 30 * 60 * 1000; // 30 minutes of inactivity
function newSession() {
    const now = new Date().toISOString();
    return {
        session_id: crypto.randomUUID(),
        started_at: now,
        last_activity_at: now,
        page_sequence: 0,
    };
}
function readSession() {
    try {
        const raw = localStorage.getItem(LS_SESSION);
        return raw ? JSON.parse(raw) : null;
    }
    catch {
        return null;
    }
}
function writeSession(s) {
    try {
        localStorage.setItem(LS_SESSION, JSON.stringify(s));
    }
    catch {
        /* non-fatal */
    }
}
/**
 * Get the current session, rolling it if timed out.
 * Call on every page/track to keep last_activity_at fresh.
 */
export function getSession() {
    const now = Date.now();
    let s = readSession();
    if (!s || now - new Date(s.last_activity_at).getTime() > SESSION_TIMEOUT_MS) {
        s = newSession();
    }
    s.last_activity_at = new Date(now).toISOString();
    writeSession(s);
    return s;
}
/** Increment the page sequence (call on each page view). Returns the new number. */
export function nextPageSequence() {
    const s = getSession();
    s.page_sequence += 1;
    writeSession(s);
    return s.page_sequence;
}
/** Force-start a new session (e.g. after login, if you want login-scoped sessions). */
export function resetSession() {
    const s = newSession();
    writeSession(s);
    return s;
}
