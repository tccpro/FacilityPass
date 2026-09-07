# CLAUDE.md — Claude Code entrypoint

All FacilityPass guidance lives in `PROJECT-LOGIC.md` (top-level canonical logic) and
`docs/global/` (shared standards). This root file exists only so Claude Code discovers
its entrypoint at the repository root.

Claude must first read and follow **`AGENTS.md`** (root), after `PROJECT-LOGIC.md`.

The authoritative order is:

1. `PROJECT-LOGIC.md`
2. accepted decision records in `docs/global/decisions/`
3. current product scope: `PROJECT-LOGIC.md` §2 and the milestone plan
4. shared standards under `docs/global/`
5. `docs/global/CURRENT.md`
6. `docs/global/OPEN-DECISIONS.md` — never resolve these silently
7. task/issue specification
8. relevant domain documents (`docs/founder/`, `docs/product/` — owner-private)

Do not treat archived guidance (`docs/founder/archive/`) as authority. Do not commit,
push, merge, rebase shared history, tag, release, or deploy unless the human explicitly
requests that exact action. The delivery branch model is
`work/* -> segment/* -> phase/* -> test/* -> staging -> main` (see
`docs/global/git-workflow.md`).

