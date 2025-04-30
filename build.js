const fs = require("node:fs");
const { minifySync } = require("@swc/core");

try {
  fs.unlinkSync(`${__dirname}/dist/index.js`, { force: true });
} catch (e) {
  if (e.code !== "ENOENT") {
    throw e;
  }
}

const inFileContents = fs.readFileSync(`${__dirname}/src/index.js`, "utf-8");
const outFileContents = minifySync(inFileContents, {
  compress: true,
  mangle: true,
  module: true,
}).code;
fs.mkdirSync(`${__dirname}/dist`, { recursive: true });
fs.writeFileSync(`${__dirname}/dist/index.js`, outFileContents, "utf-8");
