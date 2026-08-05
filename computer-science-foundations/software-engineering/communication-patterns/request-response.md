# Request / Response

## Purpose

This document introduces Request / Response as a communication pattern and distinguishes it from Publish / Subscribe, Observer, and architectural styles.

The primary focus is direct Request / Response. A later section explains the broader asynchronous Request / Reply variation.

---

## Taxonomy Classification

- **Primary category:** Communication Pattern
- **Type:** Direct Communication Pattern
- **Field:** Software Engineering
- **Area:** Communication Patterns
- **Scope:** One interaction between a requester and responder

---

## Definition

Request / Response is a communication pattern in which one participant sends a request to a known logical receiver and expects a corresponding outcome.

```text
Requester
    ↓ request
Responder
    ↓ response
Requester
```

Examples include:

```text
Browser
    ↓ HTTP request
Server
    ↓ HTTP response
Browser
```

and:

```text
Order Service
    ↓ payment request
Payment Service
    ↓ payment result
Order Service
```

---

## Core Roles

- **Requester:** Initiates the interaction.
- **Responder:** Processes the request and produces a response.
- **Request:** Describes the required data or operation.
- **Response:** Communicates a successful or unsuccessful result.

The transport or communication channel is a supporting mechanism rather than one of the participant roles.

```text
Core Roles
├── Requester
├── Responder
├── Request
└── Response

Supporting Mechanism
└── Transport or communication channel
```

---

## Mental Model

Think of asking a specific person a question.

```text
Requester
    ↓
“Can you perform this operation?”
    ↓
Known responder
    ↓
Result or error
```

```text
Ask
    ↓
Process
    ↓
Answer
```

---

## Requester

The Requester initiates the communication.

It generally knows:

- Which logical capability or endpoint it needs.
- What operation or data it wants.
- How to interpret the response.

The requester may not know which physical service instance handles the request. Service discovery, gateways, and load balancers can hide that detail.

In another interaction, the same participant may act as the responder.

---

## Responder

The Responder receives and processes the request.

```text
Payment Service
        ↓
Receives payment request
        ↓
Processes payment
        ↓
Returns result
```

A responder may return requested data, an operation result, or an application-level error.

---

## Request

A Request communicates what the requester needs.

```text
GET /patients
GET /current-user
POST /login
PATCH /patients/:id
DELETE /patients/:id
```

A request may retrieve, create, update, or delete data, or ask the responder to perform another operation.

---

## Response and Other Outcomes

A Response communicates the responder's outcome.

Examples include:

```text
Patient list
Authenticated user
Successful deletion
Validation error
Unauthorized response
```

The requester may also observe outcomes that are not responses produced by the responder:

- Transport failure.
- Timeout.
- Cancellation.
- Connection loss.

```text
Request sent
        ↓
Responder returns a response
        or
Communication fails before a response arrives
```

---

## Direct Request / Response

In the direct form, the requester addresses a known logical endpoint.

```text
Requester
        ↓
Known logical capability
        ↓
Responder
```

Supporting infrastructure may still participate:

```text
Client
    ↓
API Gateway
    ↓
Service Discovery and Load Balancer
    ↓
Physical service instance
```

The requester knows the capability it is calling without necessarily knowing the final physical address.

---

## Asynchronous Request / Reply

Request/Reply can also be implemented asynchronously through messaging infrastructure.

```text
Requester
    ↓ request with correlation identifier
Request queue
    ↓
Responder
    ↓ correlated reply
Reply queue
    ↓
Requester
```

Possible coordination mechanisms include:

- Correlation identifiers.
- Response queues.
- Callbacks.
- Polling.
- Deferred-result resources.

This document uses **Request / Response** for the common direct form while acknowledging the broader Request / Reply family.

---

## HTTP Example

```text
Browser
    ↓
GET /patients
    ↓
API server
    ↓
Patient data
    ↓
Browser
```

```text
Request / Response
→ communication pattern

HTTP
→ protocol

Browser and API implementation
→ concrete participants
```

---

## Synchronous Business Dependency

Request / Response is commonly synchronous from the business-flow perspective.

```text
Requester sends request
        ↓
Requester waits for the required outcome
        ↓
Responder responds
        ↓
Requester continues
```

This does not mean a runtime thread must remain blocked.

```ts
const response = await fetch('/patients')
```

```text
await fetch(...)
→ asynchronous runtime operation

Next step depends on the response
→ synchronous dependency in the business flow
```

Request / Response is not inherently synchronous; the distinction depends on the implementation and on whether later work depends immediately on the response.

---

## TanStack Query Example

A TanStack Query query function commonly performs Request / Response.

```tsx
useQuery({
  queryKey: ['patients'],
  queryFn: getPatients,
})
```

```text
TanStack Query
        ↓ calls
getPatients()
        ↓ sends request
API server
        ↓ returns response
TanStack Query cache
```

TanStack Query adds caching, retries, freshness, cancellation, and subscriptions around the asynchronous operation. A query function can perform other asynchronous work; network Request / Response is common but not mandatory.

---

## Mutation Example

```tsx
useMutation({
  mutationFn: requestLogin,
})
```

