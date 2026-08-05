# Architectural Styles

## Purpose

This document defines architectural styles and acts as the index for style-specific documents in this knowledge base.

Broader distinctions among software systems, system architecture, architectural styles, and architectural patterns belong in the [Software Architecture foundation](../software-architecture.md).

---

## Definition

An Architectural Style is a reusable set of principles and constraints for organizing major system components.

It answers:

> What general approach guides the organization of the system?

```text
Architectural Style
        ↓ guides and constrains

Concrete System Architecture
```

---

## Style Hierarchy

```text
Architectural Styles
├── Client–Server
├── Layered Architecture
├── Microservice Architecture
├── Event-Driven Architecture
└── Hexagonal Architecture
```

This hierarchy records the primary classifications used for navigation in this knowledge base.

---

## Styles Can Be Combined

Architectural styles are not necessarily exclusive. One concrete system may combine several styles.

```text
Concrete System Architecture
│
├── Client–Server
│   └── frontend communicates with an API
│
├── Layered Architecture
│   └── API separates controllers, services, and persistence
│
├── Microservice Architecture
│   └── capabilities are independently deployable
│
└── Event-Driven Architecture
    └── components coordinate through events
```

---

## Style Index

- [Event-Driven Architecture](event-driven-architecture.md)
- [Microservice Architecture](microservice-architecture.md)

Detailed documents for Client–Server, Layered Architecture, and Hexagonal Architecture can be added when those styles are discussed.

---

## Architectural Style vs. Communication Pattern

A style organizes major system components. A communication pattern describes how participants exchange information.

```text
Event-Driven Architecture
→ architectural style

Publish / Subscribe
→ messaging/communication pattern that may support it
```

---

## Classification Note

Architectural style and architectural pattern are overlapping terms in software literature.

This folder contains only concepts whose primary classification in this knowledge base is **Architectural Style**. Concepts classified primarily as architectural patterns belong in the [Architectural Patterns index](../architectural-patterns/README.md).

---

## Related Concepts

- [Software Engineering Foundations](../README.md)
- [Software Architecture](../software-architecture.md)
- [Software Taxonomy](../software-taxonomy.md)
- [Architectural Patterns](../architectural-patterns/README.md)
- [Communication Patterns](../communication-patterns/README.md)
