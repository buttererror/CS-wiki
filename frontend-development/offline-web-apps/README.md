# Progressive Web Apps, Service Workers, and Offline Caching

**Reading status:** Not read yet

**Keywords:** progressive web app, PWA, service worker, offline web app,
offline-first, precache, runtime cache, Cache Storage API, Workbox,
`@vite-pwa/vitepress`, `virtual:pwa-register`, web app manifest, installable web
app, service-worker scope, waiting worker, update prompt, `registerSW`,
`onOfflineReady`, `onNeedRefresh`

## Purpose

A web page normally depends on the network each time the browser requests its
HTML, JavaScript, CSS, fonts, images, or data. A service worker can sit between
the page and those requests, respond from a browser-managed cache, and make
deliberately selected behavior available offline.

This page explains the general browser concepts and then uses the CS Wiki's
current VitePress, Workbox, and Vue implementation as a concrete case study.

## Classification

- **Primary area:** Frontend Development
- **Scope:** Offline behavior, application delivery, and installability
- **Abstraction level:** Browser mechanism plus build-tool implementation
- **Related standards:** Service Workers, Cache Storage, and Web App Manifest

A **Progressive Web App (PWA)** is a web application enhanced with selected
browser capabilities such as installability and offline behavior. A
**service worker** is one mechanism a PWA can use; the two terms are related
but not interchangeable.

```text
Progressive Web App
├── ordinary web application and URLs
├── web app manifest for install metadata
├── service worker for controlled background behavior
└── cache strategy for deliberate offline responses
```

An application can register a service worker without being installable, and a
manifest alone does not make application content work offline.

## The Core Request Model

Without a service worker, the browser normally resolves a request through its
ordinary HTTP and browser-cache behavior:

```text
page → request → browser HTTP cache or network → response
```

After a service worker controls the page, it can observe eligible requests
inside its scope:

```text
controlled page
      ↓ request
service worker fetch handling
      ├──→ precache or runtime cache → cached response
      └──→ network                 → network response
```

The service worker does not replace HTTP, the browser cache, or the server. It
adds a programmable request-handling layer with its own lifecycle and access to
the Cache Storage API.

### Service-worker execution model

A service worker is an event-driven worker, not a permanently running hidden
page. The browser can start it to handle an event and stop it again when it is
idle. It runs outside the page's main JavaScript thread and has no DOM access.

Consequences include:

- use asynchronous APIs and promises for lifecycle and request work;
- extend important event work with mechanisms such as `event.waitUntil()`;
- do not treat worker-global variables as durable application state;
- use messages when the worker and a page need to coordinate; and
- store durable structured data in an appropriate browser store rather than in
  worker memory.

The generated Workbox worker owns these event handlers for the current wiki;
the repository does not contain a handwritten `fetch` listener.

### Cache Storage versus the HTTP cache

These are separate browser caching layers:

| Layer | Primary control | Typical behavior |
| --- | --- | --- |
| HTTP cache | Browser plus response headers such as `Cache-Control` and validators | Reuses HTTP responses according to protocol caching rules |
| Cache Storage | Service-worker or page JavaScript | Stores named `Request`/`Response` pairs selected by application logic |

A response may be present in one layer, both layers, or neither. Clearing only
the HTTP cache does not necessarily remove the Workbox precache. For a clean
PWA test, clear the origin's site data or explicitly unregister the worker and
delete its Cache Storage entries.

## The Parts of the Current CS Wiki PWA

| Part | Current responsibility |
| --- | --- |
| VitePress | Builds Markdown into static HTML and hashed client assets |
| `@vite-pwa/vitepress` | Connects VitePress to `vite-plugin-pwa` |
| Workbox `generateSW` | Generates `sw.js` and a revisioned precache manifest |
| Web app manifest | Describes the installed app name, icon, start URL, scope, and colors |
| `workbox-window` | Registers the worker and exposes lifecycle callbacks to the page |
| `ReloadPrompt.vue` | Shows offline-ready and update-waiting states |
| VitePress theme slot | Mounts the prompt in the default site layout |

