# Documentation hierarchy and authority

The repository contains many documents, but **not every document has equal authority**. This hierarchy exists to prevent old guidance, generated notes, or implementation examples from silently overriding current project decisions.

## Documentation layers and visibility

```text
GLOBAL   (tracked in git, shareable with the Product & Frontend Lead)
  PROJECT-LOGIC.md, docs/global/**, AGENTS.md, CLAUDE.md, README.md, .github/**

PRIVATE  (git-ignored, owner-local replication only)
  docs/founder/**  - backend / data / AI / operations  (Founder / Business & Core Systems Lead)
  docs/product/**  - frontend / design / SEO           (Product & Frontend Lead)
  docs/founder/archive/** - superseded guidance, history only
```

A private document may specialize a global rule for its own domain; it may never weaken or contradict one. Sharing the global layer does not share either lead's private guidelines.

## Precedence

When two documents conflict, use this order:

1. `PROJECT-LOGIC.md`
2. accepted ADR/PDR/BDR decision records (`docs/global/decisions/`; engineering ADRs live owner-locally under `docs/founder/decisions/`)
3. current product scope: `PROJECT-LOGIC.md` §2 + `docs/global/stages.md`
4. domain rule documents (owner layers)
5. shared engineering standards under `docs/global/`
6. operational rules under `docs/global/`
7. `AGENTS.md` execution protocol for AI coders
8. `docs/global/GITHUB_SETUP.md` and `CONTRIBUTING.md`-style workflow rules
9. README and examples
10. `docs/founder/archive/` — history only, never authority

## Canonical-source rule

Each concern must have one canonical source:

| Concern | Canonical document | Visibility |
|---|---|---|
| Canonical project logic (product, roles, delivery, milestones, AI boundary) | `PROJECT-LOGIC.md` | GLOBAL |
| Current operational reality | `docs/global/CURRENT.md` | GLOBAL |
| Documentation precedence (this file) | `docs/global/document-hierarchy.md` | GLOBAL |
| Fast guardrail quick reference | `docs/global/good-bad-practices.md` | GLOBAL |
| Product direction and scope boundaries | `docs/global/vision-and-scope.md` | GLOBAL |
| Roles, authority, decision matrix | `docs/global/roles-and-authority.md` | GLOBAL |
| Platform architecture (dependency direction, monorepo target, boundaries) | `docs/global/PLATFORM-ARCHITECTURE.md` | GLOBAL |
| Delivery branch model, PR/review/merge rules | `docs/global/git-workflow.md` | GLOBAL |
| Stage plan STAGE 0–8 (goals + exit criteria) | `docs/global/stages.md` | GLOBAL |
| Open decisions register | `docs/global/OPEN-DECISIONS.md` | GLOBAL |
| Testing/quality invariants and gates | `docs/global/testing-quality.md` | GLOBAL |
| Product/business decision records (PDR/BDR) | `docs/global/decisions/` | GLOBAL |
| Repository/GitHub setup | `docs/global/GITHUB_SETUP.md` | GLOBAL |
| AI coder execution protocol | `AGENTS.md` (root) | GLOBAL |
| Frontend/design standard, product-design workflow, SEO | `docs/product/…` | PRIVATE (Product & Frontend Lead) |
| Backend/data standard, data model, matching rules | `docs/founder/…` | PRIVATE (Founder) |
| Product AI integration rules | `docs/founder/ai-integration.md` | PRIVATE (Founder) |
| Engineering decision records (ADR) | `docs/founder/decisions/` | PRIVATE (Founder) |
| CLI contract, debugging, deployment | `docs/founder/…` | PRIVATE (Founder) |

## Status words

Use one of these labels in documents/decisions:

```text
AUTHORITATIVE
ACCEPTED
PROPOSED
EXPERIMENTAL
DEPRECATED
ARCHIVED
```

Never leave the authority of an important design document ambiguous.

## Documentation update rule

When code changes documented behavior, update the relevant canonical document in the same PR. Do not “fix docs later” for architecture, security, API contracts, migrations, or user-visible behavior.

When a decision changes, supersede the old decision record; do not rewrite history so that the old rationale disappears.

