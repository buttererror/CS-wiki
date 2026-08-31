# WCAG (Web Content Accessibility Guidelines)

## Definition & Standards Body

**WCAG** (Web Content Accessibility Guidelines) is the internationally recognized technical standard developed by the **W3C (World Wide Web Consortium)** under the **WAI (Web Accessibility Initiative)**. It defines normative specifications for making web content, user interfaces, and electronic documents accessible to individuals with visual, auditory, motor, cognitive, and neurological disabilities.

WCAG serves as the legal and technical foundation for accessibility compliance worldwide, including **Section 508 / ADA** (United States), **EN 301 549 / European Accessibility Act** (European Union), and **JIS X 8341** (Japan).

---

## The Four Core Principles: POUR

WCAG organizes all accessibility requirements under four foundational principles:

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│ 1. Perceivable                                                              │
│    Information and UI components must be presentable to users in ways they  │
│    can perceive (it cannot be invisible to all of their senses).            │
│    • Examples: Text alternatives for images, captions, 4.5:1 color contrast.│
├─────────────────────────────────────────────────────────────────────────────┤
│ 2. Operable                                                                 │
│    User interface components and navigation must be operable (users must be │
│    able to interact with every control using whatever input device they have)│
│    • Examples: 100% keyboard accessibility, focus order, no keyboard traps. │
├─────────────────────────────────────────────────────────────────────────────┤
│ 3. Understandable                                                           │
│    Information and operation of the user interface must be understandable.  │
│    • Examples: Predictable navigation, input error explanations, clear labels│
├─────────────────────────────────────────────────────────────────────────────┤
│ 4. Robust                                                                   │
│    Content must be robust enough that it can be interpreted reliably by a   │
│    wide variety of user agents, including assistive technologies.           │
│    • Examples: Valid semantic HTML, accurate Name/Role/Value metadata.      │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Conformance Levels: A, AA, and AAA

WCAG classifies its **Success Criteria** into three progressive conformance levels:

| Level | Classification | Description & Industry Standard |
| :--- | :--- | :--- |
| **Level A** | **Minimum Baseline** | Fundamental requirements without which assistive tech users cannot access content at all (e.g. keyboard operation, text alternatives, basic focus order). |
| **Level AA** | **Standard Target** | **The global legal and commercial standard** for public and enterprise applications. Eliminates the most common real-world barriers (e.g. 4.5:1 color contrast, visible focus rings, responsive resize). |
| **Level AAA** | **Enhanced Target** | Highest level of specialized accessibility. Not required as a blanket policy for entire websites because some criteria cannot be applied across all content types (e.g. sign language translation for all audio, 7:1 contrast). |

---

## Critical Success Criteria in Modern Web Engineering

### 1. WCAG 2.4.3: Focus Order (Level A)

> *"If a Web page can be navigated sequentially and the navigation sequences affect meaning or operation, focusable components receive focus in an order that preserves meaning and operability."*

In interactive single-page applications (SPAs) and component overlays, Focus Order requires three specific behaviors:

```text
1. Trigger Click (Open Mobile Drawer)
   │
   ▼
2. Overlay Opens in Top Layer
   └── Initial Focus: Move focus immediately inside the modal (e.g. to Close button).
   └── Focus Trap: Tabbing must cycle inside the modal; background is inert.
   │
   ▼
3. Overlay Dismissed (Close / Escape / Backdrop Click)
   └── Focus Restoration: Explicitly return keyboard focus to the opening trigger button.
```

#### Why Focus Restoration Is Critical
When a modal is closed, if keyboard focus is not explicitly returned to the trigger button that opened it, focus is lost into the `<body>` root. The keyboard user is thrown back to the top of the page and must re-tab through the entire DOM to find where they were.

---

### 2. WCAG 2.4.7: Focus Visible (Level AA)

> *"Any keyboard operable user interface has a mode of operation where the keyboard focus indicator is visible."*

- **The Rule:** Interactive elements must display a distinct visual ring, outline, or highlight when focused via keyboard navigation.
- **The Anti-Pattern:** Setting `outline: none` or `outline: 0` in CSS without providing an accessible alternative.
- **Modern Solution:** Use CSS `:focus-visible` to show focus indicators only during keyboard navigation while keeping mouse clicks clean.

---

### 3. WCAG 4.1.2: Name, Role, Value (Level A)

> *"For all user interface components, the name and role can be programmatically determined; states, properties, and values can be set programmatically; and notification of changes to these items is available to user agents, including assistive technologies."*

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│ Component Property │ Native HTML Example             │ ARIA Equivalent      │
├────────────────────┼─────────────────────────────────┼──────────────────────┤
│ Role               │ <button>, <dialog>, <nav>       │ role="dialog"        │
│ Accessible Name    │ <button>Close menu</button>     │ aria-label="Close"   │
│ State              │ <input type="checkbox" checked> │ aria-expanded="true" │
│ Value              │ <input value="admin@test.com">  │ aria-valuenow="50"   │
└─────────────────────────────────────────────────────────────────────────────┘
```

When building custom UI components (like a hamburger drawer or collapsible accordion), developers must supply ARIA metadata to ensure the Accessibility Tree reflects state changes live (e.g. updating `aria-expanded="true"` when the menu opens).

---

### 4. WCAG 1.4.3: Contrast (Minimum) (Level AA)

> *"The visual presentation of text and images of text has a contrast ratio of at least 4.5:1, except for large text (at least 3:1)."*

```text
• Normal text (< 18pt / < 24px): Minimum 4.5:1 contrast against background
• Large text (≥ 18pt / ≥ 24px regular, or ≥ 14pt / ≥ 18.5px bold): Minimum 3:1 contrast
• UI Components & Icons (WCAG 1.4.11): Minimum 3:1 contrast against adjacent colors
```

---

### 5. WCAG 1.4.4: Resize Text (Level AA)

> *"Except for captions and images of text, text can be resized without assistive technology up to 200 percent without loss of content or functionality."*

- Frontend applications must avoid hardcoded `px` dimensions for layout heights where text can expand.
- Using relative typography units (`rem`) and fluid layouts ensures users who zoom the browser viewport (or increase device font sizes) can read all content without horizontal clipping or overlapping containers.

---

## How WCAG Drives Modern Frontend Testing

Modern frontend testing libraries (such as **React Testing Library** and **Playwright**) are deliberately designed around WCAG principles:

```typescript
// ✅ Queries the DOM through the Accessibility Tree (Role + Accessible Name)
const trigger = screen.getByRole('button', { name: 'Open navigation menu' })
await user.click(trigger)

const dialog = screen.getByRole('dialog', { name: 'Mobile navigation' })
expect(dialog).toBeInTheDocument()

// ✅ Asserts WCAG 2.4.3 Focus Order compliance directly in test assertions
expect(within(dialog).getByRole('button', { name: 'Close navigation menu' })).toHaveFocus()
```

By querying elements by their accessible roles and asserting focus states, automated tests verify that software works for assistive technology and sighted users alike.

---

## Related Documents

- [Web Accessibility Overview (a11y)](README.md)
- [Standards Governance & Adoption](../)
- [W3C WAI Specifications](../w3c-wai.md)
- [Routing and Interaction](../../routing-and-interaction/)
- [Browser Runtime](../../browser-runtime/)
- [Frontend Testing Practices](../../../software-development-practices/testing/)
