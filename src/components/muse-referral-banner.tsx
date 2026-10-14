import { useEffect, useState } from "react";
import { X } from "lucide-react";

const KEY = "muse-banner-dismissed-v1";

// PLX-424: feature flag — stays OFF until Steve provides the REAL Muse invite
// link from the app share sheet. The href below is a placeholder on purpose:
// never ship a fabricated referral token. To go live: set ENABLED = true and
// replace MUSE_REFERRAL_URL with the real link.
const ENABLED = false;
const MUSE_REFERRAL_URL = "https://muse.ai/join?ref=PLACEHOLDER";

export function MuseReferralBanner() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    setShow(localStorage.getItem(KEY) !== "1");
  }, []);
  if (!ENABLED || !show) return null;
  return (
    <div className="muse-banner">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-5 py-2 text-xs sm:text-sm">
        <span className="muse-banner-tag">Muse</span>
        <p className="min-w-0 flex-1 truncate">
          <strong>Let me give you one billion tokens.</strong>
          <span className="hidden sm:inline">
            {" "}
            The AI toolkit I actually use every day — start with a serious head start.
          </span>
        </p>
        <a
          href={MUSE_REFERRAL_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="muse-banner-link"
        >
          Claim tokens ↑
        </a>
        <button
          type="button"
          aria-label="Dismiss Muse referral banner"
          className="opacity-70 hover:opacity-100"
          onClick={() => {
            localStorage.setItem(KEY, "1");
            setShow(false);
          }}
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
