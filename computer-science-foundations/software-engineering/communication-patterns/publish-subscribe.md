# Publish / Subscribe

## Purpose

This document introduces Publish / Subscribe as a messaging pattern and distinguishes it from Observer, Reactive Programming, and Event-Driven Architecture.

---

## Taxonomy Classification

- **Primary category:** Communication Pattern
- **Type:** Messaging Pattern
- **Area:** Indirect Messaging
- **Abstraction level:** Communication between participants
- **Common contexts:** In-process applications and distributed systems

Publish / Subscribe delivers messages from publishers to interested subscribers without requiring them to know about each other directly.

---

## Core Roles

- **Publisher:** Produces and sends messages.
- **Subscriber:** Registers interest in messages.
- **Broker or event bus:** Receives, routes, and delivers messages.
- **Topic or channel:** Labels or categorizes messages for routing.
- **Subscription:** Connects a subscriber to a topic or channel.

Not every implementation exposes these roles in the same form. In-process event buses may be simple, while distributed brokers may provide routing, persistence, retries, or other infrastructure features.

---

## Definition

Publish / Subscribe is a messaging or communication pattern.

It solves this recurring problem:

> How can one participant send information to multiple interested participants without knowing who they are?

The publisher sends a message through communication infrastructure such as a broker or event bus. A topic or channel identifies the category of the message, and the infrastructure delivers it to interested subscribers.

```text
Publisher
    ↓
Broker or event bus
    ↓
Topic or channel
    ↓
Subscribers
```

A topic is a routing label, not the intermediary itself.

---

## Mental Model

Think of a publisher making an announcement through a reception desk.

```text
Publisher
    ↓
Reception desk
    ↓
Interested recipients
```

The publisher does not deliver the message to every recipient directly. It sends the message to the intermediary.

Recipients subscribe to relevant categories without needing direct knowledge of the publisher.

---

## Core Roles in Detail

### Publisher

The Publisher produces a message or event.

It knows:

- What message it is publishing.
- Which topic or channel it belongs to.
- How to reach the messaging infrastructure.

It does not need to know which subscribers will receive the message.

```text
Publisher
    ↓
publish(topic, message)
```

### Subscriber

A Subscriber registers interest in a topic or channel and receives matching messages.

```text
Subscriber
    ↓
subscribe(topic)
```

The subscriber does not need direct knowledge of the publisher.

### Broker or Event Bus

The broker or event bus is the intermediary between publishers and subscribers.

Depending on the implementation, it may:

- Store subscriptions.
- Match topics to subscribers.
- Receive published messages.
- Deliver messages to interested subscribers.
- Buffer or persist messages.
- Support retries or delivery guarantees.

Buffering, persistence, retries, and delivery guarantees are implementation-specific capabilities, not requirements of the Publish / Subscribe pattern.

Examples discussed include Kafka, RabbitMQ, Redis Pub/Sub, NATS, and in-memory event buses. Their storage and delivery semantics differ.

### Topic or Channel

A Topic or Channel categorizes messages for routing.

```ts
eventBus.publish('patient-created', patient)
```

```ts
eventBus.subscribe('patient-created', handler)
```

The topic is the shared communication label used by publishers and subscribers.

---

## Example: In-Memory Event Bus

The following is a conceptual Pub/Sub implementation inside one application:

```ts
type EventHandler<T = unknown> = (payload: T) => void

class EventBus {
  private topics = new Map<string, Set<EventHandler>>()

  subscribe<T>(
    topic: string,
    handler: EventHandler<T>,
  ): () => void {
    const handlers =
      this.topics.get(topic) ?? new Set<EventHandler>()

    handlers.add(handler as EventHandler)
    this.topics.set(topic, handlers)

    return () => {
      handlers.delete(handler as EventHandler)
    }
  }

  publish<T>(topic: string, payload: T): void {
    const handlers = this.topics.get(topic)

    if (!handlers) {
      return
    }

    for (const handler of handlers) {
      handler(payload)
    }
  }
}
```

Usage:

```ts
const eventBus = new EventBus()

const unsubscribe = eventBus.subscribe<{ id: string }>(
  'patient-created',
  (patient) => {
    console.log('New patient:', patient.id)
  },
)

eventBus.publish('patient-created', {
  id: 'patient-123',
})

unsubscribe()
```

This example demonstrates the communication roles, but it does not model every capability or guarantee of a production messaging system.

---

## How the Example Works

The subscriber registers a handler under a topic:

```ts
eventBus.subscribe('patient-created', handler)
```

The event bus stores that handler in the collection associated with the topic.

The publisher sends a message:

```ts
eventBus.publish('patient-created', patient)
```

The event bus finds the handlers registered for that topic and delivers the payload to each one.

