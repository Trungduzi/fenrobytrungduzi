import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import history from 'connect-history-api-fallback'
import { createHtmlPlugin } from 'vite-plugin-html'

export default defineConfig({
  plugins: [
    react(),
    createHtmlPlugin()
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    middlewareMode: false,
    setupMiddlewares(middlewares) {
      middlewares.unshift(history())
      return middlewares
    }
  }
})
