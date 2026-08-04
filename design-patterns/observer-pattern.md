# Observer Pattern

## Purpose

This document introduces the Observer Pattern based on discussions while learning TanStack Query, browser events, and reactive systems.

---

## Taxonomy Classification

- **Primary category:** Design Pattern
- **Area:** Design Patterns
- **Type:** Behavioral
- **Abstraction level:** Component and object collaboration

The Observer Pattern is a behavioral design pattern used when one object needs to notify multiple interested participants about a change.

---

## Core Concepts

- **Subject:** Owns the state and manages observers.
- **Observer:** Receives notifications when the subject changes.
- **Subscriber:** Registers to receive updates in APIs that use subscription terminology.
- **Subscription:** Represents the active registration between a subject and an interested participant.
- **Notification:** Delivers a change to registered observers.

The terms **observer** and **subscriber** overlap in many APIs, but they are not universally identical. Observer names the design-pattern role, while subscriber emphasizes the act of registering for updates.

---

## Definition

The Observer Pattern is a behavioral design pattern.

It solves this recurring problem:

> How can one object notify multiple interested objects when its state changes?

Instead of observers repeatedly checking whether something changed, they register once and are notified when a change occurs.

```text
Repeated checking

Observer
    ↓
Did the subject change?
    ↓
Check again
    ↓
Check again
```

```text
Observer model

Observer subscribes
        ↓
Subject changes
        ↓
Subject notifies observer
        ↓
Observer reacts
```

---

## Mental Model

Think of a newsletter.

```text
Newsletter
    ↓
Subscribers
```

Subscribers do not repeatedly ask whether there is a new edition. They register once, and the newsletter sends each new edition to them.

```text
Subject
    ↓
Notification
    ↓
Observers
```

---

## Core Roles

### Subject

The Subject owns the changing state.

It is responsible for:

- Storing registered observers.
- Adding new observers.
- Removing observers.
- Notifying observers when the state changes.

```text
Subject

Observers:
- ObserverA
- ObserverB
- ObserverC
```

### Observer

An Observer is the object or callback that receives a notification.

```text
Subject changes
        ↓
Observer receives notification
        ↓
Observer performs behavior
```

### Subscriber

A Subscriber is a participant that registers to receive notifications.

```text
Observer
→ the design-pattern role that receives updates

Subscriber
→ a participant described in terms of registration
```

An API may use either term depending on the abstraction it emphasizes.

### Subscription

A Subscription is the active registration created when a participant subscribes.

```text
Subscriber
    ↓ subscribe()
Subject
```

The subscription normally remains active until it is removed.

```text
Subscription active
        ↓
Notifications are received

unsubscribe()
        ↓
Subscription ends
        ↓
Notifications stop
```

---

## Example: Observable Value

The Observer Pattern can be implemented by storing listener functions in a collection.

```ts
type Listener<T> = (value: T) => void

class ObservableValue<T> {
  private value: T
  private listeners = new Set<Listener<T>>()

  constructor(initialValue: T) {
    this.value = initialValue
  }

  getValue(): T {
    return this.value
  }

  subscribe(listener: Listener<T>): () => void {
    this.listeners.add(listener)

    return () => {
      this.listeners.delete(listener)
    }
  }

  setValue(value: T): void {
    this.value = value

    for (const listener of this.listeners) {
      listener(value)
    }
  }
}
```

Usage:

```ts
const currentUser = new ObservableValue<string | null>(null)

const unsubscribe = currentUser.subscribe((user) => {
  console.log('Current user changed:', user)
})

currentUser.setValue('Mahmoud')
currentUser.setValue(null)

unsubscribe()
```

---

## How the Example Works

The observable value is the Subject:

```ts
const currentUser = new ObservableValue<string | null>(null)
```

The callback is the Observer:

```ts
(user) => {
  console.log('Current user changed:', user)
}
```

Calling `subscribe()` registers that observer, and the Subject stores it in its listener collection.

When the value changes, the Subject loops through its listeners and passes the new value to each observer.

The function returned by `subscribe()` removes the observer:

```ts
const unsubscribe = currentUser.subscribe(...)

unsubscribe()
```

