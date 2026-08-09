# Browser Runtime

## Purpose

This document introduces the browser as an execution environment for frontend
software. It distinguishes a runtime from build tooling, runtime values from
transferable representations, and JavaScript behavior from APIs provided by
the browser.

## Runtime

A **runtime environment** is the environment in which a program executes. It
combines an execution engine with facilities made available while the program
is running.

For frontend JavaScript, the browser runtime commonly provides:

- a JavaScript engine;
- memory for live values and objects;
- an event loop and task scheduling;
- the DOM and events;
- networking APIs such as `fetch()`;
- timers, storage, navigation, and other Web APIs; and
- integration with rendering, layout, and user input.

JavaScript defines the language. The browser supplies the surrounding host
environment. `Array`, closures, and promises are language/runtime facilities;
`document`, `location`, and many device APIs are browser-provided interfaces.

## Build Time and Runtime

```text
Build time
→ source is transformed, bundled, optimized, or compiled

Runtime
→ the produced program executes in its target environment
```

Vite, Next.js, TypeScript, and compilers may transform code before deployment.
The browser executes the client artifacts that result. A framework may also
execute other portions of an application in a server runtime.

## Runtime Values and Memory

While a page is active, the runtime holds strings, functions, objects,
component state, and DOM references in memory.

```js
const session = {
  userId: 'user-42',
  expiresAt: new Date(),
}
```

`session` is a live JavaScript object. It can contain prototypes, functions,
references to other objects, and identity relationships. It is not itself a
network message or storage format.

Reloading or closing a page normally discards its in-memory JavaScript state.
Persistence requires an external mechanism such as storage, a database, a URL,
or a server. The runtime's internal memory layout is an implementation detail;
frontend code should not assume a simple universal stack/heap model for every
value.

## Crossing a Boundary

A live object cannot be transferred to another process merely by sharing its
memory address. Systems need an agreed boundary mechanism:

- serialize values into a transferable representation;
- use a platform copying algorithm such as structured clone;
- share explicitly supported memory; or
- expose behavior through a protocol or API.

See [Serialization](../data-across-boundaries/serialization.md) for the common
network and persistence model.

## Browser Runtime versus Server Runtime

| Concern | Browser runtime | Server runtime |
| --- | --- | --- |
| Primary host | User's browser | Server process or function runtime |
| UI APIs | DOM, events, browser rendering | Usually no browser DOM |
| Secrets | Client code and values are observable by users | Can hold server-only credentials |
| Lifetime | Page, tab, worker, or browser-managed lifecycle | Request, process, container, or function lifecycle |
| Resources | User device and network | Server compute, memory, storage, and network |

These environments can cooperate in one application. The important design
question is which code and data belong on each side of the boundary.

## Document Index

- [Timers and Event Scheduling](timers-and-event-scheduling.md) — browser
  timers, tasks, microtasks, animation frames, debounce, and throttle.

## Related Concepts

- [Frontend Development](../README.md)
- [Programming Languages](../../computer-science-foundations/programming-languages/README.md)
- [Server and Client Rendering](../rendering/server-and-client-rendering.md)
- [Serialization](../data-across-boundaries/serialization.md)
- [Hydration](../rendering/hydration.md)
