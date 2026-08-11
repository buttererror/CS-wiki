# Route Map

**Keywords:** route map, route-map, mocked routes, mock fetch routes, responder
map, response map, route lookup, request lookup, HTTP method and URL,
`responders[method + url]`

## Definition

In application and test code, **route map** is a descriptive term for a lookup
that associates route identifiers with handlers, components, or responses.

It is technical shorthand, not slang, but it is not one universally fixed
pattern name. Its exact meaning depends on context. More formal alternatives
include **route table**, **routing configuration**, **lookup table**, or
**request-to-response map**.

## Route Map in an HTTP Test

A fetch test helper can map an HTTP method and URL to a response factory:

```js
const apiUrl = 'http://localhost:3000'

const responders = {
  [`GET ${apiUrl}/auth/me`]: () =>
    new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 }),
  [`POST ${apiUrl}/auth/login`]: () =>
    new Response(JSON.stringify({ user: { id: 'user-1' } })),
}
```

Conceptually:

```text
Route lookup key
│
├── GET http://localhost:3000/auth/me
│   └── 401 response factory
│
└── POST http://localhost:3000/auth/login
    └── successful response factory
```

When the mocked HTTP client receives a request, it constructs the same lookup
key:

```js
const method = options?.method ?? 'GET'
const url = input.toString()
const responder = responders[`${method} ${url}`]
```

The route is not extracted from the object. The caller supplies `input` and
`options` to the mocked function; the helper combines their URL and method,
then looks up the matching property.

```text
fetch(url, options)
    ↓ mock receives the same arguments
method + " " + url
    ↓ property lookup
matching response factory
    ↓ call
fresh Response
```

Including the HTTP method distinguishes routes that share a URL:

```text
GET  /users → list users
POST /users → create a user
```

## Why the Values Are Functions

Response bodies are consumable streams. A response factory creates a fresh
`Response` each time the same route is requested:

```js
const responders = {
  'GET /users': () => new Response('[]'),
}

const firstResponse = responders['GET /users']()
const secondResponse = responders['GET /users']()
```

The lookup stores behavior for producing a response, not one response object
that every call must reuse.

## Object Versus `Map`

The word “map” describes the key-to-value relationship; it does not require a
JavaScript `Map` instance.

This is an ordinary object used as a map:

```js
const responders = {
  'GET /users': createUsersResponse,
}
```

This models the same relationship with `Map`:

```js
const responders = new Map([
  ['GET /users', createUsersResponse],
])

const responder = responders.get('GET /users')
```

See [JavaScript `Set`, `Map`, and `Object`](../../programming-languages/javascript/set-map-and-object.md)
for the data-structure trade-offs.

## Other Meanings

“Route map” can refer to other route-related lookups:

- a frontend router configuration mapping URL paths to page components;
- a backend router mapping methods and paths to request handlers; or
- a networking vendor's route-map configuration for routing-policy rules.

These meanings are related by the general idea of matching route information
to behavior, but their implementations and disciplines are different. State
the context when the phrase could be ambiguous.

## Final Takeaway

A route map is a lookup from a route identifier to the behavior associated
with that route. In an HTTP test helper, a useful key is usually the HTTP
method plus URL, and the value is often a factory that returns a fresh fake
response.

## Related Concepts

- [Software Engineering Terminology](./)
- [JavaScript `Set`, `Map`, and `Object`](../../programming-languages/javascript/set-map-and-object.md)
- [Request / Response](../communication-patterns/request-response.md)
- [Client](client.md)
