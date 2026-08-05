# Gang of Four Design Patterns

## Purpose

This document introduces the Gang of Four design-pattern catalog and places it within the software taxonomy used by this knowledge base.

The catalog contains influential object-oriented design patterns. It does not contain every pattern used in modern software development.

---

## Taxonomy Classification

- **Primary category:** Design Pattern
- **Field:** Software Engineering
- **Area:** Object-Oriented Design
- **Abstraction level:** Object and component collaboration

---

## What Does GoF Mean?

**Gang of Four**, commonly abbreviated **GoF**, refers to the four authors associated with the classic catalog of 23 object-oriented design patterns.

The catalog groups its patterns by purpose:

- **Creational patterns:** Control how objects are created.
- **Structural patterns:** Organize relationships among objects and classes.
- **Behavioral patterns:** Organize responsibilities and collaboration among objects.

---

## GoF Hierarchy

```text
Gang of Four Design Patterns
│
├── Creational
│   ├── Abstract Factory
│   ├── Builder
│   ├── Factory Method
│   ├── Prototype
│   └── Singleton
│
├── Structural
│   ├── Adapter
│   ├── Bridge
│   ├── Composite
│   ├── Decorator
│   ├── Facade
│   ├── Flyweight
│   └── Proxy
│
└── Behavioral
    ├── Chain of Responsibility
    ├── Command
    ├── Interpreter
    ├── Iterator
    ├── Mediator
    ├── Memento
    ├── Observer
    ├── State
    ├── Strategy
    ├── Template Method
    └── Visitor
```

---

## Creational Patterns

Creational patterns address object-creation decisions.

| Pattern | Core idea |
| --- | --- |
| Abstract Factory | Create families of related objects without naming their concrete classes. |
| Builder | Construct a complex object step by step. |
| Factory Method | Delegate the choice of concrete object to a creation method or subclass. |
| Prototype | Create new objects by copying an existing object. |
| Singleton | Restrict a class to one instance and provide shared access to it. |

---

## Structural Patterns

Structural patterns address how objects and classes are composed.

| Pattern | Core idea |
| --- | --- |
| Adapter | Convert one interface into another expected interface. |
| Bridge | Separate an abstraction from its implementation so both can vary. |
| Composite | Treat individual objects and groups through a common interface. |
| Decorator | Add behavior by wrapping an object. |
| Facade | Provide a simpler interface to a complex subsystem. |
| Flyweight | Share reusable state among many fine-grained objects. |
| Proxy | Control access to another object. |

---

## Behavioral Patterns

Behavioral patterns address responsibility and collaboration among objects.

| Pattern | Core idea |
| --- | --- |
| Chain of Responsibility | Pass a request through potential handlers. |
| Command | Represent a request as an object. |
| Interpreter | Represent and evaluate a small language or grammar. |
| Iterator | Traverse a collection without exposing its internal representation. |
| Mediator | Coordinate interactions through a central object. |
| Memento | Capture and restore an object's previous state. |
| Observer | Notify interested observers when a subject changes. |
| State | Change behavior according to an object's internal state. |
| Strategy | Make an algorithm interchangeable. |
| Template Method | Define an algorithm's structure while allowing selected steps to vary. |
| Visitor | Add operations to an object structure without changing its classes. |

---

## GoF Patterns That Organize Communication

Some GoF patterns solve object-design problems by organizing communication or request flow.

| GoF pattern | Communication responsibility |
| --- | --- |
| Observer | Notifies registered observers. |
| Mediator | Centralizes communication among objects. |
| Command | Represents a request as an object. |
| Chain of Responsibility | Passes a request through potential handlers. |

This does not mean that every communication pattern is a GoF design pattern.

```text
Observer
→ GoF behavioral design pattern

Publish / Subscribe
→ messaging/communication pattern

Event-Driven Architecture
→ architectural style
```

---

## Relationship to Communication Patterns

Design patterns and communication patterns describe different aspects of software.

```text
Design Pattern
→ How should objects or components collaborate
  to solve a recurring design problem?

Communication Pattern
→ How should participants exchange information?
```

Some design patterns organize communication directly. A larger system may also combine a design pattern with a separate communication pattern.

```text
Application design
│
├── Strategy
│   └── selects a notification policy
│
└── Publish / Subscribe
    └── delivers notifications
```

A Publish / Subscribe implementation may also use GoF patterns internally:

```text
Publish / Subscribe implementation
│
├── Observer
│   └── manages local notification
├── Strategy
│   └── selects routing behavior
└── Factory
    └── creates message handlers
```

The relationship is compositional rather than hierarchical.

---

## GoF Does Not Mean All Design Patterns

Many useful patterns are not part of the GoF catalog.

Examples include:

- Repository.
- Unit of Work.
- Dependency Injection.
- Service Layer.
- Specification.
- Data Mapper.

These are commonly discussed as enterprise, architectural, dependency-management, or application design patterns. Their exact classification may vary by source.

---

## Patterns Do Not Guarantee Scalability

Design patterns primarily help organize code, responsibilities, and collaboration.

```text
Design patterns
        ↓
improve structure and adaptability

Architecture
        ↓
defines system and deployment boundaries

Infrastructure and implementation
        ↓
provide actual runtime capacity
```

A pattern can support a scalable design, but scalability still depends on workload, data design, algorithms, deployment, infrastructure, measurement, and implementation quality.

Patterns also introduce trade-offs. Singleton can create shared-state contention, Observer can produce difficult-to-follow update chains, and unnecessary patterns can make simple code harder to maintain.

---

## Key Takeaways

- GoF is a catalog of 23 object-oriented design patterns.
- GoF patterns are grouped into creational, structural, and behavioral categories.
- Observer is a GoF behavioral design pattern.
- Some GoF patterns organize communication between objects.
- Publish / Subscribe is a messaging/communication pattern rather than a GoF pattern.
- The GoF catalog does not contain every software design pattern.
- Applying patterns does not automatically make a system scalable.

---

## Related Concepts

- [Software Taxonomy](../software-taxonomy.md)
- [Observer Pattern](observer-pattern.md)
- [Communication Patterns](../communication-patterns/README.md)
- [Publish / Subscribe](../communication-patterns/publish-subscribe.md)
- [Event-Driven Architecture](../architectural-styles/event-driven-architecture.md)
