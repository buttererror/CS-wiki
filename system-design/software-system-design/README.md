# Software System Design

## Purpose

Software System Design is the applied activity of deciding how a particular
software-intensive system should satisfy its requirements and constraints.

It connects software-engineering foundations with concrete decisions about
business behavior, boundaries, components, communication, data, quality
attributes, infrastructure, and operations.

## Classification

- **Field:** Software Engineering
- **Broader scope:** System Design
- **Related perspectives:** Domain Modeling, Software Architecture,
  Infrastructure Engineering, Implementation, and Operations

This classification identifies the primary disciplinary relationship. It does
not imply that Software System Design is isolated from Computer Science,
business analysis, security, data engineering, or organizational concerns.

## Core Question

> How should this particular software system work and satisfy its requirements
> and constraints?

## Scope

```text
Software System Design
│
├── Requirements and workflows
├── Domain models and boundaries
├── Components, modules, and services
├── APIs and communication
├── Data ownership, storage, and consistency
├── State and runtime behavior
├── Security and trust boundaries
├── Reliability, performance, and scalability
├── Infrastructure and deployment
└── Observability and operations
```

The exact boundary varies by context. A design decision may simultaneously be
a domain, architecture, infrastructure, security, or operational decision.

## Relationship to Root System Design

```text
System Design
│
├── General System Design
├── Computer System Design
└── Software System Design
```

[Root System Design](../README.md) owns the broad definition and distinguishes
the scopes. This page is the canonical landing page for the software-focused
scope.

## Relationship to Software Engineering

```text
Software Engineering Foundations
        ↕ informs and is refined by
Software System Design
        ↕ realized and evaluated through
Implementation and Operations
```

[Software Engineering Foundations](../../computer-science-foundations/software-engineering/README.md)
provides paradigms, principles, patterns, architecture concepts, and shared
terminology. Software System Design applies and combines them for a concrete
system. Production evidence can then change both the design and the team's
understanding.

## Relationship to Software Architecture

Software System Design covers the full set of decisions needed to make a
software system work. Software Architecture emphasizes the significant,
system-wide structures and decisions that are costly to change or strongly
constrain other decisions.

```text
Software System Design
→ all relevant design decisions for a software system

Software Architecture
→ the system's significant structures, constraints, and trade-offs
```

The boundary is contextual; architecture is not a separate sequential phase.

## Interacting Perspectives

```text
Business Analysis ↔ Domain Modeling
        ↕               ↕
Requirements ↔ Software System Design ↔ Software Architecture
                        ↕
             Infrastructure and Security
                        ↕
             Implementation and Operations
```

These perspectives form a feedback system rather than a one-way pipeline.

## Questions for Study

- How should requirements become system responsibilities?
- Where should component, module, or service boundaries be drawn?
- How should data be modeled, owned, and kept consistent?
- When should communication be synchronous or asynchronous?
- How should security and trust boundaries be designed?
- Which reliability, performance, and scalability requirements matter?
- How should infrastructure constraints influence design?
- How should production evidence change earlier decisions?

## Current Documents

- [Domain-Driven Design](domain-driven-design.md) — connects business-domain
  understanding to software models and boundaries.

## Related Concepts

- [System Design](../README.md)
- [Software Engineering Foundations](../../computer-science-foundations/software-engineering/README.md)
- [Software Architecture](../../computer-science-foundations/software-engineering/software-architecture.md)
- [Software Development Practices](../../software-development-practices/README.md)
- [Communication Patterns](../../computer-science-foundations/software-engineering/communication-patterns/README.md)
- [Architectural Styles](../../computer-science-foundations/software-engineering/architectural-styles/README.md)
