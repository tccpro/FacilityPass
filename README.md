# FacilityPass

**Know where your experiment can actually happen.**

FacilityPass Scout helps researchers and small R&D teams find scientific facilities that
appear compatible with a measurement they already know they need, inspect the evidence
behind each match, and ask the facility itself to confirm technical feasibility.

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

The goal is not zero AI. The goal is **appropriate AI**. FacilityPass should not need
thousands of unnecessary tokens or an expensive AI plan to perform ordinary product
operations.

> **Use AI where it earns its place. Engineer the rest.**

What this repository is meant to demonstrate is not that AI was avoided, but that using it
well still requires engineering judgement: knowing when a query is better than a prompt,
when a state machine is better than a classifier, when a test is required, when evidence is
insufficient, and when a human domain expert has to decide.

---

## What the product must never do

These constraints exist because FacilityPass is a **trust product**. Accuracy, provenance
and understandable reasoning matter more than impressive-looking automation.

| Rule | Meaning |
| --- | --- |
| Unknown stays `UNKNOWN` | Missing information is reported as missing, never inferred into a convenient answer. |
| Absence of our data is not evidence of absence | That FacilityPass has not curated a capability says something about FacilityPass, not about the facility. |
| Inferred never renders as confirmed | Evidence strength is shown, not flattened. |
| A match is not a verification | An algorithmic result is `LIKELY_COMPATIBLE`. Only a facility representative's answer produces verified feasibility. |
| No invented scientific facts | Capabilities, specifications, access conditions and constraints come from authoritative sources or are marked unknown. |

Status is always communicated by symbol **and** word, never by colour alone.

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

## Status

**Phase 0 — Foundation.** In progress.

Phase 0 proves six things and nothing more: Next.js works, TypeScript works, the quality
gate works, a Vercel-compatible build works, the database dependency is lazy, and the
architectural boundaries hold.

It deliberately contains **no** facility data, no search, no matching engine, no
authentication, no AI provider, and no migrations for future features.

Phase 0 is complete when another developer can clone this repository, install
dependencies, run the four quality checks **with no database configured**, and understand
the architecture.

---

## Working in this repository

```text
phase/*  →  staging  →  main
```

`main` is approved product state. `staging` is the integrated working state and should
always be green. `phase/*` branches carry one coherent, independently testable change
each.

See **[docs/git-workflow.md](docs/git-workflow.md)** for the full branch policy and the
public/private file boundary, **[docs/cli.md](docs/cli.md)** for the command contract, and
**[docs/debugging.md](docs/debugging.md)** for how failures are handled.

> Some project documents are intentionally not published here. They hold product strategy
> rather than engineering detail. Nothing in the public repository depends on them.

---

## Licence

**None — all rights reserved.**

A public repository is not automatically open source. Without a `LICENSE` file, default
copyright applies: you may read and fork this repository on GitHub, but no reuse rights
are granted. This is deliberate — FacilityPass may become a business, and a licence is far
easier to add later than to retract.
