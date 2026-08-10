# TanStack Query

## Purpose

This document explains TanStack Query as a library for managing asynchronous server state.

The examples use the React adapter and concepts discussed while implementing authentication and patient data flows.

---

## Taxonomy Classification

- **Primary category:** Library
- **Area:** Server-State Synchronization
- **Adapter discussed:** React
- **Scope:** Asynchronous server state, caching, and synchronization

TanStack Query is not the Reactive Programming paradigm or the Observer Pattern. It is a library that uses observer-based reactive behavior to synchronize asynchronous state with consumers.

---

## Definition

TanStack Query manages asynchronous data that commonly originates from a server.

Examples discussed include:

```text
Current user
Patient list
Appointments
Profile
```

Its role is broader than calling an API. It manages:

- Request execution.
- Loading and error state.
- Cached results.
- Freshness and garbage collection.
- Background refetching.
- Retries and cancellation.
- Synchronization between server data and UI consumers.

```text
Server
    ↓
Query function
    ↓
TanStack Query cache
    ↓
Query observers
    ↓
React components
```

---

## Core Concepts

- **Query:** Declarative dependency on asynchronous data, commonly used for reads and synchronization.
- **Mutation:** Explicit operation that commonly changes server state or performs a side effect.
- **Query key:** Identifies cached query state.
- **Query cache:** Stores query data and state.
- **Query Client:** Provides APIs for controlling queries and mutations.
- **Query Observer:** Observes one query and produces results for a consumer.
- **Freshness:** Determines whether cached data can be reused without a staleness-based refetch.
- **Garbage collection:** Removes inactive cached queries after `gcTime`.
- **Invalidation:** Marks matching queries stale and may refetch active queries.
- **Cancellation:** Cancels query work and can abort the underlying request when its signal is consumed.

---

## Query

A Query represents a declarative dependency on asynchronous data.

Queries are commonly used for idempotent reads and synchronization:

```text
Get patients
Get current user
Get appointments
Get profile
```

```tsx
const { data } = useQuery({
  queryKey: ['patients'],
  queryFn: getPatients,
})
```

The component does not normally call `getPatients()` during render. It declares the query and receives its current result.

```text
Observer mounts with an enabled query
        ↓
TanStack Query checks query state and freshness
        ↓
Missing data may fetch
        ↓
Stale data may refetch according to triggers
        ↓
Fresh data is reused
```

---

## What Triggers a Query?

An enabled query may execute when its observer mounts and the cache does not contain reusable fresh data.

It may execute again when:

- Its query key changes.
- It is invalidated and actively observed.
- A configured refetch trigger occurs while it is stale.
- A polling interval runs.
- `refetch()` is called.

Example with pagination:

```tsx
useQuery({
  queryKey: ['patients', page],
  queryFn: () => getPatients(page),
})
```

```text
['patients', 1]
        ↓ page changes
['patients', 2]
        ↓
Different cache entry and query state
```

---

## Query Key

A Query Key identifies cached query state.

```ts
export const authQueryKeys = {
  all: ['auth'] as const,
  currentUser: () =>
    [...authQueryKeys.all, 'current-user'] as const,
}
```

The current-user key is:

```ts
['auth', 'current-user']
```

The same key can be used to:

- Declare the current-user query.
- Cancel matching work.
- Update the cached value.
- Invalidate matching queries.
- Connect all observers interested in that query.

```text
Query key
    ↓
Identifies query state in the cache
    ↓
Connects queries, mutations, and consumers
```

Query keys should contain the variables needed by the query function so distinct inputs map to distinct cache entries.

---

## Query Cache

The Query Cache stores query data and state.

```text
['auth', 'current-user']
        ↓
AuthUser | null
```

Multiple consumers can observe the same cache entry.

```text
Query cache entry
    ├── Navbar observer
    ├── Profile-page observer
    └── Settings-page observer
```

The cache is not merely a permanent data store. Query activity, freshness, invalidation, and garbage collection affect how cached state is reused.

---

## Fresh and Stale Data

### Fresh Data

Fresh data is considered recent enough to reuse without a staleness-based refetch.

```text
Query result fetched
        ↓
Fresh period
        ↓
Reuse cached data
```

### Stale Data

Stale data remains cached. Becoming stale does not immediately start a request.

```text
Cached data becomes stale
        ↓
Cached data can still be returned
        ↓
A refetch trigger occurs
        ↓
Background request may run
```

Common triggers include:

- A new observer mounting.
- Browser-window refocus.
- Network reconnection.
- Manual invalidation.
- Manual refetch.

---

## `staleTime`

`staleTime` controls how long data remains fresh.

