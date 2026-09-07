# Git and GitHub workflow

**Status:** AUTHORITATIVE

## 1. Branch model

The delivery path has six stability levels (`PROJECT-LOGIC.md` §8):

```text
work/<developer>/<task>
          |
          v
segment/<milestone>/<responsibility>
          |
          v
phase/<milestone>
          |
          v
test/<milestone>
          |
          v
staging
          |
          v
main
```

- `main`: accepted/published production state.
- `staging`: production-like release candidate with its own database, secrets, and integrations.
- `test/<milestone>`: feature-freeze / formal QA branch.
- `phase/<milestone>`: integrates all milestone segments into one complete product capability.
- `segment/<milestone>/<responsibility>`: one responsibility boundary inside one milestone (e.g. `segment/m03/contracts`, `segment/m03/search-backend`, `segment/m03/discovery-frontend`).
- `work/<developer>/<task>`: one coherent implementation task, normally one owner, short lived.

Additional branch types:

```text
fix/<milestone>/<issue>          targeted QA/integration correction into test/*
hotfix/<issue>                   urgent production correction from main
experiment/<milestone>/<idea>    isolated technical/product experiment
```

Rules that do not bend:

- development never happens directly on `main`, `staging`, `test/*`, or `phase/*`;
- `work/*` merges only into its segment — never directly to `staging`/`main`;
- a segment exists only when the milestone requires that responsibility — never create permanent generic `frontend`, `backend`, or `ai` branches;
- an experiment never becomes production merely because it works — convert it into an approved segment/task with acceptance criteria;
- the milestone is done only when the complete product capability works end to end.

A vertical feature may touch frontend, contracts, domain, database, and tests in one `work/*` branch if those changes form one coherent task.

## 2. Branch naming

```text
work/<developer>/<task>
segment/<milestone>/<responsibility>
phase/<milestone>
test/<milestone>
fix/<milestone>/<issue>
hotfix/<issue>
experiment/<milestone>/<idea>
```

Examples:

```text
work/core/m03-search-use-case
work/product/m03-capability-card
segment/m03/search-backend
segment/m03/discovery-frontend
phase/m03-capability-discovery
test/m03-capability-discovery
fix/m03/142-pagination-offset
hotfix/204-expired-response-token
experiment/m04/intent-extraction
```

Milestone codes are the stage-delivery units `s0`–`s8`, mapped to project stages
in `docs/global/stages.md` (e.g. `segment/s3/search-backend`).

## 2b. Workflow is not sacred

Git process must serve traceability, parallel work, review, testing, and release
safety — not enterprise cosplay. If the team is too small for this branch depth
and the ceremony creates more risk/overhead than safety, simplify **deliberately**
and record the decision. Do not rewrite the workflow purely to look
enterprise-grade, and do not simplify silently.

## 3. Starting work

Before creating a branch:

1. finish/stash only your own local work intentionally;
2. `git fetch --prune`;
3. inspect the relevant `segment/*`/`phase/*` branch and active PRs/issues;
4. confirm the issue/task and expected touch set;
5. create the `work/*` branch from the correct segment branch.

Do not start from a stale local branch without fetching.

## 4. Shared-history rule

Published/shared branch history is not rewritten casually.

- Local unpublished branch: rebase is allowed if the author chooses.
- Shared/pushed branch: prefer merge from `staging` or coordinate before rewriting.
- `staging`/`main`: never force push.

AI agents do not perform history-changing Git operations without explicit human instruction.

## 5. Pull requests

Normal PR paths:

```text
work/*  -> segment/*      (segment owner reviews)
segment/* -> phase/*      (integration)
fix/*   -> test/*         (QA corrections)
phase/* -> test/*         (freeze for QA)
test/*  -> staging        (release candidate)
staging -> main           (release)
```

A PR must describe:

- problem/issue;
- scope;
- behavior changed;
- behavior intentionally unchanged;
- risk class;
- affected domains;
- tests/checks run;
- migration/deployment implications;
- screenshots for meaningful UI changes;
- decision record link if required.

