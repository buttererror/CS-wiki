# React Rendering Model

**Keywords:** React rendering model, reconciliation, render and commit, pure rendering, component identity, component-identity regression, identity regression, keys, concurrency, StrictMode

## Components and Elements

A React component describes UI from inputs such as props, state, and context.
Calling a component produces React elements: immutable descriptions of what
should appear, not DOM nodes themselves.

“Virtual DOM” is a common informal term. **React element** and **render tree**
are more precise terms when discussing React's public model.

## Trigger, Render, and Commit

```text
An update is scheduled
        ↓
Render: React calls components and calculates the next UI
        ↓
Reconciliation: React relates the next result to the previous tree
        ↓
Commit: React applies required host changes
        ↓
Browser performs layout and paint as needed
```

During initial rendering, React creates the required host nodes. During later
renders, it calculates what changed and commits the necessary updates.

Rendering and committing are different phases. A component can render without
causing a DOM mutation when its resulting output does not require one.

## Pure Rendering

Rendering must be pure:

- the same inputs should produce the same result;
- props and state must not be mutated;
- rendering should not subscribe, start timers, or perform network writes; and
- externally visible work should occur in an event handler or an Effect.

React may call rendering logic more than once, abandon work, or evaluate it
before committing. Purity makes those behaviors safe.

Reading an existing cache or resource during render can be supported by a
framework or React API, so “no I/O during render” is less precise than the rule:
**do not perform uncontrolled side effects during render**.

## What Causes Rendering Work?

A component may render because:

- its own state setter queued an update;
- an ancestor rendered it again;
- a context value it consumes changed;
- a subscribed external store reported a relevant update; or
- a framework requested rendering for navigation or new server data.

Props do not independently emit a render signal. A component normally receives
new props because its parent or framework rendered it. Memoization may allow
React to skip some child work when inputs are unchanged.

## Identity and Keys

React associates state with a component's **type** (function or class reference) and **position in the render tree**. Changing that identity can preserve or reset state depending on the resulting tree:

1. **Same type at the same tree position:** React preserves the existing component instance, keeps its local state (`useState`, `useReducer`, `useRef`), and updates its props.
2. **Different type or changed position:** React unmounts the old component instance, destroys its local state and DOM tree, and mounts a brand-new instance.

Keys help React identify siblings across dynamic updates:

```jsx
items.map((item) => (
  <Row key={item.id} item={item} />
))
```

A good key is stable among siblings and comes from the underlying domain data (such as an entity ID). An array index can be acceptable for a strictly static list, but it is unsafe as identity when items can be inserted, removed, filtered, or reordered.

Lists are commonly rendered with JavaScript array methods such as `map()`. Fragments (`<>...</>`) group adjacent children without introducing an extra DOM wrapper.

### Component-Identity Regressions

A **component-identity regression** is a defect introduced when a code change accidentally breaks the stable identity of a component between renders. When identity stability is lost, the reconciler treats what should be the *same* continuous component as a brand-new instance on every render pass.

#### Common Causes

- **Defining Components Inside Render Functions:**
  Declaring a child component function inside the body of a parent component creates a new function reference in memory on every render pass (`prevType !== nextType`). React unmounts and remounts the child on every update.
  ```tsx
  // ❌ Defect: New function reference on every Parent render
  function Parent() {
    function Child() {
      return <input />;
    }
    return <Child />;
  }
  ```
- **The `useCallback` Component Trap:**
  Wrapping an inline component in `useCallback` (e.g. `const Form = useCallback(({ children }) => ..., [isEditing])`) does *not* provide component identity stability. Any time dependencies change, `useCallback` returns a new function reference. When used as `<Form>`, React detects `prevType !== nextType` and unmounts the entire `<Form>` tree along with all nested children.
  *Solution:* Do not create dynamic component definitions. Compute a plain React element (slot) and pass it as a prop (e.g. `const form = isEditing ? <EditForm /> : <CreateForm />; return <Drawer drawer={form} />`).
- **Dynamic or Unstable Keys:**
  Using non-deterministic keys (e.g. `key={Math.random()}` or `key={Date.now()}`) forces React to treat the element as new every render.
- **Inline Higher-Order Components (HOCs) or Styled Components:**
  Wrapping components via HOCs (e.g., `const Wrapped = withAuth(Base)`) or calling `styled(...)` inside a render function generates a new component type every render.
- **Accidental Structural Shifts:**
  Conditionally wrapping an element in a container div without a matching stable key changes its tree depth and position, causing state to reset.

#### Observable Symptoms

- **Input Focus Loss ("One-Keystroke Bug"):** As the user types into an input field, each keystroke triggers a render, which unmounts the old DOM input node and mounts a new one, immediately blurring keyboard focus.
- **State Wipes:** Local component state (`useState`, `useReducer`, `useRef`) unexpectedly resets to initial values.
- **Effect Thrashing:** `useEffect` and `useLayoutEffect` cleanup and setup run on every render pass, ignoring dependency arrays because the component is unmounting and remounting continuously.
- **Visual Flickering:** CSS enter transitions and mount animations re-trigger repeatedly on each parent state update.

## Commit versus Browser Paint

React's DOM commit and the browser's paint are related but distinct:

```text
React commit
→ DOM changes and layout-effect work

Browser rendering pipeline
→ style, layout, paint, and compositing as required
```

React coordinates with the browser but does not directly paint pixels.

## Concurrency

Modern React can prepare interruptible or lower-priority work when concurrent
features are used. A render may be paused, restarted, or discarded before
commit. JavaScript is not made automatically multi-threaded; concurrency here
describes how React schedules and prioritizes work.

Do not assume every render is time-sliced. The behavior depends on the root,
update priority, and features in use.

Development `StrictMode` deliberately repeats selected calculations and Effect
setup to expose impure rendering and missing cleanup. This diagnostic behavior
does not occur the same way in production.

## Classes, Functions, and Hooks

Class components remain supported. Function components and Hooks provide a
composition model for stateful logic without class instances. Hooks did not
replace classes because classes are inherently incompatible with concurrency;
the modern API instead gives React a consistent functional component model and
lets related stateful logic be composed into custom Hooks.

## Sources and Related Concepts

- [React: Render and Commit](https://react.dev/learn/render-and-commit)
- [React: Keeping Components Pure](https://react.dev/learn/keeping-components-pure)
- [React: Preserving and Resetting State](https://react.dev/learn/preserving-and-resetting-state)
- [Hydration](../../../frontend-development/rendering/hydration.md)
