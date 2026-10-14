import { createFileRoute } from "@tanstack/react-router";
import { ScaffoldingShell, SectionHead, DocTable, CodeBlock, scaffoldingHead, StatusPill } from "@/components/scaffolding-shell";

const title = "Scaffolding — Infrastructure | Steve Peele II";
const description =
  "Private reference: Vercel, GitHub, Supabase, Sanity, Segment, HubSpot — accounts, projects, regions, and where secrets live (names only). Unlisted.";

export const Route = createFileRoute("/scaffolding/infrastructure")({
  head: () => scaffoldingHead("/scaffolding/infrastructure", title, description),
  component: InfrastructurePage,
});

const VERCEL_ROWS = [
  ["Team", "stevepeeles-projects", "All projects live under this team"],
  ["stevepeeleii", "prj_FJURyGFI1tDorfFPbGab4PVTRUwO", "Main site. Auto-deploy on push to main (connected 2026-10-14)"],
  ["sozo-loveland", "Vercel project", "Sozo Loveland church site. Vercel Authentication (SSO) disabled 2026-10-14 — public"],
  ["mission-control", "Vercel project", "Mission Control ops dashboard (missioncontrol.stevepeeleii.com). Deploys blocked 2026-10-14 by 402 daily cap"],
  ["local-growth-*", "Vercel project", "Local Growth Fix ops app. Deployed to production 2026-10-14 (PLX-316)"],
];

const GITHUB_ROWS = [
  ["Account", "stevepeele", "Personal account; repos created via browser (connector API 403s on repo creation)"],
  ["portfolio-craft-56", "main", "Main site. Push via connector push_files API — plain git push has no credentials on the VM"],
  ["App repos", "main", "Per-app repos (stageplot-ai, profolio, dardo, etc. — see Projects). Verify placement after connector ops"],
];

const SUPABASE_ROWS = [
  ["Organization", "free tier — 2-project limit", "Several apps share Dardo's project because of this limit"],
  ["dardo", "sddcdfpgbgawoywupmvz · us-east-1", "Shared backend: auth + lead tables for the main site and multiple apps"],
  ["Mission Control auth", "Supabase Auth, steve@stevepeeleii.com only", "Login page supports password + magic link/OTP"],
];

const SECRET_ROWS = [
  ["Vercel project env", "All API keys and env vars (production / preview / dev)", "Set in Vercel dashboard per project"],
  ["Secure Vault", "Supabase PAT, service credentials", "Muse secure storage — never in chat, never in repo"],
  ["~/.ssh", "Ed25519 key pair (persistent)", "Default pair for authorized SSH; never expose private key"],
  ["Browser saved logins", "Site credentials (Sanity, Vercel, etc.)", "Agent browser profile — sign-in handled by browser"],
  ["UC Health MyChart login", "Saved in vault", "Portal messaging to Dr. Dailey is blocked — phone path only"],
];

const CONNECTOR_ROWS = [
  ["Linear", "Issues/projects", "Read + write (OAuth). System of record for all build work"],
  ["GitHub", "Repos", "push_files API for pushes; API 403s on repo creation — use browser"],
  ["Vercel", "Deploys", "Auto-deploy on push; dashboard for manual redeploy/rollback"],
  ["Supabase", "Management API", "PAT in vault. sb-mgmt CLI is BROKEN (bad import path) — use inline python with corrected sys.path"],
  ["Sanity", "CMS API", "Project k74pcbpp. Token 'Muse-v3' (Editor) minted 2026-10-14 via browser — value used transiently, stored nowhere"],
  ["Dropbox", "Files", "Team root NOT writable — use /Steve Peele II/Muse Library/. Verify placement (double-nest quirk)"],
  ["Gmail", "Email", "Read/search/send with approval. Protected OTP reads for sign-in flows"],
  ["Plaid", "Finances", "Bank/card/loan/investment reads. Mercury-Atlas link unconfirmed (flagged, not acted on)"],
  ["Stripe", "Payments", "Unconnected on all apps (standing). New secret key unconfirmed (flagged)"],
];

const SUBDOMAIN_DIAGRAM = `stevepeeleii.com ───────────── main site (Vercel: stevepeeleii)
www.stevepeeleii.com ───────── CNAME → cname.vercel-dns.com
hi.stevepeeleii.com ────────── CNAME → cname.vercel-dns.com
vault.stevepeeleii.com ─────── Muse Vault — 98 templates (Product Hunt launch 2026-10-14)
missioncontrol.stevepeeleii.com  Mission Control — ops dashboard (Supabase Auth)
meet.stevepeeleii.com ───────── → cal.com/peele (scheduling)
signalsbyspii.com ──────────── 302 → stevepeeleii.com/spiix (IONOS forwarding)

Rule (standing): all new projects deploy on stevepeeleii.com subdomains,
never on vercel.app URLs. DNS records handed to Steve to add.`;

