# CS Wiki

A practical, evolving knowledge base for computer science and software development.
The notes favor mental models, concise explanations, comparisons, commands, and
examples that are useful while learning or building.

**Live preview:** [wiki.buttererror.com](https://wiki.buttererror.com/)

> This is a living wiki, not a finished textbook. Some pages are polished
> references, while others are working notes or topic placeholders.

## How to Read the Structure

The wiki is organized around useful perspectives, not one final or universally
correct hierarchy.

Perspective-dependent does not mean arbitrary. Classifications should be
checked against established Computer Science and engineering usage, the actual
definition and scope of the concept, and authoritative standards or literature
when relevant. The repository structure should follow that understanding rather
than determine it.

In particular, **foundation** describes how a topic is being used in a learning
or reasoning context. It usually means general knowledge that explains or
constrains many concrete decisions. It is not an intrinsic label permanently
attached to a concept.

```text
Foundational perspective
→ studies general principles, properties, mechanisms, and limitations

Applied perspective
→ uses and combines that knowledge for a particular system and context
```

The same area may appear through both perspectives. For example:

```text
Distributed Systems
→ foundational principles of coordination, consistency, and failure
→ applied decisions about services, retries, and deployment

Security
→ foundational properties, threat models, and cryptographic principles
→ applied decisions about identity, tokens, infrastructure, and operations
```

Categories and directories provide a primary home for navigation. They do not
claim that concepts have perfectly fixed boundaries or only one valid
relationship. Fields overlap, terminology changes with scale and context, and
one concept may influence several areas without belonging exclusively to any
one of them.

When a proposed classification or relationship is added, it should first be
validated conceptually:

```text
Real disciplinary meaning and evidence
        ↓ establish
Concept, scope, and relationships
        ↓ guide
Canonical document location and cross-links
```

The direction should not be reversed. An existing folder must not be used as
evidence that a concept belongs to that field, and a proposed relationship
should be corrected when it conflicts with the underlying science or
engineering practice.

The classifications should therefore be:

- realistic enough to reflect established disciplinary usage;
- explicit about the perspective and abstraction level being used;
- open to overlapping and many-to-many relationships; and
- revisable when deeper study reveals a better model.

## Current Repository State

The repository is in an active organization pass. Its directories currently
serve three different purposes:

```text
Canonical subject areas
→ stable landing pages and focused concept documents

Review inbox
→ useful working notes whose final scope or location is not settled

Repository documentation
→ maintenance records and plans for the wiki itself
```

| Directory | Current role | Current coverage |
| --- | --- | --- |
| [`computer-science-foundations/`](computer-science-foundations/README.md) | Foundational field maps and transferable concepts | Computer Systems, Programming Languages, and Software Engineering foundations |
| [`system-design/`](system-design/README.md) | Cross-cutting applied design area | General, computer-system, and software-system scopes; DDD and neighboring perspectives |
| [`security/`](security/README.md) | Canonical cross-cutting security area | Foundational/applied distinction and current Identity and Access Management notes |
| [`software-development-practices/`](software-development-practices/README.md) | Ways of organizing and evolving engineering work | Development strategy, lean delivery, and repository organization |
| [`frontend-development/`](frontend-development/README.md) | Canonical applied frontend area | Browser runtime, rendering, hydration, serialization, reactivity, and styling |
| [`framework-tooling/`](framework-tooling/README.md) | Technology-specific learning | Backend, frontend, and cross-platform frameworks, libraries, and tooling |
| [`miscellaneous/`](miscellaneous/README.md) | Temporary review inbox | Older language, backend-data, AI, Linux, and tooling notes |
| `docs/` | Repository documentation excluded from the published wiki | Maintenance records and a proposed static-wiki/PWA plan |

The detailed coverage is currently strongest in Software Engineering. The
broader Computer Science map intentionally includes areas that do not yet have
dedicated documents; the map describes the field, while the tables below
describe the material that actually exists.

## Start here

Choose a path based on what you want to learn:

- **Understand the wiki's foundation map:**
  [Computer Science Foundations](computer-science-foundations/README.md) →
  [Computer Systems](computer-science-foundations/computer-systems/README.md) or
  [Software Engineering Foundations](computer-science-foundations/software-engineering/README.md)
- **Study programming-language behavior:**
  [Programming Languages](computer-science-foundations/programming-languages/README.md) →
  [JavaScript](computer-science-foundations/programming-languages/javascript/README.md)
- **Relate software concepts by abstraction level:**
  [Software Taxonomy](computer-science-foundations/software-engineering/software-taxonomy.md)
  → [Software Architecture](computer-science-foundations/software-engineering/software-architecture.md)
- **Explore system design:** [System Design](system-design/README.md) →
  [Software System Design](system-design/software-system-design/README.md) →
  [Domain-Driven Design](system-design/software-system-design/domain-driven-design.md)
- **Explore security and identity:** [Security](security/README.md) →
  [Identity and Access Management](security/identity-and-access-management/README.md)
  → [Authentication](security/identity-and-access-management/authentication.md)
  → [JSON Web Token](security/identity-and-access-management/json-web-token.md)
- **Study engineering practices and concrete tools:**
  [Software Development Practices](software-development-practices/README.md) →
  [Lean MVP and Vertical Slices](software-development-practices/lean-mvp-vertical-slice-development.md)
  or [Frameworks, Libraries, and Tooling](framework-tooling/README.md)
- **Study frontend concepts and their implementations:**
  [Frontend Development](frontend-development/README.md) →
  [Frontend Frameworks and Tooling](framework-tooling/frontend/README.md)
- **Browse working notes awaiting deeper review:**
  [Miscellaneous Notes](miscellaneous/README.md)

## Knowledge map

### Programming languages

| Topic | What it covers |
| --- | --- |
| [Programming Languages](computer-science-foundations/programming-languages/README.md) | Language-level syntax, semantics, bindings, functions, and runtime models |
| [Type Systems](computer-science-foundations/programming-languages/type-systems.md) | Static and dynamic checking, inference, narrowing, generics, and runtime boundaries |
| [JavaScript](computer-science-foundations/programming-languages/javascript/README.md) | Reviewed JavaScript foundations; currently marked not read yet |
| [Functions, Closures, and Identity](computer-science-foundations/programming-languages/javascript/functions-closures-and-identity.md) | Function objects, lexical closures, reference identity, and React as an application |
| [Hoisting and Binding Initialization](computer-science-foundations/programming-languages/javascript/hoisting.md) | Declaration processing, initialization timing, and the temporal dead zone |
| [TypeScript](computer-science-foundations/programming-languages/typescript/README.md) | Static type-system foundations for JavaScript; currently marked not read yet |
| [TypeScript Type-System Foundations](computer-science-foundations/programming-languages/typescript/type-system.md) | `unknown`, `any`, narrowing, generics, tuples, and utility types |
| [TypeScript Toolchain and Type Checking](computer-science-foundations/programming-languages/typescript/toolchain.md) | Project-local setup, running TypeScript, and full type checking |

### Programming and language notes awaiting review

These documents remain in the review inbox. Their links are useful, but their
current filenames, scope, and placement should not be read as final taxonomy.

| Topic | What it covers |
| --- | --- |
| [General Programming](miscellaneous/CS.md) | Paradigms, execution models, design patterns, and core terminology |
| [Legacy JavaScript Notes](miscellaneous/JavaScript-notes.md) | Mixed language notes pending review and migration |
| [TypeScript Learning Notes](miscellaneous/TypeScript.md) | Original learning notes, mental models, examples, and follow-up details preserved for review |

### Software foundations and taxonomy

| Topic | What it covers |
| --- | --- |
| [Computer Science Foundations](computer-science-foundations/README.md) | Broad field map, reading mindset, and routes into the wiki's current foundations |
| [Computer Systems](computer-science-foundations/computer-systems/README.md) | Hardware, operating systems, networking, storage, and distributed-system foundations |
| [Software Engineering Foundations](computer-science-foundations/software-engineering/README.md) | Mindset and map for relating software concepts without imposing rigid boundaries |
| [Software Taxonomy](computer-science-foundations/software-engineering/software-taxonomy.md) | Paradigms, principles, patterns, architectures, tools, and implementations |
| [Software Architecture](computer-science-foundations/software-engineering/software-architecture.md) | Systems, architectures, architectural styles, and architectural patterns |
| [Programming Paradigms](computer-science-foundations/software-engineering/programming-paradigms/README.md) | Object-oriented, functional, and reactive ways of expressing programs |
| [Software Design Principles](computer-science-foundations/software-engineering/software-design-principles/README.md) | Guidelines for reasoning about responsibilities, dependencies, change, and control |
| [Software Engineering Terminology](computer-science-foundations/software-engineering/terminology/README.md) | Recurring field terms whose meanings depend on abstraction level or context |
| [Design Patterns](computer-science-foundations/software-engineering/design-patterns/README.md) | Reusable solutions to recurring object and component design problems |
| [Communication Patterns](computer-science-foundations/software-engineering/communication-patterns/README.md) | Ways independent participants exchange information |
| [Architectural Styles](computer-science-foundations/software-engineering/architectural-styles/README.md) | Principles and constraints for organizing major system components |
| [Architectural Patterns](computer-science-foundations/software-engineering/architectural-patterns/README.md) | Reusable solutions to recurring architecture-level problems |

### Frontend development

Frontend material separates two overlapping scopes:

```text
frontend-development/
→ general frontend engineering, browser runtime, rendering, state, and styling

framework-tooling/frontend/
→ React, Next.js, Vue, Vite, and other concrete frontend technologies
```

Framework placement is an ownership and navigation choice, not a claim that
general frontend development is a subset of tooling.

| Topic | What it covers |
| --- | --- |
| [Frontend Development](frontend-development/README.md) | Framework-independent frontend map and reading path |
| [Browser Runtime](frontend-development/browser-runtime/README.md) | Browser execution environment, runtime values, and boundaries |
| [Timers and Event Scheduling](frontend-development/browser-runtime/timers-and-event-scheduling.md) | Timers, tasks, microtasks, animation frames, debounce, and throttle |
| [Server and Client Rendering](frontend-development/rendering/server-and-client-rendering.md) | Client rendering, server rendering, static generation, and Server Components |
| [SSR versus ISR](frontend-development/rendering/ssr-and-isr.md) | Request-time rendering versus cached output with time-based or on-demand regeneration; currently marked not read yet |
| [Hydration](frontend-development/rendering/hydration.md) | Client adoption of server-rendered markup and mismatch causes |
| [Serialization](frontend-development/data-across-boundaries/serialization.md) | Transferable representations across frontend boundaries |
| [Reactivity Mechanisms](frontend-development/state-and-reactivity/reactivity-mechanisms.md) | Proxy tracking, explicit updates, and stream-based models |
| [Styling](frontend-development/styling/README.md) | Style isolation, layout, and component-oriented styling architecture |
| [Frontend Frameworks and Tooling](framework-tooling/frontend/README.md) | React, Next.js, Vue, Vite, and technology comparisons |
| [React](framework-tooling/frontend/react/README.md) | Rendering, state, Effects, function identity, debouncing, forms, and performance |
| [React Function Identity and Closures](framework-tooling/frontend/react/function-identity-and-closures.md) | Render-local functions, closure snapshots, memoization, and identity-sensitive consumers |
| [Debouncing in React](framework-tooling/frontend/react/debouncing.md) | Responsive inputs, debounced values and callbacks, query flows, and timer cleanup |
| [React Application Delivery](framework-tooling/frontend/react-application-delivery/README.md) | React delivery architectures, JavaScript boundaries, and performance decisions |
| [Next.js](framework-tooling/frontend/nextjs/notes.md) | Setup, routing, CSS Modules, and related application-framework notes |
| [Vue](framework-tooling/frontend/vue/notes.md) | Vue reactivity, state-management, testing, and SSR study topics |
| [Flutter](framework-tooling/cross-platform-ui/flutter.md) | Runtime, SDKs, toolchains, and build targets |

### Backend and data

| Topic | What it covers |
| --- | --- |
| [Databases](miscellaneous/backend/databases.md) | Data modeling, schemas, and entity-relationship diagrams |
| [PostgreSQL](miscellaneous/linux/postgresql.md) | Local setup, roles, databases, and common `psql` operations |

### Security and identity

| Topic | What it covers |
| --- | --- |
| [Security](security/README.md) | Cross-cutting security areas and the wiki's current security coverage |
| [Identity and Access Management](security/identity-and-access-management/README.md) | Identity, authentication, authorization, credentials, sessions, and federation |
| [Authentication](security/identity-and-access-management/authentication.md) | Authentication logic, credential transport, client types, and lifecycle trade-offs |
| [JSON Web Token](security/identity-and-access-management/json-web-token.md) | JWT claims representation, JWS/JWE protection, validation, storage, and state trade-offs |

### System design and architecture

| Topic | What it covers |
| --- | --- |
| [System Design](system-design/README.md) | General, computer-system, and software-system design scopes and their neighboring disciplines |
| [Software System Design](system-design/software-system-design/README.md) | Applied design of software requirements, boundaries, components, data, and quality attributes |
| [Domain-Driven Design](system-design/software-system-design/domain-driven-design.md) | Domain-centered modeling, language, boundaries, and tactical concepts |
| [Neighboring Perspectives](system-design/software-system-design/neighboring-perspectives.md) | Business Analysis, Domain Modeling, System Design, Architecture, Infrastructure, and Operations |
| [Event-Driven Architecture](computer-science-foundations/software-engineering/architectural-styles/event-driven-architecture.md) | System organization around events, producers, consumers, and asynchronous reactions |
| [Microservice Architecture](computer-science-foundations/software-engineering/architectural-styles/microservice-architecture.md) | Independently deployable services organized around business capabilities |
| [Modular Monolith](computer-science-foundations/software-engineering/architectural-styles/modular-monolith.md) | One deployable application with explicit internal module boundaries |

### Development practices, frameworks, and tooling

| Topic | What it covers |
| --- | --- |
| [Software Development Practices](software-development-practices/README.md) | Ways of organizing, validating, delivering, and evolving software |
| [Repository Organization](software-development-practices/repository-organization/README.md) | Repository boundaries and their distinction from tooling and architecture |
| [Monorepo](software-development-practices/repository-organization/monorepo.md) | Multiple related projects maintained in one version-control repository |
| [Development Strategy](software-development-practices/development-strategy.md) | Horizontal and vertical development approaches |
| [Lean MVP and Vertical Slices](software-development-practices/lean-mvp-vertical-slice-development.md) | YAGNI, MVP scope, and incremental delivery |
| [Frameworks, Libraries, and Tooling](framework-tooling/README.md) | Framework/library control, mechanisms, and concrete API usage |
| [NestJS Dependency Injection](framework-tooling/nestjs-dependency-injection.md) | NestJS's dependency-injection mechanism and its relationship to IoC |
| [TanStack Query](framework-tooling/tanstack-query.md) | Server-state synchronization, observers, request/response, and cache behavior |

### Operations and development-tool notes awaiting review

| Topic | What it covers |
| --- | --- |
| [Git](miscellaneous/git-space.md) | Version-control workflows, commits, amend, and recovery notes |
| [Linux](miscellaneous/linux/linux-general.md) | Categorized shell and package-management command reference |
| [Docker](miscellaneous/linux/docker.md) | Installation, runtime commands, Compose, and reset workflows |
| [PostgreSQL](miscellaneous/linux/postgresql.md) | Local setup, roles, databases, and common `psql` operations |

### AI

- [LLMs vs. AI Agents](miscellaneous/ai/llm-vs-ai-agent.md) — goals, reasoning loops,
  tool use, and self-correction.

### Material awaiting classification

[Miscellaneous](miscellaneous/README.md) is a temporary home for older,
mixed-scope notes. Moving a page there does not classify its subject as
"miscellaneous"; it marks the page for later review and placement.

## How to use this wiki

Browse the links above or search a local clone by keyword:

```bash
rg "keyword"
```

GitHub's file finder (`t`) and repository search are also useful when reading
online. Notes are plain Markdown, so no build step or dependency installation is
required.

## Note format

New reference notes should aim for a consistent, scannable structure:

1. **Definition** — what the concept means.
2. **Mental model** — an intuitive way to reason about it.
3. **Example** — code, a command, or a concrete scenario.
4. **Tradeoffs** — when it helps, when it does not, and common pitfalls.
5. **Related concepts** — links to nearby pages in the wiki.

Use descriptive, lowercase file names with hyphens for new pages, group related
topics in directories, and prefer relative links so the wiki works locally and
on GitHub.

## Contributing

Improvements are welcome, especially corrections, clearer examples, useful
cross-links, and turning draft pages into focused references.

Before submitting a change:

- Keep each page centered on a clear topic.
- Explain unfamiliar terms before relying on them.
- Test commands and code samples where practical.
- Add the page to the knowledge map above.
- Check that relative links resolve correctly.
- Cite authoritative sources when a claim depends on a specification or
  external behavior.

## Safety and accuracy

Commands in this wiki are educational examples. Read and understand them before
running them, especially commands involving elevated privileges, containers,
databases, credentials, or file deletion. Tool behavior and security guidance
change over time; verify version-sensitive instructions against current official
documentation.

## Maintenance status

- [x] Complete the repository-wide structure, taxonomy, and navigation review.
  The maintenance record is stored in `docs/maintenance/`.
- [ ] Review material in [`miscellaneous/`](miscellaneous/README.md) page by
  page for duplicate content, placeholders, naming, scope, and canonical
  placement.
