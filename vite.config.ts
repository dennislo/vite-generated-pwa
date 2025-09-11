import {VitePWA} from 'vite-plugin-pwa';
import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react(), VitePWA({
    registerType: 'prompt',
    injectRegister: false,

    pwaAssets: {
      disabled: false,
      config: true,
    },

    manifest: {
      name: 'vite-pwa-project',
      short_name: 'vite-pwa-project',
      description: 'PWA description',
      theme_color: '#ffffff',
    },

    workbox: {
      globPatterns: ['**/*.{js,css,html,svg,png,ico}'],
      cleanupOutdatedCaches: true,
      clientsClaim: true,
      runtimeCaching: [
        // Rule 1: Caching posts API
        {
          urlPattern: /^https:\/\/jsonplaceholder\.typicode\.com\/posts/i,
          handler: 'CacheFirst',
          options: {
            cacheName: 'posts-api-cache',
            expiration: {
              maxEntries: 50,
              maxAgeSeconds: 60 * 60 * 24 * 7 // 1 week
            },
            cacheableResponse: {
              statuses: [0, 200]
            }
          }
        },
        // Rule 2: Caching user profile API with a different strategy
        // {
        //   urlPattern: ({ url }) => url.pathname.startsWith('/api/user/profile'),
        //   handler: 'StaleWhileRevalidate', // Balance between speed and freshness
        //   options: {
        //     cacheName: 'user-profile-cache',
        //     expiration: {
        //       maxEntries: 10,
        //       maxAgeSeconds: 60 * 60 * 24, // 1 day
        //     },
        //   },
        //},
      ]
    },

    devOptions: {
      enabled: true, // Set to false for production, Set true to enable PWA in development mode
      navigateFallback: 'index.html',
      suppressWarnings: true,
      type: 'module',
    },
  })],
})
