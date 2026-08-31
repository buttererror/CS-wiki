# WHATWG HTML & DOM Living Standards

## Definition & Origins

The **WHATWG** (Web Hypertext Application Technology Working Group) is the standards organization responsible for maintaining the fundamental building blocks of the web platform: **HTML**, the **DOM (Document Object Model)**, and related browser APIs.

It was founded in 2004 by engineers from Apple, Mozilla, and Opera in response to the slow pace of the W3C's transition to XHTML. In 2019, the W3C and WHATWG signed a formal agreement designating the WHATWG Living Standards as the single authoritative source for HTML and DOM specifications.

---

## The "Living Standard" Model

Unlike traditional standards that release numbered snapshots (such as HTML 4.01 or HTML5), the WHATWG operates as a **Living Standard**:

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│ WHATWG Living Standard Model                                                │
│                                                                             │
│  [Continuous Development] ──► [Browser Consensus] ──► [Live Specification]  │
│                                                                             │
│  • There is no "HTML6" or "DOM4".                                           │
│  • The specification updates continuously as new capabilities are tested    │
│    and implemented by browser engine maintainers.                           │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Core Specifications Maintained by WHATWG

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│ Specification       │ Key Capabilities & Web Platform APIs                  │
├─────────────────────┼───────────────────────────────────────────────────────┤
│ HTML                │ • Semantic markup (<dialog>, <nav>, <main>, <form>)   │
│ Living Standard     │ • Native modal overlay lifecycles (.showModal())      │
│                     │ • Custom Elements & Web Components lifecycle callbacks│
│                     │ • Client-side form validation constraints             │
├─────────────────────┼───────────────────────────────────────────────────────┤
│ DOM                 │ • Node, Element, and Document object hierarchies      │
│ Standard            │ • Event dispatch model (bubbling, capturing, passive) │
│                     │ • MutationObserver and TreeWalker APIs                │
├─────────────────────┼───────────────────────────────────────────────────────┤
│ Fetch Standard      │ • Promise-based network fetching (fetch(), Request,   │
│                     │   Response, Headers, AbortController/AbortSignal)     │
├─────────────────────┼───────────────────────────────────────────────────────┤
│ Storage & Messaging │ • Web Storage (localStorage, sessionStorage)          │
│                     │ • BroadcastChannel and MessageChannel cross-tab comms │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## The DOM Standard: Event Dispatch Pipeline

The DOM Standard specifies the exact 3-phase event dispatch mechanism implemented by all browser engines:

```text
               Window
                 │ 1. Capture Phase (window ──► Target)
                 ▼
              Document
                 │
                 ▼
             HTMLBody
                 │
                 ▼
      [Target Element: <button>] ──► 2. Target Phase (Executes listener)
                 │
                 ▼ 3. Bubble Phase (Target ──► window)
              HTMLBody
                 │
                 ▼
              Document
```

---

## Relationship to Application Engineering

1. **Semantic Foundation:** Using native WHATWG elements (such as `<dialog>` instead of `<div>`) gives applications built-in keyboard trapping, top-layer rendering, and accessibility semantics without custom JavaScript workarounds.
2. **Network Resilience:** The Fetch standard's `AbortSignal.timeout()` and `AbortController` provide standardized request cancellation and resource management across frontend and backend JavaScript runtimes.

---

## Related Documents

- [Standards Governance & Adoption](README.md)
- [W3C CSS Specifications](w3c-css.md)
- [W3C WAI Specifications](w3c-wai.md)
- [Browser Runtime](../browser-runtime/)
- [Rendering](../rendering/)
