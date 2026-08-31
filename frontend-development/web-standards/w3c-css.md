# W3C CSS Specifications

## Definition & Working Group

The **W3C CSS Working Group** (Cascading Style Sheets Working Group) is the standardization committee within the World Wide Web Consortium responsible for defining the syntax, layout engines, visual styling, typography, and animation specifications of the web.

Unlike monolithic languages, CSS is developed as a collection of **independent modules** (e.g. CSS Grid, CSS Flexbox, CSS Color, CSS Values and Units), each evolving at its own pace through the W3C Recommendation Track.

---

## Modularization & The Recommendation Track

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│ W3C Recommendation Track for CSS Modules                                    │
│                                                                             │
│ [Working Draft (WD)] ──► [Candidate Recommendation (CR)] ──► [W3C Rec]      │
│   (Active design)            (Implementation & 2+ engines)      (Finalized) │
└─────────────────────────────────────────────────────────────────────────────┘
```

To provide stable milestones, the CSS WG publishes periodic **CSS Snapshots** that bundle all mature and interoperable modules.

---

## Core CSS Architectural Subsystems

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│ Subsystem           │ Responsibilities & Specifications                     │
├─────────────────────┼───────────────────────────────────────────────────────┤
│ Cascade &           │ • Determines which style rule wins on any given node. │
│ Specificity         │ • Hierarchy: Origin & Importance ──► Cascade Layers   │
│                     │   (@layer) ──► Specificity (0,0,0) ──► Source Order.  │
├─────────────────────┼───────────────────────────────────────────────────────┤
│ Layout Engines      │ • Normal Flow (Block vs. Inline formatting context).  │
│                     │ • CSS Flexible Box Layout (1-dimensional flow).       │
│                     │ • CSS Grid Layout (2-dimensional track matrix, fr).   │
├─────────────────────┼───────────────────────────────────────────────────────┤
│ Sizing & Units      │ • CSS Values and Units (rem, em, ch, %).              │
│                     │ • Viewport units (vh, svh, dvh, lvh) and Container    │
│                     │   Queries (@container, cqw, cqh).                     │
├─────────────────────┼───────────────────────────────────────────────────────┤
│ Browser Top Layer   │ • Dedicated rendering layer above the document root.  │
│ & Overlays          │ • Renders modal <dialog> and popovers with native     │
│                     │   ::backdrop pseudo-element.                          │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## CSS Top Layer: Breaking Free of the Stacking Context

One of the most significant modern CSS specifications is the **Top Layer**:

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│ Regular Document Tree (Stacking Contexts: z-index 1..99999)                 │
│ └── #root                                                                   │
│     └── header (overflow: hidden)                                           │
│         └── modal (Trapped inside parent stacking context if using div)     │
├─────────────────────────────────────────────────────────────────────────────┤
│ 🚀 Browser Top Layer (Promoted via .showModal() or popover attribute)        │
│ ├── ::backdrop (Occludes normal document tree underneath)                   │
│ └── <dialog> (Guaranteed top rendering, immune to all z-index limits)       │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Interoperability & The "Interop" Initiative

To ensure that CSS specifications are implemented identically across all major engines (Blink/Chromium, Gecko/Firefox, and WebKit/Safari), browser vendors collaborate through the annual **Interop Project** to eliminate discrepancies in CSS Grid, subgrid, `:has()` selectors, and focus styling.

---

## Related Documents

- [Standards Governance & Adoption](README.md)
- [WHATWG HTML & DOM Living Standards](whatwg-html-dom.md)
- [W3C WAI Specifications](w3c-wai.md)
- [Styling Foundations](../styling/)
