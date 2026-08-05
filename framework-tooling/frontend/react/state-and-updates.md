# React State and Updates

## State as a Snapshot

State values belong to a particular render. Calling a setter queues a future
render; it does not change the state variable captured by already-running code.

```jsx
const [count, setCount] = useState(0)

function handleClick() {
  setCount(count + 1)
  console.log(count) // the snapshot for this render
}
```

Each render receives its own state snapshot and creates event handlers that
close over that snapshot.

## Choosing State

Use state for information that affects rendered output or React behavior over
time. Do not duplicate values that can be calculated from current props or
state during render.

```jsx
const fullName = `${firstName} ${lastName}`
```

Choose one owner for each piece of state. Keep it near the components that need
it, and lift it to the nearest common owner when several components must
coordinate.

## Queued and Batched Updates

React processes state updates after event logic completes and may batch several
updates together. Repeating an update calculated from one captured snapshot can
therefore produce an unexpected result:

```jsx
setCount(count + 1)
setCount(count + 1)
```

Both expressions use the same `count`. When the next value depends on the
previous queued value, use an updater function:

```jsx
setCount((previous) => previous + 1)
setCount((previous) => previous + 1)
```

The functional form is necessary when calculating from previous state; it is
not a ritual required for every setter call.

## Object and Array State

Treat React state as immutable. Mutating an existing object does not by itself
queue rendering and can corrupt earlier state snapshots.

```jsx
setProfile((previous) => ({
  ...previous,
  name: 'Maya',
}))
```

Copy every changed level of a nested structure, or use a library that safely
produces immutable next values.

## Reducers

A reducer calculates next state from current state and an action:

```jsx
function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 }
    default:
      return state
  }
}

const [state, dispatch] = useReducer(reducer, { count: 0 })
dispatch({ type: 'increment' })
```

`useReducer` is useful when one state object has several related transitions or
when transition logic is easier to test outside the component. It is not
automatically preferable to several independent `useState` calls.

An action normally describes what occurred; the reducer owns how state changes
in response.

## Refs

`useRef()` holds a mutable value across renders without causing a render when
`.current` changes. Refs are useful for DOM nodes, timer identifiers, and other
values that do not belong in rendered output.

```jsx
const inputRef = useRef(null)

function focusInput() {
  inputRef.current?.focus()
}
```

Do not use a ref to hide state that the UI needs to display.

## Sources and Related Concepts

- [React: State as a Snapshot](https://react.dev/learn/state-as-a-snapshot)
- [React: Queueing State Updates](https://react.dev/learn/queueing-a-series-of-state-updates)
- [React: Extracting State Logic into a Reducer](https://react.dev/learn/extracting-state-logic-into-a-reducer)
- [Forms](forms.md)
- [Context and External Stores](context-and-external-stores.md)

