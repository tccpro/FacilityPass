# PDR-001 — First release scope: capability-access wedge vs. Scout Europe release

**Status:** SUPERSEDED by `PROJECT-LOGIC.md` §2 + `docs/global/stages.md` (2026-09-05)  
**Owner:** Founder  
**Date:** 2026-09-05

> **Supersession note.** Project-logic v3 resolved the framing of this record: the
> first public form is a controlled hosted web beta of the capability-access platform,
> and the release geography/domain is an M0 business-gate decision recorded as its own
> PDR when made. The question below remains open *as a business decision*, but it is no
> longer a Phase-2-blocking ambiguity — work proceeds milestone by milestone.

## Original question (retained for history)

> This record exists because an AI coder (or a future contributor) must not silently
> choose between the two product directions on its own. Nothing before Phase 2 depends
> on this decision; the Phase 1 data foundation is identical under both options.

## User/problem

Two candidate scopes exist for the first real release:

1. **Capability-access wedge (governance v2 default).** Small and mid-sized R&D
   organizations — initially with a Seattle supply-side focus — that need specialized
   scientific capabilities they do not own, and want a practical way to obtain them.
2. **Scout release (legacy plan).** Researchers who already know the measurement they
   need and want to find compatible materials-characterization facilities in Europe.

Both share the same discovery core: technique → facility → evidence → (later) verified
feasibility.

## Evidence

- Seattle wedge: recorded as the then-accepted business hypothesis in
  `docs/global/vision-and-scope.md`. Requires customer/problem evidence collection
  before it passes the feature validation gate (same document, "Feature validation
  gate").
- Scout Europe: the original product plan (`docs/archive/2026-governance-v1/`), with a
  fully specified data model and matching design. Its market evidence was never
  independently validated either.

No accepted evidence currently discriminates between the two. That is the open question.

## Decision

**PROPOSED:** adopt option 1 (capability-access wedge, Seattle supply-side) as the
release strategy, implemented through the Scout discovery mode as its first
user-facing workflow, with geography kept out of the domain architecture.

**Do not accept this record without filling in the evidence section above with real
customer/provider conversations or equivalent.** If option 2 is chosen instead, this
record is rejected and replaced — not edited into agreement.

## Non-goals

- Booking, billing, payments, or any transactional workflow.
- Authentication and facility accounts.
- Any AI provider integration.
- Global coverage or multi-domain scientific ontologies.
- Hard-coding any geography or scientific domain into schema, matching, or domain code.

## UX/data semantics

- `data_origin`: `CURATED` vs `DEMO` must remain distinguishable in every rendered
  surface; `DEMO` renders "DEMO DATA — NOT A REAL FACILITY" and is never indexed.
- Evidence states (`SOURCE_CONFIRMED`, `FACILITY_CONFIRMED`, `INFERRED`, `UNKNOWN`,
  `CONFLICT`) render with symbol and word, never colour alone.
- Release geography may appear only in curated data and content, never in domain types,
  enums, or schema.

## Success / failure signal

- Success: a researcher outside our own team uses the discovery flow to shortlist real
  facilities, and at least one facility confirms or corrects our data through the
  feasibility flow (Phase 5) or by direct contact (manual validation).
- Failure: no organic discovery usage, or curated data cannot be maintained at the
  quality the trust rules demand.

## Engineering implications

- Phase 1 data foundation: unaffected (identical under either option).
- Phase 2 matching: unaffected mechanically; seed data (which facilities) differs.
- Phase 7 real-data beta: the facility corpus and import pipeline target the chosen
  geography/domain.
- Owners: Founder (data, backend, decision), Platform Lead (frontend/design).

## Reversal

Scope lives in curated data + content, not in architecture. Switching geography or
domain later means re-curating data, not migrating schema. That is the explicit reason
release geography is excluded from domain code.
