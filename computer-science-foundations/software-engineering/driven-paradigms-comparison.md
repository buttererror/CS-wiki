# Driven Paradigms and Architectural Communication Models

**Keywords:** typed data-driven API, data-driven architecture, domain-driven design, event-driven architecture, schema-driven API, RPC, remote procedure call, gRPC, tRPC, UML, unified modeling language, DSL, domain-specific language, TDD, BDD, architectural communication

## Purpose

This document provides a foundational comparison of software engineering concepts that use the **"-driven"** qualifier (Data-Driven, Domain-Driven, Event-Driven, Schema-Driven, Test-Driven). It defines what a **typed, data-driven API** is in contrast to action-driven or procedural interfaces, and explores the core architectural communication models (**RPC**, **REST**, **EDA**) and specification languages (**UML**, **DSLs**) that accompany them.

---

## 1. What Is a "Typed, Data-Driven API"?

A **typed, data-driven API** is an interface whose structure, validation, execution flow, or rendered output is determined by **declarative, strongly typed data descriptors** rather than by hardcoded procedural routines or an ever-expanding sprawl of specialized endpoints.

```text
Imperative / Action-Driven API:
Caller ─── invokes method ───>  doActionA()
Caller ─── invokes method ───>  doActionB()
Caller ─── invokes method ───>  doActionC()

Typed, Data-Driven API:
Caller ─── passes typed data descriptor ───> [ Reusable Engine / Interpreter ]
                                                      │
                                                      ├── evaluates structure
                                                      ├── validates constraints
                                                      └── executes / renders
```

### The Two Core Characteristics

1. **"Typed":** 
   - The contract is formally specified and verified at compile-time and/or runtime (e.g., TypeScript types, Zod/TypeBox schemas, Protocol Buffers, or GraphQL SDL).
   - Both producer and consumer share compile-time type inference, autocomplete, and strict structural guarantees. Payloads violating the schema fail immediately at the system boundary.
2. **"Data-Driven":**
   - The system acts as a **generic interpreter** of data payloads.
   - Behavior, presentation, or state transitions are parameterized inside data structures (configuration objects, schema documents, state machine definitions, query trees) rather than hardcoded in imperative code.

### Practical Manifestations

* **Frontend / User Interface:** A dynamic form generator or table component where column layout, validation rules, input types, and visibility conditions are passed as a typed configuration array. Adding a new field requires updating a data schema rather than authoring new JSX or UI components.
* **Backend / Network APIs:** Declarative query interfaces (such as GraphQL or Prisma/tRPC query builders) where the client sends a structured document specifying exactly which fields, relations, and filters are required, instead of calling dozens of rigid endpoints (such as `/getPatientName`, `/getPatientHistory`).
* **Contrasted with Action-Driven / Procedural Interfaces:**
  * *Action-driven:* Rigid imperative endpoints (`POST /approveUser`, `POST /suspendUser`, `POST /rejectUser`).
  * *Data-driven:* State transitions driven by typed payload evaluation (`PATCH /users/:id { "status": "approved" }` validated against an allowed transition schema).

---

## 2. Comparative Taxonomy of "-Driven" Paradigms

In software engineering, the suffix **"-driven"** indicates the **primary force, artifact, or model that guides system behavior, design decisions, or development workflows**.

