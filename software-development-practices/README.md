# Software Development Practices

## Purpose

Software Development Practices are repeatable ways of organizing, building, validating, delivering, and evolving software.

They concern how engineering work is performed. They do not by themselves determine the runtime architecture of the resulting system.

## Practice Map

```text
Software Development Practices
│
├── Development Strategy
│   ├── Horizontal Development
│   ├── Vertical Development
│   └── Incremental Delivery
│
├── Scope and Prioritization
│   ├── MVP
│   └── YAGNI
│
├── Quality Practices
│   ├── Testing Strategy
│   ├── Code Review
│   └── Documentation Strategy
│
├── Repository Strategy
│   ├── Monorepo
│   └── Polyrepo
│
└── Delivery Practices
    ├── CI/CD
    ├── Release Strategy
    └── Deployment Automation
```

The map identifies related practices and future learning directions. A listed topic does not necessarily have a dedicated document yet.

## Relationship to System Design

```text
System Design
→ What system should be designed, and how should it work?

Software Development Practices
→ How should the work of building and evolving it be organized?
```

Examples:

| Decision | Primary area |
| --- | --- |
| Modular monolith or microservices | System Design and Architecture |
| Request / Response or event-driven communication | System Design |
| Monorepo or polyrepo | Software Development Practice |
| Vertical or horizontal delivery | Software Development Practice |
| MVP scope | Product and Development Practice |
| Retry and consistency strategy | System Design |
| CI pipeline organization | Development and Delivery Practice |

Practices and design still influence one another. For example, repository structure can make some boundaries easier to maintain, while architectural boundaries can shape build and deployment workflows.

## Document Index

- [Development Strategy](development-strategy.md) — compares horizontal and vertical development approaches.
- [Lean MVP and Vertical Slices](lean-mvp-vertical-slice-development.md) — connects YAGNI, MVP scope, vertical slices, incremental architecture, testing, DevOps, and documentation practices.
- [Repository Organization](repository-organization/README.md) — distinguishes
  repository boundaries from workspace tooling and runtime architecture.
- [Monorepo](repository-organization/monorepo.md) — organizes multiple related
  projects in one version-control repository.

## Future Topics

- Polyrepo.
- Workspace and build management.
- Testing strategy.
- Code review.
- CI/CD and release strategies.
- Documentation practices.

Future documents should be added when the topics are discussed in sufficient depth rather than creating empty placeholders.

## Related Concepts

- [System Design](../system-design/README.md)
- [Software Engineering Foundations](../computer-science-foundations/software-engineering/README.md)
- [Software Architecture](../computer-science-foundations/software-engineering/software-architecture.md)
- [Software System Design](../system-design/software-system-design/README.md)
- [Frameworks, Libraries, and Tooling](../framework-tooling/README.md)
