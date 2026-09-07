# Decision records

Decision records explain durable choices. There are three kinds:

- **ADR** — architecture/technical structure. Engineering ADRs are owner-private:
  `docs/founder/decisions/` (currently ADRs 001–012).
- **PDR** — product behavior/scope. Shared with both leads: `docs/global/decisions/`.
- **BDR** — business/commercial assumption or decision. Shared: `docs/global/decisions/`.

Templates: `ADR-TEMPLATE.md`, `PDR-TEMPLATE.md`, `BDR-TEMPLATE.md`.

## Numbering

Zero-padded, sequential, **never reused**. A superseded record keeps its number and
gains a `Superseded by NNN` status; it is not deleted, because the reasoning that led
to the earlier decision is part of the record.

## Shared (PDR/BDR) index

| Record | Status | Decision |
| --- | --- | --- |
| [PDR-001](PDR-001-release-wedge.md) | SUPERSEDED | First release scope — resolved by project-logic v3: controlled web beta; geography is an M0 business-gate PDR |

## Engineering ADR index

Architecture ADRs live in `docs/founder/decisions/` (owner-private layer); see the
index in `docs/founder/decisions/README.md`.

