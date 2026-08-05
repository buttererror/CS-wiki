# React

## Purpose

This directory explains React's component, rendering, state, and effect models.
Each concept has one primary document so that reference material does not
compete with overlapping crash-course and study-note files.

## Classification

- **Technology:** React
- **Type:** User-interface library
- **Applied scope:** Component-based UI rendering and interaction
- **Abstraction level:** Framework/library behavior and API usage

React is not the same concept as Reactive Programming. React provides an
explicit state-update and rendering model; see
[Reactivity Mechanisms](../../../frontend-development/state-and-reactivity/reactivity-mechanisms.md)
for the broader comparison.

## Core Model

```text
Props, state, and context
        ↓
React calls components during render
        ↓
Components return React elements
        ↓
React reconciles the next result
        ↓
React commits required host-environment changes
```

For browser applications, `react-dom` connects React's component model to the
DOM. The browser remains responsible for layout, painting, input, networking,
and other Web Platform behavior.

## Hooks

Hooks let function components use React features such as state, context, refs,
and Effects. Custom Hooks compose reusable stateful logic.

- Call Hooks at the top level of a component or another Hook.
- Name custom Hooks with the `use` prefix.
- A custom Hook shares logic; each call normally receives its own state.

## Suggested Reading Path

1. [Rendering Model](rendering-model.md)
2. [State and Updates](state-and-updates.md)
3. [Effects and External Synchronization](effects-and-external-synchronization.md)
4. [Context and External Stores](context-and-external-stores.md)
5. [Forms](forms.md)
6. [Performance](performance.md)

## Document Index

- [Rendering Model](rendering-model.md) — elements, render, commit,
  reconciliation, identity, keys, and concurrency.
- [State and Updates](state-and-updates.md) — snapshots, batching, functional
  updates, reducers, refs, and state ownership.
- [Effects and External Synchronization](effects-and-external-synchronization.md)
  — pure rendering, event handlers, Effects, dependencies, and cleanup.
- [Context and External Stores](context-and-external-stores.md) — deep value
  distribution, reducers, selectors, and external subscriptions.
- [Forms](forms.md) — controlled and uncontrolled inputs.
- [Performance](performance.md) — measurement, memoization, rendering cost,
  code splitting, and data-loading waterfalls.

## Neighboring Technologies

- [Next.js Notes](../nextjs/notes.md)
- [React Application Delivery](../react-application-delivery/README.md)
- [Frontend Frameworks and Tooling](../README.md)

## Sources

- [React documentation](https://react.dev/)
- [Original crash-course study source](https://www.youtube.com/watch?v=LDB4uaJ87e0&list=PLq96aTfuDnx2yw2H53jsxHBQYov2JVpnu&t=1919s)
