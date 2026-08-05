# Next.js and React with Vite: Architecture, Performance, and JavaScript Delivery

## Purpose

This document explains how to compare a React application built with Vite and
a React application built with Next.js.

The comparison is not intended to prove that one option is universally faster.
It identifies where work runs, what is delivered to the browser, which
capabilities the application requires, and which measurements should guide the
decision.

## Classification

- **Primary subject:** React application delivery
- **Related areas:** Frontend architecture, rendering architecture, build
  tooling, deployment, and web performance
- **Compared configurations:** React with Vite and React with Next.js
- **Decision scope:** Application requirements, not framework ranking

This directory location is a navigation and ownership decision. It does not
mean that application delivery belongs exclusively to framework tooling;
delivery decisions also involve browser behavior, networking, infrastructure,
product requirements, and software architecture.

## Correct Comparison

React and Next.js are not equivalent alternatives:

```text
React
→ library that provides components and a rendering model

Vite
→ development server and build tool

Next.js
→ application framework built on React
```

The practical comparison is therefore:

```text
React application using Vite
vs.
React application using Next.js
```

Even this wording needs context. Vite can build single-page applications,
multi-page applications, and custom server-rendered setups. However, the common
React-with-Vite starting point is a client-rendered single-page application.
Next.js provides an integrated React framework with routing, server and client
rendering, Server Components, data-loading conventions, route handlers,
streaming, and deployment-aware optimizations.

## Begin with Responsibilities, Not Brand Names

A useful decision starts by asking:

1. Which content must be available in the initial response?
2. Which code genuinely needs to execute in the browser?
3. Where should data be loaded and composed?
4. Does the product need request-time rendering, build-time generation, or a
   client-only runtime?
5. What are the latency, caching, deployment, security, and operational costs?
6. Which measured user experience is currently too slow?

The answer is not determined by whether a framework has more features. A
capability is beneficial only when it matches a real requirement.

## Two Common Delivery Models

### Client-Rendered React with Vite

A typical Vite-powered React SPA serves an HTML shell and JavaScript modules.
React then renders the application in the browser.

```text
Browser requests application
        ↓
Static host returns HTML shell and asset references
        ↓
Browser downloads and executes JavaScript
        ↓
React creates the UI
        ↓
Application loads data from an API
```

The exact order can vary. Data may be prefetched, embedded in the HTML, loaded
in parallel with other resources, or requested by a router or data library.
The diagram describes a common architecture, not a rule imposed by Vite.

A minimal HTML entry may look like this:

```html
<div id="root"></div>
<script type="module" src="/src/main.tsx"></script>
```

In production, Vite transforms the module graph into optimized assets. Dynamic
imports create separate chunks, so code that is not needed for the current
route or feature does not have to be in the initial JavaScript chunk.

### Next.js App Router

The Next.js App Router divides the module graph into Server and Client
Components. Layouts and pages are Server Components by default. Interactive
boundaries are declared with `'use client'`.

For an initial page load, the model is more precise than “the server sends
HTML”:

```text
Next.js renders the route on the server
        ↓
Server Components produce an RSC payload
        ↓
Next.js uses the RSC payload and Client Components to prerender HTML
        ↓
Browser displays the initial HTML
        ↓
Browser uses the RSC payload to reconcile the component trees
        ↓
Client JavaScript hydrates interactive Client Components
```

The rendered result of a Server Component can reach the browser without that
component's implementation being included in the client JavaScript bundle.
Client Components still require browser JavaScript for their interactive
behavior.

## Server Rendering, Server Components, and Hydration

These terms describe related but different mechanisms.

### Server Rendering

Server rendering produces HTML before the browser runs the application. It can
improve the availability of initial content, but it also adds server work and
may increase time to first byte if the route or data path is slow.

### React Server Components

A Server Component executes in a server environment before the client bundle
is produced. Its implementation and server-only dependencies do not become
client JavaScript. It produces a serialized React representation rather than
directly meaning “HTML.” A framework can use that representation to generate
initial HTML and support later navigation.

```tsx
export default async function ProductsPage() {
  const products = await getProducts()

  return (
    <main>
      <h1>Products</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
    </main>
  )
}
```

If this remains a Server Component, the browser does not download its component
implementation merely to create this list. The browser still receives the
rendered result, the RSC payload needed by React, and any client-side code
required elsewhere in the route.

### Client Components and Hydration

