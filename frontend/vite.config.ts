import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    // Local development: forward API calls to the Flask dev server (python app.py).
    // Port 5001 because macOS AirPlay occupies 5000. 127.0.0.1 instead of localhost, because
    // "localhost" can resolve to IPv6 (::1), where Flask's dev server does not listen.
    proxy: {
      '/api': 'http://127.0.0.1:5001',
    },
  },
})
