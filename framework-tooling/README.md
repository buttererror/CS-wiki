# Frameworks, Libraries, and Tooling

## Purpose

This document distinguishes frameworks, libraries, framework mechanisms, technologies, and concrete API usage. It also acts as the index for framework- and library-specific learning documents.

---

## Framework

A framework provides reusable infrastructure and controls significant parts of an application's structure, setup, or lifecycle.

This framework-controlled lifecycle is a common form of [Inversion of Control](../computer-science-foundations/software-engineering/software-design-principles/inversion-of-control.md): application code supplies components or behavior that the framework invokes at predefined points.

```text
Application code
        ↓ declares components and requirements

Framework
        ↓ controls setup and lifecycle

Application code
        ↓ receives prepared infrastructure
```

Example:

```text
NestJS
→ framework
```

---

## Library

A library provides reusable functionality that application code calls when needed.

```text
Application code
        ↓ calls

Library API
        ↓ provides

Reusable capability
```

Example:

```text
TanStack Query
→ library
```

A library may still manage internal state, scheduling, subscriptions, or cache lifecycles. The framework/library distinction is useful, but real tools can exhibit characteristics of both.

The common summary—application code calls a library, while a framework calls application code—describes the dominant control relationship rather than an absolute boundary.

---

## Framework Mechanism

A framework mechanism is one capability implemented by a framework.

```text
NestJS
→ framework

NestJS Dependency Injection
→ framework mechanism

Dependency Injection
→ underlying software design technique
```

---

## API Usage

Concrete source code invokes the capabilities exposed by a framework or library.

```text
TanStack Query
→ library

useQuery(...)
→ concrete API usage
```

```text
NestJS
→ framework

@Injectable() and constructor injection
→ concrete framework usage
```

---

## Comparison

| Level | Meaning | Example |
| --- | --- | --- |
| Framework | Provides infrastructure and application structure | NestJS |
| Library | Provides reusable capabilities called by application code | TanStack Query |
| Framework mechanism | One capability implemented by a framework | NestJS Dependency Injection |
| Underlying concept | General pattern, principle, or technique | Dependency Injection |
| API usage | Concrete source-code expression | `useQuery(...)` |
| Implementation | Application-specific code and configuration | Auth query keys and cache updates |

---

## Document Index

- [NestJS Dependency Injection](nestjs-dependency-injection.md)
- [React Application Delivery](react-application-delivery/README.md)
- [TanStack Query](tanstack-query.md)

---

## Related Concepts

- [Software Taxonomy](../computer-science-foundations/software-engineering/software-taxonomy.md)
- [Programming Paradigm](../computer-science-foundations/software-engineering/programming-paradigms/programming-paradigm.md)
- [Gang of Four Design Patterns](../computer-science-foundations/software-engineering/design-patterns/gang-of-four-design-patterns.md)
- [Software Design Principles](../computer-science-foundations/software-engineering/software-design-principles/README.md)
- [Inversion of Control](../computer-science-foundations/software-engineering/software-design-principles/inversion-of-control.md)
- [Monorepo](../software-development-practices/repository-organization/monorepo.md)