---

## Communication Flow

```text
Observer calls subscribe()
        ↓
Subject stores observer
        ↓
Subject state changes
        ↓
Subject loops through observers
        ↓
Each observer is notified
        ↓
Observers react
```

The Subject is responsible for delivering the notification. There is no separate broker between the Subject and the Observer.

---

## Relationship to Reactive Programming

The Observer Pattern is related to Reactive Programming, but they are not the same concept.

```text
Reactive Programming
        ↓ may use
Observer Pattern
```

Reactive Programming is a programming paradigm concerned with changing values and events over time.

Observer is a design pattern that answers:

> How can a source notify interested participants when something changes?

Using Observer does not automatically make the entire application reactive. DOM event listeners, for example, use observer-like behavior without making every application a Reactive Programming system.

---

## Relationship to Publish / Subscribe

Observer and Publish / Subscribe both notify interested participants, but they are different patterns.

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

Important distinctions include:

- In Observer, the Subject directly manages or knows how to reach its observers.
- In Publish / Subscribe, communication infrastructure manages subscriptions and delivery.
- Observer commonly represents direct, in-process collaboration.
- Publish / Subscribe introduces greater decoupling and may operate locally or across a distributed system.

The presence of an intermediary is useful for distinguishing the patterns, but ownership, direct knowledge, and delivery responsibility also matter.

---

## Relationship to TanStack Query

TanStack Query uses an observer-based model to connect query state with React components.

When a component calls:

```tsx
useQuery({
  queryKey: ['auth', 'current-user'],
  queryFn: getCurrentUser,
})
```

the conceptual flow is:

```text
Component calls useQuery
        ↓
A QueryObserver watches the query
        ↓
The query cache changes
        ↓
The observer receives the new result
        ↓
React is notified
        ↓
The component re-renders
```

When the cache is changed directly:

```ts
queryClient.setQueryData(
  ['auth', 'current-user'],
  authenticatedUser,
)
```

the related observers receive the updated query result.

---

## Relationship to React

A React component using `useQuery()` does not need to create its own manual subscription. The query hook handles that connection internally.

A simplified conceptual model is:

```ts
function useSimplifiedQuery<T>(query: Query<T>): T {
  return useSyncExternalStore(
    (notifyReact) => query.subscribe(notifyReact),
    () => query.getCurrentValue(),
  )
}
```

```text
External query state changes
        ↓
Subscription callback runs
        ↓
React reads the latest snapshot
        ↓
React re-renders
```

This is only a simplified mental model. The real TanStack Query implementation includes additional behavior and abstractions.

---

## Relationship to Browser Events

Browser events use an observer-like notification model.

```ts
button.addEventListener('click', handleClick)
```

```text
Listener is registered
        ↓
User clicks
        ↓
Browser receives the input event
        ↓
Browser identifies the target element
        ↓
Browser dispatches the event
        ↓
Registered listener executes
```

This resembles Observer, although the browser event system is not necessarily a strict implementation of the GoF pattern.

---

## Other Examples Discussed

```text
React Context
→ consumers react to context changes

Redux
→ components subscribe to store changes

Node.js EventEmitter
→ listeners subscribe to named events

DOM events
→ event listeners react to browser events

TanStack Query
→ QueryObservers react to query-cache changes
```

These systems use similar notification principles even though their implementations differ.

---

## Why It Matters

The Observer Pattern explains how one changing source can update many dependent parts without repeated checking.

It helps explain:

- How TanStack Query updates components.
- How browser event listeners work.
- How Redux store subscriptions work.
- How reactive systems propagate changes.
- Why components do not need to poll for updates.

---

## Related Concepts

- [Software Taxonomy](../computer-science-foundations/software-taxonomy.md)
- [Gang of Four Design Patterns](gang-of-four-design-patterns.md)
- [Reactive Programming](../programming-paradigms/reactive-programming.md)
- [Communication Patterns](../communication-patterns/README.md)
- [Publish / Subscribe](../communication-patterns/publish-subscribe.md)
- [TanStack Query](../framework-tooling/tanstack-query.md)
- Browser Event System — future note
