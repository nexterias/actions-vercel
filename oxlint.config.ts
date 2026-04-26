import { defineConfig } from "oxlint";

export default defineConfig({
  plugins: ["typescript"],
  categories: {
    correctness: "error",
  },
  options: {
    typeAware: true,
    typeCheck: true,
  },
  ignorePatterns: ["dist/", "node_modules/"],
});
