# Functions, Closures, and Identity

**Reading status:** Not read yet

## Scope

Functions, closures, and reference identity are JavaScript language concepts.
Frameworks such as React expose their consequences, but do not define the
underlying behavior.

## Function Objects and Identity

A function declaration or function expression creates a function object.
Variables compare equal only when they refer to the same object, not merely to
functions with matching source code.

```js
const first = () => "saved";
const second = () => "saved";

first === second; // false
Object.is(first, second); // false
```

Each evaluation of a function expression creates a distinct function object:

```js
function createHandler() {
  return () => console.log("clicked");
}

const firstHandler = createHandler();
const secondHandler = createHandler();

firstHandler === secondHandler; // false
```

This is **function identity** (or referential identity). It matters only when
another API compares, stores, removes, or caches a function by reference.

## Closures

A closure gives a function access to bindings from its lexical environment.
The function captures bindings, not an automatically frozen copy of every
value.

```js
function createCounter() {
  let count = 0;

  return () => {
    count += 1;
    return count;
  };
}

const increment = createCounter();

increment(); // 1
increment(); // 2
```

`increment` retains access to the `count` binding after `createCounter()` has
returned. Calling `createCounter()` again creates a separate environment and a
separate counter.

## When Identity Matters

Examples include:

- removing an event listener with the same callback reference;
- caching a value under a callback key;
- a debounce utility that stores timer state in one callback's closure; and
- a framework optimization that compares callback props or dependencies.

Identity alone is not a performance problem. Creating a local callback is
ordinary JavaScript. Stabilize identity only when the receiving API requires it
for correctness or when measurement shows that it enables a useful optimization.

## React as an Application

React function components are JavaScript functions. When React renders a
component, it executes the component function again, producing new local
values and handlers for that render. React state snapshots mean each handler
also closes over the values from the render that created it.

This explains why function identity can matter for `memo`, Hook dependencies,
subscriptions, and debounced callbacks. It does **not** mean every React
callback should be memoized. See:

- [React Rendering Model](../../../framework-tooling/frontend/react/rendering-model.md)
- [React State and Updates](../../../framework-tooling/frontend/react/state-and-updates.md)
- [React Performance](../../../framework-tooling/frontend/react/performance.md)
- [Debouncing in React](../../../framework-tooling/frontend/react/debouncing.md)

`useCallback` can cache a function while its dependencies remain the same, but
it is a performance tool rather than a replacement for explicit state or
resource ownership.

## Related Concepts

- [Hoisting and Binding Initialization](hoisting.md)
- [Timers and Event Scheduling](../../../frontend-development/browser-runtime/timers-and-event-scheduling.md)
- [React State and Updates](../../../framework-tooling/frontend/react/state-and-updates.md)

## Sources

- [ECMAScript: Function Objects](https://tc39.es/ecma262/multipage/ecmascript-language-functions-and-classes.html#sec-ecmascript-function-objects)
- [ECMAScript: Strict Equality Comparison](https://tc39.es/ecma262/multipage/abstract-operations.html#sec-isstrictlyequal)
- [React: State as a Snapshot](https://react.dev/learn/state-as-a-snapshot)
- [React: `useCallback`](https://react.dev/reference/react/useCallback)
