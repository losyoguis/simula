import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { fileURLToPath, URL } from "node:url";

const fromRoot = (path: string) => fileURLToPath(new URL(path, import.meta.url));

export default defineConfig({
  // Relative paths make the same build work at / and at /repository-name/.
  base: "./",
  root: fromRoot("./github-pages/"),
  publicDir: fromRoot("./public/"),
  plugins: [react()],
  build: {
    outDir: fromRoot("./docs/"),
    emptyOutDir: true,
    sourcemap: false,
  },
  preview: {
    host: "127.0.0.1",
    port: 4174,
  },
});
