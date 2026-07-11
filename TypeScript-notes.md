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

## Next Step

Learn **TypeGuard**, since it is the primary mechanism used to narrow an `unknown` value into a safe, usable type.
