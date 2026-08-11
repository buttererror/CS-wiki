# Inversion of Control

## Purpose

This document explains Inversion of Control, its relationship to Dependency Injection, and how frameworks, libraries, callbacks, and containers can change who controls part of a program's execution or lifecycle.

---

## Taxonomy Classification

- **Primary category:** Software Design Principle
- **Concept:** Inversion of Control (IoC)
- **Scope:** Construction, execution flow, and lifecycle control
- **Common applications:** Dependency Injection, callbacks, event handlers, framework lifecycles, and template methods

---

## Definition

Inversion of Control is a software design principle in which application code delegates some control over construction, execution, or lifecycle to another component, mechanism, or framework.

In ordinary direct control, application code decides when to call another operation:

```text
Application code
        ↓ calls

Reusable operation
        ↓ returns

Application code continues
```

With inverted control, application code declares, registers, or supplies behavior that another system invokes at the appropriate time:

```text
Application code
        ↓ declares or registers behavior

External mechanism controls part of the flow
        ↓ calls application behavior

Application code reacts
```

The important idea is not that the application gives up all control. A particular responsibility or part of the flow changes ownership.

---

## Traditional and Inverted Construction

Without IoC, a class may construct its own dependency:

```ts
class UserController {
  private readonly userService = new UserService()
}
```

```text
UserController
        ↓ selects and creates
UserService
```

The controller controls which implementation is used, when it is created, and how it is constructed.

With IoC, the class can declare what it needs while an external participant controls construction:

```ts
class UserController {
  constructor(
    private readonly userService: UserService,
  ) {}
}
```

```text
External composition code or container
        ↓ creates or locates UserService
        ↓ creates UserController
        ↓ supplies UserService
```

The controller still controls how it uses `UserService`. Only responsibility for obtaining the dependency has moved outside the controller.

---

## Mental Model

The traditional question is:

> What should my code call next?

The IoC question is:

> What behavior should my code provide so that another mechanism can call it when needed?

This idea is sometimes summarized by the **Hollywood Principle**:

> Do not call us; we will call you.

---

## Forms of Inversion of Control

IoC is broader than Dependency Injection. It can appear in several forms.

### Dependency Injection

An object declares its dependencies, and an external mechanism supplies them.

```text
Class declares what it needs
        ↓
IoC container constructs and supplies dependencies
        ↓
Class uses the prepared dependencies
```

### Framework Lifecycle

Application code supplies components, controllers, or hooks. The framework decides when to construct, render, invoke, or destroy them.

```text
Application registers a component
        ↓
Framework controls the lifecycle
        ↓
Framework invokes application code
```

### Callbacks and Event Handlers

Application code registers a function, and another mechanism invokes it when an event occurs.

```ts
button.addEventListener('click', () => {
  saveChanges()
})
```

The application defines the reaction, while the browser controls when the callback runs.

### Template Method

A reusable algorithm defines the overall sequence while allowing application-specific steps to be supplied or overridden.

```text
Framework or base algorithm controls the sequence
        ↓
Application provides selected steps
```

---

## Relationship to Programming Paradigms

IoC is not limited to Object-Oriented Programming. It describes a control relationship that can appear in several paradigms.

```text
Inversion of Control
        ↓ can appear in

├── Object-Oriented Programming
├── Functional Programming
├── Procedural Programming
└── Reactive Programming
```

Examples include:

| Paradigm or style | IoC example |
| --- | --- |
| Object-Oriented | A container constructs objects and supplies their dependencies |
| Functional | A higher-order function or runtime invokes a supplied function |
| Procedural | An event loop invokes registered handlers |
| Reactive | A runtime invokes subscribed computations when values change |

The surrounding programming model changes, but the defining question remains: who controls this part of construction, invocation, or lifecycle?

---

## Relationship to Dependency Injection

Dependency Injection is one technique for applying IoC to object construction and dependency wiring.

```text
Inversion of Control
→ broad design principle

Dependency Injection
→ technique that applies IoC to dependencies

NestJS IoC container
→ framework component implementing DI

Provider resolution, construction, and injection
→ operational mechanism

@Injectable() and constructor injection
→ concrete NestJS API usage
```

Manual Dependency Injection can also apply IoC without a container:

```ts
const repository = new UserRepository()
const service = new UserService(repository)
```

`UserService` receives its dependency from outside rather than constructing it internally. A framework container automates this wiring, but the container is not the definition of Dependency Injection.

