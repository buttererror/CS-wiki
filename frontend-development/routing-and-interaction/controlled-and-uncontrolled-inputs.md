# Controlled and Uncontrolled Inputs

**Keywords:** controlled input, uncontrolled input, form state, form ownership, value, defaultValue, DOM state, single source of truth, controlled component, uncontrolled component, input synchronization, form submission

## Purpose

This document explains the architectural distinction between controlled and uncontrolled inputs in frontend user interfaces.

The distinction is fundamentally about **current-value ownership**: whether the host browser DOM or the frontend application state holds the authoritative source of truth for an input's current value.

## Classification

- **Primary area:** Frontend Development
- **Scope:** Routing, forms, and interaction
- **Abstraction level:** Framework-independent architectural pattern

```text
Form value ownership
├── DOM-owned (Uncontrolled)
│   └── Browser maintains value → Application reads on demand
└── State-owned (Controlled)
    └── Application maintains value → State renders value to DOM
```

---

## The Core Problem: Who Owns the Current Value?

HTML form controls (`<input>`, `<textarea>`, `<select>`) are interactive host elements with built-in internal state. When a user types or toggles a control, the browser DOM automatically updates its internal value and updates the visible display.

In modern frontend applications with reactive state models, this creates a potential conflict between two systems:

1. **The Browser DOM**: Has native internal buffers, caret management, selection, undo/redo history, and change dispatching.
2. **The Application State**: Has reactive variables, immutability rules, validation logic, and component rendering cycles.

Architectures must choose how these two systems interact.

```text
Uncontrolled Input (DOM is the source of truth):
[ User Types ] ──→ [ DOM Element updates internal value ]
                            │
              (on submit or via ref read)
                            ↓
                 [ Application receives value ]

Controlled Input (Application State is the source of truth):
[ User Types ] ──→ [ Change Event emitted ]
                            ↓
                 [ State setter called ]
                            ↓
                 [ Application State updates ]
                            ↓
                 [ Render pushes new value to DOM ]
```

---

## Controlled Inputs

A **controlled input** does not rely on the DOM to hold its state. Its current value is explicitly passed into the control from application state, and any user interaction is intercepted to update that state.

### Mechanics

- **Authoritative value**: The control is bound to a state variable via its `value` or `checked` attribute.
- **Event interception**: An event listener (`input` or `change`) intercepts user edits and updates the state.
- **Push-down rendering**: When state updates, the component re-evaluates and passes the new value back into the DOM element.

### Strengths

- **Keystroke-level control**: Values can be formatted, masked, normalized (e.g., auto-uppercasing), or rejected immediately during typing.
- **Instant validation and feedback**: Errors, password strength meters, or character counts update in real time.
- **Multi-field coordination**: Changing one field can immediately update, enable, or disable dependent fields.
- **Programmatic resets**: Clearing or modifying form fields is as simple as updating state variables.

### Trade-offs

- **Rendering overhead**: Every single keystroke triggers a state transition and potential component rerender.
- **Boilerplate**: Requires explicit state bindings and change handlers for every field unless abstracted.

---

## Uncontrolled Inputs

An **uncontrolled input** treats the DOM as the primary source of truth for its current value. The application provides an initial default value, but subsequent edits remain within the browser DOM.

### Mechanics

- **Initial default**: The element is initialized using an attribute like `defaultValue` or `defaultChecked`.
- **Browser autonomy**: The user types directly into the native control without triggering application state updates or component rerenders.
- **On-demand reading**: When the value is needed (usually upon form submission), the application queries the DOM directly using the native `FormData` API or element references (`ref`).

### Strengths

- **Performance**: High-frequency typing creates zero component rerenders, making it ideal for massive forms or resource-constrained devices.
- **Simplicity**: Minimal application code for standard forms where values are only needed upon submit.
- **Native platform alignment**: Works seamlessly with browser autofill, native validation tooltips, and standard HTML form submission protocols.

### Trade-offs

- **Delayed access**: The application does not know the current draft value until it explicitly reads the DOM.
- **Difficult real-time coordination**: Real-time cross-field synchronization and input masking require manual event listeners and DOM manipulation.

---

## Controlled versus Uncontrolled Inputs

| Aspect | Controlled Input | Uncontrolled Input |
| --- | --- | --- |
| **Current value owner** | Application / Component State | Browser DOM Element |
| **Initialization** | Bound to state variable | Initialized via `defaultValue` / `defaultChecked` |
| **Edit handling** | Events update application state | DOM updates internal value directly |
| **Data retrieval** | Always available in state | Read on demand via `FormData` or DOM refs |
| **Rerender frequency** | On every keystroke/change | None during typing |
| **Real-time feedback** | Immediate (validation, masking, conditional UI) | Deferred until submit or manual event listening |
| **Integration** | Custom UI widgets, complex dynamic forms | Native HTML forms, simple submits, performance-critical forms |

---

## The “One Owner Per State Value” Rule

Attempting to treat both the DOM and application state as simultaneous sources of truth is an anti-pattern:

```text
Anti-pattern: Competing Owners
Application State  <══ sync loop ══>  DOM Internal Value
```

When an application attempts to maintain an internal state copy while also letting the DOM update independently, synchronization issues occur:
- Caret/cursor jumping to the end of input fields.
- Race conditions between asynchronous state transitions and native typing.
- Out-of-sync UI where submitted data differs from displayed text.

> **Principle**: For every piece of input data, designate exactly one owner. Either let the DOM hold the value and read it when needed, or let state hold the value and drive the DOM. Never build dual-write synchronization loops.

---

## Controlled and Uncontrolled Components

The pattern extends beyond native HTML inputs to component architecture across frontend frameworks:

- **Controlled Component**: A component that receives its current data via props and notifies its parent of changes via callbacks (e.g. `<Tabs activeIndex={active} onTabChange={setActive} />`). The parent controls its state.
- **Uncontrolled Component**: A component that manages its own internal state and optionally accepts an initial default prop (e.g. `<Accordion defaultExpandedKeys={['item-1']} />`). The component controls its own state.

---

## Framework Applications

Different frontend frameworks expose different syntaxes for these two ownership models:

### React
- **Controlled**: `<input value={text} onChange={(e) => setText(e.target.value)} />`
- **Uncontrolled**: `<input ref={inputRef} defaultValue="" />` or reading `new FormData(event.currentTarget)` in `onSubmit`.
- See [React Forms](../../framework-tooling/frontend/react/forms.md).

### Vue
- **Controlled (Two-Way Binding Abstraction)**: `<input v-model="text" />` (expands to `:value="text"` and `@input="text = $event.target.value"` under the hood).
- **Uncontrolled**: `<input ref="inputRef" :defaultValue="initialText" />` where the DOM element is queried on submit.
- See [Vue Notes](../../framework-tooling/frontend/vue/notes.md).

---

## Related Concepts

- [React Forms](../../framework-tooling/frontend/react/forms.md)
- [Reactivity Mechanisms](../state-and-reactivity/reactivity-mechanisms.md)
- [Post-Authentication Redirects](post-authentication-redirects.md)
- [Frontend Terminology](../../computer-science-foundations/software-engineering/terminology/frontend-terminology.md)
