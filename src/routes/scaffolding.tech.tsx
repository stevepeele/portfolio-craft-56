import { createFileRoute } from "@tanstack/react-router";
import { ScaffoldingShell, SectionHead, DocTable, scaffoldingHead } from "@/components/scaffolding-shell";

const title = "Scaffolding — Tech Considerations | Steve Peele II";
const description =
  "Private reference: standing build standards, architecture decisions, environment gotchas, and security posture. Unlisted.";

export const Route = createFileRoute("/scaffolding/tech")({
  head: () => scaffoldingHead("/scaffolding/tech", title, description),
  component: TechPage,
});

const STANDARDS_ROWS = [
  ["Issues for everything", "Every thing done gets a hand-written Linear issue in the right project — create the project if none is clear. No scripted descriptions, dependencies, or subtasks."],
  ["Banners OFF", "No SPIIX 'Get signals' banner, no HEADROOM STEALTH20 on builds (reverses the 2026-10-10 standard). Splash landing page + working sign up/login + user settings stay."],
  ["Segment ALWAYS", "Installed on every build, no exceptions."],
  ["No vendor chat widgets", "Never deploy HubSpot chat flows or third-party chat widgets on new apps. Conversational surfaces are Oscar's domain — Oscar handles all chatflows and responses, directed by Muse (Steve → Muse → Oscar; Oscar's charter hard gates stand). Analytics are always structured AND implemented."],
  ["'Meet SPII' corner card", "Small dismissible card on every build, linking to stevepeeleii.com."],
  ["Per-project branding", "Each project is its own brand unless already defined."],
  ["Slack deploy alerts", "Every deploy posts to #deploys — verify new apps are covered by the deploy watchers."],
  ["Hack nav upkeep", "Each app keeps status + details current on the hacking nav — build pages as needed, update as builds move."],
  ["Subdomains, not vercel.app", "All new projects deploy on stevepeeleii.com subdomains. Set up the custom domain in Vercel; hand Steve the DNS records."],
];

const ADR_ROWS = [
  ["Lovable is OUT (2026-10-14)", "Production deploys via Vercel (project stevepeeleii, auto-deploy on push to main). No Lovable sync check, no Lovable publish, ever. Trigger: 00:30 EDT outage (corrupted hacking.ts → HTTP 500) + unreviewed Lovable-side AI edits landing via two-way sync (PLX-293)."],
  ["Custom code, never builders", "All apps are hand-built code in git repos, self-hosted. The Lovable build path was killed 2026-10-10."],
  ["Supabase project sharing", "Free-tier 2-project limit → several apps share Dardo's project. Auth + tables namespaced per app."],
  ["TanStack Start for main site", "SSR via Nitro with the Vercel preset. File-based routes in src/routes/."],
  ["Sanity for content", "Project k74pcbpp, dataset production. Studio embedded at /studio. Blog + content only — not app data."],
  ["formsubmit.co for lead email", "SPIIX 'Get the signal' emails steve@stevepeeleii.com directly. The HubSpot form/workflow path was killed by his 'stop.' — connectors first, never pitch/sell."],
  ["Pivot Queue (P-PLX-28)", "When a new ask interrupts in-flight work: log the pivot (dropped ask, interrupting ask, resume point), update Linear, park visibly. Never let an interrupted ask die silently."],
  ["Dev work flow (mandatory)", "Linear first → build → supplemental page updates → docs → commit+push → Linear sync → Vercel check. Skipping a step is the failure mode."],
];

