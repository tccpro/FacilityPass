# Open decisions register

**Status:** AUTHORITATIVE register  
**Rule:** these decisions belong to the Founder (product/business) or to joint
authority where marked. Do not solve them silently in code, guidelines, or AI tasks.
Any proposal must label them as hypotheses/proposals, never silently as product facts.
When a decision is made, record it as a PDR/BDR/ADR and update this register.

Decision states: `LOCKED` · `OPEN` · `DEFERRED` · `EXPERIMENTAL` · `SUPERSEDED`.

## Product / market (Founder; product lead consulted)

| Decision | Status | Notes |
| --- | --- | --- |
| First paying customer | OPEN | |
| First customer type / wedge | OPEN | customer lifecycle A–E in `vision-and-scope.md`; wedge chosen at Stage 0 exit |
| First scientific domain | OPEN | |
| First geography | OPEN | never hard-coded into architecture/data |
| First provider / option universe | OPEN | neutrality requires a real option universe before comparison claims |
| First capability category | OPEN | |
| Number/diversity of alternatives for neutral comparison | OPEN | |
| First commercial value mechanism | OPEN | see monetization hypotheses below |
| First capability-strategy branches to support | OPEN | strategy families in `PROJECT-LOGIC.md`; implement only what the wedge requires |
| First publication boundary | OPEN | |
| Ranking / order policy | OPEN | must preserve neutrality; sponsored options distinguishable |
| Evidence freshness policy | OPEN | claim-type-specific when decided |
| Final field-level schema | OPEN | schema follows validated workflow evidence, never precedes it |

## Commercial model (Founder)

| Decision | Status | Notes |
| --- | --- | --- |
| Monetization layer(s) | OPEN | discovery / intelligence-case / managed-access / blueprint-teams / institution / partnerships are hypotheses; do not hard-code subscription-, transaction-, supplier-fee-, or lead-gen-only |
| Initial pricing | OPEN | |

## Platform / technical

| Decision | Status | Notes |
| --- | --- | --- |
| Authentication timing/model | OPEN | can discovery be anonymous? when is an account required? provider accounts? secure one-time links? Choose after the first workflow is clear (`docs/founder/decisions/002` covers anonymous feasibility links as a prior input) |
| Monorepo physical split timing | OPEN (DEFERRED by design) | transition rule in `PLATFORM-ARCHITECTURE.md`; explicit ADR when triggered |
| Provider participation model | OPEN | |
| Admin/operator surface timing | OPEN | responsibility preserved; build when real operations justify (`PLATFORM-ARCHITECTURE.md`) |

## Recently closed (for context)

| Decision | Status | Resolved by |
| --- | --- | --- |
| First publication *shape* | LOCKED | controlled hosted web beta (`PROJECT-LOGIC.md` §2) |
| Delivery branch model | LOCKED | ADR-012 (`docs/founder/decisions/`) |
| Documentation layering | LOCKED | ADR-013 (`docs/founder/decisions/`) |
| Stage vocabulary | LOCKED | restructure master prompt → `stages.md` |
