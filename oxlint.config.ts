import { defineConfig } from "oxlint";

export default defineConfig({
  plugins: ["typescript"],
  categories: { correctness: "error" },
  rules: {},
  options: {
    typeAware: true,
    typeCheck: true,
  },
  ignorePatterns: ["dist/**", ".vercel/**/*"],
});