function InfrastructurePage() {
  return (
    <ScaffoldingShell
      path="/scaffolding/infrastructure"
      eyebrow="Scaffolding / Infrastructure"
      title={
        <>
          Where everything <span className="text-gradient">lives.</span>
        </>
      }
      intro="Every account, project, region, and secret location across the portfolio. Names only — values live in Vercel project env and the Secure Vault, never here."
      updated="2026-10-14"
    >
      <section className="space-y-6">
        <SectionHead n="01" sub="Team stevepeeles-projects. Auto-deploy on push to main where connected.">
          Vercel <span className="text-gradient">hosting.</span>
        </SectionHead>
        <DocTable
          head={["Project", "ID / detail", "Notes"]}
          rows={VERCEL_ROWS.map((r) => [<code className="font-mono text-xs">{r[0]}</code>, <code className="font-mono text-xs">{r[1]}</code>, r[2]])}
        />
        <div className="panel space-y-2 p-5 text-sm text-muted-foreground">
          <p><span className="font-semibold text-foreground">Free-plan deploy cap:</span> 100 deployments/day — the 402 <code>api-deployments-free-per-day</code> error blocked Mission Control on 2026-10-14. Retry next day (cron set).</p>
          <p><span className="font-semibold text-foreground">Webhook gap (2026-10-14):</span> commits pushed via the GitHub connector API do not fire Vercel's build webhook. After every connector push, POST the "manual-deploy" hook (dashboard → stevepeeleii → Settings → Git → Deploy Hooks) and confirm the deployment appears.</p>
          <p><span className="font-semibold text-foreground">Redeploy vs push:</span> dashboard Redeploy rebuilds the same commit — it does not pull latest. Push a commit to ship new code.</p>
        </div>
      </section>

      <section className="space-y-6">
        <SectionHead n="02" sub="Source of truth for code. GitHub actions are pre-approved when he asked for the work.">
          GitHub <span className="text-gradient">source control.</span>
        </SectionHead>
        <DocTable
          head={["What", "Detail", "Notes"]}
          rows={GITHUB_ROWS.map((r) => [<code className="font-mono text-xs">{r[0]}</code>, r[1], r[2]])}
        />
      </section>

      <section className="space-y-6">
        <SectionHead n="03" sub="Backend for auth and data. Free-tier limits shape the architecture.">
          Supabase <span className="text-gradient">backend.</span>
        </SectionHead>
        <DocTable
          head={["What", "Detail", "Notes"]}
          rows={SUPABASE_ROWS.map((r) => [<code className="font-mono text-xs">{r[0]}</code>, <code className="font-mono text-xs">{r[1]}</code>, r[2]])}
        />
        <div className="panel space-y-2 p-5 text-sm text-muted-foreground">
          <p><span className="font-semibold text-foreground">Password reset note (2026-10-14):</span> Management API <code>/auth/v1/admin/users</code> 404s — use SQL <code>update auth.users set encrypted_password = crypt(...)</code> via the management API query path instead.</p>
          <p><span className="font-semibold text-foreground">Magic link:</span> triggerable server-side via POST to <code>/auth/v1/otp</code> with the anon key in <code>~/workspace/mission-control/.env</code> (name only — the file itself stays on the VM).</p>
        </div>
      </section>

      <section className="space-y-6">
        <SectionHead n="04" sub="Content, analytics, CRM — the third-party services wired into the stack.">
          Services <span className="text-gradient">&amp; integrations.</span>
        </SectionHead>
        <DocTable
          head={["Service", "Project / ID", "Status"]}
          rows={[
            ["Sanity CMS", <code className="font-mono text-xs">k74pcbpp</code>, "dataset production · org ouqdj95oz"],
            ["Segment", "write key hardcoded in src/lib/segment.ts", "sitewide analytics — key value never shown"],
            ["HubSpot", "portal 22009185 (Pan Labs)", "live chat flows + CRM; chat management cron replies as his assistant"],
            ["PostHog", "gated on VITE_POSTHOG_KEY", "instrumented but dormant until key is set"],
            ["formsubmit.co", "SPIIX signal + growth-ladders leads", "emails steve@stevepeeleii.com directly"],
          ].map((r) => [r[0], r[1], <StatusPill status={typeof r[2] === "string" && r[2].includes("dormant") ? "Deferred" : "Live"} />])}
        />
        <p className="text-sm text-muted-foreground">Detail: <span className="font-mono text-xs">/scaffolding/architecture/analytics</span> and <span className="font-mono text-xs">/scaffolding/architecture/data-flows</span>.</p>
      </section>

      <section className="space-y-6">
        <SectionHead n="05" sub="Registrar, records, and the subdomain rule.">
          Domains &amp; <span className="text-gradient">DNS.</span>
        </SectionHead>
        <CodeBlock title="Subdomain map">{SUBDOMAIN_DIAGRAM}</CodeBlock>
        <DocTable
          head={["Host", "Type", "Value", "Registrar"]}
          rows={[
            ["@", "A", <code className="font-mono text-xs">76.76.21.21</code>, "GoDaddy (stevepeeleii.com zone)"],
            ["www", "CNAME", <code className="font-mono text-xs">cname.vercel-dns.com</code>, "GoDaddy"],
            ["hi", "CNAME", <code className="font-mono text-xs">cname.vercel-dns.com</code>, "GoDaddy"],
            ["signalsbyspii.com @", "302 redirect", "→ https://stevepeeleii.com/spiix", "IONOS (forwarding rule)"],
          ]}
        />
      </section>

      <section className="space-y-6">
        <SectionHead n="06" sub="Where credentials live. This table lists locations, never values.">
          Secret <span className="text-gradient">locations.</span>
        </SectionHead>
        <DocTable
          head={["Location", "What lives there", "Notes"]}
          rows={SECRET_ROWS.map((r) => [r[0], r[1], r[2]])}
        />
      </section>

      <section className="space-y-6">
        <SectionHead n="07" sub="Connected accounts Muse can operate — and their quirks.">
          Connector <span className="text-gradient">inventory.</span>
        </SectionHead>
        <DocTable
          head={["Connector", "Use", "Notes"]}
          rows={CONNECTOR_ROWS.map((r) => [r[0], r[1], r[2]])}
        />
      </section>
    </ScaffoldingShell>
  );
}