| Paradigm | Primary Scope | What Drives It? | Core Philosophy | Primary Risk / Tradeoff |
| :--- | :--- | :--- | :--- | :--- |
| **Typed, Data-Driven API** | Interface / Component | **Structured data schemas & descriptors** | Code provides a reusable engine; structured data dictates behavior, rendering, or queries. | Over-abstraction; can lead to anemic domain logic if business rules leak into raw data schemas. |
| **[Domain-Driven Design (DDD)](../../system-design/software-system-design/domain-driven-design.md)** | System Architecture & Modeling | **Business domain logic & Ubiquitous Language** | Software models mirror business rules, entities, and bounded contexts independently of infrastructure. | High cognitive overhead and modeling complexity; over-engineering for simple CRUD applications. |
| **[Event-Driven Architecture (EDA)](architectural-styles/event-driven-architecture.md)** | System Communication & Orchestration | **Asynchronous events (facts that occurred)** | Components communicate indirectly by publishing and reacting to immutable state changes. | Eventual consistency, asynchronous debugging, complex distributed tracing, and out-of-order delivery. |
| **Schema-Driven API / Development** | Interface Contracts & Tooling | **Formal schema specifications (OpenAPI, GraphQL SDL)** | The schema is the single source of truth; client SDKs, server stubs, and validators are generated from it. | Tooling lock-in and friction when schemas drift or lack expressive business validation. |
| **Test-Driven Development (TDD)** | Implementation Workflow | **Automated tests written before code** | Write a failing test first, write minimal code to pass it, then refactor (Red-Green-Refactor). | Premature architecture choices if test boundaries mock internal implementation details rather than behaviors. |
| **Behavior-Driven Development (BDD)** | Cross-Functional Collaboration | **User-facing behavioral specifications** | Formulate shared requirements in structured, ubiquitous language scenarios (`Given-When-Then`). | Overhead of maintaining separate specification layers; risk of non-technical stakeholders abandoning maintenance. |
| **Model-Driven Architecture (MDA)** | Software Engineering Synthesis | **Formal conceptual models (e.g., UML)** | Higher-level platform-independent models drive automated generation of target platform implementations. | Brittle code generators, round-trip engineering synchronization failures, and loss of fine-grained control. |

---

## 3. Boundary Distinctions and Conceptual Traps

### Data-Driven vs. Domain-Driven Design (DDD)

* **Domain-Driven Design** focuses on **meaning, business policy, and boundaries**. It insists that business rules reside in rich domain objects (Entities, Value Objects, Aggregates) using the Ubiquitous Language of domain experts.
* **Data-Driven Design** focuses on **generic mechanisms parameterized by data shapes**.
* **The Anemic Domain Trap:** A common anti-pattern occurs when developers confuse data-driven approaches with domain modeling. Exposing raw database rows or JSON structures as "data-driven" models often results in an **Anemic Domain Model**—where objects are passive data holders, and true domain logic is scattered across controllers, UI components, or database triggers.

### Data-Driven vs. Event-Driven Architecture (EDA)

* **Data-Driven** describes **how an individual component or interface interprets data** to determine its execution or rendering.
* **Event-Driven** describes **how independent subsystems communicate across time and space** via notifications of completed facts.
* *Intersection:* An event payload in an EDA system can be strongly typed and data-driven, but the architectural pattern governing system coordination remains event-driven.

### Data-Driven vs. Schema-Driven

* **Schema-Driven** is an engineering *workflow and contract mechanism*: a formal schema file (e.g., `schema.prisma`, `openapi.yaml`, `schema.graphql`) acts as the single source of truth from which types, routers, and validators are synthesized.
* **Data-Driven** is a *runtime execution style*: code behavior changes dynamically based on the data structure supplied at runtime.

---

## 4. Architectural Communication Models: RPC, REST, and EDA

When designing distributed systems, microservices, or client-server APIs, communication patterns govern how components exchange intent and data.

```text
Client-Server Request / Response:
Caller ──────────────── direct request ───────────────> Callee
Caller <─────────────── direct response ────────────── Callee

Event-Driven Architecture (Asynchronous Decoupling):
Producer ───── publishes event ─────> [ Event Broker ]
                                             │
                       ┌─────────────────────┴─────────────────────┐
                       ▼                                           ▼
                  Consumer A                                  Consumer B
```

### Remote Procedure Call (RPC)

**Remote Procedure Call (RPC)** is an inter-process communication pattern where a client executes a subroutine on a remote server as if it were a local in-memory function call.

* **Mental Model:** `result = await client.calculateTotal(cart)`
* **Mechanics:**
  1. The client invokes a local proxy (**client stub**).
  2. The stub serializes (**marshals**) parameters into network packets (binary, JSON).
  3. Packets travel over the transport layer (TCP, HTTP/2).
  4. The server receives, unpacks (**unmarshals**), and dispatches the call to the actual implementation.
  5. The return value is serialized and returned to the client stub, which returns it to the calling code.
