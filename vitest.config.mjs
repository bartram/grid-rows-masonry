import { configDefaults, defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "happy-dom",
    globals: true,
    exclude: [
      ...configDefaults.exclude,
      "**/visual.spec.ts",
      "**/*.pw.ts",
      "**/*-snapshots/**",
    ],
  },
});
