import { createFileRoute, Link } from "@tanstack/react-router";
import { ScaffoldingShell, SectionHead, scaffoldingHead, StatusPill } from "@/components/scaffolding-shell";

const title = "Scaffolding — @c3peeleo | Steve Peele II";
const description =
  "Private reference: @c3peeleo — the broken-robot X account. Shelved 2026-10-15; not Oscar, not the chatbot. Unlisted.";

export const Route = createFileRoute("/scaffolding/organization/c3peeleo")({
  head: () => scaffoldingHead("/scaffolding/organization/c3peeleo", title, description),
  component: C3PeeleoPage,
});

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

function C3PeeleoPage() {
  return (
    <ScaffoldingShell
      path="/scaffolding/organization/c3peeleo"
      eyebrow="Scaffolding / Organization / @c3peeleo"
      title={
        <>
          @c3peeleo — <span className="text-gradient">shelved.</span>
        </>
      }
      intro="The broken-robot X account. Dead until Steve resurrects it — not Oscar, not the chatbot, not in the chain of command."
      updated="2026-10-19"
    >
      {/* 01 — What it is */}
      <section className="space-y-6">
        <SectionHead n="01" sub="A character account, not an operator.">
          What <span className="text-gradient">it is.</span>
        </SectionHead>
        <div className="panel p-5">
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">@c3peeleo</span> is the broken-robot X account — a
            character, not an operator.{" "}
            <span className="font-semibold text-foreground">Shelved 2026-10-15 ~07:11 ET</span> by Steve's order;
            it stays dead until he personally resurrects it.
          </p>
          <p className="mt-3 text-sm">
            <StatusPill status="Shelved" /> <span className="text-muted-foreground">No login held by agents · resurrection is Steve's call alone</span>
          </p>
        </div>
      </section>

      {/* 02 — Naming guardrails */}
      <section className="space-y-6">
        <SectionHead n="02" sub="The name has caused confusion before. These are load-bearing.">
          Naming <span className="text-gradient">guardrails.</span>
        </SectionHead>
        <div className="panel divide-y divide-border/60">
          {[
            ["Not Oscar", "@c3peeleo is never called Oscar. Oscar is the ops arm; the account is a shelved character."],
            ["Not the chatbot", "The chatbot face Steve talks to is Grokbot, inside the Oscar arm — not this account."],
            ["Never resurrected by agents", "No agent revives, logs into, or posts from @c3peeleo. Only Steve brings it back."],
          ].map(([k, v]) => (
            <div key={k} className="grid gap-2 px-5 py-4 sm:grid-cols-[220px_1fr]">
              <p className="text-sm font-semibold text-foreground">{k}</p>
              <p className="text-sm text-muted-foreground">{v}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 03 — If resurrected */}
      <section className="space-y-6">
        <SectionHead n="03" sub="Standing rules for the day he brings it back.">
          If <span className="text-gradient">resurrected.</span>
        </SectionHead>
        <div className="panel p-5">
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex gap-2"><span className="text-foreground/40">·</span><span>Pipeline roasts only — the account's lane is roasting the build pipeline.</span></li>
            <li className="flex gap-2"><span className="text-foreground/40">·</span><span>Never Hattie / Lainey / custody-legal / Layli. Family and legal are off-limits, always.</span></li>
            <li className="flex gap-2"><span className="text-foreground/40">·</span><span>Voice guide lives at <span className="font-mono">references/VOICE.md</span> — read before any draft.</span></li>
          </ul>
        </div>
        <p className="text-xs text-muted-foreground">
          Parent page:{" "}
          <Link to="/scaffolding/organization" className="underline hover:text-foreground">
            /scaffolding/organization
          </Link>
        </p>
      </section>
    </ScaffoldingShell>
  );
}
