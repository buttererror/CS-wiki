# Hydration

## Purpose

Hydration is a client-framework mechanism for adopting markup that already
exists in the browser, usually because it was produced by server rendering or
static generation.

## Core Model

```text
Server or build produces HTML
        ↓
Browser parses HTML into DOM nodes
        ↓
Client framework loads its runtime code
        ↓
Framework reconstructs the expected UI representation
        ↓
Framework associates that representation with existing DOM
        ↓
Client behavior becomes available
```

“Attaching event handlers” is useful shorthand, but hydration can also
establish component state, subscriptions, references, and the framework's
internal relationship to existing nodes.

## Hydration Is Not HTML Generation

The server normally sends HTML text, not a live browser DOM. The browser parses
that text into DOM nodes. Hydration happens later in the browser.

```text
Server rendering → produces HTML
HTML parsing → produces browser DOM
Hydration → client framework adopts that DOM
```

## Hydration and Serialization

Hydration and serialization often cooperate, but neither implies the other.

- Static markup can be hydrated without restoring a large application-state
  object.
- Serialized data can be consumed by a fully client-rendered application.
- A framework can use its own wire format in addition to HTML.

See [Serialization](../data-across-boundaries/serialization.md).

## Hydration Mismatches

A mismatch occurs when the client expects different output from the DOM that
the server produced. Common causes include:

- reading time, randomness, or browser-only state during initial rendering;
- rendering different branches on the server and client;
- changing external data without transferring a consistent snapshot;
- invalid HTML nesting that the browser repairs; and
- locale or environment differences.

Frameworks may warn, recover, or replace parts of the tree. Suppressing a
warning does not correct an unintended mismatch.

## React Hydration

React uses `hydrateRoot()` to attach a React tree to existing server-generated
HTML. React expects the initial client output to match the server output.
Frameworks such as Next.js normally call hydration APIs on the application's
behalf.

React Server Components are not themselves hydration. In the Next.js App
Router, Server Components contribute an RSC payload, HTML can be prerendered,
and Client Components are hydrated for browser interaction.

## Vue Hydration

Vue can create an SSR application on the server and hydrate the server-rendered
markup when the client application mounts. Vue reconstructs component
instances and connects its renderer and reactivity system to the existing DOM.

React and Vue share the high-level goal of adopting existing markup, but their
internal data structures, scheduling, mismatch handling, and optimization
strategies should not be treated as identical.

## Hydration Variants

Architectures may hydrate the complete application, hydrate selected regions,
defer work until interaction or visibility, or use a resumability model instead
of conventional hydration.

## Related Concepts

- [React: `hydrateRoot`](https://react.dev/reference/react-dom/client/hydrateRoot)
- [Vue: Server-Side Rendering](https://vuejs.org/guide/scaling-up/ssr.html)
- [Server and Client Rendering](server-and-client-rendering.md)
- [Browser Runtime](../browser-runtime/README.md)
- [Serialization](../data-across-boundaries/serialization.md)
- [React Rendering Model](../../framework-tooling/frontend/react/rendering-model.md)
- [Next.js and React with Vite](../../framework-tooling/frontend/react-application-delivery/nextjs-vs-react-with-vite.md)
