# Software Engineering Foundations

## Purpose

This directory contains the foundational concepts used to reason about software design, communication, architecture, and implementation throughout the knowledge base.

It focuses on transferable concepts rather than one programming language, framework, or product.

## Reading Mindset

The taxonomy is a map, not the territory.

- Categories provide primary labels for learning and navigation.
- Boundaries are useful but contextual rather than universal.
- Software literature may classify the same concept differently depending on scope.
- Relationships are usually optional and many-to-many.
- An arrow such as “may use” does not imply ownership or a required dependency.
- Concrete software commonly combines concepts from several categories.

The wiki chooses one primary location for each document so that the material remains navigable. That organizational choice does not deny alternative classifications or relationships.

## Foundation Map

```text
Software Engineering Foundations
│
├── Ways of expressing software
│   └── Programming Paradigms
│
├── Guidelines for making decisions
│   └── Software Design Principles
│
├── Reusable approaches to recurring problems
│   ├── Design Patterns
│   ├── Communication Patterns
│   └── Architectural Patterns
│
├── Ways of organizing systems
│   └── Architectural Styles
│
├── Shared vocabulary
│   └── Software Engineering Terminology
│
└── Concrete realization
    ├── Frameworks and Libraries
    ├── Technologies and Mechanisms
    └── Application Code and Configuration
```

The final branch links conceptual foundations to concrete engineering work. Frameworks, libraries, and application-specific implementations remain outside this directory because they apply or realize foundational ideas rather than define this foundation.

## Classification and Relationships

Classification asks:

> What kind of concept is this?

Relationships ask:

> How might this concept influence, guide, support, or realize another concept?

These are different views:

```text
Primary categories
├── Paradigm
├── Principle
├── Pattern
├── Architectural Style
├── Framework or Library
└── Implementation

Possible relationships
├── may influence
├── may guide
├── may apply
├── may support
└── may realize
```

A concept does not need to pass through the categories in a fixed order.

## How Concepts Meet in Software

```text
Programming Paradigms ─────┐
                           │
Design Principles ─────────┤
                           │
Patterns ──────────────────┼── may influence or support ──→ Concrete Software
                           │
Architectural Styles ──────┤
                           │
Frameworks and Libraries ──┘
```

For example, a system may combine Object-Oriented and Functional Programming, follow Inversion of Control, use Observer and Request / Response, adopt Layered and Client–Server styles, and use NestJS or TanStack Query. None of those choices automatically requires all the others.

## Document Index

- [Software Taxonomy](software-taxonomy.md) — primary concept categories and the questions they answer.
- [Software Architecture](software-architecture.md) — systems, concrete architectures, architectural styles, and architectural patterns.
- [Programming Paradigms](programming-paradigms/README.md) — fundamental ways of expressing programs.
- [Software Design Principles](software-design-principles/README.md) — broad guidelines for design decisions.
- [Design Patterns](design-patterns/README.md) — reusable object- and component-level design solutions.
- [Communication Patterns](communication-patterns/README.md) — reusable models for exchanging information.
- [Architectural Styles](architectural-styles/README.md) — principles and constraints for organizing systems.
- [Architectural Patterns](architectural-patterns/README.md) — recurring architecture-level solutions.
- [Software Engineering Terminology](terminology/README.md) — contextual definitions for recurring field terms.

## Related Applied Areas

- [System Design](../../system-design/README.md)
- [Software System Design](../../system-design/software-system-design/README.md)
- [Domain-Driven Design](../../system-design/software-system-design/domain-driven-design.md)
- [Software Development Practices](../../software-development-practices/README.md)
- [Frameworks, Libraries, and Tooling](../../framework-tooling/README.md)
- [Security](../../security/README.md)
- [Identity and Access Management](../../security/identity-and-access-management/README.md)
- [Frontend Development](../../frontend-development/README.md)
- [Frontend Frameworks and Tooling](../../framework-tooling/frontend/README.md)
