import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  define: {
    "process.env.NODE_ENV": JSON.stringify("production"),
  },
  build: {
    cssCodeSplit: false,
    lib: {
      entry: "src/main.tsx",
      name: "SolarPanelPresentation",
      formats: ["iife"],
      fileName: () => "assets/app.js",
    },
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) =>
          assetInfo.name?.endsWith(".css") ? "assets/app.css" : "assets/[name][extname]",
      },
    },
  },
  server: {
    host: "127.0.0.1",
    port: 5173,
    watch: {
      ignored: ["**/tmp/**", "**/dist/**"],
    },
  },
  preview: {
    host: "127.0.0.1",
    port: 4173,
  },
});