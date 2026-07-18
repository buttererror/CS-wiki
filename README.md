# CS Wiki

A practical, evolving knowledge base for computer science and software development.
The notes favor mental models, concise explanations, comparisons, commands, and
examples that are useful while learning or building.

> This is a living wiki, not a finished textbook. Some pages are polished
> references, while others are working notes or topic placeholders.

## Start here

Choose a path based on what you want to learn:

- **Build programming foundations:** [General Programming](CS.md) →
  [JavaScript](JavaScript-notes.md) → [TypeScript](TypeScript-notes.md)
- **Learn frontend development:** [Frontend Concepts](frontend-related-concepts.md)
  → [React](react.md) → [Next.js](next.js-notes.md) → [Styling](styling-notes.md)
- **Understand backend fundamentals:** [Authentication](backend/authentication.md)
  → [JSON Web Tokens](programming-fundamentals/json-web-token.md) →
  [Databases](backend/databases.md)
- **Work with development tools:** [Git](git-space.md) →
  [Linux](linux/linux-general.md) → [Docker](linux/docker.md) →
  [PostgreSQL](linux/postgresql.md)
- **Explore architecture and delivery:**
  [Development Strategy](system%20design/development-strategy.md) →
  [Lean MVP and Vertical Slices](system%20design/Lean-mvp-vertical-slice-development.md.md)

## Knowledge map

### Programming fundamentals

| Topic | What it covers |
| --- | --- |
| [General Programming](CS.md) | Paradigms, execution models, design patterns, and core terminology |
| [JavaScript](JavaScript-notes.md) | Language features, closures, pure functions, and array methods |
| [TypeScript](TypeScript-notes.md) | Tooling, package commands, and the `unknown` type |
| [JSON Web Tokens](programming-fundamentals/json-web-token.md) | JWT structure, signatures, claims, and authentication flow |

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
| [Development Strategy](system%20design/development-strategy.md) | Horizontal and vertical development approaches |
| [Lean MVP and Vertical Slices](system%20design/Lean-mvp-vertical-slice-development.md.md) | YAGNI, MVP scope, and incremental delivery |

### AI and learning notes

- [LLMs vs. AI Agents](AI/LLM-vs.-AI-agent.md) — goals, reasoning loops,
  tool use, and self-correction.
- [Podcast Notes](podcasts-notes/21-1-2025-podcast-notes.md) — raw ideas and
  action items awaiting classification.

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

## Roadmap

- Organize and distill imported notes into focused topic pages.
- Finish placeholder pages and remove duplicate React material.
- Standardize older file names and page structure without breaking links.
- Add sources, cross-links, and practical examples across the wiki.
- Review podcast notes, file durable ideas, and retire the raw draft.
