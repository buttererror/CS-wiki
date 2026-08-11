# Software System Design and Neighboring Perspectives

## Purpose

Business Analysis, Domain Modeling, Software System Design, Software
Architecture, Infrastructure Engineering, and Implementation and Operations
look at the same system from different perspectives.

This document distinguishes their primary concerns without presenting them as
isolated stages or rigid organizational roles.

## Comparison

| Perspective | Primary concern | Typical questions |
| --- | --- | --- |
| Business Analysis | Business needs, actors, policies, and workflows | What problem exists, for whom, and under which rules? |
| Domain Modeling | Concepts, language, behavior, and model boundaries | Which concepts and rules must the software represent? |
| Software System Design | How a particular software system should work | How should responsibilities, data, interactions, and quality requirements fit together? |
| Software Architecture | Significant structures, constraints, and trade-offs | Which decisions strongly shape or constrain the system? |
| Infrastructure Engineering | Runtime compute, networking, storage, and delivery platforms | Where and under what operational constraints will the system run? |
| Implementation and Operations | Concrete behavior and production evidence | Does the system work, and what do real usage and failures teach us? |

The outputs listed below are common examples, not documents that every team or
process must produce.

## Business Analysis

Business Analysis develops an understanding of business goals, users,
workflows, policies, terminology, and pain points.

Common outputs include requirements, user stories, process maps, acceptance
criteria, and clarified business language. This perspective informs design but
does not simply hand completed requirements to engineering once.

## Domain Modeling

Domain Modeling creates purposeful representations of important concepts,
rules, states, behavior, and boundaries in the problem domain.

It connects business understanding to software without requiring every
business concept to become a class, database table, or service.

[Domain-Driven Design](domain-driven-design.md) provides one disciplined way to
develop and connect domain models with software.

## Software System Design

Software System Design decides how requirements and constraints become system
responsibilities, workflows, components, contracts, data behavior, security,
reliability, and operational behavior.

It includes architecture decisions but is not limited to them. It also includes
smaller decisions required to make the system behave correctly.

## Software Architecture

Software Architecture emphasizes the significant structures, constraints, and
trade-offs that influence many other decisions or are costly to change.

Architecture may cover module or service boundaries, communication structure,
data ownership, deployment topology, and important quality attributes. A
technology selection is architectural only when its consequences are
architecturally significant in that context.

## Infrastructure Engineering

Infrastructure Engineering provides and evolves the compute, networking,
storage, deployment, observability, and recovery environment in which the
system operates.

Infrastructure both enables and constrains design. It is not merely a final
deployment step.

## Implementation and Operations

Implementation realizes design through code, configuration, schemas, tests,
and automation. Operations exposes real workloads, failures, costs, and user
behavior.

That evidence feeds back into business understanding, models, design,
architecture, and infrastructure.

## Clinic Example

For a dermatology clinic platform, the perspectives might emphasize:

### Business Analysis

- How appointments, consultations, and treatment sessions differ.
- Which responsibilities belong to receptionists, doctors, and technicians.
- Which appointment, billing, and refund policies apply.

### Domain Modeling

- The meanings and lifecycles of Appointment, Visit, Treatment Session,
  Invoice, and Payment.
- Rules governing clinical and billing concepts.
- Model boundaries where the same term has different meanings.

### Software System Design

- Check-in, visit, treatment-session, queue, and payment workflows.
- APIs, state transitions, data ownership, permissions, and failure behavior.
- Interactions among patient administration, clinical care, and billing.

### Software Architecture

- Module boundaries and dependency direction.
- Whether one deployment or independent services are justified.
- Significant communication, tenancy, security, and data-isolation decisions.

### Infrastructure Engineering

- Runtime compute, containers, networking, DNS, storage, backups, monitoring,
  and recovery.
- Capacity, availability, operational cost, and deployment constraints.

### Implementation and Operations

- Concrete components, endpoints, database constraints, tests, deployment
  configuration, and telemetry.
- Evidence from actual clinic workflows, incidents, performance, and support.

## Feedback Model

```text
Business Analysis ↔ Domain Modeling
        ↕               ↕
Requirements ↔ Software System Design ↔ Software Architecture
                        ↕
             Infrastructure Engineering
                        ↕
             Implementation and Operations
                        │
                        └── evidence feeds every perspective
```

This is not a sequence such as:

```text
analysis → modeling → design → architecture → infrastructure → done
```

In real systems, learning and constraints move in every direction. The
perspectives may also be performed by the same people, especially in smaller
teams.

## Key Distinctions

- Business Analysis studies the business need and context.
- Domain Modeling represents selected domain knowledge and rules.
- Software System Design decides how a particular software system should work.
- Software Architecture emphasizes its significant structural decisions.
- Infrastructure Engineering shapes the runtime environment and constraints.
- Implementation and Operations realize decisions and produce evidence.
- The boundaries overlap and remain contextual.

## Related Concepts

- [Software System Design](./)
- [System Design](../)
- [Domain-Driven Design](domain-driven-design.md)
- [Software Architecture](../../computer-science-foundations/software-engineering/software-architecture.md)
- [Software Engineering Foundations](../../computer-science-foundations/software-engineering/)
- [Software Development Practices](../../software-development-practices/)
- [Modular Monolith](../../computer-science-foundations/software-engineering/architectural-styles/modular-monolith.md)
- [Microservice Architecture](../../computer-science-foundations/software-engineering/architectural-styles/microservice-architecture.md)
- [Repository Organization](../../software-development-practices/repository-organization/)
- [Security](../../security/)
