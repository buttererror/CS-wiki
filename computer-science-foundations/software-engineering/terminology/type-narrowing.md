# Type Narrowing

**Keywords:** type narrowing, narrowing, type guard, discriminated union, type predicate, scope narrowing, control flow analysis

## Purpose

This document defines **type narrowing** as a core static type system and control-flow analysis concept used across languages like TypeScript, Rust, Kotlin, Swift, and Java.

---

## Definition

**Type narrowing** is the process where a compiler or static analyzer refines a broad or union type into a more specific, precise type based on runtime conditional checks and control flow analysis.

It answers the question:

> How does the type system prove that a value belongs to a specific subtype or variant within a conditional block of code?

Rather than requiring explicit type casting, type narrowing allows the compiler to automatically verify safety rules within branches where runtime checks guarantee a value's shape.

---

## Key Mechanisms for Type Narrowing

1. **Control Flow Analysis & Built-in Type Guards**
   - Conditionals using operators like `typeof`, `instanceof`, `== null`, or `in`.
   - *Example:* Checking `typeof x === "string"` narrows `x: string | number` to `string` in the `if` branch.

2. **Discriminated Unions (Tagged Unions)**
   - Objects or data structures that share a common literal discriminator property (e.g., `kind: "circle" | "square"` or `status: "success" | "error"`).
   - Checking the discriminator value narrows the entire object schema within that branch.

3. **Custom Type Predicates**
   - User-defined functions whose return signature informs the compiler of a type assertion (e.g., `function isUser(val: unknown): val is User`).

4. **Exhaustive Control Flow & Assertion Functions**
   - Throwing errors or early returning on unexpected paths allows the compiler to narrow remaining types for the rest of the function scope.

---

## Comparison with Related Concepts

| Concept | Direction / Scope | Meaning & Distinction |
| --- | --- | --- |
| **Type Narrowing** | Broad → Specific | Automatic or guarded refinement of a union/broad type to a specific variant. |
| **Type Widening** | Specific → Broad | Inferring a general type from a literal value (e.g., inferring `"hello"` as `string`). |
| **Type Casting / Assertion** | Unchecked Override | Manually telling the compiler to treat a value as a type without requiring runtime verification. |
| **Scope Narrowing** | Variable Visibility | Restricting variable declarations to the narrowest block or function scope possible to minimize side effects. |

---

## Key Takeaways

- Type narrowing leverages runtime assertions to safely unlock type-specific methods and properties.
- It provides static safety without sacrificing runtime performance, avoiding unchecked type casting.
- Control flow analysis automatically tracks branches, early returns, and switch statements to keep type states synchronized.

---

## Related Concepts

- [Software Engineering Terminology](./)
- [Type Systems](../../programming-languages/type-systems.md)
- [TypeScript Type-System Foundations](../../programming-languages/typescript/type-system.md)
- [Mechanism](mechanism.md)
- [Pattern](pattern.md)
