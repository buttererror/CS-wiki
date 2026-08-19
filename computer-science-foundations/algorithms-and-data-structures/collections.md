# Collections and Data Structures

**Keywords:** collection, collections, container, aggregate, abstract data type,
ADT, data structure, sequence, list, array, dynamic array, linked list, tuple,
set, bag, multiset, map, dictionary, associative array, hash map, hash table,
key-value collection, stack, queue, deque, iterable, `Array`, `Set`, `Map`,
`Object`

## Purpose

A **collection** is broad vocabulary for a value or abstraction that groups
multiple elements and provides operations for organizing, accessing, or
changing them. The useful question is not merely whether something contains
many values, but which relationships and operations it represents.

```text
Sequence or list → position and order
Set              → membership and uniqueness
Map or dictionary → key-to-value association
Stack or queue   → constrained access order
```

The central correction is:

> A list is one collection abstraction. It is not the parent of arrays, sets,
> maps, dictionaries, objects, stacks, queues, trees, and graphs.

## Classification and Scope

The primary field is **Algorithms and Data Structures**. The topic also
relates to:

- **Programming Languages**, which expose concrete collection types and APIs;
- **Type Systems**, which describe types such as `Array<T>`, `Set<T>`, and
  `Map<K, V>`;
- **Algorithms**, because a representation determines which operations are
  available and how costly they are; and
- **Data Modeling and Software Design**, where the chosen abstraction
  communicates whether order, uniqueness, association, or access discipline
  matters.

“Collection” is useful umbrella vocabulary, not one universal type hierarchy.
For example, Java's Collections Framework deliberately places `Map` outside
its `Collection` interface hierarchy, even though maps are often called keyed
collections in broader discussion. Always distinguish a general concept from
a particular language or library's taxonomy.

## Taxonomy Map

At the abstraction level, collections can be oriented by the relationship or
access rule they model:

```text
Collection abstractions
│
├── Positional and ordered
│   ├── Sequence / list
│   ├── Stack                 last in, first out
│   ├── Queue                 first in, first out
│   └── Deque                 access at both ends
│
├── Membership-oriented
│   ├── Set                   distinct elements
│   └── Bag / multiset        elements with multiplicity
│
├── Association-oriented
│   └── Map / dictionary      keys associated with values
│
└── Priority-oriented
    └── Priority queue        next element chosen by priority
```

This is a practical orientation, not a disjoint mathematical partition. For
example, a stack preserves an order but restricts which end its interface
exposes, and an ordered map combines association with a defined ordering.

Concrete data structures form a different taxonomy:

```text
Concrete representations
│
├── Contiguous or indexed
│   ├── fixed-size array
│   ├── dynamic array
│   └── circular buffer
│
├── Linked
│   ├── singly linked list
│   └── doubly linked list
│
├── Hash-based
│   └── hash table
│
├── Tree-based
│   ├── search tree
│   ├── balanced search tree
│   └── heap
│
└── Specialized
    ├── bit set
    └── other workload-specific structures
```

The two taxonomies connect many-to-many:

```text
Sequence / list ──→ dynamic array or linked list
Set             ──→ hash table, search tree, or bit set
Map             ──→ hash table or search tree
Stack / queue   ──→ array, circular buffer, or linked list
Priority queue  ──→ heap or search tree
```

Trees and graphs also model hierarchical or network relationships in their
own right. A tree may implement a collection abstraction, but trees and graphs
should not be treated merely as leftover children of “collection.”

## Three Layers That Are Often Mixed Together

```text
Conceptual behavior
├── sequence/list, set, map/dictionary, stack, queue
│
├── Concrete representation
│   ├── array or dynamic array
│   ├── linked nodes
│   ├── hash table
│   ├── balanced search tree
│   └── bit set
│
└── Language or library API
    ├── JavaScript Array, Set, and Map
    ├── Python list, set, and dict
    └── Java List, Set, Map, and their implementations
```

An **abstract data type** (ADT) specifies values and operations independently
of implementation. A **data structure** organizes information in memory and
uses algorithms to implement operations. A language API gives programmers a
specific interface and adds language-specific behavior.

The same word can name different layers in different contexts. “Array,” for
example, can mean a general indexed structure or a particular built-in class
whose behavior differs from a conventional fixed-size array.

## Relationships, Not One Rigid Tree

| Required relationship | Common abstraction | Possible representation | JavaScript example |
| --- | --- | --- | --- |
| Ordered values, often addressed by position | Sequence or list | Array, dynamic array, linked list | `Array` |
| Distinct membership | Set | Hash table, search tree, bit set | `Set` |
| Keys associated with values | Map or dictionary | Hash table, search tree | `Map` |
| Last-in, first-out access | Stack | Array, linked list | `Array` with stack operations |
| First-in, first-out access | Queue | Circular buffer, linked list | Application-specific queue |

