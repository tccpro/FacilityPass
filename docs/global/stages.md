# Project stages (STAGE 0–8)

**Status:** AUTHORITATIVE planning baseline (`PROJECT-LOGIC.md`; restructure master prompt §40–41)

One high-level project-stage vocabulary. A stage is a **product outcome with separate
business, product, technical, and AI goals** — never a backend/frontend/AI phase.
Never create "backend stage" or "frontend stage" streams.

Each stage defines:

```text
BUSINESS GOAL
PRODUCT GOAL
TECHNICAL GOAL
AI GOAL
EXIT CRITERIA
```

Do not treat stage order as permission to pre-decide the market wedge. If evidence
requires a roadmap change, change it explicitly through a decision record.

Delivery runs through `work -> segment -> phase -> test -> staging -> main`
(`docs/global/git-workflow.md`). The branch token `<milestone>` is the stage-delivery
unit: stage codes `s0`–`s8` (e.g. `segment/s3/search-backend`).

## STAGE 0 — Product Definition  ← CURRENT STAGE

- **Business goal:** decide the first user/problem/value mechanism and what the first
  release is and is not.
- **Product goal:** first complete user journey; product surfaces sketched
  (`docs/global/vision-and-scope.md`); open decisions identified
  (`docs/global/OPEN-DECISIONS.md`).
- **Technical goal:** platform foundation trustworthy enough to build on — quality
  gate, CI, lazy database boundary, env contract, health, monorepo decision made or
  consciously deferred.
- **AI goal:** none in production; AI coding assistants only.
- **Exit criteria:** first user/problem/workflow/value/option-universe/publication/
  success criteria decided by the Founder and recorded as accepted PDR(s); open
  decisions either closed or explicitly deferred.

**Current status:** platform foundation largely exists (quality gate, CI, lazy DB,
env contract, health module, first data vertical, seeded curated vocabulary — see
`docs/founder/progress-log.md`). The Stage 0 **product decisions are the open work**;
do not rush implementation while they are unstable.

## STAGE 1 — Supply / Option Truth

- **Business goal:** prove real ways of obtaining capabilities can be represented
  credibly enough to support a user decision.
- **Product goal:** provider/option information is understandable, with evidence and
  uncertainty visible.
- **Technical goal:** capability-centered supply model — Organization → Provider →
  Offering → Capability → AccessPath — with provenance (`docs/founder/data-model.md`).
- **AI goal:** none required; deterministic curation/import first.
- **Exit criteria:** real supply represented with provenance and uncertainty; demo
  data clearly marked; import/validation contract works.

## STAGE 2 — Multi-Option Discovery

- **Business goal:** prove credible alternatives can be discovered and compared under
  consistent neutral rules.
- **Product goal:** discovery + multi-dimensional comparison across options.
- **Technical goal:** search (PostgreSQL-first), filtering, evidence projection.
- **AI goal:** none by default.
- **Exit criteria:** a user discovers useful supply more clearly/efficiently than
  their current method; supplier neutrality holds in the UI logic.

## STAGE 3 — Decision Intelligence

- **Business goal:** prove FacilityPass improves a real capability decision beyond
  directory/search value.
- **Product goal:** requirement confirmation, independent evaluation dimensions,
  explainable strategy options.
- **Technical goal:** requirement model + deterministic evaluation + `UNKNOWN`/
  `CONFLICT` semantics + reason codes.
- **AI goal:** intent extraction may exist as `experiment/s3/intent-extraction` —
  never the authoritative requirement engine.
- **Exit criteria:** decision value demonstrated beyond search.

## STAGE 4 — Qualified Action Workflow

- **Business goal:** move a decision into a real action appropriate to the selected
  strategy (provider request, internal build, training, lease, …).
- **Product goal:** access path → qualification → structured qualified action.
- **Technical goal:** action/request model, delivery/notification where required.
- **AI goal:** drafting assistance behind capability ports only.
- **Exit criteria:** users move from decision to action.

## STAGE 5 — Commercial Pilot

- **Business goal:** validate real customer behavior, provider responses, outcomes,
  willingness to pay, repeat usage, operating cost.
- **Product goal:** the validated wedge workflow works end to end with real people.
- **Technical goal:** hardening sufficient for real data: security basics, staging,
  monitoring of the pilot funnel.
- **AI goal:** bounded, measured assistance only.
- **Exit criteria:** pilot evidence recorded against the business gates
  (evidence ladder in `PROJECT-LOGIC.md`).

## STAGE 6 — Commercial Platform V1

- **Business goal:** production-ready end-to-end workflow for the validated wedge.
- **Product goal:** complete, trustworthy primary journey.
- **Technical goal:** security, observability, migration/recovery maturity, E2E
  coverage, data-freshness operations.
- **AI goal:** controlled AI spend, evaluation-driven routing where AI operates.
- **Exit criteria:** technical + product + business release gates pass
  (`PROJECT-LOGIC.md`; `docs/global/testing-quality.md`).

## STAGE 7 — SaaS Expansion

Only after recurring value is demonstrated: organizations, teams, blueprints,
history, dashboards, billing — each as validated.

## STAGE 8 — Institution / Dedicated

Only with enterprise/institution demand: SSO, private networks, dedicated
environments, custom policies, integrations.

## Rules

- The first product stays narrow (see `PROJECT-LOGIC.md` §2 and
  `docs/global/OPEN-DECISIONS.md`) — never build the full vision simultaneously.
- Do not mechanically create every listed segment; scope follows the validated wedge.
- Do not create all database tables in advance; a table arrives with the stage that
  needs it.
- A stage closes only through its exit criteria — real product/business outcomes,
  not code completion.

## Relationship to earlier vocabularies

The v3 M0–M8 milestone plan (`docs/founder/archive/2026-milestones-v3.md`) and the v1
Phase 0–7 plan (`docs/founder/archive/2026-governance-v2/roadmap-v1-phases.md`) are
superseded history. Rough mapping: M0/v1-Phase0 → Stage 0 foundation work; M1+M2 →
Stage 1; M3 → Stage 2; M4 → Stage 3; M5+M6 → Stages 4–6; M7 → per-stage AI goals;
M8 → Stage 6.
