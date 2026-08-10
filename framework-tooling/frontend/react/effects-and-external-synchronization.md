# React Effects and External Synchronization

## Side Effects and React Effects

A **side effect** is a general programming term for observable work beyond
calculating and returning a value. Examples include network writes, timers,
subscriptions, logging, and DOM mutation.

A React **Effect** is specifically logic caused by rendering that synchronizes
a component with an external system.

## Three Places for Logic

```text
Render
→ calculate UI purely from current inputs

Event handler
→ perform work caused by a specific user interaction

Effect
→ synchronize with an external system because rendered state exists or changed
```

Submitting a form belongs in its event handler. Maintaining a connection while
a chat room is mounted belongs in an Effect. Calculating filtered data usually
belongs directly in render.

## Effect Lifecycle

```jsx
useEffect(() => {
  const connection = createConnection(roomId)
  connection.connect()

  return () => connection.disconnect()
}, [roomId])
```

After React commits, it runs the Effect setup when appropriate. Before running
the setup again with changed dependencies, React runs the previous cleanup. It
also runs cleanup when the component is removed.

This setup/cleanup model is more accurate than mapping an Effect directly to
`componentDidMount`, `componentDidUpdate`, and `componentWillUnmount`.

## Dependencies

The dependency list describes reactive values read by the Effect. It is not a
manual schedule chosen independently of the Effect's code.

- No dependency array: the Effect is eligible after every commit.
- `[]`: the setup does not depend on changing component values, but development
  [Strict Mode](strict-mode.md) can perform an extra setup/cleanup cycle.
- `[value]`: rerun when `value` changes according to `Object.is()`.

Do not omit dependencies to force timing. Restructure the code or use an event
handler when the work is caused by an interaction.

## Cleanup

Cleanup should undo or stop the setup when necessary:

- unsubscribe from subscriptions;
- disconnect connections;
- remove event listeners;
- clear timers; and
- cancel or ignore obsolete asynchronous results.

Not every Effect needs cleanup. Pure logging or an idempotent API call may not
create a persistent resource, although duplicate development execution still
needs to be understood.

## You Might Not Need an Effect

Avoid Effects for:

- deriving one state value from another;
- transforming data for rendering;
- reacting to a click that can be handled directly; or
- resetting state when identity can be expressed with component structure or a
  key.

Effects are an escape hatch for synchronization, not the default place for all
application logic.

## Data Fetching

Fetching in an Effect is possible, but a router, framework, or server-state
library can often preload, cache, deduplicate, and avoid client waterfalls more
effectively. Choose the owner based on the application's delivery model. See
[Strict Mode](strict-mode.md) when an Effect appears to call an API twice during
development.

## `useLayoutEffect`

`useLayoutEffect` runs during the commit path before the browser repaints. It
can measure layout and synchronously adjust the DOM, but it blocks paint and
should be used only when the visual result requires it.

Do not rely on the blanket rule that `useEffect` always runs strictly after a
paint. React's scheduling can vary, especially for interaction-caused updates;
the durable distinction is that layout Effects run before repaint and normal
Effects do not block the browser in the same way.

## Sources

- [React: Synchronizing with Effects](https://react.dev/learn/synchronizing-with-effects)
- [React: You Might Not Need an Effect](https://react.dev/learn/you-might-not-need-an-effect)
- [React: `useLayoutEffect`](https://react.dev/reference/react/useLayoutEffect)
