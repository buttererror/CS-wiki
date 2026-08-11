# Server and Client Rendering

## Purpose

This document distinguishes where user-interface output is produced. It does
not rank rendering strategies; each strategy changes latency, infrastructure,
browser work, caching, and application complexity.

## Client-Side Rendering

With client-side rendering, browser JavaScript creates the application UI.

```text
Browser receives HTML shell and assets
        ↓
Browser executes application JavaScript
        ↓
Application obtains required data
        ↓
Client renderer creates or updates DOM
```

The data request can occur before, during, or after module loading depending on
the router and architecture. “Client-rendered” does not mean the application
must be one large bundle or that all data loading must occur in an Effect.

## Server-Side Rendering

With server-side rendering, a server produces HTML for a request before the
browser executes the client application.

```text
Browser requests route
        ↓
Server loads data and renders HTML
        ↓
Browser receives and parses HTML
        ↓
Optional client code makes the page interactive
```

Server-rendered HTML can expose useful content earlier, but server work and
data dependencies can also affect time to first byte. Interactive UI may still
need substantial client JavaScript.

## Static Generation

Static generation produces HTML before a user request, commonly during a build
or revalidation step. The output can be served from static infrastructure.

```text
Build or regeneration
        ↓
Produce HTML and assets
        ↓
Cache or deploy output
        ↓
Serve it for later requests
```

Static generation is effective when content can be reused across requests. It
is less suitable when each response requires uncached request-specific data.

## Rendering Is Not Interactivity

- A page can be server-rendered and remain non-interactive.
- A page can be server-rendered and then hydrated.
- A page can contain independently interactive regions.
- A client-rendered application can progressively load routes and features.

See [Hydration](hydration.md) for the adoption of server-rendered markup by a
client framework.

## React Server Components Are a Separate Axis

React Server Components execute in a server environment and produce a
serialized React representation. They do not mean the same thing as generating
HTML. A framework such as Next.js can combine Server Components with HTML
prerendering and Client Component hydration.

```text
Server Component rendering → produces an RSC payload
HTML prerendering → produces initial markup
Client Component hydration → activates client-side React behavior
```

## Decision Questions

- Does initial content need to exist before client JavaScript executes?
- Is the page public, personalized, or request-specific?
- How much of the interface genuinely requires browser behavior?
- Where can data be loaded with the fewest avoidable waterfalls?
- What should be cached, and for whom?
- What server runtime and operational cost does the strategy require?
- Which user-visible metric needs improvement?

## Related Concepts

- [Rendering](./)
- [SSR versus ISR](ssr-and-isr.md)
- [Hydration](hydration.md)
- [Serialization](../data-across-boundaries/serialization.md)
- [Next.js and React with Vite](../../framework-tooling/frontend/react-application-delivery/nextjs-vs-react-with-vite.md)
