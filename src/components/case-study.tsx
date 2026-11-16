import { Link } from "@tanstack/react-router";
import { useRef } from "react";
import { CoreFooter, CoreHeader, useCoreReveal } from "@/components/core-chrome";
import { CaseVisual } from "@/components/case-visuals";
import { caseStudies, type CaseStudy } from "@/data/case-studies";

/* Shared rendering for /experience/case-studies and its case pages.
   Built entirely from the core design system (core.css). */

export function CaseFigure({ study }: { study: CaseStudy }) {
  return (
    <figure className="core-case-figure">
      <CaseVisual kind={study.visual} />
      <figcaption>{study.visualCaption}</figcaption>
    </figure>
  );
}

function StatBand({ study }: { study: CaseStudy }) {
  return (
    <section className="core-proof core-case-proof" aria-label="Headline results">
      <div className="core-proof-grid">
        {study.stats.map((s) => (
          <div key={s.label}>
            <div className="core-proof-num">{s.value}</div>
            <div className="core-proof-label">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function ProseSection({ label, paragraphs }: { label: string; paragraphs: string[] }) {
  if (paragraphs.length === 0) return null;
  return (
    <section className="core-section core-reveal">
      <p className="core-section-label">{label}</p>
      <div className="core-prose core-case-prose">
        {paragraphs.map((p) => (
          <p key={p.slice(0, 32)}>{p}</p>
        ))}
      </div>
    </section>
  );
}

export function CaseStudyView({
  study,
  prev,
  next,
}: {
  study: CaseStudy;
  prev?: CaseStudy | undefined;
  next?: CaseStudy | undefined;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  useCoreReveal(rootRef);

  return (
    <div className="core-root" ref={rootRef}>
      <CoreHeader active="experience" />
      <main className="core-wrap">
        <div className="core-view-head core-reveal">
          <div className="core-subnav">
            <Link to="/experience">Experience</Link>
            <Link to="/experience/case-studies">All case studies</Link>
          </div>
          <p className="core-eyebrow">Case study · {study.sector}</p>
          <h1>{study.company}</h1>
          <p>{study.lede}</p>
          <p className="core-case-meta">
            <strong>{study.role}</strong>
            <span aria-hidden> · </span>
            {study.period}
          </p>
        </div>

        <div className="core-reveal">
          <StatBand study={study} />
        </div>

        {study.seats ? (
          <>
            <ProseSection label="The pattern" paragraphs={study.context} />
            <div className="core-reveal">
              <CaseFigure study={study} />
            </div>
            {study.seats.map((seat) => (
              <section className="core-case-seat core-reveal" key={seat.company}>
                <h2>{seat.company}</h2>
                <p className="core-case-meta">
                  <strong>{seat.role}</strong>
                  <span aria-hidden> · </span>
                  {seat.period}
                </p>
                <ul className="core-exp-points">
                  {seat.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
                <div className="core-case-chips">
                  {seat.stats.map((s) => (
                    <p className="core-case-chip" key={s.label}>
                      <strong>{s.value}</strong> {s.label}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </>
        ) : (
          <>
            <ProseSection label="The context" paragraphs={study.context} />
            <ProseSection label="The mandate" paragraphs={study.mandate} />
            <div className="core-reveal">
              <CaseFigure study={study} />
            </div>
            <section className="core-section core-reveal">
              <p className="core-section-label">What was built</p>
              <ul className="core-exp-points">
                {study.built.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </section>
            <ProseSection label="The outcome" paragraphs={study.outcomes} />
          </>
        )}

        <nav className="core-case-nav core-reveal" aria-label="More case studies">
          {prev ? (
            <Link
              to="/experience/case-studies/$slug"
              params={{ slug: prev.slug }}
              className="core-case-navlink"
            >
              <span>← Previous case</span>
              <strong>{prev.company}</strong>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link
              to="/experience/case-studies/$slug"
              params={{ slug: next.slug }}
              className="core-case-navlink core-case-navlink-next"
            >
              <span>Next case →</span>
              <strong>{next.company}</strong>
            </Link>
          ) : (
            <span />
          )}
        </nav>

        <div className="core-work-close core-reveal">
          <p>
            The short record is on the Experience page. The pattern across every case is the same:
            clarify the positioning, build the demand, make the operations repeatable, and measure
            what to do next.
          </p>
          <Link to="/work-together" className="core-textlink">
            Work together →
          </Link>
        </div>

        <CoreFooter />
      </main>
    </div>
  );
}

export function CaseIndexView() {
  const rootRef = useRef<HTMLDivElement>(null);
  useCoreReveal(rootRef);

  return (
    <div className="core-root" ref={rootRef}>
      <CoreHeader active="experience" />
      <main className="core-wrap">
        <div className="core-view-head core-reveal">
          <div className="core-subnav">
            <Link to="/experience">Experience</Link>
            <Link to="/work">The work record</Link>
          </div>
          <h1>Case studies</h1>
          <p>
            The full record behind the Experience page: what each seat required, what was built,
            and the numbers it produced. Every figure here traces to the resume of record.
          </p>
        </div>

        <div className="core-case-cards core-reveal">
          {caseStudies.map((c) => (
            <Link
              key={c.slug}
              to="/experience/case-studies/$slug"
              params={{ slug: c.slug }}
              className="core-case-card"
            >
              <p className="core-case-card-sector">{c.sector}</p>
              <h2>{c.company}</h2>
              <p className="core-case-card-role">
                {c.role} · {c.period}
              </p>
              <p className="core-case-card-headline">{c.headline}</p>
              <p className="core-case-card-stats">
                {c.stats.slice(0, 3).map((s) => (
                  <span key={s.label}>
                    <strong>{s.value}</strong> {s.label}
                  </span>
                ))}
              </p>
              <span className="core-textlink">Read the case →</span>
            </Link>
          ))}
        </div>

        <div className="core-work-close core-reveal">
          <p>
            Fourteen years, five deep cases. The seats not given their own page are on the
            Experience page, in the same record.
          </p>
          <Link to="/experience" className="core-textlink">
            Back to Experience →
          </Link>
        </div>

        <CoreFooter />
      </main>
    </div>
  );
}

/** The case-studies block rendered on /experience itself. */
export function CaseStudySection() {
  return (
    <section className="core-section core-reveal">
      <p className="core-section-label">Case studies</p>
      <div className="core-work-list">
        {caseStudies.map((c) => (
          <article className="core-work-row" key={c.slug}>
            <div className="core-work-date">{c.period}</div>
            <div className="core-work-main">
              <h3>{c.company}</h3>
              <div className="core-work-role">{c.role}</div>
              <p className="core-case-rowline">{c.headline}</p>
              <Link
                to="/experience/case-studies/$slug"
                params={{ slug: c.slug }}
                className="core-textlink"
              >
                Read the case study →
              </Link>
            </div>
          </article>
        ))}
      </div>
      <Link to="/experience/case-studies" className="core-textlink">
        All case studies →
      </Link>
    </section>
  );
}
