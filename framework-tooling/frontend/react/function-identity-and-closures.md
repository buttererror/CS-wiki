# Function Identity and Closures in React

**Reading status:** Not read yet

## Scope

Function identity and closures are JavaScript concepts. This page preserves the
React-specific learning model: component execution creates render-local
functions, those functions capture a render's values, and stable identity
matters only when another system observes or stores the reference.

Start with the language foundation in
[Functions, Closures, and Identity](../../../computer-science-foundations/programming-languages/javascript/functions-closures-and-identity.md).

## Render Means Function Execution

A function component is a JavaScript function. When React renders it, React
calls that function again and receives the next UI description.

```text
State or props change
        ↓
React schedules a render
        ↓
Component function executes again
        ↓
Render-local variables and functions are created
        ↓
JSX describes the next UI
        ↓
React commits required changes
```

```tsx
function SearchPage() {
  const handleClick = () => {
    console.log("clicked");
  };

  return <button onClick={handleClick}>Search</button>;
}
```

Conceptually:

```text
Render 1 → SearchPage() executes → handleClick 1
Render 2 → SearchPage() executes → handleClick 2
Render 3 → SearchPage() executes → handleClick 3
```

The source code is unchanged, but each evaluation creates a new function
object. This is normal behavior, not automatically a performance problem.

## Functions Inside and Outside Components

Every function form evaluated inside the component is recreated:

```tsx
function Component() {
  function declaredHandler() {}
  const functionExpression = function () {};
  const arrowHandler = () => {};

  return <button onClick={() => console.log("clicked")}>Click</button>;
}
```

```text
Each render
├── new declaredHandler
├── new functionExpression
├── new arrowHandler
└── new inline click callback
```

A function declared at module scope is created during module initialization,
not during each component execution:

```tsx
function formatName(name: string): string {
  return name.toUpperCase();
}

function UserCard() {
  return <div>{formatName("Mahmoud")}</div>;
}
```

```text
Module initializes → formatName is created

Render 1 → UserCard executes → reuses formatName
Render 2 → UserCard executes → reuses formatName
```

Move a function outside only when it does not need component props, state, or
other render-local values. Location communicates ownership; it is not merely a
memoization trick.

## Closures Capture Render Values

Each render receives a state snapshot. Functions created during that render
close over the values in that render's scope.

```tsx
function Counter() {
  const [count, setCount] = useState(0);

  const logCount = () => {
    console.log(count);
  };

  return (
    <button onClick={() => setCount(count + 1)}>
      {count}
    </button>
  );
}
```

```text
Render 1: count = 0 → logCount 1 captures that render's count
Render 2: count = 1 → logCount 2 captures that render's count
```

The durable mental model is:

```text
Each render creates a snapshot
        ↓
Functions created in that render capture the snapshot
        ↓
An older function can still observe older render values
```

This is the basis of stale-closure problems. Preserving a callback forever
while omitting values it reads from its dependencies does not make the callback
correct; it can preserve obsolete values instead.

## When Function Identity Matters

Identity matters when another component or system compares, stores, registers,
or later removes the callback reference.

### Memoized Children

```tsx
const SaveButton = memo(function SaveButton({
  onSave,
}: {
  onSave: () => void;
}) {
  return <button onClick={onSave}>Save</button>;
});
```

If the parent creates a new `onSave` function on every render, the prop is not
referentially equal to the previous prop. That can prevent `memo` from skipping
the child's render. Whether this optimization is worthwhile should be measured.

### Effect Dependencies

```tsx
function Component({ onChange }: { onChange: () => void }) {
  useEffect(() => {
    onChange();
  }, [onChange]);

  return null;
}
```

A new `onChange` reference is a changed dependency, so the Effect is eligible
to run again.

### External Subscriptions

```tsx
useEffect(() => {
  window.addEventListener("resize", handleResize);

  return () => {
    window.removeEventListener("resize", handleResize);
  };
}, [handleResize]);
```

Registration and cleanup operate on callback references. The Effect lifecycle
keeps each setup paired with the matching cleanup; dependencies determine when
that pair is replaced.

Other identity-sensitive cases include debounced callbacks, imperative APIs
that retain callbacks, and caches keyed by a reference.

## `useMemo` and `useCallback`

`useMemo` caches a calculated value while its dependencies remain unchanged:

```tsx
const visibleItems = useMemo(
  () => filterItems(items, query),
  [items, query],
);
```

`useCallback` caches a function definition while its dependencies remain
unchanged:

```tsx
const handleSave = useCallback(() => {
  saveForm(formId);
}, [formId]);
```

Their relationship can be understood as:

```tsx
const handleSave = useMemo(
  () => () => saveForm(formId),
  [formId],
);
```

```text
useMemo     → caches a calculation result
useCallback → caches a function reference
```

`useCallback` does not make the function body inherently faster. It preserves
identity for a consumer that benefits from stability. Memoization also adds
dependency management, comparison work, and maintenance cost.

## When Recreation Usually Does Not Matter

An ordinary local event handler is normally fine:

```tsx
function ModalButton() {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => setIsOpen(true);

  return <button onClick={handleClick}>Open</button>;
}
```

Do not memoize merely because a function is recreated. Ask whether stable
identity has a semantic or measured performance purpose.

## Practical Decision Rule

Ask:

```text
Is the function passed to a memoized child?
Is it a dependency whose changes replace synchronization?
Is it registered with an external system?
Is it stored and invoked later?
Does a closure need to retain one shared resource, such as a debounce timer?
Has measurement shown that stability enables a useful optimization?
```

If none apply, normal recreation is usually acceptable. If one applies,
consider `useCallback`, `useMemo`, a ref, moving the function to module scope,
or redesigning ownership. Choose according to whether the need is rendering,
resource lifetime, or correctness.

## Key Mental Model

```text
React renders
      ↓
Component function executes again
      ↓
Render-local function is created
      ↓
New function identity
      ↓
Closure captures this render's values
      ↓
Identity matters only if a consumer observes or stores it
```

## Key Takeaways

- A React render executes the component function again.
- Functions evaluated inside the component normally receive new identities.
- Functions at module scope are not recreated by component renders.
- A closure observes the render values associated with the function that was
  created.
- Recreation is normal; stable identity matters only to an identity-sensitive
  consumer or a demonstrated optimization.
- `useCallback` preserves a function reference while dependencies are stable;
  it does not remove the need for correct dependencies.
- Moving, memoizing, or storing a callback are different ownership decisions.

## Related Concepts

- [JavaScript Functions, Closures, and Identity](../../../computer-science-foundations/programming-languages/javascript/functions-closures-and-identity.md)
- [Rendering Model](rendering-model.md)
- [State and Updates](state-and-updates.md)
- [Effects and External Synchronization](effects-and-external-synchronization.md)
- [Debouncing in React](debouncing.md)
- [Performance](performance.md)

## Sources

- [React: State as a Snapshot](https://react.dev/learn/state-as-a-snapshot)
- [React: `useCallback`](https://react.dev/reference/react/useCallback)
- [React: `useMemo`](https://react.dev/reference/react/useMemo)
- [React: `memo`](https://react.dev/reference/react/memo)
- [React: Removing Effect Dependencies](https://react.dev/learn/removing-effect-dependencies)
