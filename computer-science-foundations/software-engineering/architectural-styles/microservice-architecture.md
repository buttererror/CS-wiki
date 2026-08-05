# Microservice Architecture

## Purpose

This document introduces Microservice Architecture and explains its service boundaries, communication approaches, supporting infrastructure, data ownership, benefits, and trade-offs.

“Microservices Architecture” is also common terminology. This knowledge base uses **Microservice Architecture** for consistency with the filename and related links.

---

## Taxonomy Classification

- **Primary category:** Architectural Style
- **Type:** Architectural Style
- **Field:** Software Engineering
- **Scope:** Major system components

---

## Definition

Microservice Architecture is an architectural style that organizes a system as a collection of small, independently deployable services.

Each service owns a cohesive business capability, exposes explicit contracts, and can evolve or scale with limited coordination with other services.

Services commonly run in separate processes and communicate over a network.

Examples discussed:

```text
User Service
Order Service
Payment Service
Inventory Service
Notification Service
```

---

## Core Characteristics

```text
Microservice Architecture
│
├── Independently deployable services
├── Business-capability boundaries
├── Explicit service contracts
├── Decentralized data ownership
└── Independent evolution and scaling
```

These characteristics describe the architecture. Tools such as Kubernetes, API gateways, and message brokers may support it, but they are not requirements for calling a system a microservice architecture.

---

## Mental Model

Instead of one deployment containing every responsibility:

```text
Single application
    ├── Users
    ├── Orders
    ├── Payments
    ├── Inventory
    └── Notifications
```

the system is separated into independently deployable services:

```text
User Service

Order Service

Payment Service

Inventory Service

Notification Service
```

The services still need to communicate and coordinate.

```text
Separate services
        ↓
Communication mechanisms
        ↓
Combined system behavior
```

---

## Service Boundaries

A service should own a cohesive business capability or responsibility.

```text
Order Service
→ order lifecycle

Payment Service
→ payment processing

Inventory Service
→ stock management
```

A boundary should allow the service to evolve without requiring unrelated services to change for every internal implementation detail.

Boundary decisions remain difficult. Services that are too large lose independent evolution, while services that are too small create excessive network communication and operational overhead.

---

## Service Communication

Microservices can use several communication approaches. They do not always communicate through a broker or external third-party system.

### Direct Request / Response

One service can call another directly.

```text
Order Service
        ↓ HTTP or gRPC
Payment Service
```

```text
Service A
    ↓ request
Service B
    ↓ response
Service A
```

This is useful when the caller requires an immediate answer.

Request / Response is commonly synchronous from the caller's perspective, but the pattern is not inherently limited to synchronous implementations.

### Asynchronous Messaging

A service may publish a message or event through messaging infrastructure.

```text
Order Service
        ↓ publishes OrderCreated
Messaging infrastructure
        ↓
Inventory Service
Email Service
Analytics Service
```

The publisher does not need to call each consumer directly.

Messaging can reduce direct and temporal runtime coupling, but it does not remove all coupling. Producers and consumers remain coupled through message contracts and business assumptions.

Examples discussed:

- **Kafka:** Distributed event-streaming platform.
- **RabbitMQ:** Message broker with queues, exchanges, and routing.
- **Redis Pub/Sub:** Transient publication and subscription.
- **NATS:** Messaging infrastructure supporting multiple delivery models.

Persistence, ordering, acknowledgements, replay, and delivery guarantees depend on the selected technology and configuration.

### Combining Communication Styles

A microservice system can combine direct and asynchronous communication.

```text
Order Service
      │
      ├────────────────┐
      │                │
      ▼                ▼
Payment Service    OrderCreated
through HTTP           ↓
                     Kafka
                       ↓
         ┌─────────────┼─────────────┐
         ▼             ▼             ▼
 Inventory Service  Email Service  Analytics Service
```

```text
Immediate dependency
→ Request / Response

Independent later reactions
→ event-driven communication
```

This is a conceptual flow. Production implementations require decisions about timeouts, retries, duplicate messages, idempotency, ordering, and consistency between operations.

---

## Supporting Infrastructure

```text
Supporting Infrastructure
├── API Gateway
├── Service Discovery
├── Load Balancing
├── Container Orchestration
├── Observability
└── Messaging Infrastructure
```

These capabilities support microservice systems but are not exclusive to them.

### API Gateway

An API Gateway can receive external client requests and route them to internal services.

```text
Client
    ↓
API Gateway
    ├── User Service
    ├── Order Service
    └── Payment Service
```

Responsibilities may include routing, authentication, rate limiting, hiding internal locations, and aggregating responses.

An API Gateway handles external request routing. It is different from messaging infrastructure that delivers asynchronous messages or events.

### Service Discovery

Service Discovery helps a service locate another service whose instances or addresses may change.

```text
Order Service
        ↓
Where is User Service?
        ↓
Service Discovery
        ↓
User Service address
```

Discovery may be client-side, server-side, DNS-based, or provided by a platform. Examples include Kubernetes DNS, Consul, and Eureka.

### Load Balancing

A load balancer distributes requests across service instances.

```text
Incoming request
        ↓
Load Balancer
        ↓
One service instance
```

Load balancing supports availability and traffic distribution, but it is also used outside microservice systems.

### Container Orchestration

Kubernetes is one option for managing running service containers.

It can support deployment, restart, scaling, networking, service discovery, and load balancing.

```text
                    Kubernetes
      manages running service instances
                         │
        ┌────────────────┼────────────────┐
        ▼                ▼                ▼
 User Service      Order Service     Payment Service
```

Kubernetes is not required. Microservices can run on virtual machines, container platforms without Kubernetes, serverless platforms, or other infrastructure.

