# JavaScript Closures & Lexical Scope

**Keywords:** closures, lexical scope, lexical environment, environment record, outer reference chain, variable lifetime, garbage collection, memory retention, scope chain, execution context

## Purpose

A **closure** is the combination of a function bundled together (enclosed) with references to its surrounding state (**the lexical environment**).

In JavaScript, every function creates a closure upon definition, granting it ongoing access to variables declared in its outer scope even after that outer function has finished executing and returned.

---

## How Closures Work: Lexical Environments

When code executes in JavaScript, the engine creates **Execution Contexts** and associated **Lexical Environments**:

```text
Global Execution Context
  ├── Lexical Environment (Global Variables)
  │
  └── Outer Function Execution Context
        ├── Environment Record: { baseValue: 10 }
        ├── Outer Reference ──► points to Global Lexical Environment
        │
        └── Returned Inner Function
              ├── Outer Reference ──► points to Outer Lexical Environment
              └── Code Body: () => baseValue + 1
```

```javascript
function createMultiplier(multiplier) {
  // `multiplier` is a binding in the outer lexical environment
  return function(number) {
    return number * multiplier
  }
}

const double = createMultiplier(2)
const triple = createMultiplier(3)

console.log(double(5)) // 10
console.log(triple(5)) // 15
```

### Key Principles

1. **Captures Bindings, Not Values:** A closure holds a live reference to the variable binding itself, not a frozen snapshot. If the enclosed variable mutates, subsequent invocations of the closure reflect the updated value.
2. **Distinct Environments per Call:** Each call to the outer function instantiates a fresh Lexical Environment Record. `double` and `triple` above retain independent, non-interfering outer environments.

---

## Variable Lifetime & Garbage Collection

Normally, when a function completes execution, its local stack frame and variables are eligible for immediate Garbage Collection (GC).

However, **a closure prevents garbage collection** of its referenced outer environment records as long as the returned function object itself remains reachable from active roots:

```text
Active Window / Event Listener
        │ (holds reference)
        ▼
   Closure Function
        │ [[Environment]] (internal engine slot)
        ▼
Outer Lexical Environment  <── Protected from Garbage Collection
  - largeDataBuffer
  - cachedCredentials
```

> [!WARNING]
> **Memory Retention Caveat:** If a long-lived closure (such as a global event listener, timer, or single-page application cache) references a scope containing large arrays or DOM nodes, that memory cannot be reclaimed until the closure itself is released or detached.

---

## Common Applications of Closures

1. **Data Privacy and Encapsulation:** Creating truly private variables before native `#privateFields` existed.
2. **Factory Functions:** Parameterizing specialized behavior (e.g., math utilities, API client creators).
3. **Partial Application & Currying:** Pre-configuring initial arguments for higher-order functions.
4. **Stateful Event Handlers & Hooks:** Preserving state across asynchronous callbacks and interval timers.

---

## Related Concepts

- [JavaScript Functions](functions.md)
- [Hoisting and Binding Initialization](hoisting.md)
- [JavaScript Objects](objects.md)
- [Timers and Event Scheduling](../../../frontend-development/browser-runtime/timers-and-event-scheduling.md)
