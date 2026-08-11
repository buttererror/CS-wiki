# Monorepo

- **Field:** Software Engineering
- **Primary area:** Repository Organization
- **Related areas:** Developer Tooling, Build Engineering, CI/CD, and Code
  Organization

## Definition

A monorepo is a version-control strategy in which multiple related projects,
applications, services, or packages are maintained in one repository.

It answers:

> Where should related code live, and how should changes across it be
> coordinated?

## Example

```text
clinic-platform/
├── apps/
│   ├── admin-web/
│   ├── doctor-web/
│   └── api/
│
└── packages/
    ├── ui/
    ├── api-client/
    └── shared-types/
```

The same projects could instead be distributed across several repositories,
which is commonly called a polyrepo strategy.

## Monorepo Is Not Tooling

A monorepo describes repository organization. Tools can make that organization
practical at scale, but they do not define it.

| Concern | Examples |
| --- | --- |
| Package and workspace management | npm, pnpm, or Yarn workspaces |
| Task orchestration and caching | Nx or Turborepo |
| Build systems | Bazel or Nx |
| Continuous integration | CI pipelines with change-aware jobs |
| Implementation | Workspace configuration and repository layout |

A repository can be a monorepo without Nx or Turborepo, and installing either
tool does not automatically create sound project boundaries.

## Monorepo Is Not Runtime Architecture

```text
Monorepo
→ source-code and change-management boundary

Modular Monolith
→ one deployable application with internal module boundaries

Microservice Architecture
→ independently deployable service boundaries
```

A monorepo can contain one application, a modular monolith, many microservices,
frontend applications, shared packages, or any combination of them. Repository
and deployment boundaries are independent decisions.

## Potential Benefits

- Atomic changes across related applications and packages.
- Easier discovery and reuse of shared code.
- Consistent linting, testing, and build conventions.
- Coordinated refactoring across project boundaries.
- One place to manage shared types and internal packages.

These benefits depend on repository discipline and tooling; they are not
automatic consequences of putting code in one repository.

## Trade-Offs

- Builds and CI can become slow without change detection and caching.
- Repository-wide tooling and dependency policies require coordination.
- Fine-grained access control can be difficult.
- Shared packages can create excessive coupling.
- Repository size and local workflows can become expensive.
- Teams may accidentally coordinate releases that should remain independent.

## Relationship to Domain-Driven Design

[Domain-Driven Design](../../system-design/software-system-design/domain-driven-design.md)
can inform model and ownership boundaries. A monorepo may make changes across
those boundaries easier, but it neither discovers nor enforces them.

```text
Bounded Context
→ model and language boundary

Workspace package
→ source-code packaging boundary

Repository
→ version-control boundary
```

These boundaries may align when useful, but they are not equivalent.

## Relationship to Architectural Styles

A monorepo can host a
[Modular Monolith](../../computer-science-foundations/software-engineering/architectural-styles/modular-monolith.md),
[Microservice Architecture](../../computer-science-foundations/software-engineering/architectural-styles/microservice-architecture.md),
or another architecture. Architecture may influence the repository layout, and
repository constraints may affect engineering workflows, but neither dictates
the other.

## Key Takeaways

- Monorepo is a repository-organization strategy.
- Workspace, build, and CI tools support a monorepo but are separate concepts.
- Repository structure does not determine runtime or deployment architecture.
- Shared code can improve consistency or create coupling.
- Monorepo and polyrepo choices depend on technical and organizational needs.

## Related Concepts

- [Repository Organization](./)
- [Software Development Practices](../)
- [Development Strategy](../development-strategy.md)
- [Software System Design](../../system-design/software-system-design/)
- [Frameworks, Libraries, and Tooling](../../framework-tooling/)
- [Domain-Driven Design](../../system-design/software-system-design/domain-driven-design.md)
- [Modular Monolith](../../computer-science-foundations/software-engineering/architectural-styles/modular-monolith.md)
- [Microservice Architecture](../../computer-science-foundations/software-engineering/architectural-styles/microservice-architecture.md)