const GOTCHA_ROWS = [
  ["Text fetch ≠ rendered page", "browser.open returns server-rendered text and misses JS-painted content (the Vault gallery read 'No templates match' when 98 were live). Verify in the live browser before reporting absence."],
  ["exec stdin + heredoc = empty stdin", "When the command contains a heredoc, the stdin parameter never reaches the script. Write the script to a file and run the file when piping secrets."],
  ["sb-mgmt CLI is broken", "Imports dynamic_credentials from a path that no longer exists. Write inline python with the corrected sys.path instead."],
  ["Plain git push doesn't work from the VM", "No credentials (HTTPS prompts, SSH blocked by proxy). Push via the GitHub connector push_files API; verify with git fetch + git show origin/main:<path>."],
  ["Binary assets can't push via connector", "og-image.jpg and friends exceed the API path — upload via GitHub web UI or Vercel dashboard."],
  ["package-lock.json excluded from pushes", "Connector size limit — npm resolves from package.json."],
  ["Cron workers lack chat tools", "kind=agent cron workers don't have the chat.* namespace (verified 2026-10-14). Jobs needing chat.list/archive/send_message must use execution.kind=main_agent."],
  ["Vercel 402 deploy cap", "100 deployments/day on the free plan (api-deployments-free-per-day). Hit 2026-10-14 — retry next day via cron."],
  ["Supabase Management API quirks", "/auth/v1/admin/users 404s — reset passwords via SQL update on auth.users. database/query returns 201 on writes."],
  ["Dropbox double-nest", "create-file once nested under /Steve Peele II/Steve Peele II/ — always verify placement with search/list_folder and fix with move. move/copy/delete take batch entries; check result.isError, not just outer ok."],
  ["Browser hard-stop rule", "A browser task that stops converging — 15 min no progress or same step failing 3× — stops. Take it over silently via another route or hand him ONE clean phone-side step. Never narrate the flailing."],
];

const SECURITY_ROWS = [
  ["Hard gates", "Money, messages, filings, payments, sends, and commitments move only on his explicit word. A bare 'yes' to an either/or is not approval — pin the antecedent first. Sweeping 'do everything' orders never override the gates."],
  ["No secrets in repo/chat", "Env names only in docs. Values live in Vercel project env and the Secure Vault. Raw secrets he pastes never land anywhere durable."],
  ["Financial applications", "Fill and park at the final review screen — never submit. A submit button is legal attestation plus a hard inquiry."],
  ["Hard stops are final", "'Stop.' 'Nope.' 'x.' kill the path instantly and stay dead unless he reopens it."],
  ["Auth model", "Mission Control: Supabase Auth, steve@stevepeeleii.com only. Apps ship their own sign up/login + user settings."],
  ["Outreach sends", "First-touch drafts stage as draft → Approve → 'Mark sent'. No send mechanism fires without his word."],
];

function TechPage() {
  return (
    <ScaffoldingShell
      path="/scaffolding/tech"
      eyebrow="Scaffolding / Tech considerations"
      title={
        <>
          Decisions, standards, <span className="text-gradient">and gotchas.</span>
        </>
      }
      intro="The technical judgment behind the portfolio: standing build standards, architecture decision records, environment quirks that have burned time before, and the security posture that never bends."
      updated="2026-10-14"
    >
      <section className="space-y-6">
        <SectionHead n="01" sub="His standing orders for every build. These don't get re-decided.">
          Build <span className="text-gradient">standards.</span>
        </SectionHead>
        <DocTable
          head={["Standard", "What it means"]}
          rows={STANDARDS_ROWS.map((r) => [r[0], r[1]])}
        />
      </section>

      <section className="space-y-6">
        <SectionHead n="02" sub="Why the stack looks the way it does. New decisions get recorded here.">
          Architecture <span className="text-gradient">decisions.</span>
        </SectionHead>
        <DocTable
          head={["Decision", "Rationale"]}
          rows={ADR_ROWS.map((r) => [r[0], r[1]])}
        />
      </section>

      <section className="space-y-6">
        <SectionHead n="03" sub="Environment quirks and failure modes, learned the hard way. Check here before debugging.">
          Gotchas &amp; <span className="text-gradient">lessons.</span>
        </SectionHead>
        <DocTable
          head={["Lesson", "Detail"]}
          rows={GOTCHA_ROWS.map((r) => [r[0], r[1]])}
        />
      </section>

      <section className="space-y-6">
        <SectionHead n="04" sub="The gates that never bend — for urgency, convenience, or momentum.">
          Security <span className="text-gradient">posture.</span>
        </SectionHead>
        <DocTable
          head={["Rule", "What it means"]}
          rows={SECURITY_ROWS.map((r) => [r[0], r[1]])}
        />
      </section>
    </ScaffoldingShell>
  );
}
