# Reactivity Mechanisms: Vue and React as Case Studies

## Purpose

This document studies reactivity as a general software concept. Vue and React
are used as contrasting case studies rather than as the boundaries of the
subject.

It explains how JavaScript `Proxy` can support a reactivity system, why Vue 3
uses it, why React's state model works differently, and how both approaches
relate to broader reactive and stream-based models.

## Classification

- **Primary concept:** Reactive change propagation
- **Applied scope:** Frontend framework behavior
- **Underlying language mechanism:** JavaScript `Proxy`
- **Case studies:** Vue 3 and React
- **Abstraction level:** General mechanism with framework applications

The canonical introduction to the broader paradigm remains
[Reactive Programming](../../computer-science-foundations/software-engineering/programming-paradigms/reactive-programming.md).
This page focuses on the mechanisms that make reactive behavior possible in
user-interface systems. A proxy is one possible mechanism, not the definition
of reactivity.

## The Broader Idea

Reactivity is about expressing a relationship in which changes to a source can
propagate to dependent computations or effects.

Consider an ordinary JavaScript assignment:

```js
let B = 1
let C = 2
let A = B + C

B = 10

console.log(A) // still 3
```

`A = B + C` calculates a value once. It does not preserve a live relationship
between the variables. A reactive system needs some way to represent the
relationship, detect relevant changes, and update or invalidate `A`.

A spreadsheet formula is a useful mental model:

```text
A depends on B and C
        ↓
B changes
        ↓
A becomes stale or is recalculated
        ↓
Anything depending on A can react
```

In a user-interface system, an effect may be a component render or DOM update:

```text
State is read
    ↓
The framework records the dependency
    ↓
State changes later
    ↓
The framework reruns or schedules dependent work
    ↓
The UI is updated
```

The system therefore needs answers to several questions:

1. What are the changing **sources**?
2. Which computations or effects **depend** on each source?
3. How is a relevant change **detected or reported**?
4. Should dependent work run immediately, be invalidated, or be scheduled?

## Vocabulary of a Reactivity System

- **Reactive source:** A value whose changes can be observed by the system.
- **Dependency:** A source read or declared by a computation or effect.
- **Derived state:** A value calculated from other state.
- **Effect:** Work performed in response to dependencies, such as rendering,
  logging, storage, or a network request.
- **Dependency graph:** The runtime or static relationships between sources and
  their dependents.
- **Invalidation:** Marking derived work as stale because a dependency changed.
- **Scheduler:** Logic that decides when and in what order affected work runs.

These roles occur in many reactive systems even when their APIs and
implementations look very different.

## Ways to Implement Reactive Behavior

Reactivity does not require JavaScript proxies. Systems can use one or combine
several of these approaches:

- **Runtime property interception:** Proxies or getters/setters observe reads
  and writes. Vue uses this approach.
- **Explicit update notification:** The developer calls a setter or dispatch
  function to report a state transition. React uses this approach for built-in
  component state.
- **Explicit subscriptions and streams:** Producers emit values or events, and
  subscribers compose or react to them. RxJS is an example.
- **Compile-time analysis:** A compiler transforms code to insert tracking or
  update logic.

These are implementation strategies and programming models, not mutually
exclusive academic categories. A framework can combine them.

## What Is a JavaScript Proxy?

A JavaScript `Proxy` is an object that wraps another object and can intercept
operations performed on it. The wrapped object is called the **target**. The
object containing the interception functions is called the **handler**, and
those functions are called **traps**.

```js
const target = { count: 0 }

const state = new Proxy(target, {
  get(target, key, receiver) {
    console.log(`read: ${String(key)}`)
    return Reflect.get(target, key, receiver)
  },

  set(target, key, value, receiver) {
    console.log(`write: ${String(key)} = ${value}`)
    return Reflect.set(target, key, value, receiver)
  },
})

console.log(state.count) // invokes the get trap
state.count = 1          // invokes the set trap
```

The proxy does not repeatedly scan the object for changes. It stands between
the code and the target object, so operations performed through the proxy can
be intercepted as they happen.

