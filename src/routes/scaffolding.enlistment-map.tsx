import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  BadgeDollarSign,
  ChevronDown,
  ClipboardList,
  Flag,
  Route as RouteIcon,
  ShieldAlert,
  Wallet,
} from "lucide-react";
import { ScaffoldingShell, scaffoldingHead } from "@/components/scaffolding-shell";

const title = "Scaffolding — Enlistment Map | Steve Peele II";
const description =
  "Private reference: the full military enlistment process map — medical gate, 10-step pipeline, bonuses, pay. Unlisted.";

export const Route = createFileRoute("/scaffolding/enlistment-map")({
  head: () => scaffoldingHead("/scaffolding/enlistment-map", title, description),
  component: EnlistmentMapPage,
});

type Step = {
  n: string;
  name: string;
  headline: string;
  detail: string[];
  tone: "gate" | "normal";
};

const STEPS: Step[] = [
  {
    n: "0",
    name: "The Medical Gate",
    headline: "Current epilepsy is on the 2026 no-waiver list. This is where the journey most likely ends.",
    detail: [
      "As of May 2026, USMEPCOM's “Conditions Unlikely to be Waived” pre-screen lists current epilepsy as ineligible for a medical waiver — a front-door stop before you ever sit with a doctor at MEPS.",
      "The only existing waiver path for epilepsy history requires all of: 5+ years seizure-free, off all seizure medication, a normal EEG, and a current neurology consult.",
      "MHS Genesis pulls your civilian medical records electronically at pre-screen. Your history will surface. Hiding it is fraudulent enlistment — a federal offense under the UCMJ.",
      "Autism spectrum (Asperger's) is separately disqualifying under DoDI 6130.03; waivers are rare. ADHD is waiverable in many cases.",
    ],
    tone: "gate",
  },
  {
    n: "1",
    name: "Decide",
    headline: "Commit to pursuing enlistment.",
    detail: ["This is the personal decision step — weighing service against the alternatives already in motion (job sprint, gear sale, unclaimed funds)."],
    tone: "normal",
  },
  {
    n: "2",
    name: "Research branches",
    headline: "Army is the best fit: max age 42, lowest ASVAB floor (AFQT 31), biggest recruiting mission.",
    detail: [
      "Army raised its max enlistment age from 35 to 42 in April 2026 (AR 601-210). Air Force 42, Space Force 42, Navy 41, Coast Guard 42, Marines 28.",
      "ASVAB floors 2026: Army 31, Marines 32, Navy 35, Air Force 36, Coast Guard 36.",
      "The Army processes the broadest range of applicants — the widest door, if the medical gate opened.",
    ],
    tone: "normal",
  },
  {
    n: "3",
    name: "Contact a recruiter",
    headline: "Army recruiter in the Cincinnati area. Be upfront about the epilepsy from minute one.",
    detail: [
      "The recruiter screens you informally, then starts official pre-screen paperwork: medical history forms and the SF-86 background check.",
      "Leading with the epilepsy saves everyone time — it surfaces at pre-screen regardless.",
    ],
    tone: "normal",
  },
  {
    n: "4",
    name: "PiCAT pre-test",
    headline: "Untimed aptitude pre-test, taken at home or the recruiting station.",
    detail: ["If your PiCAT score holds on verification questions, it can substitute for the full ASVAB at MEPS."],
    tone: "normal",
  },
  {
    n: "5",
    name: "Full ASVAB at MEPS",
    headline: "The aptitude battery that determines which jobs (MOS) you qualify for.",
    detail: [
      "Need AFQT 31+ for Army. Higher line scores unlock better MOS options.",
      "Aim for AFQT 50+ to keep real options open across the board.",
    ],
    tone: "normal",
  },
  {
    n: "6",
    name: "MEPS medical exam",
    headline: "The two-day gauntlet: pre-screen, physical, job counseling, oath.",
    detail: [
      "Day 1: check in, ID processing, ASVAB (if not done), briefing. Usually a hotel stay the night before.",
      "Day 2: full physical — vision, hearing, blood draw, urinalysis, medical history review with a military physician.",
      "MHS Genesis has already pulled your civilian records. The epilepsy history is in front of the doctor before you walk in.",
    ],
    tone: "normal",
  },
  {
    n: "7",
    name: "MOS / job selection",
    headline: "Pick your specialty with a service counselor — scores, medical qualification, availability.",
    detail: [
      "Marketing/tech background points toward signal, cyber, or public affairs MOS tracks — if you cleared the medical gate.",
      "High-demand MOS on the critical skills list also drive bonus eligibility.",
    ],
    tone: "normal",
  },
  {
    n: "8",
    name: "Sign DD Form 4",
    headline: "The enlistment contract. Service length, MOS, bonuses — in writing.",
    detail: ["Read every line. Verbal promises from a recruiter mean nothing unless they're in the contract."],
    tone: "normal",
  },
  {
    n: "9",
    name: "Delayed Entry Program",
    headline: "Wait for your ship date — days to up to a year. You can still walk away, no penalty.",
    detail: ["DEP is the holding pattern between signing and shipping. You haven't shipped, so there's no commitment cost to exiting."],
    tone: "normal",
  },
  {
    n: "10",
    name: "Ship to basic training",
    headline: "Army Basic Combat Training: 10 weeks, then AIT for your MOS.",
    detail: [
      "Basic at Fort Moore (Benning), Fort Jackson, Fort Leonard Wood, or Fort Sill.",
      "Then AIT — job training for your specific MOS.",
      "Typical timeline from first recruiter call to ship date: 3–9 months.",
    ],
    tone: "normal",
  },
];

