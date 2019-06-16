import { resolve as r } from "path";
import * as pkg from "./package.json";

export default {
  input: r(__dirname, "src/index.ts"),
  output: [
    { file: r(__dirname, "dist/index.js"), format: "cjs" },
    { file: r(__dirname, "dist/index.mjs"), format: "esm" }
  ],
  external: [
    ...Object.keys(pkg.dependencies),
    ...Object.keys(pkg.peerDependencies)
  ]
};
