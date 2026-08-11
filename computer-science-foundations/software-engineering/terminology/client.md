# Client

## Purpose

This document defines how the term **client** is used across the knowledge
base. It distinguishes the general interaction role from client libraries,
client–server architecture, browser clients, API clients, database clients,
and TanStack Query's `QueryClient`.

---

## Definition

A client is a participant that initiates use of a capability supplied by
another participant, system, or abstraction.

In the common request–response sense:

```text
Client
    ↓ sends a request
Server
    ↓ processes the request and returns a response
Client
    ↓ uses the response
```

Client and server are **roles in one interaction**, not permanent properties
of a whole application. A service that receives one request may act as a
client when it sends another request to a database, payment provider, or
downstream service.

---

## Client as a General Role

The term is broader than browsers and HTTP:

| Client form | Capability it uses |
| --- | --- |
| Browser or mobile application | Web pages, HTTP APIs, and browser-managed platform features |
| Service-to-service caller | Another service's API or message endpoint |
| Command-line client | A command or protocol exposed by another process |
| Database client | Database query and mutation capability |
| Library client | A controlled programmatic interface to another subsystem |

The provider may be remote, in another process, or represented by a local
library abstraction. The useful question is:

> Which participant initiates use, and which capability is being used?

---

## Client Libraries and Client Objects

A **client library** or **client object** is code that gives application code a
controlled interface for using another capability. It commonly hides details
such as transport, connection handling, request construction, authentication,
serialization, retries, or cache coordination.

Examples:

| Client object | Main responsibility |
| --- | --- |
| API client | Builds HTTP requests and interprets responses |
| `PrismaClient` | Exposes typed database query and mutation operations |
| `QueryClient` | Coordinates TanStack Query's query cache, mutation cache, and query operations |

The word **client** does not promise that the object directly performs network
I/O. Its exact responsibility depends on the abstraction it represents.

---

## `QueryClient` Qualification

`QueryClient` is TanStack Query's central client-side coordinator for cached
server state. It manages query and mutation state and exposes operations such
as `setQueryData`, `invalidateQueries`, `cancelQueries`, and `removeQueries`.

It is **not** an HTTP client and does not replace `fetch` or an application's
API client. A query function performs the actual request:

```text
React component
    ↓ useQuery(...)
QueryClient and Query Cache
    ↓ query function
API client or fetch
    ↓ HTTP request
Server
```

The browser application is the network client in its interaction with the
server. `QueryClient` is a client object within that application, responsible
for coordinating its cached representation of server-owned data.

For the full TanStack Query model, including freshness and `gcTime`, see
[TanStack Query](../../../framework-tooling/tanstack-query.md).

---

## Relationship to Client–Server Architecture

**Client–Server** is an architectural style that organizes interactions around
clients requesting capabilities from servers. **Client** alone is a recurring
interaction role that can appear within that style or inside other
architectures.

```text
Client
→ interaction role

Client–Server
→ architectural style organized around that relationship
```

A client can also participate in message-based, peer-to-peer, or local
in-process interactions. The word does not by itself identify the protocol,
transport, deployment topology, or architectural style.

---

## Key Takeaways

- A client initiates use of a capability supplied by another participant or
  abstraction.
- Client and server are roles relative to a particular interaction; one system
  can perform both roles in different interactions.
- A client library is a controlled interface for using a capability, not
  necessarily a direct network caller.
- `QueryClient` coordinates TanStack Query state and cache behavior; query
  functions, API clients, or `fetch` perform network requests.
- Client–Server is an architectural style; client is one role used within it.

---

## Related Concepts

- [Software Engineering Terminology](./)
- [Request / Response](../communication-patterns/request-response.md)
- [Software Architecture](../software-architecture.md)
- [Frameworks, Libraries, and Tooling](../../../framework-tooling/)
- [TanStack Query](../../../framework-tooling/tanstack-query.md)
- [Server and Client Rendering](../../../frontend-development/rendering/server-and-client-rendering.md)
