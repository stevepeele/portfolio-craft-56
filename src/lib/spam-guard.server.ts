/**
 * Server-side spam validation for public lead forms (PLX-76).
 *
 * Mirrors the client-side useSpamGuard checks independently of the browser:
 * a bot POSTing directly to the server fn bypasses all client guards, so the
 * backend re-verifies the honeypot, the time-to-submit, and a per-IP rate
 * limit before anything is stored.
 *
 * Rejections are silent (return { stored: false }, never throw) so automated
 * submitters can't distinguish a block from a success. No CAPTCHA — zero
 * friction for humans stays the rule.
 */
import { getRequestIP } from "@tanstack/react-start/server";

/** Minimum ms between form mount and submit. Below this = bot. */
const MIN_FILL_MS = 3000;
/** Submissions claiming an older mount than this are stale/replayed. */
const MAX_AGE_MS = 24 * 60 * 60 * 1000;
/** Sliding window for the per-IP rate limit. */
const WINDOW_MS = 10 * 60 * 1000;
/** Max submissions per IP per form within the window. */
const MAX_PER_WINDOW = 5;

export type GuardFields = {
  honeypot?: string | undefined;
  formStartedAt?: number | undefined;
};

// In-memory per-IP sliding window. Best-effort on serverless (instances are
// ephemeral and don't share memory): it still stops burst abuse against any
// single warm instance, and the Supabase upsert's idempotency on the client-
// generated UUID means replays can't duplicate rows.
const buckets = new Map<string, number[]>();

/** Returns true when the submission looks like spam and must be dropped. */
export function serverSpamCheck(input: GuardFields, formId: string): boolean {
  // Honeypot filled = bot.
  if ((input.honeypot ?? "").trim() !== "") return true;

  // Time check: missing, future, impossibly fast, or stale mount = bot.
  const started = input.formStartedAt;
  const now = Date.now();
  if (
    typeof started !== "number" ||
    !Number.isFinite(started) ||
    started > now ||
    now - started < MIN_FILL_MS ||
    now - started > MAX_AGE_MS
  ) {
    return true;
  }

  // Per-IP rate limit (Vercel sits behind a trusted proxy, X-Forwarded-For is reliable).
  const ip = getRequestIP({ xForwardedFor: true }) ?? "unknown";
  const key = `${formId}:${ip}`;
  const times = (buckets.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  if (times.length >= MAX_PER_WINDOW) return true;
  times.push(now);
  buckets.set(key, times);

  return false;
}
