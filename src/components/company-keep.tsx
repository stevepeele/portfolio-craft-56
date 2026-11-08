import { workedWith } from "@/data/resume";

/* Company I keep (SPIIX-1202). Restores the logo slider that PLX-291
   added to the pre-redesign home page and the Nov 6 pared-down
   redesign dropped. The historical component was a CSS marquee of
   text wordmarks from the workedWith record in src/data/resume.ts;
   there were never image logo assets. The set is that record, minus
   one name: Zillow acquired Dotloop, and Steve never held a seat
   there, so it comes out. Motion is CSS only and stops entirely
   under reduced motion, where the strip wraps as a static list. */

const COMPANIES = workedWith.filter((name) => name !== "Zillow");

export function CompanyKeep() {
  return (
    <section className="core-keep" aria-label="Companies Steve Peele II has worked with">
      <p className="core-keep-label">Company I keep</p>
      <div className="core-keep-viewport">
        <div className="core-keep-track">
          {COMPANIES.map((name) => (
            <span className="core-keep-name" key={name}>
              {name}
            </span>
          ))}
          {COMPANIES.map((name) => (
            <span className="core-keep-name core-keep-dup" key={`dup-${name}`} aria-hidden="true">
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