`Reflect.get()` and `Reflect.set()` perform the corresponding normal object
operations while preserving JavaScript's receiver behavior. A production
reactivity system handles considerably more cases than this small example.

## How a Proxy Supports Reactivity

A simplified reactive proxy can use two important traps:

- `get` detects when a property is read and calls `track()`.
- `set` detects when a property is written and calls `trigger()`.

```js
function reactive(target) {
  return new Proxy(target, {
    get(target, key, receiver) {
      track(target, key)
      return Reflect.get(target, key, receiver)
    },

    set(target, key, value, receiver) {
      const previousValue = Reflect.get(target, key, receiver)
      const succeeded = Reflect.set(target, key, value, receiver)

      if (succeeded && !Object.is(previousValue, value)) {
        trigger(target, key)
      }

      return succeeded
    },
  })
}
```

Suppose an effect renders `state.count`:

```text
Render effect reads state.count
        ↓ get trap
track(target, "count") records the effect

state.count is changed
        ↓ set trap
trigger(target, "count") finds the recorded effect
        ↓
The framework schedules the effect to run again
```

The important distinction is:

```text
Proxy
→ intercepts object operations

Dependency tracking
→ records which effects read which properties

Triggering and scheduling
→ reruns or queues affected work after a change

Reactivity system
→ combines these mechanisms
```

A proxy alone only intercepts operations. It does not know which UI should
update unless the framework adds dependency tracking, effects, and scheduling.

## Vue 3

Vue 3 uses proxies for objects returned by `reactive()`. During a component's
render, reading a reactive property lets Vue track that property as a
dependency. Mutating it through the proxy lets Vue trigger the dependent work.

Vue is therefore a useful case study of **transparent runtime dependency
tracking**: application code reads and mutates ordinary-looking object
properties while the framework records relationships behind the scenes.

```js
import { reactive } from "vue"

const state = reactive({ count: 0 })

state.count += 1
```

Conceptually, the read and write pass through proxy traps:

```text
state.count
→ get trap
→ track the current effect as a dependency

state.count = 1
→ set trap
→ trigger effects that depend on count
```

Vue's actual implementation also handles nested objects, collections,
iteration, property addition and deletion, batching, and other edge cases.

Vue does not necessarily update the DOM synchronously after every mutation.
Component updates are scheduled and buffered so multiple state changes can be
batched. A computed value may also be invalidated and evaluated when its value
is next needed rather than eagerly recalculated at the moment of every change.

### Vue's Main Reactivity Primitives

- `ref()` creates a reactive container for any value and exposes it through
  `.value`. It is commonly used for primitives but can also hold objects.
- `reactive()` returns a reactive proxy for an object, including arrays and
  supported collection types.
- `computed()` represents cached derived state based on reactive dependencies.
- `watch()` runs side-effect logic when an explicitly selected reactive source
  changes.
- `watchEffect()` runs an effect immediately and automatically tracks the
  reactive values read during that execution.

### Important Consequences

#### The Proxy and Target Have Different Identities

`reactive()` returns a proxy rather than the original object:

```js
const original = { count: 0 }
const state = reactive(original)

console.log(state === original) // false
```

Only operations performed through the reactive proxy participate in Vue's
tracking. Mutating the original object directly bypasses that proxy.

#### Destructuring Can Disconnect a Primitive Value

```js
const state = reactive({ count: 0 })
const { count } = state
```

The read used during destructuring passes through the proxy once, but `count`
is then an ordinary local number. Later reads or assignments of the local
variable do not access `state.count`, so they cannot invoke its proxy traps.

This disconnect concerns the local binding. If a destructured value is itself
an object that Vue has made reactive, mutations through that nested proxy can
still be reactive.

#### `ref()` Uses a Related but Different Mechanism

Vue uses proxies for reactive objects, while a ref exposes a `.value` property
whose getter and setter provide interception points for tracking and
triggering. The shared idea is interception; the exact JavaScript mechanism is
different.

## React

React's built-in state model does not generally observe arbitrary property
reads and writes through proxies. It uses explicit state update APIs such as
the setter returned by `useState()`:

```jsx
const [state, setState] = useState({ count: 0 })

setState((previous) => ({
  ...previous,
  count: previous.count + 1,
}))
```

