# Web Accessibility (a11y)

## Purpose & Overview

**Web Accessibility** (commonly abbreviated as **a11y**—representing "a" followed by 11 letters and "y") is the discipline of designing, engineering, and testing web applications so that they are fully usable by everyone, regardless of physical, sensory, cognitive, or situational constraints.

In modern frontend architecture, accessibility is not an optional post-launch add-on or aesthetic theme; it is a **core engineering requirement** enforced through semantic HTML, the browser's internal **Accessibility Tree**, keyboard focus lifecycles, and international W3C standards.

---

## The Dual-Tree Architecture: DOM vs. Accessibility Tree

When a browser renders a web page, it creates two parallel object graphs:

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│ 1. Document Object Model (DOM Tree)                                         │
│    • Contains: <div>, <button>, <span>, <dialog>, style nodes               │
│    • Consumed by: CSS engine (styling), JavaScript engine (events/behavior) │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │
                                       ▼ Browser Engine Translation
┌─────────────────────────────────────────────────────────────────────────────┐
│ 2. Accessibility Tree (A11y Tree / AOM)                                     │
│    • Strips presentational styling (colors, layout floats, wrapper divs)    │
│    • Computes 4 core properties for every interactive node:                 │
│        1. Role: (e.g. 'button', 'dialog', 'navigation', 'link')             │
│        2. Name: (e.g. 'Open navigation menu', 'Patients', 'Close')          │
│        3. State: (e.g. 'expanded: true', 'checked', 'current: page')        │
│        4. Value: (e.g. '50%', '$120.00', 'admin@clinic.test')               │
│    • Consumed by: Assistive Technologies (Screen Readers, Braille, Switch)  │
└─────────────────────────────────────────────────────────────────────────────┘
```

If developers build UI using generic `<div>` tags without semantic roles or accessible names, the visual DOM may look complete to sighted mouse users, but the **Accessibility Tree remains empty or broken**, rendering the application unusable for assistive software.

---

## Assistive Technologies & User Modalities

Accessibility ensures seamless operation across diverse human modalities:

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│ Modality            │ Assistive Tool / Input Method │ Engineering Guard     │
├─────────────────────┼───────────────────────────────┼───────────────────────┤
│ Blind / Low Vision  │ Screen Readers (NVDA, Voice-  │ Semantic HTML, ARIA,  │
│                     │ Over, JAWS), Braille Displays │ Text Alternatives     │
├─────────────────────┼───────────────────────────────┼───────────────────────┤
│ Motor Disabilities  │ Keyboard only (Tab/Enter),    │ Focus management,     │
│                     │ Switch devices, Sip-and-puff  │ Visible focus rings   │
├─────────────────────┼───────────────────────────────┼───────────────────────┤
│ Low Vision / Aging  │ Screen magnifiers, High-      │ 4.5:1 Color contrast, │
│                     │ contrast modes, Zoom 200%+    │ Fluid responsive REMs │
├─────────────────────┼───────────────────────────────┼───────────────────────┤
│ Cognitive           │ Clear visual layouts, plain   │ Predictable navigation│
│                     │ language, consistent icons    │ Error descriptions    │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Core Pillars of Accessible Web Engineering

1. **Semantic HTML as the Baseline:** Native HTML elements (`<button>`, `<dialog>`, `<nav>`, `<input>`) carry built-in keyboard handling, roles, and browser Top Layer support for free.
2. **Keyboard Ergonomics & Focus Management:**
   - Every interactive element must be reachable via `Tab` or Arrow keys.
   - Modals must trap focus inside while open and return focus to their trigger upon dismissal ([WCAG 2.4.3 Focus Order](wcag.md#wcag-243-focus-order-level-a)).
   - Focus indicators must remain clearly visible ([WCAG 2.4.7 Focus Visible](wcag.md#wcag-247-focus-visible-level-aa)).
3. **WAI-ARIA Metadata:** Used as a bridge when native HTML is insufficient to express dynamic states (`aria-expanded="true"`, `aria-current="page"`, `aria-describedby="error-id"`).
4. **Automated & Integration Testing:** Modern frontend testing libraries (such as React Testing Library) query the DOM via the Accessibility Tree (`screen.getByRole('button', { name: 'Save' })`), proving that accessibility semantics are functional on every build.

---

## Document Index

- [WCAG — Web Content Accessibility Guidelines](wcag.md) — The canonical W3C accessibility standard: POUR principles, Conformance Levels (A, AA, AAA), Focus Order (2.4.3), Focus Visible (2.4.7), and Name/Role/Value (4.1.2).

---

## Related Areas

- [Browser Runtime](../browser-runtime/)
- [Routing and Interaction](../routing-and-interaction/)
- [Styling](../styling/)
- [Software Development Practices: Testing](../../software-development-practices/testing/)
