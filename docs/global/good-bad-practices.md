# Good / bad engineering practice quick reference

**Status:** AUTHORITATIVE QUICK REFERENCE

This file is a fast guardrail. Detailed documents remain authoritative for their domains.

| Good | Bad |
|---|---|
| One product, one repository, explicit internal boundaries | Separate frontend/backend projects merely because owners differ |
| Small complete vertical slices | Large horizontal "backend first" or "frontend first" buildouts with no usable flow |
| Explicit source of truth per concept | Same business rule copied into UI, API, and database code |
| `UNKNOWN` when evidence is missing | Guessing a plausible scientific value so the UI looks complete |
| Evidence + provenance + observation time | Untraceable scientific facts in seed data or component text |
| Explainable matching/reason codes | Black-box or invented compatibility percentages |
| Server-side validation and authorization | Trusting browser/client validation as security |
| Additive, reviewed migrations | Editing an already-applied migration to make branches agree |
| One coordinated writer for high-conflict migrations | Two AI agents generating competing migration sequences |
| Server Components by default when practical | Making everything client-side because it is React |
| Shared design primitives and state conventions | One-off components/styles for every screen |
| Loading/empty/error/unknown/conflict designed intentionally | Happy-path mockup treated as finished product |
| Accessibility built into component behavior | "Fix accessibility later" |
| Deterministic software for deterministic rules | LLM calls for filtering, arithmetic, authorization, or known state transitions |
| AI candidate output -> validation -> evidence/domain review | LLM output written straight into authoritative product state |
| Store/reuse validated AI outputs | Re-sending unchanged documents to models repeatedly |
| Issue defines scope/non-scope/acceptance | Vague chat request handed directly to an autonomous coder |
| AI edits only approved scope | Opportunistic auth/AI/refactor/dependency work |
| Tests protect dangerous invariants | Deleting/weakening tests until CI is green |
| Actual command results reported | "All tests pass" without running them |
| PRs from `work/*` (via segment/phase) toward `staging` | Direct work on `main`/`staging`/`test/*` |
| Human-reviewed shared Git history | AI auto-commit/push/merge/rebase/release |
| Squash coherent feature PRs | Giant unrelated commits or random merge strategies |
| Explicit ADR/PDR/BDR | Durable decisions living only in chat memory |
| Integrate commodity systems | Rebuilding booking/billing/payments for architectural vanity |
| Measure a bottleneck before scale infrastructure | Kafka/Kubernetes/microservices for imagined future load |
| Real customer/provider behavior validates product | Building features because users said "sounds useful" |

## Stop signs

Stop and request/record a decision when a change would:

- invent product policy;
- change scientific meaning;
- weaken security/privacy;
- make a destructive or irreversible schema/data change;
- change public API semantics;
- introduce a major dependency/infrastructure platform;
- change who is authoritative for a domain;
- alter commercial/customer/partner state semantics;
- create a production release or rollback decision.

Professionalism is not the number of rules or abstractions. It is predictable decisions, explicit ownership, safe change, evidence, and recoverability.
