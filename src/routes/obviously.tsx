import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowDown, BookOpen, Check, Download, Eye, EyeOff } from "lucide-react";
import { track } from "@/lib/segment";
import { formsubmitSignalEndpoint } from "@/lib/spiix-leads";

export const Route = createFileRoute("/obviously")({
  head: () => ({
    meta: [
      { title: "OBVIOUSLY — What everyone knows, and you keep missing | Steve Peele II" },
      {
        name: "description",
        content:
          "OBVIOUSLY: a book about the people who notice everything. Not self-help. Not a diagnosis. Recognition. Free PDF download.",
      },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "OBVIOUSLY — Steve Peele II" },
      {
        property: "og:description",
        content: "What everyone knows, and you keep missing. A book for the people who notice everything.",
      },
      { property: "og:type", content: "book" },
    ],
    links: [{ rel: "canonical", href: "https://stevepeeleii.com/obviously" }],
  }),
  component: ObviouslyPage,
});

const PDF_URL = "/obviously-steve-peele-ii.pdf";

const acts = [
  {
    numeral: "I",
    title: "The Machinery",
    blurb: "How the noticing works — and what it costs to run it all day.",
    chapters: [
      { n: "01", title: "The Inability to Leave Well Enough Alone", line: "Seeing the possible version ruins the current one." },
      { n: "02", title: "Nobody Asked", line: "Being right is not the same as being invited." },
      { n: "03", title: "I Thought You Knew", line: "An expectation, unspoken, is a disappointment with a head start." },
      { n: "04", title: "The Person Who Needs a Reason", line: "Weather doesn't need a thesis." },
    ],
  },
  {
    numeral: "II",
    title: "The Flood",
    blurb: "What happens when the system hits capacity — the second version of the same person.",
    chapters: [
      { n: "05", title: "Normal Is a Terrible Measurement", line: "The performance of fine." },
      { n: "06", title: "The Mask Is Not the Person", line: "Competence as camouflage." },
      { n: "07", title: "When the Room Gets Too Loud", line: "Thirty channels, no mute button." },
      { n: "08", title: "The Great American Emergency", line: "Everyone else's distress becomes your siren." },
    ],
  },
  {
    numeral: "III",
    title: "The Return",
    blurb: "What it looks like to stop — and what comes back when you do.",
    chapters: [
      { n: "09", title: "The Loneliness of Being Understood", line: "Seen at last, and lonelier for it." },
      { n: "10", title: "The Difference Between a Boundary and a Wall", line: "One protects you. One buries you." },
      { n: "11", title: "When Intelligence Becomes Armor", line: "The smartest defense is still a defense." },
      { n: "12", title: "The Person Who Finally Stops", line: "He waits. That is the whole thing." },
    ],
  },
];

function Highlight({ children }: { children: React.ReactNode }) {
  return (
    <mark className="obv-mark">
      {children}
    </mark>
  );
}

function DownloadPanel() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [sending, setSending] = useState(false);

  async function handleDownload(e?: React.FormEvent) {
    e?.preventDefault();
    if (sending) return;
    setSending(true);
    track("Book Downloaded", { book: "obviously", source: "obviously-landing" });
    if (email.trim()) {
      try {
        await fetch(formsubmitSignalEndpoint, {
          method: "POST",
          keepalive: true,
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({
            _subject: "New OBVIOUSLY download",
            _template: "table",
            email: email.trim(),
            source: "obviously-landing",
          }),
        });
      } catch {
        /* never block the reader */
      }
    }
    setDone(true);
    setSending(false);
    // Trigger the file download
    const a = document.createElement("a");
    a.href = PDF_URL;
    a.download = "obviously-steve-peele-ii.pdf";
    document.body.appendChild(a);
    a.click();
    a.remove();
  }

  if (done) {
    return (
      <div className="obv-download-done">
        <span className="obv-check">
          <Check className="h-5 w-5" />
        </span>
        <p className="obv-download-done-title">It's yours.</p>
        <p className="obv-download-done-sub">
          The PDF should be downloading now. If it didn't start,{" "}
          <a href={PDF_URL} download className="obv-link">
            click here
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form className="obv-download-form" onSubmit={handleDownload}>
      <label className="obv-field">
        <span className="obv-field-label">Email <em>(optional — for the print edition)</em></span>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="obv-input"
        />
      </label>
      <button type="submit" disabled={sending} className="obv-btn">
        <Download className="h-4 w-4" />
        {sending ? "Preparing…" : "Download the book — free"}
      </button>
      <p className="obv-fine">PDF · First edition, 2026 · No spam, ever.</p>
    </form>
  );
}

