# Static Wiki and Offline PWA Plan

**Status:** Proposed

**Scope:** Build and deployment infrastructure for the CS Wiki

**Target hosting:** GitHub Pages at `/CS-wiki/`

## Context

The repository currently stores the wiki as plain Markdown. This is ideal for
editing, reviewing, cloning, and reading through GitHub, but a service worker
cannot control pages rendered on `github.com`. Offline browser access therefore
requires a separately built static website on an origin controlled by this
project, such as GitHub Pages.

The current collection is small enough that caching it as one offline unit is a
reasonable starting hypothesis. The decision should be validated against the
production build output rather than a Markdown-file count because generated
HTML, JavaScript, search data, fonts, and images determine the actual download
and storage cost. If the complete build remains within an explicit precache
budget, precache it so offline behavior is predictable and includes local
search.

## Goals

- Keep Markdown as the source of truth and preserve ordinary GitHub browsing.
- Generate static HTML, navigation assets, and a local full-text search index.
- Deploy the generated site under the GitHub Pages `/CS-wiki/` base path.
- Make every generated wiki page searchable and readable after the first
  successful online load.
- Make the site installable using a web app manifest.
- Notify readers when the wiki is ready offline and when updated content is
  waiting.
- Activate updated content only after the reader chooses to reload.

## Non-goals

- Replacing Markdown with a CMS or database.
- Adding a server-side search service.
- Sending operating-system push notifications.
- Making `github.com` repository pages work offline.
- Synchronizing edits made while offline.
- Redesigning or reorganizing the wiki content as part of this work.

## Proposed architecture

```text
Markdown files
      |
      | VitePress production build
      v
Static HTML + local search data + hashed CSS/JS/assets
      |
      | @vite-pwa/vitepress and Workbox
      v
Web app manifest + generated service worker + precache manifest
      |
      | GitHub Actions deployment
      v
GitHub Pages at /CS-wiki/
```

### Technology choices

- **VitePress:** Generate file-based static HTML while retaining the existing
  Markdown directory structure and relative `.md` links.
- **VitePress local search:** Generate an in-browser full-text search index;
  avoid a hosted search dependency.
- **`@vite-pwa/vitepress`:** Integrate PWA generation with VitePress.
- **Workbox `generateSW`:** Generate the service worker and revisioned precache
  manifest from production build output.
- **GitHub Pages:** Serve the static output over HTTPS under the repository base
  path.

## Implementation phases

### Phase 1: Establish the VitePress build

1. Add a Node package manifest and lockfile.
2. Add VitePress as a development dependency.
3. Add these package scripts:
   - `docs:dev`
   - `docs:build`
   - `docs:preview`
4. Add `.vitepress/config.ts` with:
   - the wiki title and description;
   - `base: "/CS-wiki/"`;
   - local search;
   - initial top-level navigation;
   - heading outlines;
   - the GitHub repository link;
   - source exclusions for project-only documentation under `docs/**`.
5. Add `index.md` as the VitePress home route while retaining `README.md` as
   the GitHub repository landing page. Include the README content from
   `index.md` and exclude the root `README.md` as a separately generated page.
6. Add generated directories such as `node_modules/`, `.vitepress/cache/`, and
   `.vitepress/dist/` to `.gitignore`.

**Deliverable:** `pnpm docs:build` produces a static site in
`.vitepress/dist/` without modifying source Markdown.

### Phase 2: Validate document conversion and search

1. Confirm every intended Markdown document produces a reachable HTML page.
2. Verify current relative links and heading fragments after conversion.
3. Decide whether nested `README.md` routes should remain as `README.html` or
   be rewritten to directory index routes. Prefer preserving existing routes
   initially; introduce rewrites only if they materially improve navigation.
4. Verify code blocks, tables, lists, and internal anchors on representative
   old and new notes.
5. Confirm that local search returns results from titles, headings, and body
   text across different directories.
6. Check that project-only planning documents are absent from the public search
   index and generated site.

