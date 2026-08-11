# JSON Web Token

- **Field:** Cybersecurity
- **Area:** Identity and Access Management
- **Primary classification:** Security-token format and IETF standard
- **Related areas:** Authentication, authorization, protocol design, and
  cryptography

## Purpose

This document explains what a JSON Web Token (JWT) represents, how it is
protected, and how applications may use it as one part of an authentication or
authorization system.

## Definition

A JSON Web Token is a compact, URL-safe representation of claims transferred
between parties. RFC 7519 defines a JWT Claims Set as a JSON object carried in a
JSON Web Signature (JWS) structure, a JSON Web Encryption (JWE) structure, or a
nested combination of them.

JWT answers:

> How can a set of claims be represented in a compact, interoperable token?

It does not answer by itself:

- How was a user authenticated?
- What is the token allowed to authorize?
- Where should a client store the token?
- Must the application keep server-side session state?
- How should tokens be issued, refreshed, or revoked?

Those decisions belong to the surrounding security protocol and application.

## Concept Map

```text
Authentication
→ verifies an identity or credential

Authorization
→ decides whether an action is allowed

Access token, ID token, or another security token
→ has a role defined by a protocol

JWT
→ may provide the token's claims representation format

JWS or JWE
→ provides integrity protection, signing, or encryption
```

## Representation

The familiar three-segment form is a JWT represented as a compact JWS:

```text
JOSE Header . JWT Claims Set . JWS Signature
```

Example shape:

```text
xxxxx.yyyyy.zzzzz
```

Each segment uses base64url encoding. Encoding is not encryption: a party that
possesses a signed but unencrypted JWT can normally decode its header and
claims.

An encrypted compact JWE has five segments rather than three. Therefore,
"header, payload, signature" describes the common signed form, not every JWT.

## JOSE Header

The JOSE header describes the cryptographic operation and token metadata.

```json
{
  "alg": "RS256",
  "typ": "JWT"
}
```

Applications must not accept an algorithm merely because the token requests
it. The allowed algorithms and keys must come from trusted application or
protocol configuration.

## Claims

Claims are name-value statements in the JWT Claims Set.

```json
{
  "iss": "https://identity.example.com",
  "sub": "user-123",
  "aud": "clinic-api",
  "exp": 1785000000,
  "role": "admin"
}
```

Registered claims include:

| Claim | Meaning |
| --- | --- |
| `iss` | Issuer |
| `sub` | Subject |
| `aud` | Intended audience |
| `exp` | Expiration time |
| `nbf` | Not valid before |
| `iat` | Issued at |
| `jti` | JWT identifier |

RFC 7519 does not make every registered claim mandatory in every JWT.
Application-specific claims such as `role` or `email` need definitions in the
protocol or application that uses them.

## Protection with JWS and JWE

```text
JWS
→ provides a digital signature or message authentication code
→ protects integrity and authenticity when verified correctly

JWE
→ encrypts the claims
→ provides confidentiality when processed correctly
```

A valid signature does not mean that every claim should be trusted for every
purpose. The recipient must also validate the expected issuer, audience, token
kind, time constraints, algorithm, and other protocol-specific requirements.

The JWT specification defines an unsecured form, but security-sensitive
applications should reject unsecured JWTs unless an explicitly designed
protocol requires them. RFC 8725 provides current JWT implementation and
deployment guidance.

## One Authentication Example

JWT can be used as the format of an access token after authentication:

```text
User submits credentials
        ↓
Authorization server authenticates the user
        ↓
Server issues an access token represented as JWT
        ↓
Client presents the token to an API
        ↓
API validates the token and evaluates authorization
```

For example:

```http
GET /patients
Authorization: Bearer eyJhbGciOiJSUzI1NiIs...
```

The API may need to:

1. Confirm that this is the expected token kind.
2. Verify the configured signature algorithm and key.
3. Validate the issuer and intended audience.
4. Validate expiration and other applicable time constraints.
5. Apply authorization rules using validated claims and current context.

This is one application of JWT, not its definition.

## JWT and Protocol Token Roles

JWT describes a format. Access token, ID token, and refresh token describe
roles within security protocols.

```text
Access token
→ credential presented to a protected resource
→ may be JWT or another format

OpenID Connect ID token
→ communicates authentication information to a client
→ represented as JWT by the protocol

Refresh token
→ credential used to obtain new access tokens
→ not inherently JWT
```

