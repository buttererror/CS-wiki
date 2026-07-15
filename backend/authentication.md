# Authentication Architecture for Web and Mobile Applications

## Taxonomy

* **Domain:** Software Engineering
* **Category:** Application Security
* **Subcategory:** Authentication Architecture
* **Document Type:** Learning Material
* **Scope:** Browser applications, mobile applications, token storage, and future client support
* **Status:** Active Reference

---

## Context

When adding authentication to a browser-based application, several design decisions must be made:

* How should users prove their identity?
* Where should authentication credentials or tokens be stored?
* How should authenticated requests reach the backend?
* Should the authentication system support only the current web application?
* What happens if a mobile application, desktop application, or public API is added later?

A common early decision is whether to store a JSON Web Token, or JWT, in browser `localStorage` or send it through an HTTP-only cookie.

This decision should not be based only on which implementation is easiest. It should consider the client type, security risks, future applications, and the responsibilities of the backend.

---

## Core Concept

Authentication should be separated into two concerns:

1. **Authentication logic**
2. **Credential transport and storage**

Authentication logic answers questions such as:

* Does the user exist?
* Is the submitted password correct?
* What is the user’s role?
* Is the token valid?
* Is the user allowed to access this protected route?

Credential transport and storage answer different questions:

* Where does the browser keep the credential?
* How does a mobile application store its token?
* Does the browser send a cookie automatically?
* Does a client send an `Authorization` header?
* Can frontend JavaScript read the credential?

The same backend authentication foundation can support multiple clients even when each client stores and sends credentials differently.

Conceptually:

```txt
User credentials
↓
Backend verifies identity
↓
Backend creates an authenticated session or token
↓
Client stores and sends the credential appropriately
↓
Backend guard verifies the credential
↓
Protected resource becomes accessible
```

The long-term architecture should share authentication logic while allowing different credential transport mechanisms.

---

## Practical Explanation

### Browser-Based Web Applications

A browser-based web application usually contains:

```txt
Browser frontend
+
Backend API
+
Database
```

Examples include:

* Administrative dashboards
* Customer portals
* Project-management systems
* E-commerce administration tools
* Internal business applications
* Software-as-a-Service products

A common browser authentication flow is:

```txt
User submits email and password
↓
Backend verifies credentials
↓
Backend creates a session or JWT
↓
Backend places it in an HTTP-only cookie
↓
Browser automatically sends the cookie with future requests
↓
Backend verifies the cookie
↓
Protected routes become available
```

This approach works naturally in browsers because cookies are part of the browser’s HTTP behavior.

---

### JWT Stored in localStorage

A frontend can store a JWT in `localStorage`:

```ts
localStorage.setItem("accessToken", token);
```

The frontend can later read the token:

```ts
const token = localStorage.getItem("accessToken");
```

It can then attach the token to API requests:

```ts
fetch("/api/orders", {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
```

This approach is easy to understand and implement, but the token is readable by any JavaScript executing within the same browser origin.

That creates the following risk:

```txt
Authentication token in localStorage
↓
Frontend JavaScript can read it
↓
Injected malicious JavaScript can also read it
↓
Token may be copied to an attacker
↓
Attacker may reuse the token until it expires or is revoked
```

The relevant threat is cross-site scripting, commonly abbreviated as XSS.

If an attacker manages to execute JavaScript inside the application, the attacker may access data stored in:

* `localStorage`
* `sessionStorage`
* JavaScript variables
* Non-HTTP-only cookies

The issue is not that `localStorage` is inherently broken. The issue is that it is not designed as secure credential storage.

---

### HTTP-Only Cookies

An HTTP-only cookie is created by the backend using a response header.

Conceptually:

```http
Set-Cookie: access_token=...; HttpOnly; Secure; SameSite=Lax
```

Important attributes include:

* `HttpOnly`
* `Secure`
* `SameSite`
* An appropriate expiration time
* An appropriate domain and path

#### `HttpOnly`

Prevents frontend JavaScript from reading the cookie directly.

This reduces the risk of an XSS vulnerability directly stealing the authentication credential.

#### `Secure`

Instructs the browser to send the cookie only over HTTPS.

This should be enabled in production.

#### `SameSite`

Controls when the browser sends the cookie with cross-site requests.

It can help reduce cross-site request forgery risks, depending on the application’s architecture and deployment.

With an HTTP-only cookie:

```txt
Backend creates authentication cookie
↓
Browser stores cookie
↓
Frontend JavaScript cannot directly read it
↓
Browser sends it automatically with matching requests
↓
Backend verifies it
```

