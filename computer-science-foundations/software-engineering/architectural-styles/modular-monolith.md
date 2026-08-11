# Modular Monolith

- **Field:** Software Engineering
- **Primary classification:** Architectural Style
- **Scope:** Application and module boundaries

## Definition

A Modular Monolith is a system deployed as one application while being divided
internally into explicit, cohesive modules with controlled dependencies.

It asks:

> How can one deployable application preserve meaningful internal boundaries?

## Mental Model

```text
One deployable application
│
├── Patients module
├── Appointments module
├── Clinical Visits module
├── Billing module
└── Inventory module
```

Think of one building with deliberate internal walls. The walls organize and
protect responsibilities even though the building is operated as one unit.

## Defining Characteristics

- One primary deployment unit.
- Explicit module responsibilities and public contracts.
- Controlled dependencies between modules.
- Internal details hidden from other modules.
- In-process communication is possible without network distribution.

Modules may communicate through function calls, interfaces, commands, or
in-process events. The choice of communication mechanism does not define the
style by itself.

## Module Boundaries

```text
Appointments module
        │ uses an explicit contract
        ▼
Patient Administration module

Appointments module
        ✕ does not reach directly into
        Patient Administration internals
```

Good boundaries usually follow cohesive responsibilities and change patterns.
They are maintained through code organization, dependency rules, ownership,
tests, and engineering discipline.

## Comparison

| Concern | Unstructured Monolith | Modular Monolith | Microservices |
| --- | --- | --- | --- |
| Deployment | One unit | One unit | Multiple independent units |
| Internal boundaries | Weak or accidental | Explicit modules | Network and service boundaries |
| Communication | In-process | Primarily in-process | Primarily networked |
| Operational complexity | Low initially | Lower than distributed services | Higher |
| Independent deployment | No | No | Yes |
| Partial network failure | Internal calls avoid it | Internal calls avoid it | Must be expected |

A monolith is not automatically unstructured. Modularity and distribution are
separate properties.

## Relationship to Domain-Driven Design

[Domain-Driven Design](../../../system-design/software-system-design/domain-driven-design.md)
may inform module boundaries through domain models, capabilities, and Bounded
Contexts. However:

```text
Bounded Context
→ model and language boundary

Module
→ code and dependency boundary
```

They can align, but they are not identical. A Modular Monolith does not require
DDD, and DDD does not require a Modular Monolith.

## Relationship to Microservices

A Modular Monolith can preserve boundaries without paying the operational cost
of distributed deployment. Microservices add independent deployment and
scaling, but also introduce network failure, distributed data concerns, and
operational coordination.

A well-structured module may later become a service, but extraction is neither
automatic nor the purpose of adopting a Modular Monolith. It should occur only
when independent deployment, scaling, ownership, or isolation provides enough
value.

## Relationship to Event-Driven Architecture

Modules may communicate through events, but in-process module events do not
make the whole application Event-Driven Architecture. Durable messages and
external brokers introduce additional delivery and consistency concerns.

## Relationship to Monorepo

[Monorepo](../../../software-development-practices/repository-organization/monorepo.md)
describes where code is versioned; Modular Monolith describes runtime and
deployment organization. Either can exist without the other.

## Benefits

- Simpler deployment and local development than distributed services.
- Explicit boundaries without routine network overhead.
- Easier end-to-end debugging and transactional consistency.
- Lower operational complexity.
- A path for assigning ownership to cohesive modules.

## Trade-Offs

- Boundaries rely heavily on code-level enforcement and team discipline.
- One deployment can coordinate otherwise independent changes.
- The application is commonly scaled as a whole.
- Shared runtime resources can allow one module to affect others.
- Weak boundaries can deteriorate into a tightly coupled system.

## Key Takeaways

- A Modular Monolith combines one deployment with explicit internal modules.
- A monolith can be modular; modularity does not require distribution.
- Modules need controlled dependencies and intentional public contracts.
- DDD may inform module boundaries but is not required.
- Monorepo is a separate repository decision.
- Microservice extraction should follow a demonstrated need.

## Related Concepts

- [Architectural Styles](./)
- [Software Architecture](../software-architecture.md)
- [Software System Design](../../../system-design/software-system-design/)
- [Domain-Driven Design](../../../system-design/software-system-design/domain-driven-design.md)
- [Microservice Architecture](microservice-architecture.md)
- [Event-Driven Architecture](event-driven-architecture.md)
- [Monorepo](../../../software-development-practices/repository-organization/monorepo.md)
- [Development Strategy](../../../software-development-practices/development-strategy.md)
