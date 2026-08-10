# Stale-Response Races and Server-State Ownership in React

**Keywords:** stale-response race, stale response, race condition, out-of-order response, obsolete response, request ordering, `AbortController`, `AbortSignal`, server state, query cache, two sources of truth, `keepPreviousData`

## Purpose

A **stale-response race** happens when more than one asynchronous request is
in flight for changing UI inputs and an older request finishes after a newer
one. If both responses can write to the same displayed state, the older result
can incorrectly replace the newer one.

This page explains that request-ordering problem and a related ownership rule:
when a server-state library such as [TanStack Query](../../tanstack-query.md)
owns a list result, its cache should normally remain the component's source of
that result. Copying the result into a reducer creates a second owner.

## The Race

Imagine a patient-list screen whose search input changes twice:

```text
Search: "mo"   → request A starts
Search: "mona" → request B starts

request B finishes first → show results for "mona"
request A finishes later → stale result for "mo" overwrites the screen
```

Starting order does not determine completion order. Networks, servers, caches,
and retries can make an earlier request resolve later. The problem is not that
two requests exist; it is allowing an obsolete response to update state that
now represents newer inputs.

This differs from [Strict Mode](strict-mode.md), which can deliberately repeat
an Effect during development. Strict Mode may make duplicate requests visible,
but a stale-response race can happen in production whenever relevant inputs
change while an earlier request is still pending.

## Manual Effect and Reducer Ownership

Without a server-state library, an Effect that loads a list often needs to
track whether its response is still relevant:

```tsx
useEffect(() => {
  let isCurrent = true

  fetchPatients(search).then((patients) => {
    if (isCurrent) {
      dispatch({ type: 'patientsLoaded', patients })
    }
  })

  return () => {
    isCurrent = false
  }
}, [search])
```

The guard prevents the stale response from dispatching after `search` changes.
It does not cancel a request that has already reached the server. Passing an
`AbortSignal` to a request API can attempt to cancel the underlying request:

```tsx
useEffect(() => {
  const controller = new AbortController()

  fetchPatients(search, { signal: controller.signal })
  return () => controller.abort()
}, [search])
```

Both patterns are valid when the component deliberately owns the request
lifecycle. They also show why manual fetching needs careful cleanup, error
handling, and state-transition design.

## Keep Query Results in the Query Cache

With TanStack Query, give every server input a query key and render the query
result directly:

```tsx
const patientsQuery = useQuery({
  queryKey: ['patients', { search, page }],
  queryFn: ({ signal }) => getPatients({ search, page }, signal),
})
```

```text
UI workflow state: search, page, selected row, open dialog
        ↓
query key identifies the server-state request
        ↓
TanStack Query cache owns data, fetching state, and error state
        ↓
component renders the current query result
```

The key must include every value the query function uses. That lets the query
cache keep requests for different inputs distinct. If the query function
consumes the supplied `AbortSignal`, TanStack Query can also abort query work
when it becomes obsolete or inactive. See [Query Cancellation](https://tanstack.com/query/latest/docs/framework/react/guides/query-cancellation).

## Why Not Copy `query.data` into a Reducer?

This pattern creates two sources of truth for the same list:

```tsx
const patientsQuery = useQuery(/* ... */)

useEffect(() => {
  if (patientsQuery.data) {
    dispatch({ type: 'patientsLoaded', patients: patientsQuery.data })
  }
}, [patientsQuery.data])
```

The query cache and reducer can now disagree. The application also has to
restore work that the query layer already performs:

| Extra ownership | Consequence |
| --- | --- |
| Cache result and reducer list both represent the data | One can update while the other remains stale. |
| Effects and dispatches copy query transitions into the reducer | More synchronization code and more possible ordering bugs. |
| Reducer receives asynchronous request results | The page must again guard against stale responses and model loading/error transitions. |
| UI renders the reducer copy instead of the query result | Cache reuse, invalidation, and prior-data behavior no longer reach the screen directly. |

For paginated data, TanStack Query can keep the previous successful result
visible while the next page loads with `placeholderData: keepPreviousData`.
If the reducer owns a separate displayed copy, it must reproduce that behavior
with additional actions and synchronization. See [Paginated / Lagged Queries](https://tanstack.com/query/latest/docs/framework/react/guides/paginated-queries).

Updating the query cache with `queryClient.setQueryData(...)` is different:
the cache remains the single owner. It is useful when a mutation response
contains enough authoritative data to update that cache entry directly.

## Practical Ownership Boundary

Keep these responsibilities separate:

| State | Typical owner |
| --- | --- |
| API list, request status, query error, cached page data | TanStack Query cache and query observer |
| Draft search text, selected page, selected row, dialog visibility, form workflow | Component state or a reducer |
| Values derived from the current query result | Render-time calculation |

This is not a rule against reducers. A reducer is useful for coordinated UI
workflow state. The rule is to avoid making it a mirror of server data already
owned by the query cache.

## Practical Rule

When a server-state library owns a request, let its query result drive the UI.
Keep the reducer focused on UI workflow state that the query does not own. If
manual Effects own fetching instead, explicitly handle cleanup and obsolete
responses.

## Related Concepts

- [Effects and External Synchronization](effects-and-external-synchronization.md)
- [Strict Mode](strict-mode.md)
- [Debouncing](debouncing.md)
- [State and Updates](state-and-updates.md)
- [TanStack Query](../../tanstack-query.md)

## Sources

- [React: Synchronizing with Effects](https://react.dev/learn/synchronizing-with-effects)
- [TanStack Query: Query Cancellation](https://tanstack.com/query/latest/docs/framework/react/guides/query-cancellation)
- [TanStack Query: Paginated / Lagged Queries](https://tanstack.com/query/latest/docs/framework/react/guides/paginated-queries)
