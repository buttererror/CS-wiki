# Observer Pattern — Wikipedia Study Notes

**Keywords:** Observer Pattern, Observer design pattern, behavioral design pattern, subject, observer, listener, subscriber, subscription, `attach()`, `detach()`, `notify()`, `update()`, one-to-many dependency, lapsed listener, Publish–Subscribe

## Purpose and Source

This page is an original study guide based on the topics covered by Wikipedia's [Observer pattern](https://en.wikipedia.org/wiki/Observer_pattern) article. It reorganizes and explains those ideas in the terminology used by this wiki; it is not a verbatim copy of the source.

For the canonical explanation used throughout this knowledge base, see [Observer Pattern](observer-pattern.md).

## Taxonomy Classification

- **Primary category:** Design pattern
- **Gang of Four category:** Behavioral pattern
- **Area:** Software design
- **Abstraction level:** Object and component collaboration

Observer describes a recurring object-level collaboration. It is not an architectural style, although architectures and frameworks can use observer-like mechanisms internally.

## Intent

The Observer Pattern defines a one-to-many dependency between a changing object and the objects interested in that change.

```text
One Subject changes
        ↓
Notifies zero or more Observers
        ↓
Each Observer reacts or synchronizes its state
```

The subject depends on a common observer contract rather than on each observer's concrete class. Observers can therefore be registered and removed without teaching the subject about every possible reaction.

## Problem

Suppose several parts of a program must react whenever one object's state changes. A direct implementation might make that object call a different concrete method for every dependent component:

```text
Order calls EmailPanel.refresh()
Order calls AuditLogger.recordOrderChange()
Order calls StockDisplay.recalculate()
```

That design makes `Order` aware of unrelated concrete components. Adding another reaction requires modifying `Order`, and testing it may require constructing all those dependencies.

Observer replaces those concrete calls with a stable notification contract:

```text
Order
  → notify observers
      → Email observer
      → Audit observer
      → Stock observer
```

This reduces coupling to concrete implementations, but it does not eliminate coupling entirely. The subject still owns or can reach its observer collection and both sides agree on a notification interface.

## Participants

### Subject

The subject owns the relevant state or emits the relevant event. It normally provides operations to:

- register an observer;
- unregister an observer; and
- notify all currently registered observers.

### Observer

An observer implements the notification contract. When notified, it may use the supplied data or read the subject's current state.

### Concrete Subject

A concrete subject stores application state and decides when a change should trigger notification.

### Concrete Observer

A concrete observer performs a particular reaction, such as updating a display, recording an audit entry, or recalculating a derived value.

## Collaboration Flow

```text
Observer A ── subscribe ──┐
Observer B ── subscribe ──┼──→ Subject
Observer C ── subscribe ──┘

Subject state changes
        ↓
Subject iterates over registered observers
        ↓
Subject calls the notification contract
        ↓
Observers react
```

Notification is commonly direct and synchronous: the subject calls each observer before its own operation finishes. An implementation can queue notifications and deliver them asynchronously, but that adds scheduling, ordering, failure, and consistency concerns beyond the basic pattern.

## Push and Pull Variants

### Push model

The subject includes the changed information in the notification.

```ts
type PriceObserver = (newPrice: number) => void
```

The observer receives what it needs immediately. Sending too much data, however, can expose details that some observers do not need.

### Pull model

The subject sends a minimal notification, and each observer asks for the state it needs.

```ts
interface PriceObserver {
  update(product: Product): void
}
```

This lets observers choose what to read, but it may cause repeated state queries and gives observers greater knowledge of the subject's interface.

## Example: A Typed Subject in TypeScript

The following example is written specifically for this study guide.

```ts
interface Observer<T> {
  update(value: T): void
}

class Subject<T> {
  private readonly observers = new Set<Observer<T>>()

  attach(observer: Observer<T>): () => void {
    this.observers.add(observer)

    return () => {
      this.observers.delete(observer)
    }
  }

  protected notify(value: T): void {
    for (const observer of this.observers) {
      observer.update(value)
    }
  }
}

class TemperatureSensor extends Subject<number> {
  private temperature = 0

  setTemperature(value: number): void {
    this.temperature = value
    this.notify(this.temperature)
  }
}

class TemperatureDisplay implements Observer<number> {
  update(value: number): void {
    console.log(`Temperature: ${value}°C`)
  }
}

const sensor = new TemperatureSensor()
const display = new TemperatureDisplay()
const unsubscribe = sensor.attach(display)

sensor.setTemperature(24)
unsubscribe()
sensor.setTemperature(25) // The display is no longer notified.
```

### Mapping the example to the pattern

```text
Subject contract       → Subject<T>
Concrete Subject       → TemperatureSensor
Observer contract      → Observer<T>
Concrete Observer      → TemperatureDisplay
Registration           → attach()
Deregistration          → returned unsubscribe function
Notification           → notify()
Observer reaction      → update()
```

## Example: Functions as Observers

Object-oriented interfaces are not required. A callback can occupy the observer role:

