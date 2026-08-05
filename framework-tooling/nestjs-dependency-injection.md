# NestJS Dependency Injection

## Purpose

This document explains Dependency Injection in NestJS, including providers, registration, injection tokens, scopes, modules, metadata, and decorators.

It also distinguishes Dependency Injection from Observer and the TypeScript decorator syntax from the GoF Decorator Pattern.

---

## Taxonomy Classification

- **Primary category:** Framework / Tooling
- **Type:** Framework Mechanism
- **Framework:** NestJS
- **Underlying principle:** Inversion of Control
- **Applied technique:** Dependency Injection
- **Scope:** Object construction, wiring, and lifecycle

---

## Definition

Dependency Injection means that an object receives its dependencies from an external mechanism instead of constructing them internally.

Without Dependency Injection:

```ts
class UserController {
  private readonly userService = new UserService()
}
```

The controller creates and controls its dependency directly.

With Dependency Injection:

```ts
class UserController {
  constructor(
    private readonly userService: UserService,
  ) {}
}
```

The controller declares what it needs. NestJS resolves the corresponding provider and supplies it when constructing the controller.

---

## Dependency Injection and Inversion of Control

Inversion of Control is the broader principle: application code delegates control of object construction and lifecycle to an external system. See [Inversion of Control](../computer-science-foundations/software-engineering/software-design-principles/inversion-of-control.md) for the general principle and examples beyond Dependency Injection.

Dependency Injection is a design technique that applies that principle by supplying required dependencies from outside an object.

```text
Inversion of Control
→ broader principle

Dependency Injection
→ design technique for supplying dependencies

NestJS IoC container
→ framework implementation
```

Dependency Injection is not a GoF design pattern and is not classified here as an architectural pattern.

---

## Mental Model

```text
Class declares a dependency
        ↓
Provider is registered in a module
        ↓
NestJS builds the dependency graph
        ↓
IoC container resolves an injection token
        ↓
Provider is created or reused
        ↓
Dependency is injected
```

The class says:

> I need a `UserService`.

It does not say:

> Create a new `UserService` this way.

---

## Core Concepts

- **Dependency:** An object or value required by another object.
- **Injection:** Supplying the dependency from outside its consumer.
- **Provider:** A class, value, factory result, or alias managed by NestJS.
- **Injection token:** Runtime identifier used to find a provider.
- **IoC container:** Resolves, constructs, caches, and supplies providers.
- **Module:** Registers providers and controls their visibility.
- **Scope:** Determines a provider instance's lifetime.
- **Decorator and metadata:** Describe application elements to the framework.

---

## Dependency

A dependency is an object that another object requires to perform its work.

```text
UserController
        ↓ depends on
UserService
```

The controller uses the service without needing to control how it is constructed.

---

## Provider

A provider is something NestJS can manage and inject.

```ts
@Injectable()
class UserService {}
```

Providers are not limited to services. They may supply:

- Classes.
- Constant values.
- Existing provider aliases.
- Synchronous factory results.
- Asynchronously created values.

---

## Provider Registration

`@Injectable()` marks a class as manageable by the NestJS container, but the provider must also be registered in a module or made available through an imported module.

```ts
@Module({
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
```

```text
@Injectable()
→ marks a class as container-manageable

@Module({ providers: [...] })
→ registers the provider

constructor(...)
→ requests a provider through an injection token

NestJS IoC container
→ resolves and supplies the provider
```

---

## Constructor Injection

The dependency is requested through the constructor:

```ts
@Controller()
class UserController {
  constructor(
    private readonly userService: UserService,
  ) {}
}
```

The constructor clearly exposes the object's required dependencies.

---

## Injection Tokens

NestJS resolves dependencies using runtime tokens.

Tokens may be:

- Classes.
- Strings.
- Symbols.
- Abstract classes.

Class token:

```ts
constructor(
  private readonly userService: UserService,
) {}
```

Symbol token:

```ts
export const LOGGER = Symbol('LOGGER')

constructor(
  @Inject(LOGGER)
  private readonly logger: Logger,
) {}
```

TypeScript interfaces are erased during compilation, so an interface cannot act as a runtime injection token by itself.

```text
TypeScript interface
→ compile-time contract
→ unavailable as a runtime token

String, Symbol, class, or abstract class
→ runtime identity
→ usable as an injection token
```

---

## Custom Providers

NestJS supports several provider definitions.

### `useClass`

Selects the class that should be instantiated for a token.

```ts
{
  provide: PaymentGateway,
  useClass: StripePaymentGateway,
}
```

### `useValue`

Associates a token with an existing value.

```ts
{
  provide: CONFIG,
  useValue: applicationConfig,
}
```

### `useFactory`

Creates a value through a factory function whose own dependencies can be injected.

```ts
{
  provide: DATABASE_CONNECTION,
  useFactory: (config: ConfigService) =>
    createConnection(config.databaseUrl),
  inject: [ConfigService],
}
```

### `useExisting`

Creates another token for an already registered provider without creating a separate instance.

```text
useClass
→ choose a class implementation

useValue
→ provide an existing value

useFactory
→ compute or create a value

useExisting
→ alias an existing provider
```

---

## Provider Scope

Scope determines a provider's lifetime.

