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
  [Computer Systems](computer-science-foundations/computer-systems/README.md) or
  [Software Engineering Foundations](computer-science-foundations/software-engineering/README.md)
- **Learn programming languages:** [General Programming](miscellaneous/CS.md) →
  [JavaScript](miscellaneous/JavaScript-notes.md) →
  [TypeScript](miscellaneous/TypeScript.md)
- **Learn frontend development:**
  [Frontend Development](miscellaneous/frontend/README.md) →
  [Frontend Concepts](miscellaneous/frontend/frontend-related-concepts.md) →
  [React](miscellaneous/frontend/react.md) →
  [Next.js](miscellaneous/frontend/next.js-notes.md) →
  [Styling](miscellaneous/frontend/styling-notes.md)
- **Understand backend fundamentals:**
  [Authentication](miscellaneous/backend/authentication.md)
  → [JSON Web Tokens](programming-fundamentals/json-web-token.md) →
  [Databases](miscellaneous/backend/databases.md)
- **Work with development tools:** [Git](miscellaneous/git-space.md) →
  [Linux](miscellaneous/linux/linux-general.md) →
  [Docker](miscellaneous/linux/docker.md) →
  [PostgreSQL](miscellaneous/linux/postgresql.md)
- **Explore system design and delivery:**
  [System Design](system-design/README.md) →
  [Software System Design](system-design/software-system-design/README.md) →
  [Software Development Practices](software-development-practices/README.md) →
  [Lean MVP and Vertical Slices](software-development-practices/lean-mvp-vertical-slice-development.md)

## Knowledge map

### Programming fundamentals

| Topic | What it covers |
| --- | --- |
| [General Programming](miscellaneous/CS.md) | Paradigms, execution models, design patterns, and core terminology |
| [JavaScript](miscellaneous/JavaScript-notes.md) | Language features, closures, pure functions, and array methods |
| [TypeScript](miscellaneous/TypeScript.md) | Tooling, package commands, and the `unknown` type |
| [JSON Web Tokens](programming-fundamentals/json-web-token.md) | JWT structure, signatures, claims, and authentication flow |

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
| [Frameworks, Libraries, and Tooling](framework-tooling/README.md) | Implementations and reusable infrastructure used to build applications |

### Frontend development

| Topic | What it covers |
| --- | --- |
| [Frontend Development](miscellaneous/frontend/README.md) | Landing page for browser UI, frontend frameworks, styling, and related client-development notes |
| [Frontend Concepts](miscellaneous/frontend/frontend-related-concepts.md) | Runtime data, serialization, SSR, and hydration |
| [React Reference](miscellaneous/frontend/react.md) | State, effects, memoization, code quality, and interview notes |
| [React Crash Course](miscellaneous/frontend/react.js-crash-course.md) | Rendering, reconciliation, effects, and browser behavior |
| [React Study Notes](miscellaneous/frontend/my-react.js-notes.md) | Forms, reducers, hooks, and learning notes |
| [Next.js](miscellaneous/frontend/next.js-notes.md) | Project setup, routing, CSS Modules, and conditional class names |
| [Styling](miscellaneous/frontend/styling-notes.md) | Style collisions, layout, and component-oriented CSS architecture |
| [Vue](miscellaneous/frontend/vue.md) | Early Vue notes and follow-up topics |
| [Flutter](miscellaneous/frontend/flutter.md) | Runtime, SDKs, toolchains, and build targets |

Additional frontend topic maps are being developed in
[Frontend Mapping](miscellaneous/frontend/frontend-mapping.md) and
[Frontend Frameworks](miscellaneous/frontend/frontend-frameworks.md).

### Backend and data

| Topic | What it covers |
| --- | --- |
| [Authentication](miscellaneous/backend/authentication.md) | Web, mobile, and desktop authentication architecture and security tradeoffs |
| [Databases](miscellaneous/backend/databases.md) | Data modeling, schemas, and entity-relationship diagrams |
| [PostgreSQL](miscellaneous/linux/postgresql.md) | Local setup, roles, databases, and common `psql` operations |

### Systems, tools, architecture, and delivery

| Topic | What it covers |
| --- | --- |
| [Git](miscellaneous/git-space.md) | Version-control workflows, commits, amend, and recovery notes |
| [Linux](miscellaneous/linux/linux-general.md) | Categorized shell and package-management command reference |
| [Docker](miscellaneous/linux/docker.md) | Installation, runtime commands, Compose, and reset workflows |
| [System Design](system-design/README.md) | General, computer-system, and software-system design scopes and their neighboring disciplines |
| [Software System Design](system-design/software-system-design/README.md) | Applied design of software requirements, boundaries, components, data, and quality attributes |
| [Domain-Driven Design](system-design/software-system-design/domain-driven-design.md) | Domain-centered modeling, language, boundaries, and tactical concepts |
| [Neighboring Perspectives](system-design/software-system-design/neighboring-perspectives.md) | Business Analysis, Domain Modeling, System Design, Architecture, Infrastructure, and Operations |
| [Modular Monolith](computer-science-foundations/software-engineering/architectural-styles/modular-monolith.md) | One deployable application with explicit internal module boundaries |
| [Software Development Practices](software-development-practices/README.md) | Ways of organizing, validating, delivering, and evolving software |
| [Repository Organization](software-development-practices/repository-organization/README.md) | Repository boundaries and their distinction from tooling and architecture |
| [Monorepo](software-development-practices/repository-organization/monorepo.md) | Multiple related projects maintained in one version-control repository |
| [Development Strategy](software-development-practices/development-strategy.md) | Horizontal and vertical development approaches |
| [Lean MVP and Vertical Slices](software-development-practices/lean-mvp-vertical-slice-development.md) | YAGNI, MVP scope, and incremental delivery |

### AI

- [LLMs vs. AI Agents](miscellaneous/ai/llm-vs-ai-agent.md) — goals, reasoning loops,
  tool use, and self-correction.

### Material awaiting classification

[Miscellaneous](miscellaneous/README.md) is a temporary home for older,
mixed-scope notes. Moving a page there does not classify its subject as
"miscellaneous"; it marks the page for later review and placement.

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
