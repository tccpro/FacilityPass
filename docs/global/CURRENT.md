# Current project status

**Status:** AUTHORITATIVE operational snapshot  
**Update whenever a milestone materially changes.**

## Product

FacilityPass is a **Research Capability Access Platform** (`PROJECT-LOGIC.md` §1):
given an R&D objective, identify the capability gap, determine the required
capability, discover credible ways to obtain it (ACCESS / OUTSOURCE / COLLABORATE /
TRAIN / TRANSFER / LEASE / ACQUIRE), and help the organization move toward a
qualified engagement. A facility is one provider context, not the root abstraction.

The first public form is a **controlled hosted web beta** proving one complete user
story end to end. Release geography/domain is an M0 business-gate decision (PDR when
made) — nothing hard-codes it. The earlier Europe/materials-characterization Scout
plan and the Seattle-wedge hypothesis are both product-learning history
(`docs/founder/archive/`, `docs/global/decisions/PDR-001-release-wedge.md`).

## Governance

**Project-logic v3 adopted 2026-09-05; guidelines restructured the same day per the
Founder's restructure master prompt** (archived owner-side): STAGE 0–8 vocabulary
replaces milestones, capability-before-facility is the permanent domain law,
supplier/option neutrality and the AI ambiguity/authority boundary are canonical,
and `docs/global/OPEN-DECISIONS.md` tracks every unresolved product decision.
`PROJECT-LOGIC.md` is the top authority; the v2 constitution is archived
(`docs/founder/archive/2026-governance-v2/`). Documentation is two-layered (ADR-013):
`docs/global/**` + root files are git-tracked and shareable with the Product &
Frontend Lead; `docs/founder/**` and `docs/product/**` are owner-private and never
stored in the repository.

Delivery now uses the six-level branch model (ADR-012):
`work/<developer>/<task> -> segment/<milestone>/<responsibility> -> phase/<milestone>
-> test/<milestone> -> staging -> main`. The existing `phase/00-*` and `staging`
branches predate the model and are reconciled at their next PR.

## Roles

- **Founder / Business & Core Systems Lead** — business + core platform (backend,
  data, AI architecture, security, infrastructure). Private guidelines: `docs/founder/`.
- **Product & Frontend Lead** — product design + frontend. Private guidelines:
  `docs/product/`.
- Joint ownership: shared contracts (`packages/contracts` in the target shape), major
  workflows, public DTO/API behavior, phase acceptance, release readiness.

## Engineering

Modular monolith heading toward the monorepo target shape (`apps/web` +
`packages/{domain,application,contracts,db,ai,ui,config}`) — see
`docs/global/PLATFORM-ARCHITECTURE.md` for the current `src/` mapping and transition
rule. The physical split is an M0 segment executed by explicit ADR, not speculatively.

Stack: TypeScript (strict) · Next.js 16 App Router · React 19 · Tailwind 4 ·
PostgreSQL + Drizzle · Zod · Vitest · Playwright · pnpm · Vercel-compatible.

## Progress (mapped to project stages — `docs/global/stages.md`)

**Current stage: STAGE 0 — Product Definition.** The product decisions that close
Stage 0 are open (`docs/global/OPEN-DECISIONS.md`): first customer/wedge, domain,
geography, option universe, publication boundary, value mechanism. Do not treat
existing implementation as settled product truth.

Platform foundation largely exists and serves later stages: quality gate, CI, lazy
database boundary, env contract, health module, first supply-side data vertical
(`techniques` table + migration + seeded curated vocabulary), repository → service →
page layering proven. Outstanding Stage 0 technical item: the monorepo physical
split decision (`apps/web` + `packages/*` — explicit ADR when triggered).

- Next: close Stage 0 product decisions (PDRs), then Stage 1 supply/option truth
  (capability-centered model per `docs/founder/data-model.md`).

## Immediate checklist

- [ ] Replace placeholder GitHub handles in `.github/CODEOWNERS`
      (`@founder-handle`, `@product-lead-handle`).
- [ ] Create branch rulesets for the six-level model (`docs/global/git-workflow.md` §12);
      confirm required check names match the quality-gate job names.
- [ ] Create the GitHub Project (fields/views per project-management practice); import
      active work as milestone/segment issues.
- [ ] Reconcile open `phase/00-*` branches into the new model at their next PR.
- [ ] Commit the pending implementation work and the v3 guideline adoption (see the
      commit plan in the working notes).
- [ ] Record the M0 business-gate outcome (customer/supply hypothesis, beta
      definition) as a PDR when agreed with the Product & Frontend Lead.

## Environment

- Local database: Docker container `scout-db` (PostgreSQL 17), databases
  `facilitypass` and `facilitypass_test` (separate from the unrelated `scout`
  database on the same server). Inspect with `pnpm db:inspect`.
- `DATABASE_URL` lives in `.env.local` (git-ignored). The quality gate passes with no
  database configured.

## Next update

When the M0 `monorepo-structure` decision lands, or the first M1 supply vertical
completes, or the M0 business-gate PDR is recorded.

