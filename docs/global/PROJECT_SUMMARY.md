# FacilityPass project summary

## Product

FacilityPass is a research-capability access and intelligence platform. It helps R&D organizations understand a capability gap, identify suitable research capabilities/providers, evaluate evidence and practical access paths, create a qualified request, and eventually learn from engagement outcomes.

It is not primarily an equipment directory, generic chatbot, booking system, billing system, or generic marketplace.

## Permanent value proposition

```text
Research objective
 -> capability gap
 -> capability requirement
 -> access strategy
 -> capability/provider
 -> qualified request
 -> engagement
 -> outcome
```

FacilityPass should make that path faster, clearer, more reliable, and economically better without weakening scientific truth.

## First publication shape

The first public form is a **controlled hosted web beta of the FacilityPass platform**
— not a complete SaaS suite, not a dedicated OS/deployment, not a generic AI chatbot
(`PROJECT-LOGIC.md` §2). Which supply geography and domain it targets is decided by
the M0/M8 business gates and recorded as a PDR; it is never hard-coded.

## Product architecture

Current default: TypeScript modular monolith using the existing Next.js/React/PostgreSQL/Drizzle/Zod/Vitest/Playwright/pnpm/Vercel direction unless an ADR changes it.

Core flow:

```text
UI
 -> application/API boundary
 -> service/use case
 -> domain
 -> repository
 -> database/infrastructure
```

Frontend, backend, data, AI, tests, deployment, scientific data, and documentation remain one product/repository with explicit internal boundaries.

## Trust model

- missing evidence remains `UNKNOWN`;
- `INFERRED` is not confirmed;
- FacilityPass matching cannot create `VERIFIED_FEASIBLE`;
- scientific truth, operational state, access authorization, commercial state, and economic assumptions are independent;
- important claims retain provenance and time context;
- AI may propose/normalize/extract but does not become an authority by eloquence.

## Human operating model

### Founder / Project & Company Lead

Owns permanent company/product direction, business model, major architectural/trust/data/AI strategy, commercial relationships, and final constitutional authority.

### Platform Lead

Owns product execution, user flows, product design, frontend, interaction/accessibility quality, and the day-to-day integrated platform execution role expected to grow after launch.

The Platform Lead is not merely “the frontend person.” The role owns how approved product intent becomes a coherent, maintainable user-facing platform.

High-risk cross-authority changes require the relevant humans to approve explicitly.

## AI-assisted development

AI coding agents implement bounded tasks under `AGENTS.md`. They do not own Git history, product policy, scientific truth, security authority, or release decisions.

Every meaningful task has a defined goal, scope, risk, expected touch set, invariants, required checks, and completion report.

## Management

Use one GitHub Project as the operating view across both humans. Issues express work; branches implement it; PRs review it; ADR/PDR/BDR records explain durable decisions; `CURRENT.md` states the present truth.

## Definition of professional quality

A strong engineer joining the project should be able to determine without asking the founder's memory:

- what the product is;
- what is currently being built;
- who owns each domain;
- where business/scientific logic lives;
- why architecture choices exist;
- how data is sourced and resolved;
- where AI is and is not authoritative;
- how to make a safe change;
- how to review, test, release, and recover it.
