import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@assets": path.resolve(__dirname, "./src/assets"),
      "@core":path.resolve(__dirname,"./src/core")
    },
  },
  plugins: [react()],
  base: '/', // Set to your GitHub Pages repo name
  build: {
    outDir: 'dist', // Ensure the output directory is `dist`
  },
});
