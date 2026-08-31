# JavaScript Prototypes & The Prototype Chain

**Keywords:** javascript prototypes, prototype chain, [[Prototype]], prototype property, __proto__, Object.getPrototypeOf, Object.setPrototypeOf, prototype delegation, prototype lookup, monkey patching, runtime prototype modification, memory efficiency

## Purpose

The **prototype** is JavaScript's core mechanism for code sharing and inheritance. Rather than copying methods into every individual object, JavaScript objects maintain a live fallback reference (a prototype link) to a shared blueprint object.

---

## The Mental Model: Shared Delegation vs. Memory Duplication

Imagine a web application rendering 1,000 `<dialog>` or `<button>` DOM nodes:

```text
WITHOUT PROTOTYPES (Copying):
[Node 1] ──► { showModal: fn_copy_1, close: fn_copy_1 }
[Node 2] ──► { showModal: fn_copy_2, close: fn_copy_2 }  (1,000 duplicate function allocations in RAM)
...
[Node 1000]─► { showModal: fn_copy_1000, close: fn_copy_1000 }

WITH PROTOTYPES (Delegation):
[Node 1] ───┐
[Node 2] ───┼──► [[Prototype]] ──► [ HTMLDialogElement.prototype ] (1 single shared object in RAM)
...         │                       { showModal: fn, close: fn }
[Node 1000]─┘
```

When a method like `dialog.showModal()` is called, the JavaScript engine first checks if `dialog` has its own property named `showModal`. When it does not, the engine follows the prototype link up to `HTMLDialogElement.prototype` and executes the shared method with `this` bound to `dialog`.

---

## Crucial Distinction: Three "Prototype" Concepts

Much confusion in JavaScript stems from three related concepts with similar names:

```text
1. Constructor / Class           2. The Shared Prototype Object      3. The Instance Object
┌───────────────────────────┐    ┌──────────────────────────────┐    ┌───────────────────────────┐
│ HTMLDialogElement (Fn)    │    │ HTMLDialogElement.prototype  │    │ <dialog id="nav"> (Node)  │
│                           │    │                              │    │                           │
│ .prototype property ──────┼───►│ - showModal: fn              │◄───┼── [[Prototype]] slot      │
│ (Standard JS property on  │    │ - close: fn                  │    │ (Hidden engine pointer;   │
│ constructor functions)    │    │                              │    │ read via getPrototypeOf)  │
└───────────────────────────┘    └──────────────┬───────────────┘    └───────────────────────────┘
                                                │ [[Prototype]]
                                                ▼
                                 [ HTMLElement.prototype ]
```

| Entity | Notation / Access | What it is | Where it lives |
| :--- | :--- | :--- | :--- |
| **`.prototype`** | `Constructor.prototype` | A regular JavaScript property pointing to the shared prototype object. | Only exists on **functions and classes**. |
| **`[[Prototype]]`** | `Object.getPrototypeOf(obj)` | An internal engine slot (C++ memory pointer) connecting an instance to its prototype object. | Exists on **every JavaScript object**. |
| **`__proto__`** | `obj.__proto__` | A legacy accessor property (getter/setter) on `Object.prototype` exposing the internal `[[Prototype]]`. | Inherited from `Object.prototype`. |

> [!NOTE]
> The double brackets `[[Prototype]]` denote an **internal ECMAScript engine slot**, not a string key. You cannot access `obj["[[Prototype]]"]`. The modern, standard approach to inspect or modify prototype links is `Object.getPrototypeOf(obj)` and `Object.setPrototypeOf(obj, proto)`.

---

## The Prototype Lookup Algorithm & DOM Hierarchy

When evaluating `object.property`:

1. **Own Properties:** Does `object` contain an own property named `property`? If yes, return it.
2. **Prototype Traversal:** Follow `object`'s `[[Prototype]]` link. Does the parent object contain `property`? If yes, execute/return it.
3. **Chain Ascent:** Traversal ascends through successive prototypes until found or reaching `null`.

```text
<dialog id="mobile-nav">     (DOM instance object)
   │
   ▼ [[Prototype]]
HTMLDialogElement.prototype  (.showModal(), .close(), .open)
   │
   ▼ [[Prototype]]
HTMLElement.prototype        (.style, .hidden, .focus(), .blur())
   │
   ▼ [[Prototype]]
Element.prototype            (.querySelector(), .setAttribute(), .classList)
   │
   ▼ [[Prototype]]
Node.prototype               (.appendChild(), .parentNode)
   │
   ▼ [[Prototype]]
EventTarget.prototype        (.addEventListener(), .dispatchEvent())
   │
   ▼ [[Prototype]]
Object.prototype             (.toString(), .hasOwnProperty())
   │
   ▼ [[Prototype]]
  null
```

4. **End of Chain:** If `null` is reached without finding the property, return `undefined` (or throw `TypeError` if invoked as a function).

---

## Runtime Prototype Modification (Monkey Patching)

Because prototypes are live, mutable JavaScript objects in memory, modifying a prototype at runtime immediately affects **all existing and future instances** linked to it:

```javascript
// Patching missing environment behavior in a test boundary
const originalShowModal = HTMLDialogElement.prototype.showModal

HTMLDialogElement.prototype.showModal = function() {
  this.setAttribute('open', '')
}

// Any <dialog> on the page immediately gains the patched behavior
const dialog = document.createElement('dialog')
dialog.showModal()
console.log(dialog.hasAttribute('open')) // true

// Clean up after the test to prevent test pollution
HTMLDialogElement.prototype.showModal = originalShowModal
```

---

## Related Concepts

- [JavaScript Inheritance](inheritance.md)
- [JavaScript Objects](objects.md)
- [JavaScript Functions](functions.md)
- [Patching Terminology](../../software-engineering/terminology/patching.md)
- [Object-Oriented Programming](../../software-engineering/programming-paradigms/object-oriented-programming.md)
