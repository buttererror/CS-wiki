# Event-Driven Architecture

Event-Driven Architecture is an architectural style in which major system components communicate by producing and reacting to events.

---

## Taxonomy Classification

- **Primary category:** Architectural Style
- **Type:** Architectural Style
- **Field:** Software Engineering
- **Scope:** Major system components

---

## Core Concepts

- **Event:** Represents something that happened.
- **Producer:** Creates and publishes an event.
- **Consumer:** Receives and reacts to an event.
- **Delivery mechanism:** Transfers events between producers and consumers.
- **Event-driven communication:** Communicates through events at any application or system scope.

---

## Definition

Event-Driven Architecture is an architectural style that organizes major system components around events.

An event represents something that has already happened.

Examples discussed:

```text
OrderCreated
PatientCreated
UserCreated
```

The basic flow is:

```text
Something happens
        ↓
An event is produced
        ↓
Interested components receive it
        ↓
They react
```

The producer does not necessarily tell each consumer what to do. It announces what happened, and interested consumers decide how to respond.

---

## Mental Model

```text
Producer
    ↓
Event
    ↓
Delivery mechanism
    ↓
Consumers
    ↓
Independent reactions
```

Example:

```text
Order Service
        ↓ publishes
OrderCreated
        ↓ delivered through
Message Broker
        ↓
Inventory Service
Email Service
Analytics Service
```

Each consumer reacts independently to the same event.

Whether every consumer instance receives an event depends on the messaging model. In Publish / Subscribe, independent subscriptions may each receive it. Within a competing-consumer group, one consumer instance may process it on behalf of that group.

---

## Event

An Event is a message describing something that occurred.

```text
OrderCreated
```

means:

> An order has been created.

It does not directly mean:

```text
Send an email.
Reduce inventory.
Record analytics.
```

Those are reactions performed by consumers.

```text
OrderCreated
        ↓
Inventory Service reduces stock

OrderCreated
        ↓
Email Service sends confirmation

OrderCreated
        ↓
Analytics Service records activity
```

An event records a fact:

```text
OrderCreated
→ Something happened.
```

A command requests behavior:

```text
SendOrderConfirmation
→ Perform this action.
```

Events may cause consumers to perform actions, but the event itself announces what happened rather than instructing every consumer.

---

## Producer

The Producer is the component that creates or publishes the event.

```text
Order Service
        ↓
publishes OrderCreated
```

The producer usually knows:

- What happened.
- Which event to publish.
- Where to publish it.

It does not need to know every consumer that will react.

---

## Consumer

A Consumer is a component interested in an event.

```text
Inventory Service
        ↓
subscribes to OrderCreated
```

When the event arrives, the consumer performs its own behavior. Multiple independent consumers can react to the same event according to the delivery semantics of the messaging system.

---

## Message Broker

A Message Broker is one common delivery mechanism between producers and consumers.

Event-driven communication may also use an in-process event bus, an event stream, a queue, or another dispatcher.

```text
Producer
    ↓
Broker
    ↓
Consumers
```

Depending on the implementation, the broker may be responsible for:

- Receiving events.
- Matching events to subscribers.
- Delivering messages.
- Buffering or persisting messages.
- Supporting acknowledgements, retries, replay, or delivery guarantees.

These capabilities are implementation-specific. They are not guaranteed by Event-Driven Architecture itself.

Examples discussed:

- **Kafka:** Distributed event-streaming platform with durable logs and replay.
- **RabbitMQ:** Message broker supporting queues, exchanges, and routing.
- **Redis Pub/Sub:** Transient publication and subscription without durable replay.
- **NATS:** Messaging infrastructure offering multiple delivery models.

The messaging infrastructure may be operated inside a company's own system; it is not necessarily an external third-party service.

---

## Broker-Based Communication Flow

```text
Business action occurs
        ↓
Producer creates an event
        ↓
Event is published
        ↓
Broker receives the event
        ↓
Broker delivers it to subscribers
        ↓
Consumers react independently
```

This flow describes one common broker-based implementation, not a requirement of every event-driven system.

---

## Example: Order Processing

The example discussed combines synchronous and event-driven communication.

This is a conceptual example. A production workflow would also need explicit decisions about failures, retries, duplicate events, ordering, and consistency between payment and inventory operations.

```text
Order Service
      │
      ├───────────────┐
      │               │
      ▼               ▼
Payment Service    OrderCreated
  through HTTP         ↓
                     Kafka
                       ↓
         ┌─────────────┼─────────────┐
         ▼             ▼             ▼
 Inventory Service  Email Service  Analytics Service
```

Payment may require an immediate response.

```text
Order Service
        ↓ request
Payment Service
        ↓ response
Order Service
```

Email, inventory updates, and analytics can react asynchronously to the published event.

Large systems may therefore combine:

- Synchronous Request / Response.
- Asynchronous event-driven communication.

---

## Relationship to Event-Driven Communication

Event-driven communication is a general communication mechanism.

```text
Something happens
        ↓
An event is emitted
        ↓
Interested participants react
```

Event handling or event-driven communication can appear at different scopes:

- Inside one object.
- Inside one application.
- Between application modules.
- Between separate services.

Event-Driven Architecture is more specific. It means events are a primary mechanism for coordinating the major components of a system.

```text
Event-driven communication
→ a communication mechanism

Event-Driven Architecture
→ a system organized primarily around that mechanism
```

Using an event in one part of an application does not automatically make the entire application an Event-Driven Architecture.

---

## Example: Event Communication Without Event-Driven Architecture

```ts
button.addEventListener('click', handleClick)
```

This uses local event handling. The browser dispatches a click event to the registered listener.

However, the application does not automatically use Event-Driven Architecture merely because it handles DOM events.

