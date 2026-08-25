# Deduplication

**Keywords:** deduplication, dedup, duplicate elimination, singleflight, request coalescing, idempotency key, unique constraint, hash set, data deduplication

## Purpose

This document defines **deduplication** as a fundamental software engineering mechanism across storage systems, in-memory collections, network request coalescing, distributed event streams, and compute memoization.

---

## Definition

**Deduplication** (often abbreviated as *dedup*) is the process or technique of identifying and eliminating redundant copies of identical or equivalent data, operations, requests, or events so that only a single canonical instance or execution occurs.

It answers the core operational question:

> How does a system prevent redundant storage, duplicate processing, or repeated concurrent work when identical inputs or entities occur?

---

## Deduplication Across Engineering Contexts

Deduplication manifests across multiple layers of software architecture:

```text
Deduplication Mechanisms
│
├── In-Memory Collections (Data Structures)
│   ├── Set: eliminates duplicate primitive values by value equality
│   └── Map: keys records by unique domain identifier (e.g. item.id)
│
├── Network & Request Coalescing
│   ├── In-flight request deduplication (Singleflight)
│   └── Client query deduplication (TanStack Query / Apollo)
│
├── Distributed Systems & Messaging
│   ├── Idempotency keys for API mutations
│   └── Message deduplication IDs in message brokers (e.g. SQS FIFO, Kafka)
│
├── Storage & Databases
│   ├── Content-addressable chunk deduplication (CAS / backup systems)
│   └── Database unique constraints and indexes (PRIMARY KEY / UNIQUE INDEX)
│
└── Compute & Rendering
    ├── Pure function memoization
    └── UI render deduplication and batching
```

---

### 1. In-Memory Data Structures & Collections

In application memory, deduplication prevents duplicate elements from accumulating in collections:

- **Primitive Values:** A `Set` enforces uniqueness using value equality (`SameValueZero` in JavaScript):
  ```js
  const duplicateIds = ['a', 'b', 'a', 'c', 'b']
  const uniqueIds = [...new Set(duplicateIds)]
  // ['a', 'b', 'c']
  ```
- **Objects & Records:** Because objects are distinguished by referential identity rather than structural shape, deduplicating records requires an explicit domain key strategy (commonly using a `Map`):
  ```js
  const users = [
    { id: 'u1', name: 'Alice' },
    { id: 'u1', name: 'Alice (Updated)' },
    { id: 'u2', name: 'Bob' },
  ]
  const uniqueUsers = Array.from(
    new Map(users.map((user) => [user.id, user])).values()
  )
  ```

---

### 2. Request & Network Coalescing (In-Flight Deduplication)

When multiple concurrent callers or components request the same resource simultaneously, in-flight request deduplication coalesces them into a single network or database roundtrip:

```text
Component A (requests /user/1) ──┐
Component B (requests /user/1) ──┼─► [In-flight Deduplication Layer] ──► Single HTTP GET /user/1
Component C (requests /user/1) ──┘        │ (shares promise)
                                          ▼
                               All components receive result
```

- **Mechanism:** The system checks if an identical query key or resource URI is already in flight. If so, subsequent callers attach to the existing pending promise rather than initiating new network traffic.
- **Examples:**
  - **TanStack Query / Apollo Client:** Automatically deduplicates identical query keys executed within the same render cycle.
  - **Golang `singleflight`:** Suppresses duplicate concurrent function calls by executing the underlying operation once and sharing the return value across all callers.

---

### 3. Distributed Systems & Message Queues

In distributed architectures, networks can retry requests, causing at-least-once delivery to introduce duplicate messages or operations:

- **Idempotency Keys:** Clients attach a unique transaction identifier (e.g., UUID or `Idempotency-Key` HTTP header) to state-changing requests. The server records processed keys to prevent double-charging or duplicate record creation.
- **Message Deduplication IDs:** Message brokers (such as AWS SQS FIFO queues or Apache Kafka idempotent producers) track message hashes or explicit deduplication tokens within a sliding time window (e.g., 5 minutes) to ensure duplicate events are dropped before reaching consumer workers.

