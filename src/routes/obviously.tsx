import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowDown, Check } from "lucide-react";
import { segmentPage, track, trackEmailCapture } from "@/lib/segment";
import { formsubmitSignalEndpoint } from "@/lib/spiix-leads";
import { obviously_cover as coverImage } from "@/assets/obviously/obviously_cover";
import { obviously_notice as noticeImage } from "@/assets/obviously/obviously_notice";

export const Route = createFileRoute("/obviously")({
  head: () => ({
    meta: [
      { title: "OBVIOUSLY — A book by Steve Peele II" },
      {
        name: "description",
        content:
          "OBVIOUSLY: a book about the things everyone knows and nobody says. Still being written — one email the day it lands.",
      },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "OBVIOUSLY — Steve Peele II" },
      {
        property: "og:description",
        content: "A book about the things everyone knows and nobody says.",
      },
      { property: "og:type", content: "book" },
    ],
    links: [{ rel: "canonical", href: "https://stevepeeleii.com/obviously" }],
  }),
  component: ObviouslyPage,
});

const chapters = [
  { n: "01", title: "The Danger of Assuming Things Are Obvious", line: "The word that ends conversations before they start." },
  { n: "02", title: "I Thought You Knew", line: "An expectation, unspoken, is a disappointment with a head start." },
  { n: "03", title: "Did You See That?", line: "Noticing isn't the same as knowing." },
  { n: "04", title: "The Person Who Needs a Reason", line: "Some people need a why before they can accept a what." },
  { n: "05", title: "We Could Fix This", line: "Measurement is a hammer. Not everything is a nail." },
  { n: "06", title: "One More Thing", line: "The part everyone was waiting to say." },
];

function SignupForm({ compact = false }: { compact?: boolean }) {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [sending, setSending] = useState(false);

  async function handleSubmit(e?: React.FormEvent) {
    e?.preventDefault();
    if (sending) return;
    setSending(true);
    track("Book Signup Clicked", { book: "obviously", location: compact ? "hero" : "cta" });
    if (email.trim()) {
      try {
        await fetch(formsubmitSignalEndpoint, {
          method: "POST",
          keepalive: true,
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({
            _subject: "New OBVIOUSLY signup",
            _template: "table",
            email: email.trim(),
            source: "obviously-book-page",
          }),
        });
        trackEmailCapture("obviously-book", compact ? "hero" : "cta");
      } catch {
        /* never block the reader */
      }
    }
    setDone(true);
    setSending(false);
  }

  if (done) {
    return (
      <div className="obv2-signup-done">
        <span className="obv2-check">
          <Check className="h-4 w-4" />
        </span>
        <p>Done. One email, the day it lands.</p>
      </div>
    );
  }

  return (
    <form className="obv2-signup" onSubmit={handleSubmit}>
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
        className="obv2-input"
        aria-label="Email address"
      />
      <button type="submit" disabled={sending} className="obv2-btn">
        {sending ? "…" : "Notify me"}
      </button>
    </form>
  );
}

