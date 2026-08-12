# Software Engineering Terminology

## Purpose

This directory defines recurring software-engineering terms used across the wiki, especially terms whose meaning depends on abstraction level or context.

These documents clarify how a term is used in this knowledge base. They do not create a new taxonomy category for every word.

## Keyword Routing

Canonical reference pages keep a short `**Keywords:**` line near the beginning
for exact terminology, aliases, symbols, and likely search wording. Add a
keyword to its owning page first.

This terminology directory is the cross-topic layer: add a term here when it
needs a dedicated definition, resolves ambiguity, or helps readers find the
same idea across multiple subjects. Link to the canonical explanation instead
of duplicating it.

## Examples of Terms

- [Mechanism](mechanism.md) — the operational process or capability through which behavior is enabled or realized.
- [Pattern](pattern.md) — a reusable description of a recurring arrangement, interaction, or solution in context.
- [Style](style.md) — principles and constraints that shape the overall character of a design.
- [Client](client.md) — an interaction role that initiates use of a capability, plus the related meanings of client libraries and client objects.
- [Route Map](route-map.md) — a context-dependent lookup that associates
  route identifiers with handlers, components, or responses.
- [Cache Invalidation](cache-invalidation.md) — the process of declaring cached representations stale when the source of truth changes.
- [Caveat](caveat.md) — a warning, non-obvious limitation, or specific condition associated with a design choice, API, or framework feature.
- [Post-Authentication Redirects](../../../frontend-development/routing-and-interaction/post-authentication-redirects.md) — a return-to navigation pattern that resumes a validated internal destination after sign-in.
- Abstraction — a simplified interface or model that hides selected details.
- Component — a distinguishable part of a larger software structure.
- Runtime — the environment and period in which a program executes.

Mechanism, Pattern, Style, Client, Route Map, Cache Invalidation, and Caveat currently have dedicated
documents. The remaining examples indicate possible future terminology notes.

## Relationship to the Knowledge Base

```text
Taxonomy documents
→ classify concepts

Terminology documents
→ clarify recurring words used to describe those concepts

Topic documents
→ explain individual principles, patterns, technologies, and implementations
```

## Document Index

- [Mechanism](mechanism.md)
- [Pattern](pattern.md)
- [Style](style.md)
- [Client](client.md)
- [Route Map](route-map.md)
- [Cache Invalidation](cache-invalidation.md)
- [Caveat](caveat.md)

## Related Concepts

- [Software Engineering Foundations](../)
- [Software Taxonomy](../software-taxonomy.md)
- [Software Design Principles](../software-design-principles/)
- [Frameworks, Libraries, and Tooling](../../../framework-tooling/)
- [Communication Patterns](../communication-patterns/)