This is a many-to-many relationship. One representation can implement several
ADTs, and one ADT can have several representations. An array can support a
list, stack, or queue interface. A hash table can implement a set or a map.

## Sequences, Lists, and Arrays

A **sequence** organizes values by order. A list is commonly understood as a
finite sequence whose operations work with elements or positions. Repeated
values are normally meaningful:

```text
position:  0   1   2
value:     A   B   A
```

An **array** organizes elements using integer indexes. In conventional data-
structure terminology, an array commonly has a fixed size and supports direct
indexed access. A **dynamic array** adds resizing behavior. A **linked list**
represents a list with linked nodes instead of contiguous indexed storage.

These terms are not interchangeable:

```text
Sequence or list behavior
├── may be realized by an array or dynamic array
└── may be realized by linked nodes
```

JavaScript's built-in sequence is specifically called `Array`:

```js
const services = ['Consultation', 'X-Ray', 'Blood Test']

console.log(services[0]) // Consultation
```

It is resizable and can be sparse, so it should not be used as evidence that
every array in computer science has JavaScript's behavior.

### Where Tuples Fit

A tuple is an ordered, fixed-arity product of values. Some languages make it
sequence-like, and TypeScript represents parameter lists with tuple types, but
a tuple is not automatically another general-purpose list implementation.
Its fixed positions may have distinct meanings and distinct types.

## Sets

A set models membership without repeated equal values:

```text
Input sequence: [A, A, B]
Set contents:   {A, B}
Question:       Is A a member?
```

The abstract mathematical set does not define element order. A concrete API
may define an iteration order; JavaScript `Set`, for example, iterates in
insertion order. Equality rules are also API-specific. JavaScript `Set` uses
SameValueZero and distinguishes objects by identity.

```js
const ids = new Set(['A', 'A', 'B'])

console.log(ids.size) // 2
console.log(ids.has('A')) // true
```

A **bag** or **multiset** is a different abstraction: it keeps multiplicity,
so two occurrences of `A` remain significant even though position may not.

## Maps, Dictionaries, and Associative Collections

A map or dictionary associates each key with at most one current value:

```text
A → Service A
B → Service B
```

The common question is:

> Given this key, which value is associated with it?

“Map,” “dictionary,” and “associative array” often name the same broad ADT.
`HashMap`, however, usually names an implementation based on hashing rather
than every possible map. Search trees can also implement maps.

```js
const serviceById = new Map([
  ['A', { id: 'A', name: 'Consultation' }],
  ['B', { id: 'B', name: 'X-Ray' }],
])

console.log(serviceById.get('A')?.name) // Consultation
```

Map values may repeat; the uniqueness rule applies to keys. Calling `set`
again with an equal key replaces the value associated with that key.

## Stacks, Queues, Trees, and Graphs

Stacks and queues are abstract data types defined mainly by access rules:

```text
Stack → last in, first out
Queue → first in, first out
Deque → insertion and removal at both ends
```

They can be implemented with arrays, linked structures, or specialized
buffers. They are not merely a residual “other collections” category.

Trees and graphs model relational or topological structure. They may contain
many values and may be traversed as collections, but their defining feature is
the relationship between nodes and edges. Trees can also serve as concrete
representations for sets, maps, and priority queues. These overlaps are better
described as relationships than as one strict parent-child hierarchy.

## What About JavaScript `Object`?

An ordinary object belongs first to JavaScript's object and property model. It
often represents one structured value:

```js
const service = {
  id: 'A',
  name: 'Consultation',
  priceEgp: 300,
}
```

Here the properties describe one service; the object is not a list of
services.

An object can also be used deliberately as a string-or-symbol-keyed lookup:

```js
const serviceById = {
  A: { id: 'A', name: 'Consultation' },
  B: { id: 'B', name: 'X-Ray' },
}
```

That use overlaps with the map abstraction, but `Object` and `Map` have
different key rules, prototypes, APIs, iteration behavior, and serialization
conventions. See [JavaScript `Set`, `Map`, and `Object`](../programming-languages/javascript/set-map-and-object.md)
for the language-specific comparison.

## Example: One Workflow, Several Structures

Suppose an appointment request contains:

```js
const requestedServiceIds = ['A', 'A', 'B']
```

The request begins as an array because input order and repeated selections may
matter. A database query may only need the distinct IDs:

```js
const uniqueServiceIds = [...new Set(requestedServiceIds)]
const services = await database.findServicesByIds(uniqueServiceIds)
```

The database returns an array of service records. The program can then build a
map for repeated ID-based lookup:

```js
const serviceById = new Map(
  services.map((service) => [service.id, service]),
)

const requestedServices = requestedServiceIds.map((id) => {
  const service = serviceById.get(id)

  if (!service) {
    throw new Error(`Unknown service: ${id}`)
  }

  return service
})
```

