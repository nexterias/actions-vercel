import { defineConfig } from "oxfmt";

export default defineConfig({
  sortImports: {
    enabled: true,
  },
  ignorePatterns: ["dist/", "node_modules/"],
});
