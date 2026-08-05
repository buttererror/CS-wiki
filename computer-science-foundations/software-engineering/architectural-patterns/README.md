# Architectural Patterns

## Purpose

This document defines architectural patterns and acts as the index for architecture-level patterns in this knowledge base.

---

## Definition

An Architectural Pattern is a reusable solution to a recurring architecture-level problem in a particular context.

It describes:

- The recurring problem.
- The architectural context.
- Important forces and trade-offs.
- A reusable solution structure.

It answers:

> How can a recurring architecture-level problem be solved?

---

## Architectural Pattern vs. Architectural Style

```text
Architectural Style
→ broad organizational principles and constraints

Architectural Pattern
→ recurring architecture problem and reusable solution
```

| Architectural Style | Architectural Pattern |
| --- | --- |
| Influences the overall character of a system | Addresses a recurring architecture-level problem |
| Example: Microservice Architecture | Example: API Gateway |
| Example: Event-Driven Architecture | Example: Saga |

The terminology overlaps in software literature. This index records the primary classification used by this knowledge base.

---

## Pattern Index

```text
Architectural Patterns
├── MVC
├── CQRS
├── API Gateway
├── Saga
└── Event Sourcing
```

Detailed files will be added when each pattern is discussed. Listing a pattern here does not mean its learning document already exists.

### MVC

Model–View–Controller separates application concerns into model, view, and controller responsibilities.

Primary classification in this knowledge base:

```text
MVC
→ architectural pattern
```

### CQRS

Command Query Responsibility Segregation separates models or paths used for changing state from those used for reading state.

Primary classification:

```text
CQRS
→ architectural pattern
```

### API Gateway

API Gateway provides a single external entry point that routes or composes requests for internal services.

### Saga

Saga coordinates a distributed business transaction through a sequence of local transactions and compensating actions.

### Event Sourcing

Event Sourcing stores state changes as a sequence of events from which current state can be derived.

---

## Classification Note

Different sources may call MVC, CQRS, Hexagonal Architecture, Microservices, or Event-Driven Architecture either styles or patterns.

For navigation, this knowledge base currently uses:

```text
Architectural Styles
├── Client–Server
├── Layered Architecture
├── Microservice Architecture
├── Event-Driven Architecture
└── Hexagonal Architecture

Architectural Patterns
├── MVC
├── CQRS
├── API Gateway
├── Saga
└── Event Sourcing
```

---

## Related Concepts

- [Software Engineering Foundations](../README.md)
- [Software Architecture](../software-architecture.md)
- [Software Taxonomy](../software-taxonomy.md)
- [Architectural Styles](../architectural-styles/README.md)
- [Communication Patterns](../communication-patterns/README.md)