function ObviouslyPage() {
  return (
    <div className="obviously">
      {/* ── HERO ─────────────────────────────── */}
      <header className="obv-hero">
        <p className="obv-kicker">A book by Steve Peele II</p>
        <h1 className="obv-title">
          OBV<Highlight>V</Highlight>IOUSLY<span className="obv-period">.</span>
        </h1>
        <p className="obv-subtitle">
          What everyone knows — <em>and you keep missing.</em>
        </p>
        <p className="obv-hero-copy">
          An observation of people who think too fast, feel too much, notice
          everything — and occasionally make a fucking mess of it.
        </p>
        <div className="obv-hero-ctas">
          <a href="#download" className="obv-btn">
            <Download className="h-4 w-4" /> Get the book
          </a>
          <a href="#excerpt" className="obv-btn-ghost">
            <BookOpen className="h-4 w-4" /> Read an excerpt
          </a>
        </div>
        <a href="#about" className="obv-scroll" aria-label="Scroll down">
          <ArrowDown className="h-4 w-4" />
        </a>
      </header>

      {/* ── THE REFRAME ──────────────────────── */}
      <section id="about" className="obv-section">
        <p className="obv-section-kicker">This is not that book</p>
        <h2 className="obv-h2">
          Not self-help. Not a diagnosis. <Highlight>Recognition.</Highlight>
        </h2>
        <div className="obv-prose">
          <p>
            There are enough books explaining how to optimize your morning routine
            while convincing you that you failed morally because you didn't
            meditate before 6 a.m. This isn't one of them.
          </p>
          <p>
            This is a book that says: <em>I see the machinery. I see what it
            costs. I see the two versions of you — and I know which one you've
            been judged by, and I know it's the wrong one.</em>
          </p>
          <p>
            That is not empathy. That is recognition. And recognition, for the
            people who notice everything, is the rarest thing of all — because
            they spend their lives doing it for everyone else, and almost no one
            does it for them.
          </p>
          <p className="obv-pull">
            "Someone finally noticing the noticer."
          </p>
        </div>
      </section>

      {/* ── THE TWO VERSIONS ─────────────────── */}
      <section className="obv-section obv-versions">
        <p className="obv-section-kicker">The core idea</p>
        <h2 className="obv-h2">Two versions of the same person.</h2>
        <div className="obv-two-col">
          <div className="obv-version">
            <p className="obv-version-tag"><Eye className="h-4 w-4" /> Baseline</p>
            <p>The mind is a room with the lights on. You can see all the furniture. A delayed text is just a delayed text. There are several possibilities.</p>
          </div>
          <div className="obv-version obv-version-flood">
            <p className="obv-version-tag"><EyeOff className="h-4 w-4" /> Flooded</p>
            <p>The same room, dark, someone rearranging the furniture. The delayed text is evidence. <em>"I need one."</em> Certainty isn't information here — it's a symptom.</p>
          </div>
        </div>
        <p className="obv-prose" style={{ marginTop: "2rem" }}>
          We judge people by their lowest bandwidth, not their highest capacity.
          The seventeen messages become the story. The years of measured,
          thoughtful communication become background. This book is about the
          whole person — both versions, and the machinery underneath.
        </p>
      </section>

      {/* ── INSIDE: THE THREE ACTS ───────────── */}
      <section className="obv-section">
        <p className="obv-section-kicker">Inside the book</p>
        <h2 className="obv-h2">Three acts. Twelve chapters.</h2>
        <div className="obv-acts">
          {acts.map((act) => (
            <div key={act.numeral} className="obv-act">
              <div className="obv-act-head">
                <span className="obv-act-numeral">{act.numeral}</span>
                <div>
                  <h3 className="obv-act-title">{act.title}</h3>
                  <p className="obv-act-blurb">{act.blurb}</p>
                </div>
              </div>
              <ol className="obv-chapters">
                {act.chapters.map((c) => (
                  <li key={c.n} className="obv-chapter">
                    <span className="obv-chapter-n">{c.n}</span>
                    <div>
                      <p className="obv-chapter-title">{c.title}</p>
                      <p className="obv-chapter-line">{c.line}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>
        <p className="obv-prose obv-centered" style={{ marginTop: "2.5rem" }}>
          Plus a prologue — <em>The People Who Notice</em> — and an epilogue:{" "}
          <em>Nothing Is Wrong With You.</em>
        </p>
      </section>

      {/* ── EXCERPT ──────────────────────────── */}
      <section id="excerpt" className="obv-section obv-excerpt">
        <p className="obv-section-kicker">An excerpt</p>
        <h2 className="obv-h2">The People Who Notice</h2>
        <p className="obv-excerpt-src">From the prologue</p>
        <div className="obv-prose obv-excerpt-body">
          <p>
            There are people who notice things. Not important things,
            necessarily. That's what makes it interesting. They notice the change
            in somebody's voice. The half-second pause before an answer. The fact
            that somebody said <em>sure</em> instead of <em>yeah</em>. They
            notice when the typing bubble appears and disappears. They notice
            that the restaurant has changed the lighting.
          </p>
          <p>
            They notice when a text that used to come with an exclamation point
            now comes with a period. They notice when somebody's "haha" loses
            one of its letters. They notice that the boss said "interesting" the
            way people say "no" when they can't say no.
          </p>
          <p>
            They notice. And then they usually pretend they didn't. Because
            noticing everything is socially inconvenient. People generally prefer
            that you notice the things they intended for you to notice. Not the
            things they accidentally revealed.
          </p>
          <p>
            If you point out what someone meant you to see, you're attentive. If
            you point out what slipped out, you're a problem. So the people who
            notice learn to keep it to themselves. <Highlight>This is the first tax.</Highlight>
          </p>
        </div>
        <div className="obv-centered" style={{ marginTop: "2rem" }}>
          <a href="#download" className="obv-btn">
            <Download className="h-4 w-4" /> Keep reading — free download
          </a>
        </div>
      </section>

      {/* ── DOWNLOAD ─────────────────────────── */}
      <section id="download" className="obv-section obv-download">
        <p className="obv-section-kicker">Get the book</p>
        <h2 className="obv-h2">
          <Highlight>Obviously</Highlight> you want to read it.
        </h2>
        <p className="obv-prose obv-centered" style={{ maxWidth: "34rem", margin: "0 auto 2rem" }}>
          First edition, 2026. The complete book as a PDF — free. Leave your
          email if you want to hear about the print edition. Or don't. The book
          is yours either way.
        </p>
        <DownloadPanel />
      </section>

      {/* ── COLOPHON ─────────────────────────── */}
      <footer className="obv-footer">
        <p className="obv-footer-title">OBVIOUSLY.</p>
        <p>© 2026 Steve Peele II. All rights reserved.</p>
        <p className="obv-footer-note">First edition · Set in Fraunces & DM Sans · This page is unlisted.</p>
      </footer>

      <style>{`
        .obviously {
          --obv-bg: #0c0b09;
          --obv-ink: #f2ede3;
          --obv-muted: #a89f8d;
          --obv-faint: #6b6355;
          --obv-hi: #ffd60a;
          --obv-card: #14120e;
          --obv-line: #262219;
          background: var(--obv-bg);
          color: var(--obv-ink);
          font-family: "DM Sans", ui-sans-serif, system-ui, sans-serif;
          min-height: 100vh;
        }
        .obv-mark {
          background: linear-gradient(transparent 8%, var(--obv-hi) 8%, var(--obv-hi) 92%, transparent 92%);
          color: #0c0b09;
          padding: 0 0.12em;
          border-radius: 2px;
        }
        .obv-hero {
          position: relative;
          text-align: center;
          padding: 7rem 1.5rem 5rem;
          max-width: 60rem;
          margin: 0 auto;
        }
        .obv-kicker {
          font-size: 0.72rem;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: var(--obv-muted);
          margin-bottom: 2rem;
        }
        .obv-title {
          font-family: "Fraunces", Georgia, serif;
          font-weight: 900;
          font-size: clamp(3.5rem, 12vw, 8.5rem);
          line-height: 0.95;
          letter-spacing: -0.02em;
          margin: 0 0 1.5rem;
        }
        .obv-title .obv-mark { font-size: 0.92em; }
        .obv-period { color: var(--obv-hi); }
        .obv-subtitle {
          font-family: "Fraunces", Georgia, serif;
          font-size: clamp(1.25rem, 3.4vw, 1.9rem);
          font-style: italic;
          color: var(--obv-ink);
          margin: 0 0 1.25rem;
        }
        .obv-subtitle em { font-style: normal; background: linear-gradient(transparent 55%, rgba(255,214,10,.35) 55%); }
        .obv-hero-copy {
          max-width: 36rem;
          margin: 0 auto 2.5rem;
          color: var(--obv-muted);
          font-size: 1.05rem;
          line-height: 1.7;
        }
        .obv-hero-ctas { display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; }
        .obv-btn {
          display: inline-flex; align-items: center; gap: 0.6rem;
          background: var(--obv-hi); color: #0c0b09;
          font-weight: 700; font-size: 1rem;
          padding: 0.9rem 1.8rem; border-radius: 999px;
          text-decoration: none; border: none; cursor: pointer;
          transition: transform .15s ease, box-shadow .15s ease;
        }
        .obv-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 30px rgba(255,214,10,.25); }
        .obv-btn:disabled { opacity: .6; cursor: wait; transform: none; }
        .obv-btn-ghost {
          display: inline-flex; align-items: center; gap: 0.6rem;
          color: var(--obv-ink); font-weight: 600; font-size: 1rem;
          padding: 0.9rem 1.8rem; border-radius: 999px;
          border: 1px solid var(--obv-line); text-decoration: none;
          transition: border-color .15s ease;
        }
        .obv-btn-ghost:hover { border-color: var(--obv-hi); }
        .obv-scroll {
          display: inline-flex; margin-top: 4rem; color: var(--obv-faint);
          animation: obv-bob 2.4s ease-in-out infinite;
        }
        @keyframes obv-bob { 0%,100% { transform: translateY(0); } 50% { transform: translateY(8px); } }
        .obv-section { max-width: 60rem; margin: 0 auto; padding: 5rem 1.5rem; }
        .obv-section-kicker {
          font-size: 0.72rem; letter-spacing: 0.28em; text-transform: uppercase;
          color: var(--obv-hi); margin-bottom: 1.25rem;
        }
        .obv-h2 {
          font-family: "Fraunces", Georgia, serif;
          font-weight: 800; font-size: clamp(1.9rem, 5vw, 3rem);
          line-height: 1.1; letter-spacing: -0.01em; margin: 0 0 2rem;
        }
        .obv-prose { color: var(--obv-muted); font-size: 1.08rem; line-height: 1.8; }
        .obv-prose p { margin: 0 0 1.4rem; }
        .obv-prose em { color: var(--obv-ink); }
        .obv-pull {
          font-family: "Fraunces", Georgia, serif; font-style: italic;
          font-size: 1.5rem; color: var(--obv-ink) !important;
          border-left: 3px solid var(--obv-hi); padding-left: 1.25rem; margin: 2.5rem 0 !important;
        }
        .obv-centered { text-align: center; }
        .obv-versions .obv-two-col {
          display: grid; grid-template-columns: 1fr; gap: 1.25rem;
        }
        @media (min-width: 720px) { .obv-versions .obv-two-col { grid-template-columns: 1fr 1fr; } }
        .obv-version {
          background: var(--obv-card); border: 1px solid var(--obv-line);
          border-radius: 1rem; padding: 1.75rem;
        }
        .obv-version p:last-child { margin: 0; color: var(--obv-muted); line-height: 1.7; }
        .obv-version-tag {
          display: inline-flex; align-items: center; gap: 0.5rem;
          font-size: 0.72rem; letter-spacing: 0.22em; text-transform: uppercase;
          color: var(--obv-ink); font-weight: 700; margin-bottom: 1rem;
        }
        .obv-version-flood { border-color: rgba(255,214,10,.35); }
        .obv-version-flood .obv-version-tag { color: var(--obv-hi); }
        .obv-acts { display: flex; flex-direction: column; gap: 3rem; margin-top: 1rem; }
        .obv-act-head { display: flex; gap: 1.5rem; align-items: flex-start; margin-bottom: 1.5rem; }
        .obv-act-numeral {
          font-family: "Fraunces", Georgia, serif; font-weight: 900;
          font-size: 2.5rem; color: var(--obv-hi); line-height: 1; min-width: 3rem;
        }
        .obv-act-title { font-family: "Fraunces", Georgia, serif; font-size: 1.6rem; font-weight: 700; margin: 0 0 0.35rem; }
        .obv-act-blurb { color: var(--obv-muted); margin: 0; font-size: 0.98rem; }
        .obv-chapters { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; }
        .obv-chapter {
          display: flex; gap: 1.25rem; padding: 1.1rem 0;
          border-top: 1px solid var(--obv-line); align-items: baseline;
        }
        .obv-chapter:last-child { border-bottom: 1px solid var(--obv-line); }
        .obv-chapter-n {
          font-size: 0.72rem; letter-spacing: 0.18em; color: var(--obv-faint);
          font-weight: 700; min-width: 2rem;
        }
        .obv-chapter-title { font-weight: 700; color: var(--obv-ink); margin: 0 0 0.2rem; font-size: 1.02rem; }
        .obv-chapter-line { color: var(--obv-faint); margin: 0; font-size: 0.92rem; font-style: italic; }
        .obv-excerpt { background: var(--obv-card); border-top: 1px solid var(--obv-line); border-bottom: 1px solid var(--obv-line); max-width: none; }
        .obv-excerpt > * { max-width: 60rem; margin-left: auto; margin-right: auto; }
        .obv-excerpt-src { color: var(--obv-faint); font-style: italic; margin: -1.25rem 0 2rem; }
        .obv-excerpt-body p:first-child::first-letter {
          font-family: "Fraunces", Georgia, serif; font-weight: 900;
          font-size: 3.2em; float: left; line-height: 0.85; padding-right: 0.12em; color: var(--obv-hi);
        }
        .obv-download { text-align: center; }
        .obv-download .obv-h2 { margin-bottom: 1rem; }
        .obv-download-form { max-width: 26rem; margin: 0 auto; display: flex; flex-direction: column; gap: 1rem; }
        .obv-field { display: flex; flex-direction: column; gap: 0.5rem; text-align: left; }
        .obv-field-label { font-size: 0.85rem; color: var(--obv-muted); font-weight: 600; }
        .obv-field-label em { font-weight: 400; color: var(--obv-faint); font-style: italic; }
        .obv-input {
          background: var(--obv-card); border: 1px solid var(--obv-line);
          border-radius: 0.75rem; padding: 0.9rem 1.1rem; color: var(--obv-ink);
          font-size: 1rem; width: 100%; box-sizing: border-box;
        }
        .obv-input:focus { outline: none; border-color: var(--obv-hi); }
        .obv-input::placeholder { color: var(--obv-faint); }
        .obv-download-form .obv-btn { justify-content: center; width: 100%; }
        .obv-fine { font-size: 0.82rem; color: var(--obv-faint); margin: 0; }
        .obv-download-done { max-width: 26rem; margin: 0 auto; text-align: center; }
        .obv-check {
          display: inline-flex; align-items: center; justify-content: center;
          width: 3rem; height: 3rem; border-radius: 999px;
          background: var(--obv-hi); color: #0c0b09; margin-bottom: 1rem;
        }
        .obv-download-done-title { font-family: "Fraunces", Georgia, serif; font-size: 1.6rem; font-weight: 700; margin: 0 0 0.5rem; }
        .obv-download-done-sub { color: var(--obv-muted); margin: 0; }
        .obv-link { color: var(--obv-hi); }
        .obv-footer {
          text-align: center; padding: 4rem 1.5rem 5rem;
          border-top: 1px solid var(--obv-line); color: var(--obv-faint); font-size: 0.9rem;
        }
        .obv-footer-title {
          font-family: "Fraunces", Georgia, serif; font-weight: 900;
          color: var(--obv-ink); font-size: 1.4rem; margin: 0 0 0.75rem;
        }
        .obv-footer p { margin: 0 0 0.4rem; }
        .obv-footer-note { font-size: 0.78rem; }
      `}</style>
    </div>
  );
}
