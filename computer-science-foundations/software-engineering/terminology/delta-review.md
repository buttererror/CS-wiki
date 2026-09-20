# Delta Review

**Keywords:** delta review, code review delta, diff review, interdiff, revision diff, changes since last review, delta analysis, baseline delta review, diff tunnel vision

## Purpose

This document defines **delta review** as an incremental evaluation practice across software development, code review workflows, system architecture, regulatory compliance, and automated static analysis.

---

## Definition

In software engineering, a **delta review** is an evaluation focused exclusively on the **incremental difference** (the *delta* or *diff*) introduced between two states, versions, or iterations of an artifact, rather than performing an exhaustive re-examination of the artifact from scratch.

By constraining review scope strictly to modifications (additions, deletions, and updates), delta reviews conserve reviewer cognitive capacity, accelerate cycle time, and isolate changes for targeted verification.

---

## Primary Manifestations

Delta reviews appear in four primary operational contexts:

### 1. Incremental Code Review (Pull Request Iterations / Interdiff)

In collaborative software development, code reviews frequently span multiple rounds between author and reviewer:

1. **Initial Review (Full PR):** Reviewers evaluate the entire proposed change set against the target branch and leave feedback.
2. **Author Revision:** The author addresses feedback, pushing new commits or force-pushing a revised branch.
3. **Delta Review (Round 2+):** Rather than re-reading the entire pull request, reviewers inspect **only the changes introduced since the previous review round** (often called an *interdiff* or *revision diff*).

```text
Target Branch (main)
       │
       ▼
Commit A ───► Commit B (Round 1: Full PR Review)
                         │
                         ▼  Author addresses comments
                      Commit C (Round 2: Delta Review — inspects diff between B and C)
```

Modern code review platforms provide first-class tooling for delta reviews:
- **GitHub:** Filter via *"Changes since your last review"* or selecting specific commit ranges.
- **GitLab:** Compare revisions across versions in the *Changes* dropdown.
- **Gerrit:** Side-by-side diff comparison between arbitrary Patchsets.

### 2. The "Delta Review" Pitfall: Diff Tunnel Vision

While reviewing deltas is essential for multi-round PR efficiency, treating the *initial* review purely as a delta inspection introduces a well-documented engineering hazard known as **diff tunnel vision**:

- **The Pitfall:** The reviewer focuses exclusively on the green (`+`) and red (`-`) lines presented in a patch, evaluating syntax, naming, and local formatting without opening the surrounding file or tracing callers across the codebase.
- **The Failure Mode:** A diff may look clean and isolated in the review UI while silently breaking global invariants, violating concurrency contracts, introducing duplicate logic, or breaking untested remote call sites.
- **Mitigation:** Effective code review combines **delta verification** (did the author change what they intended without regressions?) with **systemic context inspection** (how does this delta alter contracts, dependencies, and state boundaries across the larger system?).

### 3. Baseline Architecture and Compliance Reviews

In regulated industries (medical software under FDA / IEC 62304, automotive ISO 26262, avionics DO-178C, or financial SOC 2 / PCI-DSS) and large-scale enterprise system design:

- **Baseline Review:** A comprehensive, expensive audit verifying that the entire system complies with security, safety, and architectural standards.
- **Delta Review:** For subsequent releases, auditors evaluate only the **delta against the approved baseline**. Through change impact analysis, the review team identifies modified modules, affected data flows, and regression test results without repeating the full verification lifecycle.

### 4. Automated Delta Analysis (CI / Static Analysis)

Automated quality gates leverage delta evaluation to prevent technical debt from accumulating:

- **Clean as You Code (e.g., SonarQube):** Analyzes and gates pull requests strictly based on quality metrics of *new code* (coverage, duplication, complexity), allowing teams to maintain high quality standards on active work without being blocked by legacy issues.
- **Risk-Based Delta Analysis (e.g., CodeScene):** Measures modification churn and complexity hot spots within the specific commit range to flag high-risk change patterns before merge.

---

## Comparison: Full Review versus Delta Review

| Dimension | Full Review | Delta Review |
| :--- | :--- | :--- |
| **Scope** | Entire pull request, module, or system | Only lines, commits, or components changed since baseline |
| **Primary Goal** | Establish overall architectural alignment, correctness, and fitness for purpose | Verify comment resolution, change safety, and absence of regressions |
| **Cognitive Load** | High — requires broad mental model construction | Low-to-moderate — focused on localized modifications |
| **Risk** | Reviewer fatigue leading to superficial rubber-stamping | Diff tunnel vision: missing systemic side effects outside the diff |
| **When Applied** | First iteration of a PR; major architectural milestones; initial regulatory certification | Subsequent PR rounds; minor releases; CI commit-level gates |

---

## Tooling Disambiguation

The word "Delta" appears in neighboring developer tooling with related but distinct meanings:

- **[`git-delta`](https://github.com/dandavison/delta):** A syntax-highlighting terminal pager for `git diff`, `git log`, and `git show` that improves the readability of diffs in CLI environments.
- **Zed Delta:** A collaborative, real-time multiplayer code and discussion environment designed by the Zed team to replace asynchronous, static pull request reviews.

---

## Related Concepts

- [Software Development Practices](../../../software-development-practices/)
- [Regression](regression.md)
- [Patching](patching.md)
- [Software Testing](../../../software-development-practices/testing/)
- [Version Control](../../../software-development-practices/version-control/)
