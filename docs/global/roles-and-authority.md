# Roles, ownership, and authority

**Status:** AUTHORITATIVE

FacilityPass separates **responsibility**, **authority**, and **accountability**. A person can be responsible for executing work without owning the business decision behind it; a domain owner can have real autonomy without becoming globally authoritative.

## Core two-person leadership model

### Founder / Business & Core Systems Lead

Accountable for:

- company vision, business model, and commercial assumptions;
- target markets, pricing direction, and provider/customer relationships;
- budget and investment decisions;
- final roadmap priority across domains;
- system, domain, and application architecture;
- backend services and API/server boundaries;
- PostgreSQL/Drizzle, migrations, and data architecture;
- evidence and provenance architecture; scientific/data integrity rules;
- AI architecture, model-provider integrations, and AI authority boundaries;
- infrastructure, security boundaries, and backend/integration testing;
- repository administration and governance.

The Founder should not micromanage implementation details that are explicitly delegated to another domain owner unless a cross-domain invariant is affected.

### Product & Frontend Lead

Current ownership:

- user journeys, product flows, and information architecture;
- screen hierarchy and interaction models;
- wireframes and prototypes;
- design system and component quality (`packages/ui` in the target shape);
- `apps/web` frontend structure and frontend architecture;
- accessibility and responsive behavior;
- frontend performance, testing, and visual QA;
- usability and product presentation of uncertainty and evidence.

Within the product/frontend domain, this lead may challenge or block an implementation that produces broken primary UX, inaccessible interaction, misleading evidence presentation, poor responsive behavior, duplicated design patterns, or a frontend architecture that is difficult to maintain.

Intended post-launch expansion (only by explicit mutual agreement):

- day-to-day milestone coordination;
- cross-stack dependency management;
- release-readiness coordination;
- platform consistency;
- coordination of future contributors.

This is an ownership role, not a ticket-taking frontend role. It does not automatically transfer Founder/company authority or core data/AI/security ownership. Legal title, equity, compensation, time commitment, and company ownership are separate matters, agreed explicitly rather than inferred from an engineering title.

## Shared decisions (joint ownership)

The following require both leads to approve:

```text
packages/contracts (shared contracts)
major user workflows
frontend-visible domain semantics
public API / DTO behavior
cross-stack error semantics
phase acceptance
release readiness
major cross-boundary architecture changes
```

Neither lead silently changes a shared contract.

## Additional authority domains

### Scientific Data Architect / Domain Expert

Owns or reviews, when present:

- scientific ontology and terminology;
- capability semantics;
- evidence interpretation;
- technique-specific constraints;
- normalization policy.

### Facility Representative

May confirm facility-specific facts/feasibility within their legitimate institutional scope. This does not grant software administration authority.

### Security / Platform Owner

Owns:

- secrets and identity controls;
- deployment security;
- authorization policy implementation;
- observability/reliability standards;
- incident response controls.

Until a dedicated owner exists, these responsibilities remain with the Founder and require explicit review.

## Decision boundary matrix

Use this matrix when disagreement appears.

| Decision | Primary authority | Required consultation |
|---|---|---|
| Product flow / UX | Product & Frontend Lead | Core Lead when contracts/domain are affected |
| Frontend architecture | Product & Frontend Lead | Core Lead for shared/platform boundaries |
| Backend/domain architecture | Core Lead | Product Lead for user-facing consequences |
| Database/evidence semantics | Core Lead | Product Lead for presentation implications |
| AI architecture and authority | Core Lead | Product Lead for user-facing AI behavior |
| Shared contracts | Joint | Both approve |
| Phase acceptance | Joint | Both approve |
| Company strategy / market / pricing | Founder | Product Lead consulted where product is affected |
| Security/data-integrity stop-ship | Core Lead | Immediate joint review |
| UX/accessibility stop-ship | Product Lead | Immediate joint review |

Do not resolve ownership disputes by who writes code first.

## Conflict rule

Disagreement is resolved by identifying **which authority domain is actually affected**, not by seniority or who wrote the most code.

When two authority domains are genuinely implicated, create a short decision record instead of resolving the dispute through an unrecorded code change.
