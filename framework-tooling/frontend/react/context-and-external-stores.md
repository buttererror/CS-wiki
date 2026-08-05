# React Context and External Stores

## Context

Context makes a value available to a component subtree without passing it
through every intermediate component as a prop.

```jsx
const ThemeContext = createContext('light')

function App() {
  return (
    <ThemeContext.Provider value="dark">
      <Page />
    </ThemeContext.Provider>
  )
}

function Toolbar() {
  const theme = useContext(ThemeContext)
  return <div data-theme={theme}>Tools</div>
}
```

Context distributes a value; it does not automatically define how that value
is stored or updated.

## Context Updates

When a provider receives a different value, React schedules work for consumers
of that context. A broad provider with a frequently changing object can affect
many consumers.

Before adding context:

- prefer ordinary props for local relationships;
- separate unrelated values when their update patterns differ;
- avoid recreating provider objects unnecessarily when identity matters; and
- measure before adding memoization solely to prevent hypothetical work.

## Reducer and Context

`useReducer` can own transition logic while Context distributes state and a
dispatch function through a subtree. This can be appropriate for a complex
screen or feature.

```text
Reducer → calculates local next state
Context → distributes state and dispatch
```

The combination is not Redux. Redux is an external store with its own APIs,
subscriptions, middleware ecosystem, selectors, and development tools.

## External Stores

An external store owns state outside React. React integrations subscribe and
request rendering when the selected snapshot changes.

```text
External store changes
        ↓
Subscription receives notification
        ↓
React reads the next snapshot
        ↓
React schedules and commits UI work
```

`useSyncExternalStore()` is React's primitive for safely subscribing to an
external store. Libraries such as Redux bindings and Zustand expose higher-level
APIs around store selection and subscription.

Selectors can reduce the data a component observes. Select the smallest stable
value that the component needs, while avoiding rules such as “never select an
object”; object selection is valid when its equality and update behavior are
understood.

## Choosing an Owner

- Local component state: isolated interaction or form state.
- Lifted state: coordination among nearby components.
- Context: values needed across a subtree.
- Reducer: several related state transitions.
- External store: state whose ownership, subscriptions, tooling, or coordination
  requirements extend beyond convenient React-local ownership.
- Server-state library: remote data with caching, synchronization, and mutation
  lifecycles.

No option is universally the most scalable. Choose according to ownership,
update frequency, debugging, persistence, and coordination requirements.

## Sources

- [React: Passing Data Deeply with Context](https://react.dev/learn/passing-data-deeply-with-context)
- [React: Scaling Up with Reducer and Context](https://react.dev/learn/scaling-up-with-reducer-and-context)
- [React: `useSyncExternalStore`](https://react.dev/reference/react/useSyncExternalStore)

