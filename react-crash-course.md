References: 
- https://nextjs.org/learn/react-foundations/what-is-react-and-nextjs
  
# React Crash — Day 1  
## Mental Model, Rendering, Side Effects, Subscriptions, and Evolution

---

## 1. What React Actually Does (High-Level Mental Model)

React is **not a DOM library**.  
React is a **UI calculation engine**.

A React component is a function that:
- takes **props + state**
- returns a **description of UI**

This description is made of **React elements** (plain JavaScript objects).

React:
1. Executes components to produce a **React element tree**
2. Compares the new tree with the previous one (**reconciliation**)
3. Decides the minimal DOM changes
4. Applies them in a controlled phase (**commit**)

Key idea:

> React calculates *what the UI should look like* —  
> the browser handles *how it is painted*.

---

## 2. React Element Tree (Often Called “Virtual DOM”)

### Terminology clarification
- **React element** → official React concept
- **Virtual DOM** → community / developer term (not an official API)

A React element is:
- an immutable JavaScript object
- describing UI intent, not DOM nodes

Every render produces a **new element tree**.

React compares:
- previous element tree
- next element tree

This comparison drives all updates.

Important:
- React does **not mutate the element tree**
- A new tree is created on every render
- Only the real DOM is mutated later

---

## 3. Render Phase vs Commit Phase (Critical Separation)

### Render phase (React term)
- Components are executed
- React elements are created
- Trees are compared
- **No DOM mutations**
- Must be **pure and side-effect free**
- Can be paused, restarted, or discarded

### Commit phase (React term)
- React mutates the real DOM
- Effects are scheduled
- Happens only for committed UI

Render = calculation  
Commit = execution

---

## 4. DOM Mutation vs Browser Paint

### DOM mutation (browser concept)
- DOM nodes are created/removed/updated
- Happens **in memory**
- Does **not** mean pixels are updated

### Browser paint (browser concept)
- Layout calculation
- Painting pixels to screen
- Happens after DOM mutation

React:
- mutates the DOM
- does **not** control when painting happens

---

## 5. Effects Timing

### useLayoutEffect (React API)
- Runs **after DOM mutation**
- Runs **before browser paint**
- Used for layout measurements or synchronous DOM fixes
- Blocks painting → should be rare

### useEffect (React API)
- Runs **after browser paint**
- Used for:
  - data fetching
  - subscriptions
  - logging
  - syncing with external systems

Order:
1. DOM mutation
2. useLayoutEffect
3. Browser paint
4. useEffect

---

## 6. Pure Render Rule

Render must be **pure**.

A pure render:
- produces the same output for the same inputs
- does not mutate anything outside the function
- has no observable side effects

### Forbidden during render
- network requests
- timers
- subscriptions
- DOM access
- logging
- randomness
- mutating props or globals

Why:
- render can run multiple times
- render can be interrupted
- render can be discarded

React treats render as **simulation**, not execution.

---

## 7. Side Effects (General Programming Concept)

### Terminology clarification
- **Side effect** → general programming / functional programming term
- Not invented by React

A side effect is any operation that:
- affects something outside the function
- or depends on external mutable state
- or produces observable behavior beyond return value

Examples:
- IO
- network
- timers
- mutations
- logging
- randomness

Side effects are **not bad** — but they must be **controlled**.

React rule:
> Side effects are forbidden during render,  
> allowed in effects and event handlers.

---

## 8. Where Side Effects Belong

| Location | Allowed |
|--------|--------|
| Render | ❌ No |
| Event handlers | ✅ Yes |
| useLayoutEffect | ✅ (DOM-related, before paint) |
| useEffect | ✅ (external sync, after paint) |

Mental rule:

> Render describes *what the UI should be*.  
> Effects describe *what should happen because of it*.

---

## 9. Re-Render Triggers (What Actually Causes Updates)

React schedules a re-render when:
1. Component state changes
2. Component props change
3. A parent re-renders
4. A React-managed subscription signals an update