Another example:

```ts
emitter.on('user-created', handler)
emitter.emit('user-created', user)
```

This is event-driven communication inside an application. Whether the entire application follows Event-Driven Architecture depends on how its major components are organized.

---

## Relationship to the Observer Pattern

Event-Driven Architecture and the Observer Pattern share a general notification idea:

```text
Something changes
        ↓
Interested parties are notified
        ↓
They react
```

However, they operate at different abstraction levels.

```text
Observer Pattern
→ behavioral design pattern
→ usually object-to-object communication
→ commonly inside one process

Event-Driven Architecture
→ architectural style
→ organizes major system components
→ may span multiple services
```

Observer usually looks like:

```text
Subject
    ↓
Observers
```

Event-Driven Architecture often looks like:

```text
Producer Service
        ↓
Event Broker
        ↓
Consumer Services
```

They share the concept of notification, but differ in scope, structure, and abstraction level.

---

## Relationship to Publish / Subscribe

Event-Driven Architecture commonly uses Publish / Subscribe, but it may also use queues, event streams, or other delivery patterns.

```text
Producer
    ↓ publishes event
Broker
    ↓ delivers event
Subscribers
```

Publish / Subscribe answers:

> How is an event delivered from a publisher to interested subscribers?

Event-Driven Architecture answers:

> How are the major components of the system organized around producing and consuming events?

```text
Publish / Subscribe
→ messaging pattern

Event-Driven Architecture
→ architectural style
```

Publish / Subscribe can support Event-Driven Architecture, but the two are not interchangeable.

---

## Relationship to Microservice Architecture

Microservices may communicate through events.

```text
Order Service
        ↓
Kafka
        ↓
Inventory Service
Email Service
Analytics Service
```

They may also communicate directly:

```text
Order Service
        ↓ HTTP or gRPC
Payment Service
```

Microservice Architecture and Event-Driven Architecture are separate architectural ideas.

A microservice system can use only direct Request / Response, only events, or a combination of both.

---

## Who Delivers the Event?

The responsible component depends on the implementation.

```text
Observer Pattern
→ Subject delivers notifications

Browser event system
→ Browser dispatches events

In-memory EventBus
→ EventBus delivers messages

Distributed event system
→ Messaging infrastructure delivers messages
```

In a broker-based architecture, the broker is responsible for routing and delivering the event according to its delivery semantics.

---

## Relationship to Request / Response

Request / Response is another communication mechanism.

```text
Client
    ↓ request
Server
    ↓ response
Client
```

The caller sends a request to a known receiver and commonly expects a response.

Event-driven communication differs:

```text
Producer
    ↓ publishes event
Delivery mechanism
    ↓
Consumers react
```

The producer may not know:

- Who receives the event.
- How many consumers exist.
- When each consumer completes.
- What each consumer does.

| Request / Response | Event-Driven Communication |
| --- | --- |
| Caller usually knows the receiver | Producer may not know consumers |
| Commonly expects a response | Commonly announces that something happened |
| Often synchronous | Often asynchronous |
| Usually direct interaction | Often intermediary-mediated |
| Usually targets a known receiver | Zero or more consumers may react |

Request / Response is not inherently synchronous, and event handling is not inherently asynchronous. The table describes common usage rather than universal rules.

---

## Relationship to Runtime Infrastructure

Event delivery is only one part of operating a distributed system.

- **Kubernetes:** Deploys, restarts, and scales services.
- **Service discovery:** Helps services locate one another.
- **Load balancer:** Distributes requests across instances.
- **API gateway:** Routes client requests to internal services.
- **Messaging infrastructure:** Routes and delivers asynchronous messages or events.

Kubernetes normally manages service runtime and networking rather than delivering application-level business events.

---

## Why It Matters

Event-Driven Architecture reduces direct coupling between system components.

The producer publishes what happened without containing the behavior of every consumer. This allows new consumers to react to an event without requiring the producer to call them directly.

It also explains why distributed systems often combine:

```text
Request / Response
→ when an immediate result is required

Event-driven communication
→ when independent reactions can happen asynchronously
```

---

## Relationships to Other Areas

- **Observer Pattern:** Shares the notification idea at a smaller, object-level scope.
- **Publish / Subscribe:** Commonly delivers events between producers and consumers.
- **Microservice Architecture:** Services may communicate asynchronously through events.
- **Request / Response:** Provides direct communication between known participants.
- **Message Broker:** Routes and delivers events in distributed systems.
- **Kubernetes:** Manages service deployment and runtime rather than business-event delivery.

---

## Key Takeaways

- Event-Driven Architecture is an architectural style that may guide a
  concrete software architecture.
- An event announces something that happened; a command requests an action.
- Producers publish events without directly coordinating every consumer.
- Brokers are common delivery mechanisms but are not mandatory.
- Event-driven communication can exist without the entire system using Event-Driven Architecture.
- Publish / Subscribe is one messaging pattern that can support EDA.
- EDA and Request / Response can coexist in the same system.
- Delivery guarantees, ordering, replay, and persistence depend on the messaging implementation.

---

## Related Concepts

- [Architectural Styles](README.md)
- [Software Architecture](../software-architecture.md)
- [Software Taxonomy](../software-taxonomy.md)
- [Communication Patterns](../communication-patterns/README.md)
- [Observer Pattern](../design-patterns/observer-pattern.md)
- [Publish / Subscribe](../communication-patterns/publish-subscribe.md)
- [Microservice Architecture](microservice-architecture.md)
- [Modular Monolith](modular-monolith.md)
- [Software System Design](../../../system-design/software-system-design/README.md)
- [Request / Response](../communication-patterns/request-response.md)
