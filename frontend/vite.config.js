import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    // The Nuclear Plugin
    {
      name: 'bypass-host-check',
      configureServer(server) {
        // This runs before any other middleware
        server.middlewares.use((req, res, next) => {
          console.log(`Original host: ${req.headers.host}`); // For debugging
          req.headers.host = 'localhost:5173';
          console.log(`Modified host: ${req.headers.host}`); // For debugging
          next();
        });
      }
    }
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  server: {
    port: 5173,
    host: '0.0.0.0' // Allow connections from any IP
  }
})