```tsx
useQuery({
  queryKey: ['patients'],
  queryFn: getPatients,
  staleTime: 60_000,
})
```

```text
Fetch completes
        ↓
0–60 seconds: fresh
        ↓
After 60 seconds: stale
```

The default is effectively:

```ts
staleTime: 0
```

The result becomes stale immediately, but it does not refetch continuously. It becomes eligible for refetching when a relevant trigger occurs.

### `staleTime: Infinity`

```tsx
useQuery({
  queryKey: ['reference-data'],
  queryFn: getReferenceData,
  staleTime: Infinity,
})
```

The data does not become stale automatically. Manual invalidation can still mark it stale and trigger applicable refetch behavior.

### `staleTime: 'static'`

```tsx
useQuery({
  queryKey: ['build-time-data'],
  queryFn: getBuildTimeData,
  staleTime: 'static',
})
```

Static data does not refetch through ordinary staleness behavior, including manual invalidation. This is stricter than `Infinity` and should be reserved for data that cannot change during the application session.

---

## `gcTime`

Freshness and storage lifetime are separate concerns.

```text
staleTime
→ How long is data considered fresh?

gcTime
→ How long may an inactive query remain cached?
```

A query becomes inactive when it has no active observers. Inactive queries are garbage-collected after five minutes by default in the client configuration.

```text
Last observer unmounts
        ↓
Query becomes inactive
        ↓
gcTime elapses
        ↓
Query can be removed from cache
```

---

## Retry

`retry` controls repeated query attempts after failure.

```tsx
useQuery({
  queryKey: ['patients'],
  queryFn: getPatients,
  retry: 3,
})
```

```text
Initial attempt fails
        ↓
Retry 1
        ↓
Retry 2
        ↓
Retry 3
        ↓
Report the error if all attempts fail
```

Current defaults differ by environment:

```text
Client
→ 3 retries by default

Server rendering
→ 0 retries by default
```

Retries can recover from temporary network or service failures. They should not blindly repeat requests that cannot succeed without a meaningful change.

### Disabling Retry

```tsx
useQuery({
  queryKey: ['auth', 'current-user'],
  queryFn: getCurrentUser,
  retry: false,
})
```

Disabling retry for authentication restoration is an application policy, not a universal rule for every authentication query.

### Conditional Retry

Use an error type that exposes the relevant HTTP information:

```tsx
retry: (failureCount, error: HttpError) => {
  if ([401, 403, 404].includes(error.status)) {
    return false
  }

  return failureCount < 3
}
```

### Retry Delay

```text
Attempt fails
    ↓
Wait
    ↓
Retry
    ↓
Wait longer
    ↓
Retry again
```

```tsx
retryDelay: (attempt) =>
  Math.min(1000 * 2 ** attempt, 30_000)
```

---

## Mutation

A Mutation represents an explicit operation that commonly changes server state or performs a side effect.

Examples:

```text
Create patient
Update patient
Delete patient
Login
Logout
```

```tsx
const deletePatientMutation = useMutation({
  mutationFn: removePatient,
})
```

It is triggered explicitly:

```tsx
<button
  onClick={() => deletePatientMutation.mutate(id)}
>
  Delete
</button>
```

Mutations are not tied to buttons. They may be triggered by forms, keyboard actions, workflows, or other events.

```text
Query
→ read and synchronize asynchronous state

Mutation
→ perform an explicit state-changing operation or side effect
```

---

## Query and Mutation Relationship

```text
Query
→ reads and synchronizes server state

Mutation
→ changes server state

Cache coordination
→ makes query state reflect the change
```

After a mutation, an application may:

- Update known cached data directly.
- Invalidate affected queries so active observers refetch.
- Combine direct updates and invalidation.

---

## Direct Cache Update

The authentication example writes the returned user directly:

```ts
queryClient.setQueryData<AuthUser | null>(
  authQueryKeys.currentUser(),
  authenticatedUser,
)
```

```text
Login succeeds
        ↓
Response already contains the user
        ↓
Write user into current-user cache
        ↓
Matching observers receive updated results
```

Direct updates avoid an unnecessary request when the mutation response contains enough authoritative information.

They must still preserve data invariants. Invalidation is often simpler when the mutation response cannot safely update every affected cache entry.

---

## Query Invalidation

```ts
queryClient.invalidateQueries({
  queryKey: ['patients'],
})
```

```text
Matching queries are marked stale
        ↓
Active matching queries refetch by default
        ↓
Inactive matching queries remain stale
        ↓
They may fetch when later observed
```

Invalidation communicates:

> This cached data may no longer match its source.

---

## Query Cancellation

```ts
await queryClient.cancelQueries({
  queryKey: authQueryKeys.currentUser(),
})
```

Cancellation affects two related layers:

