// This script compares if two lines in a file are equal.
//
// @ts-check

import { createReadStream } from "fs";
import { createInterface } from "readline";

const FILE = "tv.txt";

/**
 * Processess a file line by line.
 *
 * @see https://nodejs.org/api/readline.html#readline_example_read_file_stream_line_by_line
 * @param {string} path - The path to the file.
 * @returns {Promise<string[]>} - An array of lines.
 */
async function processLineByLine(path) {
  const lines = [];

  const rl = createInterface({
    input: createReadStream(path),
    crlfDelay: Infinity,
  });
  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') in FILE as a single line break.

  for await (const line of rl) {
    lines.push(line.trim());
  }

  return lines;
}

/**
 * Check if two lines are equal.
 *
 * @param {string} line1 - The first line.
 * @param {string} line2 - The second line.
 * @returns {boolean} - Whether the two lines are equal.
 */
function linesEqual(line1, line2) {
  if (line1 === "") {
    return false;
  }

  return line1 === line2;
}

async function main() {
  const lines = await processLineByLine(FILE);

  lines.forEach((line, index) => {
    // Skip if it's the last line.
    if (index === lines.length - 1) {
      return;
    }

    if (!linesEqual(line, lines[index + 1])) {
      return;
    }

    const lineNumber = index + 1;
    console.log(
      `Line ${lineNumber} is the same as line ${lineNumber + 1}: "${line}"`
    );
  });
}

main();
