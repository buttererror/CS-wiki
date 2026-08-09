# Server-Side Rendering and Incremental Static Regeneration

**Reading status:** Not read yet

## Concept: SSR versus ISR

## Primary Category: Frontend Development / Rendering

Server-side rendering (SSR) and incremental static regeneration (ISR) are
rendering and caching strategies supported by server-capable web frameworks.
The main distinction is when route output is generated and how long that output
is reused.

## Taxonomy Classification

- **Field:** Web Engineering
- **Area:** Rendering Strategy
- **Level:** System-level

## Subcategories

- **Server-Side Rendering** → produces route output in response to a request.
- **Incremental Static Regeneration** → prerenders output, caches it, and
  replaces it after time-based or on-demand revalidation.

These strategies relate to caching, deployment, and data loading, but none is
strictly contained by another. ISR is framework terminology rather than a Web
Platform standard; exact behavior depends on the framework and deployment.

## Definition

The core difference is when the server generates the route output and whether
that generated representation is shared across requests.

### Server-Side Rendering

With SSR, a server generates HTML in response to an incoming request.

```text
Request
   ↓
Server loads request-time data
   ↓
Server renders output
   ↓
HTML returned to browser
```

Conceptually:

```text
request → renderPage(request) → HTML response
```

The page can therefore reflect information available for that request.

Typical use cases include:

- authenticated dashboards;
- personalized pages;
- request-dependent content; and
- pages whose initial response requires highly current information.

SSR responses can still participate in carefully designed server or CDN
caching. Per-request rendering is the base model; adding shared response caching
changes the freshness and personalization constraints and must use correct cache
keys and privacy rules.

### Incremental Static Regeneration

ISR combines prerendering with caching and later regeneration.

```text
Generate route output
        ↓
Cache generated representation
        ↓
Serve it repeatedly
        ↓
Output becomes eligible or is invalidated
        ↓
Generate a newer version
        ↓
Replace the cached version
```

For a time-based revalidation window of 60 seconds:

```text
Generate
   ↓
Cache and reuse
   ↓
60 seconds pass
   ↓
cached output becomes eligible for revalidation
   ↓
a later request can trigger regeneration
   ↓
successful result replaces the cached version
```

The interval is not necessarily a background job that runs exactly every 60
seconds. In the common stale-while-revalidate model, a request after the window
can receive the stale cached result while regeneration happens. Frameworks may
also support on-demand invalidation after a content change.

The important property is that the server does not need to generate the route
from scratch for every request.

## Mental Model

Think of SSR as producing a document when a request asks for it:

```text
Visitor request
      ↓
Generate document for this request
      ↓
Return document
```

Think of ISR as generating a document, keeping a reusable copy, and replacing
that copy when revalidation occurs:

```text
Generate
   ↓
Cache
   ↓
Reuse
   ↓
Revalidate and regenerate
```

The simplest mental model is:

```text
SSR = request → generate → return

ISR = generate → cache → reuse → regenerate
```

## Example

Consider a public product-information route:

```text
/products/phone
```

Suppose its description and catalog metadata change occasionally and the
product owner accepts a defined stale window.

### With SSR

```text
Visitor 1 → fetch data → render page
Visitor 2 → fetch data → render page
Visitor 3 → fetch data → render page
Visitor 4 → fetch data → render page
```

Without another cache layer, the server repeatedly performs similar work. The
result can still differ per request when the route reads request-time data.

### With ISR

```text
Data source
    ↓
Generate route output
    ↓
Shared cache
    ├── Visitor 1
    ├── Visitor 2
    ├── Visitor 3
    └── Visitor 4
```

When regeneration is triggered:

```text
Updated source data
        ↓
Revalidate and regenerate
        ↓
Successful result replaces cached output
        ↓
Later visitors receive the newer version
```

For fields such as availability or price, the acceptable stale window is a
product and correctness decision. A page can also combine cached public content
with request-time or client-fetched dynamic information.

## SSR versus ISR

| Aspect | SSR | ISR |
| --- | --- | --- |
| Base generation trigger | Incoming request | Build, first eligible request, or regeneration |
| Output reuse | Not fundamental to the base model | Fundamental |
| Freshness | Can reflect request-time data | May intentionally serve a stale cached version |
| Server computation | Usually more work per uncached request | Amortized across many requests |
| Personalization | Strong fit | Shared output is usually a poor fit for user-specific data |
| Public content | Suitable | Often an excellent fit |
| Read-heavy scalability | Requires request capacity or another cache | Reuses generated output efficiently |
| Failure behavior | A rendering failure can fail that request | A framework may retain the last successful cached version |

The central design question is:

```text
How fresh and how request-specific must this route be?
```

If the answer is:

```text
It must represent this request's current data or identity.
```

SSR is usually the stronger candidate.

If the answer is:

```text
A shared representation with a bounded stale period is acceptable.
```

ISR may avoid unnecessary repeated rendering work.

Never place personalized or authorization-sensitive output in a shared cache
unless cache partitioning and access controls make that sharing safe.

