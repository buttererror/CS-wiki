# JavaScript `Set`, `Map`, and `Object`

**Keywords:** `Set`, `Map`, `Object`, collection, keyed collection, unique
values, key-value pairs, lookup table, dictionary, record, membership,
deduplication, object identity

## Purpose

JavaScript provides several ways to group and look up values. An ordinary
object, a `Map`, and a `Set` overlap in some uses, but they model different
questions:

- an `Object` groups named properties;
- a `Map` associates keys with values; and
- a `Set` stores unique values.

Choosing between them becomes easier when the data's meaning is decided before
its syntax.

## Concept Mind Map

```text
JavaScript collections and records
│
├── Object
│   ├── named properties
│   ├── string or Symbol property keys
│   ├── natural for structured records
│   └── works directly with JSON conventions
│
├── Map
│   ├── key-value collection
│   ├── keys can be values of any type
│   ├── direct size and iteration APIs
│   └── natural for dynamic lookup tables
│
└── Set
    ├── unique-value collection
    ├── membership checks
    ├── direct size and iteration APIs
    └── natural for deduplication
```

## Quick Comparison

| Question | `Object` | `Map` | `Set` |
| --- | --- | --- | --- |
| What does it store? | Named properties | Key-value pairs | Unique values |
| What can be a key? | String or `Symbol` | Any JavaScript value | The stored value is its own lookup value |
| Are duplicate keys or values retained? | A property assignment replaces the previous value | `set` replaces the value for an equal key | An equal value is stored once |
| Direct size API | No | `map.size` | `set.size` |
| Direct membership API | `Object.hasOwn(object, key)` | `map.has(key)` | `set.has(value)` |
| Natural iteration | `Object.keys`, `Object.values`, or `Object.entries` | Directly iterable as `[key, value]` pairs | Directly iterable as values |
| Direct JSON representation | Yes, for JSON-compatible data | No; convert first | No; convert first |
| Typical meaning | A record with known fields | A dynamic association or lookup table | A collection of distinct values |

## `Object`: A Record of Named Properties

An object is the natural choice when properties describe one structured
thing:

```js
const patient = {
  id: 'patient-1',
  fullName: 'Mona Hassan',
  active: true,
}

console.log(patient.fullName) // Mona Hassan
console.log(Object.hasOwn(patient, 'active')) // true
```

Ordinary object property keys are strings or symbols. A number used with
bracket notation becomes a string property key:

```js
const values = {}

values[1] = 'one'

console.log(Object.keys(values)) // ['1']
```

Objects are also convenient for data that will be serialized as JSON:

```js
JSON.stringify(patient)
// '{"id":"patient-1","fullName":"Mona Hassan","active":true}'
```

## `Map`: A Key-Value Collection

A `Map` is designed specifically for adding, finding, replacing, iterating,
and deleting keyed entries:

```js
const sessionsByUserId = new Map()

sessionsByUserId.set('user-1', { expiresAt: 1_800_000_000 })
sessionsByUserId.set('user-2', { expiresAt: 1_800_000_100 })

console.log(sessionsByUserId.get('user-1'))
console.log(sessionsByUserId.has('user-2')) // true
console.log(sessionsByUserId.size) // 2
```

Unlike an object, a `Map` can use an object as a key without converting it to a
string:

```js
const firstButton = { id: 'save' }
const secondButton = { id: 'cancel' }
const handlers = new Map()

handlers.set(firstButton, () => console.log('save'))
handlers.set(secondButton, () => console.log('cancel'))

handlers.get(firstButton)?.() // save
```

Each key maps to one current value. Calling `set` again with the same key
replaces that key's value:

```js
const statuses = new Map([['request-1', 'pending']])

statuses.set('request-1', 'complete')

console.log(statuses.get('request-1')) // complete
```

## `Set`: A Collection of Unique Values

A `Set` answers the question, “Have I already stored this value?”:

```js
const selectedRoles = new Set()

selectedRoles.add('ADMIN')
selectedRoles.add('DOCTOR')
selectedRoles.add('ADMIN')

console.log(selectedRoles.size) // 2
console.log(selectedRoles.has('ADMIN')) // true
```

