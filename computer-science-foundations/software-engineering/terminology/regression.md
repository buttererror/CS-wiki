# Regression

**Keywords:** regression, software regression, bug vs regression, functional regression, performance regression, visual regression, component-identity regression, security regression, regression testing, git bisect

## Purpose

This document defines **regression** as a foundational software engineering concept applied across software development, testing, performance engineering, and system reliability.

---

## Definition

In software engineering, a **regression** is a defect or bug introduced by a code change (such as a new feature, refactor, bug fix, dependency update, or configuration change) that causes **previously working functionality, performance, or system behavior to break, degrade, or revert to an inferior state**.

The term derives from the Latin *regredi* ("to step backward" or "return"), representing the direct opposite of *progress*.

---

## Bug versus Regression

While every regression is a bug, not every bug is a regression:

| Concept | Definition | Example |
| :--- | :--- | :--- |
| **New Bug** | A defect in newly introduced functionality that has never worked properly in production or testing. | A brand-new export endpoint returns HTTP 500 on its initial deployment. |
| **Regression** | A defect in pre-existing functionality that previously functioned correctly, caused by an unrelated code change. | Refactoring the top navigation bar inadvertently breaks checkout form submission on an existing page. |

---

## Common Types of Regressions

Regressions can affect various system attributes beyond functional business logic:

1. **Functional Regression:**
   - A previously validated user workflow or calculation stops working or returns incorrect data.
2. **Performance Regression:**
   - An operation becomes significantly slower, latency spikes, or CPU/memory consumption increases due to algorithmic inefficiency or unoptimized queries.
3. **Visual / UI Regression:**
   - A stylesheet, design token, or HTML change unintentionally shifts layout margins, breaks responsive wrapping, or misaligns UI components.
4. **Lifecycle / Identity Regression (e.g., Component-Identity Regression):**
   - A code change in declarative UI components (such as defining a child component inside a render function or using unstable keys) causes the UI reconciler to treat the same logical component as a new instance, triggering unneeded DOM teardowns, loss of input focus, and state wipes.
5. **Security Regression:**
   - A code modification accidentally removes or bypasses an authorization check, CORS constraint, or input sanitization routine that previously protected the system.

---

## Prevention and Detection

- **Regression Testing:** Automated test suites (unit, integration, and end-to-end) that run on continuous integration (CI) pipelines to systematically verify that existing behavior remains intact.
- **Visual Regression Testing:** Automated screenshot comparison tools that capture pixel diffs against approved baseline images to catch unintended layout shifts.
- **Git Bisecting:** A binary-search technique over commit history used to pinpoint the exact commit that introduced a regression:
  ```bash
  git bisect start
  git bisect bad                 # current commit contains the regression
  git bisect good <commit-hash>  # previous commit known to work correctly
  ```

---

## Disciplinary Disambiguation

In software engineering, "regression" denotes a system defect or degradation. 

In **statistics, mathematics, and machine learning**, "regression" has a completely distinct meaning: modeling the mathematical relationship between independent input variables and continuous numeric output variables (e.g., Linear Regression, Logistic Regression, Polynomial Regression).

---

## Related Notes

- [Software Testing](../../../software-development-practices/testing/)
- [Frontend Terminology](frontend-terminology.md)
- [React Rendering Model](../../../framework-tooling/frontend/react/rendering-model.md)
- [Narrowing](narrowing.md)
