# JavaScript

**Reading status:** Not read yet

## Scope & Architectural Distinction

JavaScript is a programming language with its own syntax, type system, execution contexts, lexical environments, memory model, object system, and prototype delegation rules.

It is distinct from the **host environments** that execute it:

| Layer | Responsibility | Examples |
| :--- | :--- | :--- |
| **Language & Runtime Model** (`programming-languages/javascript/`) | Pure language semantics, memory references, execution contexts, lexical scoping, closures, prototype delegation, and `this` binding. | Objects, Arrays, Functions, Promises, `[[Prototype]]`, `Object.defineProperty`, `try/catch`. |
| **Host Environment / Web Platform** (`frontend-development/`) | Platform APIs, UI layout engines, and I/O subsystems provided by the host. | DOM (`document`, `<dialog>`), CSSOM, Web Storage, `fetch`, Timers (`setTimeout`), WebSockets. |

These core language rules apply consistently across all JavaScript host environments, whether running in web browsers, Node.js, Deno, Bun, or edge serverless runtimes.

## Reading Path

1. [Hoisting and Binding Initialization](hoisting.md)
2. [JavaScript Functions & this Binding](functions.md)
3. [JavaScript Closures & Lexical Scope](closures.md)
4. [JavaScript Objects & Property Descriptors](objects.md)
5. [JavaScript Prototypes & The Prototype Chain](prototypes.md)
6. [JavaScript Prototypal vs. Classical Inheritance](inheritance.md)
7. [JavaScript `Set`, `Map`, and `Object`](set-map-and-object.md)

## Document Index

- [Hoisting and Binding Initialization](hoisting.md) — declaration processing, initialization timing, and the temporal dead zone.
- [JavaScript Functions & this Binding](functions.md) — function objects, declarations, expressions, arrow functions, dynamic `this` call-site binding vs. lexical `this`.
- [JavaScript Closures & Lexical Scope](closures.md) — lexical environments, environment records, outer scope retention, and memory/garbage-collection considerations.
- [JavaScript Objects & Property Descriptors](objects.md) — data vs. accessor properties, descriptors (`writable`, `enumerable`, `configurable`), and `Object.create`.
- [JavaScript Prototypes & The Prototype Chain](prototypes.md) — `[[Prototype]]` internal engine slot vs. `.prototype` property vs. `__proto__`, prototype lookup chain, and runtime monkey patching.
- [JavaScript Prototypal vs. Classical Inheritance](inheritance.md) — object-to-object delegation vs. compiled class blueprints, `class`/`extends` syntactic sugar, and comparative analysis (JS vs. Java/C#).
- [JavaScript `Set`, `Map`, and `Object`](set-map-and-object.md) — choosing between structured records, keyed collections, and unique-value collections.
- [Functions, Closures, and Identity](functions-closures-and-identity.md) — overview of function reference equality and React framework interaction.

## Neighboring Areas

- [Programming Languages](../)
- [Object-Oriented Programming](../../software-engineering/programming-paradigms/object-oriented-programming.md)
- [SOLID Design Principles](../../software-engineering/software-design-principles/solid-principles.md)
- [Patching Terminology](../../software-engineering/terminology/patching.md)
- [Browser Runtime](../../../frontend-development/browser-runtime/)
- [React Rendering Model](../../../framework-tooling/frontend/react/rendering-model.md)
- [React State and Updates](../../../framework-tooling/frontend/react/state-and-updates.md)
- [React Function Identity and Closures](../../../framework-tooling/frontend/react/function-identity-and-closures.md)

## Legacy Notes

The older [JavaScript notes](../../../miscellaneous/JavaScript-notes.md) remain in the review inbox because they combine unrelated language notes. This directory is the canonical home for reviewed JavaScript explanations.
