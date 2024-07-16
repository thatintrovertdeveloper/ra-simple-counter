// esbuild.config.js
const esbuild = require("esbuild");

const buildOptions = {
  entryPoints: ["src/counter.js"],
  bundle: true,
  minify: true,
  format: "esm", // Output as ES module
  outfile: "dist/index.js",
};

const buildBrowserOptions = {
  entryPoints: ["src/counter.js"],
  bundle: true,
  minify: true,
  format: "iife", // Output as immediately-invoked function expression (for browser)
  globalName: "RASimpleCounter", // Expose as global variable in browser
  outfile: "dist/ra-simple-counter.min.js",
};

esbuild.build(buildOptions).catch(() => process.exit(1));
esbuild.build(buildBrowserOptions).catch(() => process.exit(1));
