# Git Command Reference & Useful Snippets

**Keywords:** git restore, git stash, selective restore, git commands, git syntax, stash restore, checkout single file, version control reference

## Purpose

This document serves as a reference table and practical guide for useful Git commands, syntaxes, flags, use cases, and concrete execution examples.

---

## Command Reference Table

| Command | Explanation | Syntax Overview | Use Case | Example |
| --- | --- | --- | --- | --- |
| `git restore --source=<ref> -- <path>` | Restores a specific file (or set of files) in the working tree using contents from a target commit, branch, or stash entry. | `git restore`: Restore working tree files<br>`--source=<ref>`: Target commit, branch, or stash entry (e.g. `stash@{0}`)<br>`--`: Pathspec separator<br>`<path>`: Target file path | Selective file extraction from a stash or commit without applying the whole stash or changing branches. | `git restore --source=stash@{0} -- apps/api/package.json` |

---

## Command Deep Dives

### 1. Selective File Restore from Stash: `git restore --source=stash@{0} -- <path>`

#### Purpose & Behavior
Restores/overwrites a single target file (`apps/api/package.json`) in the current working tree with its state stored inside a specific stash entry (`stash@{0}`), without applying or dropping the rest of the stashed changes.

#### Flag Breakdown
- `git restore`: Modern Git command (introduced in Git 2.23) designed specifically for restoring working tree and index files safely.
- `--source=stash@{0}`: Tells Git to pull the file content from the latest stash commit (`stash@{0}`) instead of `HEAD` or the index.
- `--`: Pathspec separator distinguishing CLI options from file paths, preventing accidental ambiguity if a file path matches a branch or option name.
- `apps/api/package.json`: The specific file path within the repository tree to extract and restore.

#### Common Use Case
Imagine you stashed a large work-in-progress containing edits across 10 files. You realize you only need **one** specific configuration file (`package.json`) from that stash right now, without popping the full stash or causing merge conflicts in the other 9 files.

#### Step-by-Step Execution Example

```bash
# 1. Inspect your current stash entries
git stash list
# Output: stash@{0}: WIP on main: 3a1b2c4 Update dependencies and API schema

# 2. Selectively restore package.json from the latest stash entry (stash@{0})
git restore --source=stash@{0} -- apps/api/package.json

# 3. Verify that package.json has been restored into the working tree
git status
```

#### Modern vs Legacy Alternatives

| Approach | Command | Behavior |
| --- | --- | --- |
| **Modern (`git restore`)** | `git restore --source=stash@{0} -- apps/api/package.json` | Explicit, safe, and avoids overloaded `checkout` behavior. |
| **Legacy (`git checkout`)** | `git checkout stash@{0} -- apps/api/package.json` | Overwrites working tree file from target ref (historical method). |

---

## Related Concepts

- [Git Space Notes](git-space.md)
- [Detached HEAD Recovery](../software-development-practices/version-control/detached-head.md)
- [Version Control Practices](../software-development-practices/version-control/)
