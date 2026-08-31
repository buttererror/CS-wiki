# JavaScript Objects & Property Descriptors

**Keywords:** javascript objects, object model, property descriptors, writable, enumerable, configurable, accessor properties, data properties, Object.create, Object.defineProperty, object identity, dictionary structure, heap allocation

## Purpose

In JavaScript, **objects** are dynamic collections of properties (keyed by strings or Symbols) mapping to values or accessor functions. Nearly all entities in JavaScript (functions, arrays, dates, regexes, and DOM nodes) are built upon the object model.

---

## Object Anatomy: Data Properties vs. Accessor Properties

A property in JavaScript is not just a raw value; it is governed by an underlying **Property Descriptor** managed by the engine.

```text
JavaScript Property
├── Data Property     (Holds a concrete value)
│   └── Attributes: value, writable, enumerable, configurable
└── Accessor Property (Delegates to getter and setter functions)
    └── Attributes: get, set, enumerable, configurable
```

### Property Attributes

| Attribute | Type | Meaning | Default (Literal `{}`) | Default (`Object.defineProperty`) |
| :--- | :--- | :--- | :--- | :--- |
| **`value`** | Any | The actual stored JavaScript value | Assigned value | `undefined` |
| **`writable`** | Boolean | Whether the value can be reassigned with `=` | `true` | `false` |
| **`enumerable`** | Boolean | Whether it appears in `for...in` and `Object.keys()` | `true` | `false` |
| **`configurable`**| Boolean | Whether the property can be deleted or its descriptor modified | `true` | `false` |

```javascript
const patient = {}

// Defining a property with explicit descriptor controls
Object.defineProperty(patient, 'id', {
  value: 'PT-1049',
  writable: false,     // Read-only
  enumerable: true,    // Appears in loops and JSON.stringify
  configurable: false, // Cannot be deleted or converted to accessor
})

patient.id = 'PT-9999' // Silently ignored (or throws TypeError in strict mode)
console.log(patient.id) // "PT-1049"
```

---

## Object Creation Mechanisms

JavaScript provides multiple ways to instantiate objects, each with distinct prototype wiring:

```text
Object Creation
├── Object Literal (`{}`)           ──► [[Prototype]] = Object.prototype
├── Constructor Function (`new Fn`) ──► [[Prototype]] = Fn.prototype
├── Class Syntax (`new Cls`)        ──► [[Prototype]] = Cls.prototype
└── Direct Creation (`Object.create(proto)`) ──► [[Prototype]] = proto (or null)
```

### 1. `Object.create(proto)`: Direct Prototype Wiring
`Object.create` allows creating a fresh object linked directly to a specified prototype object without invoking constructor logic:

```javascript
const serviceActions = {
  activate() { this.active = true }
}

const service = Object.create(serviceActions)
service.name = 'Consultation'

service.activate()
console.log(service.active) // true
console.log(Object.getPrototypeOf(service) === serviceActions) // true
```

### 2. Dictionary Objects with `null` Prototypes
Passing `null` creates a truly empty object that does not inherit from `Object.prototype` (free of `toString`, `hasOwnProperty`, or `__proto__` pollution):

```javascript
const secureMap = Object.create(null)
console.log(secureMap.toString) // undefined
```

---

## Memory Model: Reference vs. Value

- **Primitives** (`number`, `string`, `boolean`, `symbol`, `bigint`, `null`, `undefined`) are immutable and compared by value.
- **Objects** (including arrays and functions) are stored on the heap and manipulated via **memory references**. Assigning an object to another variable copies the reference pointer, not the underlying structure.

---

## Related Concepts

- [JavaScript Prototypes](prototypes.md)
- [JavaScript Inheritance](inheritance.md)
- [JavaScript Functions](functions.md)
- [Set, Map, and Object](set-map-and-object.md)