### NestJS Example

```ts
@Injectable()
class UserService {}

@Controller()
class UserController {
  constructor(
    private readonly userService: UserService,
  ) {}
}
```

Conceptually:

```text
NestJS discovers registered application components
        ↓
Container resolves or creates UserService
        ↓
Container creates UserController
        ↓
UserService is injected
```

NestJS controls construction and dependency wiring. The application classes control their business behavior. Metadata and decorators help NestJS understand the components, but they are not themselves IoC.

---

## Framework Versus Library Control

A common comparison is:

```text
Library
→ application code calls the library

Framework
→ framework calls application code
```

This comparison explains why IoC is strongly associated with frameworks. A framework commonly owns significant parts of setup, execution, and lifecycle, while application code fills predefined extension points.

```text
Application code
        ↓ registers components and requirements

Framework
        ↓ controls setup and lifecycle

Application code
        ↓ is invoked at framework-defined points
```

A library usually provides functions or objects that application code calls when needed:

```text
Application code
        ↓ calls

Library API
        ↓ returns a result

Application code retains the surrounding flow
```

However, this is a useful distinction rather than an absolute boundary:

- A library can use callbacks, subscriptions, schedulers, or managed lifecycles that invert control locally.
- A framework also exposes APIs that application code calls directly.
- Some tools have characteristics of both frameworks and libraries.

The stronger question is therefore:

> How much of the application's structure and lifecycle does the tool control?

Examples:

| Tool or mechanism | Control relationship |
| --- | --- |
| NestJS | Constructs providers, invokes controllers, and manages application lifecycle |
| Browser event system | Invokes registered handlers when events occur |
| React | Calls components and Hooks as part of its rendering lifecycle, although it is commonly described as a library |
| Lodash | Application code usually calls a function and immediately receives a result |

---

## Relationship to the Dependency Inversion Principle

Inversion of Control and the Dependency Inversion Principle have similar names but describe different ideas.

| Inversion of Control | Dependency Inversion Principle |
| --- | --- |
| Concerns who controls construction, execution, or lifecycle | Concerns the direction of source-code dependencies |
| Delegates control to an external mechanism | Encourages high-level and low-level modules to depend on abstractions |
| Can be implemented through DI, callbacks, or frameworks | Is the `D` in SOLID |

Dependency Injection can support both ideas, but neither principle automatically guarantees the other.

---

## Relationship to the Observer Pattern

Observer and IoC can both involve one participant invoking application behavior, but they answer different questions.

| Inversion of Control | Observer Pattern |
| --- | --- |
| Who controls construction, invocation, or lifecycle? | How are interested participants notified about a change? |
| Broad software design principle | Behavioral design pattern |
| May use containers, callbacks, frameworks, or event loops | Uses a subject-observer notification relationship |

```text
Observer
→ subject changes
→ observers are notified

Inversion of Control
→ external participant owns part of the control flow
→ application behavior is constructed or invoked
```

An Observer implementation may exhibit IoC because the subject invokes registered observers. That does not make Observer and IoC the same concept.

---

## Benefits and Trade-Offs

Potential benefits include:

- Separating reusable control flow from application-specific behavior.
- Separating object construction from object usage.
- Providing consistent lifecycle management.
- Making behavior extensible through defined integration points.
- Supporting replacement of dependencies and test doubles.

Potential trade-offs include:

- Execution paths can become less visible because application code is called indirectly.
- Framework conventions can constrain application structure.
- Container configuration and metadata can hide object construction.
- Lifecycle mistakes can cause resource, scope, or cleanup problems.
- Debugging may require understanding framework-controlled call paths.

---

## Key Takeaways

- Inversion of Control is a software design principle.
- It delegates a specific part of construction, execution, or lifecycle control.
- Dependency Injection is one technique for applying IoC.
- Framework-controlled lifecycles commonly demonstrate IoC.
- Libraries can also invert control locally through callbacks or subscriptions.
- IoC is different from the Dependency Inversion Principle.
- IoC is not limited to Object-Oriented Programming.

---

## Related Concepts

- [Software Design Principles](./)
- [Software Taxonomy](../software-taxonomy.md)
- [NestJS Dependency Injection](../../../framework-tooling/nestjs-dependency-injection.md)
- [Frameworks, Libraries, and Tooling](../../../framework-tooling/)
- [Observer Pattern](../design-patterns/observer-pattern.md)
- [Mechanism](../terminology/mechanism.md)
