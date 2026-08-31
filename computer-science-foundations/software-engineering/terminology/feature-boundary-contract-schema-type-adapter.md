# Feature, Boundary, Contract, Schema, Type, And Adapter

**Keywords:** feature, feature ownership, boundary, responsibility boundary, trust boundary, contract, boundary contract, schema, executable contract, runtime validation, type, compile-time knowledge, adapter, semantic adapter, architecture layers

## Purpose

These terms often appear together when engineers reason about data moving through an application:

```text
Feature
  → establishes ownership

Boundary
  → identifies where responsibility changes

Contract
  → defines the expected representation

Schema
  → optionally makes that contract runtime-verifiable

Type
  → optionally provides compile-time knowledge

Adapter
  → optionally translates between different contracts
```

This is a **reasoning sequence**, not a rigid taxonomy hierarchy or a mandatory runtime pipeline. The terms belong to overlapping areas of software engineering and programming-language theory.

## Taxonomic Placement

| Term | Primary perspective | Meaning in this sequence |
| --- | --- | --- |
| Feature | Software architecture and modular organization | A cohesive business capability or application responsibility that owns related behavior and data. |
| Boundary | Architecture, design, and security | A point where ownership, trust, representation, lifecycle, or responsibility changes. |
| Contract | Interface, API, and data design | The expected shape, meaning, behavior, or obligations at one boundary. |
| Schema | Data modeling and runtime validation | An executable description that can parse, validate, or transform actual values. |
| Type | Programming-language type systems | Compile-time knowledge used to check how code reads, constructs, and passes values. |
| Adapter | Software design patterns and integration | Translation that lets two intentionally different contracts cooperate. |

No directory or discipline owns all six exclusively. They form a useful cross-topic vocabulary for connecting architecture, data design, runtime validation, type systems, and integration patterns.

## Feature

A **feature** groups behavior around a business capability or user-facing responsibility, such as Patients, Catalog, or Appointments.

```text
features/
├── patients/
├── catalog/
└── appointments/
```

Feature ownership answers:

> Which cohesive part of the application is responsible for this behavior and data?

A feature is not necessarily one component, route, service, package, or deployment unit. Its physical representation depends on the system's scale and architecture.

## Boundary

A **boundary** is where something relevant changes, such as:

- responsibility or ownership;
- trust level;
- lifecycle;
- process or network location;
- data representation; or
- public versus private visibility.

Examples include a form boundary, frontend API boundary, backend request boundary, module boundary, process boundary, and database boundary.

A boundary does not automatically require a network. Two modules in one frontend application can have a meaningful responsibility boundary.

## Contract

A **contract** defines what one side of a boundary promises, accepts, returns, or expects. A data contract can include:

- property names and value shapes;
- optional, missing, empty, and nullable semantics;
- validation constraints;
- normalization behavior;
- error behavior; and
- compatibility or versioning expectations.

A contract can be documented in prose, represented by a TypeScript type, expressed as a runtime schema, enforced by tests, or supported by several of these mechanisms together.

The contract is the meaning. A type or schema is one way to represent and enforce part of that meaning.

## Schema

A **schema** is optional because not every contract has an executable runtime description. When present, it can validate or transform actual values:

```text
unknown runtime value
  ↓ schema parse
validated or transformed value
```

A schema does not automatically own transport, cache, workflow, or persistence behavior. It verifies the part of the contract it expresses.

## Type

A **type** provides compile-time knowledge when the programming language and toolchain support relevant static checking.

```text
source code
  ↓ type checker
compile-time diagnostics
  ↓ types erased or otherwise not used as runtime validation
runtime execution
```

A type alone does not prove that network JSON or another untrusted runtime value is valid. A runtime schema can sometimes generate or infer the type so the two do not drift.

The type is marked optional in the sequence because dynamically typed programs can still have features, boundaries, and contracts without a static type system.

## Adapter

An **adapter** is needed only when two contracts differ and one side must translate to the other:

```text
Contract A
  ↓ adapter
Contract B
```

The translation can be structural, such as renaming a field, or semantic, such as interpreting an empty form string as an omitted creation field.

When the contracts already match and no translation is required, adding an adapter may create indirection without value.

## Why The Optional Steps Matter

The complete sequence should not be misread as a requirement to create six artifacts for every value.

```text
Feature → Boundary → Contract
```

is the essential conceptual reasoning.

Then ask:

```text
Does this contract need runtime verification?
  → add a schema when useful

Does implementation code benefit from static checking?
  → define or infer a type

Does another boundary use a different contract?
  → add an adapter when translation is required
```

## Common Misclassifications

- Treating a schema as the contract's complete business meaning.
- Treating a compile-time type as runtime proof.
- Calling every transformation an adapter even when it adds no boundary value.
- Assuming a feature is a deployment unit or framework component.
- Treating boundaries as only network boundaries.
- Reading the sequence as a strict parent-child taxonomy.

## Applied Example

For the full frontend application of this vocabulary—including form, request, response, transport, cache, and backend concerns—see [Frontend Contracts, Boundaries, Schemas, And Adapters](../../../frontend-development/data-across-boundaries/contracts-boundaries-schemas-and-adapters.md).

## Related Topics

- [Software Architecture](../software-architecture.md)
- [Software Design Principles](../software-design-principles/)
- [Type Systems](../../programming-languages/type-systems.md)
- [TypeScript Type-System Foundations](../../programming-languages/typescript/type-system.md)
- [Serialization Across Boundaries](../../../frontend-development/data-across-boundaries/serialization.md)
- [Domain-Driven Design](../../../system-design/software-system-design/domain-driven-design.md)
