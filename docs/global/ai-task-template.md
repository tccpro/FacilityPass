# AI coding task template

Copy this into a GitHub issue or coding-agent prompt.

```markdown
# Task: <short title>

## Goal
<one outcome>

## Why
<user/product/business reason>

## Current behavior
<what happens now>

## Required behavior
<what must happen>

## Scope
- <item>
- <item>

## Explicit non-scope
- <do not add/change>
- <do not refactor>

## Authority / source of truth
- PROJECT-LOGIC.md
- <specific canonical doc/ADR/PDR>

## Expected touch set
- <directory/file>
- <directory/file>

## High-conflict resources
- migrations? yes/no
- lockfile? yes/no
- shared contracts? yes/no
- global design tokens? yes/no

## Risk
R0 / R1 / R2 / R3

## Acceptance criteria
- [ ] <observable behavior>
- [ ] <error/unknown behavior>
- [ ] <test requirement>

## Design/data examples
<input/output examples or wireframe link>

## Commands to run
- pnpm lint
- pnpm typecheck
- pnpm test
- pnpm build
- <targeted test/e2e>

## Git permissions
No commit/push/merge unless explicitly stated here.

## Completion report
Return:
- implemented
- files changed
- behavior changed
- checks run/results
- unresolved risks/unknowns
```

## Minimum example

```markdown
# Task: Display evidence freshness on provider capability cards

Goal: Show the observation date and freshness state already returned by the API.

Scope:
- frontend capability card
- shared presentation helper if needed
- tests

Non-scope:
- do not change freshness calculation
- do not add database fields
- do not add an AI summary

Source of truth:
- docs/founder/data-provenance.md
- docs/product/frontend.md

Risk: R1

Acceptance:
- CURRENT/AGING/STALE/UNKNOWN render distinctly by text + symbol
- keyboard/screen-reader meaning is preserved
- no duplicate frontend freshness logic
```
