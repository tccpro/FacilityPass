# Testing and quality standard

## 1. Primary invariant

> **Never make a check pass by weakening the invariant it exists to protect.**

Forbidden shortcuts include deleting a failing test, weakening assertions without an approved behavior change, disabling lint, using unsafe casts to silence typing, swallowing exceptions, or retrying flaky tests until green.

## 2. Test dangerous assumptions first

Priority areas:

- evidence/claim resolution;
- scientific truth;
- matching and abstention;
- business-state transitions;
- access strategy;
- authorization/security boundaries;
- public API contracts;
- migrations/data transformations;
- AI output validation;
- error/recovery paths.

Do not spend large effort testing framework behavior that the framework already owns.

## 3. Required product invariants

Protect at least these principles when implemented:

```text
UNKNOWN never silently becomes true/false.
INFERRED never silently becomes confirmed.
Algorithmic matching never becomes facility verification.
FacilityPass data absence never proves facility absence.
Scientific compatibility never becomes access authorization.
Scientific state never implies commercial relationship state.
Commercial relationship never strengthens scientific evidence.
Unverified pricing never becomes authoritative pricing.
DEMO data never enters production scientific/commercial analytics.
Commercial payments never secretly alter scientific ranking.
```

## 4. Test layers

Testing follows risk, not coverage vanity. Never add meaningless tests just to
raise a coverage percentage.

### Unit/domain

Pure rule behavior, edge cases, reason codes, state transitions, calculations,
policy logic, value objects.

### Contract

Request/response schemas and external integration contracts — the
frontend/backend/shared DTO assumptions.

### Integration

Repository mapping, database constraints, transactions, API/application adapters,
provider boundaries.

### E2E

Critical user journeys only — the real cross-stack product journey and stage exit
criteria. E2E must validate behavior users depend on, not every implementation
detail.

### Scientific golden cases

Protect important scientific constraint behavior and uncertainty semantics:
`UNKNOWN != FALSE` cases, hard-constraint incompatibility, `NEEDS_VERIFICATION`
on missing offering data, evidence-state resolution. These are separate,
deliberately curated cases — not ordinary unit tests.

### AI evaluation

AI/scientific-data evaluation corpora are separate from ordinary deterministic
unit tests. Evaluate operation quality (extraction accuracy, unsupported-claim
rate, abstention behavior, cost, latency); never replace AI evaluation with
brittle exact-string tests.

## 5. Hermeticity

Unit/domain tests must not require:

- developer-specific environment variables;
- live developer database;
- network access;
- ambient clock;
- external model provider;
- unannounced local services.

Inject clocks/configuration/collaborators.

## 6. Quality gate

Before a feature is declared complete, run applicable checks:

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

For user-facing flows, run relevant Playwright tests.

For migrations, validate migration execution on a disposable/dev database.

For AI behavior, run the task evaluation when the AI path changed.

## 7. CI behavior

CI should fail fast on deterministic checks and produce enough output to identify the failing layer.

Do not hide failures through `continue-on-error` on required checks.

A flaky test is a defect. Quarantine requires a documented owner and follow-up issue; it must not silently become permanently optional.

## 8. Definition of done

A change is not done because the feature renders. It is done when:

- approved behavior works;
- failure states work;
- tests protect important rules;
- lint/type/build pass;
- security/data implications are handled;
- documentation reflects reality;
- no unauthorized future scope leaked in;
- deployment/recovery considerations are known when relevant.
