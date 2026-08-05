# React Performance

## Begin with Evidence

Rendering is normal React work, not automatically a performance bug. Optimize
when measurements identify a user-visible problem.

Useful evidence includes:

- React DevTools Profiler traces;
- interaction latency;
- component render duration and frequency;
- production JavaScript transfer and execution;
- route and shared chunk composition;
- network waterfalls; and
- task-specific and Core Web Vital measurements where relevant.

## Reduce Work at Its Source

High-impact improvements often come before manual memoization:

- keep state near the components that need it;
- avoid broad subscriptions to rapidly changing values;
- derive values during render instead of synchronizing duplicate state;
- move interaction-specific work into event handlers;
- parallelize independent data requests;
- cache and deduplicate remote data at the correct owner;
- virtualize genuinely large lists; and
- defer heavy routes, editors, charts, or other optional features.

## Memoization

### `memo()`

`memo()` can skip rendering a component when its props are unchanged. Local
state and consumed context can still cause it to render.

### `useMemo()`

`useMemo()` caches a calculated value between renders while dependencies remain
unchanged. Use it for measured expensive calculations or when stable identity
is required by another optimization.

### `useCallback()`

`useCallback()` caches a function definition. It is useful when passing a
callback to a memoized consumer or stabilizing a dependency for a justified
reason.

Do not wrap every value and callback. Memoization adds dependencies, memory,
comparison work, and maintenance cost. React Compiler can automatically
memoize supported components and values when enabled, further reducing the need
for routine manual memoization.

## State Updaters and Stable Callbacks

When a callback calculates state from previous state, a functional update can
remove the captured state from the callback:

```jsx
const addItem = useCallback((item) => {
  setItems((previous) => [...previous, item])
}, [])
```

Use this because it expresses the update correctly, not merely to satisfy an
empty dependency array.

## Code Loading

Use dynamic imports for routes and heavy features not required immediately:

```jsx
const ReportsPage = lazy(() => import('./ReportsPage'))
```

Splitting every small component can add avoidable chunk and network overhead.
Choose boundaries based on feature size and when users need the code.

Import syntax alone does not guarantee a smaller bundle. Namespace imports can
still be tree-shaken by a capable bundler, while named imports from a package
with poor module structure may still include excess code. Inspect the actual
production output.

## Effects and Data Waterfalls

Fetching sequentially in nested Effects can delay content:

```text
Render parent → fetch parent data → render child → fetch child data
```

Routers, frameworks, and server-state libraries can start requests earlier,
parallelize independent work, cache results, and avoid duplicates. Data-loading
architecture usually matters more than micro-optimizing component syntax.

## Lists and Identity

Stable keys protect identity and reduce incorrect DOM/state reuse. They do not
by themselves prevent component rendering. For very large visible collections,
windowing or `content-visibility` may reduce rendering cost after measurement.

## Sources and Related Concepts

- [React: `memo`](https://react.dev/reference/react/memo)
- [React: `useMemo`](https://react.dev/reference/react/useMemo)
- [React: `useCallback`](https://react.dev/reference/react/useCallback)
- [React Compiler](https://react.dev/learn/react-compiler)
- [React Application Delivery](../react-application-delivery/README.md)

