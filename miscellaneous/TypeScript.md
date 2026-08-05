# Primary Category
Programming Fundamentals → TypeScript's type system for handling values with unknown types safely.

# Taxonomy Classification
- **Field:** Programming Languages
- **Area:** Static Type Systems
- **Level:** Conceptual

## TypeScript system Setup

`npm install -g --save-dev typescript tsx`

## What tsx actually does

Uses esbuild under the hood

Transpiles TS → JS very fast

Focuses on execution speed, not correctness
So this works:
```
const x: number = "hello"; // ❌ type error
console.log(x);
```

## TypeScript packages commands
* `tsx file.ts

* `tsc --noEmit` 
  ✔ Full type checking
  ✔ Exact TS errors
  ✔ No JS files generated
* `tsc --watch` Errors update as you type.

  ### linter
  `npm install --save-dev typescript eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin`

---
## Concept: UnknownType

## Definition

`unknown` represents a value whose type is not known yet.

Unlike `any`, `unknown` does **not** allow you to use the value until you've proven what its type is.

- `any` → Turns off TypeScript's type checking.
- `unknown` → Preserves type safety by requiring type narrowing.

## Mental Model

Think of them as trust levels:

- **`any`** → "Trust me, I know what I'm doing."
- **`unknown`** → "I don't know what this is yet, so I need to inspect it first."

## Example

### `any`

```ts
let value: any = "hello";

value.toFixed(2); // ✅ No TypeScript error
// ❌ Runtime error because value is actually a string
```

### `unknown`

```ts
let value: unknown = "hello";

value.toFixed(2); // ❌ TypeScript error
```

Type narrowing is required:

```ts
if (typeof value === "number") {
  value.toFixed(2);
}
```

## Real-World Example

External API responses are often unknown until validated.

```ts
function processResponse(data: unknown) {
  if (
    typeof data === "object" &&
    data !== null &&
    "name" in data &&
    typeof data.name === "string"
  ) {
    console.log(data.name);
  }
}
```

## Why It Matters

Using `unknown` prevents many runtime errors by forcing you to validate data before using it.

This is especially useful for:

- API responses
- User input
- JSON parsing
- Third-party libraries
- Error objects

## Interview Answer

> I prefer `unknown` over `any` because `unknown` keeps TypeScript's type safety. It accepts any value, but I must narrow or validate the type before using it. In contrast, `any` disables type checking and can lead to runtime errors.

## Relationships to Other Areas

- **TypeNarrowing** → Determines the actual type using checks like `typeof`, `instanceof`, or `in`.
- **RuntimeValidation** → Validates external data before it enters the application.
- **TypeAssertion** → Can convert `unknown` to a specific type when the developer is certain of the value.

## Related Concepts

- TypeNarrowing → Programming Fundamentals
- TypeAssertion → Programming Fundamentals
- Generic → Programming Fundamentals
- TypeGuard → Programming Fundamentals
---
# TypeScript Learning — Type Assertions, Type Guards, and Compile-Time vs Runtime

## Primary Category
Programming Fundamentals >> Understanding how TypeScript's static type system interacts with JavaScript at runtime.

## Taxonomy Classification

- **Field:** Programming Languages
- **Area:** Type Systems & Execution Model
- **Level:** Conceptual

---

# Context

While implementing a NestJS `AuthGuard`, several TypeScript constructs appeared together:

- `unknown`
- `as`
- `value is`
- Runtime validation (`typeof`)
- `Record<string, unknown>`

Understanding how these concepts work together is essential for writing safe TypeScript.

---

# 1. Compile-Time vs Runtime

## Definition

TypeScript is **only a compile-time type checker**.

It analyzes source code, checks types, and emits plain JavaScript.

After compilation:

- All type annotations disappear.
- All interfaces disappear.
- All generic parameters disappear.
- All type assertions disappear.

Only JavaScript executes.

---

## Mental Model

```text
TypeScript Source
        │
        ▼
TypeScript Compiler
        │
        ├── Checks types
        ├── Performs type inference
        ├── Narrows types
        └── Removes all type information
        │
        ▼
JavaScript
        │
        ▼
Node.js Runtime
```

The compiler never executes the program.

The runtime never knows TypeScript types existed.

---

# 2. Type Annotation (`:`)

## Definition

A type annotation declares the expected type of a variable.

```ts
const user: User = createUser();
```

The compiler verifies that `createUser()` returns a compatible value.

If it cannot prove compatibility, compilation fails.

---

## Mental Model

```text
Variable
    │
    ▼
