import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  define: {
    "process.env.NODE_ENV": JSON.stringify(mode),
    global: {}, // optional: helps with some Node polyfill issues
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/widget.jsx"), // NEW entry file
      name: "TaxonomyNavigator", // global variable name
      formats: ["iife"], // single <script> file
      fileName: () => "taxonomy-navigator.js",
    },
    // cssCodeSplit: true, 
    rollupOptions: {
      external: [],
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name && assetInfo.name.endsWith(".css")) {
            return "taxonomy-navigator.css";
          }
          return assetInfo.name ?? "[name][extname]";
        },
      },
    },
  },
}));
