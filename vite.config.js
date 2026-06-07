import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        importScripts: ['/push-sw.js']
      },
      devOptions: {
        enabled: true
      },
      manifest: {
        name: 'TechCart Electronics',
        short_name: 'TechCart',
        description: 'TechCart - Electronics & Gadgets E-Commerce',
        theme_color: '#4472C4',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ]
});
