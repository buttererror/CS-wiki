# W3C WAI Specifications

## Definition & Mission

The **W3C WAI** (Web Accessibility Initiative) is the dedicated working group within the World Wide Web Consortium whose mission is to make the World Wide Web accessible to people with disabilities.

WAI develops technical guidelines, authoring practices, and accessibility evaluation methodologies that ensure hardware, browsers, web applications, and assistive software operate as an interoperable, accessible ecosystem.

---

## The WAI Standards Suite

The WAI maintains four primary normative specifications:

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│ 1. WCAG (Web Content Accessibility Guidelines) ⭐                           │
│    • Specifies rules for web content, applications, and digital documents.  │
│    • Built on 4 POUR principles: Perceivable, Operable, Understandable,     │
│      Robust. Conformance levels: A, AA, AAA.                                │
│    • See detailed specification: [WCAG in Depth](accessibility/wcag.md)     │
├─────────────────────────────────────────────────────────────────────────────┤
│ 2. WAI-ARIA (Accessible Rich Internet Applications)                         │
│    • Bridges gaps when native HTML cannot express complex dynamic states.   │
│    • Supplies roles (role="dialog"), states (aria-expanded="true"), and     │
│      properties (aria-describedby="error-msg") to the Accessibility Tree.   │
├─────────────────────────────────────────────────────────────────────────────┤
│ 3. ATAG (Authoring Tool Accessibility Guidelines)                           │
│    • Governs software used to create web content (CMSs, IDEs, rich text     │
│      editors, site builders) so that tools generate accessible code.        │
├─────────────────────────────────────────────────────────────────────────────┤
│ 4. UAAG (User Agent Accessibility Guidelines)                               │
│    • Governs web browsers, media players, and plugins so that user agents   │
│      render accessibility markup cleanly and support keyboard navigation.   │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## The WAI-ARIA Layer: Extending Semantic HTML

WAI-ARIA provides explicit semantics when custom UI widgets exceed the capabilities of standard HTML5 elements:

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│ Custom UI Component (e.g. Hamburger Drawer)                                 │
│                                                                             │
│ <button                                                                     │
│   aria-expanded="true"            ◄── Announces open/closed state to reader │
│   aria-controls="mobile-drawer"   ◄── Links trigger to dialog container     │
│   aria-label="Close navigation"   ◄── Supplies accessible name when no text │
│ >                                                                           │
└─────────────────────────────────────────────────────────────────────────────┘
```

> **The First Rule of ARIA:** *"If you can use a native HTML element or attribute with the semantics and behavior you require already built in, then do so instead of re-purposing an element and adding ARIA."* (e.g., use `<dialog>` instead of `<div role="dialog">`).

---

## Deep Dive in the Accessibility Domain

For complete architectural mental models, assistive technology guides, and the canonical WCAG 2.2 criteria:

- [Web Accessibility Domain (a11y)](accessibility/) — The dual-tree architecture (DOM vs. A11y Tree), screen readers, and testing mechanics.
- [WCAG (Web Content Accessibility Guidelines)](accessibility/wcag.md) — POUR principles, Conformance Levels A/AA/AAA, Focus Order (2.4.3), Focus Visible (2.4.7), and Name/Role/Value (4.1.2).

---

## Related Documents

- [Standards Governance & Adoption](README.md)
- [WHATWG HTML & DOM Living Standards](whatwg-html-dom.md)
- [W3C CSS Specifications](w3c-css.md)
