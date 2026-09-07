# Worked AI task example — frontend evidence state

## Goal

Add a reusable evidence-status presentation for existing canonical evidence states on a facility/capability result.

## Task class / risk

```text
FRONTEND
R1 (R2 if API/state semantics must change)
```

## Read first

```text
PROJECT-LOGIC.md
AGENTS.md
docs/global/scientific-truth.md
docs/product/frontend.md
docs/product/product-design-workflow.md
```

## In scope

- present existing canonical status + label;
- support `FACILITY_CONFIRMED`, `SOURCE_CONFIRMED`, `INFERRED`, `UNKNOWN`, `CONFLICT` where the current contract exposes them;
- use word/symbol and accessible semantics;
- reuse current design tokens/components;
- add relevant component/integration tests.

## Out of scope

- changing evidence-resolution rules;
- adding new evidence states;
- changing database schema;
- adding a new UI library;
- making `UNKNOWN` look like false/unavailable.

## Acceptance

```text
Given canonical UNKNOWN -> UI visibly says Unknown
Given INFERRED -> never renders Confirmed
Color is not the only status signal
Keyboard/screen-reader semantics remain understandable
No second evidence enum is created in frontend code
```

## Expected completion report

List files changed, screenshots, tests actually run, and any missing API state that prevented faithful display.
