# Frontend Development

## Purpose & Architectural Distinction

Frontend Development is the applied engineering area concerned with building user-facing software that executes in a browser or client UI runtime. It manages browser behavior, DOM manipulation, rendering pipelines, interaction, state, networking, accessibility, styling, performance, and delivery.

### Language vs. Host Environment Boundary

A critical distinction in web engineering is separating the **Programming Language** from the **Host Platform**:

- **Programming Language Semantics** ([JavaScript Foundations](../computer-science-foundations/programming-languages/javascript/)): Memory models, execution contexts, lexical closures, objects, prototype delegation, and `this` binding. These behave identically across browsers, Node.js, and serverless environments.
- **Frontend Host Platform** (This Directory): Web APIs, DOM trees (`document`, `<dialog>`), CSSOM, event loops, rendering engines (Blink, Gecko, WebKit), web storage, accessibility trees, and client-side networking.

---

## Web Standards & Platform Specifications

Modern frontend development is governed by five major international standardization bodies that define how browsers, runtimes, and user agents operate:

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│ 1. TC39 / Ecma International (ECMA-262)                                    │
│    • Standardizes the core JavaScript language syntax, types, and semantics.│
│    • Canonical home: computer-science-foundations/programming-languages/   │
├─────────────────────────────────────────────────────────────────────────────┤
│ 2. WHATWG (Web Hypertext Application Technology Working Group)              │
│    • Maintains the HTML Living Standard, DOM Standard, Fetch, & Web Storage.│
│    • Canonical home: frontend-development/browser-runtime/ & rendering/     │
├─────────────────────────────────────────────────────────────────────────────┤
│ 3. W3C CSS Working Group                                                    │
│    • Standardizes CSS Cascading, Box Model, Flexbox, Grid, & Top Layer.     │
│    • Canonical home: frontend-development/styling/                          │
├─────────────────────────────────────────────────────────────────────────────┤
│ 4. W3C WAI (Web Accessibility Initiative)                                   │
│    • Standardizes Web Content Accessibility Guidelines (WCAG) and WAI-ARIA. │
│    • Canonical home: frontend-development/accessibility/                    │
├─────────────────────────────────────────────────────────────────────────────┤
│ 5. IETF (Internet Engineering Task Force)                                   │
│    • Standardizes underlying network protocols: HTTP/1.1, HTTP/2, HTTP/3,   │
│      TLS, and Cookie state management (RFC 6265).                           │
└─────────────────────────────────────────────────────────────────────────────┘
```

This directory owns transferable frontend concepts. Concrete frameworks, libraries, and build tools live under [Frontend Frameworks and Tooling](../framework-tooling/frontend/).

## Classification

- **Primary area:** Applied software engineering
- **Scope:** Browser-based user interfaces, web platform APIs, and related delivery concerns
- **Abstraction level:** Framework-independent concepts and mechanisms

Frontend Development overlaps with Software Engineering, Human–Computer Interaction, Web Platform standards, accessibility, security, networking, and framework tooling. Its directory is a primary navigation home, not a claim of exclusive academic ownership.

## Area Map

```text
Frontend Development
│
├── 🌐 Web Standards & Platform Specifications
│   ├── Language Standards (TC39 / ECMA-262)
│   ├── Living HTML & DOM Standards (WHATWG)
│   ├── Presentation & Layout Standards (W3C CSS WG)
│   ├── Accessibility & WAI Standards (W3C WAI)
│   │   ├── WCAG (Web Content Accessibility Guidelines)
│   │   └── WAI-ARIA Semantics & Accessibility Tree
│   └── Network & Transport Protocols (IETF HTTP)
│
├── 🖥️ Browser Runtime & Execution (Event loop, Web APIs, Timers)
├── 🎨 Rendering & Delivery (CSR, SSR, SSG, ISR, Hydration)
├── ♿ Accessibility (a11y) & Focus Management
├── ⚡ State, Reactivity, & Data Flow
├── 💅 Styling & Presentation (CSS Grid, Flexbox, Units)
├── 🔀 Routing, Forms, & User Interaction
├── 📡 Data Across Boundaries & Serialization
└── 📦 Progressive Delivery & Offline Caching (PWA, Service Workers)
```

## Suggested Reading Path

```text
Browser Runtime
        ↓
Progressive Web Apps and Offline Caching
        ↓
Server and Client Rendering
        ↓
Serialization across boundaries
        ↓
Hydration
        ↓
State and Reactivity
        ↓
Accessibility & Focus Management
        ↓
Framework-specific implementations
```

1. [Browser Runtime](browser-runtime/) explains where frontend code
   executes and what the environment provides.
2. [Timers and Event Scheduling](browser-runtime/timers-and-event-scheduling.md)
   explains browser timers, task queues, and timing controls.
3. [Progressive Web Apps, Service Workers, and Offline Caching](offline-web-apps/)
   explains service-worker lifecycles, precaching, installability, updates, and
   offline testing.
4. [Server and Client Rendering](rendering/server-and-client-rendering.md)
   explains where UI output can be produced.
5. [SSR versus ISR](rendering/ssr-and-isr.md) compares request-time rendering
   with cached output that can be regenerated.
6. [Serialization](data-across-boundaries/serialization.md) explains how data
   crosses storage, network, process, and server/client boundaries.
7. [Hydration](rendering/hydration.md) explains how a client framework adopts
   server-rendered markup.
8. [Reactivity Mechanisms](state-and-reactivity/reactivity-mechanisms.md)
   compares automatic dependency tracking, explicit updates, and streams.
9. [Web Accessibility (a11y)](accessibility/) explains the Accessibility Tree,
   screen reader semantics, focus lifecycles, and WCAG standards.

## Document Index

- [Browser Runtime](browser-runtime/)
- [Timers and Event Scheduling](browser-runtime/timers-and-event-scheduling.md)
- [Accessibility Overview](accessibility/)
- [WCAG — Web Content Accessibility Guidelines](accessibility/wcag.md)
- [Progressive Web Apps, Service Workers, and Offline Caching](offline-web-apps/)
- [Rendering](rendering/)
- [Server and Client Rendering](rendering/server-and-client-rendering.md)
- [SSR versus ISR](rendering/ssr-and-isr.md)
- [Hydration](rendering/hydration.md)
- [Serialization](data-across-boundaries/serialization.md)
- [Reactivity Mechanisms](state-and-reactivity/reactivity-mechanisms.md)
- [Routing and Interaction](routing-and-interaction/)
- [Controlled and Uncontrolled Inputs](routing-and-interaction/controlled-and-uncontrolled-inputs.md)
- [Post-Authentication Redirects](routing-and-interaction/post-authentication-redirects.md)
- [Styling](styling/)

## Framework Applications

- [Frontend Frameworks and Tooling](../framework-tooling/frontend/)
- [React](../framework-tooling/frontend/react/)
- [Next.js](../framework-tooling/frontend/nextjs/notes.md)
- [Vue](../framework-tooling/frontend/vue/notes.md)
- [React Application Delivery](../framework-tooling/frontend/react-application-delivery/)

## Related Areas

- [Software Engineering Foundations](../computer-science-foundations/software-engineering/)
- [Security](../security/)
- [Software Development Practices](../software-development-practices/)
