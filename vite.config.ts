import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Determine base path based on environment
  // Priority: VITE_BASE_PATH env var > GitHub Actions detection > default
  const base = process.env.VITE_BASE_PATH || 
    (process.env.NODE_ENV === 'production' && process.env.GITHUB_ACTIONS 
      ? '/UrbanNest/'  // GitHub Pages
      : '/');          // Other hosting platforms or development

  return {
    base,
    server: {
      host: "::",
      port: 8080,
    },
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