---

### 4. Storage Systems & Databases

Storage deduplication reduces physical disk and database consumption:

- **Database Constraints:** Relational databases enforce logical deduplication using `UNIQUE` constraints and `PRIMARY KEY` indexes, rejecting duplicate insertions at write time.
- **Chunk / Block Deduplication:** File systems (e.g., ZFS) and backup storage systems split files into variable or fixed-size chunks, hash each chunk (e.g., SHA-256), and store only one physical copy of identical chunks, mapping multiple file pointers to that single block.

---

### 5. Compute & Render Deduplication

Avoiding redundant processing:

- **Memoization:** Caches pure function outputs based on input arguments so expensive algorithms do not re-run for known parameters.
- **Render Batching:** UI frameworks coalesce multiple state updates occurring in the same event loop tick into a single render pass to avoid redundant DOM manipulations.

---

## Boundaries & Distinctions

| Concept | Primary Focus | Distinction from Deduplication |
| :--- | :--- | :--- |
| **Deduplication** | Eliminating redundant copies or duplicate concurrent actions. | Focuses on uniqueness and coalescing duplicate units into one canonical entity. |
| **Idempotency** | Ensuring repeated executions produce the identical end state. | A mathematical and operational property of an API/operation; deduplication is one mechanism used to achieve idempotency. |
| **Caching** | Retaining results over time for future fast retrieval. | Caching retains data across time; in-flight deduplication coalesces concurrent requests across simultaneous callers. |
| **Compression** | Re-encoding data to use fewer bits. | Compression transforms the representation of data; deduplication replaces identical whole items or chunks with shared references. |

---

## Key Considerations & Caveats

1. **Equivalence Strategy:**
   Deduplication is only as correct as its equivalence rule. Comparing objects by reference (`===`) will fail to deduplicate structurally identical objects. Explicit keys (e.g., `id`) or content hashes must be defined.
2. **Temporal Window & Scope:**
   Deduplication often operates within a defined boundary (e.g., in-flight only, sliding 5-minute window, or permanent database store). Once the deduplication window expires, identical subsequent operations may execute again unless persistent records are kept.
3. **Memory Overhead:**
   Tracking seen keys, hashes, or in-flight promises consumes memory. Systems must implement eviction or time-to-live (TTL) limits to avoid unbounded memory growth.

---

## Summary Comparison Matrix

| Context | Redundant Unit | Equivalence Strategy | Primary Mechanism | Key Benefit |
| :--- | :--- | :--- | :--- | :--- |
| **In-Memory** | Duplicate array items / records | Value equality (`SameValueZero`) or domain ID | `Set`, `Map` lookup | Reduced memory, clean domain state |
| **Network** | Concurrent GET requests | Resource URI / Query Key | In-flight promise sharing (Singleflight) | Prevents API waterfalls & duplicate network load |
| **Distributed** | Duplicate webhook / message | UUID / Idempotency Key | Token tracking with TTL in Redis / Broker | Prevents duplicate business mutations |
| **Storage** | Duplicate file blocks / records | Cryptographic hash (SHA-256) / Unique index | Content-addressable storage, Unique constraint | Massively reduced disk storage, data integrity |
| **Compute** | Repeated expensive calculations | Argument equality | Memoization cache | Reduced CPU load & lower latency |

---

## Related Concepts

- [Software Engineering Terminology](./)
- [Mechanism](mechanism.md)
- [Atomicity](atomicity.md)
- [Cache Invalidation](cache-invalidation.md)
- [Unbounded](unbounded.md)
- [JavaScript `Set`, `Map`, and `Object`](../../programming-languages/javascript/set-map-and-object.md)
- [TanStack Query](../../../framework-tooling/tanstack-query.md)
- [Stale-Response Races and Server-State Ownership](../../../framework-tooling/frontend/react/stale-response-races.md)
