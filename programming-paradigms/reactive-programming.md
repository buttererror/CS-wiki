# Reactive Programming

## Purpose

This document introduces Reactive Programming based on concepts discussed while learning TanStack Query and event-driven systems.

It also distinguishes Reactive Programming from the Observer Pattern, Publish / Subscribe, React, and TanStack Query.

---

## Taxonomy Classification

- **Primary category:** Programming Paradigm
- **Abstraction level:** Conceptual
- **Broader concept:** Programming Paradigms

Reactive Programming describes a broad way of expressing programs. It does not describe one specific design pattern, messaging pattern, library, or framework.

---

## Definition

Reactive Programming is a programming paradigm that models software around values or events that change over time.

Instead of repeatedly asking whether something has changed, the program reacts when a new value or event occurs.

```text
Traditional checking

Has something changed yet?

Reactive model

Something changed
        ↓
Interested computations react
```

Reactive Programming focuses on:

```text
values over time
```

rather than only:

```text
the current value
```

---

## Core Concepts

### Value-Change Propagation

When a value changes, that change propagates to dependent parts of the program.

### Event Stream

Events or values can be treated as a sequence that develops over time.

### Subscription

Interested participants register to receive relevant updates.

### Reactive Pipeline

Changes can pass through a sequence of operations before reaching interested participants.

These concepts commonly appear in reactive systems, but a particular reactive implementation does not need to expose all of them in the same way.

---

## Mental Model

```text
Value or event changes
        ↓
The change is propagated
        ↓
Interested parts receive it
        ↓
They react
```

---

## Example: Search While Typing

A search input can be modeled as a sequence of changing values.

```text
Keyboard events
        ↓
Optional: debounce rapid input
        ↓
Optional: ignore duplicate values
        ↓
Optional: cancel the previous request
        ↓
Fetch search results
        ↓
Update the UI
```

The developer describes how input changes should flow through the system. Each new value can move through the pipeline, and later operations react to it.

Debouncing, duplicate filtering, and cancellation are useful pipeline operations for this example; they are not requirements of Reactive Programming itself.

---

## Comparison with Object-Oriented Programming

Object-Oriented Programming models a system through objects that own state and expose behavior.

```ts
class SearchBox {
  private query = ''

  setQuery(value: string) {
    this.query = value
    this.search()
  }

  private search() {
    api.search(this.query)
  }
}
```

Mental model:

```text
Object
    ↓
Owns state
    ↓
Provides methods
    ↓
Collaborates with other objects
```

The focus is on objects and method calls.

---

## Comparison with Functional Programming

Functional Programming models a solution as transformations applied to data.

```ts
const normalize = (text: string) =>
  text.trim().toLowerCase()

const query = normalize(input)
```

Mental model:

```text
Input
    ↓
Function
    ↓
Transformed value
    ↓
Another function
    ↓
Result
```

The focus is on transforming data through functions.

---

## Comparison Summary

```text
Object-Oriented Programming
→ Objects own state and call methods.

Functional Programming
→ Functions transform values.

Reactive Programming
→ Changing values flow over time, and dependent operations react.
```

These paradigms are not mutually exclusive. A reactive library may use objects internally, functional operators for transformations, and subscriptions for change propagation.

---

## Relationship to the Observer Pattern

Reactive Programming is not the Observer Pattern.

Observer is a behavioral design pattern that can support reactive change propagation.

```text
Reactive Programming
        ↓ may use
Observer Pattern
```

Observer answers:

> How can one object notify interested objects when something changes?

Reactive Programming answers:

> How is a program modeled around changing values and the propagation of those changes?

Observer describes a recurring collaboration between a subject and its observers. Reactive Programming describes a broader programming model.

---

## Relationship to Publish / Subscribe

Reactive Programming is not the same as Publish / Subscribe.

Publish / Subscribe is a messaging pattern that may be used to deliver events to interested subscribers.

```text
Reactive Programming
        ↓ may use
Publish / Subscribe
```

A typical Publish / Subscribe flow is:

```text
Publisher
    ↓
Broker or event bus
    ↓
Topic or channel
    ↓
Subscribers
```

