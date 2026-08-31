# Object-Oriented Programming (OOP)

**Keywords:** object-oriented programming, OOP, programming paradigms, encapsulation, abstraction, inheritance, polymorphism, class-based OOP, prototype-based OOP, composition over inheritance, object model

## Purpose

Object-Oriented Programming (OOP) is a programming paradigm organized around **objects**—data structures encapsulating internal state and behavior (methods). It structures software by modeling domain concepts, managing data mutability, and establishing polymorphic interfaces.

---

## The Four Pillars of OOP

```text
Object-Oriented Programming
├── Encapsulation (Hiding internal state and enforcing boundary access)
├── Abstraction    (Exposing essential behavior while concealing implementation details)
├── Inheritance    (Sharing and extending behavior across types or prototypes)
└── Polymorphism   (Providing a uniform interface for entities of different types)
```

### 1. Encapsulation
Encapsulation bundles data and the functions that manipulate that data into a single unit (an object or class) while restricting direct outside access to internal representations.
- **Mechanism:** Access modifiers (`private`, `protected`, `public`, `#field`), lexical closures, or module boundaries.
- **Benefit:** Prevents external code from mutating internal invariants into invalid states.

### 2. Abstraction
Abstraction exposes high-level capabilities while hiding underlying mechanical complexity.
- **Mechanism:** Abstract classes, interfaces, and public API surfaces.
- **Benefit:** Reduces cognitive load; consumers interact with high-level contracts rather than low-level implementation details.

### 3. Inheritance
Inheritance allows a new object or class to acquire properties and methods from an existing one, enabling code reuse and hierarchical categorization.
- **Class-based Inheritance:** Subclasses inherit structure and methods defined on parent classes.
- **Prototype-based Inheritance:** Objects delegate property lookups live to prototype objects at runtime.

### 4. Polymorphism
Polymorphism ("many forms") enables different underlying data types to respond to the same interface or method call.
- **Subtype Polymorphism:** Subclasses override methods from parent types (e.g., `shape.draw()`).
- **Parametric Polymorphism (Generics):** Functions or types written without regard to specific underlying types.
- **Ad-hoc Polymorphism (Overloading / Duck Typing):** Methods with different implementations based on argument types or shape compatibility.

---

## Two Major OOP Paradigms: Class-Based vs. Prototype-Based

The fundamental distinction in OOP is how objects acquire behavior and relationships:

```text
Class-Based OOP (Java, C#, C++)             Prototype-Based OOP (JavaScript, Self, Lua)
┌──────────────────────────────┐            ┌──────────────────────────────┐
│  Class Blueprint (Compiled)  │            │  Prototype Object (Live RAM) │
└──────────────┬───────────────┘            └──────────────┬───────────────┘
               │ stamps out copies                         │ live delegation link
               ▼                                           ▼
┌──────────────────────────────┐            ┌──────────────────────────────┐
│  Instance Object (Heap Data) │            │  Instance Object (Light Data)│
└──────────────────────────────┘            └──────────────────────────────┘
```

| Dimension | Class-Based OOP (e.g., Java, C#) | Prototype-Based OOP (e.g., JavaScript) |
| :--- | :--- | :--- |
| **Fundamental Unit** | The **Class** is the primary blueprint; objects are instances. | The **Object** is the fundamental unit; prototypes are also objects. |
| **Object Creation** | Instantiation stamps out an instance conforming to class layout. | Creation links a new object's `[[Prototype]]` to an existing object. |
| **Inheritance Model** | **Copy/Structure:** Hierarchy is fixed at compile time. | **Delegation:** Unfound properties dynamically traverse the prototype chain at runtime. |
| **Runtime Mutability** | Class definitions are rigid and immutable after compilation. | Prototype objects can be modified, extended, or patched dynamically during execution. |

---

## Composition Over Inheritance

A foundational principle in object-oriented design is **favoring object composition over class inheritance**.

- **Inheritance ("is-a" relationship):** Creates tight coupling between base and derived classes. Changes to a base class cascade unexpectedly down deep hierarchies (the *fragile base class problem*).
- **Composition ("has-a" relationship):** Builds complex behavior by assembling independent, focused objects. Components can be swapped or mocked easily at runtime.

---

## Related Concepts

- [Programming Paradigms](README.md)
- [Programming Paradigm Foundations](programming-paradigm.md)
- [SOLID Design Principles](../software-design-principles/solid-principles.md)
- [JavaScript Inheritance](../../programming-languages/javascript/inheritance.md)
- [JavaScript Prototypes](../../programming-languages/javascript/prototypes.md)