```text
cancelQueries()
→ cancels query state and reverts it by default

Query function consumes AbortSignal
→ underlying request can also be aborted
```

The query function must pass the supplied signal to the HTTP client:

```tsx
useQuery({
  queryKey: authQueryKeys.currentUser(),
  queryFn: ({ signal }) => getCurrentUser(signal),
})
```

```ts
async function getCurrentUser(
  signal: AbortSignal,
): Promise<AuthUser | null> {
  return api.get('/auth/current-user', { signal })
}
```

Authentication race example:

```text
Old current-user request starts
        ↓
Login succeeds
        ↓
Cancel old query and request
        ↓
Write authenticated user into cache
        ↓
Old request cannot replace the new state
```

---

## Query Client

For the general interaction role and the distinction between browser, API,
database, and library clients, see [Client](../computer-science-foundations/software-engineering/terminology/client.md).

`QueryClient` is TanStack Query's central client-side coordinator for query
state. It manages the Query Cache, Mutation Cache, and query coordination APIs.
It is not an HTTP client and does not replace `fetch` or an application's API
client; the query function is still responsible for performing the actual
request.

```text
React component
    ↓ useQuery(...)
QueryClient and Query Cache
    ↓ query function
API client or fetch
    ↓ HTTP request
Server
```

In a React application, one `QueryClient` is normally created for the
application and exposed through `QueryClientProvider`. `useQueryClient()` then
gives a component access to that same client instance.

```ts
const queryClient = useQueryClient()
```

Operations discussed include:

```text
cancelQueries()
setQueryData()
invalidateQueries()
removeQueries()
```

The Query Client provides imperative coordination APIs that connect mutations
and existing query state. It can update cache data after a mutation, mark data
stale, cancel matching query work, or remove cache entries. It does not make
the backend the source of truth disappear: cached data remains a synchronized
client-side representation of data owned by the server.

