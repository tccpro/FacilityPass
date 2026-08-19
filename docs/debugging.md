# Debugging

## A failing test is information, not an inconvenience

The single most important rule in this repository:

> **Never make a check pass by weakening the invariant it exists to protect.**

The following are not fixes. Each one converts a caught defect into an uncaught one:

| Not a fix | What it actually does |
| --- | --- |
| Deleting the failing test | Removes the detector, keeps the defect |
| Loosening the assertion until it passes | Keeps a test that can no longer fail |
| `as any`, `@ts-expect-error`, `// eslint-disable` | Silences the tool that found the problem |
| `try { … } catch {}` | Converts a loud failure into a silent wrong answer |
| Retrying until it goes green | Hides a race instead of fixing it |
| Relaxing a strictness flag project-wide | Trades a local problem for a global blind spot |

Any of these may occasionally be correct — but only with a stated technical reason, and
the reason belongs in the commit message. "The test was annoying" is not a reason.

This matters more than usual here. FacilityPass's invariants *are* the product: unknown
stays unknown, absence of data is not evidence of absence, inferred never becomes
confirmed, a match is never a verification. A test weakened for convenience is a promise
quietly withdrawn.

## The loop

```text
FAILURE
   ↓
reproduce it                    ← if it is not reproducible, that is the first bug
   ↓
identify the exact failing command
   ↓
read the ORIGINAL error         ← not a summary of it
   ↓
isolate the smallest failing case
   ↓
write or identify the failing test
   ↓
fix the root cause
   ↓
rerun the focused test
   ↓
rerun the full relevant gate
   ↓
commit
```

Two steps are skipped most often, and both are load-bearing.

**Read the original error.** A compiler, linter, test runner or stack trace has already
done the diagnostic work. Paraphrasing it loses the file, the line, the expected value and
the actual value. Never hide raw tool output behind a summary — paste the output, then
interpret it.

**Isolate before fixing.** A change made while the cause is still unknown is a guess. If
the guess happens to work, the mechanism stays unknown and the same defect returns in a
different shape.

## Reading a failure

Ask in this order:

1. **Is this the failure I think it is?** Same command, same environment, same branch.
2. **What changed?** `git diff`, `git log --oneline -5`, `git status`. A failure that
   appeared without a code change usually means environment, dependency, or generated
   state.
3. **Is the state stale?** Delete `.next`, regenerate types with `pnpm typegen`, reinstall
   with `pnpm install --frozen-lockfile`. Stale generated types produce errors describing
   code that no longer exists.
4. **Does the smallest case still fail?** One test, one file, one input.
5. **What is the invariant?** Name what the check was protecting before changing anything
   near it.

## Failures specific to this project

| Symptom | Likely cause |
| --- | --- |
| `pnpm build` fails but `pnpm typecheck` passed | `next build` type-checks the **whole** tsconfig project, including `e2e/`, `*.test.ts` and config files. `build` is a strict superset of `typecheck`. |
| `TS2307: cannot find module './globals.css'` on a clean checkout | `next-env.d.ts` is generated and git-ignored. Run `pnpm typegen` (this is why `typecheck` runs it first). |
| Build fails only in CI, never locally | Almost always line endings, case-sensitive paths, or an environment variable present locally and absent in CI. |
| A check passes locally and fails for a colleague | Something ambient leaked into the test — most often a real `DATABASE_URL` in the shell. Phase 0's contract is that everything passes with **no** database configured. |
| `/api/health` shows as static (`○`) in the build route table | A module reached environment or database code at build time. This is an architecture failure, not a rendering detail. |
| `pnpm install` exits non-zero mentioning build scripts | A dependency with an install hook is not listed in `allowBuilds`. Add it with a comment naming the parent that pulls it in; never approve interactively without committing the result. |

## When stuck

Escalate rather than accumulate changes. Revert to the last known-good commit, reproduce
the failure there, and reintroduce the change in smaller pieces. A long sequence of
speculative edits on top of an un-diagnosed failure is harder to unwind than starting from
green.

If a root cause is genuinely not found, record what was ruled out — that is real progress
and it prevents the next person repeating it.
