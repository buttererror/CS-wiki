# Software Taxonomy

# Purpose

This document defines the major abstraction levels used throughout the knowledge base.

Many Computer Science concepts appear related because they solve similar problems, but they belong to different abstraction levels. Distinguishing these levels prevents mixing concepts such as programming paradigms, design patterns, and architectures.

---

# Concept Classification Hierarchy

```text
Computer Science
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

This is a classification hierarchy: it shows what kind of concept something is. Messaging patterns are a subtype of communication patterns. Communication mechanisms do not appear as another subtype because they realize patterns rather than classify them.

The direct and messaging branches are a learning model rather than rigid boundaries. For example, asynchronous Request / Reply may use messaging infrastructure.

Each category answers a different question.

---

# Programming Paradigm

## Definition

A programming paradigm is a fundamental style of expressing programs.

It shapes how developers think about solving problems and organizing code.

A paradigm is broad and influences the structure of an entire program rather than solving one isolated problem.

## Examples

- Object-Oriented Programming (OOP)
- Functional Programming (FP)
- Reactive Programming
- Procedural Programming
- Logic Programming

## Answers

> How should software be written?

---

# Software Design Principle

## Definition

A software design principle is a broad guideline for making decisions about responsibilities, dependencies, change, and control.

Unlike a design pattern, a principle does not prescribe a recurring structure or collaboration. A pattern or technique may apply one or more principles.

## Examples

- Inversion of Control
- Separation of Concerns
- Dependency Inversion Principle
- Single Responsibility Principle

## Answers

> What general guideline should inform this design decision?

---

# Design Pattern

## Definition

A design pattern is a proven, reusable solution to a recurring software design problem.

A pattern does not define an entire application.
Instead, it describes how a small group of objects or components should collaborate.

## Examples

- Observer
- Factory
- Strategy
- Singleton
- Decorator (GoF)
- Adapter

## Answers

> How should several objects collaborate to solve a recurring problem?

---

# Communication Pattern

## Definition

A communication pattern defines how information flows between independent participants.

These patterns focus on communication rather than object design. Messaging patterns are a subtype concerned specifically with exchanging messages.

They are frequently used in distributed systems but may also appear inside a single application.

## Examples

- Request / Response
- Point-to-Point Messaging
- Publish / Subscribe
- Event Streaming
- Competing Consumers
- Event Notification

## Answers

> How should independent participants exchange information?

---

# Architectural Style

## Definition

An architectural style describes how the major parts of an application or system are organized and communicate.

Architectures operate at a much larger scale than design patterns.

An architecture often combines many design patterns and communication mechanisms.

## Examples

- Layered Architecture
- Client–Server
- Event-Driven Architecture
- Microservices
- Hexagonal Architecture

## Answers

> How should an entire system be organized?

---

# Architectural Pattern

## Definition

An architectural pattern is a reusable solution to a recurring architecture-level problem in a particular context.

Architectural patterns operate at a larger scope than object-level design patterns, but they may address a more specific problem than an architectural style.

## Examples

- MVC
- CQRS
- API Gateway
- Saga
- Event Sourcing

## Answers

> How can a recurring architecture-level problem be solved?

The distinction between architectural style and architectural pattern varies across software literature. This knowledge base uses one primary classification for navigation while acknowledging common alternatives.

---

# Framework

## Definition

A framework is an implementation that provides reusable infrastructure and enforces an application structure.

Frameworks often implement multiple design patterns and architectural ideas.

## Examples

- React
- NestJS
- Angular
- Spring Boot

## Answers

> What infrastructure helps implement an application?

---

# Library

## Definition

A library provides reusable functionality that applications call when needed.

Unlike frameworks, libraries generally do not control the application's execution flow.

## Examples

- TanStack Query
- RxJS
- Lodash
- Axios

## Answers

> What reusable functionality can my application use?

---

# Implementation

## Definition

Implementation is the concrete source code that realizes paradigms, patterns, and architectures.

Different implementations may realize the same pattern differently.

## Examples

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

# Relationship Between Levels

```text
Programming Paradigm
        ↓ influences

Software Design Principles
        ↓ guide

Architectural Style
        ↓ may use

Architectural, Design, and Communication Patterns
        ↓ supported by

Frameworks / Libraries
        ↓ realized as

Source Code
```

## Example Concept Map

The following diagram shows how specific examples may relate across abstraction levels:

```text
Programming Paradigms
│
├── Object-Oriented Programming
├── Functional Programming
└── Reactive Programming
        │
        │ influence
        ▼
Software Design Principles
│
└── Inversion of Control
        │
        │ guide
        ▼
Design and Communication Patterns
│
├── Design Pattern
│   └── Observer
│
└── Communication Pattern
    └── Messaging Pattern
        └── Publish / Subscribe
        │
        │ used within
        ▼
Architectural Styles
│
├── Client–Server
├── Layered Architecture
├── Event-Driven Architecture
└── Microservices
        │
        │ supported by
        ▼
Frameworks and Libraries
│
├── Frameworks
│   └── NestJS
│
└── Libraries
    ├── React
    ├── TanStack Query
    └── RxJS
        │
        │ realized as
        ▼
Application Source Code
```

---

# Design Patterns, Communication Patterns, and Architectural Styles

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

# Realization Hierarchy: Pattern to Implementation

These terms describe different parts of turning an idea into working software.

See [Mechanism](../terminology/mechanism.md) for the cross-context meaning of mechanism and its relationship to techniques, components, technologies, APIs, and implementations.

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

## Publish / Subscribe Example

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

## Request / Response Example

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

## Observer Example

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

# Relationship to Scalability

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

## Benefits and Trade-Offs

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

## Scalability Requires Evidence

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

# Key Principles

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

# Examples

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

# Related Concepts

- [Software Architecture](software-architecture.md)
- [Software Design Principles](../software-design-principles/README.md)
- [Software Engineering Terminology](../terminology/README.md)
- [Frameworks, Libraries, and Tooling](../framework-tooling/README.md)
- [Architectural Styles](../architectural-styles/README.md)
- [Architectural Patterns](../architectural-patterns/README.md)
- [Programming Paradigm](../programming-paradigms/programming-paradigm.md)
- [Reactive Programming](../programming-paradigms/reactive-programming.md)
- [Gang of Four Design Patterns](../design-patterns/gang-of-four-design-patterns.md)
- [Observer Pattern](../design-patterns/observer-pattern.md)
- [Communication Patterns](../communication-patterns/README.md)
- [Request / Response](../communication-patterns/request-response.md)
- [Publish / Subscribe](../communication-patterns/publish-subscribe.md)
- [Event-Driven Architecture](../architectural-styles/event-driven-architecture.md)
