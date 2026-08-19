# Git workflow

## Branch model

```text
main
  │
  └── staging
        │
        ├── phase/00-repository-bootstrap
        ├── phase/00-toolchain
        ├── phase/00-foundation-core
        ├── phase/00-app-shell
        ├── phase/00-health
        ├── phase/00-e2e-ci
        └── phase/00-docs-claude
```

Direction of travel is one-way:

```text
phase/*  →  Pull Request  →  staging  →  Release PR  →  main
```

| Branch | Meaning |
| --- | --- |
| `main` | Approved product state. No ordinary development happens here. |
| `staging` | Integrated engineering state. It should always work. |
| `phase/*` | One coherent, independently testable engineering change. |

A phase branch is **not** "several weeks of work". It is one change with its own
acceptance procedure. If a branch cannot be described in a single sentence without "and",
it is probably two branches.

## Repository genesis

Performed once, and already done:

```text
git init -b main
  ↓  minimal genesis commit (.gitattributes, .gitignore, README placeholder)
git branch staging main
  ↓
git switch -c phase/00-repository-bootstrap staging
```

The genesis commit is deliberately tiny. `.gitattributes` must exist from commit #1 so
line endings never need retrofitting, and `.gitignore` must exist from commit #1 so a
private document can never be accidentally staged.

## Conflict-prevention rules

1. Every new `phase/*` branch starts from current `origin/staging`.
2. Every phase branch has exactly one main responsibility.
3. Do not fold opportunistic refactoring into an unrelated branch.
4. Never force-push a shared branch.
5. Never develop directly on `main`.
6. Never develop directly on `staging`.
7. If `staging` moves, reconcile it **inside** the phase branch.
8. Resolve conflicts before the phase branch reaches `staging`.
9. Shared files — `package.json`, `pnpm-lock.yaml`, schema, migrations, ESLint and Next
   config — should be touched by one active branch at a time.
10. After merge the branch may be deleted; the history and the PR preserve the work.

## Commit conventions

One commit per coherent step, each leaving the tree in a state where the checks available
at that point pass.

```text
chore:  tooling, configuration, repository hygiene
feat:   product behaviour
fix:    a defect
test:   tests only
docs:   documentation only
data:   curated scientific records  ← from Phase 1
```

`data:` exists because a scientific-data error and a software error need different review
thinking. Curated facility records must be reviewable on their own, never buried inside a
`feat:` commit that also changes a page.

If a step's verification fails, **amend the owning commit** rather than appending a
"fix typo" commit — while the history is unpublished, there is nothing to protect.

## Identity

Commits are authored as:

```text
Asada Shinsaku <102004566+tccpro@users.noreply.github.com>
```

configured with `git config --local` **only**. The machine's global git identity belongs
to a different person and is never read from or written to. The GitHub `noreply` address
is used deliberately: this repository is public, and a commit email is permanent.

Verify at any time — this must print exactly one line:

```powershell
git log --pretty="%an <%ae>|%cn <%ce>" | Sort-Object -Unique
```

Author *and* committer are both checked, because they are separate fields and
`GIT_COMMITTER_*` can override one without the other.

## Public and private files

This repository is **public**. Some project documents are not.

| Kept private (git-ignored) | Why |
| --- | --- |
| `project-guidance.md` | Product specification — includes pricing hypotheses and the long-term data moat. |
| `project-guidance-update.md` | Implementation / data-quality / SEO specification — includes monetization timing and KPI targets. |
| `CLAUDE.local.md` | Private index pointing at the two documents above. |
| `.env`, `.env.*` | Secrets. `.env.example` is the one committed exception. |

Backed-up copies live outside the worktree. **Git-ignored is not backed up** — a file
ignored by git exists on exactly one disk until something else replicates it.

`CLAUDE.md` is public and must never quote or paraphrase private material. It points at
`CLAUDE.local.md`, which may be absent — a public clone has no private context, and the
public instructions must degrade gracefully rather than dangle a pointer at a missing file.

### Privacy check — run before every push

A regex like `^\.env` is **wrong** here: it matches `.env.example`, which is deliberately
committed, so the check would fail on a correct repository. Enumerate instead:

```powershell
$forbidden = git ls-files | Where-Object {
    $_ -eq '.env' -or
    $_ -eq '.env.local' -or
    $_ -eq 'CLAUDE.local.md' -or
    $_ -eq 'project-guidance.md' -or
    $_ -eq 'project-guidance-update.md' -or
    (($_ -like '.env.*') -and ($_ -ne '.env.example'))
}
if ($forbidden) { $forbidden; throw 'Private files are tracked by Git.' }
```

Expected: no output. Allowed: `.env.example`.

## What is never done automatically

Pushing, merging, opening or merging a pull request, tagging, and releasing are **manual,
authorized actions**. An assistant working in this repository may inspect, edit, run,
test, debug and prepare commits; it does not publish. Never `--no-verify`, never
`git reset --hard` as a shortcut, never a force-push to a shared branch.
