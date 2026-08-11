# Type Systems

**Reading status:** Not read yet

## Scope

A **type system** is a language mechanism for describing and checking the kinds
of values and operations a program uses. It gives a program vocabulary for
questions such as “can this operation safely use this value?” before or while
the program runs.

Type systems belong to Programming Languages. They overlap with runtime
validation, but they do not replace it: data arriving from users, networks,
storage, or other processes must still be checked at runtime.

## Static and Dynamic Checking

```text
Static checking
→ analyze program code before execution

Dynamic checking
→ inspect values while the program runs
```

Most languages combine both. A static type checker can reject an invalid call
before execution, while runtime checks handle values that code cannot prove in
advance.

```text
external data → runtime validation → trusted program value
                         ↓
                 static types describe
                 permitted later use
```

Static checks reduce classes of mistakes; they do not guarantee that external
data, network responses, or every program assumption is true at runtime.

## Core Mechanisms

| Mechanism | Purpose |
| --- | --- |
| Type annotation | States an intended type explicitly |
| Type inference | Derives a type from values and context |
| Type checking | Tests whether operations satisfy type rules |
| Type narrowing or refinement | Uses a proven condition to make a type more specific |
| Generic abstraction | Relates types while preserving information across reusable code |
| Type transformation | Derives a new type from an existing type |

Different languages make different trade-offs: nominal versus structural
compatibility, static versus dynamic checking, soundness goals, inference, and
runtime type representation are separate design choices.

## Type Information at Runtime

Some languages retain or reify type information at runtime; others erase most
or all type-only constructs during compilation. That distinction determines
whether a runtime can inspect a generic or annotation directly.

TypeScript is a mostly erased, static type system for JavaScript. Its type
annotations guide development-time checking, but runtime validation remains
necessary at system boundaries.

## Application: TypeScript

- [TypeScript](typescript/)
- [TypeScript Type-System Foundations](typescript/type-system.md)

## Related Concepts

- [Programming Languages](./)
- [JavaScript](javascript/)
- [Browser Runtime](../../frontend-development/browser-runtime/)

## Sources

- [TypeScript: TypeScript for the New Programmer](https://www.typescriptlang.org/docs/handbook/typescript-from-scratch.html)
- [TypeScript: Narrowing](https://www.typescriptlang.org/docs/handbook/2/narrowing.html)