```text
Singleton
→ default scope
→ instance is reused

Request
→ one instance for a request

Transient
→ a separate instance for each consumer
```

Provider scope affects lifecycle, state sharing, and runtime cost. Request-scoped or transient providers should be selected deliberately.

---

## Modules and Provider Visibility

Modules encapsulate providers by default.

```text
Provider registered in Module A
        ↓ exported by Module A
Module B imports Module A
        ↓
Provider becomes injectable in Module B
```

Example:

```ts
@Module({
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}

@Module({
  imports: [UserModule],
  providers: [AuthService],
})
export class AuthModule {}
```

Registration, exports, and imports determine where a provider can be resolved.

---

## IoC Container

The IoC container manages the dependency graph.

```text
Create UserController
        ↓
Inspect constructor tokens
        ↓
Find UserService provider registration
        ↓
Resolve UserService dependencies transitively
        ↓
Create or reuse UserService
        ↓
Pass it to UserController
```

The container separates object construction and lifecycle from application behavior.

---

## Metadata and Decorators

Metadata is information describing code rather than its business behavior.

NestJS uses decorators such as:

```ts
@Injectable()
@Controller()
@Module({...})
```

Conceptually:

```text
Decorators and module declarations
        ↓
provide framework-readable information
        ↓
NestJS builds the application and dependency graph
        ↓
IoC container resolves and constructs objects
```

Decorators and module registration work together. A decorator does not replace registration in the appropriate module collection.

Dependency Injection itself is broader than metadata. Manual wiring can also supply dependencies without decorators or a container.

---

## TypeScript Decorator vs. Decorator Pattern

The word **decorator** refers to two different concepts.

### TypeScript Decorator

```ts
@Injectable()
class UserService {}
```

This is language syntax used by frameworks to associate metadata or behavior with a declaration.

### GoF Decorator Pattern

The Decorator Pattern wraps an object to add behavior.

```text
Coffee
    ↓ wrapped by
Milk Decorator
    ↓ wrapped by
Sugar Decorator
```

```text
TypeScript decorator
→ language-level declaration mechanism

GoF Decorator Pattern
→ structural object-composition pattern
```

Using `@Injectable()` does not mean NestJS is applying the GoF Decorator Pattern to `UserService`.

---

## Relationship to the Observer Pattern

Dependency Injection and Observer solve different problems.

| Dependency Injection | Observer Pattern |
| --- | --- |
| Supplies required objects | Delivers change notifications |
| Commonly participates in construction | Operates repeatedly during runtime |
| Expresses dependency relationships | Expresses notification relationships |
| Uses provider tokens and a container | Uses subjects and observers |
| “Give me this dependency” | “Tell me when this changes” |

Dependency Injection does not create a lasting notification relationship.

---

## Relationship to Object-Oriented Programming

The NestJS example uses classes and object relationships.

```text
Controller object
        ↓ depends on
Service object
```

Object-Oriented Programming provides the broader class-and-object model. Dependency Injection manages how those relationships are constructed.

---

## Relationship to Framework Control Flow

NestJS provides infrastructure that identifies providers, builds a dependency graph, manages lifecycles, and injects dependencies.

```text
Application code
        ↓ declares requirements
Framework
        ↓ controls construction and lifecycle
Application code
        ↓ receives prepared objects
```

This is Inversion of Control: application code participates in a lifecycle controlled by the framework.

---

## Relationship to TanStack Query

```text
NestJS Dependency Injection
→ constructs and wires backend application objects

TanStack Query
→ synchronizes asynchronous server state with frontend consumers
```

Both hide infrastructure details behind APIs, but they solve different problems.

---

## Benefits and Trade-Offs

Potential benefits include:

- Separating construction from usage.
- Making dependencies visible through constructors.
- Allowing implementations to be replaced through tokens.
- Supporting test doubles and configuration-specific providers.
- Centralizing lifecycle management.

Potential trade-offs include:

- Container configuration can hide construction paths.
- Incorrect scopes can increase memory or request overhead.
- Circular dependencies reveal difficult relationships.
- Excessive injection can produce classes with too many responsibilities.
- Runtime tokens and module boundaries require deliberate organization.

---

## Key Takeaways

- Dependency Injection supplies dependencies from outside an object.
- Inversion of Control is the broader principle.
- NestJS implements DI through an IoC container, providers, tokens, and modules.
- `@Injectable()` marks a class as manageable; module registration makes the provider available.
- Providers can be classes, values, factories, or aliases.
- Singleton is the default provider scope.
- TypeScript decorators are not the GoF Decorator Pattern.
- Dependency Injection and Observer solve different problems.

---

## Related Concepts

- [Frameworks, Libraries, and Tooling](README.md)
- [Inversion of Control](../computer-science-foundations/software-engineering/software-design-principles/inversion-of-control.md)
- [Software Taxonomy](../computer-science-foundations/software-engineering/software-taxonomy.md)
- [Programming Paradigm](../computer-science-foundations/software-engineering/programming-paradigms/programming-paradigm.md)
- [Gang of Four Design Patterns](../computer-science-foundations/software-engineering/design-patterns/gang-of-four-design-patterns.md)
- [Observer Pattern](../computer-science-foundations/software-engineering/design-patterns/observer-pattern.md)
- [TanStack Query](tanstack-query.md)
