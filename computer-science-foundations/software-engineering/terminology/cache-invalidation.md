# Cache Invalidation

**Keywords:** cache invalidation, invalidation, invalidate, cache coherence, stale data, refetch, Phil Karlton, state synchronization, revalidation

## Purpose

This document defines **cache invalidation** as a fundamental software engineering concept across system layers, from CPU cache coherence to client-side state management and CDNs.

---

## Definition

**Cache invalidation** is the operational process of declaring cached or stored representations of data as **invalid or stale** because the underlying source of truth has changed.

It answers the core operational question:

> How does a system ensure users or components do not read outdated data after the authoritative source has been modified?

---

## The Phil Karlton Saying

Cache invalidation is famously recognized as one of the most notoriously difficult problems in computer science. As Phil Karlton famously stated:

> *"There are only two hard things in Computer Science: cache invalidation and naming things."*

The difficulty stems from distributed state synchronization: determining precisely *when* data changes, *which* cached representations depend on that data, and *how* to propagate or fetch updates without introducing race conditions or unnecessary network/compute overhead.

---

## Abstraction Levels & System Contexts

Cache invalidation occurs at virtually every layer of computer systems:

| System Layer | Source of Truth | Cached Representation | Invalidation Trigger & Mechanism |
| :--- | :--- | :--- | :--- |
| **CPU Architecture** | Main RAM | L1 / L2 / L3 CPU Caches | Hardware cache coherence protocols (e.g., MESI) mark cache lines invalid when another core writes to RAM. |
| **CDN / Edge Network** | Origin Server | Edge POP Servers | `Cache-Control` max-age expiry, API-driven purge requests (`POST /purge`), or versioned asset URLs. |
| **Database & Server** | Primary Database (SQL) | In-memory Data Store (Redis) | App mutations evict key-value entries (`DEL user:123`) or update TTLs upon write operations. |
| **Web Rendering (ISR/SSG)** | Headless CMS / API | Static HTML / Edge Pages | Time-based revalidation (`revalidate`) or on-demand webhook invalidation (`revalidatePath`). |
| **Client State Management** | REST / GraphQL Server API | Client Query Cache (TanStack Query / Apollo) | Mutation callbacks (`onSettled`) calling `invalidateQueries({ queryKey })` to mark cached data stale and refetch active views. |

---

## Invalidation Strategies

Systems generally handle invalidation through three primary strategies:

1. **Active/Explicit Invalidation**:
   The mutating party explicitly signals that a specific cache entry is stale immediately after a write operation (e.g., calling `queryClient.invalidateQueries()` or issuing a CDN purge command).
2. **Time-To-Live (TTL) Expiry**:
   Data automatically becomes stale after a predefined time window (e.g., `staleTime` in TanStack Query or `max-age` HTTP headers).
3. **Write-Through / Direct Cache Mutation**:
   The cache is directly updated with the new payload at the time of write, bypassing the need for a immediate refetch, though explicit invalidation is often retained as a fallback.

---

## Case Study: Client-Side State (TanStack Query)

In client-side data fetching libraries like TanStack Query:

```text
Mutation (POST /posts) 
  → Server updates Database
  → Client onSettled callback triggers queryClient.invalidateQueries({ queryKey: ['posts'] })
  → Cached 'posts' queries marked as STALE
  → Active UI components automatically refetch fresh data from server
```

Invalidation decouples the mutation logic from the display logic: rather than manually updating every component state across an application, invalidation marks the target query stale and lets subscriber components automatically synchronize with the server.

---

## Key Takeaways

- **Cache invalidation** marks cached data stale when the source of truth changes.
- It is a universal computer science problem present in hardware, networking, databases, and client apps.
- Effective invalidation prevents stale data bugs while keeping applications responsive.
- In client frameworks, invalidation triggers automatic background refetching for active UI components.

---

## Related Concepts

- [Software Engineering Terminology](./)
- [Mechanism](mechanism.md)
- [TanStack Query](../../../framework-tooling/tanstack-query.md)
- [SSR and ISR](../../../frontend-development/rendering/ssr-and-isr.md)
- [Reactivity Mechanisms](../../../frontend-development/state-and-reactivity/reactivity-mechanisms.md)
