# Programming Paradigm

## Purpose

This document introduces programming paradigms as a major abstraction level in software development.

It acts as the parent concept for the paradigms discussed in this knowledge base: Object-Oriented Programming, Functional Programming, and Reactive Programming.

---

## Taxonomy Classification

- **Primary category:** Programming Paradigm
- **Abstraction level:** Conceptual
- **Broader field:** Programming Languages

A programming paradigm is a broad way of thinking about and expressing software.

---

## Definition

A programming paradigm is a general style or model for writing programs.

It answers:

> How should a program be expressed and organized?

A paradigm is broader than a design pattern.

```text
Programming Paradigm
→ shapes how a program is expressed

Design Pattern
→ solves a recurring design problem inside a program
```

A programming paradigm may use multiple design patterns and communication mechanisms.

---

## Paradigms Discussed

- **Object-Oriented Programming:** Organizes behavior around collaborating objects.
- **Functional Programming:** Organizes behavior around functions and data transformations.
- **Reactive Programming:** Organizes behavior around changing values and events over time.

These are paradigms, not subcategories that every program must implement.

---

## Mental Model

```text
Programming problem
        ↓
Chosen way of thinking
        ↓
Program structure and behavior
```

Different paradigms can model the same problem differently.

```text
Object-Oriented Programming
→ think in objects and method calls

Functional Programming
→ think in functions and transformations

Reactive Programming
→ think in values and events changing over time
```

The paradigms are not mutually exclusive. One application or library can combine ideas from several paradigms.

---

## Example: Search While Typing

The same search behavior can be expressed differently depending on the paradigm.

### Object-Oriented Programming

Object-Oriented Programming models the solution through objects that own state and expose behavior.

```ts
class SearchBox {
  private query = ''

  setQuery(value: string) {
    this.query = value
    this.search()
  }

  private search() {
    api.search(this.query)
  }
}
```

Mental model:

```text
SearchBox object
        ↓
Owns the query state
        ↓
Receives a method call
        ↓
Performs the search
```

The main focus is:

```text
Objects
→ state
→ behavior
→ method calls
```

### Functional Programming

Functional Programming models the solution as transformations applied to values.

```ts
const normalize = (text: string) =>
  text.trim().toLowerCase()

const query = normalize(input)
```

Mental model:

```text
Input
    ↓
Function
    ↓
Transformed value
    ↓
Result
```

A search flow can be viewed as:

```text
Input
    ↓
Normalize
    ↓
Validate
    ↓
Search
```

The main focus is:

```text
Values
→ functions
→ transformations
```

### Reactive Programming

Reactive Programming models the solution around values or events that change over time.

```text
Keyboard events
        ↓
Optional: debounce rapid input
        ↓
Optional: ignore duplicate values
        ↓
Optional: cancel the previous request
        ↓
Fetch search results
        ↓
Update the UI
```

The main focus is:

```text
Changing values
→ propagation
→ dependent operations react
```

Instead of repeatedly asking whether the input changed, the program responds when a new input value arrives. Debouncing, filtering, and cancellation are useful operations for this example, not requirements of the paradigm.

---

## Comparison

| Paradigm | Primary Model | Main Interaction |
| --- | --- | --- |
| Object-Oriented Programming | Objects with state and behavior | Method calls |
| Functional Programming | Values transformed by functions | Function composition |
| Reactive Programming | Values or events changing over time | Change propagation |

```text
Object-Oriented Programming
→ An object receives a value and performs behavior.

Functional Programming
→ A value passes through transformations.

Reactive Programming
→ New values arrive over time and trigger dependent behavior.
```

---

## Relationship to Design Patterns

A programming paradigm and a design pattern exist at different abstraction levels.

```text
Programming Paradigm
→ broad model for expressing a program

Design Pattern
→ reusable solution to a recurring design problem
```

Reactive Programming, for example, may use the Observer Pattern.

```text
Reactive Programming
        ↓ may use
Observer Pattern
```

This does not make Observer a programming paradigm. Observer remains a behavioral design pattern.

---

## Relationship to Communication Patterns

A paradigm may also use communication patterns. Reactive Programming may use a messaging pattern such as Publish / Subscribe to propagate events.

```text
Reactive Programming
        ↓ may use
Publish / Subscribe
```

Publish / Subscribe is not a programming paradigm. It describes how publishers and subscribers exchange messages through communication infrastructure such as a broker or event bus.

---

## Relationship to Architectural Styles

A programming paradigm describes how code and behavior are expressed. An architectural style describes how the major parts of a system are organized.

```text
Programming Paradigm
→ How is program behavior expressed?

Architectural Style
→ How are major system components organized?
```

For example:

```text
Reactive Programming
→ programming paradigm

Event-Driven Architecture
→ architectural style
```

Both may involve events, but they operate at different abstraction levels.

---

## Relationship to Frameworks and Libraries

Frameworks and libraries can combine several paradigms and patterns.

```text
React
→ reacts to state changes and renders the UI

TanStack Query
→ uses observer-based synchronization with React

NestJS
→ commonly uses object-oriented classes and Dependency Injection
```

A framework or library is not equivalent to one programming paradigm. It can implement several patterns and support multiple programming styles.

---

## Why It Matters

Understanding programming paradigms prevents different abstraction levels from being mixed together.

```text
Reactive Programming
→ programming paradigm

Observer Pattern
→ behavioral design pattern

Publish / Subscribe
→ messaging pattern

Event-Driven Architecture
→ architectural style

TanStack Query
→ library
```

These concepts can work together, but they are not interchangeable.

---

## Relationships to Other Areas

- **Design Pattern:** Paradigms may use design patterns to solve recurring collaboration problems.
- **Communication Pattern:** Paradigms may use communication mechanisms, including messaging patterns such as Publish / Subscribe.
- **Architectural Style:** Paradigms influence code expression, while architecture organizes system components.
- **Framework:** Frameworks implement and combine paradigms, patterns, and architectural ideas.
- **Reactive Programming:** One of the paradigms discussed, focused on values and events changing over time.

---

## Related Concepts

- [Software Taxonomy](../computer-science-foundations/software-taxonomy.md)
- [Reactive Programming](reactive-programming.md)
- [Observer Pattern](../design-patterns/observer-pattern.md)
- [Publish / Subscribe](../communication-patterns/publish-subscribe.md)
- [Event-Driven Architecture](../architectural-styles/event-driven-architecture.md)
