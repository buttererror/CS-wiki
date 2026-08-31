# TC39 ECMAScript Process

## Definition & Committee

**TC39** (Technical Committee 39) is the standardization committee within **Ecma International** responsible for maintaining and evolving the **ECMAScript** language specification (**ECMA-262**), the official technical standard underlying JavaScript.

TC39 consists of delegates from major browser vendors (Google, Apple, Mozilla, Microsoft), runtime maintainers (Node.js, Deno), software companies, and independent open-source contributors who meet every two months to review language proposals.

---

## The 5-Stage Proposal Process

Every new language feature must progress through a rigorous consensus-based pipeline before becoming part of the official ECMAScript standard:

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│ The TC39 Proposal Lifecycle                                                 │
│                                                                             │
│ [Stage 0: Strawman]                                                         │
│   • Free-form idea or problem statement submitted by a TC39 member.         │
│         │                                                                   │
│         ▼                                                                   │
│ [Stage 1: Proposal]                                                         │
│   • Formal champion identified; outlines the problem, high-level API shape, │
│     and cross-cutting concerns.                                             │
│         │                                                                   │
│         ▼                                                                   │
│ [Stage 2: Draft]                                                            │
│   • Precise formal specification text written in Ecmarkup.                  │
│         │                                                                   │
│         ▼                                                                   │
│ [Stage 3: Candidate]                                                        │
│   • Complete specification; designates feature ready for real-world engine  │
│     implementations behind flags and Web Platform tests.                    │
│         │                                                                   │
│         ▼                                                                   │
│ [Stage 4: Finished]                                                         │
│   • Passed Test262 conformance suite and shipped in at least two major      │
│     engines. Feature is scheduled for the next annual ECMAScript snapshot. │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Annual Release Cycle & Test262

Since 2015 (ES6 / ECMAScript 2015), TC39 operates on a fixed **annual release schedule**:

- Every summer, all features that reached **Stage 4** in the preceding 12 months are frozen into a new numbered edition (e.g. ES2023, ES2024).
- **Test262:** The official ECMAScript conformance test suite. JavaScript engines (V8, SpiderMonkey, JavaScriptCore) must pass thousands of automated Test262 test cases to claim compliance.

---

## Language Core vs. Host Environment Boundary

A fundamental concept in software architecture is that **TC39 standardizes the language core, NOT the browser host environment**:

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│ Standardized by TC39 (ECMA-262)                                             │
│ • Syntax, execution contexts, lexical environments                          │
│ • Closures, functions, objects, prototype chains                            │
│ • Promises, async/await, Array methods, Map/Set, Symbols                    │
│ • Behave IDENTICALLY in Browsers, Node.js, Cloudflare Workers, and Deno.    │
├─────────────────────────────────────────────────────────────────────────────┤
│ Standardized by WHATWG / W3C (Host Platform APIs)                           │
│ • window, document, <dialog>, DOM events, CSSOM                             │
│ • fetch(), localStorage, setTimeout(), Canvas, WebSockets                   │
│ • Executed inside the host environment using the JavaScript engine.         │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Deep Dive into JavaScript Language Foundations

For complete guides on JavaScript language semantics:

- [JavaScript Language Foundations](../../computer-science-foundations/programming-languages/javascript/)
- [Closures & Lexical Scopes](../../computer-science-foundations/programming-languages/javascript/closures.md)
- [Prototypes & Prototypal Inheritance](../../computer-science-foundations/programming-languages/javascript/prototypes.md)

---

## Related Documents

- [Standards Governance & Adoption](README.md)
- [WHATWG HTML & DOM Living Standards](whatwg-html-dom.md)
- [IETF Web Protocols & Cookies](ietf-web-protocols.md)