## 6. Review requirement by risk

```text
R0  author review + CI where applicable
R1  at least one human review for shared product code
R2  relevant CODEOWNER/domain owner review + CI
R3  explicit relevant authority approval + rollback/recovery plan
```

In a two-person team, do not configure a blanket “2 approvals” rule that makes ordinary author PRs impossible. Use one non-author approval plus CODEOWNERS/domain ownership, and use explicit high-risk sign-off for R3 changes.

## 7. Merge strategy

Default: **squash merge** feature PRs into `staging` to keep the shared history conceptually focused.

Release PRs from `staging` to `main` may use a merge commit if the team wants an explicit release boundary; choose one policy and apply it consistently.

Do not mix merge strategies randomly per PR.

## 8. Conflict-prevention protocol

Before parallel work, identify shared high-conflict resources:

```text
package lockfile
shared schema/migrations
design tokens/global CSS
central route/navigation files
shared contracts/enums
CI/deployment files
```

If two active tasks need the same high-conflict resource, coordinate order before both branches diverge.

Special rule: schema/migration sequences should have one active writer per schema area unless explicitly coordinated.

## 9. Resolving conflicts

Never resolve a conflict by blindly choosing “ours” or “theirs.”

For each conflict:

1. identify both intended behaviors;
2. determine current source of truth;
3. preserve both valid changes or intentionally reject one;
4. rerun affected tests;
5. inspect generated artifacts/migrations/lockfiles;
6. record a decision if semantics changed.

For database migrations, never rewrite a migration already applied in a shared environment merely to obtain a clean merge.

## 10. Hotfix flow

```text
main
 -> hotfix/*
 -> PR to main
 -> production verification
 -> merge/cherry-pick the equivalent fix back to staging
```

The hotfix must not become a secret parallel product branch.

## 11. Commit categories

Use consistently:

```text
feat:
fix:
test:
docs:
chore:
data:
biz:
refactor:
```

`data:` is reserved for curated/controlled scientific-data changes. `biz:` is for explicit product/business specification decisions, not ordinary marketing copy.

Keep commits conceptually focused. Do not hide unrelated refactoring or data changes in a feature commit.

## 12. GitHub rulesets

### `main`

Enable where supported:

- require PR before merge;
- require one non-author approval;
- require CODEOWNER review where applicable;
- dismiss stale approvals after material changes;
- require approval of the latest reviewable push when practical;
- require conversations resolved;
- require CI status checks;
- block force pushes;
- block deletion;
- require linear/specified history consistent with merge policy;
- restrict direct pushes/bypass to a very small admin set.

### `staging`

Enable:

- require PR;
- require CI;
- block force pushes/deletion;
- require review for R1+ product code;
- require CODEOWNER review for owned critical paths.

### `work/*`, `segment/*`, `phase/*`, `test/*`

Do not overprotect personal task branches (`work/*`). CI runs on PR. Protect shared integration branches (`segment/*`, `phase/*`, `test/*`) only as far as collaborators share them; the release gates live at `test -> staging -> main`.

## 13. Required CI checks

Use stable check names so branch rules do not break unnecessarily. This repository's workflow is `.github/workflows/quality-gate.yml` with jobs:

```text
lint · typecheck · test · build   (the "gate" job)
format
end-to-end                        (non-blocking while proving stability)
```

Add E2E/security/evaluation checks only to PRs that need them or once runtime cost is acceptable.

## 14. Git accident rule

When an accident occurs:

1. stop making additional history changes;
2. preserve current state with a safe local branch/tag only if appropriate;
3. fetch remote state;
4. inspect `git status`, `git log --graph`, reflog, and PR state;
5. choose the least destructive recovery;
6. never force-push protected shared history as the first response;
7. rerun CI after recovery.

If a secret was committed, **rotate/revoke the secret first**. History cleanup alone does not make an exposed secret safe.
