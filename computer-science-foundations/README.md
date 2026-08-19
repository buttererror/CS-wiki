# Computer Science Foundations

## Purpose

Computer Science studies computation, information, algorithms, programming languages, and computational systems. Its ideas support both theoretical inquiry and practical fields such as software engineering.

This directory provides a broad landing page for foundational areas and routes readers to the areas currently developed in this wiki.

## Reading This Map

The map below is an orientation tool, not a rigid or exhaustive taxonomy. Computer-science areas overlap, their boundaries vary across academic and engineering contexts, and one topic may be studied from several perspectives.

Directory nesting in this wiki expresses navigation and document ownership. It does not claim that one academic field is strictly contained inside another.

## Broad Field Map

```text
Computer Science and Related Computing Foundations
│
├── Computation and Theory
│   ├── Models of computation
│   ├── Logic and formal reasoning
│   └── Computational complexity
│
├── Algorithms and Data Structures
│   ├── Data abstractions and concrete representations
│   ├── Fundamental algorithm families and design strategies
│   └── Correctness and efficiency analysis
│
├── Programming Languages
│   ├── Syntax and semantics
│   ├── Type systems
│   └── Programming paradigms
│
├── Computer Systems
│   ├── Operating systems
│   ├── Networks
│   ├── Databases
│   └── Distributed systems
│
├── Data and Intelligence
│   ├── Data management
│   ├── Artificial intelligence
│   └── Machine learning
│
├── Computer Security Foundations
│   ├── Security properties and threat models
│   ├── Cryptographic principles
│   ├── Access-control models
│   └── Security protocol foundations
│
└── Software Engineering
    ├── Design principles
    ├── Patterns and communication
    ├── Software architecture
    └── Implementation practices
```

## From Foundations to Applied Engineering

```text
Computer Science Foundations
│
├── Algorithms and Data Structures
├── Programming Languages
├── Computer Systems
│   └── Distributed Systems
├── Computer Security Foundations
├── Data and Intelligence
└── Computation and Theory
        │
        │ inform and constrain
        ▼
Software Engineering Foundations
│
├── Paradigms
├── Design Principles
├── Patterns
├── Architecture
└── Terminology
        │
        │ guide and support
        ▼
Applied Software Engineering
│
├── Software System Design
├── Software Development Practices
├── Frameworks and Tooling
├── Infrastructure
└── Implementation
        │
        │ produces and evolves
        ▼
Concrete Software Systems
        │
        │ measurements and operational feedback
        └───────────────────────────────↺
```

This is a relationship map, not a mandatory sequence. Foundational knowledge informs engineering decisions, while implementation experience and operational evidence feed back into requirements, design, and understanding.

## Distinctions Used in This Wiki

| Concept | Scope | Primary question |
| --- | --- | --- |
| Computer Science | Foundational study of computation and computational systems | What principles, properties, and limitations govern computation? |
| Algorithms and Data Structures | Abstract operations, computational procedures, concrete data organization, and efficiency | Which abstraction represents the required operations, how can it be implemented, and what does it cost? |
| Computer Systems | Hardware, system software, networking, storage, and distributed computation | How do computing components execute and coordinate? |
| Computer Security Foundations | General security properties, adversary models, mechanisms, and limitations | Under which assumptions does a security mechanism provide a particular guarantee? |
| Software Engineering | Engineering discipline for creating and evolving software | How should software be designed, built, maintained, and operated? |
| Applied Security Engineering | Protection of particular systems under concrete threats and constraints | How should this system manage its security risks? |
| General System Design | Systems containing people, processes, hardware, software, infrastructure, and operations | How should all parts of this system fit together? |
| Software System Design | Applied design of software-intensive systems | How should this particular software system work? |
| Software Development Practices | Organization of development and delivery work | How should the system be built and evolved? |
| Infrastructure Engineering | Runtime compute, networking, storage, deployment, and operational platforms | Where and how should the system run? |

These are useful perspectives rather than isolated stages. Their responsibilities and terminology can overlap in real projects.

## Distributed Systems Through Two Lenses

```text
Distributed Systems
│
├── Computer Science lens
│   └── coordination, failure, consistency,
│       replication, consensus, and time
│
└── Applied System Design lens
    └── services, communication, retries,
        partitioning, deployment, and observability
```

Distributed Systems is a foundational Computer Systems area. Distributed-System Design applies those foundations when designing a particular system.

## Security Through Two Lenses

```text
Security
│
├── Computer Science foundations lens
│   └── security properties, adversary models,
│       cryptographic principles, access-control models,
│       and protocol behavior
│
└── Applied engineering lens
    └── identity systems, application protections,
        infrastructure controls, lifecycle decisions,
        operations, and incident response
```

The foundational lens asks which guarantees a mechanism can provide and under
which assumptions. The applied lens combines those foundations with a concrete
system's threats, requirements, users, operations, and constraints.

[Security](../security/) is the canonical landing page for both lenses
in this wiki. A dedicated foundational subdirectory should be introduced only
when focused foundational documents exist.

## Current Scope

The current foundation landing pages are:

- [Algorithms and Data Structures](algorithms-and-data-structures/) —
  distinguishes abstract data types, concrete representations, algorithms,
  and language collection APIs.
- [Computer Systems](computer-systems/) — introduces hardware, operating systems, networking, storage, and distributed computation.
- [Programming Languages](programming-languages/) — introduces
  language-level concepts and the current JavaScript material.
- [Software Engineering](software-engineering/) — connects programming paradigms, design principles, patterns, architecture, frameworks, libraries, and implementations.

Software Engineering currently has the more developed set of focused documents. Other Computer Science areas appear throughout the wiki as practical notes but do not yet have equivalent foundation indexes. Future indexes should be created only when enough focused material exists to support them.

[System Design](../system-design/) remains a top-level, cross-cutting
area in this wiki. Computer Science informs it, but General System Design also
draws from Systems Engineering, organizations, operations, and other fields.

[Security](../security/) is also top-level because its complete scope
includes Computer Science foundations as well as engineering, operational,
organizational, privacy, and risk perspectives.

## Start Here

```text
Computer Science Foundations
│
├── Algorithms and Data Structures
│   └── collections, representations, operations, and efficiency
│
├── Computer Systems Foundations
│   └── runtime, networking, storage, and distributed-system questions
│
├── Programming Languages
│   └── syntax, bindings, functions, and language semantics
│
└── Software Engineering Foundations
    └── taxonomy, principles, patterns, and architecture

Related applied areas
├── System Design
└── Software Development Practices
```

- [Computer Systems](computer-systems/)
- [Algorithms and Data Structures](algorithms-and-data-structures/)
- [Collections and Data Structures](algorithms-and-data-structures/collections.md)
- [Programming Languages](programming-languages/)
- [JavaScript](programming-languages/javascript/)
- [Software Engineering Foundations](software-engineering/)
- [Software Taxonomy](software-engineering/software-taxonomy.md)
- [Software Architecture](software-engineering/software-architecture.md)
- [System Design](../system-design/)
- [Software System Design](../system-design/software-system-design/)
- [Software Development Practices](../software-development-practices/)

## Related Areas

- [General Programming](../miscellaneous/CS.md)
- [Databases](../miscellaneous/backend/databases.md)
- [Frameworks, Libraries, and Tooling](../framework-tooling/)
- [Security](../security/)
- [System Design](../system-design/)
- [Software Development Practices](../software-development-practices/)
