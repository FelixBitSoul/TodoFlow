import react from '@vitejs/plugin-react';
import path from "path"; // 需要安装：npm install -D @types/node
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
