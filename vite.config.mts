import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  // Relative assets keep the built SPA portable on static hosts and when
  // opened from a local folder.
  base: "./",
  server: {
    allowedHosts: ["hex"],
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL(".", import.meta.url)),
    },
  },
  build: {
    rollupOptions: {
      output: {
        // Keep the static bundle usable as a classic script when the
        // generated index.html is opened directly from disk.
        format: "iife",
      },
    },
  },
});