Expected Type

Compiler verifies assignment.
```

---

# 3. Type Assertion (`as`)

## Definition

A **type assertion** (`as`) tells TypeScript:

> **"Treat this value as this type because I know something you cannot prove."**

The compiler trusts the programmer instead of proving the type itself.

Type assertions:

- Do **not** change the value.
- Do **not** validate the value.
- Do **not** perform runtime conversion.
- Exist only during compilation.

---

## Mental Model

TypeScript performs **static analysis**.

It cannot:

- Execute functions.
- Parse JSON.
- Decode JWTs.
- Inspect databases.
- Read HTTP requests.
- Inspect the DOM at runtime.

Whenever the actual type depends on runtime information, TypeScript reaches a limit.

A type assertion fills that gap.

```text
Runtime value
      │
      ▼
Compiler:
"I can't prove its exact type."

      │
      ▼
Programmer:
"I already know."

      │
      ▼
value as SomeType
```

---

## Example

```ts
const value = JSON.parse(json);

const user = value as User;
```

The compiler cannot prove that the parsed JSON matches `User`.

The assertion tells the compiler to trust the programmer.

---

## Safe Rule

Use `as` only when:

- You already validated the value.
- A library guarantees the value's shape.
- You created the value yourself.
- You know more than the compiler can infer.

Avoid using `as` simply to silence compiler errors.

---

# 4. Why `Record<string, unknown>`?

Inside the type guard:

```ts
if (!value || typeof value !== "object") {
    return false;
}

const payload = value as Record<string, unknown>;
```

After the runtime check:

```text
value

↓

object
```

An `object` type has no known properties.

The assertion changes the compiler's understanding to:

```text
Record<string, unknown>

↓

Dictionary with string keys
```

Now property access becomes legal:

```ts
payload.sub
payload.email
payload.role
```

Each property's type remains:

```text
unknown
```

They still require validation.

---

# 5. Type Guard (`is`)

## Definition

A type guard combines:

- Runtime validation.
- Compile-time type narrowing.

Example:

```ts
function isJwtPayload(
    value: unknown
): value is JwtPayload
```

The return type:

```ts
value is JwtPayload
```

is **not runtime code**.

It is a promise to the compiler.

---

## Runtime

The runtime executes only:

```ts
typeof payload.sub === "string"
typeof payload.email === "string"
USER_ROLES.has(payload.role)
```

The runtime returns:

```text
true

or

false
```

---

## Compile Time

The compiler records the meaning:

```text
If this function returns true,

↓

value is JwtPayload.
```

Then, inside:

```ts
if (isJwtPayload(payload)) {

}
```

the compiler narrows:

```text
unknown

↓

JwtPayload
```

---

# 6. Does Runtime Inform the Compiler?

No.

The compiler is already gone.

The narrowing happens **before compilation** through **control-flow analysis**.

The compiler reasons:

```text
If execution reaches this block,

↓

the function must have returned true,

↓

therefore value is JwtPayload.
```

At runtime, JavaScript simply evaluates a boolean.

---

# 7. Relationship Between `as` and `is`

These two features serve different purposes.

## `as`

Changes the compiler's interpretation.

```ts
const payload = value as Record<string, unknown>;
```

No validation occurs.

---

## Runtime Validation

Checks whether the value actually has the required properties.

```ts
typeof payload.sub === "string"
```

---

## `is`

Communicates the successful validation back to the compiler.

```ts
value is JwtPayload
```

This enables automatic type narrowing.

---

# Complete Flow

```text
Incoming value
        │
        ▼
unknown
        │
        ▼
Runtime check

typeof value === "object"

        │
        ▼
value as Record<string, unknown>

        │
        ▼
Validate every property

sub
email
role

        │
        ▼
true / false

        │
        ▼
value is JwtPayload

        │
        ▼
Compiler narrows

JwtPayload
```

---

# Key Takeaways

- TypeScript exists only during compilation.
- JavaScript executes at runtime.
- `:` declares the expected type of a variable.
- `as` tells the compiler to trust the programmer's knowledge.
- `as` never validates or converts values.
- Runtime checks (`typeof`, `instanceof`, etc.) validate actual data.
- `is` combines runtime validation with compile-time type narrowing.
- The compiler never receives information back from runtime; it performs narrowing through control-flow analysis before emitting JavaScript.

---

# Related Concepts

- **Unknown** → Programming Fundamentals
- **TypeAnnotation** → Programming Fundamentals
- **TypeAssertion** → Programming Fundamentals
- **TypeGuard** → Programming Fundamentals
- **ControlFlowAnalysis** → Programming Languages
- **StaticAnalysis** → Programming Languages
- **RuntimeValidation** → Software Engineering
- **Generics** → Programming Languages
```
---
## Update

