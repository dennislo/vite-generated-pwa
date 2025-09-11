# Example Progressive Web App: Vite.js / React / Workbox

## Common Use Cases

See [common use cases](documents/service-workers-common-use-cases.md).

## _Proposal_: Tools / Packages

1. [`vite-plugin-pwa`](https://github.com/vite-pwa/vite-plugin-pwa) Zero-config PWA Framework-agnostic Plugin for Vite,
   see [guide](https://vite-pwa-org.netlify.app/guide/) on how to add `vite-plugin-pwa` to project.

2. Include [`workbox`](https://developers.google.com/web/tools/workbox): Production-ready service worker libraries and
   tooling:
    * [`workbox-build`](https://developer.chrome.com/docs/workbox/modules/workbox-build#type-StrategyName)
    * [`workbox-core`](https://developer.chrome.com/docs/workbox/modules/workbox-core)
    * [`workbox-window`](https://developer.chrome.com/docs/workbox/modules/workbox-window)

## Running on localhost

```bash
npm install
npm run dev
```

1. Open http://localhost:5173 in your browser. Ensure you use incognito/private window or clear site data to see the
   service worker registration in action.
2. Open dev tools > Application tab > Application > Service Workers section to see the registered service. Refer to *
   *Debugging Service
   Workers** in [Useful links](#useful-links) for more information.

## Noteworthy example files

1. **`vite.config.ts`** Vite configuration file where the PWA plugin is configured
    * **`workbox.runtimeCaching`**: This is the most important part for offline web service integration. Here you define (
      multiple) rules for different types of requests
    * `urlPattern`: A string or regular expression to match the URLs of the web service you want to cache
    * `handler`: The caching strategy to use. Options are `NetworkFirst`, `CacheFirst`, `StaleWhileRevalidate`, and
      `CacheOnly`. See [workbox-strategies](https://developer.chrome.com/docs/workbox/modules/workbox-strategies) for
      more details.
    * `options`: Further customization, such as the `cacheName` and expiration settings
    * `devOptions.enabled`: Set to false for production, Set true to enable PWA in development mode
2. `public/manifest.json` Web App Manifest file
3. `src/App.tsx` Example fetching data from API https://jsonplaceholder.typicode.com/posts
4. **`src/PWABadge.tsx`** React component to handle PWA updates
5. `pwa-assets.config.ts` Configuration for generating PWA assets (icons, splash screens, etc.)

## [Useful links](#useful-links):

* [Scaffolding Vite PWA project](https://vite-pwa-org.netlify.app/guide/#scaffolding-your-first-vite-pwa-project)
* [Debugging Service Workers](https://developer.chrome.com/docs/devtools/progressive-web-apps#summary)
* [Workbox caching strategies](https://developer.chrome.com/docs/workbox/modules/workbox-strategies#type-CacheFirst)

## Useful screenshots

### Registered list

Go to dev tools > Application tab > Application > Service Workers section
![Service Workers Registered list](./documents/service-workers-registered-list.png)

### Cache storage

Go to dev tools > Application tab > Storage > Cache storage section
![Service Workers Cache storage](./documents/service-workers-cache-storage.png)

### Request interception cache storage hit

1. Go to dev tools > Network tab
2. Add filter `is:service-worker-intercepted`. Note `(ServiceWorker)` under Size column

![Service Workers requests cache hit](./documents/service-workers-requests-cache-hit.png)
