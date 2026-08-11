# Identity and Access Management

## Purpose

Identity and Access Management (IAM) concerns how systems represent identities,
establish who or what is interacting with them, and control access to protected
resources.

## Concept Map

```text
Identity and Access Management
│
├── Identity
│   └── representation of a person, service, or device
│
├── Authentication
│   └── establishes confidence in an asserted identity
│
├── Authorization
│   └── decides which actions are permitted
│
├── Credentials, Sessions, and Tokens
│   └── carry or reference security state and claims
│
├── Identity Lifecycle
│   └── provisioning, recovery, suspension, and removal
│
└── Federation
    └── trust and identity exchange across security domains
```

These concerns interact but are not synonyms.

## Authentication and Authorization

```text
Authentication
→ Who or what is interacting with the system?

Authorization
→ Is this authenticated or otherwise identified principal allowed
  to perform this action on this resource in this context?
```

Authentication does not automatically grant permission. Authorization may use
identity, roles, attributes, ownership, relationships, resource state, and
other contextual information.

## Credentials, Tokens, and Formats

```text
Credential
→ evidence presented to establish or exercise authority

Security token
→ credential or artifact with a protocol-defined role

JSON Web Token
→ one standardized format for representing claims
```

A token role and its representation format are separate. For example, an
access token may use JWT or an opaque format.

## Current Documents

- [Authentication](authentication.md) — client-aware authentication,
  credential storage, transport, sessions, and authorization boundaries.
- [JSON Web Token](json-web-token.md) — the JWT claims format, JWS/JWE
  protection, protocol roles, validation, storage, and state trade-offs.

## Future Topics

- Authorization models.
- Sessions and lifecycle management.
- Password and credential security.
- OAuth 2.0 and OpenID Connect.
- Multi-factor and passwordless authentication.
- Service identities and workload authentication.
- Identity provisioning and account recovery.

## Related Concepts

- [Security](../)
- [Software System Design](../../system-design/software-system-design/)
- [Communication Patterns](../../computer-science-foundations/software-engineering/communication-patterns/)
