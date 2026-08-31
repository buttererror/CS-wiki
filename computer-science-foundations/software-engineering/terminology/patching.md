# Patching

**Keywords:** patching, monkey patching, prototype patching, runtime patching, stubbing, dependency replacement, test isolation, hotfix, polyfill

## Purpose

**Patching** is the modification or replacement of software behavior at runtime or at the source level without replacing the overarching component or rewriting the original library source files.

In software engineering, the term appears in two distinct contexts:

```text
Patching
├── Runtime Patching (Monkey Patching / Prototype Patching)
│   └── Modifying in-memory objects, prototypes, or functions during execution
└── Source/Binary Patching (Version Control / Deployment)
    └── Applying code diffs, security patches, or emergency hotfixes to source files
```

---

## 1. Runtime Patching (Monkey Patching)

**Monkey patching** refers to dynamically extending or overriding a module, class, prototype, or global object in memory at runtime without altering the original library files on disk.

```text
1. Read Original Property ──► 2. Overwrite In-Memory Slot ──► 3. Execute Subject ──► 4. Restore Original
   (Save backup reference)       (Inject mock/polyfill)          (Runs with patch)        (Prevent test leaks)
```

### Common Runtime Use Cases

1. **Test Environment Polyfills & Boundaries:**
   Test runners (like Vitest or Jest running in simulated DOMs like `jsdom`) often lack native browser implementations of modern APIs (e.g., `HTMLDialogElement.prototype.showModal`, `window.matchMedia`). Tests patch the prototype object with a mock implementation to satisfy component calls.
2. **Dynamic Instrumentation and Spying:**
   Mocking libraries wrap runtime functions with spies to record call counts and parameters without altering the caller's interface.
3. **Legacy Polyfilling:**
   Injecting modern standard methods into older JavaScript runtime prototypes (e.g., `Array.prototype.flat`).

---

## 2. Source & Maintenance Patching

In version control and release engineering, a **patch** is a unified diff or targeted software update that fixes a bug, closes a vulnerability, or resolves an emergency issue:

- **Security Patch:** An update applied to address an exploited or disclosed vulnerability.
- **Hotfix:** An urgent, minimal change applied directly to a production branch outside the standard release cadence.
- **Git Patch:** A text file containing a unified diff (`git format-patch` / `git apply`) representing atomic commit changes.

---

## Trade-offs of Runtime Patching

| Advantage | Risk / Caveat |
| :--- | :--- |
| **High Leverage:** Solves missing host APIs or mocks deep dependencies without touching third-party code. | **Leaky State:** If a patched global/prototype is not restored after a test (`afterEach`), subsequent tests inherit corrupted state. |
| **Non-Invasive:** Can polyfill environments or inject telemetry transparently. | **Fragility & Hidden Coupling:** Relies on internal implementation details of third-party libraries that can break across patch releases. |

---

## Related Concepts

- [Software Engineering Terminology](README.md)
- [Software Testing Umbrella](../../../software-development-practices/testing/#testing-terminology-umbrella)
- [JavaScript Prototypes](../../programming-languages/javascript/prototypes.md)
- [Mechanism](mechanism.md)
