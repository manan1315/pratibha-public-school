import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Backend target — injected by scripts/startDev.js; falls back to 5080
const target = process.env.VITE_API_TARGET || 'http://localhost:5080';

export default defineConfig({
  plugins: [react()],
  server: {
    // port comes from the --port flag passed by startDev.js
    proxy: {
      '/api': { target, changeOrigin: true, secure: false },
      '/uploads': { target, changeOrigin: true, secure: false },
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'terser',
    terserOptions: {
      compress: { drop_console: true },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-vendor': ['framer-motion', 'aos', 'swiper', 'react-icons'],
        },
      },
    },
  },
});
