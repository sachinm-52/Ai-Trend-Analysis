import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { createResearchApiMiddleware } from './server/index.js';

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'research-api-server',
      configureServer(server) {
        server.middlewares.use(createResearchApiMiddleware());
      },
    },
  ],
  server: {
    port: 5173,
    open: false,
  },
});

