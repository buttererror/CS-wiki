# Standards Governance & Adoption

## Purpose & Overview

The open Web Platform is not owned by any single corporation, browser vendor, or government. Instead, it is an interoperable ecosystem governed by voluntary, consensus-driven international **Standards Organizations**.

These bodies publish technical specifications that define how browser rendering engines (Chromium/Blink, Gecko, WebKit), JavaScript runtimes (V8, SpiderMonkey, JavaScriptCore, Node.js), and network clients must parse, execute, render, and secure web content.

---

## The Five Governing Standards Bodies

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│ 1. TC39 / Ecma International (ECMA-262)                                    │
│    • Standardizes the core JavaScript language syntax, types, and semantics.│
│    • Deliverable: Yearly ECMAScript Specification snapshots (ES2023, ES2024)│
│    • See: [TC39 ECMAScript Process](tc39-ecmascript.md)                     │
├─────────────────────────────────────────────────────────────────────────────┤
│ 2. WHATWG (Web Hypertext Application Technology Working Group)              │
│    • Maintains the living specs for the document tree and browser platform. │
│    • Deliverables: HTML Living Standard, DOM Standard, Fetch, Web Storage.  │
│    • See: [WHATWG HTML & DOM Living Standards](whatwg-html-dom.md)          │
├─────────────────────────────────────────────────────────────────────────────┤
│ 3. W3C CSS Working Group (World Wide Web Consortium)                        │
│    • Standardizes styling, layout engines, typography, and visual rendering.│
│    • Deliverables: CSS Grid, Flexbox, Cascading, Units, and Top Layer.      │
│    • See: [W3C CSS Specifications](w3c-css.md)                              │
├─────────────────────────────────────────────────────────────────────────────┤
│ 4. W3C WAI (Web Accessibility Initiative)                                   │
│    • Standardizes human accessibility and assistive technology interfaces.  │
│    • Deliverables: WCAG (Web Content Accessibility Guidelines), WAI-ARIA.   │
│    • See: [W3C WAI Specifications](w3c-wai.md) & [Accessibility](accessibility/)
├─────────────────────────────────────────────────────────────────────────────┤
│ 5. IETF (Internet Engineering Task Force)                                   │
│    • Standardizes the underlying network transport and protocol layer.      │
│    • Deliverables: RFCs for HTTP/1.1, HTTP/2, HTTP/3, TLS, and Cookies.     │
│    • See: [IETF Web Protocols & Cookies](ietf-web-protocols.md)             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Standards Lifecycles: Living Standards vs. Formal RFCs vs. Stage Proposals

Different organizations use different governance and publication models:

```text
┌─────────────────────────┬─────────────────────────┬─────────────────────────┐
│ Standards Body          │ Governance Model        │ Publication Mechanism   │
├─────────────────────────┼─────────────────────────┼─────────────────────────┤
│ WHATWG                  │ Living Standard         │ Continuous commits with │
│                         │ (No fixed version num)  │ browser vendor consensus│
├─────────────────────────┼─────────────────────────┼─────────────────────────┤
│ TC39                    │ 5-Stage Proposal Process│ Yearly snapshots        │
│                         │ (Stage 0 through 4)     │ (ECMA-262 yearly spec)  │
├─────────────────────────┼─────────────────────────┼─────────────────────────┤
│ W3C                     │ Recommendation Track    │ Working Draft (WD) ──►  │
│                         │ (Formal W3C Rec)        │ Candidate Rec (CR) ──►  │
│                         │                         │ Proposed Rec ──► Rec    │
├─────────────────────────┼─────────────────────────┼─────────────────────────┤
│ IETF                    │ RFC Standard Track      │ Internet-Draft ──►      │
│                         │ (Request for Comments)  │ Proposed Standard ──►   │
│                         │                         │ Internet Standard (STD) │
└─────────────────────────┴─────────────────────────┴─────────────────────────┘
```

---

## How Browsers Adopt Standards

Before a feature becomes safe for production use across all browsers, it passes through three stages:

1. **Experimental Implementation:** A browser vendor implements the feature behind a runtime flag or origin trial (e.g. `chrome://flags` or Chromium Canary).
2. **Multi-Engine Consensus:** At least two major browser engine teams (Chromium, WebKit, Gecko) commit to implementing the specification to prevent proprietary vendor lock-in.
3. **Web Platform Baseline:** Feature reaches **Baseline** status (widely supported across all modern mobile and desktop browsers), making polyfills unnecessary.

---

## Document Index

- [WHATWG HTML & DOM Living Standards](whatwg-html-dom.md)
- [W3C CSS Specifications](w3c-css.md)
- [W3C WAI Specifications](w3c-wai.md)
- [TC39 ECMAScript Process](tc39-ecmascript.md)
- [IETF Web Protocols & Cookies](ietf-web-protocols.md)
- [Web Accessibility Domain (a11y)](accessibility/)
  - [Accessibility Overview](accessibility/)
  - [WCAG — Web Content Accessibility Guidelines](accessibility/wcag.md)

---

## Related Areas

- [Browser Runtime](../browser-runtime/)
- [Rendering](../rendering/)
- [JavaScript Language Foundations](../../computer-science-foundations/programming-languages/javascript/)
