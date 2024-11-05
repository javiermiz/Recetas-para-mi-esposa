import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import AstroPWA from '@vite-pwa/astro';

export default defineConfig({
  integrations: [
    tailwind(),
    react(),
    AstroPWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'apple-touch-icon.png', 'masked-icon.svg'],
      manifest: {
        name: 'Recetas para mi esposa',
        short_name: 'RecetasEsposa',
        description: 'Una colección de recetas especiales para mi esposa',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'pwa-192x192.jpeg',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'pwa-192x192.jpeg',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: 'pwa-192x192.jpeg',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
      },
    }),
  ],
});