A Client Component is needed for state, event handlers, effects, browser-only
APIs, or custom Hooks that depend on those client-only capabilities.

```tsx
'use client'

import { useState } from 'react'

export function ProductSearch() {
  const [search, setSearch] = useState('')

  return (
    <input
      value={search}
      onChange={(event) => setSearch(event.target.value)}
    />
  )
}
```

Client Components can participate in server prerendering for the first page
load, but their browser behavior still has to be downloaded and hydrated.
Hydration attaches React's client behavior to the existing server-rendered
HTML; it is not the same operation as producing that HTML.

## Client Boundaries and JavaScript Delivery

`'use client'` declares an entry point into the client module graph. Modules
imported by that entry point become candidates for the client bundle.

```tsx
'use client'

export default function AdminApplication() {
  return <CompleteAdminInterface />
}
```

Placing a client boundary high in a module tree can cause a large amount of
application code and third-party code to be delivered to the browser. A better
default is to keep interactive boundaries as narrow as the design permits.

This rule is about the **module graph**, not visual nesting alone. A Server
Component can be rendered on the server and passed into a Client Component
through composition, such as `children`, without its implementation
automatically becoming client JavaScript.

Data crossing from a Server Component to a Client Component must also be
serialized. Reducing component code while sending unnecessarily large props
can replace one delivery cost with another. Pass only the data required by the
client boundary.

## How Next.js Can Reduce Browser JavaScript

Next.js can reduce client JavaScript when meaningful work can remain on the
server, such as:

- rendering non-interactive content;
- reading server-only data sources;
- using libraries needed only to transform content on the server;
- keeping secrets and privileged operations out of the browser;
- composing data before it crosses the server/client boundary; and
- limiting Client Components to focused interactive regions.

Potential browser benefits include less JavaScript to download, parse, compile,
and execute. Those benefits must be balanced against the RSC payload,
serialized props, network paths, hydration work, and server response time.

Next.js cannot remove JavaScript genuinely required for browser interaction.
An interactive dashboard may still need client code for:

- forms and validation feedback;
- tables, filters, and selection;
- charts and rich editors;
- drag-and-drop behavior;
- optimistic updates;
- browser storage and device APIs; and
- local and client-side server-state coordination.

Next.js is therefore not automatically a low-JavaScript architecture.

## React with Vite Is Not Inherently Slow

A client-rendered React application can control its initial cost through module
boundaries and loading strategy. Relevant techniques include:

- route-level code splitting;
- conditional dynamic imports for heavy features;
- tree-shakeable dependencies and direct imports;
- CSS code splitting;
- long-lived caching for content-hashed assets;
- parallel or prefetched data loading where appropriate; and
- deferring non-critical third-party code.

For example:

```tsx
import { lazy, Suspense } from 'react'

const ReportsPage = lazy(() => import('./pages/ReportsPage'))

export function ReportsRoute() {
  return (
    <Suspense fallback={<p>Loading reports…</p>}>
      <ReportsPage />
    </Suspense>
  )
}
```

This creates a potential split point; the router and production module graph
determine how it is used in the application. Splitting every small component
is not automatically beneficial because additional chunks add coordination and
network overhead. Prioritize routes and heavy features that are not needed for
the initial experience.

## Performance Has Several Dimensions

“Faster” is incomplete without a workload and a metric.

### Initial Delivery

Relevant questions include:

- How quickly does the server begin and finish its response?
- When does meaningful content become visible?
- How much JavaScript, CSS, RSC data, and application data cross the network?
- How much main-thread work is required before interaction is responsive?

### Navigation

Relevant questions include:

- Are route assets and data prefetched appropriately?
- Does navigation wait on sequential network requests?
- Are loading states streamed or shown at useful boundaries?
- Does the architecture add an unnecessary server hop?

### Runtime Interaction

Relevant questions include:

- Are expensive component trees rerendering frequently?
- Are large lists rendered or virtualized appropriately?
- Are input updates blocked by expensive work?
- Are data requests duplicated or serialized into waterfalls?
- Do heavy libraries load before users need them?

Server rendering cannot repair an inefficient table, expensive chart, or
unnecessary client-side request waterfall after the application is loaded.
Conversely, excellent runtime interaction does not guarantee fast initial
delivery.

## Network and Backend Architecture

### Browser Calling a Separate API

```text
Browser
  ↓
Application API
  ↓
Database and services
```

