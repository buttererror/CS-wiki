# React Forms

**Keywords:** React forms, controlled input, uncontrolled input, `useState`, `useRef`, `defaultValue`, `onChange`, `onSubmit`, `FormData`, controlled components, synthetic events

## Overview

This page documents how React implements form controls and form events.

For the general, framework-independent mental model of current-value ownership, see [Controlled and Uncontrolled Inputs](../../../frontend-development/routing-and-interaction/controlled-and-uncontrolled-inputs.md).

## Controlled Inputs in React

In React, a controlled input receives its value from React state and updates that state on user input via `onChange`:

```tsx
import { useState } from 'react'

export function ControlledForm() {
  const [name, setName] = useState('')

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setName(event.target.value)
  }

  return (
    <form onSubmit={(e) => { e.preventDefault(); console.log(name) }}>
      <label htmlFor="name-input">Full Name</label>
      <input
        id="name-input"
        type="text"
        value={name}
        onChange={handleChange}
      />
      <p>Current draft: {name}</p>
    </form>
  )
}
```

### React-Specific Details

- **Single source of truth**: React's state is the single source of truth; the DOM node's `value` attribute is kept synchronized with each render.
- **Synthetic events**: React wraps native browser input events in `React.ChangeEvent<T>` for cross-browser consistency.
- **Controlled warnings**: Providing a `value` prop without an `onChange` handler makes the input read-only in React and triggers a development warning unless `readOnly={true}` is set.

## Uncontrolled Inputs in React

An uncontrolled input lets the DOM manage its own value. React initializes the element with `defaultValue` (or `defaultChecked`) and accesses its value on demand using a `ref` or `FormData`:

```tsx
import { useRef } from 'react'

export function UncontrolledForm() {
  const inputRef = useRef<HTMLInputElement>(null)

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    // Read from the ref directly:
    console.log('Ref value:', inputRef.current?.value)

    // Or read all form entries via native FormData:
    const data = new FormData(event.currentTarget)
    console.log('FormData:', data.get('username'))
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="user-input">Username</label>
      <input
        id="user-input"
        name="username"
        ref={inputRef}
        defaultValue=""
      />
      <button type="submit">Submit</button>
    </form>
  )
}
```

### React-Specific Details

- **`defaultValue` vs `value`**: In React JSX, `defaultValue` sets the initial HTML attribute without making the input controlled.
- **No keystroke rerenders**: Typing does not trigger component function execution or reconciler passes.
- **Direct DOM access**: `useRef()` holds a direct reference to the underlying `HTMLInputElement` instance.

## Controlled versus Uncontrolled Components in React

The pattern also applies to React component design:

- **Controlled component**: A component whose critical visual or interaction state is passed in via props and modified via callback props (e.g. `<Accordion expanded={expandedId} onToggle={setExpandedId} />`).
- **Uncontrolled component**: A component that manages its own internal state with `useState`/`useRef` and only accepts optional initial props (e.g. `<Accordion defaultExpandedId="item-1" />`).

## Related Concepts

- [Controlled and Uncontrolled Inputs (General Frontend)](../../../frontend-development/routing-and-interaction/controlled-and-uncontrolled-inputs.md)
- [State and Updates](state-and-updates.md)
- [Rendering Model](rendering-model.md)
- [React: Sharing State Between Components](https://react.dev/learn/sharing-state-between-components)
- [React DOM: `<input>`](https://react.dev/reference/react-dom/components/input)