**Deliverable:** The generated site represents the existing wiki faithfully,
and search requires no network service.

### Phase 3: Add the installable PWA metadata

1. Add `@vite-pwa/vitepress` as a development dependency.
2. Wrap the VitePress configuration with `withPwa`.
3. Add a web app manifest containing:
   - stable app ID;
   - full and short names;
   - description;
   - `/CS-wiki/` start URL and scope;
   - standalone display mode;
   - theme and background colors;
   - 192 px, 512 px, and maskable icons.
4. Add self-hosted favicon and PWA icon files under `public/`.
5. Avoid runtime dependencies on cross-origin fonts or images unless a
   deliberate runtime caching policy is added for them.

**Deliverable:** Browsers recognize the deployed wiki as installable, with the
service worker restricted to the repository path.

### Phase 4: Precache the complete wiki

1. Use Workbox's generated-service-worker strategy.
2. Include all generated HTML, JavaScript, CSS, JSON/search data, icons, images,
   and local font files in the build-time precache manifest.
3. Define and document an explicit precache-size budget based on the production
   build, then revisit the strategy if the generated site exceeds it.
4. Keep `cleanupOutdatedCaches` enabled.
5. Use revisioned precaching instead of manually named version caches.
6. Keep the update registration type as `prompt`; do not activate a waiting
   worker automatically while an old page is open.
7. Review handling for unknown or removed URLs so an invalid navigation does
   not incorrectly render the home page as if it were the requested document.

**Deliverable:** After one complete online load, an unvisited generated page and
the local search interface both work with the browser in offline mode.

### Phase 5: Add offline and update notifications

1. Create `.vitepress/theme/components/ReloadPrompt.vue`.
2. Dynamically import `virtual:pwa-register` on the client because VitePress
   performs static server-side rendering during the build.
3. Handle these registration callbacks:
   - `onOfflineReady`: show “The CS Wiki is ready to use offline.”
   - `onNeedRefresh`: show “New wiki content is available.”
   - `onRegisterError`: log a diagnostic without breaking document access.
4. Provide `Reload` and `Close` actions when an update is waiting.
5. On `Reload`, ask the waiting worker to activate and then reload the page so
   one page session does not mix old HTML with newly revisioned assets.
6. Mount the component through `.vitepress/theme/index.ts` using the default
   theme's `layout-bottom` slot.
7. Make the notification keyboard accessible and announce its state with an
   appropriate live region. Do not request browser notification permission.

**Deliverable:** Initial offline readiness and later deployments produce clear,
non-blocking in-page notifications.

### Phase 6: Deploy through GitHub Pages

1. Add a GitHub Actions workflow for pushes to the default branch and manual
   dispatches.
2. Install dependencies from the lockfile.
3. Run the production build.
4. Upload `.vitepress/dist/` as the Pages artifact.
5. Deploy it using GitHub Pages permissions and environments.
6. Configure the repository's Pages source as GitHub Actions.
7. Keep the `/CS-wiki/` base path consistent across VitePress, the web app
   manifest, service-worker registration, and deployment URLs.

**Deliverable:** Each successful default-branch deployment publishes a new,
revisioned static wiki and service worker.

## Validation plan

### Build validation

- Run the production build from a clean dependency installation.
- Fail the build on unresolved internal links where supported; otherwise add a
  focused link-checking step.
- Inspect `.vitepress/dist/` for representative HTML routes, hashed assets, the
  manifest, and generated service-worker files.
- Confirm planning documents and build caches are not published.

### Browser validation

Use a production preview or deployed HTTPS site; do not treat the development
server as proof of service-worker behavior.

1. Open the site with storage cleared.
2. Confirm service-worker registration and completion of the first precache.
3. Confirm the offline-ready notification appears.
4. Enable browser offline mode.
5. Reload the home page and several nested pages, including a page not opened
   before going offline.
6. Search for content from multiple documents while offline.
7. Confirm local assets and icons render offline.
8. Return online, deploy a changed document, and revisit the site.
9. Confirm the new worker enters the waiting state and the update notification
   appears.