### Additional Details

#### TypeAssertion Is Not Completely Unchecked

A common misconception is that `as` completely disables TypeScript's type checking.

The actual behavior is more nuanced.

A direct assertion:

```ts
value as TargetType
```

still performs a **compatibility (plausibility) check** between the source type and the asserted type.

If the two types have little or no structural relationship, TypeScript reports:

```text
Conversion of type 'A' to type 'B' may be a mistake because neither type sufficiently overlaps with the other.
If this was intentional, convert the expression to 'unknown' first.
```

This check exists to prevent accidental assertions between completely unrelated types.

---

#### Two Independent Checks During a Type Assertion

When the compiler encounters:

```ts
return expression as TargetType;
```

it performs two separate checks.

##### 1. Assertion Compatibility

Can the source type reasonably be asserted as `TargetType`?

```text
Source Type
      │
      ▼
Target Type
```

If the types are structurally unrelated, the assertion itself is rejected (TS2352).

Example:

```ts
{
  cookies: {}
} as ExecutionContext
```

fails because the object shares almost nothing with `ExecutionContext`.

---

##### 2. Surrounding Context Compatibility

If the assertion is accepted, the resulting expression is now considered to be `TargetType`.

The compiler then checks whether **TargetType** satisfies the surrounding context.

Examples:

```ts
const user = value as User;
```

Checks:

```text
User
    │
Assignment
```

---

```ts
return value as Request;
```

Checks:

```text
Request
    │
Return Type
```

---

```ts
someFunction(value as User);
```

Checks:

```text
User
    │
Parameter Type
```

The original source type is no longer considered after the assertion.

---

#### Why `unknown` Works

The compiler recommends:

```ts
value as unknown as TargetType
```

because `unknown` is intentionally compatible with every type assertion.

```text
Source
    │
    ▼
unknown
    │
    ▼
Target
```

This bypasses the structural compatibility check.

It **does not** make the assertion safer.

Instead, it communicates:

> "I understand these types are unrelated, and I intentionally want to bypass TypeScript's compatibility check."

---

#### Relationship Between `Partial<T>` and `as`

`Partial<T>` and `as` solve different problems.

`Partial<T>` provides compile-time checking **while constructing** an object.

```ts
const context: Partial<ExecutionContext> = {
    getHandler: jest.fn(),
};
```

Benefits:

- Property names are validated.
- Property types are validated.
- Misspelled properties are detected.

However, every property becomes optional.

Therefore:

```text
Partial<ExecutionContext>
≠
ExecutionContext
```

A function returning `ExecutionContext` still requires:

```ts
return context as ExecutionContext;
```

The assertion tells the compiler to treat the intentionally incomplete mock as a complete implementation.

---

#### Test Double Pattern

A common unit testing pattern is:

```ts
const context: Partial<ExecutionContext> = {
    getHandler: jest.fn(),
    getClass: jest.fn(),
    switchToHttp: () => ({
        getRequest: () => request,
    }),
};

return context as ExecutionContext;
```

This pattern provides:

- Type-safe construction.
- Minimal implementation.
- Explicit acknowledgment that the mock intentionally implements only the members required by the test.

---

### Additional Relationships

- **PartialType** → Ensures safe construction of incomplete objects before a final assertion.
- **StructuralTyping** → Determines whether a direct assertion is considered structurally plausible.
- **ExecutionContext** → Demonstrates creating minimal test doubles for large framework interfaces.
- **TypeCompatibility** → Governs both assertion plausibility and assignability to the surrounding context.

---

### Further Notes

TypeScript distinguishes between **assertion compatibility** and **context compatibility**.

The complete compiler reasoning is:

```text
Original Expression
        │
        ▼
Assertion Compatibility Check
(Is the assertion plausible?)

        │
        ▼
Asserted Type

        │
        ▼
Context Compatibility Check
(Can the asserted type satisfy the assignment,
return type, or parameter type?)
```

A type assertion **does not validate runtime truth**, but it also **does not completely disable the type system**.

Instead, it:

1. Performs a limited structural compatibility check.
2. Reinterprets the expression as the asserted type.
3. Continues normal type checking using the asserted type.
