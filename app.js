"use strict";

const fs = require("node:fs");
const readline = require("node:readline");
const { normalizeEvent } = require("./src/normalize");

async function run(inputPath) {
  const input = inputPath
    ? fs.createReadStream(inputPath, { encoding: "utf8" })
    : process.stdin;
  const lines = readline.createInterface({ input, crlfDelay: Infinity });

  for await (const line of lines) {
    if (!line.trim()) {
      continue;
    }

    process.stdout.write(`${JSON.stringify(normalizeEvent(JSON.parse(line)))}\n`);
  }
}

run(process.argv[2]).catch((error) => {
  process.stderr.write(`normalization failed: ${error.message}\n`);
  process.exitCode = 1;
});
