# Frontend Terminology

**Keywords:** frontend terminology, browser runtime, CSR, SSR, SSG, ISR, hydration, serialization, reactivity, state management, controlled inputs, uncontrolled inputs, accessibility, styling, CSS modules, PWA, service worker, React, Next.js, Vue, Vite, TanStack Query

## Purpose

This page indexes recurring frontend terminology used across the wiki.

To prevent confusion between universal web platform principles and technology-specific tooling, terms are organized into two distinct layers:

1. **General Frontend Concepts**: Transferable principles that apply across the browser runtime, web standards, and all modern client frameworks.
2. **Framework and Library Terms**: Specialized APIs, conventions, and mental models specific to particular ecosystems (such as React, Next.js, Vue, Vite, and TanStack Query).

---

## Layer 1: General Frontend Concepts

These concepts are framework-independent and describe how browsers execute, render, style, secure, and deliver web applications.

### Browser Runtime and Scheduling

- **[Browser Runtime](../../../frontend-development/browser-runtime/)**: The host execution environment provided by the browser, combining the JavaScript engine with memory, the event loop, the DOM, and Web APIs (`fetch`, storage, timers).
- **[Task Queue and Event Loop](../../../frontend-development/browser-runtime/timers-and-event-scheduling.md#task-microtask-and-frame-work)**: The scheduling loop that coordinates script execution, event dispatch, queued tasks (macrotasks), microtasks, and rendering frames.
- **[Microtask](../../../frontend-development/browser-runtime/timers-and-event-scheduling.md#task-microtask-and-frame-work)**: High-priority deferred work (`queueMicrotask`, Promise callbacks) executed immediately after current synchronous JavaScript completes, before the event loop yields to the next task or browser paint.
- **[Animation Frame](../../../frontend-development/browser-runtime/timers-and-event-scheduling.md#task-microtask-and-frame-work)**: Browser callback scheduling (`requestAnimationFrame`) aligned with the display refresh rate for smooth visual updates.
- **[Timers](../../../frontend-development/browser-runtime/timers-and-event-scheduling.md#a-timer-schedules-eligible-work)**: Host APIs (`setTimeout`, `setInterval`, `clearTimeout`) that make a callback eligible to run after a specified delay rather than pausing code execution.
- **[Debounce](../../../frontend-development/browser-runtime/timers-and-event-scheduling.md#debounce-and-throttle)**: A timing technique that resets a quiet-period timer on each incoming event so that work executes only once activity settles.
- **[Throttle](../../../frontend-development/browser-runtime/timers-and-event-scheduling.md#debounce-and-throttle)**: A timing technique that limits the execution rate of an ongoing stream of events to fixed periodic intervals.

### Rendering and Hydration

- **[Client-Side Rendering (CSR)](../../../frontend-development/rendering/server-and-client-rendering.md#client-side-rendering)**: An architecture where the browser downloads a minimal HTML shell and JavaScript, generating the UI and DOM in the browser.
- **[Server-Side Rendering (SSR)](../../../frontend-development/rendering/server-and-client-rendering.md#server-side-rendering)**: An architecture where a server generates dynamic HTML for each incoming HTTP request before transmitting it to the browser.
- **[Static Generation (SSG)](../../../frontend-development/rendering/server-and-client-rendering.md#static-generation)**: Producing static HTML and assets ahead of time during a build or revalidation step to serve from static storage or CDNs.
- **[Incremental Static Regeneration (ISR)](../../../frontend-development/rendering/ssr-and-isr.md#incremental-static-regeneration)**: A hybrid rendering model that serves prerendered cached route output and replaces it in the background after time-based or on-demand revalidation.
- **[Time-Based Revalidation](../../../frontend-development/rendering/ssr-and-isr.md#time-based-and-on-demand-revalidation)**: Marking cached route output eligible for background regeneration after a configured time window elapses.
- **[On-Demand Revalidation](../../../frontend-development/rendering/ssr-and-isr.md#time-based-and-on-demand-revalidation)**: Explicitly invalidating and regenerating a cached route or cache tag in response to a mutation or CMS webhook.
- **[Hydration](../../../frontend-development/rendering/hydration.md)**: The client-side process where a framework reconstructs component representations and attaches event listeners and state to existing server-rendered HTML.
- **[Hydration Mismatch](../../../frontend-development/rendering/hydration.md#hydration-mismatches)**: A discrepancy between the DOM structure generated on the server and the initial representation expected by the client framework.
- **[Prerendering and Streaming](../../../frontend-development/rendering/server-and-client-rendering.md#rendering-is-not-interactivity)**: Progressively transmitting rendered HTML chunks to the browser as server work completes rather than waiting for the complete document.

### Data Across Boundaries

- **[Serialization](../../../frontend-development/data-across-boundaries/serialization.md)**: Converting live in-memory runtime data (objects, arrays) into a transferable format (such as JSON or binary wire formats) to cross process, network, or storage boundaries.
- **[Deserialization](../../../frontend-development/data-across-boundaries/serialization.md#runtime-value-versus-representation)**: Reconstructing usable in-memory runtime values from a serialized representation at the destination.
- **[Transferable Representation](../../../frontend-development/data-across-boundaries/serialization.md#runtime-value-versus-representation)**: The data payload that crosses a boundary, which loses live prototypes, private closures, and function references.
- **[Structured Clone](../../../frontend-development/data-across-boundaries/serialization.md#serialization-is-format-specific)**: The browser algorithm used to deep-copy complex JavaScript values across worker, postMessage, and storage boundaries.
- **[Boundary Data Minimization](../../../frontend-development/data-across-boundaries/serialization.md#relationship-to-server-rendering)**: Passing only the minimal data fields required by the client across the server/client boundary to reduce payload size and prevent secret leakage.

### State, Reactivity, and Paradigms

- **[Reactivity System](../../../frontend-development/state-and-reactivity/reactivity-mechanisms.md)**: An architecture where modifications to a data source automatically propagate to dependent computations, templates, or effects.
- **[Reactive Source](../../../frontend-development/state-and-reactivity/reactivity-mechanisms.md#vocabulary-of-a-reactivity-system)**: A data container whose read operations can be observed and whose mutations trigger dependent work.
- **[Dependency Tracking](../../../frontend-development/state-and-reactivity/reactivity-mechanisms.md#vocabulary-of-a-reactivity-system)**: Recording the relationship between reactive sources and the effects or computations that read them.
- **[Runtime Property Interception](../../../frontend-development/state-and-reactivity/reactivity-mechanisms.md#ways-to-implement-reactive-behavior)**: Using JavaScript `Proxy` traps or getter/setter accessors to detect property reads and writes transparently.
- **[Explicit Update Notification](../../../frontend-development/state-and-reactivity/reactivity-mechanisms.md#ways-to-implement-reactive-behavior)**: Calling an explicit setter or dispatch function to declare state transitions rather than tracking object mutations.
- **[Derived State / Computed Values](../../../frontend-development/state-and-reactivity/reactivity-mechanisms.md#vocabulary-of-a-reactivity-system)**: Values calculated from other state that automatically update or invalidate when their source dependencies change.
- **[Effects and Side Effects](../../../frontend-development/state-and-reactivity/reactivity-mechanisms.md#vocabulary-of-a-reactivity-system)**: Operations triggered by reactive changes that interact with outside systems (DOM updates, timers, network requests, storage).
- **[Stream-Based Reactivity](../../../frontend-development/state-and-reactivity/reactivity-mechanisms.md#relationship-to-stream-based-reactivity)**: Managing state and event sequences as composable asynchronous pipelines of observables or event streams.
- **Imperative UI vs. Declarative UI**:
  - *Imperative UI*: Manually executing step-by-step mutation commands (*HOW* to update the interface, e.g. `element.appendChild()`, `dialog.showModal()`).
  - *Declarative UI*: Describing the target interface structure as a pure function of current state (*WHAT* to render, e.g. `<Modal isOpen={isOpen} />`), letting the framework or engine reconcile DOM changes.
- **Event-Driven vs. Effect-Driven Action**: Executing user-triggered actions directly inside explicit event handlers (`onClick`, `onSubmit`) rather than reacting to cascading state or route transitions inside reactive lifecycle effects (`useEffect`).

### Overlays, Modals, and the Top Layer

- **Top Layer**: A dedicated browser rendering layer managed above all document DOM elements, completely independent of parent `z-index`, `overflow: hidden`, or stacking contexts, used by native `<dialog>`, fullscreen, and Popover elements.
- **HTML5 `<dialog>` (`.showModal()`, `.close()`)**: The standard browser overlay element providing built-in modal lifecycles, Top Layer promotion, native backdrop pseudo-elements (`::backdrop`), focus trapping, inert background documents, and keyboard dismissal.
- **Light Dismiss**: An interaction pattern where clicking or tapping outside an active overlay (on its backdrop) or pressing standard platform dismiss keys (`Escape`) automatically closes the overlay.
- **Focus Trapping**: Constraining keyboard navigation (`Tab` / `Shift+Tab`) strictly within an active modal or dialog to prevent keyboard and screen reader users from navigating to inert background content.
- **Focus Restoration**: An accessibility requirement where dismissing an overlay automatically returns keyboard focus to the trigger button that originally opened it.
- **Body Scroll Locking**: An overlay coordination technique that temporarily sets `document.body.style.overflow = 'hidden'` while a modal is active to prevent background scrolling behind the overlay, restoring the original overflow upon dismissal.

### Routing, Forms, and Interaction

- **[Frontend Routing](../../../frontend-development/routing-and-interaction/)**: Mapping a browser URL to corresponding UI states and coordinating navigation transitions within a client application.
- **[Navigation State](../../../frontend-development/routing-and-interaction/post-authentication-redirects.md#navigation-state)**: Transient data attached to a browser history entry to pass context across page transitions without exposing it in the URL.
- **[Post-Authentication Redirect](../../../frontend-development/routing-and-interaction/post-authentication-redirects.md)**: A navigation pattern that preserves an intended protected destination when sign-in is required and resumes it after authentication succeeds.
- **[Open Redirect](../../../frontend-development/routing-and-interaction/post-authentication-redirects.md#safety-rules)**: A security vulnerability where unvalidated user or URL input causes an application to redirect the user to an untrusted external origin.
- **[Form State Ownership](../../../frontend-development/routing-and-interaction/controlled-and-uncontrolled-inputs.md#the-core-problem-who-owns-the-current-value)**: Deciding whether the host DOM element or the application's state model holds the single authoritative truth for an input's current value.
- **[Controlled Inputs](../../../frontend-development/routing-and-interaction/controlled-and-uncontrolled-inputs.md#controlled-inputs)**: Form controls whose current values are driven by application state and updated via event handlers, enabling real-time validation and masking.
- **[Uncontrolled Inputs](../../../frontend-development/routing-and-interaction/controlled-and-uncontrolled-inputs.md#uncontrolled-inputs)**: Form controls whose current values are managed internally by the DOM, initialized with defaults, and read on demand (e.g., via `FormData` on submit).
- **[The “One Owner per State Value” Rule](../../../frontend-development/routing-and-interaction/controlled-and-uncontrolled-inputs.md#the-one-owner-per-state-value-rule)**: The architectural rule that an input must have exactly one source of truth to avoid dual-write synchronization bugs.

### Accessibility (a11y)

- **[Accessible Name](../../../frontend-development/offline-web-apps/#accessibility-behavior)**: The programmatically exposed label used by screen readers and assistive technology to identify an interactive element.
- **`aria-label` / `aria-labelledby`**: ARIA attributes used to provide or reference an explicit accessible name when visible text is absent or insufficient.
- **Live Regions (`aria-live`, `role="status"`)**: Specialized container elements that announce dynamic UI updates (e.g. offline status, toast notifications) politely without interrupting the user.
- **Keyboard Operability**: Ensuring every interactive control can be navigated, focused, activated, and dismissed using keyboard-only input.

### Styling and Layout

- **[Style Collision](../../../frontend-development/styling/#style-collision)**: Unintended style overrides and breakage caused by global CSS selectors, specificity conflicts, or load-order differences.
- **[Scoped Styles](../../../frontend-development/styling/#preventing-style-collision)**: Encapsulating CSS to component boundaries using techniques like CSS Modules or framework scoped styles to eliminate global naming collisions.
- **[Utility-First CSS](../../../frontend-development/styling/#preventing-style-collision)**: Applying single-purpose utility classes directly in templates to build composable designs without custom CSS naming hierarchies.
- **[Design Tokens / CSS Variables](../../../frontend-development/styling/#styling-as-a-system-not-decoration)**: Reusable design values (colors, spacing, typography) stored in CSS custom properties to maintain consistent theming.
- **[Layout Systems (Box Model, Flexbox, Grid)](../../../frontend-development/styling/#layout-as-a-root-cause-of-styling-bugs)**: Fundamental browser layout mechanisms for arranging two-dimensional grids and one-dimensional flex containers.

### Performance and Progressive Delivery

- **[Code Splitting](../../../framework-tooling/frontend/react-application-delivery/nextjs-vs-react-with-vite.md#client-rendered-react-with-vite)**: Breaking application JavaScript into separate dynamic bundles loaded on demand by route or feature to reduce initial load weight.
- **[Tree-Shaking](../../../framework-tooling/frontend/react-application-delivery/nextjs-vs-react-with-vite.md#react-with-vite-is-not-inherently-slow)**: Static dead-code elimination performed by bundlers to exclude unused package exports from production bundles.
- **[Request Waterfalls](../../../framework-tooling/frontend/react/performance.md#effects-and-data-waterfalls)**: Serial network requests where each subsequent fetch cannot initiate until the previous one resolves, increasing accumulated latency.
- **[List Virtualization / Windowing](../../../framework-tooling/frontend/react/performance.md#lists-and-identity)**: Rendering only the DOM nodes currently visible within the scrollable viewport to maintain smooth performance with large collections.

### Progressive Web Apps and Offline Behavior

- **[Progressive Web App (PWA)](../../../frontend-development/offline-web-apps/)**: A web application enhanced with service workers, caching strategies, and manifest metadata to provide offline access and installability.
- **[Service Worker](../../../frontend-development/offline-web-apps/#the-core-request-model)**: A programmable, event-driven background worker that intercepts network requests and interacts with the Cache Storage API outside the page main thread.
- **[Service Worker Lifecycle](../../../frontend-development/offline-web-apps/#service-worker-lifecycle)**: The sequential states of a worker: downloading, installing (precache population), waiting (older worker still active), activating (cache cleanup), and active.
- **[Precaching](../../../frontend-development/offline-web-apps/#precaching)**: Downloading and storing a pre-computed manifest of build assets in Cache Storage during service worker installation.
- **[Runtime Caching](../../../frontend-development/offline-web-apps/#runtime-caching)**: Storing and reusing network responses dynamically as requests happen during application execution.
- **[Cache Storage API](../../../frontend-development/offline-web-apps/#cache-storage-versus-the-http-cache)**: A browser programmatic storage interface for storing named `Request`/`Response` pairs, separate from the browser HTTP protocol cache.
- **[Caching Strategies](../../../frontend-development/offline-web-apps/#common-runtime-strategies)**: Request resolution patterns including Cache First, Network First, Stale While Revalidate, Cache Only, and Network Only.
- **[Web App Manifest](../../../frontend-development/offline-web-apps/#what-the-manifest-does)**: A JSON metadata file defining the installed application's name, start URL, scope, display mode, icons, and theme colors.
- **[Prompt-Based Update](../../../frontend-development/offline-web-apps/#complete-current-registration-and-prompt-component)**: An update flow where a waiting service worker activates only after the user confirms, preventing an open tab from mixing assets across two builds.

---

## Layer 2: Framework and Library Terms

These terms describe specific features, APIs, and idioms belonging to particular frontend frameworks and libraries.

### React

- **[React Element](../../../framework-tooling/frontend/react/rendering-model.md#components-and-elements)**: A lightweight, immutable JavaScript object describing what should appear on the screen, returned by component functions.
- **[Render Tree](../../../framework-tooling/frontend/react/rendering-model.md#components-and-elements)**: The nested hierarchy of React elements representing the current UI structure.
- **[Render and Commit Phases](../../../framework-tooling/frontend/react/rendering-model.md#trigger-render-and-commit)**: React's two-step execution model: calling components to compute the next UI (render/reconciliation) followed by applying DOM mutations and layout effects (commit).
- **[Pure Rendering](../../../framework-tooling/frontend/react/rendering-model.md#pure-rendering)**: The requirement that component functions must produce identical output for identical inputs and execute without observable side effects.
- **[Component Identity and Keys (`key`)](../../../framework-tooling/frontend/react/rendering-model.md#identity-and-keys)**: Preserving or resetting component state across renders based on tree position and unique sibling `key` attributes.
- **[Strict Mode (`StrictMode`)](../../../framework-tooling/frontend/react/strict-mode.md)**: A development-only wrapper that deliberately double-invokes render functions and Effect setup/cleanup to expose impure code and missing teardowns.
- **[Concurrent React](../../../framework-tooling/frontend/react/rendering-model.md#concurrency)**: React's interruptible scheduling mechanism that can prioritize urgent user interactions over non-urgent background renders.
- **[State as a Snapshot](../../../framework-tooling/frontend/react/state-and-updates.md#state-as-a-snapshot)**: The rule that state variables are immutable snapshots locked to a specific render pass; setters schedule future renders rather than mutating current variables.
- **[Functional State Updates](../../../framework-tooling/frontend/react/state-and-updates.md#queued-and-batched-updates)**: Passing an updater callback `setCount(prev => prev + 1)` to compute the next state safely from the latest queued value.
- **[Batched Updates](../../../framework-tooling/frontend/react/state-and-updates.md#queued-and-batched-updates)**: Grouping multiple state updates within an event loop tick into a single render pass to improve performance.
- **[`useReducer`](../../../framework-tooling/frontend/react/state-and-updates.md#reducers)**: A Hook for managing complex state transitions via a reducer function that calculates next state from an action and current state.
- **[`useRef`](../../../framework-tooling/frontend/react/state-and-updates.md#refs)**: A Hook that holds a persistent mutable object (`.current`) across renders without triggering a rerender when updated.
- **[`useEffect` Setup and Cleanup](../../../framework-tooling/frontend/react/effects-and-external-synchronization.md#effect-lifecycle)**: Synchronizing a component with external systems after commit, with an optional return function that cleans up previous resources before reruns or unmount.
- **[`useLayoutEffect`](../../../framework-tooling/frontend/react/effects-and-external-synchronization.md#uselayouteffect)**: An Effect that fires synchronously after DOM mutation but before browser repaint, used for DOM measurements.
- **[Render-Local Function Recreation](../../../framework-tooling/frontend/react/function-identity-and-closures.md#render-means-function-execution)**: The normal behavior where functions declared inside a component receive new object references on every render.
- **[`useCallback`](../../../framework-tooling/frontend/react/function-identity-and-closures.md#usememo-and-usecallback)**: Caching a function reference between renders while its dependencies remain unchanged to satisfy identity-sensitive consumers.
- **[`useMemo`](../../../framework-tooling/frontend/react/function-identity-and-closures.md#usememo-and-usecallback)**: Caching the computed result of an expensive calculation between renders based on dependency equality.
- **[`memo()`](../../../framework-tooling/frontend/react/performance.md#memo)**: A higher-order component that skips rerendering when incoming props are shallowly equal to previous props.
- **[Debounced Value (`useDebouncedValue`)](../../../framework-tooling/frontend/react/debouncing.md#debounce-the-propagation-not-typing)**: Deriving a delayed state value from an immediate input state to drive queries without lagging the visible input.
- **[React Context (`createContext`, `useContext`)](../../../framework-tooling/frontend/react/context-and-external-stores.md#context)**: Distributing values deeply through a component subtree without explicit prop drilling.
- **[`useSyncExternalStore`](../../../framework-tooling/frontend/react/context-and-external-stores.md#external-stores)**: The recommended React primitive for safely subscribing to external mutable stores with concurrent rendering support.
- **[React Controlled Input](../../../framework-tooling/frontend/react/forms.md#controlled-inputs-in-react)**: Binding an `<input>` directly to React state via `value` and `onChange`.
- **[React Uncontrolled Input](../../../framework-tooling/frontend/react/forms.md#uncontrolled-inputs-in-react)**: Initializing an `<input>` with `defaultValue` and reading its DOM node on demand via `useRef` or `FormData`.
- **[React Server Components (RSC)](../../../framework-tooling/frontend/react-application-delivery/nextjs-vs-react-with-vite.md#react-server-components)**: Components that execute exclusively on the server to produce a serialized UI description without shipping their implementation to the client.
- **[RSC Payload](../../../framework-tooling/frontend/react-application-delivery/nextjs-vs-react-with-vite.md#react-server-components)**: The serialized stream of UI descriptions, component slots, and props sent from server components to the browser.
- **[Client Components (`'use client'`)](../../../framework-tooling/frontend/react-application-delivery/nextjs-vs-react-with-vite.md#client-components-and-hydration)**: Declaring entry points into the client-side module graph that require browser interactivity, state, and event handling.

### Next.js

- **[App Router (`app/`)](../../../framework-tooling/frontend/nextjs/notes.md#app-router-app)**: The Next.js routing architecture built on React Server Components, nested layouts, and streaming.
- **[Pages Router (`pages/`)](../../../framework-tooling/frontend/nextjs/notes.md#pages-router-pages)**: The traditional Next.js routing system using `getStaticProps` and `getServerSideProps`.
- **[Route Handlers](../../../framework-tooling/frontend/nextjs/notes.md#app-router-app)**: Custom request handlers for web APIs using standard Web Request/Response objects in the App Router.
- **[Server Actions](../../../framework-tooling/frontend/nextjs/notes.md#app-router-app)**: Asynchronous server functions called from client forms or event handlers with automatic mutation revalidation.
- **[`revalidatePath` / `revalidateTag`](../../../frontend-development/rendering/ssr-and-isr.md#nextjs-as-an-implementation-case)**: Next.js APIs for on-demand invalidation and regeneration of cached routes or tagged fetches.
- **[`revalidate` Route Segment Config](../../../frontend-development/rendering/ssr-and-isr.md#nextjs-as-an-implementation-case)**: Setting time-based ISR revalidation intervals for a Next.js route segment.
- **[CSS Modules in Next.js (`*.module.css`)](../../../framework-tooling/frontend/nextjs/notes.md#css-modules)**: Native Next.js support for locally scoped class names and styles.
- **[`clsx`](../../../framework-tooling/frontend/nextjs/notes.md#conditional-class-names-with-clsx)**: A utility for constructing conditional `className` strings cleanly.

### Vue

- **[Vue 3 Reactivity](../../../frontend-development/state-and-reactivity/reactivity-mechanisms.md#vue-3)**: Automatic runtime dependency tracking and triggering implemented using JavaScript `Proxy` objects.
- **[`reactive()`](../../../frontend-development/state-and-reactivity/reactivity-mechanisms.md#vues-main-reactivity-primitives)**: Returning a reactive proxy for an object, tracking property reads during render and triggering effects upon mutation.
- **[`ref()`](../../../frontend-development/state-and-reactivity/reactivity-mechanisms.md#vues-main-reactivity-primitives)**: Creating a reactive container for any primitive or object value, exposed via `.value`.
- **[`computed()`](../../../frontend-development/state-and-reactivity/reactivity-mechanisms.md#vues-main-reactivity-primitives)**: Defining cached, read-only derived state that lazily recalculates when upstream reactive dependencies change.
- **[`watch()` / `watchEffect()`](../../../frontend-development/state-and-reactivity/reactivity-mechanisms.md#vues-main-reactivity-primitives)**: Running side-effect callbacks in response to explicit source changes (`watch`) or automatically tracked dependencies (`watchEffect`).
- **[Pinia / Vuex](../../../framework-tooling/frontend/vue/notes.md#current-topics)**: State management libraries for Vue; Pinia provides modular, TypeScript-first stores without mutations, while Vuex uses single-tree stores with mutations and actions.
- **[Vue Scoped CSS](../../../frontend-development/styling/#preventing-style-collision)**: Scoping single-file component `<style scoped>` rules using compiler-added unique dataset attributes.

### Vite and Build Tooling

- **[Vite Development Server](../../../framework-tooling/frontend/react-application-delivery/nextjs-vs-react-with-vite.md#client-rendered-react-with-vite)**: Fast development server serving source files over native browser ES modules without pre-bundling the entire application.
- **[Production Bundling](../../../framework-tooling/frontend/react-application-delivery/nextjs-vs-react-with-vite.md#client-rendered-react-with-vite)**: Compiling and bundling application modules into optimized, content-hashed static assets for deployment.
- **[`@vite-pwa/vitepress`](../../../frontend-development/offline-web-apps/#the-parts-of-the-current-cs-wiki-pwa)**: Vite plugin integrating Workbox service-worker generation and PWA manifests into VitePress documentation sites.
- **[`virtual:pwa-register`](../../../frontend-development/offline-web-apps/#why-registration-happens-only-in-the-browser)**: Virtual module providing helper functions (`registerSW`) to handle browser service worker registration and lifecycle events.

### TanStack Query (Server State)

- **[Server State vs UI Workflow State](../../../framework-tooling/frontend/react/stale-response-races.md#practical-ownership-boundary)**: Distinguishing remote, asynchronous, shared server data from local, synchronous, client-only UI interaction state.
- **[Query Cache](../../../framework-tooling/frontend/react/stale-response-races.md#keep-query-results-in-the-query-cache)**: The centralized in-memory store managing request status, cached data, refetching, and garbage collection.
- **[Query Key (`queryKey`)](../../../framework-tooling/frontend/react/stale-response-races.md#keep-query-results-in-the-query-cache)**: A unique serializable array identifying a query and its parameters, determining cache identity and invalidation targets.
- **[Query Function (`queryFn`)](../../../framework-tooling/frontend/react/stale-response-races.md#keep-query-results-in-the-query-cache)**: An asynchronous function that resolves remote data and receives an `AbortSignal` for request cancellation.
- **[Stale-Response Race Condition](../../../framework-tooling/frontend/react/stale-response-races.md#the-race)**: The bug where an earlier asynchronous request completes after a newer one and overwrites current UI state.
- **[`placeholderData: keepPreviousData`](../../../framework-tooling/frontend/react/stale-response-races.md#why-not-copy-querydata-into-a-reducer)**: Keeping previous page data visible while fetching subsequent pages to prevent layout flashes.
- **[Reducer Dual-Write Anti-Pattern](../../../framework-tooling/frontend/react/stale-response-races.md#why-not-copy-querydata-into-a-reducer)**: Duplicating query cache data into local component reducers via Effects, creating competing sources of truth.

---

## Related Indices and Taxonomies

- [Software Engineering Terminology](README.md)
- [Software Taxonomy](../software-taxonomy.md)
- [Frontend Development](../../../frontend-development/)
- [Frontend Frameworks and Tooling](../../../framework-tooling/frontend/)
