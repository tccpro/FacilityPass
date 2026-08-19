# Command contract

The package scripts **are** the CLI. There is no bespoke command-line application, and
there should not be one: a custom wrapper would add a layer to maintain, obscure the
underlying tool's exit code, and hide the original error output that
[debugging](debugging.md) depends on.

> **Status:** this document is the contract. The scripts themselves land in
> `phase/00-toolchain` together with `package.json`. Until then the commands below are
> specification, not yet executable.

## Properties

Every command in this repository should be:

```text
predictable       same inputs, same result
short             memorable without looking it up
quiet on success  no output worth reading means nothing needs attention
loud on failure   the real error, not a summary of it
standard exit     0 = success, non-zero = failure, always
```

Quiet-on-success matters more than it looks. A command that prints forty lines when
everything is fine trains you to stop reading it, and the one line that mattered gets
skipped.

## Surface

### Development

| Command | Does |
| --- | --- |
| `pnpm dev` | Development server |
| `pnpm build` | Production build |
| `pnpm start` | Serve the production build |

### Composite gates

| Command | Composition |
| --- | --- |
| `pnpm check` | `lint` + `typecheck` + unit tests |
| `pnpm verify` | `check` + production build |
| `pnpm verify:all` | `format:check` + `verify` + end-to-end tests |

`pnpm check` is the fast inner loop. `pnpm verify` is what must pass before a commit.
`pnpm verify:all` is what must pass before a branch is considered ready.

### Individual checks

| Command | Does |
| --- | --- |
| `pnpm lint` | ESLint, zero warnings tolerated |
| `pnpm typecheck` | Regenerate Next types, then `tsc --noEmit` |
| `pnpm test` | Unit tests, once |
| `pnpm test:watch` | Unit tests, watching |
| `pnpm test:coverage` | Unit tests with coverage |
| `pnpm test:e2e` | Playwright end-to-end tests |
| `pnpm format` | Write formatting |
| `pnpm format:check` | Check formatting without writing |

`typecheck` regenerates types first because `next-env.d.ts` is generated and git-ignored;
a bare `tsc` fails on a clean checkout for reasons that have nothing to do with the code.

## Notes for Windows

Composite scripts run through `cmd.exe` when pnpm spawns them, so `&&` **inside a
package.json script** works. `&&` typed at a **Windows PowerShell 5.1 prompt** is a parser
error — run gate commands one per line:

```powershell
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

Inline `VAR=value command` is also not PowerShell syntax. Scripts therefore avoid inline
environment prefixes entirely rather than depending on a shim.

## What these commands must never do

- Depend on a database. Every command above passes with no `DATABASE_URL` set — that is
  Phase 0's central contract, enforced by CI, which never sets the variable.
- Require network access beyond the package registry.
- Prompt interactively. Anything that blocks waiting for input breaks CI.
- Summarize or swallow the underlying tool's output.
