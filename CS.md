# General Programming — Summary
## Programming Paradigms, Execution Models, and Design Patterns (CS Context)

---

## Boilerplate (Scope & Conventions)

This document is a **taxonomy-driven, Computer Science–oriented summary**.

It is intended to:
- classify and connect CS concepts at a **conceptual (surface) level**
- explain **where concepts belong** in CS, not how to implement them
- focus on **program behavior, execution, and structure**

This document does **not**:
- define learning order
- include implementation details
- discuss algorithms, complexity, or hardware
- provide framework-specific tutorials

Depth beyond surface-level classification is **explicitly opt-in** and handled elsewhere.

---

## Taxonomy (Organizing Principle)

In this document, **taxonomy** refers to:

> a hierarchical system for classifying and organizing Computer Science concepts,  
> helping structure knowledge for understanding, navigation, and analysis.

This taxonomy-based approach:
- focuses on **relationships between concepts**, not learning order
- uses **parent–child conceptual grouping**
- distinguishes **core CS fields** from **applied or engineering layers**

It is conceptually similar to:
- biological taxonomy (classification by relation)
- knowledge ontologies in computer science

Examples of established taxonomies include:
- **Computer Science Ontology (CSO)** — research topics and domain classification
- **Bloom’s / SOLO taxonomies** — learning depth (referenced only, not used structurally)

This document uses taxonomy to answer:
- where a concept fits within CS
- what concepts it is adjacent to
- its level of abstraction

It does **not** define:
- learning sequence
- implementation detail
- mastery depth

---

## CS Classification (High-Level Placement)

This document spans multiple **recognized areas of Computer Science**, primarily:

- **Programming Languages & Paradigms**
- **Execution Models & Semantics**
- **Design Patterns (Software Engineering layer)**
- **Reactive / Event-Driven Systems** (CS–SE overlap)

Focus:
> program behavior, interaction, and structure  
> (not algorithms or hardware)

---

## Core Definitions (Conceptual Grounding)

### Programming Paradigms

A **programming paradigm** defines:

> the **style and conceptual model** used to structure programs  
> and reason about computation.

A paradigm answers questions such as:
- How is computation expressed?
- How is state represented or avoided?
- How do components interact?

Examples of paradigms:
- Functional
- Object-Oriented
- Procedural
- Declarative
- Reactive

Paradigms shape **how programs are written and thought about**,  
not how they are executed at runtime.

---

### Execution Models

An **execution model** defines:

> how programs are **evaluated, scheduled, repeated, interrupted, or reordered**  
> during runtime.

An execution model answers questions such as:
- When does code run?
- Can it be paused or replayed?
- Can execution be reordered or parallelized?
- When do side effects occur?

Execution models describe **runtime behavior and constraints**,  
independent of syntax or programming style.

---

### Design Patterns

A **design pattern** is:

> a reusable, named solution to a recurring **structural or interaction problem**  
> in software design.

Design patterns:
- operate at the **architectural or structural level**
- do not define execution semantics
- encode proven design decisions

They belong primarily to **Software Engineering**,  
but often sit at the boundary with CS concepts.

---

## 1. Programming Paradigms & Execution Models

### 1.1 Pure Functions

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

### 1.2 Side Effects

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

### 1.3 Determinism vs Non-Determinism

- **Deterministic** → same input, same output
- **Non-deterministic** → output may vary

Common sources:
- time
- randomness
- external systems

Non-determinism leaking into core logic increases fragility.

---

### 1.4 Mutation vs Immutability

- **Mutation**: changing existing data in place
- **Immutability**: creating new data instead of modifying existing data

Immutability:
- reduces hidden coupling
- simplifies change detection
- supports replayable and interruptible execution

---

### 1.5 Execution vs Simulation

Some systems **execute** code once.

Others:
- simulate execution
- may re-run code
- may discard intermediate results
- may interrupt and resume work

In simulation-based systems:
- side effects during simulation are dangerous
- effects must occur only after final commitment

---

## 2. Subscriptions (Observer Model)

### 2.1 CS Placement

- **Field**: Computer Science
- **Area**: Reactive / Event-Driven Systems
- **Related Patterns**: Observer, Pub/Sub

---

### 2.2 Definition

A subscription means:

> “Notify me when something changes.”

A subscription consists of:
1. **Source** — what changes
2. **Listener** — observer or callback
3. **Notification mechanism** — delivery channel

Key property:
> Subscriptions **signal change**; they do not decide behavior.

---

### 2.3 Signals vs Authority

Good system design separates:
- **signals** (“something changed”)
- **authority** (what to do next)

Benefits:
- predictable execution
- controlled side effects
- centralized scheduling

---

## 3. Design Patterns — Adapter Pattern

### 3.1 CS Placement

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

### 3.2 Definition

> Adapter Pattern:  
> Converts the interface of a class or system into another interface that clients expect, allowing incompatible systems to work together.

Key ideas:
- the client does not change
- incompatibility is hidden behind the adapter

---

### 3.3 Example Mapping (Frontend Context)

**Client**
- React components
- Redux thunks / slices

**Expected interface**
- `login()`
- `getUser()`
- `getProjects()`

**Incompatible systems**
- real backend (REST, auth, latency)
- mock data (local, synchronous)

**Adapter**
- `APIHelper.ts`

Result:
> Both backends appear identical to the application.

This is a textbook **Adapter Pattern**.

---

### 3.4 Adapter vs MVC

| Concept | Scope |
|------|------|
| MVC | Application-level structure |
| Adapter | Boundary-level compatibility |

---

### 3.5 Real-World Adapter Examples

- Axios wrapper over `fetch`
- Redux selectors adapting state shape
- React Query custom fetchers
- Payment gateway wrappers
- Browser compatibility layers

---

### 3.6 One-Line Mental Model

> If you change **how something works** without changing **how it’s used**, you’re using an **Adapter**.

---

## 4. Scheduling, Chunking, and Interruption

Modern systems may:
- split work into chunks
- pause and resume execution
- discard partial work
- prioritize urgent tasks

This requires:
- restartable computation
- delayed side effects
- explicit commit points

---

## Summary of CS Placement

This document spans:

- **Programming Languages**
- **Programming Paradigms**
- **Execution Models & Semantics**
- **Design Patterns (Software Engineering layer)**
- **Reactive / Event-Driven Systems**

It explains **why modern systems behave the way they do**, not how to use specific tools.