The editable Markdown remains the content source of truth. The production
build produces the files that the service worker actually caches.

```text
Markdown and VitePress source
            ↓ pnpm docs:build
static HTML + JS + CSS + search data + fonts + icon
            ↓ Workbox build integration
sw.js + revisioned precache entries + manifest.webmanifest
```

## Build-Time Precaching versus Runtime Caching

### Precaching

**Precaching** chooses files while building the application. Workbox records a
URL and revision for each matching output file. During service-worker
installation, the browser downloads those files into a versioned cache.

```text
production build
      ↓
discover matching output files
      ↓
create URL + revision entries
      ↓
install service worker
      ↓
download the precache
```

This is a strong fit for a small static wiki because the set of documents and
assets is known at build time. A reader can open a generated page offline even
if that exact page was not visited previously, provided the initial precache
completed successfully.

### Runtime caching

**Runtime caching** stores or reuses responses as requests occur while the
application runs. It is useful for changing API responses, external images, or
other resources that cannot be completely enumerated at build time.

The current CS Wiki does not configure a Workbox `runtimeCaching` policy. Its
offline model is build-time precaching of the generated static site.

### Common runtime strategies

These strategies are useful when an application later adds resources that are
not fully known at build time:

| Strategy | First source consulted | Typical fit | Main trade-off |
| --- | --- | --- | --- |
| Cache only | Cache | Fully precached immutable resources | Fails if the entry is absent |
| Network only | Network | Requests that must never use a stored response | No offline behavior |
| Cache first | Cache, then network | Versioned static assets | Unversioned entries can become stale |
| Network first | Network, then cache | HTML or data where freshness leads | Slow failure before offline fallback |
| Stale while revalidate | Cache immediately, network in background | Frequently reused resources that tolerate brief staleness | The current response may be old |

Workbox precache routing uses a cache-first response for known precached URLs,
while revisions and content-hashed filenames let a later worker install the
new build without confusing it with the old entry. This is separate from
configuring a general runtime `CacheFirst` strategy.

## Current VitePress and PWA Configuration

The PWA integration wraps the ordinary VitePress configuration with
`withPwa(...)`. The following is the current PWA-relevant configuration; the
large navigation and sidebar configuration is omitted because it does not
change the worker behavior.

```ts
import { withPwa } from '@vite-pwa/vitepress'
import { defineConfig } from 'vitepress'

export default withPwa(defineConfig({
  title: 'CS Wiki',
  description: 'A practical, evolving knowledge base for computer science and software development.',
  base: '/',
  cleanUrls: true,
  head: [
    ['link', {
      rel: 'icon',
      href: '/pwa-icon.svg',
      type: 'image/svg+xml',
    }],
  ],
  vite: {
    publicDir: '.vitepress/public',
  },

  // Existing source, search, navigation, and sidebar configuration omitted.

  pwa: {
    registerType: 'prompt',
    manifest: {
      id: '/',
      name: 'CS Wiki',
      short_name: 'CS Wiki',
      description: 'A practical knowledge base for computer science and software development.',
      start_url: '/',
      scope: '/',
      display: 'standalone',
      theme_color: '#1b1b1f',
      background_color: '#1b1b1f',
      icons: [
        {
          src: '/pwa-icon.svg',
          sizes: 'any',
          type: 'image/svg+xml',
          purpose: 'any maskable',
        },
      ],
    },
    workbox: {
      cleanupOutdatedCaches: true,
      globPatterns: ['**/*.{css,html,ico,js,json,svg,webmanifest,woff2}'],
      maximumFileSizeToCacheInBytes: 12 * 1024 * 1024,
      navigateFallback: null,
    },
  },
}))
```

