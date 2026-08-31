# IETF Web Protocols & Cookies

## Definition & Mission

The **IETF** (Internet Engineering Task Force) is the premier open international standards organization responsible for designing and standardizing the core networking protocols that power the Internet.

IETF standards are published as **RFCs** (Request for Comments). In frontend and full-stack web engineering, IETF specifications govern how data travels across the wire, how secure connections are negotiated, and how client authentication state is preserved.

---

## The Evolution of HTTP: From 1.1 to HTTP/3

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│ 1. HTTP/1.1 (RFC 9112 / RFC 7230)                                           │
│    • Plaintext message formatting, pipelining, and persistent TCP links.    │
│    • Bottleneck: Head-of-Line (HoL) blocking on single TCP streams.         │
├─────────────────────────────────────────────────────────────────────────────┤
│ 2. HTTP/2 (RFC 9113 / RFC 7540)                                             │
│    • Binary framing layer over a single TCP connection.                     │
│    • Full stream multiplexing, request prioritization, HPACK compression.  │
├─────────────────────────────────────────────────────────────────────────────┤
│ 3. HTTP/3 & QUIC (RFC 9114 / RFC 9000)                                      │
│    • Replaces TCP with QUIC (a UDP-based multiplexed transport protocol).   │
│    • Eliminates TCP Head-of-Line blocking across packet loss.               │
│    • Built-in TLS 1.3 encryption with 0-RTT connection resumption.          │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## State Management: HTTP Cookies (RFC 6265 & RFC 6265bis)

Because HTTP is a stateless protocol, client session state is managed via the `Set-Cookie` and `Cookie` headers defined by **RFC 6265**:

```http
Set-Cookie: sessionId=abc123xyz; Path=/; Secure; HttpOnly; SameSite=Lax; Max-Age=604800
```

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│ Cookie Security Attributes (RFC 6265)                                       │
├───────────────────┬─────────────────────────────────────────────────────────┤
│ Attribute         │ Security & Operational Guarantee                        │
├───────────────────┼─────────────────────────────────────────────────────────┤
│ HttpOnly          │ Prevents client-side JavaScript (document.cookie) from  │
│                   │ reading the token, mitigating Cross-Site Scripting (XSS)│
├───────────────────┼─────────────────────────────────────────────────────────┤
│ Secure            │ Restricts transmission strictly over encrypted TLS/HTTPS│
├───────────────────┼─────────────────────────────────────────────────────────┤
│ SameSite=Strict   │ Never sends cookie on cross-site requests.              │
├───────────────────┼─────────────────────────────────────────────────────────┤
│ SameSite=Lax      │ Sends cookie only on top-level safe GET navigations;    │
│                   │ defends against Cross-Site Request Forgery (CSRF).      │
├───────────────────┼─────────────────────────────────────────────────────────┤
│ SameSite=None     │ Permits third-party iframe/API contexts (requires Secure│
├───────────────────┼─────────────────────────────────────────────────────────┤
│ Max-Age / Expires │ Defines cookie lifetime; omitting creates a session     │
│                   │ cookie cleared on browser exit.                         │
└───────────────────┴─────────────────────────────────────────────────────────┘
```

---

## Additional Web Protocols Maintained by IETF

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│ Protocol            │ RFC        │ Purpose in Web Engineering               │
├─────────────────────┼────────────┼──────────────────────────────────────────┤
│ WebSockets          │ RFC 6455   │ Full-duplex persistent bidirectional TCP │
│                     │            │ channel initiated via HTTP Upgrade.      │
├─────────────────────┼────────────┼──────────────────────────────────────────┤
│ TLS 1.3             │ RFC 8446   │ Modern cryptographic transport security, │
│                     │            │ forward secrecy, and certificate handling│
├─────────────────────┼────────────┼──────────────────────────────────────────┤
│ URI / URL           │ RFC 3986   │ Uniform Resource Identifier syntax and   │
│                     │            │ percent-encoding rules.                  │
└─────────────────────┴────────────┴──────────────────────────────────────────┘
```

---

## Related Documents

- [Standards Governance & Adoption](README.md)
- [WHATWG HTML & DOM Living Standards](whatwg-html-dom.md)
- [Security Foundations](../../security/)
