# Detached HEAD

**Reading status:** Not read yet
**Keywords:** detached HEAD, detached head, git switch -c, git cherry-pick, git reflog, HEAD, branch pointer

## Purpose

Detached `HEAD` is the Git state where `HEAD` points directly to a commit
instead of a branch name.

That state is common when you check out a historical commit, inspect a tag, or
commit while not attached to a branch.

## Why It Matters

The commit itself is still valid. The risk is only that the commit is easy to
lose track of if you move to another branch before naming it.

This is why detached `HEAD` recovery usually means one of two things:

- preserve the commit by giving it a branch name;
- reuse the change on another branch.

## Recovery Patterns

If you want to keep the exact commit you made while detached:

```bash
git switch -c rescue-branch
```

If you already moved away and need to find the commit again:

```bash
git reflog
```

If you want the same change on another branch as a new commit:

```bash
git cherry-pick <commit-sha>
```

## Branch Name Versus Cherry-Pick

`git switch -c <branch-name>` keeps the existing commit and attaches a branch
name to it.

`git cherry-pick <commit>` replays the change onto the current branch and
creates a new commit with a new hash.

Use the first when the detached commit already contains the work you want to
preserve. Use the second when the change belongs on a different branch.

## Related Concepts

- [Version Control](README.md)
- [Software Development Practices](../README.md)
- [Repository Organization](../repository-organization/README.md)
- [Monorepo](../repository-organization/monorepo.md)
