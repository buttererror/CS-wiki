# SOLID Design Principles

**Keywords:** SOLID principles, software design principles, single responsibility principle, open-closed principle, liskov substitution principle, interface segregation principle, dependency inversion principle, SRP, OCP, LSP, ISP, DIP, object-oriented design

## Purpose

The **SOLID principles** are five foundational object-oriented design principles intended to make software designs more understandable, flexible, maintainable, and resilient to change.

Popularized by Robert C. Martin ("Uncle Bob"), these principles guide the decomposition of responsibilities, dependency structures, and abstraction boundaries.

---

## The Five Principles Overview

```text
SOLID
├── S — Single Responsibility Principle (SRP)
├── O — Open/Closed Principle (OCP)
├── L — Liskov Substitution Principle (LSP)
├── I — Interface Segregation Principle (ISP)
└── D — Dependency Inversion Principle (DIP)
```

---

## 1. Single Responsibility Principle (SRP)

> *"A class or module should have one, and only one, reason to change."*

- **Meaning:** Each software module should be responsible to one, and only one, actor or business domain responsibility.
- **Problem it prevents:** Co-locating business calculation logic, database persistence, and presentation formatting into one massive class (God Object). When persistence requirements change, business calculation code risks regression.
- **Application:** Separate calculation policies, persistence adapters, and transport serialization into distinct units.

---

## 2. Open/Closed Principle (OCP)

> *"Software entities (classes, modules, functions) should be open for extension, but closed for modification."*

- **Meaning:** You should be able to extend a module's behavior without modifying its existing, tested source code.
- **Problem it prevents:** Adding a new feature by editing complex existing `switch` or `if/else` statements across the codebase, risking breaking existing behavior.
- **Mechanism:** Polymorphism, strategy patterns, plugins, or dependency injection. New behavior is introduced by creating a new class implementing an established interface rather than rewriting existing handlers.

---

## 3. Liskov Substitution Principle (LSP)

> *"Subtypes must be substitutable for their base types without altering the correctness of the program."*

- **Meaning:** If program $S$ is a subtype of $T$, objects of type $T$ may be replaced with objects of type $S$ without altering any desirable properties of the program.
- **Key Rules:**
  - Preconditions cannot be strengthened in a subtype (a derived class cannot demand more restrictive input constraints than the parent).
  - Postconditions cannot be weakened in a subtype (a derived class cannot guarantee less than the parent).
  - Invariants of the supertype must be preserved.
- **Classic Violation:** A `Square` class inheriting from `Rectangle`. Setting `width` independently breaks the geometric assumptions expected by clients of `Rectangle`.

---

## 4. Interface Segregation Principle (ISP)

> *"Clients should not be forced to depend upon interfaces they do not use."*

- **Meaning:** Prefer many small, focused client-specific interfaces over one large, general-purpose "fat" interface.
- **Problem it prevents:** An interface with 20 methods where a consumer only needs 2 methods, yet is forced to implement or recompile whenever any of the other 18 unused methods change.
- **Application:** Break interfaces into granular contracts (e.g., `Readable`, `Writable`, `Closeable` rather than one monolithic `FileStreamManager`).

---

## 5. Dependency Inversion Principle (DIP)

> *1. "High-level modules should not depend on low-level modules. Both should depend on abstractions."*  
> *2. "Abstractions should not depend on details. Details should depend on abstractions."*

- **Meaning:** High-level business policy (e.g., `PatientRegistrationService`) should not directly instantiate or depend on low-level I/O mechanisms (e.g., `PostgreSqlDatabaseDriver`). Instead, the service depends on an abstract repository interface, and the concrete database driver implements that interface.
- **Distinction:**
  - **DIP (Principle):** High-level policy depends on abstractions, inverting traditional procedural control dependencies.
  - **IoC (Mechanism/Pattern):** Delegating the flow of control/lifecycle to an external container or framework.
  - **DI (Technique):** Passing dependencies into a class (via constructor or property) rather than having the class instantiate them.

---

## Summary Matrix

| Principle | Core Question | Primary Design Goal |
| :--- | :--- | :--- |
| **SRP** | Does this module have only one reason to change? | High cohesion; minimal blast radius during changes. |
| **OCP** | Can new features be added without editing existing logic? | Extensibility without regression risk. |
| **LSP** | Can derived classes replace base classes seamlessly? | Behavioral consistency and reliable polymorphism. |
| **ISP** | Are interfaces minimal and focused on client needs? | Decoupled consumers; zero unused method baggage. |
| **DIP** | Do high-level policies depend on abstractions? | Decoupled business logic from I/O mechanisms. |

---

## Related Concepts

- [Software Design Principles](README.md)
- [Inversion of Control](inversion-of-control.md)
- [Object-Oriented Programming](../programming-paradigms/object-oriented-programming.md)
- [Design Patterns](../design-patterns/)
