import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
      sourcemap: true, // Kích hoạt source map trong môi trường build
  },
  server: {
      sourcemap: true, // Kích hoạt source map trong môi trường phát triển
  },
});