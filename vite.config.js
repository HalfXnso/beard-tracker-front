import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['assets/gigachad.jpg'], // Los assets en public/ se refieren sin ruta
      manifest: {
        name: 'BarbaTracker',
        short_name: 'BarbaTracker',
        description: 'Seguimiento de tratamiento para barba',
        theme_color: '#000000',
        background_color: '#ffffff',
        display: 'standalone',
        scope: '/',
        start_url: '/',
        icons: [
          {
            src: '/assets/gigachad.jpg',  // Ruta actualizada
            sizes: '192x192',
            type: 'image/jpeg'
          },
          {
            src: '/assets/gigachad.jpg',  // Ruta actualizada
            sizes: '512x512',
            type: 'image/jpeg'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,jpg,jpeg,json}'],
        globDirectory: 'dist', // Añadir esto
        globIgnores: ['**/node_modules/**/*'] // Añadir esto
      }
    })
  ]
})