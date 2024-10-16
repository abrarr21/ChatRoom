import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: process.env.DOCKER
          ? "http://backend:6969"
          : process.env.VITE_API_BASE_URL,
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
