# Expressions and Statements

**Reading status:** Not read yet

**Keywords:** expression, statement, expression statement, evaluation, value, control flow, AST, ternary operator, declaration, side effect, JavaScript grammar

## Scope

In programming languages, syntax is organized into **expressions** and **statements**.
This distinction is a foundational grammar and evaluation rule of the JavaScript language:
it governs what can be evaluated to produce a value, what directs execution flow, and which
constructs are syntactically valid in a given language context.

## Core Distinction

The primary distinction between an expression and a statement is whether the construct
**produces a value** or **executes an instruction**:

```text
Expression → Evaluated by the runtime → Produces a Value
Statement  → Executed by the runtime  → Performs an Action / Directs Flow
```

| Dimension | Expression | Statement |
| --- | --- | --- |
| **Primary purpose** | Produce, compute, or retrieve a value | Execute an instruction, declare a binding, or control execution flow |
| **Evaluates to a value?** | Yes (e.g., `42`, `"text"`, `true`, object/function reference) | No (statements complete with execution completion records, not first-class values) |
| **Variable assignment target?** | Can appear on the right-hand side of `=` | Cannot be assigned to a variable (`const x = if (c) {}` is invalid syntax) |
| **Function argument?** | Can be passed directly as an argument | Cannot be passed as an argument |
| **Typical examples** | Literals, arithmetic/logical operations, function calls, ternary `? :`, arrow functions | Variable declarations (`let`, `const`), loops (`for`, `while`), branches (`if/else`, `switch`), `return`, `throw` |

---

## Expressions

An **expression** is any valid unit of code that resolves to a value. Whenever JavaScript encounters
an expression, it evaluates the expression and substitutes it with the resulting value.

### 1. Primary Expressions
Basic, atomic values and identifiers:
* **Literals:** `42`, `"hello"`, `true`, `null`, `undefined`
* **Data structures:** `[1, 2, 3]`, `{ a: 1, b: 2 }`
* **Identifiers:** `userName`, `totalCount`
* **`this` keyword:** resolves to the current execution context

### 2. Operator and Compound Expressions
Combinations of expressions evaluated via operators:
* **Arithmetic / Logical:** `a + b`, `x * y`, `!isActive`, `a && b`, `val ?? defaultVal`
* **Property Access:** `user.profile.name`, `items[0]`
* **Function Calls:** `calculateTotal()`, `items.map(fn)`
* **Conditional (Ternary) Expression:** `isMember ? discountedPrice : fullPrice`
* **Function Expressions:** `function() {}`, `(x) => x * 2`

### Expressions with Side Effects
An expression always produces a value, but it may also cause a **side effect** (a mutation of external state):
* `count++` (evaluates to current `count`, then increments `count`)
* `x = 5` (assignment expression: assigns `5` to `x` and evaluates to `5`)
* `console.log("msg")` (prints to terminal and evaluates to `undefined`)

---

## Statements

A **statement** is an instruction that performs an action. Statements compose the structural flow of a JavaScript program.
Because statements do not evaluate to values, they cannot be used in positions expecting a value.

### 1. Declaration Statements
Define bindings, functions, or classes in the current scope:
```js
let count = 0;
const MAX_LIMIT = 100;
function calculate() {}
class UserAccount {}
```

### 2. Control Flow and Branching Statements
Direct execution across conditional paths:
```js
if (score > 90) {
  grantReward();
} else {
  reviewScore();
}

switch (role) {
  case "admin":
    enableControls();
    break;
  default:
    restrictAccess();
}
```

### 3. Iteration Statements
Execute a code block repeatedly until a termination condition is met:
```js
for (let i = 0; i < items.length; i++) {}
for (const item of items) {}
while (isRunning) {}
```

### 4. Jump and Termination Statements
Alter standard execution sequence:
* `return value;` (terminates function execution and supplies the return value)
* `break;` and `continue;` (control loop iteration)
* `throw new Error();` (interrupts standard control flow with an exception)

---

## Expression Statements

An **expression statement** is an expression that appears in a syntactic position where a statement is expected.
It is evaluated for its side effects, and its resulting value is discarded.

```js
// 1. Function call used as a statement (evaluated for side effects)
console.log("Logged");

// 2. Assignment expression used as a statement
total = a + b;

// 3. Post-increment expression used as a statement
counter++;
```

In JavaScript grammar, appending a semicolon `;` to an expression turns it into an expression statement.

---

## Syntactic Contexts and Host Embeddings

Programming languages and host environments strictly distinguish between **expression contexts**
(locations that require a value) and **statement contexts** (locations that accept control structures).

### Value-Expecting Contexts (Expression Positions)
The following syntactic locations require expressions:
1. **Right-hand side of assignments:** `const val = <expression>;`
2. **Function argument lists:** `doSomething(<expression>, <expression>);`
3. **Template literal interpolations:** `` `User: ${<expression>}` ``
4. **Array and Object elements:** `[<expression>]`, `{ key: <expression> }`
5. **Embedded DSLs (such as JSX in React):** `{ <expression> }`

### Why Statements Fail in Expression Holes (e.g., JSX or Template Literals)
When a framework or DSL establishes an expression context (such as `{}` in JSX), it evaluates the enclosed
token to retrieve a renderable node or primitive. Placing a statement (such as `if` or `for`) inside an
expression hole causes a syntax error because statements do not produce a value that the evaluator can consume.

```js
// ❌ Invalid: 'if' is a statement and produces no value for interpolation
// const greeting = `Status: ${if (active) "Online"}`;

// ✅ Valid: Ternary operator is an expression and produces a string value
const greeting = `Status: ${active ? "Online" : "Offline"}`;
```

---

## Neighboring Concepts

- [Functions, Closures, and Identity](functions-closures-and-identity.md) — function declarations vs. function expressions and reference identity.
- [Hoisting and Binding Initialization](hoisting.md) — declaration statements (`var`, `let`, `const`, `function`) and scope initialization timing.
- [React Rendering Model](../../../framework-tooling/frontend/react/rendering-model.md) — reconciliation and evaluation of React elements constructed from expressions.
