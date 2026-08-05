# Pattern

## Purpose

This document defines how the term **pattern** is used across the knowledge base and distinguishes a pattern from a principle, style, mechanism, and concrete implementation.

---

## Definition

A software pattern is a named, reusable description of a recurring arrangement, interaction, or solution within a particular context.

It answers a question such as:

> What reusable approach can address or describe this recurring concern?

A pattern captures transferable knowledge. It is not finished source code, a mandatory recipe, or one technology-specific implementation.

---

## Common Elements

A pattern commonly describes some combination of:

- The context in which it appears.
- A recurring problem, concern, or interaction.
- The participants and their responsibilities.
- A reusable structure or communication model.
- Important consequences and trade-offs.

Not every source documents these elements with the same formality. For example, a GoF design pattern is commonly presented as a problem-and-solution structure, while a communication pattern may emphasize how information flows between participants.

---

## Pattern Categories in This Wiki

```text
Software Patterns
│
├── Design Pattern
│   └── recurring object- or component-level collaboration
│
├── Communication Pattern
│   └── recurring information-flow relationship
│
└── Architectural Pattern
    └── recurring architecture-level problem and solution
```

Examples include:

| Category | Example | Primary concern |
| --- | --- | --- |
| Design Pattern | Observer | Notifying interested objects about change |
| Communication Pattern | Publish / Subscribe | Distributing information without direct publisher-subscriber knowledge |
| Architectural Pattern | API Gateway | Providing a unified external entry point to internal services |

The categories describe different scopes. Their boundaries may overlap depending on how a source frames a concept.

---

## Pattern Versus Principle

```text
Principle
→ broad guideline for making decisions

Pattern
→ reusable approach to a recurring concern in context
```

One pattern can embody several principles, and one principle can guide many patterns.

---

## Pattern Versus Style

```text
Style
→ broad principles and constraints that shape overall character

Pattern
→ recurring concern and reusable response or interaction
```

An architectural style commonly influences a large part of a system, while an architectural pattern may solve one recurring problem within that system.

```text
Microservice Architecture
→ architectural style

API Gateway
→ architectural pattern that may be used within it
```

Software literature does not use these labels consistently. This wiki assigns one primary classification for navigation while acknowledging reasonable alternatives.

---

## Pattern Versus Mechanism and Implementation

```text
Pattern
→ describes a reusable approach or relationship

Mechanism
→ describes the process that enables the behavior

Implementation
→ provides the concrete code and configuration
```

Example:

```text
Publish / Subscribe
→ communication pattern

Topic subscription and message distribution
→ communication mechanism

Kafka producer, topic, and consumer configuration
→ concrete implementation
```

---

## Key Takeaways

- A pattern captures reusable knowledge about a recurring concern.
- A pattern is contextual rather than a universal prescription.
- Patterns can describe object collaboration, communication, or architecture-level solutions.
- A pattern is not the same as a principle, style, mechanism, technology, or implementation.
- Pattern classifications may vary across software literature.

---

## Related Concepts

- [Software Engineering Terminology](README.md)
- [Style](style.md)
- [Mechanism](mechanism.md)
- [Software Taxonomy](../software-taxonomy.md)
- [Design Patterns](../design-patterns/README.md)
- [Communication Patterns](../communication-patterns/README.md)
- [Architectural Patterns](../architectural-patterns/README.md)
