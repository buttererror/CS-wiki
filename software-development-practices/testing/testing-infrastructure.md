# Testing Infrastructure and Strategy

**Keywords:** testing infrastructure, testing layers, backend E2E, database E2E,
test database, Testcontainers, self-contained test command, database reset,
migration reset, Playwright deferral, test isolation, dedicated test database,
Docker test database, HTTP test client, integration test, test progression

## Purpose

Testing infrastructure determines which real parts participate in a test,
how test data is managed, and how test commands are organized. This page
covers the progression from isolated unit tests to real-database backend
E2E, the choice of test database strategy, and the rationale for deferring
browser-based E2E.

## Classification

- **Field:** Software Engineering
- **Primary area:** Software Development Practices
- **Practice:** Testing infrastructure and strategy
- **Scope:** Backend database E2E, test database isolation, database reset,
  self-contained commands, and Playwright deferral

## Testing Layers

A growing application benefits from testing at several layers. Each layer
has a different boundary and purpose.

### Unit Tests

Unit tests protect isolated logic with controlled collaborators.

```text
Service
↓
Mocked dependency
```

Useful for:

* Business rules
* Complex transformations
* Validation logic
* Permission logic

### HTTP / Application Integration Tests

Integration tests use the real HTTP layer but controlled persistence.

```text
HTTP test client
↓
Framework HTTP layer
↓
Input validation
↓
Controller
↓
Service
↓
Persistence test double
```

These prove:

* Routes work
* Validation works
* Controllers are wired correctly
* HTTP responses behave correctly

They do **not** prove that real database integration works.

### Backend Database E2E

Backend database E2E tests exercise the real backend stack from HTTP to
a real database.

```text
HTTP test client
↓
Application framework
↓
Validation
↓
Authentication
↓
Controller
↓
Service
↓
ORM
↓
Database
```

This proves that the real backend stack works together.

Backend database E2E becomes more valuable when the system contains
meaningful cross-layer behavior such as authentication guarding real
database operations:

```text
Login
↓
Cookie
↓
Protected route
↓
Domain operation
↓
Real database
```

### Browser E2E

Browser E2E tests through a real browser against the full stack.

```text
Browser
↓
Frontend framework
↓
Network
↓
Application framework
↓
ORM
↓
Database
```

This is the most comprehensive boundary but also the most expensive to
operate. See [Why Browser E2E May Be Deferred](#why-browser-e2e-may-be-deferred).

### Testing Model

```text
Unit tests
        ↓
Focused isolated logic

Frontend integration tests
        ↓
UI framework + mocked network

Backend HTTP integration tests
        ↓
HTTP layer + controlled persistence

Backend database E2E
        ↓
HTTP + Auth + ORM + real database

Manual browser smoke
        ↓
Real frontend confirmation

Later:
Browser E2E (Playwright)
```

Each layer has a different purpose. The goal is not to make every test
exercise the entire system.

---

## Dedicated Test Database

Real database E2E tests should never use the normal development database.

Sharing the development database creates problems:

```text
Development application
        ↓
     app_db
        ↑
    E2E tests
```

Tests could modify or delete development data, and may depend on records
already present.

Preferred:

```text
Development
↓
app_db

E2E
↓
app_test_db
```

---

## Test Database Options

Three approaches are commonly considered.

### Shared Local Database

Rejected.

Problems:

* Tests can modify development data.
* Existing records make tests nondeterministic.
* Cleanup is dangerous.

### Testcontainers

Testcontainers can create a disposable database container for a test run:

```text
Tests start
↓
Create PostgreSQL container
↓
Migrate DB
↓
Run tests
↓
Destroy container
```

This provides excellent isolation. However, it adds lifecycle and
infrastructure complexity that may not be necessary early on.

Testcontainers can be introduced later when CI isolation or disposable
databases provide enough value to justify the additional complexity.

### Dedicated Docker Test Database

A separate Docker Compose service provides clear isolation while reusing
familiar infrastructure.

```text
postgres
→ app_db
→ normal development

postgres-test
→ app_test_db
→ E2E testing
```

---

## Self-Contained Test Command

The preferred developer experience is a single command:

```bash
pnpm --filter api test:e2e
```

The developer should not need to manually perform several setup steps
before every run.

Conceptually:

```text
test:e2e
↓
Ensure test database service is available
↓
Prepare test database
↓
Apply/reset migrations
↓
Start application under test
↓
Run HTTP test suite
```

This is called a **self-contained test command** because the command owns
the prerequisites required for the test.

---

## Persistent Test Service

A self-contained command does not necessarily require destroying the
database service after every test run.

The Docker service can remain alive:

```text
postgres-test
✅ stays running
```

while test data is still reset:

```text
old test rows
❌ do not survive into the next test run
```

Therefore these ideas can coexist:

```text
Dedicated test database
+
Persistent PostgreSQL service
+
Self-contained test command
```

The service lifecycle and test-data lifecycle are different concerns.

---

## Database Reset Strategies

### Targeted Cleanup

```ts
await db.order.deleteMany();
await db.product.deleteMany();
await db.user.deleteMany();
```

Advantages:

* Fast
* No need to rebuild schema

Disadvantages:

* Cleanup logic grows with schema
* Foreign-key ordering must be maintained
* Easy to miss newly added tables

### Recreate Docker Volume

```text
Destroy PostgreSQL volume
↓
Start PostgreSQL from nothing
↓
Initialize database
↓
Run migrations
↓
Run tests
```

This is too heavy for normal test execution. Useful mainly for
infrastructure debugging or completely clean environment verification.

### Full Migration Reset

```text
Reset test database
↓
Replay migrations
↓
Run tests
```

The main advantage is simplicity. There is no need to maintain an expanding
manual cleanup function.

With few models and few migrations, the reset cost is small. If migrations
become numerous and test execution becomes noticeably slow, targeted cleanup
can be introduced later.

---

## Why Browser E2E May Be Deferred

Browser E2E testing is valuable but requires managing:

* Frontend server
* Backend server
* Database
* Seed users
* Browser lifecycle
* Test cleanup
* Async timing
* Navigation
* Authentication state

At an early stage, much of a simple browser flow may duplicate existing
frontend and backend coverage.

Browser E2E becomes more valuable when real multi-feature workflows appear:

```text
Login
↓
Create record
↓
Schedule task
↓
Open task
↓
Complete workflow
↓
Logout
```

This kind of workflow validates behavior that isolated frontend and backend
tests cannot fully prove.

---

## Core Engineering Lesson

Testing infrastructure should increase confidence without making development
harder. The chosen progression is:

```text
Start simple
↓
Introduce tests when the corresponding risk appears
↓
Add real DB E2E when persistence/auth integration becomes important
↓
Add browser E2E when cross-feature user workflows become meaningful
↓
Optimize database cleanup only when test speed becomes a real problem
```

This follows the same principle used throughout the project:

```text
Do not solve future complexity before it exists.

But introduce structure before current complexity becomes painful.
```

---

## Related Concepts

- [Software Testing](README.md) — testing taxonomy, dimensions, boundaries,
  execution, purpose, and classification.
- [Software Development Practices](../README.md)
- [Lean MVP and Vertical Slices](../lean-mvp-vertical-slice-development.md) —
  YAGNI, MVP scope, and incremental architecture.
- [Authentication](../../security/identity-and-access-management/authentication.md) —
  the authentication architecture that motivates backend database E2E.
