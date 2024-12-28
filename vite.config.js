import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: "dist", // Default build directory
  },
  server: {
    port: 3000, // Development server port
  },
  base: "/", // Ensure correct base path
  define: {
    "process.env.VITE_API_BASE_URL": JSON.stringify(process.env.VITE_API_BASE_URL || "http://localhost:8000"),
  },
});
