import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

// https://vite.dev/config/
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
      // 프론트에서 /api 로 부르면 Vite가 백엔드로 프록시
      '/api': {
        target: 'https://sadajobe.shop',
        changeOrigin: true,
        secure: true, // https면 true 권장
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});
