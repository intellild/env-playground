import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig(({ mode }) => {
  const isProduction = mode === "production";
  const outputSuffix = mode === "production" ? "prod" : "dev";

  return {
    root: import.meta.dirname,
    plugins: [react()],
    define: {
      __BUNDLER_NAME__: JSON.stringify("vite"),
      "import.meta.env.XXX": JSON.stringify("123"),
    },
    build: {
      cssMinify: isProduction,
      emptyOutDir: true,
      minify: isProduction,
      modulePreload: isProduction,
      outDir: `dist-vite-${outputSuffix}`,
      reportCompressedSize: isProduction,
      rolldownOptions: {
        output: {
          format: "es",
          entryFileNames: isProduction
            ? "assets/[name]-[hash].js"
            : "assets/[name].js",
          chunkFileNames: isProduction
            ? "assets/[name]-[hash].js"
            : "assets/[name].js",
          manualChunks(id) {
            if (id.endsWith("/src/env-probe.ts")) {
              return "env-probe";
            }

            return undefined;
          },
        },
        treeshake: isProduction,
      },
      sourcemap: false,
    },
  };
});
