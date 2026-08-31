# JavaScript Prototypal vs. Classical Inheritance

**Keywords:** javascript inheritance, prototypal inheritance, classical inheritance, class syntax, extends, super, syntactic sugar, constructor functions, object delegation, comparative analysis, Java vs JavaScript, class-based vs prototype-based

## Purpose

JavaScript implements **Prototypal Inheritance**, a model where objects inherit directly from other objects through delegation links.

While modern JavaScript provides the `class` and `extends` keywords, these do not introduce a class-based runtime engine; they act as **syntactic sugar** over constructor functions and prototype chaining.

---

## Prototypal vs. Classical OOP: Core Comparison

```text
Classical Inheritance (Java, C#, C++)          Prototypal Inheritance (JavaScript)
┌───────────────────────────────────────┐      ┌───────────────────────────────────────┐
│ 1. Define Class Blueprint at compile  │      │ 1. Create Prototype Object in RAM     │
│    time (Fields, Methods, Types)      │      │    { calculateTax: function() {...} } │
└──────────────────┬────────────────────┘      └───────────────────┬───────────────────┘
                   │ instantiation stamps                          │ [[Prototype]] wire
                   ▼ out fresh copies                              ▼ live delegation
┌───────────────────────────────────────┐      ┌───────────────────────────────────────┐
│ 2. Instance Object (Fixed Structure)  │      │ 2. Instance Object ({ total: 100 })   │
│    - Contains dedicated method tables │      │    - Empty/minimal instance object    │
└───────────────────────────────────────┘      └───────────────────────────────────────┘
```

| Feature | Classical OOP (Java / C#) | JavaScript Prototypal OOP |
| :--- | :--- | :--- |
| **Inheritance Entity** | Classes inherit from Classes. | Objects inherit directly from Objects. |
| **Blueprint vs Instance** | Class is a blueprint; Instance is a separate entity stamped from it. | Prototypes are ordinary objects; Instances are ordinary objects. |
| **Lookup Mechanism** | Methods resolved via compiled virtual method tables (vtable). | Properties dynamically traverse the `[[Prototype]]` link at runtime. |
| **Runtime Mutability** | Class definitions cannot be altered during execution. | Prototypes can be modified, patched, or swapped while the program is running. |
| **Inheritance Depth** | Explicit single or multiple class inheritance. | Single prototype link per object (`[[Prototype]]` points to one object or `null`). |

---

## Classes in JavaScript: Syntactic Sugar Over Prototypes

Introduced in ECMAScript 2015 (ES6), `class` provides cleaner syntax for establishing constructor functions and linking prototypes:

```javascript
// Modern ES6 Class Syntax
class AdminUser extends User {
  constructor(name, role) {
    super(name)
    this.role = role
  }

  grantAccess() {
    return `${this.name} granted ${this.role} access.`
  }
}
```

### What the JavaScript Engine Does Under the Hood

The code above is equivalent to the following prototypical wiring:

```javascript
function AdminUser(name, role) {
  // 1. Call parent constructor with current instance
  User.call(this, name)
  this.role = role
}

// 2. Link AdminUser.prototype to User.prototype
Object.setPrototypeOf(AdminUser.prototype, User.prototype)

// 3. Attach method to prototype object
AdminUser.prototype.grantAccess = function() {
  return `${this.name} granted ${this.role} access.`
}

// 4. Link static constructor methods
Object.setPrototypeOf(AdminUser, User)
```

```text
adminInstance (Object)
  │ [[Prototype]]
  ▼
AdminUser.prototype ({ grantAccess: fn })
  │ [[Prototype]]
  ▼
User.prototype ({ getProfile: fn })
  │ [[Prototype]]
  ▼
Object.prototype ({ toString: fn, hasOwnProperty: fn })
  │ [[Prototype]]
  ▼
 null
```

---

## Key Implications of Prototypal Inheritance

1. **Live Updates:** Modifying a prototype object immediately updates all existing instances in memory, because instances hold references rather than independent copies.
2. **Single Inheritance Chain:** An object can only have **one** `[[Prototype]]`. Multiple inheritance is achieved through composition or mixins (`Object.assign(target, ...sources)`).
3. **Dynamic Dispatch with `this`:** When a prototype method runs, `this` always points to the instance that initiated the call, preserving state isolation between instances while sharing method definitions.

---

## Related Concepts

- [JavaScript Prototypes](prototypes.md)
- [JavaScript Objects](objects.md)
- [JavaScript Functions & this Binding](functions.md)
- [Object-Oriented Programming Foundations](../../software-engineering/programming-paradigms/object-oriented-programming.md)
- [SOLID Design Principles](../../software-engineering/software-design-principles/solid-principles.md)
