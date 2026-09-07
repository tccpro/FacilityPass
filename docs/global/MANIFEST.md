# FacilityPass documentation manifest

Documentation has two layers (`docs/global/document-hierarchy.md`, ADR-013):

```text
GLOBAL  - tracked in git, shareable with the Product & Frontend Lead
PRIVATE - git-ignored; each lead replicates their own layer outside the repo
```

## Repository root (GLOBAL)

- `PROJECT-LOGIC.md` — canonical project logic: product identity, first publication
  shape, roles, decision boundary, software architecture, the six-level delivery
  branch model, milestone roadmap M0–M8, database/AI/learning policy. **Top authority.**
- `AGENTS.md` — AI coding-agent operating protocol (canonical).
- `CLAUDE.md` — Claude entry point; delegates to `PROJECT-LOGIC.md` + `AGENTS.md`.
- `README.md` — the published project page.

## `docs/global/` (GLOBAL — shared standards and status)

- `document-hierarchy.md` — precedence, canonical sources, layer visibility.
- `good-bad-practices.md` — fast guardrail quick reference.
- `vision-and-scope.md` — product direction, first publication shape, access strategies.
- `roles-and-authority.md` — Founder/Business & Core Systems Lead vs Product & Frontend
  Lead, joint ownership, decision boundary matrix.
- `PLATFORM-ARCHITECTURE.md` — dependency direction, monorepo target shape, current
  `src/` mapping, transition rule, hard prohibitions.
- `git-workflow.md` — `work -> segment -> phase -> test -> staging -> main`, PR/review/
  merge/conflict/hotfix/recovery rules.
- `stages.md` — project stages STAGE 0–8 with business/product/technical/AI goals
  and exit criteria; current stage status.
- `OPEN-DECISIONS.md` — authoritative register of open product/business/technical
  decisions; never resolved silently.
- `testing-quality.md` — invariants, test layers (incl. scientific golden cases and
  AI evaluation), quality gate, definition of done.
- `scientific-truth.md` — platform-wide evidence/trust semantics (never invent, states, absence rules).
- `vision-and-scope.md`, `roles-and-authority.md`, `good-bad-practices.md` (see above).
- `GITHUB_SETUP.md` — repository/rulesets/projects/environments setup.
- `PROJECT_SUMMARY.md` — one-page product/engineering summary.
- `CONTRIBUTING.md` — contribution workflow. · `SECURITY.md` — security expectations.
- `project-management.md` — GitHub Project operating model.
- `development-lifecycle.md` — idea → production → learning workflow.
- `ai-task-template.md` — exact AI work packet template.
- `examples/` — worked AI task examples (frontend / database / AI-product).
- `MANIFEST.md` — this map.
- `CURRENT.md` — current operational truth.
- `decisions/` — PDR/BDR records + templates (PDR-001 superseded).
- `agent-prompts/UPDATE-PROJECT-GUIDANCE.md` — the v3 adoption reconciliation prompt
  (reference). The guidelines-restructure master prompt is archived owner-side at
  `docs/founder/archive/2026-guidelines-restructure-master-prompt.md`.

## `docs/founder/` (PRIVATE — Founder: backend / data / AI / ops)

- `backend-data.md` · `data-model.md` · `matching-rules.md` · `ai-integration.md`
- `data-provenance.md` — lineage, temporal state, provenance implementation.
- `cli.md` · `debugging.md` · `deployment.md` · `incidents-and-recovery.md`
- `MIGRATION_PLAN.md` (governance v2→v3 adoption history) · `legacy-reconciliation.md`
- `progress-log.md` — append-only engineering log.
- `decisions/` — ADRs 001–014 + index.
- `archive/` — superseded guidance:
  - `2026-governance-v1/` — original project-guidance documents + `.claude/rules/` set.
  - `2026-governance-v2/PROJECT_CONSTITUTION.md` — the v2 constitution, superseded by
    `PROJECT-LOGIC.md`.
  - `2026-governance-v2/roadmap-v1-phases.md` — the Phase 0–7 plan, superseded by
    the stage plan.
  - `2026-milestones-v3.md` — the v3 M0–M8 plan, superseded by `stages.md`.
  - `2026-guidelines-restructure-master-prompt.md` — the Founder's restructure
    directive (adopted 2026-09-05).

## `docs/product/` (PRIVATE — Product & Frontend Lead)

- `frontend.md` — frontend engineering standard.
- `product-design-workflow.md` — design/state/accessibility process.
- `platform-lead-playbook.md` — operating style and post-launch role.
- `seo.md` — SEO release gate and rules.

## `.github/` (GLOBAL — GitHub-required paths)

- `workflows/quality-gate.yml` — CI: gate (lint·typecheck·test·build) / format / e2e.
- `CODEOWNERS` · `dependabot.yml` · PR template · issue forms · `copilot-instructions.md`.

These live at their GitHub-mandated paths and point into `docs/global/`.

