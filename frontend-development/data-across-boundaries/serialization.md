# Serialization Across Boundaries

## Purpose

Serialization converts supported runtime data into a representation that can
cross a boundary such as a network, process, storage system, or server/client
interface. Deserialization reconstructs usable runtime values from that
representation.

## Runtime Value versus Representation

```text
Live runtime value
        ↓ serialize
Transferable or persistent representation
        ↓ transmit or store
Representation at destination
        ↓ deserialize
New runtime value
```

The reconstructed value is not necessarily identical to the original object.
Object identity, prototypes, functions, closures, private resources, and other
runtime-specific behavior may not survive the boundary.

## JSON Example

```js
const value = {
  id: 'order-42',
  total: 125,
}

const text = JSON.stringify(value)
const restored = JSON.parse(text)

console.log(restored === value) // false
```

## Serialization Is Format-Specific

“Serializable” does not have one universal meaning. It depends on the protocol
or algorithm.

- JSON supports a limited set of data shapes and has special behavior for
  values such as `undefined`, `Date`, `BigInt`, functions, and cycles.
- The browser's structured clone algorithm supports a different set of values.
- Framework wire formats may encode information that plain JSON does not.
- Binary formats define their own schemas and supported types.

Always ask: **Serializable by which mechanism, for which destination?**

## Frontend Boundaries

Serialization appears when data crosses:

- an HTTP or WebSocket connection;
- browser storage;
- a worker boundary;
- a server/client component boundary;
- an HTML document or embedded data script; or
- a framework-specific rendering protocol.

The amount and shape of serialized data affect transfer size, parsing cost,
security exposure, and compatibility.

## Relationship to Server Rendering

Server rendering can produce HTML without serializing all server runtime state.
If the browser needs data to reproduce initial output or continue interaction,
the architecture must provide that data in a client-readable form.

Only cross the data that the client needs. Server-only credentials, database
connections, and privileged objects must not be serialized into client output.

## Relationship to Hydration

```text
Serialization → How does data cross the boundary?
Hydration → How does client behavior attach to existing markup?
```

They often cooperate, but they are separate mechanisms.

## Design Questions

- Which values must cross the boundary?
- What representation and schema will be used?
- Can the destination safely trust the data?
- Are unsupported values transformed explicitly?
- How are versions and compatibility handled?
- Is the payload larger than the client actually needs?
- Could sensitive information be exposed?

## Related Concepts

- [Browser Runtime](../browser-runtime/README.md)
- [Server and Client Rendering](../rendering/server-and-client-rendering.md)
- [Hydration](../rendering/hydration.md)
- [React Application Delivery](../../framework-tooling/frontend/react-application-delivery/README.md)

