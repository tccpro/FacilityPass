# FacilityPass GitHub architecture and repository setup

**Status:** OPERATIONAL SETUP GUIDE

This document turns project policy into repository controls. The principle is defense in depth:

```text
clear ownership
+ small work items
+ isolated branches
+ required review
+ automated checks
+ restricted deployment
+ recovery procedures
```

Documentation alone is not sufficient.

## 1. Repository topology

Keep FacilityPass as one repository while the product is one deployable modular system.

```text
FacilityPass repository
├── product + governance
├── web/application code
├── domain/business/scientific rules
├── database + migrations
├── AI adapters/evaluations
├── curated scientific data
├── tests
├── deployment/configuration
└── GitHub automation
```

Do not create separate frontend/backend repositories merely because two humans own different areas. Split only after an ADR proves an independent deployment/security/scaling/lifecycle need.

## 2. Roles in GitHub

### Founder / Project & Company Lead

Use repository administration narrowly for:

- product/company authority;
- ruleset administration;
- high-risk architecture/data/security approval;
- release/business decisions.

### Platform Lead

Give normal write/maintain capability needed to own:

- product execution;
- UX/frontend;
- integration quality;
- post-launch platform cadence;
- review of work in owned paths.

Do not make either person use shared credentials. Require personal accounts, MFA/2FA, and least privilege.

## 3. Branches

```text
phase/*  ---> staging ---> main
                   ^         ^
                   |         |
                   +-- integration
                             production/release

hotfix/* ------------------> main
       \-------------------> staging (sync-back)
```

`main` and `staging` are protected integration branches, not personal workspaces.

## 4. Merge settings

Recommended repository merge policy:

- allow squash merge for phase/feature PRs;
- optionally allow merge commits for `staging -> main` release PRs if explicit release boundaries are valuable;
- disable ad-hoc strategies the team does not use;
- automatically delete merged phase branches if the team prefers clean branch lists;
- never enable force pushes on `main` or `staging`.

## 5. Ruleset: `main`

Target branch: `main`.

Enable where available:

1. require pull request before merge;
2. one non-author approval;
3. require CODEOWNER review for owned paths;
4. dismiss stale approvals after material pushes;
5. require resolution of review conversations;
6. require status checks `lint`, `typecheck`, `test`, `build`;
7. require branch to be current before merge if the chosen integration policy needs it;
8. block force push;
9. block branch deletion;
10. restrict bypass to the smallest possible admin group;
11. optionally require signed commits later if the operational burden is justified.

Do not configure two blanket approvals in a two-person repository: that can make an author's ordinary PR impossible to merge.

## 6. Ruleset: `staging`

Target branch: `staging`.

Require:

- PR;
- CI status checks;
- no force push/deletion;
- one non-author review for R1+ code;
- CODEOWNER approval for critical owned paths.

The team may keep low-risk documentation changes lighter if ruleset configuration supports path-specific policy without reducing critical protection.

## 7. CODEOWNERS design

The supplied `.github/CODEOWNERS` is intentionally asymmetric:

- Platform Lead owns frontend/product-design paths;
- Founder owns architecture/backend/data/scientific/AI/security/governance paths;
- default owner provides a safety net.

Replace placeholders with real GitHub handles.

**Important:** listing both people on the same CODEOWNERS pattern does not reliably mean both must approve; GitHub treats listed owners as eligible code owners for the path. For R3/cross-authority changes, require explicit approvals from each required authority in the PR itself and record them in the checklist/decision record.

## 8. GitHub Project: one management surface

Create a single GitHub Project for the product and add these fields:

| Field | Suggested values |
|---|---|
| Status | Inbox, Ready, In progress, In review, Blocked, Done |
| Owner | Founder, Platform Lead, Joint |
| Domain | Product, Frontend, Backend, Data, Scientific, AI, Security, Operations |
| Type | Feature, Bug, Research, Decision, Data, Chore |
| Risk | R0, R1, R2, R3 |
| Phase | current milestone/phase |
| Target release | release/milestone |
| Decision | None, ADR, PDR, BDR required/linked |
| Migration | None, Additive, High-risk |
| User impact | Internal, Limited beta, Public |

Recommended saved views:

```text
Founder overview       all active work grouped by risk/domain
Execution board        Ready -> In progress -> Review -> Done
Platform Lead          owned UX/frontend/platform work
High risk              R2/R3 only
Decisions              ADR/PDR/BDR blockers
Release                 target-release grouped work
```

The GitHub Project is the management view. Branches are implementation mechanics, not the project plan.

## 9. Labels

Use a small orthogonal label vocabulary instead of dozens of decorative labels:

```text
type:feature  type:bug  type:decision  type:data  type:research
area:frontend area:backend area:database area:scientific area:ai area:security
risk:R0 risk:R1 risk:R2 risk:R3
status:blocked
dependencies
```

Prefer Project fields for data that needs grouping/reporting; use labels for fast filtering/automation.

## 10. Environments and deployment

Recommended environments:

```text
preview      pull request deployments
staging      staging branch
production   main branch
```

For `production`:

- restrict deployment source to `main`;
- scope production secrets to the environment;
- require a non-self human approval if the GitHub plan/repository visibility supports that protection;
- otherwise keep production deployment a restricted explicit manual operation outside ordinary CI;
- never let an AI coding agent decide to deploy merely because tests pass.

Use deployment concurrency so two releases do not race.

## 11. Actions / CI

The supplied CI exposes stable job names:

```text
lint
typecheck
test
build
```

Keep these names synchronized with ruleset required checks.

Before adopting the sample workflow, align its Node version with the actual repository runtime/`package.json` engines. The sample uses Node 24 LTS as the September 2026 supported baseline; align it with the repository's actual `engines`/runtime contract before adoption rather than letting the workflow silently redefine the project runtime.

Do not grant write permissions to CI jobs that only need to read/build/test.

## 12. Dependency and supply-chain management

- keep lockfile committed;
- use `--frozen-lockfile` in CI;
- review dependency PRs like code, not as automatic upgrades;
- keep Dependabot volume bounded;
- inspect major-version, transitive-security, license, and runtime changes;
- pin/approve privileged GitHub Actions deliberately when security needs justify it.

## 13. Secrets

Never store secrets in:

- repository files;
- issue bodies;
- PR screenshots/logs;
- AI prompts/transcripts;
- demo data.

If a secret is committed, deletion is not remediation. Revoke/rotate first, then clean history only with an intentional incident plan.

## 14. Releases

A release candidate comes from `staging`, not an arbitrary phase branch.

Release PR `staging -> main` must answer:

```text
What changed?
What is the user-visible outcome?
Which migrations/config changes exist?
What can go wrong?
How will we detect it?
How do we roll forward/back?
Who verifies production?
```

Use tags/releases only after human approval. AI agents may draft release notes, not publish a release autonomously.

## 15. Backups and recovery

Repository recovery:

- remote Git is not a substitute for database backups;
- protect shared branches from force pushes/deletion;
- know how to use `git reflog` for local recovery;
- prefer revert/roll-forward over shared-history rewriting;
- document production DB backup/restore before destructive migrations are permitted.

For incidents, follow `docs/founder/incidents-and-recovery.md`.

## 16. Monthly governance check

Once per month or before a major launch, review:

- active collaborators and permissions;
- ruleset bypass users;
- CODEOWNERS correctness;
- required CI checks;
- stale branches;
- unreviewed dependency/security alerts;
- environment secrets;
- unresolved R2/R3 work;
- decision records vs actual implementation;
- whether docs describe reality.

Governance should become stricter only when risk justifies it, not because enterprise-looking complexity feels professional.
