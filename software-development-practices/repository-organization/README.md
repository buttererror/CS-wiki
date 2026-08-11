# Repository Organization

## Purpose

Repository organization concerns how source code, configuration, packages, and
projects are divided among version-control repositories and managed together.

It is a Software Development Practice. It can influence collaboration, tooling,
builds, and delivery, but it does not by itself define the runtime architecture
of the software.

## Core Distinction

```text
Repository organization
→ where code lives and how changes are coordinated

Workspace and build tooling
→ how projects, dependencies, tasks, and caches are managed

Software architecture
→ how the running system is organized
```

These decisions may influence one another, but none automatically determines
the others.

## Strategies

```text
Repository Organization
│
├── Monorepo
│   └── multiple related projects in one repository
│
└── Polyrepo
    └── projects distributed across separate repositories
```

Neither strategy is universally superior. The appropriate choice depends on
ownership, access control, release independence, shared code, tooling scale,
and organizational coordination.

## Current Documents

- [Monorepo](monorepo.md)

## Related Concepts

- [Software Development Practices](../)
- [Frameworks, Libraries, and Tooling](../../framework-tooling/)
- [Software System Design](../../system-design/software-system-design/)
