# Post-Authentication Redirects

**Keywords:** post-authentication redirect, post-login redirect, return-to flow, return URL, intended destination, protected route, route guard, authentication-aware navigation, `returnTo`, `location.state`, open redirect.

A post-authentication redirect returns a user to the internal page they first
requested after they successfully sign in. It is a navigation-continuation
pattern: authentication interrupts access, and the application resumes the
original destination once the required session exists.

## Scope And Boundary

This is a frontend user-experience pattern, not proof of access control.

```text
Frontend route protection
→ guides an unauthenticated user to sign in

Backend authorization
→ must still reject every request that lacks a valid credential or permission
```

A user must never gain backend access merely because the frontend redirects to
a page after login.

## Core Flow

```text
User requests an internal destination
        ↓
The application determines that authentication is required
        ↓
Navigate to sign-in and preserve the intended destination
        ↓
Sign-in succeeds and session state is confirmed
        ↓
Navigate to the preserved destination, or to a safe default
```

For example:

```text
/orders/42?tab=history
        ↓ unauthenticated
/login
        ↓ successful sign-in
/orders/42?tab=history
```

The preserved value is often called a **return-to destination**, **intended
destination**, or **post-login redirect target**.

## What To Preserve

Preserve enough of the internal location to resume the user's task:

- `pathname` identifies the page.
- `search` preserves query parameters such as filters, tabs, or pagination.
- `hash` preserves an in-page target when it has user-facing meaning.

Always provide a fallback such as `/dashboard`. A direct visit to `/login` has
no prior protected destination to resume.

## Where To Store The Destination

### Navigation State

Client-side routers often attach transient state to the navigation history
entry. This keeps the return destination out of the visible URL and works well
for one browser session in a single-page application.

It is navigation context, not a durable identity record or a replacement for
server-side session state.

### Query Parameter

A query parameter such as `/login?returnTo=%2Forders%2F42` can survive a link,
page reload, or a redirect through another page. It is useful when the value
must travel visibly through the URL, but it must be treated as untrusted input.

### Server-Side State

Some flows need the server to retain the return destination, especially when
authentication leaves the application and comes back through an identity
provider. The server must bind that state to the correct browser flow and
validate it when it returns.

## Safety Rules

- Redirect only to allowed internal destinations or an allowlist of trusted
  origins.
- Reject or ignore external-looking values such as `https://attacker.example`.
- Reject protocol-relative values such as `//attacker.example`; they begin with
  `/` but can be interpreted as a different origin by URL-aware code.
- Preserve the destination only after deciding that it requires authentication.
- Use a safe fallback when the saved state is missing, malformed, expired, or
  not allowed.
- Avoid redirect loops: sign-in and other intentionally public pages must not
  redirect back to themselves.
- Do not redirect before the application has finished determining whether a
  current session exists. Show a loading state while that check is pending.

These checks prevent an **open redirect**, where attacker-controlled input
causes a trusted application to send the user to an unsafe destination.

## Framework-Neutral Pseudocode

```text
when user requests destination:
  if session is still being checked:
    show loading state
  else if user is not authenticated:
    navigate to sign-in with returnTo = current internal location
  else:
    render destination

after successful sign-in:
  destination = validated returnTo or safe default
  replace the sign-in history entry with destination
```

Replacing the history entry is usually preferable. Otherwise, the browser's
Back button can return to the sign-in screen immediately after sign-in.

## React Router Implementation

React itself does not define routing. In a React application using React
Router, a protected-route component can store the current router location
while navigating to the login route:

```tsx
import { Navigate, useLocation } from 'react-router-dom'

function ProtectedRoute() {
  const location = useLocation()

  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
        state={
          {
            from: location,
          }
        }
      />
    )
  }

  return <Outlet />
}
```

The `state` prop receives router navigation state. `from` is an
application-defined property name; React Router does not reserve it.

The login page reads that state after authentication succeeds, preserves the
path, query string, and hash, then navigates to a safe fallback when there is
no return location:

```tsx
import { useLocation, useNavigate } from 'react-router-dom'

type LoginNavigationState = {
  from?: {
    pathname?: string
    search?: string
    hash?: string
  }
}

function LoginPage() {
  const location = useLocation()
  const navigate = useNavigate()

  const from = (location.state as LoginNavigationState | null)?.from
  const pathname = from?.pathname
  const isInternalPath =
    typeof pathname === 'string' &&
    pathname.startsWith('/') &&
    !pathname.startsWith('//')

  const returnTo = isInternalPath
    ? `${pathname}${from?.search ?? ''}${from?.hash ?? ''}`
    : '/dashboard'

  async function handleSubmit() {
    await signIn()
    navigate(returnTo, { replace: true })
  }
}
```

The type assertion documents the state shape expected by the page; it does not
perform runtime validation. The `isInternalPath` check is the runtime decision
that prevents an external-looking destination from being used.

Other routers and frameworks implement the same flow with different APIs. The
important design remains the same: preserve a validated internal destination,
wait for authentication to finish, and resume the user's task.

## Related Concepts

- [Authentication and Credential Architecture](../../security/identity-and-access-management/authentication.md)
- [Frontend Development](../README.md)
- [React](../../framework-tooling/frontend/react/README.md)
