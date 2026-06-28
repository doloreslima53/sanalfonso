import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

function resolveBackend() {
  const raw = (process.env.BACKEND_URL || "").trim();
  if (!raw) return "http://localhost:8000";
  return /^https?:\/\//i.test(raw) ? raw : `http://${raw}`;
}

export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    port: 5173,
    allowedHosts: process.env.ALLOWED_HOSTS ? process.env.ALLOWED_HOSTS.split(",") : [],
    proxy: {
      "/api": {
        target: resolveBackend(),
        changeOrigin: true,
      },
      "/uploads": {
        target: resolveBackend(),
        changeOrigin: true,
      },
    },
  },
});
