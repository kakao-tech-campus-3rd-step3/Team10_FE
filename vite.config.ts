import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: ['@emotion/babel-plugin'],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://sadajobe.shop',
        changeOrigin: true,
        secure: true,
      },
    },
  },
  define: {
    'process.env.VITE_USE_MSW': JSON.stringify(process.env.VITE_USE_MSW),
  },
});