The communication infrastructure decouples publishers from subscribers. Implementations vary: some use a broker, while others use an in-process event bus or a similar intermediary.

Reactive Programming may use this mechanism, but using Publish / Subscribe alone does not make an entire program reactive.

---

## Observer and Publish / Subscribe Are Not Exclusive to Reactive Programming

Observer and Publish / Subscribe can appear outside programs modeled primarily with Reactive Programming.

Examples include:

```text
DOM event listeners
Node.js EventEmitter
Redux subscriptions
TanStack Query observers
Kafka messaging
RabbitMQ messaging
```

These systems use notification or event-delivery mechanisms, but each individual use does not necessarily make the entire application reactive.

A useful distinction is:

```text
Observer / Publish / Subscribe
→ How is a change or message delivered?

Reactive Programming
→ How is the program modeled around values and events changing over time?
```

---

## Relationship to React

React exhibits reactive behavior because state changes can schedule component renders.

```text
State changes
    ↓
React schedules a component render
    ↓
The UI reflects the new state
```

However, React is not equivalent to a general-purpose Reactive Programming library built around observable streams.

Typical React code focuses on:

```text
state
    ↓
rendered UI
```

Reactive stream programming focuses on:

```text
events or values over time
    ↓
operations and transformations
    ↓
subscribers
```

React uses reactive ideas for UI rendering, but its primary abstraction is the component and render model rather than a general-purpose stream pipeline.

---

## Relationship to TanStack Query

TanStack Query exhibits reactive behavior because components respond to query-state changes.

```text
Query cache changes
        ↓
Query observers are notified
        ↓
React receives the new query result
        ↓
Subscribed components re-render
```

For example:

```ts
queryClient.setQueryData(
  ['auth', 'current-user'],
  authenticatedUser,
)
```

This changes the cached current-user value. Components using the corresponding query receive the updated result and re-render.

```text
Login succeeds
        ↓
Current-user cache changes
        ↓
Query observer receives the change
        ↓
Component receives the new user
        ↓
UI reacts
```

TanStack Query is not a general-purpose Reactive Programming library. Its primary purpose is synchronizing server state with the UI, but it uses observer-based reactive behavior to perform that synchronization.

---

## Why It Matters

Understanding Reactive Programming explains why systems such as TanStack Query can update components without application code manually checking for changes.

It also separates three abstraction levels:

```text
Reactive Programming
→ programming paradigm

Observer Pattern
→ behavioral design pattern

Publish / Subscribe
→ messaging pattern
```

The paradigm may use these patterns, but they are not interchangeable.

---

## Key Takeaways

- Reactive Programming models software around values or events that change over time.
- Changes propagate to interested parts of the program.
- Reactive pipelines may transform, filter, delay, combine, or cancel work associated with those changes.
- Observer is a behavioral design pattern that can propagate changes directly.
- Publish / Subscribe is a messaging pattern that decouples publishers from subscribers.
- React exhibits reactive UI-rendering behavior.
- TanStack Query uses observers and reactive behavior to synchronize server state with React components.
- Using an observer or messaging mechanism does not automatically make an entire application reactive.

---

## Relationships to Other Areas

- **Observer Pattern:** Provides direct notification between a subject and its observers.
- **Publish / Subscribe:** Delivers events indirectly through communication infrastructure such as a broker or event bus.
- **React rendering:** Updates the UI when state changes.
- **TanStack Query:** Uses query observers to synchronize cached server state with React components.
- **Event-Driven Architecture:** Organizes major system components around producing and consuming events at a system-wide architectural level.

---

## Related Concepts

- [Programming Paradigm](programming-paradigm.md)
- [Software Taxonomy](../computer-science-foundations/software-taxonomy.md)
- [Gang of Four Design Patterns](../design-patterns/gang-of-four-design-patterns.md)
- [Observer Pattern](../design-patterns/observer-pattern.md)
- [Messaging and Communication Patterns](../messaging-patterns/communication-patterns.md)
- [Publish / Subscribe](../messaging-patterns/publish-subscribe.md)
- [Event-Driven Architecture](../architectural-styles/event-driven-architecture.md)
- [TanStack Query](../framework-tooling/tanstack-query.md)
