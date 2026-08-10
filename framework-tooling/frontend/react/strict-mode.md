# React Strict Mode

**Keywords:** `StrictMode`, React Strict Mode, twice, API called twice, duplicate request, double rendering, re-run Effects, `useEffect`, Effect cleanup

## Purpose

React Strict Mode is a development-time diagnostic wrapper. It deliberately
repeats selected React work so that impure rendering and incomplete Effect
cleanup are easier to notice before production.

```tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

Strict Mode does not change the production build's behavior in the same way.
It is a diagnostic tool, not a request cache or a production feature flag.

## Why An API Can Be Called Twice

On an initial development mount, Strict Mode performs an extra Effect
setup-and-cleanup cycle. If an Effect starts a fetch, both setups can start a
real request:

```tsx
useEffect(() => {
  fetchPatients()

  return () => {
    // Clean up work owned by this Effect.
  }
}, [])
```

The simplified sequence is:

```text
First Effect setup
→ fetchPatients() sends request 1

First Effect cleanup

Second Effect setup
→ fetchPatients() sends request 2
```

Therefore, seeing two identical requests immediately after a development page
load can be expected when the component is inside root-level Strict Mode.
It does not by itself prove that the application has a production bug.

## Cleanup Does Not Always Cancel The Request

An Effect cleanup must undo or stop work that the Effect owns. For network
requests, these are different actions:

- **Ignore an obsolete result:** prevent an older response from updating state.
- **Cancel the request:** use an `AbortController` and pass its `signal` to a
  request API that supports cancellation.

```tsx
useEffect(() => {
  const controller = new AbortController()

  fetch('/api/patients', { signal: controller.signal })
    .then((response) => response.json())
    .then((patients) => {
      // Update state only while this request is still relevant.
    })

  return () => controller.abort()
}, [])
```

Ignoring the first result can protect UI state, but it does not erase a request
that already reached the server. This is why a server log can still show two
requests even when the UI uses a guard against stale responses. See
[Stale-Response Races and Server-State Ownership](stale-response-races.md) for
the request-ordering problem and the boundary between query-owned server data
and UI workflow state.

## Distinguish Expected And Real Duplicates

| Observation | Likely explanation |
|---|---|
| Two identical requests only on the first development mount | Root-level Strict Mode's extra Effect cycle |
| One new request after an Effect dependency changes | Normal Effect synchronization |
| One new request after a mutation, refresh, or invalidation | Intentional data refetch |
| Repeated requests in a production build without a relevant state change | Investigate duplicate mounting, dependencies, event handlers, retries, or another caller |

Use the browser Network panel to compare request timing, URL, method, and
initiator. Then trace the owning Effect or query function before changing code.

## Practical Rule

Do not remove Strict Mode merely to hide duplicate development requests. Keep
the diagnostic check, make Effects safe to repeat, and give request ownership
to an appropriate layer. A server-state library can cache, deduplicate, and
cancel query work when configured and used correctly, but it does not replace
understanding the Effect lifecycle.

## Related Concepts

- [Effects and External Synchronization](effects-and-external-synchronization.md)
- [Stale-Response Races and Server-State Ownership](stale-response-races.md)
- [Rendering Model](rendering-model.md)
- [TanStack Query](../../tanstack-query.md)

## Sources

- [React: `<StrictMode>`](https://react.dev/reference/react/StrictMode)
- [React: Synchronizing with Effects](https://react.dev/learn/synchronizing-with-effects)