This is generally a better security baseline for a browser-based application that handles sensitive or private data.

---

### HTTP-Only Cookies Do Not Eliminate Every Risk

An HTTP-only cookie improves protection against token theft through JavaScript, but it does not solve every security problem.

Cookie-based authentication may still require careful handling of:

* Cross-site request forgery
* Cross-origin resource sharing
* Allowed frontend origins
* Cookie domains
* Same-site behavior
* HTTPS
* Token expiration
* Logout and invalidation
* Refresh-token rotation
* Compromised user devices

Security should be treated as layers rather than a single configuration option.

---

## Other Types of Applications

Not every application behaves like a browser-based web application.

Different client types may require different credential transport and storage mechanisms.

### Mobile Applications

Examples:

* Native iOS applications
* Native Android applications
* React Native applications
* Flutter applications

A mobile application commonly uses:

```txt
Mobile login request
↓
Backend verifies credentials
↓
Backend returns access token
↓
Mobile app stores token in secure device storage
↓
Mobile app sends Authorization header
↓
Backend verifies bearer token
```

Typical secure storage mechanisms include:

* iOS Keychain
* Android Keystore
* Encrypted device preferences
* React Native Keychain
* Expo SecureStore

The request commonly includes:

```http
Authorization: Bearer <access-token>
```

A mobile application should not store authentication tokens in ordinary unprotected application storage when secure device storage is available.

---

### Desktop Applications

Examples:

* Electron applications
* Tauri applications
* Native Windows applications
* Native macOS applications
* Native Linux applications

Desktop clients may use:

* Operating-system credential managers
* Encrypted local storage
* Browser-based OAuth flows
* Bearer tokens
* Device authorization flows

Desktop authentication should account for the fact that the application runs on a user-controlled machine.

---

### Command-Line Applications

Examples:

* Deployment tools
* Cloud-service command-line interfaces
* Database administration tools
* Internal automation tools

A command-line application may authenticate using:

* Personal access tokens
* Device authorization
* API keys
* OAuth tokens
* Operating-system credential stores

It normally sends credentials through request headers rather than browser cookies.

---

### Server-to-Server Applications

Examples:

* Background workers
* Scheduled jobs
* Internal microservices
* Payment processors
* Reporting services
* External integrations

There is no interactive browser session.

Common approaches include:

* OAuth client credentials
* Service accounts
* Signed requests
* API keys
* Mutual TLS
* Short-lived service tokens
* Webhook signatures

These credentials represent software systems rather than individual browser sessions.

---

### Public API Clients

A public API may be consumed by:

* Partner companies
* Customer integrations
* Automation scripts
* Mobile applications
* Third-party developers

Such clients usually use bearer tokens, API keys, or OAuth rather than browser cookie sessions.

A backend designed exclusively around browser cookies may become difficult to reuse for these clients.

---

## Generic Example

Consider an order-management product with the following current architecture:

```txt
React administrative dashboard
↓
Node.js backend API
↓
Relational database
```

The current requirement is to authenticate staff members who use the browser dashboard.

A suitable web flow is:

```txt
Staff member submits credentials
↓
Backend verifies password
↓
Backend creates signed JWT
↓
JWT is placed in HTTP-only cookie
↓
Browser sends cookie with order API requests
↓
Backend authentication guard verifies JWT
```

Later, the company may release a mobile application for warehouse employees.

The mobile application could use:

```txt
Warehouse employee submits credentials
↓
Backend verifies password using the same authentication service
↓
Backend returns an access token
↓
Mobile app stores token in device secure storage
↓
Mobile app sends bearer token
↓
Backend guard verifies the same token format
```

The following parts remain shared:

* User database model
* Password hashing
* Login validation
* Role information
* Token creation
* Token verification
* Authorization rules
* Authenticated user representation

The following parts differ:

* Where the client stores the credential
* How the client sends the credential
* Whether the browser handles the credential automatically
* Whether the client uses a cookie or an authorization header

This means mobile support is added to the authentication foundation rather than replacing it.

---

## Designing the Backend for Multiple Clients

The backend should avoid tightly coupling authentication verification to one client type.

A restrictive implementation might read tokens only from cookies:

```ts
const token = request.cookies.accessToken;
```

That works for a browser but may not support a mobile or public API client.

A more flexible token extraction strategy can support multiple sources:

```txt
Check HTTP-only cookie
↓
If no cookie exists, check Authorization header
↓
Extract token
↓
Verify token using one shared verification service
↓
Attach authenticated user to request
```