Container orchestration and business-process orchestration are different:

```text
Kubernetes orchestration
→ manages containers and runtime infrastructure

Business-process orchestration
→ coordinates a workflow across services
```

### Messaging Infrastructure

Messaging infrastructure handles indirect communication between services.

```text
Publisher Service
        ↓
Messaging infrastructure
        ↓
Consumer Services
```

Its exact routing, buffering, persistence, replay, and delivery behavior depends on the selected technology.

### Observability

Distributed systems require visibility across service boundaries.

Useful capabilities include:

- Centralized logs.
- Metrics and alerts.
- Distributed tracing.
- Correlation identifiers.
- Service-level latency and failure measurements.

---

## Data Ownership

A shared database is better described as a data-sharing or integration approach than as a communication pattern.

```text
User Service
        ↓
Shared Database
        ↑
Order Service
```

When services directly depend on the same schema, they become coupled through that schema.

Potential problems include:

- Schema changes require cross-service coordination.
- Services can bypass one another's business rules.
- Independent deployment becomes harder.
- Data ownership becomes unclear.

The preferred ownership model is:

```text
Service
    ↓
Own data model
```

Each service should own and control its data model.

Physical deployment can vary. Several service-owned databases may run on the same database server, but one service should not modify another service's tables directly.

---

## Who Manages Microservices?

No single component handles every responsibility.

```text
API Gateway
→ routes client requests

Service Discovery
→ helps services locate one another

Load Balancer
→ distributes requests across instances

Container platform
→ runs, restarts, and scales services

HTTP / gRPC
→ supports direct service communication

Messaging infrastructure
→ supports indirect message and event delivery

Services
→ contain business logic
```

Each component solves a different system-level problem.

---

## Relationship to Event-Driven Architecture

Microservice Architecture and Event-Driven Architecture are different architectural styles.

```text
Microservice Architecture
→ divides the system into independently deployable services

Event-Driven Architecture
→ coordinates major system components through events
```

A microservice system may use events, direct HTTP or gRPC communication, or a combination.

```text
Microservice Architecture
≠ Event-Driven Architecture
```

They can be combined, but neither automatically implies the other.

---

## Relationship to Publish / Subscribe

Microservices may use Publish / Subscribe for indirect messaging.

```text
Publisher Service
        ↓
Broker or event bus
        ↓
Subscriber Services
```

```text
Publish / Subscribe
→ messaging/communication pattern

Microservice Architecture
→ architectural style
```

---

## Relationship to Request / Response

Request / Response is useful when a service needs a result from another service.

```text
Order Service
        ↓ request
Payment Service
        ↓ response
Order Service
```

This creates a direct runtime dependency. Event-driven messaging can reduce that dependency for operations that do not require an immediate result, while introducing message-contract and consistency concerns.

Large systems often use both approaches.

---

## Relationship to Client–Server Architecture

Each service-to-service request can resemble a client–server relationship.

```text
Order Service
→ client for this request

Payment Service
→ server for this request
```

A service may act as a server when receiving requests, a client when calling another service, a publisher when producing events, and a consumer when handling events.

---

## Benefits and Trade-Offs

| Potential benefit | Potential trade-off |
| --- | --- |
| Independent deployment | More deployment coordination and tooling |
| Independent scaling | Network and infrastructure overhead |
| Clear service ownership | Difficult boundary decisions |
| Failure isolation | Partial failures and cascading-failure risks |
| Team autonomy | Cross-service contract coordination |
| Technology flexibility | Operational and maintenance complexity |
| Smaller codebases per service | Harder end-to-end debugging |

Microservices do not automatically improve scalability. They provide boundaries that can be deployed and scaled independently when the workload and organization benefit from those boundaries.

Common distributed-system concerns include:

- Network latency and failure.
- Timeouts, retries, and circuit breaking.
- Duplicate-message handling and idempotency.
- Distributed tracing and observability.
- Cross-service data consistency.
- Contract versioning.
- Testing across service boundaries.

---

## When Microservices Are Appropriate

Microservices may be useful when a system has clear business boundaries and genuine requirements for independent deployment, scaling, ownership, or technology choices.

A modular monolith is often a simpler starting point when those requirements do not yet exist.

```text
Modular monolith
→ strong internal boundaries with one deployment

Microservice Architecture
→ service boundaries with independent deployments
```

The goal is not to maximize the number of services. It is to choose boundaries that match the system's technical and organizational needs.

---

## Key Takeaways

- Microservice Architecture organizes a system as independently deployable services.
- Services should align with cohesive business capabilities and expose explicit contracts.
- Services may communicate directly or through messaging infrastructure.
- API gateways, service discovery, load balancing, Kubernetes, and brokers are supporting tools, not defining requirements.
- Each service should control its data model; physical database deployment can vary.
- Microservice Architecture and Event-Driven Architecture are separate styles that can be combined.
- Microservices introduce distributed-system and operational costs.
- Independent scalability is a capability, not an automatic outcome.
- A modular monolith may be the better starting point when independent deployment is unnecessary.

---

## Related Concepts

- [Architectural Styles](README.md)
- [Modular Monolith](modular-monolith.md)
- [Software System Design](../../../system-design/software-system-design/README.md)
- [Domain-Driven Design](../../../system-design/software-system-design/domain-driven-design.md)
- [Monorepo](../../../software-development-practices/repository-organization/monorepo.md)
- [Software Architecture](../software-architecture.md)
- [Software Taxonomy](../software-taxonomy.md)
- [Communication Patterns](../communication-patterns/README.md)
- [Event-Driven Architecture](event-driven-architecture.md)
- [Publish / Subscribe](../communication-patterns/publish-subscribe.md)
- [Request / Response](../communication-patterns/request-response.md)