```ts
type Listener<T> = (value: T) => void

class ObservableValue<T> {
  private readonly listeners = new Set<Listener<T>>()

  constructor(private value: T) {}

  subscribe(listener: Listener<T>): () => void {
    this.listeners.add(listener)
    listener(this.value)

    return () => {
      this.listeners.delete(listener)
    }
  }

  set(value: T): void {
    this.value = value

    for (const listener of this.listeners) {
      listener(value)
    }
  }
}

const online = new ObservableValue(false)

const stopLogging = online.subscribe((isOnline) => {
  console.log(isOnline ? 'Connected' : 'Disconnected')
})

online.set(true)
stopLogging()
```

Here, `ObservableValue` is the subject and each listener function is an observer. The returned cleanup function makes the lifetime of the subscription explicit.

## Example: Browser Event Listeners

Browser event handling has observer-like behavior:

```ts
const button = document.querySelector('button')

function handleClick(event: MouseEvent): void {
  console.log('Clicked at:', event.clientX, event.clientY)
}

button?.addEventListener('click', handleClick)
button?.removeEventListener('click', handleClick)
```

The browser manages listener registration and dispatches events to matching listeners. This is a useful analogy, but the DOM event system also includes capturing, bubbling, event targets, and propagation rules that are not part of the basic Gang of Four pattern.

## Observer and Publish–Subscribe

The patterns share one-to-many notification, so their terminology is often mixed. Their usual structures differ.

| Concern | Observer | Publish–Subscribe |
| --- | --- | --- |
| Connection | Subject manages or directly reaches observers | A broker or event bus mediates delivery |
| Participant knowledge | Subject knows its observer contract | Publishers and subscribers need not know one another |
| Common scope | In-process object or component collaboration | Local or distributed messaging |
| Delivery | Commonly direct and synchronous | Commonly indirect and often asynchronous |
| Filtering | Usually handled by the subject or observers | Often handled by topics, channels, or broker rules |

Observer:

```text
Subject → Observer A
        → Observer B
```

Publish–Subscribe:

```text
Publisher → Broker → Subscriber A
                   → Subscriber B
```

These are common characteristics, not universal laws. A particular library can combine both models or use their names differently. See [Publish / Subscribe](../communication-patterns/publish-subscribe.md) for the canonical communication-pattern explanation.

## Benefits

- A subject can notify an open-ended set of observers.
- Concrete observers can be added without changing the subject.
- Registration can change at runtime.
- The subject and observers collaborate through a small, stable contract.
- One state change can coordinate several independent reactions.

## Limitations and Design Risks

### Lapsed listeners and retained memory

If a long-lived subject holds a strong reference to an observer, the observer may remain reachable after the rest of the program has finished with it. Forgetting to unsubscribe can therefore retain memory and cause obsolete behavior.

Useful mitigations include:

- return an explicit cleanup function from `subscribe()`;
- tie cleanup to a component or resource lifecycle;
- use weak references only when their nondeterministic cleanup semantics fit the design; and
- test that disposed observers no longer receive notifications.

### Unspecified notification order

Observers should not silently depend on registration order unless the subject explicitly guarantees it. Otherwise, changing the observer collection can change program behavior.

### Slow or failing observers

With synchronous notification, one slow observer delays the subject and later observers. An exception from one observer may also stop the remaining notifications unless the subject defines an error policy.

### Cascading updates

An observer may change the subject again while a notification is in progress. This can cause re-entrant calls, duplicate work, cycles, or difficult-to-predict final state.

### Excessive notification frequency

A rapidly changing subject can overwhelm observers, especially user-interface rendering. Depending on the requirement, an implementation may batch, debounce, throttle, or coalesce updates. Those timing policies are additional mechanisms, not the essence of Observer itself.

### Hidden control flow

The source of a reaction may be less obvious than a direct function call. Clear naming, narrow events, diagnostics, and explicit subscription ownership help make the flow traceable.

## When to Use It

Observer is a reasonable choice when:

- several independent participants must react to one source;
- the participant set can change at runtime;
- the source should depend on a shared notification contract rather than concrete reactions; and
- direct, usually in-process notification matches the required delivery model.

Consider a different design when there is only one fixed dependent operation, when the flow must be explicit and sequential, or when the system requires durable distributed delivery, replay, routing, or delivery guarantees. Those requirements usually point toward direct orchestration or messaging infrastructure.

## Related Concepts

- [Observer Pattern](observer-pattern.md) — canonical wiki explanation
- [Gang of Four Design Patterns](gang-of-four-design-patterns.md)
- [Publish / Subscribe](../communication-patterns/publish-subscribe.md)
- [Reactive Programming](../programming-paradigms/reactive-programming.md)
- [Inversion of Control](../software-design-principles/inversion-of-control.md)

## Reference

- Wikipedia contributors, [“Observer pattern”](https://en.wikipedia.org/wiki/Observer_pattern), *Wikipedia, The Free Encyclopedia*. Accessed August 11, 2026.

This study guide summarizes and adapts concepts from that article in original wording. Wikipedia content is available under the [Creative Commons Attribution-ShareAlike License](https://creativecommons.org/licenses/by-sa/4.0/); consult the article's revision history for its contributors.
