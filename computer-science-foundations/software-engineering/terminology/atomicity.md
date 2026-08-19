# Atomicity

**Keywords:** atomic, atomicity, atomic operation, all-or-nothing, indivisible operation, transaction, commit, rollback

## Purpose

This document defines how **atomic** and **atomicity** are used across software engineering and distinguishes the term's related but context-dependent meanings.

## Definition

An operation is **atomic** when it has no observable partial result within its stated boundary. From the relevant observer's perspective, it either takes effect completely or does not take effect at all.

**Atomicity** is the property that provides this all-or-nothing behavior. The adjective is *atomic*; the property is *atomicity*.

The boundary matters. A database transaction can be atomic for its database writes while an email sent during that transaction remains an external side effect that cannot be rolled back.

## Contexts

| Context | What atomic means | What it does not automatically guarantee |
| --- | --- | --- |
| Database transaction | Its grouped database changes commit together or roll back together. | Isolation from concurrent transactions, durability after a system failure, or reversal of external side effects. |
| Concurrent program | One operation appears indivisible to other threads or processes at the relevant memory or synchronization boundary. | Correctness of a larger multi-step workflow. |
| Version control | A commit records one complete, logically related repository change. | That the commit is small, bug-free, or safe to deploy by itself. |
| Distributed system | A protocol may aim for one outcome across multiple participants. | That global all-or-nothing coordination is cheap, available during failures, or always the right design. |

## Database Example

Updating a record and creating its audit event are one business action when the history must match the current state:

```text
begin transaction
  update Service
  create ServiceUpdate

both operations succeed → commit both
either operation fails  → roll back both
```

Without atomicity, the Service can change while its audit event fails to be recorded. A later API error does not automatically undo the earlier successful database write.

## Related Terms

- **Transaction:** a mechanism that can provide atomicity for grouped database operations.
- **Commit:** make a successful transaction or version-control change durable within its system.
- **Rollback:** discard a transaction's uncommitted database changes after failure or cancellation.
- **Consistency:** a different property; it concerns whether data satisfies declared rules before and after an operation.
- **Isolation:** a different transaction property; it concerns how concurrent work can observe or interfere with a transaction.
- **Compensation:** a later corrective action for work that cannot be rolled back, often used when distributed steps or external side effects are involved.

## Boundaries

- Atomic does not mean synchronous, fast, or automatically thread-safe in every context.
- Atomicity applies only to the named operation and resource boundary. State or side effects outside that boundary may already have changed.
- A sequence of individually atomic operations is not necessarily atomic as a group. Use one enclosing transaction or another coordination mechanism when the whole sequence must succeed or fail together.

## Related Concepts

- [Software Engineering Terminology](./)
- [Mechanism](mechanism.md)
- [Caveat](caveat.md)
- [Software Taxonomy](../software-taxonomy.md)
