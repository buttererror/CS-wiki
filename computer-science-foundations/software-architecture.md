# Software Architecture

## Purpose

This document defines the architecture terminology used throughout this knowledge base.

It distinguishes the broad field of System Design & Architecture, an actual software system, its concrete system architecture, reusable architectural styles, architectural patterns, communication patterns, technologies, and implementations.

---

## System Design & Architecture

System Design & Architecture is the broad engineering field concerned with organizing software systems and their components.

It includes decisions about:

- Component and service boundaries.
- Communication paths.
- Data ownership.
- Deployment structure.
- Reliability and scalability.
- Infrastructure and technology choices.

```text
System Design & Architecture
→ broad engineering field
```

---

## Software System

A software system is the actual working product and its supporting infrastructure.

```text
Software System
│
├── Applications
├── Services
├── Databases
├── Messaging infrastructure
├── Deployment environments
└── Runtime interactions
```

For example, Clinic Platform is a software system.

---

## System Architecture

System Architecture is the concrete organization of a particular system.

It answers:

> How is this particular system organized?

```text
System Architecture
│
├── Components and services
├── Communication paths
├── Data ownership
├── Deployment topology
├── Infrastructure
└── Technology choices
```

A clinic system containing an admin frontend, an API, PostgreSQL, authentication boundaries, and specific deployment infrastructure has one concrete system architecture.

---

## Architectural Style

An Architectural Style is a reusable set of principles and constraints for organizing major system components.

It answers:

> What general approach guides the organization of the system?

Examples include:

- Client–Server.
- Layered Architecture.
- Microservice Architecture.
- Event-Driven Architecture.
- Hexagonal Architecture.

```text
Architectural Style
        ↓ guides and constrains

System Architecture
```

One concrete system can combine several styles.

---

## Architectural Pattern

An Architectural Pattern is a reusable solution to a recurring architecture-level problem in a particular context.

It answers:

> How can a recurring architecture-level problem be solved?

Examples commonly classified as architectural patterns include:

- MVC.
- CQRS.
- API Gateway.
- Saga.
- Event Sourcing.

```text
Architectural Pattern
→ recurring problem
→ architectural context and forces
→ reusable solution
```

---

## Architectural Style vs. Architectural Pattern

```text
Architectural Style
→ describes the overall character and constraints
  of a family of architectures

Architectural Pattern
→ describes a recurring problem, its context,
  and a reusable architecture-level solution
```

| Architectural Style | Architectural Pattern |
| --- | --- |
| Provides broad organizational principles | Solves a recurring architecture-level problem |
| Influences the overall system structure | May address one important part of that structure |
| Example: Microservice Architecture | Example: API Gateway |
| Example: Event-Driven Architecture | Example: Saga |

Software literature does not use these terms consistently. Microservices, MVC, Hexagonal Architecture, and Event-Driven Architecture may be called styles or patterns by different sources.

This knowledge base chooses one primary classification for navigation while acknowledging common alternatives.

---

## Communication Pattern

A Communication Pattern describes how participants exchange information.

```text
Publish / Subscribe
→ messaging/communication pattern

Event-Driven Architecture
→ architectural style that may use Publish / Subscribe
```

A communication pattern describes an interaction. It does not by itself determine the architecture of the whole system.

---

## Complete Relationship

```text
System Design & Architecture
→ broad engineering field

Software System
→ actual running product

System Architecture
→ concrete organization of that product
        │
        ├── guided by Architectural Styles
        ├── uses Architectural Patterns
        ├── uses Communication Patterns
        └── realized through technologies
            and concrete implementations
```

---

## Concrete Example

```text
Clinic Platform
→ software system

Admin frontend + API + PostgreSQL + deployment topology
→ concrete system architecture

Client–Server and Layered Architecture
→ architectural styles guiding the system

API Gateway or CQRS
→ architectural patterns the architecture may use

Request / Response or Publish / Subscribe
→ communication patterns

HTTP, PostgreSQL, Kafka, NestJS
→ protocols and technologies

Controllers, routes, topics, schemas, and configuration
→ concrete implementation
```

---

## Comparison

| Term | Represents | Example |
| --- | --- | --- |
| System Design & Architecture | Broad engineering field | Designing distributed software systems |
| Software System | Actual working product | Clinic Platform |
| System Architecture | Concrete organization of one system | Admin, API, database, and their connections |
| Architectural Style | General organizational principles | Microservice Architecture |
| Architectural Pattern | Reusable architecture-level solution | API Gateway |
| Design Pattern | Recurring object or component collaboration | Observer |
| Communication Pattern | Reusable information-flow model | Publish / Subscribe |
| Technology | Tool used to realize the design | Kafka |
| Implementation | Concrete code and configuration | Topics, producers, and consumers |

---

## Styles Can Be Combined

Architectural styles are not necessarily exclusive.

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

## Architecture Does Not Guarantee Scalability

An architectural style or pattern provides structure, not automatic scalability.

```text
Architectural styles and patterns
        ↓
guide system structure

Infrastructure and implementation
        ↓
provide runtime capabilities

Measurement
        ↓
identifies actual bottlenecks
```

Architecture must match the system's workload, team structure, operational capabilities, and consistency requirements.

---

## Key Takeaways

- System Design & Architecture is the broad engineering field.
- A software system is the actual product and its runtime environment.
- System Architecture is the concrete organization of one system.
- Architectural styles provide reusable organizational principles.
- Architectural patterns solve recurring architecture-level problems.
- Communication patterns describe information exchange.
- Technologies and implementations realize the selected architecture.
- The terms style and pattern overlap across sources, so this knowledge base uses one primary classification for navigation.

---

## Related Concepts

- [Software Taxonomy](software-taxonomy.md)
- [Architectural Styles](../architectural-styles/README.md)
- [Architectural Patterns](../architectural-patterns/README.md)
- [Communication Patterns](../communication-patterns/README.md)