10. Confirm `Close` preserves the current version for that session.
11. Confirm `Reload` activates the update, reloads once, and displays the new
    content.
12. Confirm obsolete precache entries are removed after activation.
13. Test keyboard navigation, screen-reader announcements, narrow screens, and
    both light and dark themes.

### Hosting validation

- Verify all document, asset, manifest, and service-worker URLs remain beneath
  `/CS-wiki/`.
- Verify direct navigation and refresh work for nested document URLs on GitHub
  Pages.
- Verify the service worker does not claim unrelated paths on the Pages origin.
- Verify a missing page produces an honest 404 rather than a misleading home
  page fallback.

## Acceptance criteria

- Markdown remains the editable source of truth and the GitHub README remains
  useful.
- The production build generates static HTML for every intended wiki page.
- Local search works online and offline without an external search service.
- The complete wiki is available offline after the first successful load,
  including pages not individually visited beforehand.
- The production build stays within the documented precache-size budget.
- The manifest offers a valid installable experience with correct icons and
  `/CS-wiki/` scope.
- A reader sees a confirmation when the offline cache is ready.
- A reader sees an update prompt after a new version has been downloaded.
- Dismissing the prompt does not unexpectedly replace assets in the active
  session.
- Accepting the prompt activates the new worker and reloads into a consistent
  version.
- Old caches are cleaned up automatically.
- Direct nested URLs and missing-page behavior work correctly on GitHub Pages.
- The plan and other internal project documents are not published as wiki
  content.

## Risks and mitigations

| Risk | Mitigation |
| --- | --- |
| Incorrect `/CS-wiki/` base or scope breaks assets and registration | Define and test the same base path in VitePress, manifest, deployment, and service-worker output. |
| Automatically activating a worker mixes old and new hashed assets | Use prompt-based activation and reload only after reader confirmation. |
| A generic navigation fallback hides real 404s | Test unknown routes and avoid treating every navigation as the home page. |
| External resources fail offline | Bundle or self-host required runtime assets; add runtime caching only for deliberate exceptions. |
| Generated output or dependencies pollute Git | Ignore build output, caches, and dependency directories; deploy generated output as an artifact. |
| Content moves break the large existing relative-link graph | Validate links before and after adopting VitePress; avoid unrelated content reorganization. |
| Cache size grows substantially over time | Measure production output and revisit full precaching if large binary assets are added later. |

## Rollback strategy

The feature is additive. If the PWA behavior causes problems:

1. Remove service-worker registration and the PWA wrapper from the build.
2. Deploy the static site once without registration.
3. If necessary, temporarily deploy a small cleanup worker at the same URL and
   scope that deletes project-owned caches and unregisters itself.
4. Keep the VitePress static build and GitHub Pages site if they remain useful;
   they do not depend on offline support.

Do not rename or move the deployed service-worker URL casually. Browsers check
the existing URL for updates, so a cleanup release must remain discoverable by
previous installations.

## Suggested execution order

Implement and review each slice independently:

1. Static build and local search.
2. Document/link compatibility fixes.
3. Manifest and icons.
4. Full precaching.
5. Offline/update notification UI.
6. GitHub Pages workflow.
7. Deployed offline and update-cycle validation.

This order keeps failures attributable to one layer and allows the static site
to deliver value before service-worker behavior is introduced.

## Primary references

- [VitePress routing](https://vitepress.dev/guide/routing)
- [VitePress local search](https://vitepress.dev/reference/default-theme-search)
- [VitePress deployment](https://vitepress.dev/guide/deploy)
- [Vite PWA integration for VitePress](https://vite-pwa-org.netlify.app/frameworks/vitepress)
- [Workbox precaching](https://developer.chrome.com/docs/workbox/precaching-with-workbox)
- [Workbox service-worker update handling](https://developer.chrome.com/docs/workbox/handling-service-worker-updates)