Conceptually:

```ts
function extractToken(request: Request): string | undefined {
  return (
    request.cookies?.accessToken ??
    extractBearerToken(request.headers.authorization)
  );
}
```

The token verification logic should remain separate:

```ts
function verifyAccessToken(token: string): AuthenticatedUser {
  // Verify signature, expiration, and payload.
}
```

This separation avoids duplicating authentication logic for each client.

---

## Authentication and Authorization

Authentication and authorization are related but different.

### Authentication

Answers:

> Who is the user?

Examples:

* Verify email and password
* Validate session
* Validate JWT
* Load authenticated user

### Authorization

Answers:

> What is the authenticated user allowed to do?

Examples:

* Administrators can manage users
* Editors can update content
* Viewers can only read records
* Warehouse users can update inventory
* Customers can only view their own orders

A minimal authentication foundation may store a role without immediately implementing a full permissions system.

For example:

```txt
User
├── id
├── email
├── passwordHash
└── role
```

An early version may support only:

```txt
ADMIN
```

A later version may add:

```txt
ADMIN
MANAGER
STAFF
VIEWER
```

Adding a role field early can create a clean extension point. Building a complete dynamic permission matrix before real permission requirements exist is usually unnecessary.

---

## User Management

Authentication does not require a complete user-management interface.

An early application can create the first user using:

* A seed script
* A controlled command-line script
* A database migration or initialization step
* An administrator-only internal process

For example:

```txt
Environment variables
↓
Seed script
↓
Password is hashed
↓
Administrator user is created or updated
```

This is enough to validate:

* Login
* Logout
* Protected API routes
* Protected frontend routes
* Role data
* Authentication errors

A user-management interface becomes valuable when the application needs:

* Multiple real users
* User invitations
* Account disabling
* Role changes
* Password resets
* Audit history
* Staff onboarding
* Staff offboarding

Creating users manually during the first authentication phase is a reasonable MVP decision when only one or a small number of controlled users are required.

---

## Token Payload Design

A token payload should contain only the information needed for authentication and common authorization decisions.

Example:

```ts
type AccessTokenPayload = {
  sub: string;
  email: string;
  role: string;
};
```

Where:

* `sub` identifies the user
* `email` may support identification or display
* `role` supports basic authorization

Avoid placing sensitive or frequently changing information in the token, such as:

* Password hashes
* Private personal information
* Large permission objects
* Secret configuration
* Full user profiles
* Sensitive business data

Tokens are signed, but they are not necessarily encrypted.

A client that possesses a JWT can usually decode its payload even if it cannot modify it without invalidating the signature.

---

## Access Tokens and Refresh Tokens

A simple MVP may begin with one short-lived access token.

A more advanced system may use:

```txt
Short-lived access token
+
Longer-lived refresh token
```

The access token is used for API requests.

The refresh token is used to obtain a new access token without asking the user to sign in again.

Refresh tokens introduce additional concerns:

* Rotation
* Reuse detection
* Revocation
* Device sessions
* Secure storage
* Logout behavior
* Compromised-token recovery

They should not be added automatically simply because they are common in mature systems.

They become useful when the application needs:

* Longer user sessions
* Mobile application sessions
* Multiple devices
* Stronger token-expiration policies
* Session revocation
* Better recovery from access-token theft

For a small administrative MVP, a simple authenticated session or limited-lifetime cookie may be enough initially.

---

## Tradeoffs

### JWT in localStorage

#### Benefits

* Simple frontend implementation
* Easy to inspect during development
* Easy to attach to `Authorization` headers
* Works naturally across many API clients
* Does not require automatic browser cookie behavior

#### Costs

* Readable by frontend JavaScript
* Can be stolen if malicious JavaScript executes
* Requires frontend code to manage token attachment
* Requires explicit token cleanup during logout
* Provides a weaker default for sensitive browser applications

---

### JWT in HTTP-Only Cookie

#### Benefits

* Not directly readable by frontend JavaScript
* Better protection against JavaScript-based token theft
* Automatically included by the browser
* Natural fit for browser sessions
* Good default for sensitive administrative applications

#### Costs

* Requires cookie configuration
* Requires careful cross-origin configuration
* May require CSRF defenses
* Browser behavior must be considered during development and deployment
* Mobile and non-browser clients need an additional bearer-token mechanism

---

### Server-Side Session

A backend can store session data in a database or cache and give the browser only a session identifier.

#### Benefits

