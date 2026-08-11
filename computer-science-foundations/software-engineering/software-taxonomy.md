# Software Taxonomy

## Purpose

This document defines the primary software-concept categories used throughout the knowledge base.

Many concepts appear related because they influence the same software, but they answer different questions or operate at different scopes. Distinguishing them prevents concepts such as programming paradigms, design principles, patterns, architectures, frameworks, and implementations from being treated as interchangeable.

The taxonomy is a navigation model rather than a complete or rigid ontology. Categories may overlap, classifications may vary across sources, and relationships between categories are generally optional and many-to-many.

---

## Primary Software Concept Categories

```text
Software Engineering Concepts
│
├── Programming Paradigm
├── Software Design Principle
├── Design Pattern
├── Communication Pattern
│   ├── Direct Communication Pattern
│   │   └── Request / Response
│   └── Messaging Pattern
│       ├── Point-to-Point Messaging
│       ├── Publish / Subscribe
│       └── Event Streaming
├── Architectural Style
├── Architectural Pattern
├── Framework
├── Library
└── Implementation
```

This view shows the primary categories used for navigation. Most entries are siblings rather than required stages in a process. The nested communication branches show one local subtype relationship; they do not turn the entire taxonomy into a strict hierarchy.

Messaging patterns are treated as a subtype of communication patterns. Communication mechanisms do not appear as another subtype because they describe how patterns are operationally realized rather than identify another primary category.

The direct and messaging branches are a learning model rather than rigid boundaries. For example, asynchronous Request / Reply may use messaging infrastructure.

Each category answers a different question.

---

## Programming Paradigm

### Definition

A programming paradigm is a fundamental style of expressing programs.

It shapes how developers think about solving problems and organizing code.

A paradigm is broad and influences the structure of an entire program rather than solving one isolated problem.

### Examples

- Object-Oriented Programming (OOP)
- Functional Programming (FP)
- Reactive Programming
- Procedural Programming
- Logic Programming

### Answers

> How should software be written?

---

## Software Design Principle

### Definition

A software design principle is a broad guideline for making decisions about responsibilities, dependencies, change, and control.

Unlike a design pattern, a principle does not prescribe a recurring structure or collaboration. A pattern or technique may apply one or more principles.

### Examples

- Inversion of Control
- Separation of Concerns
- Dependency Inversion Principle
- Single Responsibility Principle

### Answers

> What general guideline should inform this design decision?

---

## Design Pattern

### Definition

A design pattern is a proven, reusable solution to a recurring software design problem.

A pattern does not define an entire application.
Instead, it describes how a small group of objects or components should collaborate.

### Examples

- Observer
- Factory
- Strategy
- Singleton
- Decorator (GoF)
- Adapter

### Answers

> How should several objects collaborate to solve a recurring problem?

---

## Communication Pattern

### Definition

A communication pattern defines how information flows between independent participants.

These patterns focus on communication rather than object design. Messaging patterns are a subtype concerned specifically with exchanging messages.

They are frequently used in distributed systems but may also appear inside a single application.

### Examples

- Request / Response
- Point-to-Point Messaging
- Publish / Subscribe
- Event Streaming
- Competing Consumers
- Event Notification

### Answers

> How should independent participants exchange information?

---

## Architectural Style

### Definition

An architectural style describes how the major parts of an application or system are organized and communicate.

Architectures operate at a much larger scale than design patterns.

An architecture often combines many design patterns and communication mechanisms.

### Examples

- Layered Architecture
- Client–Server
- Event-Driven Architecture
- Microservices
- Hexagonal Architecture

### Answers

> How should an entire system be organized?

---

## Architectural Pattern

### Definition

An architectural pattern is a reusable solution to a recurring architecture-level problem in a particular context.

Architectural patterns operate at a larger scope than object-level design patterns, but they may address a more specific problem than an architectural style.

### Examples

- MVC
- CQRS
- API Gateway
- Saga
- Event Sourcing

### Answers

> How can a recurring architecture-level problem be solved?

The distinction between architectural style and architectural pattern varies across software literature. This knowledge base uses one primary classification for navigation while acknowledging common alternatives.

---

## Framework

### Definition

A framework is an implementation that provides reusable infrastructure and enforces an application structure.

Frameworks often implement multiple design patterns and architectural ideas.

### Examples

- NestJS
- Angular
- Spring Boot

### Answers

> What infrastructure helps implement an application?

---

## Library

### Definition

A library provides reusable functionality that applications call when needed.

Unlike frameworks, libraries generally do not control the application's execution flow.

