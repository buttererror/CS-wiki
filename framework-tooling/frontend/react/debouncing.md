# Debouncing in React

**Reading status:** Not read yet

## Scope

**Debouncing** is a general timing technique, not a React feature. Its browser
runtime mechanics, timer ownership, and throttle comparison are covered in
[Timers and Event Scheduling](../../../frontend-development/browser-runtime/timers-and-event-scheduling.md).
This page covers how debouncing interacts with React's controlled inputs,
renders, Effects, and callback identity.

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

## Debounced Callbacks and Render Identity

React calls a function component again for each render. A function created in
the component body is consequently a new JavaScript function object on each
render:

```text
render 1 → debounced callback A → timer A
render 2 → debounced callback B → timer B
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

## Decision Guide

| Need | Prefer |
| --- | --- |
| Keep a text input responsive but delay its downstream search/filter value | A debounced value with an Effect and timer cleanup |
| Delay an imperative callback such as autosave or resize work | A debounced callback with stable identity and cancellation |
| Update periodically while an event continues | See [Timers and Event Scheduling](../../../frontend-development/browser-runtime/timers-and-event-scheduling.md) for throttling or frame-based scheduling |
| Stop a request already in flight | Request cancellation or obsolete-result handling; debounce alone is insufficient |

## Related Concepts

- [Forms](forms.md) — controlled inputs and state ownership.
- [Effects and External Synchronization](effects-and-external-synchronization.md)
  — dependencies, timers, cleanup, and asynchronous work.
- [State and Updates](state-and-updates.md) — state snapshots and render values.
- [Performance](performance.md) — measure first and use memoization selectively.
- [Rendering Model](rendering-model.md) — renders and function-component execution.
- [Timers and Event Scheduling](../../../frontend-development/browser-runtime/timers-and-event-scheduling.md)
  — browser timing mechanisms and general debounce behavior.

## Sources

- [React: Referencing Values with Refs](https://react.dev/learn/referencing-values-with-refs)
- [React: `useEffect`](https://react.dev/reference/react/useEffect)
- [React: `useMemo`](https://react.dev/reference/react/useMemo)
