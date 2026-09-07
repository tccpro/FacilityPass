# Worked AI task example — source extraction

## Goal

Use an LLM to propose structured capability assertions from an authoritative facility document without allowing the model to publish scientific truth.

## Task class / risk

```text
AI_PRODUCT + DATA
R2
```

## Required pipeline

```text
approved source
 -> source classification / privacy check
 -> provider-independent model adapter
 -> versioned prompt/model config
 -> strictly structured candidate output
 -> schema validation
 -> attach source locator/provenance
 -> deterministic/domain resolution or human review
 -> only then published/resolved state
```

## In scope

- extraction schema;
- adapter implementation;
- failure/timeout behavior;
- unsupported-claim rejection;
- evaluation cases for representative/ambiguous/missing/conflicting inputs;
- call/cost/latency metrics.

## Out of scope

- model decides `FACILITY_CONFIRMED`;
- model invents missing facts;
- provider SDK imported into domain modules;
- confidential customer research sent to provider without approved policy;
- LLM prose stored as authoritative capability state.

## Acceptance

```text
malformed output is rejected
unsupported fields do not publish
source/provenance travels with every candidate assertion
provider failure degrades safely
changing provider does not require domain rewrite
golden-corpus evaluation is reproducible
```
