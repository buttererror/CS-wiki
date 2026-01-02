# General Programming — Summary
## Programming Paradigms, Execution Models, and Design Patterns (CS Context)

---

## CS Classification (High-Level Placement)

This document spans multiple **recognized areas of Computer Science**, mainly:

- **Programming Languages & Paradigms**
- **Execution Models & Semantics**
- **Software Engineering Design Patterns**
- **Reactive / Event-Driven Systems (CS–SE overlap)**

It focuses on **program behavior, interaction, and structure**, not algorithms or hardware.

---

## 1. Programming Paradigms & Execution Models

### Pure Functions
A pure function:
- returns the same output for the same input
- does not modify external state
- does not depend on mutable external data

Purity enables:
- predictability
- safe re-execution
- interruption and replay
- simpler reasoning

---

### Side Effects (General Programming Concept)

A side effect is any operation that:
- affects something outside the function
- depends on external mutable state
- produces observable behavior beyond returning a value

Examples:
- network requests
- logging
- timers
- subscriptions
- shared state mutation
- randomness
- persistent storage

Side effects are **necessary**, but must be **isolated and controlled**.

---

### Determinism vs Non-Determinism

- Deterministic → same input, same output
- Non-deterministic → output may vary

Common sources:
- time
- randomness
- external systems

Non-determinism leaking into core logic makes systems fragile.

---

### Mutation vs Immutability

- Mutation: changing existing data in place
- Immutability: creating new data instead of changing old data

Immutability:
- reduces hidden coupling
- simplifies change detection
- supports replayable and interruptible execution

---

### Execution vs Simulation

Some systems **execute** code once.

Others:
- simulate execution
- may re-run code
- may discard results
- may interrupt and resume work

In simulation-based systems:
- side effects during simulation are dangerous
- effects must occur only after final commitment

---

## 2. Subscriptions (Observer Model)

### CS Classification
- **Field**: Computer Science
- **Area**: Reactive / Event-Driven Systems
- **Related Patterns**: Observer, Pub/Sub

### Definition
A subscription means:

> “Notify me when something changes.”

A subscription has three parts:
1. **Source** — the thing that changes
2. **Listener** — the callback or observer
3. **Notification mechanism** — how changes are delivered

Examples:
- event listeners
- observers
- pub/sub systems
- data stores notifying consumers

Key property:
> Subscriptions **signal change** — they do not decide how to react.

---

### Signals vs Authority

Good system design separates:
- **signals** (“something changed”)
- **authority** (what to do next)

Benefits:
- predictable execution
- controlled side effects
- centralized scheduling

---

## 3. Design Patterns: Adapter Pattern

### CS Classification

- **Field**: Software Engineering
- **Sub-area**: Object-Oriented Design
- **Source**: GoF (Gang of Four)
- **Category**: Structural Design Pattern

Adapter is on the same conceptual level as:
- MVC
- Observer
- Factory
- Strategy

It is a **formal design pattern**, not a buzzword.

---

### Adapter Pattern — Definition

> Adapter Pattern:  
> Converts the interface of a class or system into another interface that clients expect, allowing incompatible systems to work together.

Key ideas:
- the client does not change
- incompatibility is hidden behind the adapter

---

### Example Mapping (Frontend Context)

**Client**
- React components
- Redux thunks / slices

They expect:
- `login()`
- `getUser()`
- `getProjects()`

**Incompatible systems**
- real backend (REST, latency, auth, failures)
- mock data (local, synchronous, fake)

**Adapter**
- `APIHelper.ts`

What it normalizes:
- response shape
- error shape
- calling style

Result:
> Both backends appear identical to the application.

This is a textbook **Adapter Pattern**.

---

### Adapter vs MVC (Important Distinction)

| Concept | Scope |
|------|------|
| MVC | Entire application structure (macro-architecture) |
| Adapter | Boundary between incompatible parts (micro-architecture) |

- MVC → how the app is organized
- Adapter → how two parts communicate without knowing about each other

Same design thinking, different scale.

---

### Why Frontend Developers Don’t Always Say “Adapter”

In frontend contexts, adapters are often called:
- API layer
- service
- client
- wrapper

Architecturally:
> Many “API layers” **are adapters**, even if not named as such.

Vocabulary varies by:
- language
- ecosystem
- team maturity

---

### Real-World Adapter Examples

- Axios wrapper over `fetch`
- Redux selector adapting state shape
- React Query custom fetcher
- Payment gateway wrapper (Stripe / PayPal)
- Browser compatibility layers

---

### One-Line Mental Model

> If I change **how something works** without changing **how it’s used**, I’m probably using an **Adapter**.

---

## 4. Scheduling, Chunking, and Interruption

Modern systems may:
- split work into chunks
- pause and resume work
- discard partial work
- prioritize urgent tasks

This requires:
- restartable computations
- delayed side effects
- explicit commit points

---

## Summary of CS Placement

In the general CS taxonomy, this document spans:

- **Programming Languages**
- **Programming Paradigms**
- **Execution Models & Semantics**
- **Design Patterns (Software Engineering)**
- **Reactive / Event-Driven Systems**

It explains **why modern systems behave the way they do**, not just how to use specific tools.

---
