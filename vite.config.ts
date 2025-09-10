import { VitePWA } from 'vite-plugin-pwa';
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const urlPattern = new RegExp(/^https:\/\/jsonplaceholder\.typicode\.com/i)

// https://vitejs.dev/config/
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
      //cleanupOutdatedCaches: true,
      //clientsClaim: true,
      runtimeCaching: [{
        urlPattern, // Match API endpoints you want to cache
        handler: 'NetworkFirst',
        options: {
          cacheName: 'api-cache',
          expiration: {
            maxEntries: 50,
            maxAgeSeconds: 60 * 60 * 24 * 7 // 1 week
          },
          cacheableResponse: {
            statuses: [0, 200]
          }
        }
      }]
    },

    devOptions: {
      enabled: true,
      navigateFallback: 'index.html',
      suppressWarnings: true,
      type: 'module',
    },
  })],
})
