import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig(({ mode }) => {
  const outputSuffix = mode === "production" ? "prod" : "dev";

  return {
    root: import.meta.dirname,
    plugins: [react()],
    define: {
      __BUNDLER_NAME__: JSON.stringify("vite"),
    },
    build: {
      emptyOutDir: true,
      minify: false,
      outDir: `dist-vite-${outputSuffix}`,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.endsWith("/src/env-probe.ts")) {
              return "env-probe";
            }

            return undefined;
          },
        },
      },
      sourcemap: false,
    },
  };
});
