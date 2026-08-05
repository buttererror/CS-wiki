# Domain-Driven Design

- **Field:** Software Engineering
- **Primary perspective:** Domain Modeling
- **Applied in:** Software System Design

## Purpose

Domain-Driven Design (DDD) connects an evolving understanding of a problem
domain with the design and implementation of software. It is most useful when
business rules, terminology, processes, and boundaries create substantial
complexity.

## Definition

DDD centers software development on a model of the domain and a shared language
used by domain experts and software practitioners.

It asks:

> How can our software model express the important concepts, rules, and
> boundaries of this domain?

DDD does not mean merely replacing technical folders with business-named
folders. Code organization may reflect domain boundaries, but the essential
work is developing, testing, and refining the underlying domain model.

## Mental Model

```text
Domain knowledge and business language
                ↕
        Shared domain model
                ↕
Software boundaries and implementation
                ↕
       Learning from real behavior
```

The software does not reproduce reality completely. It contains a purposeful
model of the parts of the domain that matter to the system.

## Strategic and Tactical Design

```text
Domain-Driven Design
│
├── Strategic Design
│   ├── Domain and Subdomains
│   ├── Ubiquitous Language
│   ├── Bounded Contexts
│   └── Context Mapping
│
└── Tactical Modeling
    ├── Entities
    ├── Value Objects
    ├── Aggregates
    ├── Repositories
    ├── Domain Services
    └── Domain Events
```

Strategic design addresses the large-scale domain and model boundaries.
Tactical modeling provides patterns for expressing behavior inside a model.
Teams can benefit from strategic DDD without using every tactical pattern.

## Strategic Concepts

### Domain and Subdomains

The domain is the area of knowledge and activity the software serves. A large
domain can be divided into subdomains with different purposes and importance.

### Ubiquitous Language

A Ubiquitous Language is a shared, precise vocabulary developed by domain
experts and software practitioners. The language appears in conversations,
models, tests, and code and evolves as understanding improves.

### Bounded Context

A Bounded Context defines where one domain model and its language apply. The
same word may intentionally have different meanings in different contexts.

For example, `Patient` may mean a clinical record in a care context and an
account holder in a billing context. Those models should not be merged merely
because they share a name.

### Context Mapping

Context Mapping describes the relationships and integration boundaries between
Bounded Contexts. It makes model ownership, dependencies, and translation
needs explicit.

## Tactical Concepts

### Entity

An Entity is distinguished by identity and continuity over time. It is not
defined merely by a database table or a collection of attributes.

### Value Object

A Value Object is defined by its attributes rather than an independent
identity. It is commonly modeled as immutable when the language and platform
make that practical.

### Aggregate

An Aggregate is a consistency boundary around related domain objects. An
Aggregate Root controls changes that must preserve the Aggregate's invariants.

### Repository

A Repository provides a domain-oriented abstraction for retrieving and saving
Aggregates. It does not make persistence concerns part of the domain model.

### Domain Service

A Domain Service represents domain behavior that does not naturally belong to
one Entity or Value Object. It should not become a generic container for
application orchestration.

### Domain Event

A Domain Event records something meaningful that happened in the domain, such
as an appointment being scheduled. It represents domain meaning; publishing it
through a message broker is a separate communication and implementation
decision.

## Clinic Example

A clinic platform might discover areas such as:

```text
Patient Administration
Appointments
Clinical Visits
Prescriptions
Billing
Inventory
```

These names are starting points for domain exploration, not automatically
correct Bounded Contexts.

Within a Clinical Visits context, the model might own concepts and rules for:

- check-in and consultation state;
- clinical notes;
- allowed workflow transitions; and
- completion of a visit.

The context boundary should follow domain language, rules, ownership, and
change patterns rather than simply mirror a folder tree or database schema.

## Relationship to Architecture and Implementation

DDD can inform module and service boundaries, but it does not require a
particular architectural style or deployment model.

```text
Domain model and Bounded Contexts
        ↓ may inform
Module, component, or service boundaries
        ↓ may be realized by
Modular Monolith, Microservices, or another architecture
```

A Bounded Context is a model boundary. It is not automatically a microservice,
package, database, or independently deployed application.

DDD also works independently of repository organization. A monorepo may make
some cross-project changes convenient, but it neither creates nor guarantees
good domain boundaries.

## Relationship to Event-Driven Architecture

DDD may identify Domain Events. An Event-Driven Architecture may use events as
a major integration and control-flow mechanism. The concepts can work together,
but neither requires the other.

```text
Domain Event
→ expresses that something meaningful happened in the domain

Publish / Subscribe
→ describes how independent participants may exchange notifications

Event-Driven Architecture
→ organizes significant system behavior around events
```

## Benefits

- Builds a shared understanding between domain experts and engineers.
- Makes business rules and model ownership more explicit.
- Helps separate models that use different language or evolve independently.
- Keeps important domain behavior visible in the software.
- Provides tools for managing complex, long-lived business software.

## Trade-Offs

- Requires sustained access to domain knowledge and collaborative modeling.
- Important boundaries are difficult to discover and will evolve.
- Its terminology and tactical patterns create a learning cost.
- Applying its full machinery to a simple problem can add unnecessary
  abstraction.
- Poorly chosen boundaries can preserve misunderstandings instead of reducing
  complexity.

## When DDD Is Most Useful

DDD is especially valuable when domain complexity is a central project risk,
as it often is in healthcare, finance, logistics, enterprise resource planning,
and mature commerce systems.

It offers less benefit when the problem is primarily straightforward data entry,
basic integration, or technically complex computation with little business-rule
complexity.

## Key Takeaways

- DDD centers development on domain knowledge, language, models, and
  boundaries.
- Strategic DDD and tactical DDD address different scales.
- DDD can influence architecture without being an architectural style.
- A Bounded Context is not automatically a service, module, repository, or
  database.
- Domain Events do not require Publish / Subscribe or Event-Driven
  Architecture.
- DDD is useful when domain complexity justifies its collaboration and modeling
  costs.

## Related Concepts

- [Software System Design](README.md)
- [Neighboring Perspectives](neighboring-perspectives.md)
- [System Design](../README.md)
- [Software Engineering Foundations](../../computer-science-foundations/software-engineering/README.md)
- [Software Architecture](../../computer-science-foundations/software-engineering/software-architecture.md)
- [Communication Patterns](../../computer-science-foundations/software-engineering/communication-patterns/README.md)
- [Event-Driven Architecture](../../computer-science-foundations/software-engineering/architectural-styles/event-driven-architecture.md)
- [Modular Monolith](../../computer-science-foundations/software-engineering/architectural-styles/modular-monolith.md)
- [Monorepo](../../software-development-practices/repository-organization/monorepo.md)
- [Software Development Practices](../../software-development-practices/README.md)