### Examples

- TanStack Query
- React
- RxJS
- Lodash
- Axios

### Answers

> What reusable functionality can my application use?

---

## Implementation

### Definition

Implementation is the concrete source code that realizes paradigms, patterns, and architectures.

Different implementations may realize the same pattern differently.

### Examples

Observer Pattern:

```ts
subject.subscribe(listener)

subject.notify()
```

Dependency Injection:

```ts
constructor(private readonly userService: UserService) {}
```

React Query:

```ts
useQuery(...)
```

---

## Fluid Relationships Between Concepts

Classification answers:

> What kind of concept is this?

A relationship answers:

> How might this concept influence, guide, support, or realize another concept?

These are separate views. A concept does not need to pass through the categories in a fixed order.

```text
Programming Paradigms ─────┐
                           │
Software Design Principles ┤
                           │
Design and Communication   │
Patterns ──────────────────┼── may influence or support ──→ Concrete Software
                           │
Architectural Styles and   │
Patterns ──────────────────┤
                           │
Frameworks and Libraries ──┘
```

The lines represent optional relationships such as **may influence**, **may guide**, **may apply**, **may support**, or **may realize**. They do not mean **must contain**, **must depend on**, or **must occur before**.

One principle may guide a function, pattern, framework, or system architecture. One pattern may be implemented using several technologies. One application may combine multiple paradigms, styles, and patterns.

### Example Concept Network

The following diagram places a concrete application at the center instead of presenting concepts as a pipeline:

```text
Concrete Application
│
├── may express
│   ├── Object-Oriented Programming
│   ├── Functional Programming
│   └── Reactive Programming
│
├── may be guided by
│   └── Inversion of Control
│
├── may apply
│   ├── Observer
│   ├── Request / Response
│   └── Publish / Subscribe
│
├── may combine
│   ├── Client–Server
│   ├── Layered Architecture
│   └── Event-Driven Architecture
│
├── may use
│   ├── NestJS
│   ├── React
│   ├── TanStack Query
│   └── RxJS
│
└── is realized through
    └── source code and configuration
```

---

## Design Patterns, Communication Patterns, and Architectural Styles

These categories may work together, but they answer different questions.

| Level | Question | Example |
| --- | --- | --- |
| Design Pattern | How should objects or components collaborate? | Observer |
| Communication Pattern | How should participants exchange information? | Request / Response or Publish / Subscribe |
| Architectural Style | How should major system components be organized? | Event-Driven Architecture |
| Architectural Pattern | How can a recurring architecture-level problem be solved? | CQRS |

```text
Observer
→ behavioral design pattern

Publish / Subscribe
→ communication pattern (messaging subtype)

Event-Driven Architecture
→ architectural style
```

Some design patterns organize communication between objects, but that does not make every communication pattern a design pattern.

Similarly, using Publish / Subscribe in one interaction does not automatically make the entire system an Event-Driven Architecture.

---

## Realization Hierarchy: Pattern to Implementation

These terms describe different parts of turning an idea into working software.

See [Mechanism](terminology/mechanism.md) for the cross-context meaning of mechanism and its relationship to techniques, components, technologies, APIs, and implementations.

| Level | Question | Example |
| --- | --- | --- |
| Pattern | How should participants interact? | Publish / Subscribe |
| Mechanism | What process enables the interaction? | Broker, topics, and subscriptions |
| Protocol | What communication rules are followed? | HTTP |
| Technology | What product, framework, or library provides the capability? | Kafka, RabbitMQ, NestJS |
| Implementation | What code and configuration realize it? | An `OrderCreated` producer and its consumers |

A useful realization model is:

```text
Communication Pattern
        ↓ realized through

Communication Mechanism
        ↓ may be governed or transported by

Protocol
        ↓ provided or supported by

Technology
        ↓ configured and coded as

Concrete Implementation
```

This hierarchy shows how an abstract pattern can become working software. It is different from the concept-classification hierarchy at the beginning of this document.

It is not always a strict one-to-one chain. An in-process mechanism may not require a network protocol, a technology can support multiple patterns and protocols, and an implementation can combine several technologies.

### Publish / Subscribe Example

```text
Publish / Subscribe
→ communication pattern

Broker + topics + subscriptions
→ communication mechanism

Kafka
→ technology

OrderCreated topic,
producer configuration,
consumer groups,
and application handlers
→ concrete implementation
```

### Request / Response Example

```text
Request / Response
→ communication pattern

Direct request followed by a response
→ communication mechanism

HTTP
→ protocol

NestJS and Axios
→ framework and library

GET /patients controller,
Axios request,
DTOs,
and response handling
→ concrete implementation
```

