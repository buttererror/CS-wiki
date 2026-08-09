# Debouncing in React

**Reading status:** Not read yet

## Scope

**Debouncing** is a general timing technique, not a React feature. Its browser
runtime mechanics, timer ownership, and throttle comparison are covered in
[Timers and Event Scheduling](../../../frontend-development/browser-runtime/timers-and-event-scheduling.md).
This page covers how debouncing interacts with React's controlled inputs,
renders, Effects, and callback identity.

## Resettable-Timer Mental Model

Debounce delays an operation until repeated calls have stopped for a chosen
quiet period. Think of it as one resettable timer:

```text
event
  ↓
cancel the previous timer
  ↓
start a new timer
  ↓
another event before the delay? ── yes ──┐
  ↓ no                                  │
quiet period finishes                   │
  ↓                                     │
run the operation                       └── reset again
```

For a search field:

```text
"r"     → timer starts
"re"    → old timer is cancelled; a new timer starts
"rea"   → old timer is cancelled; a new timer starts
"react" → old timer is cancelled; a new timer starts

500 ms without another change
        ↓
one search runs with "react"
```

```text
high-frequency interaction → debounce boundary → lower-frequency operation
```

## Debounce the Propagation, Not Typing

For a controlled text input, update the visible value immediately. Delaying
the state update makes typing feel unresponsive. Instead, keep immediate input
state and derive a value that changes only after a quiet period:

```text
input event → immediate input state → debounced value → expensive work
```

```tsx
function useDebouncedValue<T>(value: T, delayMs: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delayMs);

    return () => clearTimeout(timer);
  }, [value, delayMs]);

  return debouncedValue;
}

function SearchInput() {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebouncedValue(search, 500);

  // Use debouncedSearch as the input to the search owner.
  // The input itself still follows `search` immediately.
  return (
    <input
      value={search}
      onChange={(event) => setSearch(event.target.value)}
      aria-label="Search"
    />
  );
}
```

The Effect cleanup cancels the previous timer before a new value is applied and
when the component unmounts. If a changed debounced value starts asynchronous
work, that work still needs its own cancellation or obsolete-result handling.
Debouncing reduces starts; it does not cancel a request that has already begun.

This value-based model fits search terms, filters, and other state that should
flow to a data-fetching or computation owner only after it stabilizes.

## Debounced Values with TanStack Query

A debounced value fits declarative data fetching because the stabilized value
can participate directly in the query key:

```tsx
const [search, setSearch] = useState("");
const debouncedSearch = useDebouncedValue(search, 500);

const patientsQuery = useQuery({
  queryKey: ["patients", { search: debouncedSearch }],
  queryFn: ({ signal }) =>
    getPatients({
      search: debouncedSearch,
      signal,
    }),
});
```

```text
input event
    ↓
immediate search state
    ↓
useDebouncedValue
    ↓
debouncedSearch changes
    ↓
query key changes
    ↓
query owner starts the request
```

This separates responsibilities: React owns immediate input state, the debounce
Hook controls propagation, and the server-state library owns request lifecycle,
caching, and obsolete-request handling. The exact query-key shape and request
API depend on the application, but every input used by the query function
should be represented by the query key.

## Debounced Callbacks and Render Identity

React calls a function component again for each render. A function created in
the component body is consequently a new JavaScript function object on each
render:

```text
render 1 → debounced callback A → timer A
render 2 → debounced callback B → timer B
```

Repeated calls can cancel one another only when they reach the same closure:

```text
call 1 ─┐
call 2 ─┼──→ same debounced function → same timer
call 3 ─┘
```

Creating a debouncer during every render breaks the resettable-timer model:

```tsx
function Search() {
  const debouncedSearch = debounce(searchPatients, 500); // Avoid
  // ...
}
```

For callback-oriented cases such as a resize handler or an autosave action,
preserve the debounced function for as long as its behavior is unchanged, and
cancel its pending work in cleanup. The debounce utility must expose that
cancellation behavior. `useMemo` can create the stable value:

```tsx
const debouncedSearch = useMemo(
  () => debounce(searchPatients, 500),
  [searchPatients],
);

useEffect(() => {
  return () => debouncedSearch.cancel();
}, [debouncedSearch]);
```