Calling the setter requests another render. React then calls the component
again with a new state snapshot and reconciles the resulting UI.

Direct mutation does not notify React:

```js
state.count += 1 // mutation alone does not request a render
```

React state should therefore be treated as immutable: create the next value
and pass it to the setter. React may skip an update when the next state is
identical to the current state according to `Object.is()`.

React is a useful case study of **explicit update notification**. The framework
does not build a property-level dependency graph by observing which fields a
component reads. Calling a state setter reports that the component has a next
state and queues rendering work; React then evaluates the component using a
new state snapshot and reconciles the result.

Some libraries used with React may employ proxies internally. For example, a
library can use them to record mutations and produce an immutable next state.
That does not mean React itself has adopted Vue-style property-level dependency
tracking.

## Vue and React Comparison

| Question | Vue 3 reactive object | React state |
| --- | --- | --- |
| How is a change reported? | A write through a reactive proxy is intercepted. | Code calls a state setter or dispatch function. |
| How are dependencies found? | Reactive reads are tracked while an effect runs. | Component structure, props, state, and explicit Hook dependencies guide React's work; ordinary property reads are not transparently tracked. |
| Is direct object mutation expected? | Mutation through the reactive proxy is supported. | Existing state should not be mutated; provide a new state value. |
| What does an update initiate? | Vue triggers the effects associated with the changed property. | React queues a render for the component state update. |
| Is `Proxy` the whole reactivity system? | No. It supplies interception points for Vue's tracking and triggering system. | No proxy-based object tracking is required by React's built-in state model. |

Both frameworks produce a UI that reacts to state changes, but **React** the
library and **Reactive Programming** the paradigm are not the same concept.
The name React should not be treated as evidence that React uses the same
reactivity mechanism as Vue.

## Relationship to Stream-Based Reactivity

Vue and React can both be used with streams, but their built-in component-state
models should not be equated with libraries such as RxJS.

| Aspect | Vue reactive state | React component state | Stream-based model |
| --- | --- | --- | --- |
| Main abstraction | Reactive values and effects | State snapshots and renders | Values or events emitted over time |
| Change reporting | Intercepted reactive mutation | Explicit setter or dispatch | Producer emission |
| Dependencies | Often inferred from reactive reads | Organized through component state, props, and explicit APIs | Expressed through subscription and stream composition |
| Common operations | `reactive`, `ref`, `computed`, `watch` | `useState`, `useReducer`, rendering, Effects | `map`, `filter`, `combineLatest`, `switchMap` |
| Typical strength | Fine-grained state dependency tracking | Predictable snapshot-based UI rendering | Asynchronous event and value pipelines |

“Stream-based reactive programming” is safer terminology here than calling all
Observable libraries **pure Functional Reactive Programming**. FRP has stricter
and differently interpreted definitions, and values emitted by an Observable
are not automatically continuous or immutable.

## Practical Mental Model

```text
General reactive model
Source changes → dependents become affected → work is propagated or scheduled

Vue 3
Read reactive proxy property → track dependency
Write reactive proxy property → trigger dependent work

React
Read the state snapshot during render
Call a setter with the next state → queue another render

Stream-based system
Subscribe to a source → source emits → composed pipeline notifies subscribers
```

The broad lesson is not that one model is the definition of reactivity. The
lesson is that reactive systems must represent dependencies, report changes,
and propagate their consequences. Vue, React, and stream libraries make
different choices about which relationships are automatic and which are
explicit.

## Sources and Related Concepts

- [Vue: Reactivity in Depth](https://vuejs.org/guide/extras/reactivity-in-depth.html)
- [Vue: Reactivity Fundamentals](https://vuejs.org/guide/essentials/reactivity-fundamentals.html)
- [React: State as a Snapshot](https://react.dev/learn/state-as-a-snapshot)
- [React: Updating Objects in State](https://react.dev/learn/updating-objects-in-state)
- [MDN: Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy)
- [Reactive Programming](../../computer-science-foundations/software-engineering/programming-paradigms/reactive-programming.md)
- [Vue Notes](vue.md)
- [React Reference](react.md)
