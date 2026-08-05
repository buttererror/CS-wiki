# CS Wiki

A practical, evolving knowledge base for computer science and software development.
The notes favor mental models, concise explanations, comparisons, commands, and
examples that are useful while learning or building.

> This is a living wiki, not a finished textbook. Some pages are polished
> references, while others are working notes or topic placeholders.

## Start here

Choose a path based on what you want to learn:

- **Explore software foundations:**
  [Computer Science Foundations](computer-science-foundations/README.md) →
  [Software Engineering Foundations](computer-science-foundations/software-engineering/README.md) →
  [Software Taxonomy](computer-science-foundations/software-engineering/software-taxonomy.md)
- **Learn programming languages:** [General Programming](CS.md) →
  [JavaScript](JavaScript-notes.md) → [TypeScript](TypeScript.md)
- **Learn frontend development:** [Frontend Concepts](frontend-related-concepts.md)
  → [React](react.md) → [Next.js](next.js-notes.md) → [Styling](styling-notes.md)
- **Understand backend fundamentals:** [Authentication](backend/authentication.md)
  → [JSON Web Tokens](programming-fundamentals/json-web-token.md) →
  [Databases](backend/databases.md)
- **Work with development tools:** [Git](git-space.md) →
  [Linux](linux/linux-general.md) → [Docker](linux/docker.md) →
  [PostgreSQL](linux/postgresql.md)
- **Explore architecture and delivery:**
  [Development Strategy](system-design/development-strategy.md) →
  [Lean MVP and Vertical Slices](system-design/lean-mvp-vertical-slice-development.md)

## Knowledge map

### Programming fundamentals

| Topic | What it covers |
| --- | --- |
| [General Programming](CS.md) | Paradigms, execution models, design patterns, and core terminology |
| [JavaScript](JavaScript-notes.md) | Language features, closures, pure functions, and array methods |
| [TypeScript](TypeScript.md) | Tooling, package commands, and the `unknown` type |
| [JSON Web Tokens](programming-fundamentals/json-web-token.md) | JWT structure, signatures, claims, and authentication flow |

### Software foundations and taxonomy

| Topic | What it covers |
| --- | --- |
| [Computer Science Foundations](computer-science-foundations/README.md) | Broad field map, reading mindset, and routes into the wiki's current foundations |
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
| [Frameworks, Libraries, and Tooling](framework-tooling/README.md) | Implementations and reusable infrastructure used to build applications |

### Frontend development

| Topic | What it covers |
| --- | --- |
| [Frontend Concepts](frontend-related-concepts.md) | Runtime data, serialization, SSR, and hydration |
| [React Reference](react.md) | State, effects, memoization, code quality, and interview notes |
| [React Crash Course](react.js-crash-course.md) | Rendering, reconciliation, effects, and browser behavior |
| [React Study Notes](my-react.js-notes.md) | Forms, reducers, hooks, and learning notes |
| [Next.js](next.js-notes.md) | Project setup, routing, CSS Modules, and conditional class names |
| [Styling](styling-notes.md) | Style collisions, layout, and component-oriented CSS architecture |
| [Vue](vue.md) | Early Vue notes and follow-up topics |
| [Flutter](flutter.md) | Runtime, SDKs, toolchains, and build targets |

Additional frontend topic maps are being developed in
[Frontend Mapping](frontend-mapping.md) and
[Frontend Frameworks](frontend-frameworks.md).

### Backend and data

| Topic | What it covers |
| --- | --- |
| [Authentication](backend/authentication.md) | Web, mobile, and desktop authentication architecture and security tradeoffs |
| [Databases](backend/databases.md) | Data modeling, schemas, and entity-relationship diagrams |
| [PostgreSQL](linux/postgresql.md) | Local setup, roles, databases, and common `psql` operations |

### Systems, tools, and architecture

| Topic | What it covers |
| --- | --- |
| [Git](git-space.md) | Version-control workflows, commits, amend, and recovery notes |
| [Linux](linux/linux-general.md) | Categorized shell and package-management command reference |
| [Docker](linux/docker.md) | Installation, runtime commands, Compose, and reset workflows |
| [Development Strategy](system-design/development-strategy.md) | Horizontal and vertical development approaches |
| [Lean MVP and Vertical Slices](system-design/lean-mvp-vertical-slice-development.md) | YAGNI, MVP scope, and incremental delivery |

### AI

- [LLMs vs. AI Agents](AI/LLM-vs.-AI-agent.md) — goals, reasoning loops,
  tool use, and self-correction.

## How to use this wiki

Browse the links above, search the repository by keyword, or clone it for local
access:

```bash
git clone <repository-url>
cd CS-wiki
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

## Maintenance action items

- [ ] Conduct a thorough review of the current project state, including its
  organization, overlapping or duplicate notes, placeholders, naming
  consistency, navigation, and cross-links.