It is useful for deduplicating primitive values:

```js
const repeatedIds = ['a', 'b', 'a', 'c', 'b']
const uniqueIds = [...new Set(repeatedIds)]

console.log(uniqueIds) // ['a', 'b', 'c']
```

## Equality and Object Identity

`Map` keys and `Set` values use value equality for primitives, but objects are
distinguished by identity:

```js
const first = { id: 1 }
const second = { id: 1 }
const values = new Set([first, second, first])

console.log(values.size) // 2
```

`first` appears once because the same object reference was added twice.
`second` remains separate because it is another object, even though its fields
look the same.

```text
Equality used for membership and keys
│
├── Primitive values
│   └── equivalent values usually match
│       example: 'ADMIN' and 'ADMIN'
│
└── Objects and functions
    └── references must identify the same object
        { id: 1 } !== { id: 1 }
```

More precisely, `Map` and `Set` use JavaScript's SameValueZero comparison. This
also means `NaN` can match `NaN` inside these collections.

## Choosing a Structure

```text
What relationship does the data represent?
│
├── One structured value with named fields
│   └── Object
│       example: { id, email, role }
│
├── Keys associated with values
│   │
│   ├── Known string fields or JSON-shaped data
│   │   └── Object
│   │
│   └── Dynamic keys, arbitrary key types, or collection operations
│       └── Map
│
└── Distinct values without a separate value for each key
    └── Set
```

Practical examples:

```js
// Object: describes one configuration record.
const config = {
  apiUrl: 'https://example.test',
  retry: false,
}

// Map: associates request keys with response factories.
const responders = new Map([
  ['GET /users', () => new Response('[]')],
  ['POST /users', () => new Response('{}', { status: 201 })],
])

// Set: tracks unique enabled capabilities.
const capabilities = new Set(['read', 'write'])
```

## Converting Between Structures

```js
const roleSet = new Set(['ADMIN', 'DOCTOR'])
const roleArray = [...roleSet]

const statusMap = new Map([
  ['request-1', 'pending'],
  ['request-2', 'complete'],
])
const statusObject = Object.fromEntries(statusMap)

const configObject = { retry: false, timeout: 1000 }
const configMap = new Map(Object.entries(configObject))
```

Convert deliberately at boundaries. `JSON.stringify(new Map(...))` and
`JSON.stringify(new Set(...))` do not automatically produce their entries as
ordinary JSON arrays or objects.

## Common Mistakes

### Treating `Object` and `Map` as Identical

Both can implement a lookup table, but their semantics and APIs differ. Use an
object when the keys are properties of a structured record. Prefer `Map` when
the collection itself is dynamic and key-oriented.

### Expecting Structural Equality for Objects

Two separately created objects are different keys or values even when their
contents match. If identity is not the intended rule, use a stable primitive
identifier such as an ID string.

### Assuming `Set` Removes Duplicate Objects by Their Fields

`new Set([{ id: 1 }, { id: 1 }])` contains two values because the objects have
different identities. Deduplicating records by `id` requires an explicit
strategy, often a `Map` keyed by `id`.

### Using an Object Only to Count Entries

An object has no direct `size` property. `Object.keys(value).length` works, but
a dynamic keyed collection may be modeled more clearly by a `Map`.

## Final Mental Model

```text
Object → What named fields describe this value?
Map    → What value belongs to this key?
Set    → Have I already stored this value?
```

## Related Concepts

- [JavaScript](./)
- [Collections and Data Structures](../../algorithms-and-data-structures/collections.md)
- [Functions, Closures, and Identity](functions-closures-and-identity.md)
- [Deduplication](../../software-engineering/terminology/deduplication.md)
- [Route Map](../../software-engineering/terminology/route-map.md)
- [Type Systems](../type-systems.md)

## Sources

- [ECMAScript Language: Objects](https://tc39.es/ecma262/multipage/ecmascript-data-types-and-values.html#sec-object-type)
- [ECMAScript: Keyed Collections](https://tc39.es/ecma262/multipage/keyed-collections.html)
- [ECMAScript: `Object.fromEntries`](https://tc39.es/ecma262/multipage/fundamental-objects.html#sec-object.fromentries)
