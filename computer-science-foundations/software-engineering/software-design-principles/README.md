# Software Design Principles

## Purpose

Software design principles are broad guidelines for making design decisions. They help developers reason about responsibilities, dependencies, change, and control without prescribing one exact code structure.

## Examples

- [Inversion of Control](inversion-of-control.md) — delegates parts of construction, execution, or lifecycle control to an external mechanism.
- [SOLID Design Principles](solid-principles.md) — five foundational principles (SRP, OCP, LSP, ISP, DIP) for flexible and maintainable object-oriented and modular designs.
- Separation of Concerns — keeps different responsibilities conceptually distinct.
- Modularity — organizes software into focused, replaceable, and understandable parts.
- Information Hiding — conceals design decisions that other parts of the system do not need to know.
- Composition — builds larger behavior by combining smaller parts.

Inversion of Control and SOLID Design Principles currently have dedicated documents in this directory. The remaining examples indicate where future learning notes may belong.

Some principles, including the SOLID principles, were popularized through object-oriented design. Software design principles as a category are not limited to Object-Oriented Programming.

## Relationship to Computer Science

Software design principles belong primarily to software engineering, an applied area of computer science concerned with designing, building, maintaining, and evolving software systems.

```text
Computer Science
        ↓ includes applied fields such as

Software Engineering
        ↓ uses

Software Design Principles
        ↓ guide

Architecture, patterns, APIs, and source code
```

The principles are informed by broader computer-science topics such as abstraction, modularity, information hiding, type systems, algorithms, and complexity. They usually guide engineering judgment rather than define formal algorithms or language semantics.

## Relationship to Programming Paradigms

Design principles and programming paradigms are separate categories. A principle can guide software written in several paradigms.

```text
Software Design Principles
        ↓ can guide

├── Object-Oriented Programming
├── Functional Programming
├── Procedural Programming
└── Reactive Programming
```

For example, Single Responsibility can guide a class, function, module, service, or event handler. Inversion of Control can appear through object construction, higher-order functions, callbacks, event loops, or reactive subscriptions.

## Relationship to Other Software Concepts

| Concept | Relationship to design principles |
| --- | --- |
| Programming paradigm | Shapes how programs are expressed; principles can be applied within multiple paradigms |
| Design pattern | Provides a reusable solution that may embody one or more principles |
| Architectural style or pattern | Applies structural decisions at system scale and may be guided by design principles |
| Framework or library | Provides concrete mechanisms that may apply or enforce principles |
| Implementation | Realizes the selected principles and mechanisms as source code and configuration |

```text
Design principle
        ↓ guides a decision

Pattern or technique
        ↓ provides a reusable approach

Framework or library mechanism
        ↓ provides concrete capabilities

Application implementation
```

These relationships are not strict one-to-one mappings. One principle can guide many patterns, and one pattern can reflect several principles.

## Document Index

- [Inversion of Control](inversion-of-control.md)
- [SOLID Design Principles](solid-principles.md)

## Related Concepts

- [Software Engineering Foundations](../)
- [Software Taxonomy](../software-taxonomy.md)
- [Design Patterns](../design-patterns/)
- [Software Architecture](../software-architecture.md)
- [Frameworks, Libraries, and Tooling](../../../framework-tooling/)
- [Software Engineering Terminology](../terminology/)
