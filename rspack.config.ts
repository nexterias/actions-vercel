import path from "node:path";
import { LicenseWebpackPlugin } from "license-webpack-plugin";

export default {
	entry: "./src/index.ts",
	output: {
		path: path.resolve("dist"),
		filename: "index.mjs",
		module: true,
		chunkFormat: "module",
		chunkLoading: "import",
	},
	resolve: {
		extensions: [".ts", "..."],
	},
	target: "node24",
	mode: "production",
	module: {
		rules: [
			{
				test: /\.ts$/,
				exclude: /node_modules/,
				loader: "builtin:swc-loader",
				options: {
					jsc: {
						parser: { syntax: "typescript" },
					},
				},
				type: "javascript/auto",
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
};