const BONUSES = [
  { name: "Job signing bonus", amount: "$3k–$15k", note: "High-demand MOS on the critical skills list only. The list shifts — the recruiter has current numbers." },
  { name: "Quick Ship bonus", amount: "up to $10k", note: "Ship to basic within 30 days of signing. 60+ MOS eligible. Stacks on top of everything else." },
  { name: "College Credit bonus", amount: "up to $8k", note: "Requires a critical MOS that already carries a job signing bonus." },
  { name: "Civilian Acquired Skills", amount: "up to $45k", note: "Skills in high demand — foreign language, medical, technical. His marketing/tech background could qualify.", flag: true },
];

function StepCard({ s }: { s: Step }) {
  const [open, setOpen] = useState(s.n === "0");
  const gate = s.tone === "gate";
  return (
    <article
      className={`panel overflow-hidden ${gate ? "border-red-400/40 bg-red-950/20" : ""}`}
    >
      <button onClick={() => setOpen((v) => !v)} className="block w-full text-left p-4 sm:p-5" aria-expanded={open}>
        <div className="flex items-center gap-3">
          <span
            className={`flex size-9 shrink-0 items-center justify-center rounded-full border text-sm font-bold ${
              gate
                ? "border-red-400/50 bg-red-400/15 text-red-200"
                : "border-white/20 bg-white/5 text-zinc-200"
            }`}
          >
            {s.n}
          </span>
          <div className="min-w-0 flex-1">
            <p className={`text-[10px] font-bold uppercase tracking-widest ${gate ? "text-red-300/80" : "text-zinc-500"}`}>
              Step {s.n} — {gate ? "Medical gate" : "Pipeline"}
            </p>
            <h3 className="text-[15px] font-semibold text-zinc-100">{s.name}</h3>
          </div>
          {gate && <ShieldAlert className="size-5 shrink-0 text-red-300" />}
          <ChevronDown className={`size-4 shrink-0 text-zinc-500 transition-transform ${open ? "rotate-180" : ""}`} />
        </div>
        <p className={`mt-2 text-sm leading-relaxed ${gate ? "text-red-100/90" : "text-zinc-300"}`}>{s.headline}</p>
      </button>
      {open && (
        <ul className="space-y-2 border-t border-white/10 px-4 py-4 sm:px-5">
          {s.detail.map((d, i) => (
            <li key={i} className="flex gap-2 text-sm leading-relaxed text-zinc-400">
              <span className={`mt-1.5 size-1.5 shrink-0 rounded-full ${gate ? "bg-red-400" : "bg-zinc-600"}`} />
              <span>{d}</span>
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}

function EnlistmentMapPage() {
  return (
    <ScaffoldingShell
      path="/scaffolding/enlistment-map"
      eyebrow="Scaffolding / Enlistment Map"
      title={
        <>
          The enlistment map, <span className="text-gradient">starting at the gate.</span>
        </>
      }
      intro="What military enlistment would actually look like — mapped straight, medical gate first. Private reference, mapped 2026-10-15."
      updated="2026-10-15"
    >
      <div className="mb-6 flex items-center gap-2 text-xs text-zinc-500">
        <RouteIcon className="size-3.5" />
        <span>11 stops · newest research 2026-10-15 · Army-weighted</span>
      </div>

      <div className="space-y-3">
        {STEPS.map((s) => (
          <StepCard key={s.n} s={s} />
        ))}
      </div>

      <section className="panel mt-8 p-4 sm:p-6">
        <h2 className="flex items-center gap-2 text-lg font-semibold text-zinc-100">
          <BadgeDollarSign className="size-5 text-amber-300" /> Bonuses — Army 2026
        </h2>
        <p className="mt-1 text-sm text-zinc-400">
          Up to <span className="font-semibold text-amber-200">$50,000 combined</span> — but only for specific jobs,
          contract lengths, and circumstances. Components stack to the ceiling. Paid in installments after training. Taxed.
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {BONUSES.map((b) => (
            <div
              key={b.name}
              className={`rounded-lg border p-3.5 ${b.flag ? "border-amber-400/40 bg-amber-400/[0.06]" : "border-white/10 bg-white/[0.03]"}`}
            >
              <div className="flex items-baseline justify-between gap-2">
                <p className="text-sm font-semibold text-zinc-100">{b.name}</p>
                <p className="shrink-0 text-sm font-bold text-amber-200">{b.amount}</p>
              </div>
              <p className="mt-1 text-[13px] leading-relaxed text-zinc-400">{b.note}</p>
              {b.flag && (
                <p className="mt-2 text-[11px] font-bold uppercase tracking-widest text-amber-300/80">← flag for him</p>
              )}
            </div>
          ))}
        </div>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-[11px] uppercase tracking-widest text-zinc-500">
                <th className="pb-2 pr-4 font-semibold">Contract length</th>
                <th className="pb-2 font-semibold">Bonus cap</th>
              </tr>
            </thead>
            <tbody className="text-zinc-300">
              {[
                ["3 years", "$25,000"],
                ["4 years", "$40,000"],
                ["5 years", "$45,000"],
                ["6 years", "$50,000"],
              ].map(([c, v]) => (
                <tr key={c} className="border-t border-white/10">
                  <td className="py-2 pr-4">{c}</td>
                  <td className="py-2 font-semibold text-amber-200">{v}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs text-zinc-500">
          Other branches: Navy up to $140k (nuclear, 6-yr) · Space Force $25k pilot (8-yr commitment) · Marines FY26 skill-based.
        </p>
      </section>

      <section className="panel mt-4 p-4 sm:p-6">
        <h2 className="flex items-center gap-2 text-lg font-semibold text-zinc-100">
          <Wallet className="size-5 text-emerald-300" /> Pay &amp; benefits
        </h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          <div className="rounded-lg border border-white/10 bg-white/[0.03] p-3.5">
            <p className="text-[11px] font-bold uppercase tracking-widest text-zinc-500">E-1 base pay</p>
            <p className="mt-1 text-xl font-bold text-zinc-100">$2,407<span className="text-sm font-normal text-zinc-400">/mo</span></p>
            <p className="mt-1 text-xs text-zinc-500">$2,226/mo for the first 4 months. Excludes BAH/BAS.</p>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/[0.03] p-3.5">
            <p className="text-[11px] font-bold uppercase tracking-widest text-zinc-500">Health</p>
            <p className="mt-1 text-xl font-bold text-zinc-100">Tricare</p>
            <p className="mt-1 text-xs text-zinc-500">Full coverage, essentially zero premium.</p>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/[0.03] p-3.5">
            <p className="text-[11px] font-bold uppercase tracking-widest text-zinc-500">After service</p>
            <p className="mt-1 text-xl font-bold text-zinc-100">GI Bill + VA loan</p>
            <p className="mt-1 text-xs text-zinc-500">Education benefits and zero-down mortgage eligibility.</p>
          </div>
        </div>
      </section>

      <section className="panel mt-4 p-4 sm:p-6">
        <h2 className="flex items-center gap-2 text-lg font-semibold text-zinc-100">
          <ClipboardList className="size-5 text-sky-300" /> What to do first
        </h2>
        <ol className="mt-3 space-y-2.5">
          {[
            "Talk to an Army recruiter in Cincinnati. Be upfront about the epilepsy from minute one — it surfaces at pre-screen regardless, and leading with it saves everyone time.",
            "Bring full medical documentation — neurology records, EEG history, medication history, seizure history with dates.",
            "Ask the recruiter directly: “Given current epilepsy on the no-waiver list, is there any path here?” A straight recruiter will tell you the truth.",
          ].map((t, i) => (
            <li key={i} className="flex gap-3 text-sm leading-relaxed text-zinc-300">
              <span className="flex size-6 shrink-0 items-center justify-center rounded-full border border-sky-400/40 bg-sky-400/10 text-xs font-bold text-sky-200">
                {i + 1}
              </span>
              <span>{t}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="panel mt-4 border-amber-400/30 bg-amber-950/20 p-4 sm:p-6">
        <h2 className="flex items-center gap-2 text-lg font-semibold text-amber-100">
          <Flag className="size-5 text-amber-300" /> The bottom line
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-amber-100/80">
          The map is complete and honest. Step 0 is the whole story: current epilepsy is on the 2026 no-waiver list, and
          MHS Genesis surfaces your history at pre-screen. The process ends at the medical gate — not after a fight, but
          at the front door. If the driver is money and stability, the levers that move are the ones already in motion:
          the job sprint, the gear sale, the unclaimed funds claim.
        </p>
      </section>

      <p className="mt-4 text-xs text-zinc-500">Unlisted · noindex · internal reference. Sources: USMEPCOM 2026 policy, AR 601-210, DFAS 2026 pay tables.</p>
    </ScaffoldingShell>
  );
}