OAuth 2.0 does not require every access token to be a JWT. RFC 9068 defines a
specific interoperable profile for OAuth 2.0 access tokens that are JWTs.

## JWT and Server State

JWT is sometimes described as "stateless authentication," but the format does
not determine whether the surrounding system stores state.

An application can validate a signed JWT locally without looking up a stored
session for every request. It may still maintain state for:

- token revocation;
- logout and device sessions;
- refresh-token rotation;
- account disabling;
- authorization changes;
- replay detection; or
- signing-key lifecycle.

```text
JWT validation without a session lookup
→ possible design choice

Completely stateless identity system
→ not guaranteed by using JWT
```

## Storage and Transport

JWT does not prescribe client storage or transport.

### Web Storage

A token in `localStorage` is readable by JavaScript running in the same origin.
An XSS vulnerability may therefore expose it for copying and reuse.

### HttpOnly Cookie

The `HttpOnly` attribute prevents browser scripts from reading the cookie
through non-HTTP APIs. `Secure` limits it to secure transport, and `SameSite`
controls when it is attached to certain cross-site requests.

Because browsers attach matching cookies automatically, cookie-based
credentials require deliberate cross-site request and origin protections.
`HttpOnly` reduces direct credential theft through JavaScript but does not
eliminate XSS, CSRF, or requests performed from a compromised page.

### Contextual Choice

```text
Web storage
→ explicit header attachment
→ credential readable by same-origin JavaScript

HttpOnly cookie
→ automatic browser attachment
→ credential hidden from JavaScript
→ cookie scope and cross-site request behavior must be designed
```

There is no universally secure storage choice independent of application
architecture, threats, client type, and protocol.

## JWT Compared with a Server-Side Session

| Concern | JWT used with local validation | Server-side session |
| --- | --- | --- |
| Client credential | JWT | Usually an opaque session identifier |
| Request validation | Cryptographic and claim validation | Session lookup |
| Server state | Optional but commonly still present | Session record is maintained |
| Immediate revocation | Requires additional design | Usually straightforward |
| Claim freshness | Can remain stale until token replacement | Can be read from current state |

This comparison describes two common designs. JWT and session are not strict
opposites: a JWT can participate in a stateful session architecture.

## Benefits

- Compact, interoperable claims representation.
- Standard registered claim names.
- Can support validation across service boundaries.
- Can be signed, integrity-protected, encrypted, or nested.
- Widely supported by security protocols and libraries.

## Risks and Trade-Offs

- Incorrect validation can make a structurally valid token unsafe.
- Signed claims are visible unless encryption is also used.
- Claims can become stale.
- Revocation and logout require explicit lifecycle design.
- A stolen bearer token may be usable until it expires or is rejected.
- Different JWT kinds can be confused unless validation rules distinguish them.

## Common Misconceptions

- JWT is not itself an authentication method.
- JWT is not necessarily an access token.
- Not every access token is a JWT.
- A JWT is not necessarily encrypted.
- JWT does not automatically eliminate server-side state.
- A signature does not make arbitrary claims appropriate for authorization.
- Cookie versus web-storage safety cannot be decided without the threat model.

## Key Takeaways

- JWT is a compact claims representation format standardized by RFC 7519.
- JWS and JWE provide the cryptographic protection around JWT claims.
- Authentication, authorization, token role, storage, and revocation belong to
  the surrounding system.
- Validation must enforce trusted algorithms, keys, issuers, audiences, token
  kinds, and applicable time constraints.
- Use RFC 8725 when designing or reviewing a JWT deployment.

## Authoritative References

- [RFC 7519: JSON Web Token](https://www.rfc-editor.org/info/rfc7519/)
- [RFC 8725: JSON Web Token Best Current Practices](https://www.rfc-editor.org/info/rfc8725/)
- [RFC 9068: JWT Profile for OAuth 2.0 Access Tokens](https://www.rfc-editor.org/info/rfc9068/)
- [RFC 10025: Cookies](https://www.rfc-editor.org/info/rfc10025)
- [OpenID Connect Core 1.0](https://openid.net/specs/openid-connect-core-1_0.html)

## Related Concepts

- [Identity and Access Management](./)
- [Authentication](authentication.md)
- [Security](../)
