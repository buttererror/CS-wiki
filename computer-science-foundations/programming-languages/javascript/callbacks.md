# JavaScript Callbacks & Inversion of Control

**Keywords:** callback, callback function, higher-order function, first-class functions, inversion of control, delegated execution, synchronous callback, asynchronous callback, error-first callback, callback hell, render callback

## Purpose

A **callback function** is a function passed as an argument to another function or host subsystem, with the expectation that the receiving code will invoke ("call back") that function at a designated point.

A callback is **not an intrinsic type of function**; it is an **execution role** that any function can play when execution control is delegated to external code. This pattern is made possible by JavaScript treating functions as **first-class citizens** (values that can be assigned to variables, passed as arguments, and returned from other functions).

---

## Direct Invocation vs. Delegated Invocation

The distinction between a regular function call and a callback is **who pulls the trigger and provides the arguments**:

```text
1. Direct Invocation:
   Caller ────────── calls directly ──────────▶ Target Function()
   (Caller controls execution timing and supplies arguments immediately)

2. Delegated Invocation (Callback):
   Caller ── passes fn reference ──▶ Host System / Higher-Order Function
                                                 │
                                     "calls back" when ready
                                                 ▼
                                          Target Function(args)
   (Host system controls execution timing and supplies arguments at invocation)
```

### The "Phone Number" Mental Model

* **Direct invocation:** Dialing the recipient's phone number directly, staying on the line until they answer, and speaking immediately.
* **Callback delegation:** Leaving your phone number with a front desk receptionist. You do not wait on the line; when the receptionist is ready, *they* initiate the call back to you.

```javascript
function greet(name) {
  return `Hello, ${name}!`
}

// 1. DIRECT INVOCATION: You call the function yourself right now.
// `greet` is NOT acting as a callback here.
const message = greet("Alice")

// 2. DELEGATED INVOCATION (Callback):
// You pass the function reference `greet` to `map`.
// The `map` implementation invokes `greet` for each element, supplying each item as an argument.
const messages = ["Alice", "Bob"].map(greet)
```

---

## Execution Control & The "Parentheses Trap"

The fundamental syntactic rule of callbacks: **whoever writes the parentheses `()` executes the function and supplies the arguments.**

When registering a callback, passing the function reference (without parentheses) is mandatory. Appending parentheses immediately executes the function at the call-site:

```javascript
function onTimeout() {
  console.log("Timer expired!")
}

// ✅ CORRECT: Passing the function reference (handing over the phone number)
setTimeout(onTimeout, 1000)

// ❌ BUG (The Parentheses Trap): Invoking the function immediately!
setTimeout(onTimeout(), 1000)
// Evaluates `onTimeout()` right now, returns `undefined`,
// and passes `undefined` as the callback to setTimeout.
```

When the host environment (the browser event loop, a timer subsystem, or an array iteration method) eventually runs the callback, *it* appends the parentheses and injects runtime arguments:

```javascript
// Inside the browser event dispatcher:
registeredHandler(domEvent) // Host adds () and supplies the event object
```

---

## Classification: Synchronous vs. Asynchronous

Callbacks fall into two major operational categories based on when they execute relative to the surrounding code:

| Category | Execution Timing | Thread Behavior | Common Examples |
| :--- | :--- | :--- | :--- |
| **Synchronous Callbacks** | Executed immediately during the execution of the higher-order function. | Blocking; surrounding code waits until the callback finishes. | `Array.prototype.map`, `filter`, `forEach`, `sort`, `reduce`. |
| **Asynchronous Callbacks** | Scheduled to execute at a later time after an external event, I/O operation, or timer completes. | Non-blocking; the calling code continues execution immediately. | `setTimeout`, `setInterval`, DOM event listeners (`addEventListener`), Node.js `fs.readFile`. |

### Synchronous Example
```javascript
const numbers = [1, 2, 3]
const doubled = numbers.map(n => n * 2)
// `n => n * 2` runs synchronously during the execution of `map`.
console.log(doubled) // [2, 4, 6]
```

