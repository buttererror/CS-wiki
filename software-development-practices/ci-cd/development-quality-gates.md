# Development Quality Gates

**Keywords:** development quality gates, ci/cd, continuous integration, pre-commit, pre-push, git hooks, husky, lint-staged, staged file validation, database isolation

## Concept: DevelopmentQualityGate

## Primary Category: Framework / Tooling >> Development quality gates automate validation at different points between writing code and integrating it into the repository.

## Taxonomy Classification:

* **Field:** Software Engineering
* **Area:** Development Workflow & Continuous Integration
* **Level:** System-level

## Subcategories:

* **PreCommitGate** → Fast validation before a commit is created.
* **PrePushGate** → Broader local validation before commits leave the developer's machine.
* **ContinuousIntegration** → Authoritative validation in a clean, shared environment.
* **GitHook** → Git lifecycle mechanism used to trigger local validation.
* **StagedFileValidation** → Validation restricted to files included in the pending commit.

---

### Definition:

A **DevelopmentQualityGate** is an automated checkpoint that code must pass before progressing further through the development workflow.

A typical layered workflow is:

```text
Code Changes
    ↓
git add
    ↓
Pre-commit
    ↓
Commit
    ↓
Pre-push
    ↓
Push
    ↓
Continuous Integration
    ↓
Merge
```

Each gate has a different responsibility. The goal is not to run every check at every stage, but to place checks according to their **cost, scope, and required confidence**.

---

### Mental Model:

Think of quality gates as progressively stronger filters:

```text
                Increasing scope and confidence
                           →

Code
 │
 ▼
┌─────────────────┐
│   Pre-commit    │  Cheap + immediate
│                 │
│ staged lint     │
│ formatting      │
└────────┬────────┘
         ▼
      Commit
         │
         ▼
┌─────────────────┐
│    Pre-push     │  Broader local validation
│                 │
│ typecheck       │
│ unit tests      │
└────────┬────────┘
         ▼
       Push
         │
         ▼
┌─────────────────┐
│       CI        │  Authoritative validation
│                 │
│ clean install   │
│ lint            │
│ typecheck       │
│ unit tests      │
│ build           │
│ database        │
│ E2E tests       │
└────────┬────────┘
         ▼
       Merge
```

Earlier gates optimize for **fast feedback**.

Later gates optimize for **confidence and reproducibility**.

---

### Example: Clinic Platform Quality Gates

#### PreCommitGate

```text
git commit
    ↓
Husky
    ↓
lint-staged
    ↓
ESLint / formatter
```

* **Husky** installs and manages the Git hook.
* **lint-staged** determines which staged files should be passed to the configured validation commands.

Their responsibilities are therefore distinct:

```text
Husky
→ When should something run?

lint-staged
→ On which staged files should commands run?

ESLint / formatter
→ What validation or transformation should be performed?
```

The pre-commit gate should remain cheap because it executes frequently.

---

#### PrePushGate

```text
git push
    ↓
Husky pre-push
    ↓
Typecheck
    ↓
Unit tests
```

This gate can perform more expensive validation because pushing happens less frequently than committing.

Database-backed E2E tests do not necessarily belong here because starting infrastructure and preparing databases can make normal pushes unnecessarily slow.

---

#### ContinuousIntegration

After the push reaches the remote repository:

```text
GitHub Actions
    ↓
Clean environment
    ↓
Install locked dependencies
    ↓
Lint
    ↓
Typecheck
    ↓
Unit tests
    ↓
Build
    ↓
Fresh PostgreSQL
    ↓
Apply migrations
    ↓
E2E tests
```

CI repeats some local validation intentionally.

Local hooks are developer feedback mechanisms; they are not authoritative because they can be skipped (`--no-verify`), misconfigured, or executed in a machine-specific environment.

CI provides a shared and reproducible validation environment.

---

### LocalHook vs ContinuousIntegration

They solve related but different problems:

```text
Local Git Hooks
→ optimize developer feedback speed

Continuous Integration
→ verify repository state independently and authoritatively
```

Therefore:

```text
Pre-push passed
```

does not imply:

```text
CI can safely skip typechecking and tests
```

CI should independently verify the repository.

---

### ValidationScope

The gates generally increase in scope:

```text
Pre-commit
→ staged files

Pre-push
→ repository/workspace correctness

CI
→ clean repository + infrastructure
```

For example:

* **Pre-commit:** ESLint only changed/staged TypeScript files.
* **Pre-push:** TypeScript checks application/workspace types across packages.
* **CI:** Installs dependencies from scratch and validates the complete relevant repository state.

This distinction prevents expensive repository-wide checks from slowing down every commit.

---

### DatabaseIsolation

Database-backed E2E testing introduces another validation boundary.

A project can maintain independent database environments:

```text
                PostgreSQL

    Development    Local E2E       CI E2E
         │             │              │
     clinic_db     clinic_test     clinic_test
       :5433         :5434           :5432
         │             │              │
     persistent     persistent      disposable
```

The environments serve different purposes:

* **Development DB:** Application development data.
* **Local E2E DB:** Developer-run integration/E2E validation.
* **CI E2E DB:** Clean automated validation.

The CI database is disposable because CI should be able to reconstruct the required state from repository-controlled artifacts such as migrations.

A typical database-backed CI flow is:

```text
Fresh PostgreSQL
    ↓
Create test database
    ↓
Apply committed migrations
    ↓
Run E2E tests
    ↓
Destroy environment
```

This also verifies that the committed migration history can construct a working database from scratch.

---

### Why It Matters:

Development quality gates balance two competing requirements:

```text
Developer speed
        ↕
Validation confidence
```

Running every possible check on every commit maximizes validation but damages feedback speed.

Running almost nothing locally gives fast commits but moves simple failures much later in the workflow.

Layering the checks provides a better trade-off:

| Gate | Primary Goal | Typical Cost |
| :--- | :--- | :--- |
| **Pre-commit** | Immediate code hygiene | Very low |
| **Pre-push** | Local correctness | Low–moderate |
| **CI** | Authoritative verification | Moderate–high |

A useful design principle is:

> Put the cheapest, most actionable checks closest to the developer and progressively increase validation scope as code approaches integration.

---

### Relationships to Other Areas:

* **ContinuousIntegration → Software Engineering / Delivery Automation:**
  Quality gates are part of the broader CI workflow. CI establishes a reproducible environment and independently validates repository state.
* **AutomatedTesting → Software Engineering / Testing:**
  Unit and E2E tests provide different confidence levels and therefore naturally belong at different quality gates depending on execution cost.
* **DatabaseMigration → Databases / Schema Evolution:**
  Running migrations against a fresh CI database verifies that version-controlled schema evolution can reproduce the database required by the application.
* **GitHook → Version Control / Development Workflow:**
  Git exposes lifecycle events such as `pre-commit` and `pre-push`; tools such as Husky make these hooks manageable as repository configuration.

---

### Related Concepts:

* [Git Hook](../../framework-tooling/)
* [Continuous Integration](../)
* [Software Testing](../testing/)
* [Testing Infrastructure & Strategy](../testing/testing-infrastructure.md)
* [Monorepo](../repository-organization/monorepo.md)
* [Lean MVP & Vertical Slice Development](../lean-mvp-vertical-slice-development.md)
