# Status-Transition Matrix

**Keywords:** status-transition matrix, state-transition matrix, state-transition table, status transition table, finite state machine, state transition graph, lifecycle state machine, status matrix, state machine transition, valid transitions

## Purpose

This document defines what a **status-transition matrix** (and **state-transition matrix**) is in software engineering, explains how it formalizes valid lifecycle changes for domain entities, and illustrates why centralizing transition rules into a matrix prevents invalid states and simplifies testing.

## Definition

A **status-transition matrix** (also called a **state-transition matrix** or **state-transition table**) is a structured two-dimensional model or lookup table that explicitly defines the permitted transitions between discrete states or statuses in a system.

For any entity with a defined lifecycle (such as an appointment, order, shipment, payment, or user account), the matrix specifies for every combination of `(Current Status, Target Status)` or `(Current Status, Triggering Event)` whether the transition is:

- **Valid (Allowed):** the transition is permitted and can execute;
- **Invalid (Forbidden):** the transition is illegal and rejected with an error; or
- **Conditional (Guarded):** the transition is permitted only when specific guard conditions (such as user role, business rules, or invariants) are satisfied.

```text
Current Status (Row) × Target Status (Column) → Allowed | Forbidden | Guarded
```

## Conceptual Model

In a lifecycle model with $N$ discrete statuses, there are $N \times N$ potential direct transitions. A status-transition matrix forces every possible combination to be explicitly evaluated as valid or forbidden rather than leaving edge cases to ad-hoc procedural conditionals.

```text
               Target Status:
               SCHEDULED    CONFIRMED    COMPLETED    CANCELLED    NO_SHOW
From Status:
SCHEDULED      [  No-Op  ]  [  Valid  ]  [ Invalid ]  [  Valid  ]  [  Valid  ]
CONFIRMED      [ Invalid ]  [  No-Op  ]  [  Valid  ]  [  Valid  ]  [  Valid  ]
COMPLETED      [ Invalid ]  [ Invalid ]  [  No-Op  ]  [ Invalid ]  [ Invalid ]
CANCELLED      [ Invalid ]  [ Invalid ]  [ Invalid ]  [  No-Op  ]  [ Invalid ]
NO_SHOW        [ Invalid ]  [ Invalid ]  [ Invalid ]  [ Invalid ]  [  No-Op  ]
```

### Key Properties of the Matrix

1. **Explicit Exhaustiveness:** Every cell represents a deliberate architectural decision. If a cell is blank or unlisted, it defaults to forbidden.
2. **Directionality:** Transitions are one-way unless explicitly configured in both directions. Moving from `SCHEDULED` to `CANCELLED` does not imply moving from `CANCELLED` to `SCHEDULED` is allowed.
3. **Terminal States (Sinks):** States like `COMPLETED`, `CANCELLED`, or `ARCHIVED` have no outgoing valid transitions. Their rows contain only forbidden cells.
4. **Idempotency Policy:** The diagonal cells (`Current === Target`) define whether requesting the current status is treated as a safe no-op or a rejected error.

---

## Code Implementation Patterns

### 1. The Adjacency Map / Set Pattern

The most common in-memory representation in backend services is an adjacency map where each current status maps to a `Set` of allowed target statuses:

```ts
export enum AppointmentStatus {
  SCHEDULED = 'SCHEDULED',
  CONFIRMED = 'CONFIRMED',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
  NO_SHOW = 'NO_SHOW',
}

/**
 * Status-Transition Matrix represented as an adjacency lookup map.
 */
export const ALLOWED_STATUS_TRANSITIONS: Readonly<
  Record<AppointmentStatus, ReadonlySet<AppointmentStatus>>
> = {
  [AppointmentStatus.SCHEDULED]: new Set([
    AppointmentStatus.CONFIRMED,
    AppointmentStatus.CANCELLED,
    AppointmentStatus.NO_SHOW,
  ]),
  [AppointmentStatus.CONFIRMED]: new Set([
    AppointmentStatus.COMPLETED,
    AppointmentStatus.CANCELLED,
    AppointmentStatus.NO_SHOW,
  ]),
  [AppointmentStatus.COMPLETED]: new Set(), // Terminal state
  [AppointmentStatus.CANCELLED]: new Set(), // Terminal state
  [AppointmentStatus.NO_SHOW]: new Set(),   // Terminal state
};

export function canTransitionStatus(
  currentStatus: AppointmentStatus,
  targetStatus: AppointmentStatus,
): boolean {
  if (currentStatus === targetStatus) {
    return true; // Idempotent no-op
  }
  return ALLOWED_STATUS_TRANSITIONS[currentStatus]?.has(targetStatus) ?? false;
}
```

### 2. Guarded / Event-Driven State Machine

When status changes depend on external events, user roles, or validation guards, the matrix maps `(Current Status, Event)` pairs to transition definitions:

```ts
interface TransitionRule<TStatus, TEvent, TContext> {
  target: TStatus;
  guard?: (context: TContext) => boolean;
  action?: (context: TContext) => Promise<void>;
}

type TransitionMatrix<TStatus extends string, TEvent extends string, TContext> = {
  [S in TStatus]?: {
    [E in TEvent]?: TransitionRule<TStatus, TEvent, TContext>;
  };
};
```

---

## Why Use a Matrix Instead of Ad-Hoc Conditionals

| Approach | How it Works | Failure Mode / Trade-off |
| --- | --- | --- |
| **Ad-Hoc `if/else` Statements** | Logic scattered across controller endpoints, services, or repository methods. | Hard to audit, easy to miss illegal transitions, rules get duplicated or drift out of sync across endpoints. |
| **Status-Transition Matrix** | Single centralized table or dictionary defining all valid state movements. | Single source of truth, easy to audit with domain experts, centralized error reporting (`InvalidTransitionException`). |
| **Formal State Machine Engine** | Full external framework managing state, events, history, and parallel states. | Robust for complex workflows, but introduces extra abstraction overhead for simple status lifecycles. |

---

## Testing with a Transition Matrix

A status-transition matrix serves as an automated test matrix for complete behavioral coverage:

1. **Positive Tests (Valid Transitions):**
   - Iterate over every valid transition defined in the matrix and assert that the service successfully updates the entity and applies required side effects.
2. **Negative Tests (Invalid Transitions):**
   - Iterate over all disallowed cells in the $N \times N$ grid and assert that attempting the transition throws an expected domain error (e.g. `ConflictException` / `409 Conflict` or `BadRequestException` / `400 Bad Request`) without mutating database state.
3. **Guard Verification:**
   - For conditional cells, assert rejection when the guard is falsy and success when the guard is satisfied.

---

## Related Terms

- **Finite State Machine (FSM):** the computational model consisting of a finite number of states, inputs/events, and transitions between them. The matrix is a direct tabular representation of the FSM's transition function $\delta(S, E) \to S'$.
- **State Transition Graph / Diagram:** a visual directed graph where nodes represent statuses and arrows represent allowed transitions.
- **Guard Condition:** a boolean predicate that must evaluate to true before a transition is executed.
- **Terminal State:** a status with no outgoing transitions (e.g. `CANCELLED`, `COMPLETED`).
- **State Invariant:** a condition that must remain true while an entity is in a given status.

---

## Key Takeaways

- A status-transition matrix formalizes which status changes are legal and which are forbidden across an entity's lifecycle.
- Representing transitions as a matrix or lookup map centralizes business logic, eliminating fragmented procedural checks.
- Cells that are not explicitly allowed are treated as forbidden by default (fail-safe).
- The matrix directly maps to positive and negative unit test suites, guaranteeing exhaustive coverage of lifecycle transitions.

---

## Related Concepts

- [Software Engineering Terminology](./)
- [Mechanism](mechanism.md)
- [Pattern](pattern.md)
- [Atomicity](atomicity.md)
