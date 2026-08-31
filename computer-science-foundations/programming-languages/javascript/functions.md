# JavaScript Functions & Execution Context

**Keywords:** javascript functions, function objects, function declaration, function expression, arrow functions, this binding, dynamic this, lexical this, call-site, call, apply, bind, first-class functions, function identity

## Purpose

In JavaScript, functions are **first-class objects**. They can be assigned to variables, stored in data structures, passed as arguments to other functions, returned from functions, and have properties attached to them.

---

## Function Declarations vs. Expressions vs. Arrow Functions

```text
Function Formats
├── Function Declaration (Hoisted, creates dynamic `this`, has .prototype)
├── Function Expression  (Evaluated at runtime, creates dynamic `this`, has .prototype)
└── Arrow Function       (Lexically binds `this`, no .prototype, cannot be a constructor)
```

### 1. Function Declaration
```javascript
function greet(name) {
  return `Hello, ${name}`
}
```
- Bound to the lexical identifier during the declaration processing phase (hoisted).
- Creates a dynamic `this` binding determined at call-time.
- Automatically has a `.prototype` property and can be invoked with `new` as a constructor.

### 2. Function Expression
```javascript
const greet = function(name) {
  return `Hello, ${name}`
}
```
- Assigned during expression evaluation (subject to the variable's temporal dead zone if declared with `let`/`const`).
- Creates a dynamic `this` binding determined at call-time.

### 3. Arrow Function (`() => {}`)
```javascript
const greet = (name) => `Hello, ${name}`
```
- **Lexical `this`:** Does **not** bind its own `this`; it inherits `this` from its enclosing lexical scope.
- **No `.prototype`:** Arrow functions do not possess a `.prototype` property and throw a `TypeError` if invoked with `new`.
- **No `arguments` object:** Relies on rest parameters (`(...args) => {}`).

---

## The `this` Binding Mechanism

The value of `this` inside a regular function is **not static**; it is dynamically determined by **how and where the function is invoked (the call-site)**.

$$\underbrace{\text{object}}_{\text{Receiver (this)}}\text{.method()}$$

```javascript
const user = {
  name: 'Sam',
  greet: function() {
    return `Hi, I am ${this.name}`
  }
}

user.greet() // "Hi, I am Sam" (this = user)

const detachedGreet = user.greet
detachedGreet() // "Hi, I am undefined" (this = global/undefined in strict mode)
```

### Explicit Binding: `call`, `apply`, `bind`

JavaScript allows overriding dynamic `this` binding explicitly:

- `fn.call(context, arg1, arg2)`: Executes `fn` immediately with `this = context` and comma-separated arguments.
- `fn.apply(context, [arg1, arg2])`: Executes `fn` immediately with `this = context` and arguments passed as an array.
- `fn.bind(context, arg1)`: Returns a **new bound function** permanently locked to `context`.

---

## Why Arrow Functions Fail as Prototype Methods & Test Mocks

When defining prototype methods or mocking object behavior where the method must interact with the calling instance, **regular functions are mandatory**:

```javascript
// ❌ FAILS: Arrow function captures lexical `this` (undefined or window)
HTMLDialogElement.prototype.showModal = () => {
  this.setAttribute('open', '') // TypeError: Cannot read properties of undefined
}

// ✅ SUCCEEDS: Regular function binds `this` dynamically to the calling <dialog> instance
HTMLDialogElement.prototype.showModal = function() {
  this.setAttribute('open', '') // `this` is the specific <dialog> DOM element
}
```

---

## Function Identity and Reference Equality

Each evaluation of a function expression creates a distinct function object in memory. Two functions with identical bodies are never equal by reference:

```javascript
const fn1 = () => 'test'
const fn2 = () => 'test'

fn1 === fn2 // false (distinct heap objects)
```

This distinction is crucial when registering/unregistering event listeners or managing dependency arrays in memoized architectures.

---

## Related Concepts

- [Closures and Lexical Scope](closures.md)
- [JavaScript Prototypes](prototypes.md)
- [Hoisting and Binding Initialization](hoisting.md)
- [JavaScript Objects](objects.md)
