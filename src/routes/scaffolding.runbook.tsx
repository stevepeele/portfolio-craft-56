import { createFileRoute } from "@tanstack/react-router";
import { ScaffoldingShell, SectionHead, scaffoldingHead } from "@/components/scaffolding-shell";

const title = "Scaffolding — Runbook | Steve Peele II";
const description =
  "Private reference: deploy, rollback, DNS, secrets, and incident playbooks for the portfolio. Unlisted.";

export const Route = createFileRoute("/scaffolding/runbook")({
  head: () => scaffoldingHead("/scaffolding/runbook", title, description),
  component: RunbookPage,
});

function Play({ name, steps }: { name: string; steps: string[] }) {
  return (
    <div className="panel p-5 sm:p-6">
      <h3 className="font-display text-lg font-bold">{name}</h3>
      <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-muted-foreground">
        {steps.map((s, i) => (
          <li key={i} dangerouslySetInnerHTML={{ __html: s }} />
        ))}
      </ol>
    </div>
  );
}

const PLAYS: { name: string; steps: string[] }[] = [
  {
    name: "Ship code (normal)",
    steps: [
      "Make the change in <code>~/workspace/portfolio-craft-56</code> (or the app's repo).",
      "Run <code>bun run build</code> locally — routes must compile before anything ships.",
      "Push via the GitHub connector <code>push_files</code> API (owner/repo/branch + full file contents, one commit). Plain <code>git push</code> does not work from the VM.",
      "Verify: <code>git fetch</code> + <code>git show origin/main:&lt;path&gt;</code>.",
      "Trigger the build: API pushes do NOT fire Vercel's GitHub webhook (known gap since 2026-10-14). POST the \"manual-deploy\" hook (Vercel dashboard → stevepeeleii → Settings → Git → Deploy Hooks) and confirm a new deployment appears.",
      "Confirm the deployment is READY in the Vercel dashboard.",
      "Confirm the live URL returns 200 and renders the change.",
      "Linear sync: move the issue to Done, update descriptions, seed backlog.",
    ],
  },
  {
    name: "Site is down (HTTP 500)",
    steps: [
      "Check the Vercel deployment status first — is the latest deploy READY or FAILED?",
      "2026-10-14 precedent: a corrupted <code>src/data/hacking.ts</code> blanked the whole site at 00:30 EDT. Suspect data files that every route imports.",
      "If a bad deploy shipped: Vercel dashboard → Deployments → promote the previous READY deployment (instant rollback).",
      "Fix forward in the repo, rebuild locally, push via connector, verify.",
      "Log it: Linear issue in P-PLX-8 + a changelog entry.",
    ],
  },
  {
    name: "Deploy blocked — Vercel 402 (daily cap)",
    steps: [
      "The free plan allows 100 deployments/day (<code>api-deployments-free-per-day</code>, <code>retryAfter</code> in seconds).",
      "Do NOT keep retrying — it burns the quota. Note the <code>retryAfter</code> timestamp.",
      "Set a runonce cron for after the reset (e.g. next morning 06:00 ET) to ship the pending commit.",
      "Record the blocked deploy in <code>src/data/scaffolding-deploys.json</code> with status BLOCKED.",
    ],
  },
  {
    name: "Roll back DNS",
    steps: [
      "GoDaddy → stevepeeleii.com zone. Apex A record back to <code>185.158.133.1</code> (old IPs) if Vercel itself is the problem.",
      "<code>www</code> / <code>hi</code> CNAMEs point at <code>cname.vercel-dns.com</code> — repoint or remove as needed.",
      "MX records: untouched by the migration — do not modify.",
      "DNS propagation is not instant; allow up to an hour before declaring it failed.",
    ],
  },
  {
    name: "Rotate a leaked or suspect secret",
    steps: [
      "Mint the replacement first (provider dashboard or API) — never delete the old one before the new one works.",
      "Set the new value in Vercel project env (production / preview / dev as needed).",
      "Trigger a redeploy so the new env is picked up (env changes need a fresh deployment).",
      "Update the Secure Vault entry if the credential is stored there.",
      "Revoke the old credential at the provider.",
      "Never put the value in chat, Linear, or this docs hub — names only.",
    ],
  },
  {
    name: "Supabase is unreachable",
    steps: [
      "Check Supabase status page, then the project's dashboard for pausing (free-tier projects pause after inactivity).",
      "Unpause from the dashboard if needed — data is retained.",
      "Main-site impact: lead capture falls back to formsubmit.co email; auth-gated pages degrade — they must fail gracefully, never blank.",
      "If the Management API misbehaves: <code>/auth/v1/admin/users</code> 404s (use SQL on <code>auth.users</code>); <code>database/query</code> returns 201 on writes (that's success).",
    ],
  },
  {
    name: "Sanity Studio won't save / CORS errors",
    steps: [
      "sanity.io/manage → project <code>k74pcbpp</code> → API → CORS Origins.",
      "<code>https://stevepeeleii.com</code> and <code>https://www.stevepeeleii.com</code> must be listed with credentials allowed.",
      "Token issues: mint a fresh Editor token via the signed-in browser session (sanity.io/manage → API → Tokens). Use transiently, store nowhere.",
      "Blog publishing fallback: the Sanity API + <code>sanity.py</code> helper can publish posts directly (PLX-330 precedent).",
    ],
  },
  {
    name: "Add a new subdomain project",
    steps: [
      "Build the app (custom code, git repo). Standing rule: subdomain of stevepeeleii.com, never a vercel.app URL.",
      "Vercel: add the custom domain to the project; copy the DNS records.",
      "Hand Steve the DNS records to add at the registrar (he owns DNS).",
      "Apply build standards: Segment installed, no Chatflows, 'Meet SPII' corner card, splash + auth + settings, Slack #deploys coverage, hack nav entry.",
      "Document it: add the project to <code>/scaffolding/projects</code> data + a changelog entry.",
    ],
  },
];