The function returned by `subscribe()` removes the subscription.

---

## Communication Flow

```text
Subscriber registers for a topic
        ↓
Messaging infrastructure stores the subscription
        ↓
Publisher publishes a message
        ↓
Infrastructure matches the topic
        ↓
Infrastructure delivers the message
        ↓
Subscribers react
```

The communication infrastructure is responsible for routing and delivery according to its own semantics.

---

## Relationship to the Observer Pattern

Observer and Publish / Subscribe solve similar notification problems, but they are different patterns.

Observer:

```text
Subject
    ↓
Observers
```

Publish / Subscribe:

```text
Publisher
    ↓
Broker or event bus
    ↓
Subscribers
```

| Observer Pattern | Publish / Subscribe |
| --- | --- |
| Subject directly manages or reaches observers | Publisher does not know subscribers |
| Subject delivers notifications | Communication infrastructure delivers messages |
| Usually direct communication | Indirect communication |
| Common inside one application | Common locally and across distributed systems |
| Subject owns observer registration | Intermediary owns subscription routing |

The intermediary is an important distinction, but direct knowledge, subscription ownership, and delivery responsibility also separate the patterns.

---

## Relationship to Reactive Programming

Publish / Subscribe can support Reactive Programming.

```text
Reactive Programming
        ↓ may use
Publish / Subscribe
```

A reactive system may publish changing values or events and allow subscribers to react to them.

However, Publish / Subscribe is not itself Reactive Programming.

```text
Publish / Subscribe
→ How are messages delivered?

Reactive Programming
→ How is the program modeled around values and events changing over time?
```

Using Pub/Sub does not automatically make an entire application reactive.

---

## Relationship to Event-Driven Architecture

Event-Driven Architecture commonly uses Publish / Subscribe.

```text
Service publishes event
        ↓
Message broker
        ↓
Interested services consume event
```

Example:

```text
Order Service
        ↓
OrderCreated
        ↓
Kafka
        ↓
Inventory Service
Email Service
Analytics Service
```

The Order Service does not need to know which services consume `OrderCreated`. The messaging platform connects the publisher with interested consumers.

Publish / Subscribe is a communication pattern. Event-Driven Architecture is a system-wide architectural style that may use that pattern.

---

## Relationship to Microservices

Microservices can communicate directly through HTTP or gRPC, or asynchronously through Publish / Subscribe.

Direct communication:

```text
Order Service
        ↓ HTTP
Payment Service
```

Publish / Subscribe communication:

```text
Order Service
        ↓ publishes event
Kafka
        ↓
Inventory Service
Email Service
Analytics Service
```

Large systems often combine both styles. A payment operation may require an immediate response, while email and analytics processing may happen asynchronously.

---

## Is the Broker a Third Party?

A broker is separate infrastructure, but it is not necessarily an external third-party service.

A company may deploy and operate Kafka, RabbitMQ, Redis, or NATS inside its own infrastructure.

```text
Application services
        ↓
Messaging infrastructure
        ↓
Other application services
```

The broker can therefore be part of the overall system even though it is separate from the application services.

---

## Relationship to Event-Driven Communication

Publish / Subscribe is one event-driven communication mechanism.

```text
Something happens
        ↓
An event is published
        ↓
Interested subscribers receive it
        ↓
They react
```

Event-driven communication can appear inside one application, between modules, between backend services, or across a distributed system.

Using event-driven communication does not automatically mean the entire system follows Event-Driven Architecture.

---

## Examples Discussed

- **Kafka:** Distributed event-streaming platform organized around topics and brokers.
- **RabbitMQ:** Message broker supporting routing and message delivery.
- **Redis Pub/Sub:** Topic-based, transient publication and subscription.
- **NATS:** Messaging infrastructure with multiple messaging capabilities.
- **In-memory EventBus:** Pub/Sub communication inside one application.

These systems differ in persistence, acknowledgements, routing, ordering, replay, and delivery guarantees.

---

## Why It Matters

Publish / Subscribe reduces direct coupling between message producers and consumers.

The publisher does not need to know:

- Who receives the message.
- How many subscribers exist.
- What each subscriber does.

This allows subscribers to be added or removed without changing the publisher, subject to the contracts and operational constraints of the messaging system.

---

## Related Concepts

- [Software Taxonomy](../software-taxonomy.md)
- [Communication Patterns](README.md)
- [Observer Pattern](../design-patterns/observer-pattern.md)
- [Gang of Four Design Patterns](../design-patterns/gang-of-four-design-patterns.md)
- [Reactive Programming](../programming-paradigms/reactive-programming.md)
- [Event-Driven Architecture](../architectural-styles/event-driven-architecture.md)
- [Microservice Architecture](../architectural-styles/microservice-architecture.md)