This creates a direct browser/API boundary. The frontend owns presentation and
interaction; the backend owns authorization, business rules, validation, and
data access.

### Next.js with a Separate API

Next.js creates an additional server environment, but it does not require every
browser request to pass through that server.

One possible path is:

```text
Browser
  ↓
Next.js server or route handler
  ↓
Application API
  ↓
Database and services
```

Another path can still be:

```text
Browser
  ↓
Application API
```

The Next.js layer becomes a backend for frontend only when the architecture
assigns it that responsibility. Such a layer can aggregate data, keep
frontend-specific credentials server-side, transform responses, or support
server rendering. It can also add latency, deployment responsibility, and
unclear ownership if introduced without a concrete purpose.

## Capability and Cost Comparison

| Concern | Typical React with Vite SPA | Next.js App Router |
| --- | --- | --- |
| UI model | React | React |
| Build and development tooling | Vite | Next.js toolchain |
| Default rendering emphasis | Browser rendering | Server and client composition |
| Initial HTML | Commonly an application shell | Can contain prerendered route content |
| Server Components | Not supplied by the standard setup | Integrated into the App Router |
| Client JavaScript | Application module graph, controlled with split points | Client module graph below client boundaries |
| Routing | Selected separately | Integrated file-system router |
| Server runtime | Optional and separately designed | Available when the selected deployment/rendering mode requires it |
| Static hosting | Straightforward | Possible for supported static-export scenarios; server features require a compatible runtime |
| Main complexity | Client loading, API coordination, and SPA behavior | Server/client boundaries, rendering modes, data flow, caching, and deployment behavior |

These are typical tendencies, not guarantees. Either configuration can be
implemented well or poorly.

## Decision Guide

Next.js becomes more compelling when the product benefits materially from:

- server-rendered or build-generated content;
- public entry pages whose initial content matters before client execution;
- Server Components that keep substantial non-interactive code off the client;
- streaming and server-side data composition;
- an integrated full-stack React framework; or
- server-only access close to the data source.

React with Vite is often a strong fit when the product is:

- primarily a browser application;
- highly interactive after startup;
- backed by an existing application API;
- deployed as static assets;
- not dependent on server-rendered entry content; and
- better served by selecting routing and data tools independently.

SEO is one factor, not the sole dividing line. Next.js can be useful for
authenticated applications, and Vite can support public applications. The
decision depends on the complete rendering, data, deployment, and operational
model.

## Evidence-First Optimization

Do not migrate frameworks to solve an unspecified performance concern. First
identify the user-visible problem and collect evidence such as:

- production JavaScript transferred, parsed, and executed;
- route and shared chunk composition;
- RSC payload and serialized-prop size, when applicable;
- server response and API timing;
- request waterfalls;
- React rendering profiles;
- Core Web Vitals where they match the product experience; and
- task-specific measurements for important dashboard interactions.

Then apply the smallest intervention supported by the evidence. Possibilities
include:

- route-level or feature-level dynamic imports;
- parallelizing independent requests;
- removing or deferring heavy third-party code;
- reducing data serialized across a server/client boundary;
- colocating state to avoid overly broad subscriptions;
- virtualizing genuinely large lists;
- improving API pagination or response time; or
- changing the rendering architecture when the measured benefit justifies its
  cost.

## Final Principle

> Next.js can reduce browser JavaScript when useful work remains outside the
> client module graph. React with Vite can also deliver an efficient application
> through intentional code splitting and loading. Choose the architecture by
> required capabilities and measured behavior, not by a universal performance
> ranking.

## Sources and Related Concepts

- [Next.js: Server and Client Components](https://nextjs.org/docs/app/getting-started/server-and-client-components)
- [Next.js: `use client`](https://nextjs.org/docs/app/api-reference/directives/use-client)
- [React: Server Components](https://react.dev/reference/rsc/server-components)
- [React: `hydrateRoot`](https://react.dev/reference/react-dom/client/hydrateRoot)
- [Vite: Features](https://vite.dev/guide/features.html)
- [Vite: Building for Production](https://vite.dev/guide/build.html)
- [React Application Delivery](README.md)
- [Frontend Development](../../../frontend-development/README.md)
- [Hydration](../../../frontend-development/rendering/hydration.md)
- [Serialization](../../../frontend-development/data-across-boundaries/serialization.md)
- [Next.js Notes](../nextjs/notes.md)
