# Idempotency

**Keywords:** idempotency, idempotent, idempotent operation, idempotency key, safe retries, no-op, at-least-once delivery, put, delete, f(f(x))=f(x), side effects

## Purpose

This document defines **idempotent** and **idempotency** across software engineering and distinguishes the term's mathematical foundation from its operational applications in distributed systems, API design, database state, and frontend lifecycles.

---

## Definition

An operation is **idempotent** if applying it multiple times produces the exact same system state and outcome as applying it once.

Mathematically:

$$f(f(x)) = f(x)$$

The adjective is *idempotent*; the property is *idempotency*.

Unlike **pure functions** (which have no side effects whatsoever), an idempotent operation often produces side effects—such as creating a resource, updating a record, or binding an event. However, **subsequent executions with the same input introduce no additional mutations or side effects**; they leave the system in the identical target state.

---

## Contexts & Engineering Applications

| Context | What Idempotency Means | Non-Idempotent Equivalent | Primary Mechanism |
| :--- | :--- | :--- | :--- |
| **HTTP Protocols & REST APIs** | Requesting `GET`, `PUT`, or `DELETE` repeatedly leaves server resources in the same state. Safe to retry on network timeouts. | `POST /orders` without an idempotency key (creates duplicate orders on retries). | Declarative resource replacement (`PUT`), deterministic deletion (`DELETE`), or client-supplied `Idempotency-Key` headers. |
| **Database & Persistence** | Assigning absolute state produces the same row state regardless of execution count. | Relative increments: `UPDATE account SET balance = balance + 10`. | Declarative updates (`SET status = 'active'`), unique constraints, or upserts (`INSERT ... ON CONFLICT DO UPDATE`). |
| **Distributed Messaging & Queues** | Processing a duplicate event message (e.g. from at-least-once delivery) produces no repeated business mutations. | Processing duplicate billing events and double-charging a customer. | Message deduplication IDs, transaction inbox/outbox patterns, or tracking processed event UUIDs. |
| **Lifecycle Cleanups & Teardowns** | A component or process teardown routine safely executes multiple times without double-restoring or corrupting state. | Blindly resetting styles or removing event listeners without checking if already restored, causing null reference errors or styling leaks. | Guard clauses checking stored references (e.g. `if (ref.current === null) return; ref.current = null`). |

---

## Mechanisms to Achieve Idempotency

1. **Declarative State Assignment (Natural Idempotency):**
   Specifying the desired *end state* rather than an incremental delta:
   ```sql
   -- Idempotent: safe to run repeatedly
   UPDATE users SET email_verified = true WHERE id = 42;

   -- Non-idempotent: mutates state with each run
   UPDATE accounts SET failed_login_attempts = failed_login_attempts + 1 WHERE id = 42;
   ```

2. **Idempotency Keys:**
   Clients generate a unique token (e.g., a UUID in an `Idempotency-Key` HTTP header) per mutation intent. The server persists the token and execution result. If a retried request arrives with the same key, the server returns the cached response without re-executing the operation.

3. **Status-Transition Matrix Diagonal Policies:**
   In state-driven workflows, when the current state equals the target state (`Current === Target`), the system treats the request as a safe **idempotent no-op** rather than throwing a validation error.

4. **Guarded Teardown Routines (Frontend & Concurrency):**
   In UI frameworks like React where cleanup effects can execute alongside explicit dismiss handlers or during unexpected unmounts, teardown functions guard against multiple invocations:
   ```typescript
   function releaseScrollLock() {
     if (previousBodyOverflowRef.current === null) return
     document.body.style.overflow = previousBodyOverflowRef.current
     previousBodyOverflowRef.current = null
   }
   ```

---

## Boundaries & Distinctions

- **Idempotency vs. Pure Functions:** Pure functions never cause side effects and always produce the same return value for the same arguments. Idempotent operations may cause side effects during their initial execution, but repeated executions cause no further state changes.
- **Idempotency vs. Deduplication:** [Deduplication](deduplication.md) is an operational *mechanism* that eliminates redundant copies or identical in-flight work. Deduplication is often employed to implement idempotency in distributed systems.
- **Idempotency vs. Atomicity:** [Atomicity](atomicity.md) guarantees all-or-nothing execution within a single transaction boundary. Idempotency guarantees safe repeated executions across multiple transaction attempts.
- **State Invariance vs. Response Identity:** An HTTP method can be idempotent even if its response code or body changes between requests. For example, `DELETE /items/1` may return `204 No Content` on the first call and `404 Not Found` on subsequent calls; the operation is still idempotent because the persistent server state (the absence of `/items/1`) remains unchanged.

---

## Related Terms

- **Idempotency Key:** A unique client-generated token that identifies a specific operation to prevent duplicate execution across retries.
- **No-op (No Operation):** An execution path that deliberately performs no work because the target state is already achieved.
- **At-Least-Once Delivery:** A messaging guarantee where duplicate deliveries are possible, necessitating idempotent consumer processing.
- **Safe Method:** An HTTP method (like `GET` or `HEAD`) that causes no state mutations at all. All safe methods are idempotent, but not all idempotent methods (like `PUT` and `DELETE`) are safe.

---

## Related Concepts

- [Software Engineering Terminology](./)
- [Deduplication](deduplication.md)
- [Atomicity](atomicity.md)
- [Status-Transition Matrix](status-transition-matrix.md)
- [Mechanism](mechanism.md)
- [Caveat](caveat.md)
- [Request-Response](../communication-patterns/request-response.md)
