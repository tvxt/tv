// @ts-check
/**
 * This script removes duplicate lines in `FILE` and
 * writes the unique result to `FILE.new.txt`.
 */

import fs from "fs";

const FILE = "tv.txt";

/**
 * @param {string} path - The path to the file.
 */
function removeDuplicateLines(path) {
  const data = fs.readFileSync(path, "utf8").split("\n");

  const seen = new Set();
  const result = data.filter((line) => {
    const has = seen.has(line);
    if (line && !has) seen.add(line);

    return !has;
  });

  fs.writeFile(path.replace(".txt", ".new.txt"), result.join("\n"), () => {});
}

removeDuplicateLines(FILE);