The transformation is:

```text
Array of requested IDs
[A, A, B]
    │ distinct IDs needed for a query
    ▼
Set
{A, B}
    │ database lookup
    ▼
Array of service records
[Service A, Service B]
    │ repeated key-based lookup needed
    ▼
Map from ID to service
A → Service A
B → Service B
    │ original order and multiplicity restored
    ▼
Array of requested services
[Service A, Service A, Service B]
```

No structure is generally “best.” Each one communicates and supports a
different requirement.

## Choosing by Intent

```text
What must the program preserve or ask?
│
├── Position and order?        → sequence/list
├── Distinct membership?      → set
├── Key-to-value association? → map/dictionary
├── Last-added item first?    → stack
└── First-added item first?   → queue
```

Then ask a second set of questions:

- Must duplicates or insertion order be preserved?
- Which operations dominate: indexed access, search, membership, insertion,
  deletion, or traversal?
- What equality rules are required?
- Is mutation allowed, and can the collection grow?
- What time and memory guarantees does the concrete implementation provide?
- Must the value cross a serialization or process boundary?

## Data-Structure Choice and Algorithms

The abstraction determines the meaningful operations; the representation and
implementation determine their costs.

```js
// Search a sequence by a record field.
const service = services.find((item) => item.id === serviceId)

// Look up a value in data already organized by that key.
const indexedService = serviceById.get(serviceId)
```

`Array.prototype.find` examines elements in sequence until it finds a match or
reaches the end. A `Map` is organized around key lookup. Exact complexity is
not guaranteed merely by the words “array” or “map”; consult the concrete
implementation's contract. ECMAScript, for example, requires average access
for `Map` to be sublinear in its number of elements without requiring one
particular internal representation.

## Collection Is Not the Same as Iterable

An **iterable** is a value that follows a language's iteration protocol. It
describes how values can be produced, not necessarily how they are stored.

JavaScript arrays, sets, and maps are iterable, but so are strings and
generators. A generator can produce values lazily without storing a collection
of them. Conversely, a collection API in another environment might not expose
JavaScript-style iteration.

## Common Taxonomy Mistakes

### Calling Every Multi-Value Structure a List

A list is ordered. Sets center membership and uniqueness; maps center keyed
association; stacks and queues center access discipline.

### Treating ADTs and Implementations as Siblings

`Map` and `hash table` are not necessarily peer categories. A map is behavior;
a hash table is one way to implement it. A tree is another possible
implementation.

### Assuming Language Names Are Universal

JavaScript `Array`, Python `list`, and Java `ArrayList` have related uses but
different contracts. Learn the conceptual relationship, then learn the API's
specific behavior.

### Treating Tuples as Ordinary Lists

Both are ordered, but tuple positions often form one fixed-shape product with
position-specific meanings and types.

### Treating `Object` and `Map` as Identical

Both can express a lookup, but an object is also JavaScript's general record
and object model. Choose according to the data's meaning and the API guarantees
you need.

## Final Mental Model

```text
Collection → broad, context-dependent umbrella vocabulary

ADT        → required values and operations
Structure  → concrete organization used to realize operations
API        → a language or library's named interface and guarantees

List       → one ordered collection abstraction
Set        → unique membership
Map        → key-to-value association
Object     → language object/record; may also be used as a lookup
```

Choose the abstraction by the relationship the data must represent, then
choose a concrete implementation by the operations, costs, and platform
guarantees the program needs.

## Related Concepts

- [Algorithms and Data Structures](./)
- [Programming Languages](../programming-languages/)
- [Type Systems](../programming-languages/type-systems.md)
- [JavaScript `Set`, `Map`, and `Object`](../programming-languages/javascript/set-map-and-object.md)
- [TypeScript Type-System Foundations](../programming-languages/typescript/type-system.md)
- [Serialization](../../frontend-development/data-across-boundaries/serialization.md)
- [Unbounded](../software-engineering/terminology/unbounded.md)

## Sources

- [NIST: Abstract data type](https://xlinux.nist.gov/dads/HTML/abstractDataType.html)
- [NIST: Data structure](https://xlinux.nist.gov/dads/HTML/dataStructure.html)
- [NIST: Array](https://xlinux.nist.gov/dads/HTML/array.html)
- [NIST: Dictionary](https://xlinux.nist.gov/dads/HTML/dictionary.html)
- [NIST: Set](https://xlinux.nist.gov/dads/HTML/set.html)
- [ECMAScript: Indexed Collections](https://tc39.es/ecma262/multipage/indexed-collections.html)
- [ECMAScript: Keyed Collections](https://tc39.es/ecma262/multipage/keyed-collections.html)
- [Oracle: Java Collections Framework Interfaces](https://docs.oracle.com/javase/tutorial/collections/interfaces/index.html)