## ISR Is Not SSR Every N Seconds

ISR should not be reduced to:

```text
SSR every 60 seconds
```

ISR is fundamentally organized around a reusable cached representation:

```text
Generate
   ↓
Prerendered representation
   ↓
Cache
   ↓
Many requests reuse it
   ↓
Regeneration replaces it
```

SSR fundamentally begins with an incoming request:

```text
Request
   ↓
Rendering computation for that request
   ↓
Response
```

This distinction affects:

- cache ownership and invalidation;
- infrastructure and deployment requirements;
- server load;
- scalability;
- data freshness; and
- whether output can safely be shared.

## Time-Based and On-Demand Revalidation

ISR can use two complementary triggers:

```text
Time-based
cached output passes a freshness window
        ↓
a later request triggers background regeneration
```

```text
On-demand
content changes in a CMS or application
        ↓
the application invalidates a path or cache tag
        ↓
the framework regenerates according to its cache behavior
```

On-demand revalidation can reduce unnecessary refreshes and shorten the stale
window, but invalidation remains a distributed-systems problem: failures,
duplicate events, multiple server instances, and CDN behavior must be considered.

## Next.js as an Implementation Case

Next.js supports ISR and calls it revalidation in current App Router
documentation. A simplified time-based route configuration can look like:

```tsx
export const revalidate = 60;

export default async function ProductPage() {
  const product = await getProduct();

  return <ProductDetails product={product} />;
}
```

The number expresses a revalidation interval, not a guaranteed cron schedule.
After the cached route becomes stale, a request can trigger regeneration in the
background; a successful version replaces the previous cached version.

Next.js also provides on-demand invalidation APIs such as `revalidatePath` and
`revalidateTag`. Cache APIs and exact semantics differ across Next.js routing
and caching models, so implementation code should follow the documentation for
the project's installed version.

ISR also requires a compatible runtime and cache arrangement. In current
Next.js documentation it is supported by the Node.js runtime, is unavailable
for a pure static export, and may need shared cache coordination across multiple
self-hosted instances.

## Why It Matters

The rendering strategy influences several system characteristics:

```text
Rendering strategy
      │
      ├── response latency
      ├── server load
      ├── cache ownership
      ├── CDN distribution
      ├── data freshness
      ├── personalization
      ├── failure behavior
      └── discoverable initial content
```

Pages such as these are often strong candidates for static generation or ISR:

- blog articles;
- public product catalogs;
- marketing pages; and
- documentation.

These commonly require request-time rendering or another request-specific data
path:

- account pages;
- administration dashboards;
- user-specific feeds; and
- authorization-dependent views.

Rendering strategy can affect search-engine crawling and initial content, but
“SEO” is not an automatic property of SSR or ISR. Correct metadata, accessible
content, performance, links, and crawler behavior still matter.

## Relationships to Other Areas

- **Caching** → ISR stores generated route output and reuses it across requests.
- **Cache invalidation** → revalidation determines when a cached representation
  becomes stale or should be replaced.
- **Static generation** → ISR allows prerendered routes to change after the
  original build.
- **CDNs** → cacheable output can often be distributed near readers, subject to
  platform cache behavior.
- **Hydration** → SSR and ISR describe initial output production; client-side
  JavaScript may subsequently hydrate interactive regions.
- **Data fetching** → data-cache policy and route-output policy are related but
  distinct layers.
- **React Server Components** → RSC execution and payloads are a separate axis
  from whether the route output is dynamically rendered or cached.

## Related Concepts

- [Server and Client Rendering](server-and-client-rendering.md)
- [Hydration](hydration.md)
- [Serialization](../data-across-boundaries/serialization.md)
- [Browser Runtime](../browser-runtime/README.md)
- [React Application Delivery](../../framework-tooling/frontend/react-application-delivery/README.md)
- [Next.js versus React with Vite](../../framework-tooling/frontend/react-application-delivery/nextjs-vs-react-with-vite.md)

## Key Takeaway

```text
SSR:
request → generate → return

ISR:
generate → cache → return many times → revalidate → regenerate
```

SSR optimizes for request-time generation and can reflect request-specific
data. ISR optimizes for reuse of generated output while still allowing cached
routes to evolve after the build.

Choose based on freshness, personalization, cache safety, failure behavior,
traffic, and operational constraints—not from the framework label alone.

## Repository Placement

- **Canonical file:** `frontend-development/rendering/ssr-and-isr.md`
- **Framework implementation:** Next.js documentation under
  `framework-tooling/frontend/react-application-delivery/`
- **Related system concerns:** caching, invalidation, CDN behavior, and runtime
  deployment

## Sources

- [Next.js: Incremental Static Regeneration](https://nextjs.org/docs/app/guides/incremental-static-regeneration)
- [Next.js: Revalidating](https://nextjs.org/docs/app/getting-started/revalidating)
- [Next.js: Self-Hosting](https://nextjs.org/docs/app/guides/self-hosting)
