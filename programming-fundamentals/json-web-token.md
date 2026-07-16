# JWT (JSON Web Token)

## Primary Category
Programming Fundamentals → Authentication and authorization are fundamental concepts used by applications to identify users and protect resources.

## Taxonomy Classification

- **Field:** Security
- **Area:** Authentication & Authorization
- **Level:** System-level

## Related Concepts

- Authentication
- Authorization
- Session
- Cookie
- Access Token
- Refresh Token
- OAuth 2.0

---

# Definition

A **JWT (JSON Web Token)** is a compact, cryptographically signed token that allows a server to prove a user's identity without storing session state on the server.

Think of it as a **tamper-proof identity card** issued after a successful login.

JWT is defined by **RFC 7519**.

---

# Structure

A JWT consists of three parts:

```
Header.Payload.Signature
```

Example:

```
xxxxx.yyyyy.zzzzz
```

## 1. Header

Contains metadata about the token.

Example:

```json
{
  "alg": "HS256",
  "typ": "JWT"
}
```

- `alg` → Signing algorithm
- `typ` → Token type

---

## 2. Payload

Contains claims (information).

Example:

```json
{
  "sub": "123",
  "email": "mahmoud@example.com",
  "role": "admin",
  "exp": 1785000000
}
```

Common claims:

- `sub` → User ID
- `email`
- `role`
- `exp` → Expiration time

---

## 3. Signature

Generated using:

- Header
- Payload
- Secret key (or private key)

The signature ensures that the token cannot be modified without detection.

---

# Authentication Flow

```
User
 │
 │ Login (email + password)
 ▼
Backend
 │
 │ Verify credentials
 ▼
Generate JWT
 │
 ▼
Return JWT
 │
 ▼
Browser stores JWT
 │
 │
 │ Every request:
 │ Authorization: Bearer <JWT>
 ▼
Backend verifies signature
 │
 ▼
Request is authenticated
```

---

# Example

## Login

```http
POST /login
```

Response:

```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIs..."
}
```

---

## Authenticated Request

```http
GET /patients
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
```

The backend:

1. Reads the token.
2. Verifies the signature.
3. Checks whether it has expired.
4. Extracts the user information.
5. Allows the request.

---

# Why JWT Is Called Stateless

## Session Authentication

```
User
    │
Session ID
    │
Server
    │
Looks up session in database/Redis
```

The server must remember every active session.

---

## JWT Authentication

```
User
    │
JWT
    │
Server
    │
Verifies signature
```

The server does **not** need to store session data because the token already contains the required identity information.

---

# Advantages

- Stateless authentication
- Easy to scale across multiple servers
- Works well with REST APIs
- No server-side session storage
- Widely supported across frameworks and languages

---

# Disadvantages

If a JWT is stolen, it can be used until it expires.

For this reason, where the token is stored is critical.

---

# Token Storage

## Less Secure

```
localStorage
```

JavaScript can access it, making it vulnerable to XSS attacks.

---

## More Secure

```
HttpOnly Cookie
```

JavaScript cannot access the cookie, significantly reducing the risk of token theft through XSS.

This is why HTTP-only cookies are generally recommended for traditional web applications.

---

# JWT vs Session

| Session | JWT |
|---------|-----|
| Server stores session | Client stores token |
| Requires session storage | Stateless |
| Cookie usually stores only a session ID | Token stores user claims |
| Easy to revoke immediately | Harder to revoke before expiration |
| Common for traditional web applications | Common for APIs and mobile applications |

---

# Common Misconception

JWT is **not** the authentication method.

Authentication happens when the server verifies the user's credentials (such as email and password).

JWT is simply the credential issued **after authentication** to prove the user's identity in subsequent requests.

---

# Mental Model

Imagine an airport:

1. You show your passport (email and password).
2. Security verifies your identity.
3. They issue a boarding pass (JWT).
4. At every checkpoint, you present the boarding pass instead of your passport again.
5. Staff verify that the boarding pass is genuine before allowing you to continue.

The boarding pass is proof that you have already been authenticated.

---

# Relationships to Other Areas

- **Authentication** → JWT is issued after successful authentication.
- **Authorization** → Claims inside the JWT (such as roles or permissions) can determine what resources the user may access.
- **HTTP Cookies** → JWT can be stored inside secure HTTP-only cookies.
- **OAuth 2.0 / OpenID Connect** → JWT is commonly used as the access or ID token.
- **Cryptography** → JWT relies on digital signatures to detect tampering.

---

# Why It Matters

JWT has become one of the most common mechanisms for securing modern web APIs.

Understanding JWT is essential for building authentication systems in:

- REST APIs
- Single Page Applications (SPAs)
- Mobile applications
- Microservices
- Distributed systems

---

# Key Takeaways

- JWT stands for **JSON Web Token**.
- It is a signed token that proves a user's identity.
- It consists of a **Header**, **Payload**, and **Signature**.
- The server validates the token instead of looking up a stored session.
- JWT itself is **not authentication**; it is the credential issued after authentication.
- For web applications, storing JWTs in **HTTP-only cookies** is generally more secure than storing them in `localStorage`.
