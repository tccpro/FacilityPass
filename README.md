# FacilityPass

**Know where your experiment can actually happen.**

FacilityPass is a research-capability access platform for R&D organizations that need
scientific capabilities they do not own. It helps researchers find scientific facilities
that appear compatible with a measurement they already know they need, inspect the
evidence behind each result, and ask the facility itself to confirm technical feasibility.

The permanent product philosophy:

> **FacilityPass recommends candidates. Facility experts confirm feasibility.**

This is a **product under construction, not a portfolio mockup or a code-generation
exhibit.**

---

## Engineering-led, AI-assisted

FacilityPass does not treat AI as either magic or as something to avoid.

Modern language models are powerful engineering tools, and this project uses them where
they genuinely improve development or product capability.

But an LLM call is not a substitute for software architecture.

Problems better solved with structured data, database queries, deterministic algorithms,
validation, state machines, tests, or scientific expert confirmation are implemented that
way. Where AI adds unique value — interpreting unstructured information, assisting
normalization, handling genuinely ambiguous language — it may be introduced behind
explicit interfaces with validated outputs.

The goal is not zero AI. The goal is **appropriate AI**.

> **Use AI where it earns its place. Engineer the rest.**

---

## What the product must never do

These constraints exist because FacilityPass is a **trust product**. Accuracy, provenance
and understandable reasoning matter more than impressive-looking automation.

| Rule                                           | Meaning                                                                                                                |
| ---------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| Unknown stays `UNKNOWN`                        | Missing information is reported as missing, never inferred into a convenient answer.                                   |
| Absence of our data is not evidence of absence | That FacilityPass has not curated a capability says something about FacilityPass, not about the facility.              |
| Inferred never renders as confirmed            | Evidence strength is shown, not flattened.                                                                             |
| A match is not a verification                  | An algorithmic result is `LIKELY_COMPATIBLE`. Only a facility representative's answer produces verified feasibility.   |
| No invented scientific facts                   | Capabilities, specifications, access conditions and constraints come from authoritative sources or are marked unknown. |

Status is always communicated by symbol **and** word, never by colour alone.

---

## One product, one repository, one engineering system

Frontend, backend, data, AI integration, scientific evidence, infrastructure, testing,
documentation and deployment are governed together while preserving explicit
responsibility boundaries.

The permanent reasoning chain:

```text
Research objective
  -> capability gap
  -> capability requirement
  -> access strategy
  -> research capability
  -> provider / facility / expert
  -> qualified request
  -> engagement
  -> outcome
```

---

## Architecture at a glance

A modular monolith. The direction of logic is one-way:

```text
UI  →  API / Server Action  →  Service  →  Domain  →  Repository  →  Database
```

React components and route handlers contain no scientific matching rules; repositories
decide no scientific compatibility. The boundary is enforced mechanically by ESLint, not
by memory — and there is an acceptance test that deliberately violates it to prove the
rule still bites.

The business engine is usable without the web UI, so the same services can later back a
public API or an agent-facing tool interface without rewriting the domain layer.

**Stack:** TypeScript (strict) · Next.js App Router · React · Tailwind CSS · PostgreSQL ·
Drizzle ORM · Zod · Vitest · Playwright · pnpm · Vercel.

---

## Quality gate

Every change must pass, with **no database configured**:

```text
pnpm lint        ESLint, zero warnings tolerated
pnpm typecheck   generate Next types, then tsc --noEmit
pnpm test        unit tests
pnpm build       production build
```

That the full gate passes without a `DATABASE_URL` is deliberate and enforced in CI: the
database dependency is lazy, and nothing evaluates it at build time.

Run Playwright for applicable user-facing flows. Never report a passing check that was
not executed.

---

## Repository rules

Documentation is two-layered (`docs/global/document-hierarchy.md`): the rules below are
**global and tracked in git** (shareable with the Product & Frontend Lead); backend/AI
guidelines (`docs/founder/`) and frontend/design guidelines (`docs/product/`) are
owner-private and not stored in the repository.

Before contributing, read in this order:

1. `PROJECT-LOGIC.md`
2. `AGENTS.md` if an AI coding agent is involved
3. `docs/global/document-hierarchy.md`
4. the domain-specific guidance for the change
5. `docs/global/CONTRIBUTING.md`

Important references:

- Canonical project logic: `PROJECT-LOGIC.md`
- Product vision and scope: `docs/global/vision-and-scope.md`
- Roles and decision authority: `docs/global/roles-and-authority.md`
- Architecture: `docs/global/PLATFORM-ARCHITECTURE.md`
- Delivery branch model: `docs/global/git-workflow.md`
- Project stages STAGE 0–8: `docs/global/stages.md`
- Open decisions: `docs/global/OPEN-DECISIONS.md`
- Testing/quality: `docs/global/testing-quality.md`
- Current status: `docs/global/CURRENT.md`

---

## Status

**Current stage: STAGE 0 — Product Definition** (`docs/global/stages.md`). The
long-term platform decisions that shape the first release — customer wedge, domain,
geography, option universe, value mechanism — are open and tracked in
`docs/global/OPEN-DECISIONS.md`. They are never resolved silently in code.

The platform foundation already exists and serves later stages: quality gate, CI,
lazy database boundary, environment contract, health module, a first supply-side
data vertical (`techniques` vocabulary table + migration + seeded curated data),
and the repository → service → page layering — in modular-monolith form, heading
toward the monorepo target shape.

Not yet implemented, by design: capability/provider modeling, evidence assertions,
search, comparison, decision intelligence, qualified actions, AI, authentication,
billing.

The authoritative current status lives in `docs/global/CURRENT.md`; the stage plan
in `docs/global/stages.md`.

---

## Licence

**None — all rights reserved.**

A public repository is not automatically open source. Without a `LICENSE` file, default
copyright applies: you may read and fork this repository on GitHub, but no reuse rights
are granted. This is deliberate — FacilityPass may become a business, and a licence is far
easier to add later than to retract.
