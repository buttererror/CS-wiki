# Computer Systems

## Purpose

Computer Systems is the area of Computer Science concerned with how hardware, system software, storage, networking, and multiple computing nodes work together to execute programs.

This landing page introduces the area and identifies questions for future study. It does not yet represent complete coverage of Computer Systems in this wiki.

## Reading This Map

The categories below overlap. For example, operating systems depend on computer architecture, databases use storage and networking, and distributed systems combine networking, concurrency, storage, and failure handling.

```text
Computer Systems
│
├── Computer Architecture
│   ├── Processors
│   ├── Memory
│   └── Input and output
│
├── Operating Systems
│   ├── Processes and threads
│   ├── Memory management
│   ├── Filesystems
│   └── Resource scheduling
│
├── Networking
│   ├── Communication protocols
│   ├── Routing
│   └── Network reliability
│
├── Storage and Data Systems
│   ├── Filesystems
│   ├── Databases
│   └── Replication
│
└── Distributed Systems
    ├── Coordination
    ├── Partial failure
    ├── Consistency
    ├── Consensus
    └── Fault tolerance
```

## Questions Computer Systems Studies

- How does software execute on physical machines?
- How are processors, memory, storage, and devices coordinated?
- How does an operating system manage concurrent programs and resources?
- How do machines communicate over networks?
- What changes when computation spans multiple independent nodes?
- How do concurrency, failure, latency, and performance affect behavior?

## Relationship to System Design

Computer Systems provides foundational knowledge and constraints. System Design applies that knowledge when deciding how a particular system should work.

```text
Computer Systems
→ studies system behavior, mechanisms, and limitations

Software System Design
→ applies those foundations to a concrete software system
```

Example:

```text
Network communication can fail
→ Computer Systems foundation

Use timeouts, retries, idempotency, and observability
→ applied System Design decisions
```

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

The foundation explains properties and limitations. Distributed-System Design applies them to a particular system. Applied documents should link to foundational explanations rather than redefine them independently.

## Current Coverage

Related practical notes currently exist for:

- [Linux](../../miscellaneous/linux/linux-general.md)
- [Docker](../../miscellaneous/linux/docker.md)
- [PostgreSQL](../../miscellaneous/linux/postgresql.md)
- [Databases](../../miscellaneous/backend/databases.md)

These are practical or technology-focused notes, not substitutes for future foundational documents on operating systems, networking, storage, or distributed systems.

## Related Concepts

- [Computer Science Foundations](../README.md)
- [Software Engineering Foundations](../software-engineering/README.md)
- [System Design](../../system-design/README.md)
- [Software System Design](../../system-design/software-system-design/README.md)
- [Software Architecture](../software-engineering/software-architecture.md)