```text
Login mutation
        ↓
POST /login
        ↓
Authentication server
        ↓
Authenticated user or error
        ↓
Mutation result
```

A mutation function commonly uses Request / Response, but the mutation abstraction is not tied to one communication mechanism.

---

## Microservice Example

```text
Order Service
        ↓ unary HTTP or gRPC request
Payment Service
        ↓ payment response
Order Service
```

Unary gRPC follows a Request / Response interaction. gRPC also supports server, client, and bidirectional streaming, which use different communication shapes.

The direct call creates a runtime dependency when the Order Service cannot continue without the Payment Service's result.

---

## Who Delivers the Request?

Delivery depends on the environment.

```text
Browser to API
→ HTTP networking stack

Service to service
→ HTTP or gRPC infrastructure

Client through gateway
→ API Gateway and network routing
```

Direct Request / Response does not normally require a message broker, although broker-mediated Request / Reply is also possible.

---

## Relationship to Publish / Subscribe

| Request / Response | Publish / Subscribe |
| --- | --- |
| Requester addresses a known logical capability | Publisher does not know individual subscribers |
| Expects one correlated outcome | Publishes without expecting subscriber results |
| Commonly one responder | Independent subscriptions may receive the message |
| Usually direct | Usually intermediary-mediated |
| Useful when progress depends on the result | Useful for independent reactions |

```text
Request / Response
→ direct question and correlated outcome

Publish / Subscribe
→ indirect message distribution
```

---

## Relationship to Event-Driven Architecture

Request / Response can coexist with Event-Driven Architecture.

```text
Order Service
      │
      ├─────────────────┐
      │                 │
      ▼                 ▼
Payment Service     OrderCreated
Request / Response      ↓
                      Broker
                        ↓
             Inventory, Email, Analytics
```

```text
Request / Response
→ communication pattern

Event-Driven Architecture
→ architectural style that may combine events
  with Request / Response
```

---

## Relationship to Microservice Architecture

Microservices may communicate directly, indirectly, or through both approaches.

```text
Direct dependency
→ Request / Response

Independent asynchronous reactions
→ messaging or event-driven communication
```

Microservice Architecture does not require a message broker and does not require every interaction to use Request / Response.

---

## Relationship to the Observer Pattern

Observer is a behavioral design pattern that organizes notification between a subject and its registered observers.

```text
Observer
→ ongoing notification relationship

Request / Response
→ one requester asks and one responder answers
```

---

## Relationship to Browser Events

A browser click event is not Request / Response.

```text
User clicks
        ↓
Browser dispatches event
        ↓
Listeners react
```

An event handler may initiate a Request / Response operation:

```text
Button click
        ↓
Event handler
        ↓
HTTP request
        ↓
Server response
```

Different communication mechanisms can be composed within one workflow.

---

## Reliability Concerns

Direct Request / Response creates temporal coupling when the requester cannot continue until a responder is reachable and returns an acceptable outcome.

Important concerns include:

- Timeouts.
- Cancellation.
- Retry policies.
- Idempotency.
- Circuit breaking.
- Contract versioning.
- Authentication and authorization.
- Distributed tracing.
- Latency and cascading failure.

Retrying a non-idempotent operation can duplicate side effects unless the API provides an idempotency mechanism.

```text
Service A
    ↓ waits for
Service B
    ↓ waits for
Service C
    ↓

Total latency and failure risk accumulate
```

Independent requests should not be serialized unnecessarily:

```text
Independent requests executed sequentially
→ unnecessary latency

Independent requests executed concurrently
→ shorter total waiting time
```

---

## Benefits and Trade-Offs

| Potential benefit | Potential trade-off |
| --- | --- |
| Clear caller and responder | Direct runtime dependency |
| Correlated result | Requester may wait or fail on timeout |
| Straightforward control flow | Long call chains accumulate latency |
| Immediate validation or result | Retries can duplicate non-idempotent work |
| Familiar protocol support | Contract changes require coordination |

Asynchronous messaging can reduce direct and temporal coupling, but it introduces message contracts, delivery semantics, failure handling, and consistency concerns of its own.

---

## Key Takeaways

- Request / Response is a communication pattern.
- The requester addresses a known logical capability and expects a correlated outcome.
- The requester may not know the physical service instance.
- Request / Response is commonly synchronous in business flow but is not inherently synchronous.
- HTTP and unary gRPC commonly implement the pattern.
- TanStack Query commonly wraps Request / Response operations with server-state management.
- Direct calls introduce temporal dependencies, timeout concerns, and cascading-failure risks.
- Request / Response can coexist with Publish / Subscribe and Event-Driven Architecture.

---

## Related Concepts

- [Communication Patterns](README.md)
- [Software Taxonomy](../software-taxonomy.md)
- [TanStack Query](../../../framework-tooling/tanstack-query.md)
- [Publish / Subscribe](publish-subscribe.md)
- [Event-Driven Architecture](../architectural-styles/event-driven-architecture.md)
- [Microservice Architecture](../architectural-styles/microservice-architecture.md)
- [Observer Pattern](../design-patterns/observer-pattern.md)
