### 📘 Core Concepts

#### 🔹 React State Hooks
- `useState`: For simple local state
- `useReducer`: For complex or multi-step state logic
- `useRef`: For storing mutable values or referencing DOM
- `useContext`: For sharing lightweight global state (like theme or auth)

#### 🔹 State Management Solutions
- **Redux Toolkit**: Scalable state structure, DevTools, async logic via thunks
- **Zustand**: Lightweight alternative to Redux with minimal setup

#### 🔹 Memoization Tools
- `useMemo`: Avoid expensive recalculations on every render
- `useCallback`: Prevent function re-creation across renders
- `React.memo`: Prevent re-render of memoized components

#### 🔹 Abstractions & Custom Hooks
- Abstract logic to custom hooks to promote reusability
- Helps split unrelated concerns (SRP)
- Example: separate data-fetching logic from UI using `useFetch`

---

### 🧠 React Side Effects

#### 🔸 Side Effects in React
- Use `useEffect` for data fetching, DOM interaction, subscriptions
- `useLayoutEffect` when layout must be read before paint
- Always return a cleanup function if effect sets up a subscription or timeout

#### 🔸 Common Pitfalls
- Forgetting dependencies → unexpected re-runs
- Inline functions/objects inside effect without `useCallback` / `useMemo`
- Not cleaning up timers or subscriptions

#### 🔸 Best Practices
- Split unrelated concerns across multiple effects
- Use custom hooks to extract reusable logic (`useFetch`, `useScroll`, etc.)
- Minimize external values inside `useEffect` body

---

### 🌲 React Imports & Tree-Shaking

#### 🔹 Minimal Imports Principle
- Import only what's needed (e.g., `import { memo } from 'react'`)
- Avoid `import React from 'react'` unless necessary
- Cleaner code, fewer naming conflicts, smaller bundles

#### 🔹 Tree-Shaking
- Supported by modern bundlers (Webpack, Vite, etc.)
- Removes unused code from final bundle

```js
// Less optimal
import React from "react";
const Component = React.memo(() => {});

// Better
import { memo } from "react";
const Component = memo(() => {});
```

#### 🔹 Best Practices
- Prefer specific imports
- Use modern bundlers
- Keep dependencies up to date

---

### 🔁 React Memoization

React provides three main ways to memoize values and components to optimize performance:

#### 1. `useMemo`
Used to memoize **computed values**, especially useful for expensive calculations:

```js
const expensiveValue = useMemo(() => heavyCalculation(data), [data]);
```

#### 2. `useCallback`
Used to memoize **callback functions** to preserve reference across renders:

```js
const handleClick = useCallback(() => doSomething(), []);
```

#### 3. `memo`
Used to memoize an entire **functional component**, preventing unnecessary re-renders:

```js
const MyComponent = memo(({ value }) => <div>{value}</div>);
```

#### 🔸 Memoization Tips
- Avoid over-memoizing
- Use DevTools Profiler to detect performance bottlenecks
- Always include correct dependency arrays

---

### ⚖️ React vs Redux vs Zustand

| Use Case                        | React Hooks               | Redux Toolkit / Zustand        |
|-------------------------------|---------------------------|-------------------------------|
| Simple form/input logic       | `useState`                | Overkill                      |
| Complex state transitions     | `useReducer`              | Optional                      |
| Global theme/auth             | `useContext`              | Recommended                   |
| App-wide filters/cart/user    | Painful with Context      | ✅ Use Redux or Zustand       |
| Debugging/DevTools needed     | Manual console/logs       | ✅ Redux Toolkit               |
| Performance-sensitive areas   | Risk of wide re-renders   | `useSelector` helps isolate   |

---

### 🧰 Code Quality Patterns

#### 🔸 Boilerplate
- Redux Toolkit minimizes action/reducer setup with `createSlice()`
- Zustand skips setup entirely — uses just functions and stores

#### 🔸 Prop Drilling
- Avoid passing props through many levels by using `useContext` or state libraries

#### 🔸 Selectors
- Isolate state access with `useSelector`
- Never select full `state`, only specific slices
- Use `shallowEqual` when returning objects/arrays to avoid re-renders

#### 🔸 Custom Hooks & SRP
- Organize logic by concern: UI, effects, services
- Encourages clean separation of view vs data handling

---

### 📦 SOLID Principles Summary (Frontend Perspective)

| Principle | Summary | React Example |
|----------|---------|----------------|
| **S** – Single Responsibility | One job per module/component | Component renders, hook fetches |
| **O** – Open/Closed | Extend without modifying existing logic | Use `props`, slots, or `children` |
| **L** – Liskov Substitution | Child shouldn’t break base expectations | `CustomInput` behaves like `<input>` |
| **I** – Interface Segregation | Don’t require unused props/data | Split context or props by purpose |
| **D** – Dependency Inversion | Depend on abstractions, not implementations | Call service/hook, not direct fetch |

---

### 🧠 Interview Snippets
> "I start with React's native tools and only bring in Redux or Zustand when global coordination or debugging demands it."

> "Redux is powerful for large apps, but for lighter projects I rely on local state and context for simplicity and performance."

---

### useState
* When changes it triggers re-renders to the UI, it's main purpose is to update the UI when a value changes.
* Avoid using a value in state that isn't used in the UI.

#### functional updates

Why “functional updates” are better (setCount(prev => ...))

When you write:
`setCount(count + 1);`
you’re using count from the current render (a captured value). Most of the time it works, but it can break in situations where multiple updates happen before React commits a new render.

The core idea

React may batch state updates (especially in React 18).

Event handlers capture the state value from the render in which they were created.

If you call setCount(count + 1) multiple times in the same tick, each call might compute from the same old count.
Example: “increment twice”
```
const incTwice = () => {
  setCount(count + 1);
  setCount(count + 1);
};
```
If count is 0, you might expect 2.
But both lines compute 0 + 1, so you often end up with 1.

The fix: functional update
```
const incTwice = () => {
  setCount((prev) => prev + 1);
  setCount((prev) => prev + 1);
};
```
Now React will apply them in order:

prev: 0 → 1

prev: 1 → 2

So you reliably get 2.

Why this matters even if you don’t call twice

Because the moment you:

trigger updates from async code (setTimeout, promises)

reuse handlers in different contexts

do multiple state updates in one event

rely on React batching behavior

…the functional form becomes the “always safe” default.

Rule of thumb

If the next state depends on the previous state → always use functional update

### useEffect
* Check this out https://react.dev/learn/you-might-not-need-an-effect
* Check react docs
  
useEffect — What We Learned
1) What useEffect is

useEffect is React’s way to handle side effects in function components.

A side effect is anything that:

Interacts with something outside React’s render

Needs setup and possibly cleanup

Examples:

Timers (setInterval, setTimeout)

Event listeners

Subscriptions

API calls

Syncing with browser APIs

2) When useEffect runs (Lifecycle)

Think of useEffect as replacing:

componentDidMount

componentDidUpdate

componentWillUnmount  
3) Why cleanup matters

Without cleanup:

Timers keep running

Event listeners stack

Memory leaks happen

Bugs appear when navigating or re-rendering

Your timer task demonstrated this clearly.
4) Dependency array — the rules
[]

Run once (mount)

Cleanup on unmount

[value]

Run when value changes

Cleanup before re-run

No array

Run after every render (almost always wrong)


### ⏭️ Next Topics To Cover
- Async state handling (loading, error, data)
- State persistence strategies
- RTK Query
- Redux state tree design prompt
- Routing in React
- Real-world walkthrough: state architecture in a project
- Abstraction concept
