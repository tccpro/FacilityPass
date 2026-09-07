# Contributing to FacilityPass

## Before work

1. Read `PROJECT-LOGIC.md`.
2. Read the relevant canonical guidance.
3. Work from an issue/work packet with acceptance criteria.
4. Branch from current `staging` using `phase/*`.
5. Check active PRs for shared-resource conflicts.

## During work

- keep one coherent responsibility per branch;
- preserve architectural boundaries;
- update tests with behavior;
- do not weaken invariants;
- do not silently change product/scientific/business semantics;
- add a decision record when the change requires one;
- keep curated data distinguishable from application code.

## Before PR

Run applicable checks:

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

Run relevant E2E/migration/AI evaluation checks when applicable.

Use the PR template. Describe skipped checks explicitly.

## Review

Respect CODEOWNERS and domain authority. Review for meaning, not only syntax.

High-risk work must include rollback/recovery considerations.

## Git history

Do not push directly to protected branches. Do not force-push shared protected history. AI coding agents do not own commits/merges/releases unless a human explicitly delegates the exact operation.