function ObviouslyPage() {
  useEffect(() => {
    segmentPage("Obviously Book");
  }, []);

  return (
    <div className="obviously2">
      {/* ── HERO ─────────────────────────────── */}
      <header className="obv2-hero obv2-reveal">
        <p className="obv2-kicker">A book by Steve Peele II</p>
        <h1 className="obv2-title">OBVIOUSLY.</h1>
        <p className="obv2-sub">
          A book about the things everyone knows — and nobody says.
        </p>
        <p className="obv2-lede">
          There is a word we use when we have decided a conversation is over.
          This book is about everything that happens before it ends.
        </p>
        <div className="obv2-cover">
          <img src={coverImage} alt="OBVIOUSLY — book cover" />
        </div>
        <p className="obv2-status">
          Still being written. No money changes hands. One email, the day it
          is ready.
        </p>
        <SignupForm compact />
        <a href="#premise" className="obv2-scroll" aria-label="Scroll down">
          <ArrowDown className="h-4 w-4" />
        </a>
      </header>

      {/* ── THE PREMISE ──────────────────────── */}
      <section id="premise" className="obv2-section obv2-reveal">
        <p className="obv2-section-kicker">This is not that book</p>
        <h2 className="obv2-h2">Not self-help. Not a diagnosis. Recognition.</h2>
        <div className="obv2-prose">
          <p>
            There are enough books explaining how to optimize your morning
            routine while convincing you that you failed morally because you
            didn't meditate before 6 a.m. This isn't one of them.
          </p>
          <p>
            This is a book that says: <em>I see the machinery. I see what it
            costs. I see the two versions of you — and I know which one you've
            been judged by, and I know it's the wrong one.</em>
          </p>
          <p>
            That is not empathy. That is recognition. And recognition, for the
            people who notice everything, is the rarest thing of all — because
            they spend their lives doing it for everyone else, and almost no
            one does it for them.
          </p>
        </div>
        <img
          src={noticeImage}
          alt="An editorial illustration of noticing: a magnifying glass over a field of dots, a few different from the rest"
          className="obv2-figure"
          loading="lazy"
        />
      </section>

      {/* ── CHAPTERS ─────────────────────────── */}
      <section className="obv2-section obv2-reveal">
        <p className="obv2-section-kicker">Inside the book</p>
        <h2 className="obv2-h2">Six chapters drafted. More coming.</h2>
        <ol className="obv2-chapters">
          {chapters.map((c) => (
            <li key={c.n} className="obv2-chapter">
              <span className="obv2-chapter-n">{c.n}</span>
              <div>
                <p className="obv2-chapter-title">{c.title}</p>
                <p className="obv2-chapter-line">{c.line}</p>
              </div>
            </li>
          ))}
        </ol>
        <p className="obv2-prose" style={{ marginTop: "2rem" }}>
          The book is being written across three acts —{" "}
          <em>The Machinery</em>, <em>The Flood</em>, <em>The Return</em> —
          twelve chapters in the end, plus a prologue and an epilogue. The six
          above exist now. The rest is being written in public, one chapter at
          a time.
        </p>
      </section>

      {/* ── EXCERPT ──────────────────────────── */}
      <section className="obv2-section obv2-excerpt obv2-reveal">
        <p className="obv2-section-kicker">An excerpt</p>
        <h2 className="obv2-h2">The People Who Notice</h2>
        <p className="obv2-excerpt-src">From the prologue</p>
        <div className="obv2-prose">
          <p>
            There are people who notice things. Not important things,
            necessarily. That's what makes it interesting. They notice the
            change in somebody's voice. The half-second pause before an answer.
            The fact that somebody said <em>sure</em> instead of{" "}
            <em>yeah</em>. They notice when the typing bubble appears and
            disappears. They notice that the restaurant has changed the
            lighting.
          </p>
          <p>
            They notice. And then they usually pretend they didn't. Because
            noticing everything is socially inconvenient. People generally
            prefer that you notice the things they intended for you to notice.
            Not the things they accidentally revealed.
          </p>
          <p>
            If you point out what someone meant you to see, you're attentive.
            If you point out what slipped out, you're a problem. So the people
            who notice learn to keep it to themselves.
          </p>
        </div>
      </section>

      {/* ── SIGNUP ───────────────────────────── */}
      <section className="obv2-section obv2-cta obv2-reveal">
        <p className="obv2-section-kicker">Get the book</p>
        <h2 className="obv2-h2">Obviously, you'll want to read it.</h2>
        <p className="obv2-prose" style={{ maxWidth: "32rem", margin: "0 auto 2rem" }}>
          The finished book isn't out yet. When it is, one email goes out —
          and that's it. No launch sequence. No countdown timer. No money
          changes hands.
        </p>
        <SignupForm />
        <p className="obv2-fine">No spam. Ever. Unsubscribe whenever.</p>
      </section>

      {/* ── COLOPHON ─────────────────────────── */}
      <footer className="obv2-footer">
        <p className="obv2-footer-title">OBVIOUSLY.</p>
        <p>© 2026 Steve Peele II. All rights reserved.</p>
        <p className="obv2-footer-note">
          First edition, in progress · Set in Fraunces &amp; DM Sans · This
          page is unlisted.
        </p>
      </footer>

      <style>{`
        .obviously2 {
          --obv2-paper: #faf7f0;
          --obv2-ink: #1a1712;
          --obv2-muted: #5c5546;
          --obv2-faint: #8a8172;
          --obv2-line: #e4ddcd;
          --obv2-accent: #b3541e;
          background: var(--obv2-paper);
          color: var(--obv2-ink);
          font-family: "DM Sans", ui-sans-serif, system-ui, sans-serif;
          min-height: 100vh;
        }
        .obv2-reveal {
          animation: obv2-in 0.9s cubic-bezier(0.22, 1, 0.36, 1) both;
          animation-timeline: view();
          animation-range: entry 0% cover 18%;
        }
        @keyframes obv2-in {
          from { opacity: 0; transform: translateY(28px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .obv2-reveal { animation: none; }
          .obv2-scroll { animation: none; }
        }
        .obv2-hero {
          text-align: center;
          padding: 6rem 1.5rem 4rem;
          max-width: 42rem;
          margin: 0 auto;
        }
        .obv2-kicker {
          font-size: 0.72rem;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: var(--obv2-faint);
          margin-bottom: 2rem;
        }
        .obv2-title {
          font-family: "Fraunces", Georgia, serif;
          font-weight: 900;
          font-size: clamp(3.2rem, 11vw, 7rem);
          line-height: 1;
          letter-spacing: -0.02em;
          margin: 0 0 1.5rem;
        }
        .obv2-sub {
          font-family: "Fraunces", Georgia, serif;
          font-style: italic;
          font-size: clamp(1.2rem, 3.2vw, 1.7rem);
          color: var(--obv2-ink);
          margin: 0 0 1.5rem;
          line-height: 1.4;
        }
        .obv2-lede {
          color: var(--obv2-muted);
          font-size: 1.05rem;
          line-height: 1.75;
          max-width: 34rem;
          margin: 0 auto 3rem;
        }
        .obv2-cover {
          max-width: 26rem;
          margin: 0 auto 3rem;
        }
        .obv2-cover img {
          width: 100%;
          height: auto;
          display: block;
          box-shadow: 0 30px 60px -20px rgba(26, 23, 18, 0.35);
        }
        .obv2-status {
          color: var(--obv2-faint);
          font-size: 0.95rem;
          font-style: italic;
          margin: 0 0 1.5rem;
        }
        .obv2-signup {
          display: flex;
          gap: 0.6rem;
          max-width: 26rem;
          margin: 0 auto;
        }
        .obv2-input {
          flex: 1;
          background: #fff;
          border: 1px solid var(--obv2-line);
          border-radius: 999px;
          padding: 0.85rem 1.3rem;
          font-size: 1rem;
          color: var(--obv2-ink);
          min-width: 0;
        }
        .obv2-input:focus { outline: none; border-color: var(--obv2-ink); }
        .obv2-input::placeholder { color: var(--obv2-faint); }
        .obv2-btn {
          background: var(--obv2-ink);
          color: var(--obv2-paper);
          font-weight: 700;
          font-size: 1rem;
          padding: 0.85rem 1.6rem;
          border-radius: 999px;
          border: none;
          cursor: pointer;
          white-space: nowrap;
          transition: transform 0.15s ease, opacity 0.15s ease;
        }
        .obv2-btn:hover { transform: translateY(-2px); }
        .obv2-btn:disabled { opacity: 0.6; cursor: wait; transform: none; }
        .obv2-signup-done {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          color: var(--obv2-muted);
          padding: 0.85rem 0;
        }
        .obv2-check {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 2.25rem;
          height: 2.25rem;
          border-radius: 999px;
          background: var(--obv2-ink);
          color: var(--obv2-paper);
        }
        .obv2-scroll {
          display: inline-flex;
          margin-top: 4rem;
          color: var(--obv2-faint);
          animation: obv2-bob 2.4s ease-in-out infinite;
        }
        @keyframes obv2-bob { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(8px); } }
        .obv2-section {
          max-width: 42rem;
          margin: 0 auto;
          padding: 4.5rem 1.5rem;
        }
        .obv2-section-kicker {
          font-size: 0.72rem;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: var(--obv2-accent);
          margin-bottom: 1.25rem;
        }
        .obv2-h2 {
          font-family: "Fraunces", Georgia, serif;
          font-weight: 800;
          font-size: clamp(1.8rem, 4.8vw, 2.7rem);
          line-height: 1.15;
          letter-spacing: -0.01em;
          margin: 0 0 2rem;
        }
        .obv2-prose { color: var(--obv2-muted); font-size: 1.06rem; line-height: 1.8; }
        .obv2-prose p { margin: 0 0 1.4rem; }
        .obv2-prose em { color: var(--obv2-ink); }
        .obv2-figure {
          width: 100%;
          height: auto;
          display: block;
          margin: 3rem 0 0;
          border: 1px solid var(--obv2-line);
        }
        .obv2-chapters {
          list-style: none;
          margin: 0;
          padding: 0;
        }
        .obv2-chapter {
          display: flex;
          gap: 1.25rem;
          padding: 1.15rem 0;
          border-top: 1px solid var(--obv2-line);
          align-items: baseline;
        }
        .obv2-chapter:last-child { border-bottom: 1px solid var(--obv2-line); }
        .obv2-chapter-n {
          font-size: 0.72rem;
          letter-spacing: 0.18em;
          color: var(--obv2-faint);
          font-weight: 700;
          min-width: 2rem;
        }
        .obv2-chapter-title { font-weight: 700; color: var(--obv2-ink); margin: 0 0 0.2rem; font-size: 1.02rem; }
        .obv2-chapter-line { color: var(--obv2-faint); margin: 0; font-size: 0.92rem; font-style: italic; }
        .obv2-excerpt { border-top: 1px solid var(--obv2-line); border-bottom: 1px solid var(--obv2-line); }
        .obv2-excerpt-src { color: var(--obv2-faint); font-style: italic; margin: -1rem 0 2rem; }
        .obv2-cta { text-align: center; }
        .obv2-cta .obv2-prose { text-align: center; }
        .obv2-fine { font-size: 0.82rem; color: var(--obv2-faint); margin: 1.25rem 0 0; }
        .obv2-footer {
          text-align: center;
          padding: 4rem 1.5rem 5rem;
          border-top: 1px solid var(--obv2-line);
          color: var(--obv2-faint);
          font-size: 0.9rem;
        }
        .obv2-footer-title {
          font-family: "Fraunces", Georgia, serif;
          font-weight: 900;
          color: var(--obv2-ink);
          font-size: 1.3rem;
          margin: 0 0 0.75rem;
        }
        .obv2-footer p { margin: 0 0 0.4rem; }
        .obv2-footer-note { font-size: 0.78rem; }
      `}</style>
    </div>
  );
}
