# Hoisting and Binding Initialization

**Reading status:** Not read yet

## Scope

**Hoisting** is informal JavaScript terminology. It describes the observable
effect of bindings being created before statements execute in their scope. It
does not mean every declaration can be used before its textual position.

The important questions are:

```text
When is the binding created?
When is it initialized?
What happens if code accesses it before initialization?
```

## Declaration Behavior

| Declaration | Binding before statements run? | Initial value before its declaration executes | Early access |
| --- | --- | --- | --- |
| `function declaration` | Yes | Function object | Can normally be called |
| `var` | Yes | `undefined` | Reads as `undefined` |
| `let` | Yes | Uninitialized | Throws `ReferenceError` in the temporal dead zone |
| `const` | Yes | Uninitialized | Throws `ReferenceError` in the temporal dead zone |
| `class` | Yes | Uninitialized | Throws `ReferenceError` in the temporal dead zone |

```js
greet(); // "Hello"
console.log(count); // undefined

function greet() {
  console.log("Hello");
}

var count = 1;
```

By contrast, `let` and `const` bindings exist before their declaration is
evaluated but cannot be accessed during the **temporal dead zone**:

```js
console.log(name); // ReferenceError

const name = "Maya";
```

## Function Expressions Follow Their Variable Binding

The declaration form determines early-access behavior, not whether the right
side eventually contains a function:

```js
runWithVar(); // TypeError: runWithVar is undefined, not callable
var runWithVar = () => {};

runWithConst(); // ReferenceError: temporal dead zone
const runWithConst = () => {};
```

Only a function declaration is initialized with its function object before the
surrounding statements run.

## Scope Matters

Hoisting is scoped. A declaration inside a function, block, or module affects
that scope; it does not make the name globally available. Avoid relying on
early access for readability. Declare values before use unless the declaration
form deliberately communicates a named function available throughout its
scope.

## Hoisting Is Not Function Identity

Hoisting concerns binding creation and initialization. Function identity
concerns whether two references point to the same function object after code
has evaluated. They are related only because a function declaration initializes
a binding with a function object.

See [Functions, Closures, and Identity](functions-closures-and-identity.md).

## Related Concepts

- [JavaScript](README.md)
- [Functions, Closures, and Identity](functions-closures-and-identity.md)
- [Browser Runtime](../../../frontend-development/browser-runtime/README.md)

## Sources

- [ECMAScript: Function Declaration Instantiation](https://tc39.es/ecma262/multipage/ecmascript-language-functions-and-classes.html#sec-functiondeclarationinstantiation)
- [ECMAScript: Declarative Environment Records](https://tc39.es/ecma262/multipage/executable-code-and-execution-contexts.html#sec-declarative-environment-records)