### Observer Example

```text
Observer
→ behavioral design pattern

Listener registration and notification
→ mechanism

EventTarget or QueryObserver
→ provided implementation abstraction

addEventListener(...) or useQuery(...)
→ concrete application usage
```

---

## Relationship to Scalability

Paradigms, patterns, and architectural styles can help a system evolve and scale, but they do not guarantee scalability.

```text
Paradigms and patterns
        ↓
help structure the solution

Architecture
        ↓
defines system and deployment boundaries

Infrastructure
        ↓
provides scaling capabilities

Correct implementation and measurement
        ↓
produce an actually scalable system
```

### Benefits and Trade-Offs

Every paradigm, pattern, and architectural style provides benefits while introducing constraints.

| Concept | Potential benefit | Potential trade-off |
| --- | --- | --- |
| Observer | Automatically propagates changes to interested observers | Can create hidden update chains, subscription leaks, or notification cycles |
| Publish / Subscribe | Decouples publishers from subscribers | Distributed asynchronous implementations introduce delivery, ordering, duplication, and eventual-consistency concerns |
| Event-Driven Architecture | Allows components to react and scale independently | Adds operational complexity, asynchronous debugging, tracing, and failure-handling concerns |
| Microservices | Provides independent deployment and scaling boundaries | Introduces network failures, distributed coordination, data-consistency, and operational costs |
| Singleton | Provides one shared instance | Can create global-state coupling, testing difficulty, and shared-resource contention |
| Excessive pattern usage | May appear to prepare code for future change | Can introduce unnecessary abstractions and make simple behavior harder to understand |

These trade-offs depend on the implementation.

For example, Publish / Subscribe does not inherently create eventual consistency. An in-process event bus may deliver messages synchronously. Eventual consistency commonly appears when Pub/Sub is used asynchronously across independently managed data stores.

Likewise, Microservices do not automatically improve scalability. They provide boundaries that may be scaled independently, but only when the workload and system design benefit from those boundaries.

### Scalability Requires Evidence

A system becomes scalable through validated engineering decisions rather than through pattern selection alone.

```text
Requirements and workload
        ↓
Architecture and data design
        ↓
Implementation and infrastructure
        ↓
Measurement
        ↓
Identified bottlenecks
        ↓
Targeted scaling decisions
```

Useful evidence includes:

- Profiling.
- Load testing.
- Capacity measurements.
- Database-query analysis.
- Queue-depth and processing-time metrics.
- Failure-rate and latency monitoring.
- Production observability.

The goal is not to use every pattern. It is to choose the smallest set that addresses the system's actual requirements and constraints.

---

## Key Principles

- Paradigms describe how programs are expressed.
- Software design principles guide decisions about responsibilities, dependencies, change, and control.
- Design patterns describe recurring collaboration between components.
- Communication patterns describe information flow; messaging patterns are one subtype.
- Architectural styles describe the organization of an entire system.
- Architectural patterns solve recurring architecture-level problems.
- Frameworks implement many patterns and architectural ideas.
- Libraries provide reusable capabilities.
- Implementations are concrete source code.

---

## Examples

Reactive Programming
→ Programming Paradigm

Inversion of Control
→ Software Design Principle

Observer
→ Behavioral Design Pattern

Publish / Subscribe
→ Communication Pattern (Messaging subtype)

Event-Driven Architecture
→ Architectural Style

TanStack Query
→ Library implementing observer-based synchronization.

NestJS
→ Framework implementing dependency injection and other architectural concepts.

---

## Related Concepts

- [Software Engineering Foundations](./)
- [Software Architecture](software-architecture.md)
- [Software Design Principles](software-design-principles/)
- [Software Engineering Terminology](terminology/)
- [Frameworks, Libraries, and Tooling](../../framework-tooling/)
- [Architectural Styles](architectural-styles/)
- [Architectural Patterns](architectural-patterns/)
- [Programming Paradigm](programming-paradigms/programming-paradigm.md)
- [Reactive Programming](programming-paradigms/reactive-programming.md)
- [Gang of Four Design Patterns](design-patterns/gang-of-four-design-patterns.md)
- [Observer Pattern](design-patterns/observer-pattern.md)
- [Communication Patterns](communication-patterns/)
- [Request / Response](communication-patterns/request-response.md)
- [Publish / Subscribe](communication-patterns/publish-subscribe.md)
- [Event-Driven Architecture](architectural-styles/event-driven-architecture.md)