function RunbookPage() {
  return (
    <ScaffoldingShell
      path="/scaffolding/runbook"
      eyebrow="Scaffolding / Runbook"
      title={
        <>
          When something <span className="text-gradient">breaks.</span>
        </>
      }
      intro="Step-by-step playbooks for deploys, rollbacks, DNS, secrets, and incidents. Written for 2 AM — no assumed context, every command spelled out."
      updated="2026-10-14"
    >
      <section className="space-y-6">
        <SectionHead n="01" sub="The plays, in the order you'll reach for them.">
          Playbooks<span className="text-gradient">.</span>
        </SectionHead>
        <div className="grid gap-4">
          {PLAYS.map((p) => (
            <Play key={p.name} name={p.name} steps={p.steps} />
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <SectionHead n="02" sub="Where to look first, by symptom.">
          Triage <span className="text-gradient">cheat sheet.</span>
        </SectionHead>
        <div className="panel space-y-3 p-5 text-sm text-muted-foreground sm:p-6">
          <p><span className="font-semibold text-foreground">Whole site 500:</span> Vercel deployments → promote last READY. Suspect shared data files (<code>hacking.ts</code> precedent).</p>
          <p><span className="font-semibold text-foreground">One page broken:</span> check its route file + data imports; rebuild locally to catch compile errors.</p>
          <p><span className="font-semibold text-foreground">Deploy stuck:</span> Vercel dashboard build logs. 402 = daily cap, wait for reset.</p>
          <p><span className="font-semibold text-foreground">Forms not delivering:</span> formsubmit.co first (direct email), then Supabase lead tables.</p>
          <p><span className="font-semibold text-foreground">Analytics silent:</span> Segment init in <code>__root.tsx</code> → check write key present; PostHog is dormant by design until <code>VITE_POSTHOG_KEY</code> is set.</p>
          <p><span className="font-semibold text-foreground">Blog not updating:</span> Sanity CORS origins + token; publish via API fallback.</p>
        </div>
      </section>
    </ScaffoldingShell>
  );
}
