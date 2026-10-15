/**
 * Session management — session ID with timeout + page sequence numbering.
 */
export interface Session {
    session_id: string;
    started_at: string;
    last_activity_at: string;
    page_sequence: number;
}
/**
 * Get the current session, rolling it if timed out.
 * Call on every page/track to keep last_activity_at fresh.
 */
export declare function getSession(): Session;
/** Increment the page sequence (call on each page view). Returns the new number. */
export declare function nextPageSequence(): number;
/** Force-start a new session (e.g. after login, if you want login-scoped sessions). */
export declare function resetSession(): Session;
//# sourceMappingURL=session.d.ts.map