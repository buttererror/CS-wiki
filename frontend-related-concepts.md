# Hydration, Serialization, and Runtime — Concise Technical Summary

## Runtime

- Runtime = environment and phase where code executes.
- Includes execution engine, memory management, and event loop.
- Examples: browser runtime, Node.js runtime.

---

## In-Memory Runtime Data

- Data stored in RAM during execution.
- Managed by the runtime environment.
- Exists only while the process is active.
- Removed when process terminates or reloads.
- Stored in memory regions such as stack and heap.

---

## Serialization

- Process of converting in-memory runtime data into transferable format.
- Enables transmission across network or storage.
- Produces structured, portable representation.

---

## Deserialization

- Process of converting serialized data back into runtime memory structures.
- Restores usable runtime data from transferable format.

---

## Hydration

- Process of attaching runtime logic to pre-rendered DOM.
- Connects runtime component structure to existing DOM nodes.
- Initializes event handling and state.
- Reuses existing DOM instead of recreating it.

---

## Server-Side Rendering and Hydration Relationship

- Server generates DOM and runtime state.
- Runtime state is serialized for transfer.
- Client deserializes state into runtime memory.
- Runtime logic is attached to existing DOM through hydration.

---

## Runtime Memory vs Serialized Data

Runtime memory:
- Exists in RAM.
- Temporary.
- Not transferable directly.

Serialized data:
- Transferable representation.
- Used for communication and persistence.
- Restored into runtime memory through deserialization.

---

## React Hydration

- Uses Fiber architecture.
- Builds runtime tree structure.
- Matches runtime tree to existing DOM.
- Attaches runtime behavior and state.

---

## Vue Hydration

- Uses Virtual DOM renderer.
- Creates runtime component instances.
- Connects runtime reactivity system to existing DOM.

---

## React vs Vue Hydration

Concept:
- Same purpose and lifecycle.

Implementation:
- React uses Fiber reconciler.
- Vue uses reactive renderer and proxy-based reactivity.

Outcome:
- Equivalent runtime activation of pre-rendered DOM.

---

## Core Execution Flow

- Runtime creates in-memory data.
- Runtime data is serialized for transfer.
- Serialized data is transmitted.
- Client deserializes into runtime memory.
- Runtime attaches logic to existing DOM through hydration.

---

## Core Definitions

Runtime:
- Active execution environment.

In-memory runtime data:
- Data stored in RAM during execution.

Serialization:
- Conversion of runtime data into transferable format.

Deserialization:
- Restoration of runtime data from transferable format.

Hydration:
- Activation of runtime logic on existing DOM.
