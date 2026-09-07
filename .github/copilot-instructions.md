# FacilityPass Copilot / repository AI instructions

Before proposing or editing meaningful code, read:

1. `PROJECT-LOGIC.md`
2. `AGENTS.md`
3. `docs/global/document-hierarchy.md`
4. `docs/global/CURRENT.md`
5. the relevant shared standard under `docs/global/` (or the owner-private layer for
   backend/data/AI and frontend/design specifics)

Do not infer product, scientific, commercial, security, or authority policy from code alone.

Core rules:

- one-way logic: UI -> application/API -> service -> domain -> repository -> database;
- missing scientific evidence remains `UNKNOWN`;
- AI output is candidate information, never authoritative truth by itself;
- do not weaken tests or type safety to make a change pass;
- do not introduce dependencies/infrastructure/packages/segments that the issue did not authorize;
- delivery branches: `work/<developer>/<task> -> segment/<milestone>/<responsibility>
-> phase/<milestone> -> test/<milestone> -> staging -> main`; agents work on
  `work/*` branches only;
- do not commit, push, merge, rebase shared history, force-push, release, or deploy unless a human explicitly asks for that exact operation;
- preserve unrelated human work in the tree;
- report commands actually run and skipped checks honestly.

For the complete operational protocol, `AGENTS.md` is authoritative.
