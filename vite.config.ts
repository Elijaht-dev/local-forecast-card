import { defineConfig } from "vite";

export default defineConfig({
  build: {
    target: "es2022",
    lib: { entry: "src/card.ts", formats: ["es"], fileName: () => "local-forecast-card.js" },
    minify: "esbuild",
  },
});
