/**
 * Spam hardening for public forms — honeypot + time-based checks.
 * Zero friction for humans, no CAPTCHA. Bots fill the honeypot or
 * submit impossibly fast; both get silently rejected.
 */
import { useRef, useState } from "react";

/** Minimum seconds a human takes to fill a form. Below this = bot. */
const MIN_FILL_SECONDS = 3;

/** Maximum submissions per form per session before rate-limiting kicks in. */
const MAX_SUBMISSIONS = 5;

export function useSpamGuard(formId: string) {
  const mountedAt = useRef<number>(Date.now());
  const [honeypot, setHoneypot] = useState("");

  /**
   * Returns true if the submission looks like spam.
   * Call at the top of your onSubmit, before any validation or sending.
   */
  function isSpam(): boolean {
    // Honeypot filled = bot
    if (honeypot.trim() !== "") return true;

    // Submitted too fast = bot
    const elapsed = (Date.now() - mountedAt.current) / 1000;
    if (elapsed < MIN_FILL_SECONDS) return true;

    // Rate limit: too many submissions this session
    try {
      const key = `sg_count_${formId}`;
      const count = parseInt(sessionStorage.getItem(key) || "0", 10);
      if (count >= MAX_SUBMISSIONS) return true;
      sessionStorage.setItem(key, String(count + 1));
    } catch {
      /* storage unavailable — skip rate limit */
    }

    return false;
  }

  /** Render this inside your <form>. Invisible to humans, irresistible to bots. */
  function HoneypotField() {
    return (
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "-9999px",
          top: "auto",
          width: "1px",
          height: "1px",
          overflow: "hidden",
        }}
      >
        <label htmlFor={`${formId}-website`}>
          Website
          <input
            id={`${formId}-website`}
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
          />
        </label>
      </div>
    );
  }

  return { isSpam, HoneypotField };
}
