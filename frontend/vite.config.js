import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  server: {
    port: 5173,
    // This is the key part - disable host checking completely
    hmr: {
      overlay: false
    },
    // Allow all hosts
    host: true,
    // This is the important part
    proxy: {},
    cors: true,
    // Disable host check
    disableHostCheck: true
  },
  // Add this preview config too
  preview: {
    host: true,
    port: 5173
  }
})
