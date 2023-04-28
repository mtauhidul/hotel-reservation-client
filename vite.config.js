import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [react()],
    build: {
      outDir: './wwwroot/app/',
      sourcemap: true,
    },
    server: {
      port: env.VITE_PORT,
    },
  };
});
