# TypeScript Type-System Foundations

**Reading status:** Not read yet

## Scope

This page applies the broader [Type Systems](../type-systems.md) model to
TypeScript. It focuses on static checking, unknown values, generic type
preservation, tuples, and built-in utility types.

## Compile Time and Runtime

TypeScript checks source code before execution, then emits JavaScript. Type
annotations, interfaces, generic parameters, and type assertions are type-only
constructs and are generally erased from the emitted code.

```text
TypeScript source
        ↓
type checking and transformation
        ↓
JavaScript output
        ↓
runtime behavior
```

TypeScript therefore cannot validate an API response merely because it has a
declared type. Validate external data at runtime, then use types to describe
the validated value. Some TypeScript syntax, such as an enum, can intentionally
emit JavaScript; “types are erased” does not mean every TypeScript feature has
no runtime output.

## `unknown` and `any`

Both types can represent a value whose precise type is not known. Their safety
boundaries differ:

| Type | What TypeScript permits before proof | Typical use |
| --- | --- | --- |
| `unknown` | No property access, calls, or assignments that require a specific type | External or unvalidated data |
| `any` | Nearly any syntactically valid operation | An explicit, localized escape from checking |

```ts
let value: unknown = "hello";

// value.toFixed(2); // Error: it has not been narrowed to a number.

if (typeof value === "string") {
  value.toUpperCase(); // Safe: value is string in this branch.
}
```

```ts
let unchecked: any = "hello";

unchecked.toFixed(2); // Allowed by TypeScript; can fail at runtime.
```

Prefer `unknown` at a trust boundary. A runtime check can become a user-defined
type guard that narrows the value for later code:

### Mental Model

```text
any
↓
"I don't know the type, but trust me."
↓
TypeScript allows operations

unknown
↓
"I don't know the type."
↓
TypeScript requires proof
↓
Type narrowing
↓
Safe operation
```

```ts
type User = { name: string };

function isUser(value: unknown): value is User {
  return (
    typeof value === "object" &&
    value !== null &&
    "name" in value &&
    typeof value.name === "string"
  );
}
```

The `value is User` annotation does not perform validation. The function body
must make that statement true when it returns `true`.

## Type Assertions and Validation

A type assertion tells the compiler to treat a value as a more specific type:

```ts
const input = document.getElementById("search") as HTMLInputElement;
```

`as` neither converts the value nor validates it at runtime. A direct assertion
still needs a plausible source/target relationship; writing
`value as unknown as Target` deliberately bypasses that protection and is not a
validation technique.

Likewise, `Record<string, unknown>` describes a value *after* the compiler has
been given that type. It does not prove that an unknown runtime value is a
record, nor does it validate its properties. Prefer a guard that checks the
properties your program actually requires.

## Generics Preserve Relationships

A generic captures a type and reuses it in related positions. It preserves
information that `any` would discard.

```ts
function first<Type>(values: readonly Type[]): Type | undefined {
  return values[0];
}

const name = first(["Maya", "Ari"]); // string | undefined
```

`Type` is inferred from the argument in ordinary calls. A constraint narrows
which types can fill a parameter while retaining the caller's specific type:

```ts
function withLength<Type extends { length: number }>(value: Type): Type {
  console.log(value.length);
  return value;
}
```

The constraint guarantees `length`; it does not replace `Type` with exactly
`{ length: number }`.

### Mental Model

Generics allow type information to flow through an abstraction:

```text
Concrete value and type
        ↓
      Type
        ↓
Generic implementation
        ↓
Reuse Type in related positions
```

A constraint limits the allowed inputs without discarding the specific type:

```text
Type
↓
Can represent many types

extends RequiredShape
↓
Only types with the required capability are accepted
```

## Function Wrappers and Tuples

Function parameters have ordered types, represented by a tuple. A wrapper can
capture that tuple and reuse it so callers retain the original parameter types:

```ts
function debounce<Args extends unknown[]>(
  callback: (...args: Args) => void,
  delayMs: number,
) {
  let timer: ReturnType<typeof setTimeout> | undefined;

  return (...args: Args): void => {
    if (timer !== undefined) clearTimeout(timer);

    timer = setTimeout(() => {
      callback(...args);
    }, delayMs);
  };
}

function search(query: string, page: number): void {}

const debouncedSearch = debounce(search, 500);
// (query: string, page: number) => void
```

The complete relationship is:

