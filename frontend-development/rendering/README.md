# Frontend Rendering

## Purpose

Rendering turns application data and UI descriptions into output that a user
can see. In web applications, different parts of that work may occur during a
build, on a server, or in the browser.

## Document Index

- [Server and Client Rendering](server-and-client-rendering.md)
- [SSR versus ISR](ssr-and-isr.md)
- [Hydration](hydration.md)

## Concept Map

```text
Application state and data
        ↓
UI description or template
        ↓
Rendering strategy
├── browser creates or updates DOM
├── server produces initial HTML
├── build produces static HTML
└── regeneration replaces cached route output
        ↓
Browser displays and updates the page
```

Rendering strategy, data-loading strategy, and deployment strategy are related
but distinct decisions. A single application can combine multiple approaches
across routes and components.

## Related Concepts

- [Browser Runtime](../browser-runtime/README.md)
- [SSR versus ISR](ssr-and-isr.md)
- [Serialization](../data-across-boundaries/serialization.md)
- [React Application Delivery](../../framework-tooling/frontend/react-application-delivery/README.md)
