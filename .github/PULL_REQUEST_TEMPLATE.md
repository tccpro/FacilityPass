# Pull request

## Problem / issue

Closes #

## Approved outcome

<!-- Describe the user/product/engineering outcome, not just files changed. -->

## Scope

**In scope**
-

**Explicitly out of scope**
-

## Classification

- Task class: `DOCS | FRONTEND | BACKEND | DATA | DATABASE_MIGRATION | SCIENTIFIC_RULE | AI_PRODUCT | SECURITY | INFRASTRUCTURE | CROSS_DOMAIN`
- Risk: `R0 | R1 | R2 | R3`
- Phase / milestone:
- Domain owner(s):

## What changed

-

## What intentionally did not change

-

## Truth / authority check

- [ ] No scientific unknown was converted into a fact.
- [ ] No algorithmic match was converted into facility verification.
- [ ] No commercial assumption/status was inferred from scientific state.
- [ ] Any externally visible scientific/data claim has appropriate provenance.
- [ ] Product behavior changed only according to an approved issue/PDR/BDR/ADR where required.

## Architecture / data check

- [ ] UI/API/domain/repository boundaries remain intact.
- [ ] No provider-specific AI SDK leaked into domain code.
- [ ] No speculative dependency/infrastructure was added.
- [ ] Schema changes include reviewed migrations and data-impact notes.
- [ ] Shared migrations already applied elsewhere were not rewritten.

## UX check (if applicable)

- [ ] Loading, empty, error, `UNKNOWN`, `INFERRED`, and `CONFLICT` states were considered.
- [ ] Status is not communicated by color alone.
- [ ] Keyboard/focus/accessibility behavior was checked.
- [ ] Responsive behavior was visually verified.

### Screenshots / recordings

<!-- Required for meaningful user-interface changes. -->

## Security / privacy check

- [ ] External input is validated server-side.
- [ ] No secrets/tokens/internal IDs/raw stack traces are exposed.
- [ ] Data sent to an AI provider is allowed by the data-handling policy.
- [ ] Authorization is enforced server-side where applicable.

## Tests and evidence

Paste actual results or link CI. Do not write "passes" for commands not run.

- [ ] `pnpm lint`
- [ ] `pnpm typecheck`
- [ ] `pnpm test`
- [ ] `pnpm build`
- [ ] Relevant Playwright/E2E
- [ ] Migration/import/evaluation/security checks where applicable

## Deployment / migration / rollback

- Database migration: `none | additive | destructive/high-risk`
- Environment/config change:
- Rollback / roll-forward plan:
- Post-deploy verification:

## Decisions

- ADR:
- PDR:
- BDR:

## Human sign-off

- [ ] Author reviewed the final diff.
- [ ] Relevant CODEOWNER/domain owner reviewed R2/R3 work.
- [ ] **R3 or cross-authority change:** each required human authority explicitly approved in this PR conversation/review; do not rely on a multiple-owner CODEOWNERS entry as proof of dual approval.