* Sessions can be revoked centrally
* Sensitive session data stays on the server
* Session lifecycle can be controlled precisely
* Good fit for traditional browser applications

#### Costs

* Requires session storage
* Requires session cleanup
* Adds infrastructure when scaling across servers
* Mobile and public API clients may still require token-based alternatives

---

### Supporting Cookies and Bearer Tokens

#### Benefits

* Supports browser and non-browser clients
* Reuses authentication logic
* Avoids future authentication replacement
* Provides appropriate storage for each client type

#### Costs

* More token extraction paths
* More test cases
* Security policy must remain consistent
* The backend must avoid ambiguous credential precedence
* Documentation must explain which client uses which method

---

### Building Full User Management Immediately

#### Benefits

* Administrators can manage users from the product
* Roles can be changed without database access
* Better operational experience

#### Costs

* Adds frontend and backend scope
* Requires additional authorization
* Introduces invitations, validation, and account lifecycle concerns
* Delays the primary product workflow
* May solve needs that do not exist yet

---

## Recommended Decision

For a browser-based application that handles private or sensitive data:

```txt
Use an HTTP-only secure cookie for the web authentication credential.
```

Design the backend authentication layer so it can later accept:

```txt
Authorization: Bearer <token>
```

for mobile, desktop, CLI, and public API clients.

The recommended architecture is:

```txt
Shared user model
+
Shared password verification
+
Shared token creation
+
Shared token verification
+
Multiple credential extraction methods
```

For example:

```txt
Web browser
→ HTTP-only cookie

Mobile application
→ Secure device storage + bearer token

Server integration
→ Service credential or OAuth token
```

Do not store the web application’s long-term authentication token in `localStorage` merely because it is easier to implement.

Do not implement mobile-specific authentication flows before a mobile client exists.

Prepare extension points without building unused infrastructure.

---

## What to Build Now

For a minimal browser authentication foundation, build:

### User Model

Include:

```txt
id
email
passwordHash
role
createdAt
updatedAt
```

### Password Security

Implement:

* Password hashing
* Password comparison
* No plain-text password storage
* Environment-based initial credentials

### Initial User Creation

Use:

* Seed script
* Idempotent user creation
* Hashed password
* Environment variables

### Login Endpoint

Implement:

* Input validation
* Credential verification
* Generic invalid-credentials response
* Authenticated user response without password hash

### Authentication Credential

For the browser:

* Signed access token or session identifier
* HTTP-only cookie
* `Secure` in production
* Appropriate `SameSite`
* Limited expiration

### Authentication Guard

Implement:

* Credential extraction
* Token or session verification
* Authenticated user attachment
* Unauthorized response when credentials are missing or invalid

Structure it so bearer-token extraction can be added cleanly or supported with minimal additional code.

### Protected Routes

Protect the application’s private APIs.

Keep intentionally public routes separate, such as:

* Login
* Health check
* Public documentation, when applicable

### Frontend Authentication

Implement:

* Login page
* Login error state
* Authenticated application state
* Protected frontend routes
* Logout behavior
* Requests configured to include cookies

### Minimal Tests

Cover:

* Successful login
* Invalid login
* Protected route without credentials
* Protected route with valid credentials
* Logout or credential removal
* Frontend redirect for unauthenticated users

---

## What to Defer

Defer the following until real requirements exist:

* Public registration
* User-management interface
* User invitation flow
* Email verification
* Forgot-password flow
* Password-reset flow
* Multiple active device sessions
* Refresh-token rotation
* Session revocation dashboard
* Mobile-specific login responses
* Social login
* OAuth identity providers
* Fine-grained permission matrices
* Custom permissions per user
* Role-management interface
* API-key management
* Service accounts
* Audit-log interface
* Biometric login
* Multi-factor authentication

Some of these features may eventually be necessary, especially for sensitive or regulated systems. Deferring them means delaying their implementation until product requirements justify the complexity, not deciding that they will never be built.

---

## Final Decision Rule

Use the authentication mechanism that matches the client:

```txt
Browser application
→ HTTP-only secure cookie

Mobile or desktop application
→ Secure device storage + bearer token

Command-line or public API client
→ Bearer token, API key, OAuth, or device flow

Server-to-server integration
→ Service credentials, signed requests, or OAuth client credentials
```

Keep authentication logic independent from credential transport.

Build the secure browser flow needed today.

Prepare the backend to accept another credential source later.

Do not build the future client before it exists.

The final rule is:

> Share identity verification and authorization logic across clients, but use the credential storage and transport mechanism appropriate for each client environment.
