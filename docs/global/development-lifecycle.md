# End-to-end development lifecycle

**Status:** AUTHORITATIVE PROCESS

This is the default path from idea to production.

## Stage 0 — Evidence / trigger

A work item begins from one of:

```text
observed user/provider problem
validated business hypothesis
bug/regression
scientific/data quality need
security/reliability need
approved technical debt
```

A technology idea by itself is not automatically a product task.

## Stage 1 — Decide whether a decision record is needed

Use:

- PDR for product/scope/behavior;
- ADR for durable architecture/infrastructure/API/data-structure choices;
- BDR for business/customer/pricing/partnership/commercial hypotheses or decisions.

Do not create a record for trivial local implementation choices.

## Stage 2 — Define the vertical slice

Create an issue/work packet with:

```text
problem
outcome
scope
non-scope
acceptance criteria
owner
risk
expected touch set
review authority
test/evidence requirements
```

For user-facing work, attach/describe the user flow and state matrix.

## Stage 3 — Ready gate

Before `Ready`:

- blocking product/scientific/business/security questions are resolved or explicitly deferred without changing behavior;
- required data/contracts/design exist;
- high-conflict resources are checked;
- owner/reviewer are known;
- task is small enough for one coherent PR.

## Stage 4 — Branch

```text
git fetch --prune
segment/<milestone>/<responsibility> (current)
  -> work/<developer>/<task>
```

One coherent task can cross frontend/contracts/domain/database/tests. Do not split work by layer merely to create ownership boundaries. Segment and phase branches are created only as part of the approved stage plan (`docs/global/stages.md`).

## Stage 5 — AI implementation packet

If an AI coder is used, provide the issue plus `docs/global/ai-task-template.md`. Require it to read `AGENTS.md` and relevant authority files before editing.

For R2/R3 work, open a draft PR early so both humans can see direction before implementation becomes expensive.

## Stage 6 — Implement and validate incrementally

During implementation:

- preserve boundaries;
- keep scope bounded;
- run focused tests frequently;
- keep migrations additive/ordered;
- coordinate shared high-conflict files;
- do not let an AI repair failures by changing the specification.

## Stage 7 — Pull request

Open `work/* -> segment/<milestone>/<responsibility>`.

The PR must explain behavior, risks, checks, screenshots if applicable, migration/deployment implications, and linked decisions.

Review semantics, not only code style.

## Stage 8 — Integration

After review + required CI:

```text
work/* --squash--> segment/*      (per task)
segment/* --> phase/*             (milestone integration)
phase/*   --> test/*              (freeze for QA)
test/*    --> staging             (release candidate)
```

Verify each integrated level because independently correct branches can still conflict semantically when combined.

## Stage 9 — Release candidate

A release is a coherent product outcome from `staging`.

Before `staging -> main`:

- scope is known;
- CI is green;
- migrations/config are understood;
- user-facing smoke/E2E checks are done as applicable;
- rollback/roll-forward plan exists for meaningful risk;
- required domain authorities approve;
- release notes can be generated from accepted PRs/decisions.

## Stage 10 — Production

Production deployment is a human-authorized operation.

Verify observable outcomes after deployment. Do not infer success solely from a green deployment job.

## Stage 11 — Learn

After release, capture:

```text
actual user/provider behavior
errors/support friction
performance/reliability signals
data/evidence problems
commercial learning
unexpected workflow effects
```

Feed material learning back into the next issue/PDR/BDR. Do not silently change permanent guidance based on one anecdote.

## Emergency exception

Production incidents use `docs/founder/incidents-and-recovery.md` and the `hotfix/*` flow. Emergency speed may shorten ceremony, never truth/security/data safeguards.
