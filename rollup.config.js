const nodeResolve = require("@rollup/plugin-node-resolve");
const commonjs = require("@rollup/plugin-commonjs");
const typescript = require("@rollup/plugin-typescript");
const terser = require("@rollup/plugin-terser");

module.exports = [
  {
    input: "./src/index.ts",
    output: [
      {
        file: "lib/index.js",
        format: "cjs"
      },
      {
        file: "lib/index.min.js",
        format: "cjs",
        plugins: [terser()]
      },
      {
        file: "lib/index.esm.js",
        format: "esm"
      },
      {
        file: "lib/index.esm.min.js",
        format: "esm",
        plugins: [terser()]
      }
    ],
    plugins: [
      nodeResolve(),
      commonjs(),
      typescript({ tsconfig: "./tsconfig.json" })
    ],
    external: ["react", "react-dom", /node_modules/]
  }
];
