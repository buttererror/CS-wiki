# System Design

## Purpose

System Design is the applied activity of deciding how a system's parts,
responsibilities, relationships, constraints, and lifecycle should fit
together.

It is a cross-cutting area rather than a single branch contained entirely by
Computer Science or Software Engineering. The term is used at several scopes,
and those scopes draw from different disciplines.

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

## Scope 2: Computer System Design

Computer System Design concerns the organization and interaction of computing
hardware and system software.

```text
Computer System Design
│
├── Processors and instruction execution
├── Memory hierarchies
├── Operating systems and runtime platforms
├── Networking
├── Storage systems
└── Distributed infrastructure
```

It draws from Computer Science and Computer Engineering and asks:

> How should computing components be organized to execute, store, and exchange
> information under physical and computational constraints?

## Scope 3: Software System Design

Software System Design applies system-design reasoning to software-intensive
systems.

```text
Software System Design
│
├── Business and domain concerns
├── Software structures and behavior
├── Data and communication
└── Quality attributes and operational constraints
```

It asks:

> How should this particular software system work and satisfy its requirements
> and constraints?

The focused [Software System Design](software-system-design/) landing
page develops this scope and owns its detailed navigation. The broader and
lower-level scopes remain important context.

## Relationship Between the Scopes and Disciplines

```text
Systems Engineering and related fields
        ↕
General System Design

Computer Science and Computer Engineering
        ↕
Computer System Design

Software Engineering
        ↕
Software System Design

All three scopes overlap when a real system combines
people, hardware, software, infrastructure, and operations.
```

This is a relationship map, not a strict containment hierarchy or a mandatory
development sequence. A decision can belong to more than one scope.

## Neighboring Perspectives

System Design interacts with several perspectives without completely containing them.

| Perspective | Primary concern | Relationship to System Design |
| --- | --- | --- |
| Business Analysis | Business needs, actors, rules, and workflows | Informs what the system must accomplish |
| Domain Modeling | Business concepts, language, boundaries, and rules | Connects business understanding to software models |
| Computer Science | Computation, algorithms, information, and computational systems | Supplies foundational models and constraints |
| Computer Engineering | Computing hardware and hardware–software interaction | Informs computer-system organization and physical constraints |
| Software Architecture | Significant system-wide structures, constraints, and trade-offs | Guides and emerges from major design decisions |
| Security | Threats, trust boundaries, identities, protections, and security guarantees | Constrains and participates in design at every scope |
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

[Computer Systems](../computer-science-foundations/computer-systems/) studies foundational behavior and limitations involving hardware, operating systems, networking, storage, and distributed computation.

Computer System Design applies those foundations to computing platforms and
infrastructure. Software System Design applies them through choices about
components, communication, data, failure handling, deployment, and operations.

## Distributed-System Design

Distributed Systems can be viewed as a Computer Science and Computer Systems
area as well as an applied design area.

```text
Distributed Systems as Computer Science
→ principles, properties, and limitations

Distributed Computer System Design
→ nodes, networks, storage, coordination, and runtime infrastructure

Distributed-System Design
→ software and operational decisions for a particular distributed system
```

Applied questions include:

- Where should responsibilities and data live?
- How should nodes communicate?
- What happens during network or node failure?
- Which consistency guarantees are required?
- How should work be retried without duplicating effects?
- How will the system be deployed, observed, and recovered?

## Current Focused Areas

- [Software System Design](software-system-design/) — applied design of
  software-intensive systems.
- [Domain-Driven Design](software-system-design/domain-driven-design.md) — using
  domain understanding, language, models, and boundaries to manage complex
  business software.
- [Neighboring Perspectives](software-system-design/neighboring-perspectives.md)
  — distinguishes the disciplines and engineering perspectives that interact
  during software system design.

## Related Concepts

- [Computer Science Foundations](../computer-science-foundations/)
- [Computer Systems](../computer-science-foundations/computer-systems/)
- [Software Engineering Foundations](../computer-science-foundations/software-engineering/)
- [Software System Design](software-system-design/)
- [Software Architecture](../computer-science-foundations/software-engineering/software-architecture.md)
- [Software Development Practices](../software-development-practices/)
- [Frameworks, Libraries, and Tooling](../framework-tooling/)
- [Security](../security/)
