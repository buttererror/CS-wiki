# Style

## Purpose

This document defines how the term **style** is used across the knowledge base, with Architectural Style as its primary software-engineering example.

---

## Definition

A style is a coherent set of principles and constraints that shapes the overall character of a design.

It answers:

> What general approach should guide and constrain how this design is organized?

A style does not prescribe every component, interaction, or implementation detail. Different designs can follow the same style while making different concrete decisions.

---

## Architectural Style

An Architectural Style applies the idea of style to the major parts of a software system.

```text
Architectural Style
        ↓ guides and constrains

Concrete System Architecture
        ↓ selects

Components, relationships, technologies,
deployment choices, and implementations
```

Examples include:

- Client–Server.
- Layered Architecture.
- Microservice Architecture.
- Event-Driven Architecture.
- Hexagonal Architecture.

One concrete architecture may combine several styles.

```text
Concrete System Architecture
│
├── Client–Server
├── Layered Architecture
└── Event-Driven Architecture
```

---

## Style in Other Contexts

The term is not limited to architecture.

| Context | Meaning |
| --- | --- |
| Programming style | Conventions or preferences for expressing source code |
| API style | General constraints shaping an API, such as resource-oriented interaction |
| Architectural style | Principles and constraints shaping major system organization |
| Visual style | Aesthetic rules shaping presentation |

The surrounding context determines what the style governs.

---

## Style Versus Pattern

| Style | Pattern |
| --- | --- |
| Shapes broad character and organization | Addresses or describes a recurring concern |
| Expresses principles and constraints | Describes participants, relationships, or a reusable solution |
| Often affects much of a design | May address one part of a design |
| Example: Microservice Architecture | Example: API Gateway |

```text
Architectural Style
→ broad organizational character

Architectural Pattern
→ recurring architecture-level concern and reusable response
```

This is a useful distinction, not a universal boundary. Sources may describe Microservices, Event-Driven Architecture, Hexagonal Architecture, MVC, or CQRS differently.

---

## Style Versus Principle

A principle is an individual guideline. A style commonly combines several principles and constraints into a recognizable approach.

```text
Principles and constraints
        ↓ form or support

Style
        ↓ guides

Concrete design
```

Following one principle does not automatically mean that a design adopts an entire style.

---

## Style Versus Implementation

A style describes general organization. An implementation contains the actual components, technologies, source code, and configuration.

```text
Event-Driven Architecture
→ architectural style

Order service, Kafka topics, event schemas,
consumers, retries, and deployment configuration
→ one concrete implementation
```

Many implementations can realize the same style differently.

---

## Key Takeaways

- A style provides broad principles and constraints.
- An Architectural Style shapes the overall organization of a system.
- A style leaves many concrete design and implementation decisions open.
- One system can combine multiple architectural styles.
- Style and pattern are useful but overlapping classifications.

---

## Related Concepts

- [Software Engineering Terminology](./)
- [Pattern](pattern.md)
- [Software Taxonomy](../software-taxonomy.md)
- [Software Architecture](../software-architecture.md)
- [Architectural Styles](../architectural-styles/)
- [Architectural Patterns](../architectural-patterns/)
