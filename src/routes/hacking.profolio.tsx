import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight, Check } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ValidationBeat } from "@/components/validation-modal";

const title = "Profolio — One Baseline, Many Stories | Steve Peele II";
const description =
  "Profolio: a professional portfolio builder. One private baseline of projects, skills, and credentials — then tailored views for whoever you're talking to.";

export const Route = createFileRoute("/hacking/profolio")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://stevepeeleii.com/hacking/profolio" }],
  }),
  component: ProfolioPage,
});

const features = [
  "One private baseline — projects with real metrics, skills, credentials",
  "Tailored views per audience — hiring managers see one story, clients another",
  "Shareable public links — no account needed on the receiving end",
  "Free to start (5 projects, 1 view) · Pro $29 one-time, unlimited",
];

function ProfolioPage() {
  return (
    <div className="min-h-screen overflow-x-clip">
      <SiteHeader />
      <main>
        <section className="hero-surface border-b border-border/60">
          <div className="mx-auto max-w-4xl px-5 py-20">
            <Link to="/hacking" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
              <ArrowLeft className="size-4" /> Building
            </Link>
            <p className="eyebrow mt-8">Building / Profolio</p>
            <h1 className="mt-5 text-4xl font-bold sm:text-5xl">
              One baseline, <span className="text-gradient">many stories.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
              A professional portfolio builder. Log your projects with real metrics once — then
              package tailored views for whoever you're talking to.
            </p>
            <div className="mt-8">
              <a
                href="https://profolioapp.stevepeeleii.com/"
                target="_blank"
                rel="noreferrer"
                className="btn-primary inline-flex items-center gap-2"
              >
                Try Profolio <ArrowUpRight className="size-4" />
              </a>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-4xl px-5 py-20">
          <p className="eyebrow">Why I built it</p>
          <h2 className="mt-4 text-3xl font-bold sm:text-4xl">One resume for every audience is lazy.</h2>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            I had a folder called "career stuff" — resumes from 2019, 2021, 2023, a nine-page master
            resume, cover letter templates with [COMPANY NAME] still in them. Every time I needed to
            send something, I'd stare at the folder and send the same generic PDF. Tailoring felt
            like a second job.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            The answer was never "more resumes." It's one source of truth, packaged per audience. A
            view is a named slice of your baseline: these three projects, these skills, this
            credential. Share it as a link — that's the whole story they get. Nothing is public
            until you share.
          </p>

          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            {features.map((f) => (
              <div key={f} className="panel flex items-start gap-3 p-5">
                <Check className="mt-0.5 size-5 shrink-0 text-emerald-400" aria-hidden="true" />
                <p className="text-sm text-muted-foreground">{f}</p>
              </div>
            ))}
          </div>

          <div className="mt-16">
            <p className="eyebrow">What's next</p>
            <h3 className="mt-4 text-2xl font-bold">On the build queue</h3>
            <ul className="mt-6 space-y-3">
              {[
                "Public directory of published baselines",
                "Baseline version history",
                "PDF export of a baseline",
                "Template gallery for baselines",
                "AI baseline draft generator",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-muted-foreground">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-muted-foreground/50" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-16 text-center">
            <a
              href="https://profolioapp.stevepeeleii.com/"
              target="_blank"
              rel="noreferrer"
              className="btn-primary inline-flex items-center gap-2"
            >
              Open Profolio <ArrowUpRight className="size-4" />
            </a>
            <p className="mt-4 text-sm text-muted-foreground">Built by SPIIX.</p>
          </div>
        </section>
        <div className="mx-auto max-w-4xl px-5 pb-2 text-center">
          <Link
            to="/hacking/$appSlug/changelog"
            params={{ appSlug: "profolio" }}
            className="text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
          >
            Ship history →
          </Link>
        </div>
        <ValidationBeat />
      </main>
      <SiteFooter />
    </div>
  );
}
