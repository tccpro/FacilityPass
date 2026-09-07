# Worked AI task example — additive capability constraint

## Goal

Persist an approved capability constraint needed by a current matching requirement.

## Task class / risk

```text
DATABASE_MIGRATION + BACKEND
R2
```

## Required evidence before coding

- PDR/issue proves the field is required now;
- domain meaning and unknown semantics are defined;
- owner confirms query/filter needs;
- active migration stream checked to avoid sequence collision.

## In scope

1. update canonical domain/schema definition;
2. choose relational column or structured JSONB according to real query/shape needs;
3. create additive migration;
4. inspect generated SQL;
5. update repository mapping/DTO as required;
6. add migration/domain tests;
7. document backfill/default behavior explicitly.

## Out of scope

- adding speculative sibling fields;
- editing an already-applied migration;
- automatic assumption/backfill where historical truth is unknown;
- UI changes unless part of the approved vertical slice.

## Dangerous example

If historical data cannot establish the new constraint, do not backfill `false` merely because SQL requires a value. Model the unknown state explicitly according to the approved schema decision.

## Completion evidence

Report migration name, generated SQL review, data behavior for existing rows, tests, and whether a rollback/roll-forward action is needed.
