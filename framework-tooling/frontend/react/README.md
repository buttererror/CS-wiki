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
4. [Stale-Response Races and Server-State Ownership](stale-response-races.md)
5. [Strict Mode](strict-mode.md)
6. [Context and External Stores](context-and-external-stores.md)
7. [Forms](forms.md)
8. [Function Identity and Closures](function-identity-and-closures.md)
9. [Debouncing](debouncing.md)
10. [Performance](performance.md)

## Document Index

- [Rendering Model](rendering-model.md) — elements, render, commit,
  reconciliation, identity, keys, and concurrency.
- [State and Updates](state-and-updates.md) — snapshots, batching, functional
  updates, reducers, refs, and state ownership.
- [Effects and External Synchronization](effects-and-external-synchronization.md)
  — pure rendering, event handlers, Effects, dependencies, and cleanup.
- [Stale-Response Races and Server-State Ownership](stale-response-races.md)
  — out-of-order asynchronous responses, request cancellation, and the
  boundary between UI workflow state and query-owned server state.
- [Strict Mode](strict-mode.md) — development-only repeated rendering and
  Effect setup, duplicate development requests, and request cleanup.
- [Context and External Stores](context-and-external-stores.md) — deep value
  distribution, reducers, selectors, and external subscriptions.
- [Forms](forms.md) — controlled and uncontrolled inputs.
- [Function Identity and Closures](function-identity-and-closures.md) — render
  execution, render-local callbacks, closure snapshots, and when stable identity
  matters.
- [Debouncing](debouncing.md) — timers, delayed value propagation, callback
  identity, and cleanup.
- [Performance](performance.md) — measurement, memoization, rendering cost,
  code splitting, and data-loading waterfalls.

## Neighboring Technologies

- [Next.js Notes](../nextjs/notes.md)
- [React Application Delivery](../react-application-delivery/README.md)
- [Frontend Frameworks and Tooling](../README.md)

## Sources

- [React documentation](https://react.dev/)
- [Original crash-course study source](https://www.youtube.com/watch?v=LDB4uaJ87e0&list=PLq96aTfuDnx2yw2H53jsxHBQYov2JVpnu&t=1919s)