```text
search(query: string, page: number)
             ↓
      debounce(search, 500)
             ↓
      Args = [string, number]
             ↓
returned function:
(query: string, page: number) => void
             ↓
debouncedSearch("react", 2)
```

For this call, `Args` is inferred as `[string, number]`. A tuple has known
types at positions; it can also include optional or rest elements. A plain
`string[]` says every element is a string but does not encode a fixed second
parameter of another type.

```text
Array: string[]
       [string, string, string, ...]

Tuple: [string, number, boolean]
            ↓       ↓       ↓
          string  number  boolean
```

This wrapper preserves the parameter tuple, not the callback's return type:
debounced work happens later, so its result cannot be returned synchronously.
It is intentionally a minimal typing example; lifecycle code also needs a
cancel mechanism. See [Timers and Event Scheduling](../../../frontend-development/browser-runtime/timers-and-event-scheduling.md)
for a cancelable implementation.

## Utility Types

Utility types derive new types from existing ones:

```text
Existing type
     ↓
Utility type
     ↓
Derived type
```

Common utility types include:

```ts
Partial<Type>
Required<Type>
Readonly<Type>
Pick<Type, Keys>
Omit<Type, Keys>
Record<Keys, Type>
Parameters<Type>
ReturnType<Type>
```

```ts
type User = {
  id: string;
  name: string;
  email: string;
};

type UpdateUser = Partial<User>;
type CompleteUser = Required<UpdateUser>;
type ImmutableUser = Readonly<User>;
type UserPreview = Pick<User, "id" | "name">;
type CreateUser = Omit<User, "id">;
type UsersById = Record<string, User>;
```

- `Partial<Type>` makes every property optional.
- `Required<Type>` makes every property required.
- `Readonly<Type>` prevents assignment to properties during type checking; it
  does not freeze the JavaScript object at runtime.
- `Pick<Type, Keys>` selects a set of properties.
- `Omit<Type, Keys>` removes a set of properties.
- `Record<Keys, Type>` constructs an object type whose keys and values follow
  the supplied types. It describes a type; it does not validate runtime data.

`Parameters<Type>` extracts a function's parameter tuple, and
`ReturnType<Type>` extracts its return type:

```ts
type SearchParameters = Parameters<typeof search>;
// [query: string, page: number]

type TimerHandle = ReturnType<typeof setTimeout>;
```

The timer-handle example adapts to the type declarations available in the
current environment instead of assuming a browser-only or server-only handle.
For an overloaded function, `Parameters` and `ReturnType` use its final overload
signature.

## Key Mental Model

```text
                    TypeScript Type System
                            │
             ┌──────────────┴──────────────┐
             ↓                             ↓
        Type Safety                    Type Reuse
             │                             │
       unknown vs any                   Generics
             │                             │
       Type Narrowing              Generic Constraints
                                           │
                                  Preserve information
                                           │
                         ┌─────────────────┴─────────────────┐
                         ↓                                   ↓
                  Parameters<Type>                    ReturnType<Type>
                         │                                   │
                       Tuple                       Function return type
```

The type system does more than declare types: it can capture, constrain,
inspect, transform, and reuse type information. These compile-time models do
not replace runtime validation.

## Decision Guide

| Situation | Prefer |
| --- | --- |
| Value crosses an untrusted boundary | `unknown`, runtime validation, then narrowing |
| Existing untyped integration needs a temporary escape hatch | A narrow, documented `any` boundary |
| Reusable code relates input and output types | Generics and inference |
| A generic needs a known capability | An `extends` constraint |
| A type should be derived rather than copied | A utility type or a custom type transformation |

## Related Concepts

- [Type Systems](../type-systems.md)
- [JavaScript Functions, Closures, and Identity](../javascript/functions-closures-and-identity.md)
- [Timers and Event Scheduling](../../../frontend-development/browser-runtime/timers-and-event-scheduling.md)
- [Toolchain and Type Checking](toolchain.md)

## Sources

- [TypeScript: TypeScript for the New Programmer](https://www.typescriptlang.org/docs/handbook/typescript-from-scratch.html)
- [TypeScript: Everyday Types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html)
- [TypeScript: Narrowing](https://www.typescriptlang.org/docs/handbook/2/narrowing.html)
- [TypeScript: Generics](https://www.typescriptlang.org/docs/handbook/2/generics.html)
- [TypeScript: Object Types](https://www.typescriptlang.org/docs/handbook/2/objects.html#tuple-types)
- [TypeScript: Utility Types](https://www.typescriptlang.org/docs/handbook/utility-types.html)
