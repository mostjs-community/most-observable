import { resolve as r } from "path";
import typescript from "rollup-plugin-typescript2";
import * as pkg from "./package.json";

export default {
  input: r(__dirname, "src/index.ts"),
  output: [
    { file: r(__dirname, "dist/index.js"), format: "cjs", exports: "named" },
    { file: r(__dirname, "dist/index.mjs"), format: "esm", exports: "named" }
  ],
  plugins: [
    typescript({
      typescript: require("typescript"),
      cacheRoot: r(__dirname, "node_modules/.cache/rollup-plugin-typescript2")
    })
  ],
  external: [
    ...Object.keys(pkg.dependencies),
    ...Object.keys(pkg.peerDependencies)
  ]
};
