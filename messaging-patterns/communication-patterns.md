# Messaging and Communication Patterns

## Purpose

This document introduces communication patterns and explains how messaging patterns fit within that broader category.

Communication patterns describe how independent participants exchange information. They do not specify one concrete technology or implementation.

---

## Taxonomy Classification

- **Primary category:** Messaging / Communication Pattern
- **Field:** Software Engineering
- **Area:** Software communication and integration
- **Abstraction level:** Interaction between participants

---

## Definition

A communication pattern is a reusable model describing how information flows between participants.

It answers:

> How should independent participants exchange information?

The participants may be objects, modules, processes, services, or entire systems.

---

## Communication Hierarchy

```text
Communication Patterns
│
├── Direct Communication
│   ├── Request / Response
│   ├── Polling
│   ├── Long Polling
│   ├── Webhooks
│   └── Bidirectional Streaming
│
└── Indirect Messaging
    ├── Point-to-Point Messaging
    ├── Publish / Subscribe
    └── Event Streaming
```

This hierarchy is a learning model rather than a set of rigid boundaries. Some approaches combine characteristics from more than one category.

---

## Direct Communication

In direct communication, the sender addresses a known receiver or endpoint.

```text
Sender
    ↓
Known receiver
```

Direct communication does not have to be synchronous, but direct Request / Response commonly is.

### Request / Response

```text
Client
    ↓ request
Server
    ↓ response
Client
```

The sender requests an operation or information and commonly expects a response.

Typical technologies include HTTP, REST, GraphQL, and gRPC.

### Polling

```text
Client asks for status
        ↓
Server responds
        ↓
Client waits
        ↓
Client asks again
```

The consumer repeatedly requests the latest state.

### Long Polling

The client sends a request that the server keeps open until information becomes available or a timeout occurs.

### Webhooks

```text
Event occurs in System A
        ↓
System A sends an HTTP request
        ↓
System B handles the notification
```

A webhook carries an event notification, but it commonly uses HTTP Request / Response as its delivery mechanism.

### Bidirectional Streaming

Both participants maintain a connection and exchange information over time.

Typical technologies include WebSocket and bidirectional gRPC streaming.

---

## Indirect Messaging

In indirect messaging, communication infrastructure separates the sender from the receiver.

```text
Sender
    ↓
Messaging infrastructure
    ↓
Receiver
```

### Point-to-Point Messaging

```text
Producer
    ↓
Queue
    ↓
One consumer processes each message
```

Multiple consumers may compete for work, but one consumer normally handles a particular message on behalf of the group.

### Publish / Subscribe

```text
Publisher
    ↓
Broker or event bus
    ↓
Independent subscribers
```

Publishers send messages without directly knowing the subscribers. Independent subscriptions may each receive the message.

### Event Streaming

```text
Producer
    ↓
Ordered event stream
    ↓
Consumers read at their own positions
```

Events are appended to a stream and may be retained for later consumption or replay, depending on the implementation.

---

## Independent Communication Dimensions

Communication approaches can be described along multiple dimensions.

```text
Direct vs. indirect
→ participant coupling

Synchronous vs. asynchronous
→ timing relationship

One-to-one vs. one-to-many
→ delivery cardinality

Transient vs. durable
→ message retention
```

These dimensions should not be treated as equivalent.

- Direct communication is not always synchronous.
- Messaging is not inherently asynchronous in every API.
- Publish / Subscribe does not inherently guarantee persistence.
- Event streaming and Publish / Subscribe can overlap, but they emphasize different capabilities.

---

## Pattern vs. Protocol vs. Technology

```text
Communication pattern
→ describes how information flows

Protocol
→ defines communication rules and message exchange

Technology
→ provides concrete capabilities

Implementation
→ applies them in a specific system
```

### Request / Response Example

```text
Request / Response
→ communication pattern

HTTP
→ protocol

NestJS and Axios
→ framework and library

GET /patients controller and client request
→ concrete implementation
```

### Publish / Subscribe Example

```text
Publish / Subscribe
→ messaging/communication pattern

Broker + topics + subscriptions
→ communication mechanism

Kafka
→ technology

OrderCreated topic, producer configuration,
consumer groups, and application handlers
→ concrete implementation
```

One technology may support several communication patterns, and one pattern may be implemented through many technologies.

---

## Comparison

| Pattern | Typical relationship | Common timing | Common use |
| --- | --- | --- | --- |
| Request / Response | Direct | Synchronous | Queries and immediate operations |
| Point-to-Point | Indirect, one message per consumer group | Asynchronous | Work distribution |
| Publish / Subscribe | Indirect, one-to-many | Asynchronous | Notifications and fan-out |
| Event Streaming | Indirect, retained sequence | Asynchronous | Event history and stream processing |
| Polling | Direct, repeated requests | Periodic | Status checks |
| Webhook | Direct callback | Asynchronous from the original workflow | Cross-system notifications |

These are common characteristics, not universal constraints.

---

## Relationship to Design Patterns

Communication patterns and design patterns are sibling categories that can be combined.

```text
Design Pattern
→ How should objects or components collaborate?

Communication Pattern
→ How should participants exchange information?
```

Observer is a behavioral design pattern that organizes notification between a subject and its observers. Publish / Subscribe is a messaging pattern that organizes indirect message delivery through communication infrastructure.

---

## Relationship to Architectural Styles

A communication pattern describes an interaction. An architectural style organizes the major components of an entire system.

```text
Publish / Subscribe
→ messaging/communication pattern

Event-Driven Architecture
→ architectural style that may use Publish / Subscribe
```

Using one communication pattern does not determine the architecture of the whole system.

---

## Key Takeaways

- Communication patterns describe how participants exchange information.
- Messaging patterns are a more specific kind of communication pattern.
- Direct/indirect and synchronous/asynchronous are separate dimensions.
- Protocols and technologies implement or support patterns; they are not the patterns themselves.
- Publish / Subscribe is a messaging/communication pattern, not a GoF design pattern.
- Communication patterns can support architectural styles without being architectural styles themselves.

---

## Related Concepts

- [Software Taxonomy](../computer-science-foundations/software-taxonomy.md)
- [Software Architecture](../computer-science-foundations/software-architecture.md)
- [Architectural Styles](../architectural-styles/README.md)
- [Architectural Patterns](../architectural-patterns/README.md)
- [Publish / Subscribe](publish-subscribe.md)
- [Observer Pattern](../design-patterns/observer-pattern.md)
- [Event-Driven Architecture](../architectural-styles/event-driven-architecture.md)
- [Gang of Four Design Patterns](../design-patterns/gang-of-four-design-patterns.md)