`gcTime` is one QueryClient cache policy. It controls how long an inactive
query remains in the Query Cache; it does not control freshness, request
timeouts, authentication duration, or JavaScript's own garbage collector. See
[`gcTime`](#gctime) for the full cache-lifetime explanation.

---

## Query Observer

A Query Observer observes one query and produces results for a consumer.

```text
One query cache entry
        ↓
May have multiple Query Observers
        ↓
Each observer produces a consumer result
```

```text
Query Cache
→ stores query state and data

Query Observer
→ observes one query and derives a result

React adapter
→ subscribes React to observer results
```

When query state changes, matching observers calculate updated results and notify their consumers when relevant observed properties change.

---

## Relationship to the Observer Pattern

TanStack Query uses an observer-based model.

```text
Query state
    ↓
Query Observer
    ↓
React component
```

The component does not poll the cache. It subscribes through `useQuery()` and reacts to relevant observer results.

---

## React Rendering and Subscription Scope

A simplified conceptual model is:

```tsx
function useSimplifiedQuery<T>(query: Query<T>): T {
  return useSyncExternalStore(
    (notifyReact) => query.subscribe(notifyReact),
    () => query.getCurrentValue(),
  )
}
```

This illustrates external-store subscription; it is not TanStack Query source code.

TanStack Query uses render optimizations including:

- Structural sharing to preserve unchanged data references.
- Tracking which query-result properties a component reads.
- `select` for subscribing to derived data.

Therefore, not every internal query-state change necessarily rerenders every consumer.

Focused selection example:

```tsx
const { data: patientCount } = useQuery({
  queryKey: ['patients'],
  queryFn: getPatients,
  select: (patients) => patients.length,
})
```

This consumer is interested in the count rather than the complete list value.

The top-level object returned by query hooks is not intended to be referentially stable, while its `data` is kept as stable as possible through structural sharing.

---

## Relationship to Reactive Programming

TanStack Query exhibits reactive behavior.

```text
Server-state cache changes
        ↓
Relevant observers receive new results
        ↓
Components react through rendering
```

However, TanStack Query is not a general-purpose Reactive Programming library. Its main responsibility is synchronizing asynchronous server state with consumers.

---

## Authentication Case Study

The following names are application-specific abstractions, not built-in TanStack Query APIs:

- `useCurrentUserSession()`.
- `authQueryKeys`.
- `isRestoring`.
- `requestLogin`.
- `requestLogout`.

The implementation combines one query and two mutations.

```text
useCurrentUserSession()
→ restores an existing current user

Login mutation
→ authenticates and stores the returned user

Logout mutation
→ requests logout and stores null
```

The shared cache entry is:

```ts
['auth', 'current-user']
```

### Current User Query

```tsx
const { data, isPending } = useQuery<AuthUser | null>({
  queryKey: authQueryKeys.currentUser(),
  queryFn: ({ signal }) => getCurrentUser(signal),
  retry: false,
  staleTime: 60_000,
})
```

```text
Application starts
        ↓
Current-user query runs
        ↓
Valid session exists
    ┌───┴───┐
   Yes      No
    ↓        ↓
AuthUser    null
```

```ts
return {
  user: data ?? null,
  isRestoring: isPending,
}
```

`isRestoring` is the application's name for the query's initial pending state.

### Login Mutation

```tsx
const loginMutation = useMutation({
  mutationFn: requestLogin,
  onSuccess: async (authenticatedUser) => {
    await queryClient.cancelQueries({
      queryKey: authQueryKeys.currentUser(),
    })

    queryClient.setQueryData<AuthUser | null>(
      authQueryKeys.currentUser(),
      authenticatedUser,
    )
  },
})
```

```text
Login succeeds
        ↓
Cancel current-user query
        ↓
Write authenticated user into cache
        ↓
Subscribed components receive updated state
```

### Logout Mutation

```tsx
const logoutMutation = useMutation({
  mutationFn: requestLogout,
  onSettled: async () => {
    await queryClient.cancelQueries({
      queryKey: authQueryKeys.currentUser(),
    })

    queryClient.setQueryData<AuthUser | null>(
      authQueryKeys.currentUser(),
      null,
    )
  },
})
```

`onSettled` runs after success or failure. Clearing the local current-user state in both cases is an intentional application policy, not a universal TanStack Query logout rule.

---

## Exposed Authentication Interface

The composed hook hides cache coordination from its consumers.

```ts
return {
  ...currentUserSession,
  isLoggingIn: loginMutation.isPending,
  isLoggingOut: logoutMutation.isPending,
  login: loginMutation.mutateAsync,
  logout: logoutMutation.mutateAsync,
}
```

Components receive:

```text
user
isRestoring
isLoggingIn
isLoggingOut
login()
logout()
```

They do not need to know about query keys, cancellation, direct cache updates, or mutation lifecycle callbacks.

---

## `mutateAsync`

`mutateAsync` exposes a mutation as a Promise-returning function.

```ts
login: (input: LoginInput) => Promise<AuthUser>
logout: () => Promise<void>
```

Consuming code can use:

```ts
await login(input)
```

TanStack Query continues to manage mutation state and lifecycle callbacks.

---

## Benefits and Trade-Offs

Potential benefits include:

- Shared asynchronous server-state coordination.
- Request deduplication for matching query work.
- Cache reuse and background synchronization.
- Consistent pending and error state.
- Targeted invalidation and direct updates.
- Observer-based integration with UI consumers.

Potential trade-offs include:

- Incorrect query keys can mix or fragment cached state.
- Aggressive invalidation can create unnecessary requests.
- Direct cache updates can violate data invariants when incomplete.
- Defaults such as immediate staleness can surprise new users.
- Server state and local UI workflow state still require separate ownership decisions.

---

## Why It Matters

Without a server-state library, components may repeatedly implement:

```text
Local data state
Loading state
Error state
Effects for fetching
Manual retries
Manual cache synchronization
Manual refetch triggers
```

TanStack Query centralizes these concerns:

```text
Query
→ reads and synchronizes server state

Mutation
→ performs state-changing operations

Query Cache
→ stores shared results

Query Observer
→ connects query state to consumers
```

---

## Key Takeaways

- TanStack Query is a library for asynchronous server-state synchronization.
- The examples in this document use its React adapter.
- Query keys identify cached query state and must include relevant inputs.
- `staleTime` controls freshness; `gcTime` controls inactive cache retention.
- Queries retry three times by default on the client and zero times during server rendering.
- Mutations commonly change server state and coordinate affected query caches.
- Invalidation marks matching queries stale and refetches active ones by default.
- Underlying network cancellation requires the query function to consume its `AbortSignal`.
- Query Observers connect query state to consumers.
- Structural sharing, tracked properties, and `select` reduce unnecessary rendering.
- Authentication hooks and query-key factories are application abstractions built on the library.

---

## Related Concepts

- [Frameworks, Libraries, and Tooling](README.md)
- [Software Taxonomy](../computer-science-foundations/software-engineering/software-taxonomy.md)
- [Reactive Programming](../computer-science-foundations/software-engineering/programming-paradigms/reactive-programming.md)
- [Observer Pattern](../computer-science-foundations/software-engineering/design-patterns/observer-pattern.md)
- [Request / Response](../computer-science-foundations/software-engineering/communication-patterns/request-response.md)
- [Publish / Subscribe](../computer-science-foundations/software-engineering/communication-patterns/publish-subscribe.md)