* **Orientation:** **Action-oriented / Verb-centric**. Endpoints represent operations (`archivePatient(id)`, `chargeCard(amount)`).
* **Modern Examples:**
  * **gRPC:** High-performance binary RPC using Protocol Buffers over HTTP/2.
  * **tRPC:** End-to-end type-safe RPC for TypeScript monorepos without intermediate code generation.
  * **JSON-RPC:** Lightweight JSON-formatted remote procedure protocol.

### RPC vs. REST vs. Event-Driven Architecture

| Dimension | RPC (Remote Procedure Call) | REST (Representational State Transfer) | EDA (Event-Driven Architecture) |
| :--- | :--- | :--- | :--- |
| **Primary Unit** | **Procedure / Method** (`getUser()`) | **Resource / State** (`/users/123`) | **Event / Fact** (`UserCreated`) |
| **Orientation** | Verb-oriented (Actions) | Noun-oriented (Entities) | Fact-oriented (Occurrences) |
| **Interaction Style** | Synchronous Request / Response | Synchronous Request / Response | Asynchronous Publish / Subscribe |
| **Coupling** | **High:** Caller targets a specific procedure on a known receiver. | **Medium:** Caller targets a specific resource URL and standard HTTP verbs. | **Loose:** Producer emits to a broker without knowing who or how many consume it. |
| **Temporal Dependency** | Both sender and receiver must be operational simultaneously. | Both sender and receiver must be operational simultaneously. | Decoupled; consumers can process events hours or days later. |

---

## 5. Specification and Expression: UML and DSLs

### Unified Modeling Language (UML)

**UML** is a standardized visual modeling language used in software engineering to specify, visualize, construct, and document the artifacts of software systems.

* **Primary Purpose:** Communication, architectural alignment, and structural blueprinting across teams.
* **Key Diagram Families:**
  * **Structure Diagrams (Static):** *Class Diagrams* (entities, attributes, relationships, inheritance), *Component Diagrams* (module boundaries).
  * **Behavior Diagrams (Dynamic):** *Sequence Diagrams* (chronological message passing between lifelines), *State Machine Diagrams* (lifecycle states and valid transitions), *Activity Diagrams* (control flow and concurrency).
* **Modern Reality:** Software engineering rarely uses UML for rigid, heavy-weight Model-Driven Architecture (automatic code generation). Instead, modern teams use lightweight UML subsets (especially sequence and class diagrams) as visual communication tools during design reviews and documentation.

### Domain-Specific Language (DSL)

A **DSL** is a programming or specification language tailored specifically to solve problems within a **focused, well-defined problem domain**. It sacrifices the general-purpose flexibility of a General-Purpose Language (GPL) to achieve extreme clarity, safety, and expressiveness for that domain.

```text
Languages
├── General-Purpose Languages (GPL) ── Python, TypeScript, Go, C++, Java
└── Domain-Specific Languages (DSL)
    ├── External DSLs ──────────────── SQL, HTML, CSS, RegEx, Terraform HCL
    └── Internal / Embedded DSLs ───── JSX (React), Prisma Client, Vitest assertions
```

* **External DSL:** Has its own standalone parser, syntax, and grammar independent of other host languages.
  * *Examples:* **SQL** (relational queries), **RegEx** (string pattern matching), **HTML/CSS** (document layout and styling), **HCL** (infrastructure specification).
* **Internal / Embedded DSL:** Built inside an existing host language by using custom fluent APIs, macros, or compiler extensions to mimic dedicated domain syntax.
  * *Examples:* **JSX** (embedding HTML-like component trees in JavaScript/TypeScript), **Prisma Client** (fluent, type-safe database queries expressed through TypeScript object syntax), **Jest / Vitest** (`expect(result).toBe(42)`).

---

## Related Documents

- [Software Taxonomy](software-taxonomy.md) — primary classification categories for software engineering concepts.
- [Software Architecture](software-architecture.md) — architectural styles, patterns, and organizational principles.
- [Event-Driven Architecture](architectural-styles/event-driven-architecture.md) — canonical model for event-based systems.
- [Request / Response](communication-patterns/request-response.md) — fundamental direct communication model.
- [Domain-Driven Design](../../system-design/software-system-design/domain-driven-design.md) — business domain modeling, bounded contexts, and ubiquitous language.
- [Software Engineering Terminology](terminology/README.md) — definitions of cross-topic terminology.
