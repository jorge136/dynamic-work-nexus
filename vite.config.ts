import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: "/dynamic-work-nexus/", // 👈 IMPORTANTE para GitHub Pages

  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    // ❌ NO pongas nada como: npm run dev
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
