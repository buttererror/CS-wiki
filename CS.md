## Where “Adapter” lives in CS (AI genereated)

Adapter is a formal Design Pattern.

* Field: Software Engineering → Object-Oriented Design → Design Patterns

* Source: GoF (Gang of Four) Design Patterns

* Category: Structural Design Pattern

So it’s on the same conceptual level as:

* MVC

* Observer

* Factory

* Strategy

Not a buzzword, not informal.

### What the Adapter Pattern actually is (definition)

> Adapter Pattern:
> Converts the interface of a class (or system) into another interface that clients expect, allowing incompatible systems to work together.

Key idea:

* The client doesn’t change

* The adapter hides incompatibility

#### Your case mapped to the formal definition 
Client

* React components

* Redux thunks / slices

They expect:

login()
getUser()
getProjects()

Incompatible systems

* Real backend (REST / auth / latency / failures)

* Mock data (local, synchronous, fake)

Adapter
APIHelper.ts


It normalizes:

* response shape

* error shape

* calling style

So both backends look identical to the app.

That is textbook _Adapter Pattern_.

#### Adapter vs MVC (important distinction)

You asked if it’s “like MVC in system design” — good instinct.

Concept	    What it organizes
MVC	        Entire application structure (macro-architecture)
Adapter	    A boundary between two incompatible parts (micro-architecture)

Think of it like this:

* MVC: How the app is structured

* Adapter: How two pieces talk without knowing about each other

They operate at different scales, but same “design thinking level”.

#### Why frontend devs don’t always say “Adapter”

In frontend:

* People say: “API layer”, “service”, “client”

* But architecturally, many API layers ARE adapters

Same concept, different vocabulary depending on:

* language

* team maturity

* abstraction level

Backend / OO-heavy teams will explicitly say “Adapter”.

#### Real-world examples you already know

You’ve probably used adapters without naming them:

Axios wrapper → adapter over fetch

Redux selector → adapter over state shape

React Query custom fetcher → adapter

Payment gateway wrapper (Stripe / PayPal) → classic adapter

Browser compatibility layers → adapters

Why this matters for your learning roadmap

Understanding that this is a design pattern (not a trick) means:

You can name what you’re doing in interviews

You can recognize it elsewhere

You’ll naturally connect it later to:

Hexagonal architecture

Ports & adapters

Clean Architecture

And those do show up in system design rounds.

One-line mental model to keep

If I’m changing how something works without changing how it’s used → I’m probably using an Adapter.

If you want next, we can:

map adapter → clean architecture

or show how Redux slices + API layer form a “port/adapter” setup without extra ceremony

## Subscriptions 

Not React-specific

A subscription means:

> Call me back when something changes.

Examples:
-event listeners
-observers
-pub/sub systems
-stores notifying consumers

A subscription has 3 parts:

- Source (thing that changes)
- Listener (callback)
- Notify mechanism