Important:
- Nothing re-renders React except **React itself**
- Everything else only **asks React** to re-render

---

## 10. Keys and Identity

Keys define **identity**, not position.

Stable keys:
- uniquely identify data
- remain consistent across renders

Index keys:
- tie identity to position
- break when inserting, deleting, or reordering

Rule:
> If a list can change order or length, index keys are incorrect.

“Stable key” is **official React terminology**, not slang.

---

## 11. Subscriptions (General Concept)

### Terminology clarification
- **Subscription** → general programming concept
- Means: “notify me when something changes”

Subscriptions do **not** mutate UI.
They **signal** that something changed.

React decides:
- when to re-render
- how to reconcile
- when to commit

---

## 12. Context API (React-Owned Subscription)

- Context is a React API
- useContext registers a component as a **subscriber**
- When provider value changes:
  - React schedules re-renders for all consumers
  - render → diff → commit

Important:
- Context does **not bypass React**
- Context does **not mutate consumers**
- Context only **triggers React updates**

Context consumers are conceptually **subscribers**.

---

## 13. Redux and External Stores

Redux is **outside React**.

Redux:
- owns state
- owns reducers
- owns subscriptions

Redux **cannot re-render React by itself**.

### Bridge: useSelector
- Subscribes to Redux store
- Compares selected values
- If changed:
  - internally calls a React update API
  - React schedules render

Flow:
Redux update  
→ subscription fires  
→ selector detects change  
→ React update scheduled  
→ render → diff → commit

Redux never bypasses React.

---

## 14. “Going Through React APIs”

React APIs are the **only supported contract** for scheduling updates:
- useState
- useReducer
- useContext
- useSyncExternalStore
- internal hook mechanisms

If changes happen without these:
- React does not know
- React does not re-render

Bypassing React means:
> Mutating UI or state without React scheduling it  
(which is unsafe and unsupported).

---

## 15. Legacy React vs Modern React (Important Comparison)

### Legacy model (pre-16 / early 16)
- Synchronous rendering
- Render always completes
- Side effects often tolerated in lifecycle methods
- Class components
- Render ≈ execution

### Modern model (16+ → 19)
- Interruptible rendering
- Render can be restarted or discarded
- Strict purity requirements
- Hooks instead of lifecycles
- Render = calculation, commit = execution
- Concurrency-ready

Old assumptions no longer hold.

Modern React enforces purity to enable:
- time slicing
- interruption
- concurrency

---

## 16. Concurrency Concepts

### Time slicing
- React splits rendering into chunks
- Yields to browser to keep UI responsive

### Interruption
- React may pause or discard a render
- Higher-priority updates can interrupt lower ones

### Concurrency
- React can prepare multiple UI versions
- Only one is committed
- Others may be discarded

JavaScript remains single-threaded.

---

## 17. Historical Context: Classes → Functions → Hooks

Class components existed to solve:
- instance storage
- lifecycle timing
- state management

Hooks replaced classes because:
- classes fight concurrency
- logic becomes fragmented
- reuse is difficult

Hooks allow:
- composition
- explicit side effects
- better alignment with modern rendering

---

## 18. Relation to Vue Options API

Legacy React classes and Vue Options API share:
- lifecycle-grouped logic
- implicit timing
- scattered side effects

Both ecosystems evolved:
- React → Hooks
- Vue → Composition API

Same problem, same direction.

---

## 19. Debugging (Deferred)

Debugging React will be addressed later as a **dedicated section**:
- re-render causes
- effect duplication
- stale closures
- identity issues
- subscription mistakes

---

## Core Anchors (Memorize These)

- React calculates UI, it doesn’t paint it
- Render is pure and replayable
- Commit mutates the DOM
- Side effects are delayed and controlled
- Nothing bypasses React
- Subscriptions signal, React decides
- Modern React assumes interruption

---

End of Day 1.
