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
│   ├── Problem-solving procedures
│   ├── Data organization
│   └── Efficiency analysis
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
| Computer Systems | Hardware, system software, networking, storage, and distributed computation | How do computing components execute and coordinate? |
| Software Engineering | Engineering discipline for creating and evolving software | How should software be designed, built, maintained, and operated? |
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

## Current Scope

The current foundation landing pages are:

- [Computer Systems](computer-systems/README.md) — introduces hardware, operating systems, networking, storage, and distributed computation.
- [Software Engineering](software-engineering/README.md) — connects programming paradigms, design principles, patterns, architecture, frameworks, libraries, and implementations.

Software Engineering currently has the more developed set of focused documents. Other Computer Science areas appear throughout the wiki as practical notes but do not yet have equivalent foundation indexes. Future indexes should be created only when enough focused material exists to support them.

[System Design](../system-design/README.md) remains a top-level, cross-cutting
area in this wiki. Computer Science informs it, but General System Design also
draws from Systems Engineering, organizations, operations, and other fields.

## Start Here

```text
Computer Science Foundations
│
├── Computer Systems Foundations
│   └── runtime, networking, storage, and distributed-system questions
│
└── Software Engineering Foundations
    └── taxonomy, principles, patterns, and architecture

Related applied areas
├── System Design
└── Software Development Practices
```

- [Computer Systems](computer-systems/README.md)
- [Software Engineering Foundations](software-engineering/README.md)
- [Software Taxonomy](software-engineering/software-taxonomy.md)
- [Software Architecture](software-engineering/software-architecture.md)
- [System Design](../system-design/README.md)
- [Software Development Practices](../software-development-practices/README.md)

## Related Areas

- [General Programming](../miscellaneous/CS.md)
- [Databases](../backend/databases.md)
- [Frameworks, Libraries, and Tooling](../framework-tooling/README.md)
- [System Design](../system-design/README.md)
- [Software Development Practices](../software-development-practices/README.md)
