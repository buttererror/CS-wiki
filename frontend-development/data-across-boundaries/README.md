# Data Across Frontend Boundaries

**Keywords:** frontend data boundary, contract, schema, adapter, serialization, deserialization, API request, API response, runtime validation, trust boundary

Frontend applications repeatedly move data between browser controls, application state, HTTP requests, server responses, caches, workers, storage, and backend systems. This area explains how those boundaries change data representation, ownership, validation, and trust.

## Classification

- **Primary area:** Applied frontend engineering
- **Related areas:** Software architecture, type systems, API design, validation, security, and state management
- **Scope:** Framework-independent principles for data entering, leaving, or changing responsibility inside a frontend feature

The directory is organized around boundary behavior, not around one library. Zod, React Hook Form, and TanStack Query can implement parts of the model, but they do not define the model.

## Reading Order

1. [Contracts, Boundaries, Schemas, And Adapters](contracts-boundaries-schemas-and-adapters.md) explains how a feature can own several distinct data contracts and how runtime schemas, inferred types, and semantic adapters relate.
2. [Serialization Across Boundaries](serialization.md) explains how runtime values become transferable representations for networks, storage, workers, and server/client interfaces.

## Central Distinction

```text
Contract
→ what a representation means at one boundary

Serialization
→ how a supported representation crosses a transport or storage boundary
```

A value can satisfy a contract before serialization, be serialized into JSON, then be parsed and validated against another contract at the destination.

## Related Areas

- [Frontend Development](../)
- [Type Systems](../../computer-science-foundations/programming-languages/type-systems.md)
- [TypeScript Type-System Foundations](../../computer-science-foundations/programming-languages/typescript/type-system.md)
- [Software Architecture](../../computer-science-foundations/software-engineering/software-architecture.md)
- [Software Design Principles](../../computer-science-foundations/software-engineering/software-design-principles/)
- [TanStack Query](../../framework-tooling/tanstack-query.md)
