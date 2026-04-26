import path from "node:path";

import { defineConfig } from "@rspack/cli";
import { LicenseWebpackPlugin } from "license-webpack-plugin";

export default defineConfig({
  entry: "./src/index.ts",
  output: {
    path: path.resolve("dist"),
    filename: "index.mjs",
    module: true,
    chunkFormat: "module",
    chunkLoading: "import",
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  target: "node24",
  mode: "production",
  module: {
    rules: [
      {
        type: "javascript/auto",
        test: /\.(?:ts|tsx)$/,
        loader: "builtin:swc-loader",
        options: {
          detectSyntax: "auto",
        },
      },
    ],
  },
  optimization: {
    minimize: false,
    avoidEntryIife: true,
  },
  plugins: [
    new LicenseWebpackPlugin({
      perChunkOutput: false,
      outputFilename: "licenses.txt",
    }),
  ],
});
