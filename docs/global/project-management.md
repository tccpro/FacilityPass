# Project management operating system

**Purpose:** allow the Founder to see the whole project at a glance while giving each domain owner clear execution autonomy.

## 1. GitHub is the work ledger

Use one GitHub Project for active product/engineering work. Issues describe work; PRs prove implementation; decision records explain important choices; the Project view provides portfolio visibility.

Do not run separate frontend/backend project systems that create competing priorities.

## 2. Recommended GitHub Project fields

Use fields rather than an explosion of labels where possible:

| Field | Values/examples |
|---|---|
| Status | Backlog, Ready, In Progress, In Review, Blocked, Done |
| Owner | Founder, Platform Lead, future contributor |
| Domain | Product, Frontend, Backend, Data, AI, Scientific, Security, Platform |
| Type | Feature, Fix, Data, Research, Decision, Refactor, Chore |
| Risk | R0, R1, R2, R3 |
| Phase/Milestone | Foundation, Validation, Beta, etc. |
| Target release | release/milestone name |
| Decision required | None, ADR, PDR, BDR |
| Migration | No, Additive, Backfill, Destructive |
| User impact | Internal, User-facing, Provider-facing, Public data |

Recommended views:

1. **Founder overview** — table grouped by Status, showing Owner/Domain/Risk/Target release.
2. **Execution board** — Kanban by Status.
3. **Platform Lead view** — filter Frontend/Product/Platform.
4. **High-risk view** — Risk R2/R3, migration/security/AI/scientific changes.
5. **Roadmap** — grouped by milestone/release.

## 3. Issue as work packet

No meaningful coding task begins from a vague chat sentence alone. The issue/work packet should contain:

```text
Problem
User/business reason
Current behavior
Required behavior
Scope
Explicit non-scope
Acceptance criteria
Expected areas/files
Risk class
Authority/reviewer
Tests required
Decision record link, if any
Design reference, if user-facing
```

This is especially important for low-capability AI coding models.

## 4. Definition of Ready

A task is `Ready` when:

- the problem is understood;
- acceptance criteria are testable;
- non-scope is explicit;
- the owner is known;
- required design/data inputs exist;
- known high-risk decisions have an owner;
- parallel-work conflicts are checked.

Do not assign an AI coder a task that is still product discovery disguised as implementation.

## 5. Work-in-progress limit

For a two-person team, default to:

- each person: at most 1 major implementation task in progress;
- one small secondary review/docs task is acceptable;
- only one active destructive/high-conflict schema migration stream at a time.

Finishing and integrating work is more valuable than starting many branches.

## 6. Daily/working rhythm

### Start of work

- review project board;
- check open PRs first;
- unblock reviews before starting new work;
- confirm current `staging` state;
- identify high-conflict files/resources.

### During work

- keep issue scope current;
- surface blockers early;
- do not silently expand scope;
- open draft PR early for R2/R3 or broad cross-layer changes.

### End of work

- push only intentionally;
- update issue/PR with actual status;
- list unrun checks/blockers;
- leave branch in a state another engineer can understand.

## 7. Weekly founder/platform review

Review together:

1. What shipped?
2. What is blocked?
3. Which assumptions changed?
4. Which PRs are aging?
5. Which R2/R3 items need joint attention?
6. Are frontend and backend priorities still one product plan?
7. What customer/provider evidence changed the roadmap?
8. What should be stopped or deferred?

Do not use the review as a status-performance ritual. Use it to remove ambiguity and protect product direction.

## 8. Milestones and releases

Use milestones for outcomes, not departments.

Good:

```text
Foundation reliable
First capability workflow end-to-end
First provider-confirmed request
Controlled beta ready
```

Bad:

```text
Backend milestone
Frontend milestone
Database milestone
```

A milestone should be a user/product capability that integrates layers.

## 9. Decision cadence

Use:

- ADR: architecture/technical structure;
- PDR: product behavior/scope;
- BDR: business/commercial assumption or decision.

Do not put a major decision only in Slack/Discord/chat. Summarize the accepted decision in the repository.

## 10. Risk model

### R0 — trivial/reversible

Docs, comments, copy with no semantic change.

### R1 — normal implementation

Isolated feature/fix with tests and easy rollback.

### R2 — coordinated change

Schema addition, public contract, cross-layer feature, dependency, AI behavior, curated scientific data, major UX flow.

### R3 — critical

Destructive migration, auth/authorization, production data, secrets, scientific-authority semantics, commercial/contract state, irreversible deployment, major architecture.

Higher risk changes require smaller scope, earlier draft PRs, explicit review, and a recovery plan.

## 11. Ownership handoff

When the Platform Lead increasingly leads platform execution after launch, make the transition explicit in GitHub ownership rather than relying on an informal understanding:

- CODEOWNERS updated;
- Project views/ownership updated;
- release coordination assigned;
- frontend/platform ADR ownership delegated;
- Founder remains product/business and constitutional owner.

Delegation should be visible in the repository and reversible through an explicit governance change.