Current source:
[`.vitepress/config.ts` on `main`](https://github.com/buttererror/CS-wiki/blob/main/.vitepress/config.ts).
The initial PWA commit used `/CS-wiki/`; the current working configuration uses
root-relative deployment paths.

### Deployment base and scope must agree

The current code sets VitePress, the manifest, and the icon URL to `/`. These
values must agree with one another and with the eventual hosting URL:

| Setting | Meaning |
| --- | --- |
| VitePress `base` | Prefix used for built pages and assets |
| Manifest `id` | Stable identity of the installed web app |
| Manifest `start_url` | URL opened when the installed app starts |
| Manifest `scope` | Navigation range represented by the installed app |
| Service-worker scope | URLs the registered worker is allowed to control |

| Hosting shape | Required base example |
| --- | --- |
| Origin root or a custom domain | `/` |
| GitHub repository Pages at `https://user.github.io/CS-wiki/` | `/CS-wiki/` |

If the build emits `/assets/app.js` but the site is hosted only beneath
`/CS-wiki/`, the deployed page requests the wrong URL. Conversely, hard-coding
`/CS-wiki/` is wrong for a site genuinely hosted at the origin root. Consistent
base and scope values prevent that mismatch and keep the worker from claiming
unintended paths.

The current root-scoped code conflicts with the repository's existing GitHub
Pages plan and workflow unless Pages is fronted by a custom domain at the
origin root. That deployment decision must be resolved before claiming hosted
PWA validation.

Manifest scope and service-worker scope are independent. The manifest does not
grant worker control. By default, a worker can control its own directory and
descendants: the current worker served from `/sw.js` can naturally control `/`.
A repository Pages worker served from `/CS-wiki/sw.js` would naturally control
`/CS-wiki/`. A server can broaden the allowed worker scope with a
`Service-Worker-Allowed` response header, but matching the script location and
intended base is simpler here.

### What the manifest does

The web app manifest supplies install-facing metadata:

- `name` and `short_name` label the application;
- `start_url` selects the initial installed route;
- `scope` limits which navigations belong to the application;
- `display: 'standalone'` requests an app-like window when installed;
- colors influence launch and browser UI; and
- icons identify the installed application.

The manifest does not cache the wiki and does not intercept requests. Those are
service-worker responsibilities.

### Current installability limitation

The current manifest contains one scalable SVG icon with `sizes: 'any'` and
`purpose: 'any maskable'`. SVG is a valid manifest icon format, and multiple
space-separated purposes are valid hints. However, Chromium's criteria for
promoting a PWA for installation require 192×192 and 512×512 icons.

Therefore:

- the current service worker and offline cache can work without install
  promotion;
- the manifest and SVG icon provide useful metadata;
- browser and platform install UI can vary; and
- Chromium installability must not be claimed until dedicated 192 px and
  512 px icons are added and verified in the deployed manifest.

Maskable artwork also needs its meaningful content inside the maskable safe
zone. Merely writing `purpose: 'maskable'` does not prove that an icon is
visually safe under circular or rounded platform masks.

### What the Workbox options do

`globPatterns` selects generated output by file extension. For this wiki it
includes HTML documents, JavaScript, CSS, JSON search data, fonts, the manifest,
and the local SVG icon.

`cleanupOutdatedCaches: true` lets a newly active worker remove obsolete
Workbox precaches left by older builds.

`maximumFileSizeToCacheInBytes` is a **per-file limit**, not a total cache-size
budget. Here, an individual generated file larger than 12 MiB produces the
Workbox maximum-size exclusion; current Vite PWA versions surface that condition
as a production-build error rather than silently accepting an incomplete
precache. The total build and cache size must still be measured separately.

In the build validated for this article, `.vitepress/dist/` contained 329 files
using about 9.39 MiB on disk, and the generated worker contained 328 revision
entries. These are a snapshot, not a permanent budget: content and generated
chunks will change over time, and the complete browser storage cost can differ
from the filesystem total.

`navigateFallback: null` disables a generic navigation fallback to
`index.html`. That matters for a static documentation site: an unknown or
deleted URL should not silently display the home page as though it were the
requested article.

## Service-Worker Lifecycle

A service worker has a lifecycle separate from the document that registers it.

```text
downloaded
    ↓
installing → build precache is populated
    ↓
waiting    → an older worker may still control open pages
    ↓
activating → old cache cleanup can run
    ↓
active     → controls eligible pages after the lifecycle transition
```

On the first visit, installation fills the precache. On a later deployment,
the browser can download a new worker while an older worker continues serving
the current page.

On the first registration there may be no older worker, so the new worker can
activate without an update-waiting conflict. Even after activation, the
document that initiated registration is not controlled automatically unless
the worker calls `clients.claim()`. Ordinarily, a navigation or reload creates
a document controlled by the active worker. The prompt-based update path
reloads deliberately after activation.

Immediately replacing the old worker can produce an inconsistent session:

```text
old HTML is already open
        +
new worker begins serving new hashed assets
        ↓
page can mix files from two builds
```

The current configuration uses `registerType: 'prompt'`. A newer worker waits
until the reader accepts the update. The page then asks it to activate and
reloads into one consistent build.

### How an update is discovered

Publishing files does not push a worker directly into every open browser.
Browsers perform update checks around events such as navigation within the
worker's scope and repeated registration of the same worker URL. The worker is
considered a new version when its script or imported worker code changes.

`immediate: true` asks the registration helper to register promptly when this
component mounts. It does not mean “poll the server continuously.” A long-lived
tab that must discover updates without navigation would need an explicit,
carefully designed periodic `registration.update()` policy.

## Why Registration Happens Only in the Browser

VitePress statically renders pages during the production build. Build-time
rendering does not have browser globals such as `window`, `navigator`, or
`serviceWorker`.

The registration component therefore waits for Vue's `onMounted()` lifecycle
and dynamically imports `virtual:pwa-register`:

```text
VitePress build
→ render component structure without browser registration

browser mount
→ import registration helper
→ register generated service worker
→ react to worker lifecycle callbacks
```

This prevents browser-only code from executing in the static rendering phase.

## Complete Current Registration and Prompt Component

The component below is the complete current
`.vitepress/theme/components/ReloadPrompt.vue` file:

```vue
<script setup lang="ts">
import { onMounted, ref } from 'vue'

const offlineReady = ref(false)
const needRefresh = ref(false)

let updateServiceWorker: ((reloadPage?: boolean) => Promise<void>) | undefined

onMounted(async () => {
    const { registerSW } = await import('virtual:pwa-register')

    updateServiceWorker = registerSW({
        immediate: true,
        onOfflineReady() {
            offlineReady.value = true
        },
        onNeedRefresh() {
            needRefresh.value = true
        },
        onRegisterError(error) {
            console.error('Unable to register the CS Wiki service worker.', error)
        },
    })
})

function closePrompt() {
    offlineReady.value = false
    needRefresh.value = false
}

async function reloadForUpdate() {
    await updateServiceWorker?.(true)
}
</script>

<template>
    <aside
        v-if="offlineReady || needRefresh"
        class="reload-prompt"
        aria-live="polite"
        aria-atomic="true"
        role="status"
    >
        <p>{{ needRefresh ? 'New wiki content is available.' : 'The CS Wiki is ready to use offline.' }}</p>
        <div class="reload-prompt__actions">
            <button v-if="needRefresh" type="button" @click="reloadForUpdate">Reload</button>
            <button type="button" class="reload-prompt__close" @click="closePrompt">Close</button>
        </div>
    </aside>
</template>

<style scoped>
.reload-prompt {
    position: fixed;
    z-index: 100;
    right: 1rem;
    bottom: 1rem;
    max-width: min(24rem, calc(100vw - 2rem));
    padding: 1rem;
    border: 1px solid var(--vp-c-divider);
    border-radius: 0.5rem;
    background: var(--vp-c-bg-soft);
    box-shadow: var(--vp-shadow-3);
}

.reload-prompt p { margin: 0 0 0.75rem; }

.reload-prompt__actions { display: flex; justify-content: flex-end; gap: 0.5rem; }

button {
    padding: 0.4rem 0.7rem;
    border: 1px solid var(--vp-c-brand-1);
    border-radius: 0.25rem;
    background: var(--vp-c-brand-1);
    color: var(--vp-c-white);
    font: inherit;
    cursor: pointer;
}

.reload-prompt__close { border-color: var(--vp-c-divider); background: transparent; color: var(--vp-c-text-1); }
</style>
```

Implementation reference:
[`ReloadPrompt.vue` at commit `057522d`](https://github.com/buttererror/CS-wiki/blob/057522d337e17706fb3bfae40e399ebf6e93c576/.vitepress/theme/components/ReloadPrompt.vue).

### Registration callbacks

| Callback | Meaning in this UI |
| --- | --- |
| `onOfflineReady` | Initial caching completed; the wiki can now announce offline readiness |
| `onNeedRefresh` | A new worker finished installing and is waiting to replace the current version |
| `onRegisterError` | Registration failed; log diagnostics without breaking normal document access |

`updateServiceWorker(true)` tells the waiting worker to activate and requests a
page reload. Optional chaining protects the button handler if registration did
not finish normally.

`closePrompt()` hides the current message. Closing an update prompt does not
activate the waiting worker, so the open page stays on its current version.

### Accessibility behavior

The message is ordinary in-page UI rather than an operating-system
notification. `role="status"` and `aria-live="polite"` announce the state
without abruptly interrupting the reader. The actions are native buttons, so
they remain keyboard operable.

## Do We Need a Notification?

The offline cache does not technically require visible UI, but two in-page
messages improve clarity:

1. **Offline ready:** tells the reader when the first precache has actually
   finished. Seeing the page online does not prove the cache is complete.
2. **Update available:** lets the reader choose when to replace an active
   version and reload into the new build.

This does **not** require the Web Notifications API, push messages, or browser
notification permission. An operating-system notification would be intrusive
and unnecessary for this lifecycle state.

## Complete Theme Mount

The default VitePress theme is extended rather than replaced. The prompt is
inserted through the `layout-bottom` slot:

```ts
import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import { h } from 'vue'

import ReloadPrompt from './components/ReloadPrompt.vue'

export default {
    extends: DefaultTheme,
    Layout: () => h(DefaultTheme.Layout, null, {
        'layout-bottom': () => h(ReloadPrompt),
    }),
} satisfies Theme
```

Implementation reference:
[`theme/index.ts` at commit `057522d`](https://github.com/buttererror/CS-wiki/blob/057522d337e17706fb3bfae40e399ebf6e93c576/.vitepress/theme/index.ts).

The slot provides a stable global mounting point, while the component's fixed
positioning makes the message visible independently of the current article.

## Dependencies and Generated Files

The implementation adds two direct development dependencies:

```json
{
  "devDependencies": {
    "@vite-pwa/vitepress": "^1.1.0",
    "workbox-window": "^7.4.1"
  }
}
```

`pnpm docs:build` generates important PWA artifacts under
`.vitepress/dist/`:

```text
manifest.webmanifest
sw.js
workbox-<revision>.js
pwa-icon.svg
HTML, CSS, JavaScript, JSON search data, and fonts
```

The generated worker and Workbox runtime are build artifacts. They should be
regenerated from configuration rather than edited by hand.

## Storage Lifetime, Quotas, and Data Cost

Cache Storage is normally **best-effort** origin storage. The cache can survive
reloads and browser restarts, but it is not an irrevocable offline copy. A user
can clear it, private-browsing policies can restrict it, and a browser can evict
origin data under storage pressure. Attempts to exceed an origin's quota can
fail.

The full-site precache also has a network cost on first installation. That is
reasonable only while the static wiki remains small enough to justify making
every generated page available offline. Review both generated size and user
value as the wiki grows; possible later choices include a smaller application
shell, route groups, or deliberate runtime caching.

Changing the local preview port changes the origin because an origin is the
combination of scheme, host, and port. It therefore creates separate worker,
cache, and storage state rather than updating the registration on the old port.

## Security and Privacy Boundaries

A service worker is powerful because it can answer requests for every
controlled page in its scope. HTTPS protects registration from network
tampering, but application cache policy still needs deliberate boundaries.

The CS Wiki precaches public static documentation. It does not currently cache
authenticated API responses or private user data. If the application later
adds those resources, do not place them in a shared cache merely because a
runtime strategy is convenient. Review credentials, response authorization,
cache keys, logout behavior, retention, and whether the response should be
stored at all.

Offline access also does not make server writes work offline. Supporting form
submissions or edits while disconnected would require a separate synchronization
and conflict-resolution design; it is outside the current read-only wiki scope.

## How to Test the Current Implementation Locally

Service workers require a secure context. HTTPS is required in production;
`localhost` and `127.0.0.1` are treated as secure contexts for local
development.

Build and serve the actual production output:

```bash
pnpm docs:build
pnpm docs:preview --host 127.0.0.1 --port 4174
```

Open:

```text
http://127.0.0.1:4174/
```

The port is not significant. Choose another free port if `4174` is busy.
Service workers and site storage are isolated by origin, and the port is part
of the origin, so changing the port also creates a separate local test state.

### First-install and offline test

1. Open browser developer tools.
2. Under Application or Storage, clear existing site data for the test origin.
3. Load `/` while online.
4. Confirm the worker becomes activated and the offline-ready message appears.
5. Reload once if developer tools show that the first document is not yet
   controlled; `navigator.serviceWorker.controller` should then be non-null.
6. Inspect Cache Storage and confirm representative HTML, search data, assets,
   and the icon are present.
7. Enable Offline mode in the Network panel.
8. Reload the home page.
9. Open nested articles that were not individually visited before going
   offline.
10. Use local search and confirm its generated JSON and JavaScript are cached.
11. Confirm the local icon and fonts still render.

### Update test

1. Return online while the current worker controls the page.
2. Change a source document and run `pnpm docs:build` again.
3. Keep serving the rebuilt output from the same origin.
4. Reload or revisit the page so registration checks the new worker.
5. Confirm “New wiki content is available.” appears.
6. Close the prompt and confirm the current page remains usable on its old
   version.
7. Revisit, accept Reload, and confirm the new content appears after activation.
8. Confirm only one reload occurs and the page no longer requests deleted
   hashed assets from the previous build.

### Manifest and installability test

1. Open the generated `manifest.webmanifest` in developer tools.
2. Confirm the current `id`, `start_url`, `scope`, and icon URLs use `/`.
3. Check the browser's manifest diagnostics rather than inferring
   installability from the presence of the manifest alone.
4. Record the current missing 192×192 and 512×512 icon requirement as an
   expected limitation until those assets are implemented.

### Why `docs:dev` is not the acceptance test

```bash
pnpm docs:dev
```

The development server is appropriate for authoring and ordinary UI checks,
but the PWA plugin disables production service-worker behavior in development
by default. Hot-module replacement and a persistent offline cache would also
make development state harder to reason about.

Vite PWA can expose a development worker with `devOptions.enabled: true`, but
that development worker has intentionally limited precache behavior and is not
proof of the production manifest or generated precache. The current project
does not enable this option.

Use `docs:build` followed by `docs:preview` to test the generated worker and
precache that will actually be deployed.

## Common Failure Modes

| Symptom | Likely cause | Check |
| --- | --- | --- |
| Worker does not register | Insecure origin, wrong worker URL, or registration error | Use HTTPS or localhost and inspect Service Workers in developer tools |
| Assets return 404 after deployment | Configured base does not match the hosting path | Use `/` for origin-root hosting or `/CS-wiki/` for repository Pages and align every manifest/worker URL |
| Page works online but not offline | Precache did not finish or file pattern excluded an asset | Wait for offline-ready and inspect Workbox cache entries |
| Old page requests missing hashed assets | HTML and assets came from different builds | Keep prompt-based updates and activate/reload as one transition |
| Update prompt never appears | Browser has not checked or downloaded the new worker | Revisit online, inspect worker states, and keep the same origin |
| Unknown route shows the home page | Generic navigation fallback is enabled | Keep `navigateFallback: null` for honest static-site routing |
| `docs:dev` appears to have no worker | Production PWA behavior is disabled in development | Test `docs:build` plus `docs:preview` |
| Preview port is busy | Another local process is listening on it | Stop that process or pass a different `--port` |
| Browser does not offer installation | Manifest criteria or platform support are incomplete | Add and validate 192×192 and 512×512 icons; inspect manifest diagnostics |
| Offline data disappears later | User clearing, private-mode policy, quota, or browser eviction | Treat Cache Storage as best-effort and retest from a clean origin |
| First online load becomes slower | Full precache competes for bandwidth | Measure build size and registration timing; reduce the precache when needed |

## Current Guarantees and Remaining Validation

The current implementation has passed a production VitePress build and local
browser verification of the offline-ready prompt. It generates the manifest,
service worker, Workbox runtime, and precached static output.

The full deployment and update cycle still needs verification on the final
HTTPS origin. Local preview demonstrates browser mechanics, but it does not
prove hosting-path behavior or a later live deployment's worker transition.
Before that verification, reconcile the current `/` base with the documented
GitHub repository Pages target `/CS-wiki/`, or document the custom root-domain
deployment that makes `/` correct.

The following must also remain pending rather than being implied by the build:

- full offline navigation and local-search acceptance across multiple browsers;
- update-prompt, waiting-worker, activation, and obsolete-cache behavior after
  two real deployments;
- install promotion after adding the required icon sizes;
- keyboard, screen-reader, narrow-screen, light-theme, and dark-theme checks;
  and
- long-term cache-size, quota, eviction, and first-load data-cost monitoring.

## What to Remember

- A PWA is the enhanced application experience; a service worker is one
  browser mechanism used to implement it.
- A manifest describes installation metadata; it does not cache content.
- Precaching records build output ahead of runtime; runtime caching learns from
  requests as they occur.
- Service-worker scope, VitePress base, manifest URLs, and deployment paths must
  agree.
- Manifest scope does not grant service-worker scope, and a manifest does not
  prove installability.
- A newly installed worker can wait while an older worker controls open pages.
- Prompt-based activation prevents one page session from casually mixing two
  revisioned builds.
- Offline-ready and update-available messages belong in accessible in-page UI;
  browser notification permission is unnecessary.
- Test the production build with `docs:preview`, not only the development
  server.
- Treat browser cache storage as best-effort and budget the complete precache,
  not only the largest individual file.

## Primary Sources

- [MDN: Service Worker API](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)
- [MDN: Using Service Workers](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers)
- [MDN: Making PWAs installable](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/Making_PWAs_installable)
- [MDN: Web app manifest icons](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Manifest/Reference/icons)
- [MDN: Storage quotas and eviction criteria](https://developer.mozilla.org/en-US/docs/Web/API/Storage_API/Storage_quotas_and_eviction_criteria)
- [Workbox: Precaching](https://developer.chrome.com/docs/workbox/modules/workbox-precaching)
- [Workbox: Service-worker lifecycle](https://developer.chrome.com/docs/workbox/service-worker-lifecycle)
- [Workbox: Deployment expectations](https://developer.chrome.com/docs/workbox/service-worker-deployment/)
- [Vite PWA: Prompt for new content](https://vite-pwa-org.netlify.app/guide/prompt-for-update)
- [Vite PWA: Development behavior](https://vite-pwa-org.netlify.app/guide/development)

## Related Concepts

- [Frontend Development](../README.md)
- [Browser Runtime](../browser-runtime/README.md)
- [Server and Client Rendering](../rendering/server-and-client-rendering.md)
- [Serialization](../data-across-boundaries/serialization.md)
- [Software Testing](../../software-development-practices/testing/README.md)
- [Implementation plan on GitHub](https://github.com/buttererror/CS-wiki/blob/057522d337e17706fb3bfae40e399ebf6e93c576/docs/plans/static-wiki-pwa.md)
- [Initial PWA implementation commit](https://github.com/buttererror/CS-wiki/commit/057522d337e17706fb3bfae40e399ebf6e93c576)
