# System Design

## Purpose

System Design is the applied activity of deciding how a system's parts, responsibilities, relationships, constraints, and lifecycle should fit together.

The term can be used at different scopes. This page distinguishes the broad meaning from the software-focused meaning used by most future documents in this directory.

## Scope 1: General System Design

General System Design may include more than software.

```text
General System Design
│
├── People and organizational roles
├── Business processes
├── Policies and constraints
├── Hardware
├── Software
├── Infrastructure
└── Operations
```

At this scope, System Design overlaps with Systems Engineering and socio-technical system design. The wiki introduces this broader context but does not currently attempt to cover the complete Systems Engineering discipline.

## Scope 2: Software System Design

Software System Design applies system-design reasoning to software-intensive systems.

```text
Software System Design
│
├── Requirements and workflows
├── Domain boundaries
├── Components and services
├── APIs and communication
├── Data ownership and storage
├── State and runtime behavior
├── Security and reliability
├── Performance and scalability
├── Infrastructure and deployment
└── Observability and operations
```

It asks:

> How should this particular software system work and satisfy its requirements and constraints?

Software System Design is the primary current scope of this directory.

## Relationship Between the Scopes

```text
General System Design
        ↓ specialized for

Software-Intensive Systems
        ↓ becomes

Software System Design
        ↓ informed by

Computer Science and Software Engineering Foundations
```

This is a scope relationship, not a mandatory development sequence.

## Neighboring Perspectives

System Design interacts with several perspectives without completely containing them.

| Perspective | Primary concern | Relationship to System Design |
| --- | --- | --- |
| Business Analysis | Business needs, actors, rules, and workflows | Informs what the system must accomplish |
| Domain Modeling | Business concepts, language, boundaries, and rules | Connects business understanding to software models |
| Software Architecture | Significant system-wide structures, constraints, and trade-offs | Guides and emerges from major design decisions |
| Infrastructure Engineering | Compute, networking, storage, deployment, and runtime platforms | Enables and constrains the design |
| Implementation and Operations | Concrete behavior and production evidence | Realize the design and provide feedback |

These perspectives interact iteratively:

```text
Business Analysis ←──────────────┐
        ↕                        │
Domain Modeling                  │ feedback
        ↕                        │
System Design ↔ Architecture ↔ Infrastructure
        ↕                        │
Implementation and Operations ───┘
```

## Relationship to Computer Systems

[Computer Systems](../computer-science-foundations/computer-systems/README.md) studies foundational behavior and limitations involving hardware, operating systems, networking, storage, and distributed computation.

System Design applies those foundations through choices about components, communication, data, failure handling, deployment, and operations.

## Distributed-System Design

Distributed Systems can be viewed as both a Computer Science foundation and an applied design area.

```text
Distributed Systems as Computer Science
→ principles, properties, and limitations

Distributed-System Design
→ decisions for a particular distributed system
```

Applied questions include:

- Where should responsibilities and data live?
- How should nodes communicate?
- What happens during network or node failure?
- Which consistency guarantees are required?
- How should work be retried without duplicating effects?
- How will the system be deployed, observed, and recovered?

## Questions for Future Study

- How should requirements become system responsibilities?
- Where should component, module, or service boundaries be drawn?
- How should data be modeled, owned, and kept consistent?
- When should communication be synchronous or asynchronous?
- How should security and trust boundaries be designed?
- What reliability, performance, and scalability requirements matter?
- How should infrastructure constraints influence design?
- How should production evidence change earlier decisions?

Dedicated documents should be created only when these topics are studied in enough depth to support them.

## Related Concepts

- [Computer Science Foundations](../computer-science-foundations/README.md)
- [Computer Systems](../computer-science-foundations/computer-systems/README.md)
- [Software Engineering Foundations](../computer-science-foundations/software-engineering/README.md)
- [Software Architecture](../computer-science-foundations/software-engineering/software-architecture.md)
- [Software Development Practices](../software-development-practices/README.md)
- [Frameworks, Libraries, and Tooling](../framework-tooling/README.md)
