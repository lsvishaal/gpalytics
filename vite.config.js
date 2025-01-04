import { defineConfig } from "vite";
import react from "@vitejs/plugin-react"; // Vite plugin for React
import path from "path"; // Node.js module to handle paths

export default defineConfig({
  plugins: [react()], // Enable React fast-refresh and JSX support
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // Set alias for clean imports (e.g., "@/components")
    },
  },
  build: {
    outDir: "dist", // Specify the output directory for production builds
    sourcemap: true, // Generate sourcemaps for easier debugging in production
  },
  server: {
    host: "0.0.0.0",
    port: 3000, // Port for the development server
    open: true, // Automatically open the app in the default browser
    cors: true, // Enable Cross-Origin Resource Sharing
  },
  base: "/", // Ensure the app is served from the root
  define: {
    // Define environment variables for both development and production
    "process.env.VITE_API_BASE_URL": JSON.stringify(
      process.env.VITE_API_BASE_URL || "http://localhost:8000" // Fallback for local development
    ),
  },
});