`useMemo` does **not** implement debounce; `debounce` does. The memoization
only avoids creating a new debounce closure while `searchPatients` is the same
function. If `searchPatients` reads render values, its dependencies and stale
closures still need to be handled correctly. Do not use an empty dependency
array merely to keep a callback stable. If identity is required for correctness
rather than optimization, model that ownership explicitly with state or a ref.

Also avoid memoizing ordinary event handlers by default. Function recreation is
normal React behavior; stable identity matters only when an API, a memoized
consumer, or a debounce timer depends on it.

## Debounced Callback versus Debounced Value

`useMemo` and a debounced-value Hook are not competing versions of the same
tool. `useMemo` can preserve the debounced callback object; the debounce utility
still implements the delay. A debounced-value Hook implements delayed value
propagation.

The useful question is:

```text
Do I need to delay a function call or delay value propagation?
```

| Approach | What is delayed? | Main responsibility | Typical cases |
| --- | --- | --- | --- |
| `useMemo(() => debounce(fn, delay), dependencies)` | Callback execution | Preserve one debounced closure and timer | Resize work, autosave, imperative integrations |
| `useDebouncedValue(value, delay)` | Value propagation | Produce state that changes after a quiet period | Search terms, filters, query inputs |

For a controlled search field, the value-based pipeline is often easier to
reason about:

```text
input → immediate UI state → debounced state → server-state query
```

For low-level event handlers such as resize or pointer movement, a stable
debounced callback may better match the imperative API.

## Why It Matters

Users and browsers can produce high-frequency events:

```text
typing    → delay search or filtering
scrolling → delay settled-position work
resizing  → delay dimension recalculation
autosave  → save after editing pauses
pointer   → delay expensive derived work
```

Debounce reduces unnecessary starts, but it also exposes an ownership model:

```text
React render
    ↓
component function executes again
    ↓
local functions may receive new identities
    ↓
a debounced function owns timer state in a closure
    ↓
that closure must live for the intended debounce lifetime
```

## Decision Guide

| Need | Prefer |
| --- | --- |
| Keep a text input responsive but delay its downstream search/filter value | A debounced value with an Effect and timer cleanup |
| Delay an imperative callback such as autosave or resize work | A debounced callback with stable identity and cancellation |
| Update periodically while an event continues | See [Timers and Event Scheduling](../../../frontend-development/browser-runtime/timers-and-event-scheduling.md) for throttling or frame-based scheduling |
| Stop a request already in flight | Request cancellation or obsolete-result handling; debounce alone is insufficient |

## Key Takeaways

- Debounce resets one pending timer until activity becomes quiet.
- Keep controlled-input state immediate; delay the expensive propagation or
  operation.
- A debounced callback needs one closure for the intended timer lifetime.
- `useMemo` can preserve that callback, but does not implement debounce itself.
- A debounced value often produces the clearer search and query pipeline.
- Debounce prevents some work from starting; it does not cancel work already in
  flight.
- Function recreation is normal and should be stabilized only when identity
  affects correctness or a justified optimization.

## Related Concepts

- [Forms](forms.md) — controlled inputs and state ownership.
- [Effects and External Synchronization](effects-and-external-synchronization.md)
  — dependencies, timers, cleanup, and asynchronous work.
- [State and Updates](state-and-updates.md) — state snapshots and render values.
- [Performance](performance.md) — measure first and use memoization selectively.
- [Rendering Model](rendering-model.md) — renders and function-component execution.
- [Function Identity and Closures](function-identity-and-closures.md) — render-local
  functions, state snapshots, memoization, and identity-sensitive consumers.
- [Timers and Event Scheduling](../../../frontend-development/browser-runtime/timers-and-event-scheduling.md)
  — browser timing mechanisms and general debounce behavior.

## Sources

- [React: Referencing Values with Refs](https://react.dev/learn/referencing-values-with-refs)
- [React: `useEffect`](https://react.dev/reference/react/useEffect)
- [React: `useMemo`](https://react.dev/reference/react/useMemo)
- [TanStack Query: Query Keys](https://tanstack.com/query/latest/docs/framework/react/guides/query-keys)
