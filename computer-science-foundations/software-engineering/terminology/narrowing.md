# Narrowing

**Keywords:** narrowing, scope narrowing, problem space, bounded context, fault isolation, type narrowing, constraint, boundary, YAGNI, debugging bisect

## Purpose

This document defines **narrowing** as a fundamental software engineering concept applied across system architecture, project delivery, troubleshooting, and type systems.

---

## Definition

In software engineering, **narrowing** is the deliberate process of restricting a broad, complex, or ambiguous domain, requirement, fault space, or data type into a smaller, precise, and well-bounded subset.

It answers the core question:

> How do we reduce complexity and isolate a specific, manageable context from a broader system or problem space?

---

## Narrowing Across Engineering Contexts

Narrowing operates at multiple levels of abstraction across the software lifecycle:

### 1. Problem Space & Requirement Scope Narrowing

When defining features or MVP deliverables, scope narrowing restricts software requirements to the smallest functional slice that yields real user value.

- **Principle:** Aligns with YAGNI (*You Aren't Gonna Need It*) and Lean Development.
- **Goal:** Avoids premature generalization and unnecessary architectural complexity by focusing strictly on known constraints.
- **Reference:** [Lean MVP and Vertical Slices](../../../software-development-practices/lean-mvp-vertical-slice-development.md)

### 2. Architectural & Domain Context Narrowing

In system architecture and Domain-Driven Design (DDD), context narrowing creates explicit boundaries around models, schemas, and ubiquitous language.

- **Mechanism:** Establishing a **Bounded Context** ensures that a concept (e.g., `User` or `Order`) has a single, unambiguous definition within its specific boundary, rather than attempting to maintain one universal entity model across an enterprise.
- **Reference:** [Domain-Driven Design](../../../system-design/software-system-design/domain-driven-design.md)

### 3. Fault Isolation & Debugging Narrowing

In testing, operations, and troubleshooting, narrowing isolates the root cause of a defect by systematically eliminating non-contributing variables or code paths.

- **Techniques:**
  - **Git Bisecting:** Narrowing down the specific commit that introduced a regression via binary search over commit history.
  - **Subsystem Isolation:** Replacing external APIs with mocks or stubs to isolate whether a failure originates in client code, network transport, or backend services.
- **Reference:** [Software Testing](../../../software-development-practices/testing/)

### 4. Language & Type System Narrowing

At the code level, static type checkers apply **type narrowing** via control flow analysis to refine union types (`string | number`) down to specific subtypes (`string`) inside runtime conditional blocks (`typeof`, `instanceof`, or type guards).

- **Benefit:** Eliminates unchecked type casts while providing compile-time type safety.
- **Reference:** [Type Systems](../../programming-languages/type-systems.md) and [TypeScript Type-System Foundations](../../programming-languages/typescript/type-system.md)

---

## Comparison of Narrowing Types

| Aspect | Focus | Primary Mechanism | Key Benefit |
| --- | --- | --- | --- |
| **Scope Narrowing** | Deliverables & Requirements | MVP prioritization & vertical slicing | Faster delivery cycles & reduced waste |
| **Context Narrowing** | System Architecture | DDD Bounded Contexts & explicit domain models | Clear component ownership & decoupled models |
| **Fault Narrowing** | Troubleshooting & QA | Binary search (bisecting), mocks, & error tracebacks | Rapid root cause identification |
| **Type Narrowing** | Code & Compiler Verification | Type guards & control flow analysis | Compile-time safety without runtime overhead |

---

## Key Takeaways

- Narrowing reduces cognitive load and system complexity by setting explicit boundaries.
- At the architectural level, narrowing establishes bounded contexts and decoupled models.
- At the delivery level, narrowing prevents scope creep by delivering minimal vertical slices.
- At the code level, narrowing uses control flow analysis to convert broad types into specific guarantees.

---

## Related Concepts

- [Software Engineering Terminology](./)
- [Caveat](caveat.md)
- [Mechanism](mechanism.md)
- [Pattern](pattern.md)
- [Lean MVP and Vertical Slices](../../../software-development-practices/lean-mvp-vertical-slice-development.md)
- [Domain-Driven Design](../../../system-design/software-system-design/domain-driven-design.md)
- [Type Systems](../../programming-languages/type-systems.md)
