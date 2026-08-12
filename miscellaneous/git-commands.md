# Git Command Reference & Useful Snippets

**Keywords:** git restore, git stash, selective restore, git commands, git syntax, stash restore, checkout single file, version control reference

## Purpose

This document serves as a reference table and practical guide for useful Git commands, syntaxes, flags, use cases, and concrete execution examples.

---

## Command Reference Table

| Command | Explanation | Syntax Overview | Use Case | Example |
| --- | --- | --- | --- | --- |
| `git restore --source=<ref> -- <path>` | Restores a specific file (or set of files) in the working tree using contents from a target commit, branch, or stash entry. | `git restore`: Restore working tree files<br>`--source=<ref>`: Target commit, branch, or stash entry (e.g. `stash@{0}`)<br>`--`: Pathspec separator<br>`<path>`: Target file path | Selective file extraction from a stash or commit without applying the whole stash or changing branches. | `git restore --source=stash@{0} -- apps/api/package.json` |
| `git reset --mixed [<commit>]` | Moves `HEAD` to target commit and resets index (staging area), keeping all changes in the working tree as unstaged edits. *(Default mode)* | `git reset`: Move `HEAD` & reset state<br>`--mixed`: Reset index (unstage), preserve working tree<br>`<commit>`: Target commit/ref (e.g., `HEAD~1`) | Undoing local commits or unstaging staged files while keeping all code edits safely in the working directory. | `git reset --mixed HEAD~1` |

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

### 2. Reset Staging Area & Commit Pointer: `git reset --mixed [<commit>]`

#### Purpose & Behavior
Moves `HEAD` back to a specified commit (defaulting to `HEAD` if omitted) and **resets the index (staging area)** so it matches that commit. Crucially, it leaves your actual working tree files untouched, marking all differences as **unstaged modifications**.

Note: `--mixed` is the **default mode** for `git reset` if no flag is specified.

#### Flag Breakdown
- `git reset`: Command used to update `HEAD`, index, or working tree state.
- `--mixed`: Resets index (unstages changes) while preserving working tree file contents.
- `<commit>`: Target commit pointer (e.g., `HEAD~1` for previous commit, or omitted to target current `HEAD`).

#### Common Use Case
- You committed locally but realize you want to split your changes into smaller, logical commits. Running `git reset --mixed HEAD~1` removes the commit and unstages all files so you can selectively `git add` and commit them in parts.
- You accidentally staged unwanted files with `git add .` and want to unstage everything: `git reset --mixed HEAD` (or simply `git reset`).

#### Step-by-Step Execution Example

```bash
# Scenario: Undo last local commit, keeping all code edits in working directory as unstaged

# 1. Inspect current commit log
git log -n 2

# 2. Reset HEAD back 1 commit and unstage changes
git reset --mixed HEAD~1

# 3. Check status - files are preserved as unstaged edits
git status
```

#### Git Reset Modes Comparison

| Flag | Moves `HEAD`? | Resets Index (Staging Area)? | Preserves Working Tree Files? | Data Safety Risk |
| --- | --- | --- | --- | --- |
| `--soft` | Yes | No (Stays staged) | Yes | Safe (No loss of edits) |
| `--mixed` *(Default)* | Yes | Yes (Becomes unstaged) | Yes | Safe (No loss of edits) |
| `--hard` | Yes | Yes | **No (Discards edits)** | ⚠️ High (Uncommitted edits lost) |

---

## Related Concepts

- [Git Space Notes](git-space.md)
- [Detached HEAD Recovery](../software-development-practices/version-control/detached-head.md)
- [Version Control Practices](../software-development-practices/version-control/)
