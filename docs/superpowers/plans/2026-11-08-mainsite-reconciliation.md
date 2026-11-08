# Mainsite Reconciliation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Put the five core files from `7ec4a25ea5be70f0f175850a105a8ef2f490ba1a` onto a branch whose parent is current main `4c186342690f5f44e2b6bc59266398cc61e84768`, with captured sitemap fixtures and tests, and without publishing.

**Architecture:** `7ec4a25` is one commit ahead of main and changes only `src/routes/index.tsx`, `src/routes/work.tsx`, `src/routes/blog.index.tsx`, `src/routes/contact.tsx`, and `src/styles/core.css`. Checkout those blobs onto a new commit. Do not merge, reset, or fast-forward main. Compare the committed sitemap to a captured live loc list. Do not regenerate the sitemap and do not edit routes, redirects, copy, nav, or dependencies.

**Tech Stack:** Git, Bun test (`bun:test`), existing Vite app. No new packages.

## Global Constraints

- Steve, Nov 8 2026 12:17 AM ET: one tested reconciliation PR, no merge, no deploy. Both stay his decision.
- Steve, Nov 8 2026 12:20 AM ET: do not break the live site. Preserve deployed behavior, content, navigation, and assets, and unrelated main changes. No dependency churn. No speculative fixes.
- Live apex `stevepeeleii.com` aliases to `dpl_23zKkD9EHHE3u8HBhgYeGrzjyosh` (target staging). Git metadata on that deployment names `rebuild-core-final-2026-11-06` at `7ec4a25ea5be70f0f175850a105a8ef2f490ba1a`. The deployment `source` field was not returned. Commit metadata does not prove artifact bytes.
- `GET /v6/deployments/{id}/files` returned 404 `File tree not found`. Do not retry and do not use a CLI fallback.
- Prior `GET /user` and branch-protection calls returned 403. Do not retry them.
- Do not post to Linear, Slack, or GitHub unless the native PR actor is verified as OSCAR or a Cursor bot acting for OSCAR, and a branch publish is proven not to move production. Otherwise stop before push.
- No em dashes in new docs or tests.
- Report preexisting wording and redirect defects. Do not fix them in this diff.
- Do not hardcode a 78-URL sitemap. The committed `public/sitemap.xml` blob stays `0759bc85011a5cfe41cb2b56ce054222f3d8920a`.

---

### Task 1: Captured sitemap comparison

**Files:**
- Create: `tests/fixtures/live-sitemap-2026-11-06.locs.txt`
- Create: `tests/fixtures/live-not-in-committed-sitemap.txt`
- Test: `tests/mainsite-reconciliation.test.ts`

**Interfaces:**
- Consumes: `public/sitemap.xml` and git blobs at `4c186342690f5f44e2b6bc59266398cc61e84768` and `7ec4a25ea5be70f0f175850a105a8ef2f490ba1a`
- Produces: test name `committed sitemap blob is shared and live-only locs match the capture`

- [x] **Step 1: Write the failing test and fixtures**

Copy the 78 live locs from the Nov 8 capture into `tests/fixtures/live-sitemap-2026-11-06.locs.txt`. Write the four live-only locs, in capture order, to `tests/fixtures/live-not-in-committed-sitemap.txt`:

```text
https://stevepeeleii.com/blog/forge-a-start-engine-for-builders
https://stevepeeleii.com/blog/fourteen-hours
https://stevepeeleii.com/blog/the-parsing-layer
https://stevepeeleii.com/blog/why-i-built-mastery-engine
```

- [x] **Step 2: Run the sitemap test**

Run: `bun test tests/mainsite-reconciliation.test.ts`
Expected: FAIL until Task 2 checks the core blobs out. The sitemap assertion itself can already pass because `public/sitemap.xml` is unchanged.

- [x] **Step 3: Do not regenerate the sitemap**

Do not run `bun run build`. Its `prebuild` script fetches feeds and rewrites `public/sitemap.xml` from Sanity.

### Task 2: Restore the five core blobs and record lineage

**Files:**
- Modify: `src/routes/index.tsx`
- Modify: `src/routes/work.tsx`
- Modify: `src/routes/blog.index.tsx`
- Modify: `src/routes/contact.tsx`
- Create: `src/styles/core.css`
- Create: `docs/reconciliation/2026-11-08-production-lineage.md`
- Test: `tests/mainsite-reconciliation.test.ts`

**Interfaces:**
- Consumes: blob ids from `git rev-parse 7ec4a25ea5be70f0f175850a105a8ef2f490ba1a:<path>`
- Produces: a worktree whose hashes for those five paths equal that commit, and whose other frozen paths still equal main

- [x] **Step 1: Checkout only the five paths**

```bash
git checkout 7ec4a25ea5be70f0f175850a105a8ef2f490ba1a -- \
  src/routes/index.tsx \
  src/routes/work.tsx \
  src/routes/blog.index.tsx \
  src/routes/contact.tsx \
  src/styles/core.css
```

- [x] **Step 2: Write the lineage doc**

Record SHAs, deployment ids, the missing `source` field, the 404 file tree, the 78-vs-74 diff, the generator behavior, preexisting defects, and the publish stop. Do not change those defects.

- [x] **Step 3: Run the test**

Run: `bun test tests/mainsite-reconciliation.test.ts`
Expected: PASS, including the allowlist of tracked paths versus `4c186342690f5f44e2b6bc59266398cc61e84768`.

- [x] **Step 4: Commit on the branch**

```bash
git add docs tests src/routes/index.tsx src/routes/work.tsx src/routes/blog.index.tsx src/routes/contact.tsx src/styles/core.css
git commit -m "Reconcile main worktree with the Nov 6 core blobs."
```

Do not push.

### Task 3: Local regression only

- [ ] **Step 1: Install from the existing lockfile without changing it**

Run: `bun install --frozen-lockfile`
Expected: `package.json` and `bun.lock` stay equal to main. If install would edit the lockfile, restore it and do not commit the edit.

- [ ] **Step 2: Build without prebuild**

Run: `bunx vite build`
Expected: local `.vercel/output` only. This preset names the output format. It is not a deploy command. Do not run `vercel deploy`.

- [ ] **Step 3: Stop before remote publish**

Push and `ManagePullRequest` stay blocked while GitHub actor identity is unverified or while a branch publish can move `stevepeeleii.com`. Missing project settings are UNKNOWN, not safe.
