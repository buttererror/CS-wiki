# Sum Types and Unions

**Keywords:** sum type, sum types, product type, product types, union, union type,
tagged union, discriminated union, disjoint union, coproduct, untagged union,
algebraic data type, ADT, variant, C union, Rust enum, TypeScript union,
pattern matching

## Purpose

A **sum type** (or **union**) is a composite data type representing a value that
can hold **one of several distinct types or variants**, but only **one at any
given time**. It models a logical **OR**.

In contrast, a **product type** (such as a `struct`, `record`, or `tuple`)
combines multiple values simultaneously, modeling a logical **AND**.

```text
Product type (A AND B) → Holds value of A AND value of B
Sum type     (A OR B)  → Holds value of A OR value of B (never both)
```

## Classification and Scope

The primary field is **Programming Languages** within **Type Systems**.
It directly connects to:

- **Type Theory and Abstract Algebra**, where sum types correspond to coproducts
  or disjoint unions in Algebraic Data Types (ADTs);
- **Systems Programming**, where low-level unions map multiple fields to the
  same memory location for space efficiency;
- **High-Level Application Design**, where tagged and discriminated unions make
  invalid application states unrepresentable; and
- **Runtime Validation**, where untyped external boundaries require schema
  disjunctions to validate and normalize heterogeneous inputs.

## State Space: Product Types vs. Sum Types

The naming originates from the size of their state space (the number of possible
values the composite type can represent):

| Type Category | Construct Examples | Logical Connective | Possible States (Cardinality) |
| :--- | :--- | :--- | :--- |
| **Product Type** | `struct`, `tuple`, `record` | **AND** | $|A| \times |B|$ |
| **Sum Type** | `union`, `enum`, `A \| B` | **OR** | $|A| + |B|$ |

### Making Illegal States Unrepresentable

A common anti-pattern in product-type modeling is using optional or nullable
fields to represent mutually exclusive states:

```typescript
// Product type with optional fields (Anti-pattern)
interface ApiResponse {
  data?: UserProfile;
  error?: NetworkError;
  isLoading: boolean;
}
```

This product type permits $2 \times 2 \times 2 = 8$ conceptual combinations,
including invalid states such as `{ data: UserProfile, error: NetworkError }`
or `{ isLoading: true, data: UserProfile }`.

Using a sum type (discriminated union) collapses the state space strictly to the
valid possibilities:

```typescript
// Sum type (Discriminated Union)
type ApiResponse =
  | { status: 'loading' }
  | { status: 'success'; data: UserProfile }
  | { status: 'error'; error: NetworkError };
```

Here, the state space is $1 + 1 + 1 = 3$. Illegal combinations cannot be
constructed or typed.

## The Three Structural Paradigms

Languages implement unions in three fundamentally different ways based on their
runtime memory models and type-system goals:

```text
               Unions in Programming
                         │
     ┌───────────────────┼───────────────────┐
     ▼                   ▼                   ▼
Memory-Level         Tagged /             Set-Theoretic /
(Untagged)         Discriminated            Type-Level
 C / C++            Rust / Swift        TypeScript / Python
Shared buffer       Tag + Payload        Set membership
```

### 1. Memory-Level / Untagged Unions (C / C++)

In systems programming, a union is a memory-allocation technique where all
declared fields share the **exact same memory address**:

```c
union Measurement {
    int integer_val;    // 4 bytes
    float float_val;    // 4 bytes
    char buffer[8];     // 8 bytes
};
```

- **Memory layout:** The total size of the union equals the size of its largest
  member (here, 8 bytes).
- **Absence of tag:** The compiled program stores only the raw bytes. The
  runtime has no metadata indicating which member was last written.
- **Risk:** Reading a member different from the one written reinterprets the raw
  bit pattern (known as *type punning*), which can cause undefined behavior or
  hardware faults.

### 2. Tagged / Discriminated Unions (Rust, Swift, ML, Haskell)

To make unions type-safe, languages bundle the data payload with a hidden or
explicit **tag** (also called a *discriminant*):

```rust
// Rust enum is a first-class tagged union
enum WebEvent {
    PageLoad,
    KeyPress(char),
    Click { x: i64, y: i64 },
}
```

- **Safety guarantee:** The compiler ensures memory safety by requiring
  exhaustive pattern matching (`match`). Code cannot access `Click` coordinates
  unless the tag confirms the variant is indeed `Click`.
- **Memory footprint:** Size of the largest payload plus the discriminant tag
  and required alignment padding.

In TypeScript, tagged unions are achieved structurally using a shared literal
property (often named `kind`, `type`, or `status`):

```typescript
type Action =
  | { type: 'INCREMENT'; amount: number }
  | { type: 'RESET' };
```

### 3. Set-Theoretic / Type-Level Unions (TypeScript, Python)

Gradually typed and statically checked dynamic languages treat types as sets of
values. A union $A \mid B$ represents the mathematical union of two sets:

```typescript
// TypeScript set-theoretic union
type Identifier = string | number;
```

- **Narrowing:** The compiler refines the broad union into a specific member
  through control flow analysis when conditional statements (such as `typeof`,
  `instanceof`, or custom type predicates) inspect runtime values.
- **Erasure:** At runtime, type annotations disappear completely; only the
  underlying primitive JavaScript values remain.

## Exhaustiveness and Pattern Matching

Languages with first-class sum types enforce **exhaustiveness checking**: every
possible variant must be handled when branching on a union.

```rust
// Rust compiler verifies all variants are covered
match event {
    WebEvent::PageLoad => handle_load(),
    WebEvent::KeyPress(c) => handle_key(c),
    WebEvent::Click { x, y } => handle_click(x, y),
}
```

In TypeScript, exhaustiveness is commonly enforced using the `never` type:

```typescript
function handleAction(action: Action) {
  switch (action.type) {
    case 'INCREMENT':
      return action.amount;
    case 'RESET':
      return 0;
    default: {
      const _exhaustiveCheck: never = action;
      return _exhaustiveCheck;
    }
  }
}
```

If a new variant is later added to `Action`, the `default` branch fails
compilation because the unhandled variant is not assignable to `never`.

## Runtime Boundaries and Validation

While compile-time sum types guarantee safety within internal application code,
external boundaries (HTTP request query parameters, URL search params, form
data, environment variables) receive serialized strings or loose dynamic payloads.

At runtime boundaries, schemas use union disjunctions (such as Zod's `z.union`)
to validate multi-format inputs (e.g. parsing both native `boolean` and string
`'true' | 'false' | ''`) and normalize them via transformations before passing
them into business logic.

## Related Concepts

- [Type Systems](type-systems.md)
- [Narrowing](../software-engineering/terminology/narrowing.md)
- [Collections and Data Structures](../algorithms-and-data-structures/collections.md)
- [Software Design Principles](../../../dev-learning-log/foundations/software-design-principles.md)

## Sources

- Pierce, Benjamin C. *Types and Programming Languages* (MIT Press, 2002) — Chapter 11: Simple Extensions (Sum Types).
- [Rust Reference: Enumerations](https://doc.rust-lang.org/reference/items/enumerations.html)
- [TypeScript Handbook: Discriminated Unions](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#discriminated-unions)