### Asynchronous Example
```javascript
console.log("Start")

setTimeout(() => {
  console.log("Callback executed")
}, 0)

console.log("End")

// Output:
// Start
// End
// Callback executed (runs in the next event loop tick)
```

---

## Inversion of Control (IoC)

Callbacks embody the architectural principle of **Inversion of Control** (often summarized by the *Hollywood Principle: "Don't call us, we'll call you"*):

1. **Without IoC (Traditional Control Flow):** Your code directly drives the entire flow, querying states, making decisions, and calling downstream subroutines step by step.
2. **With IoC (Callback Delegation):** A framework, runtime, or higher-order function controls the overall execution flow and scheduling. It calls into your custom logic only when specific trigger conditions or lifecycle events occur.

---

## Callback Payload Shapes: Domain Events vs. Slot Projection

In modern application engineering (such as UI architectures and React), callbacks serve two primary communication purposes based on what data they pass:

### 1. Upward Domain Events (`onSubmit(data)`)
The child component or low-level module notifies its parent of user actions or state changes by passing domain data upward:

```tsx
// Child raises a domain event:
<CreateUserForm onSubmit={(userData) => api.saveUser(userData)} />
```

### 2. Upward UI Slot Projection (`children(formElement)`)
In patterns such as **Function as Child Component (FaCC)** or **Render Props**, the child component retains ownership of complex internal state (validation, input lifecycles, active focus) while delegating layout placement to the parent:

```tsx
// Child builds UI and executes the parent's render callback:
<ServiceCategoryCreateForm>
  {(formElement) => (
    // Parent decides layout placement (e.g. drawer vs modal) without stealing internal form state:
    <AdaptiveDrawer>
      {formElement}
    </AdaptiveDrawer>
  )}
</ServiceCategoryCreateForm>
```

---

## Evolution: From Callbacks to Promises and Async/Await

Historically, JavaScript asynchronous programming relied exclusively on **error-first callbacks** (standardized in Node.js):

```javascript
fs.readFile("data.json", "utf8", (err, data) => {
  if (err) {
    handleError(err)
    return
  }
  processData(data)
})
```

### The Problem: Callback Hell ("Pyramid of Doom")
Sequencing multiple asynchronous tasks with raw callbacks produced deeply nested code with repetitive, brittle error handling:

```javascript
loginUser(credentials, (err, user) => {
  if (err) return handleError(err)
  fetchProfile(user.id, (err, profile) => {
    if (err) return handleError(err)
    fetchPermissions(profile.role, (err, perms) => {
      if (err) return handleError(err)
      renderDashboard(user, profile, perms)
    })
  })
})
```

### The Modern Standard: Promises and `async`/`await`
Modern JavaScript addresses callback hell with `Promise` abstractions and `async`/`await` syntax:
- **`Promise`**: Represents the eventual completion (or rejection) of an asynchronous operation, allowing chaining via `.then()` and centralized error handling with `.catch()`.
- **`async`/`await`**: Syntactic sugar over Promises that enables writing asynchronous code with clean, synchronous-looking control flow and standard `try/catch` blocks.

While Promises and `async`/`await` have superseded callbacks for asynchronous control flows, callbacks remain the universal foundation for:
- Event handlers (`addEventListener`)
- Functional collection processing (`map`, `filter`, `reduce`)
- Architectural inversion of control (Observer pattern, UI slot projection, render props).

---

## Related Concepts

- [JavaScript Functions & Execution Context](functions.md) — Function declarations, expressions, arrow functions, and `this` binding.
- [Functions, Closures, and Identity](functions-closures-and-identity.md) — Function reference identity, closure captures, and equality comparison.
- [Closures and Lexical Scope](closures.md) — Lexical environments, outer scope retention, and lifecycle persistence.
- [Observer Pattern](../../software-engineering/design-patterns/observer-pattern.md) — Functional and object-oriented subscription models.
- [Timers and Event Scheduling](../../../frontend-development/browser-runtime/timers-and-event-scheduling.md) — Task queues, microtasks, and host scheduling of callbacks.
