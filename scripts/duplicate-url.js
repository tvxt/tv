// This script compares a file for duplicate URLs.
//
// @ts-check

import { createReadStream } from "fs";
import { createInterface } from "readline";

const FILE = "tv.txt";

/**
 * Check if a file contains duplicate URLs.
 *
 * @see https://nodejs.org/api/readline.html#readline_example_read_file_stream_line_by_line
 * @param {string} path - The path to the file.
 */
async function hasDuplicateURL(path) {
  const rl = createInterface({
    input: createReadStream(path),
    crlfDelay: Infinity,
  });
  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') in FILE as a single line break.

  const urls = new Set();
  for await (const line of rl) {
    const [_, url] = line.split(",");
    if (!url) continue;

    try {
      new URL(url);
    } catch {
      // Error means the URL is invalid. Skip it.
      continue;
    }

    if (urls.has(url)) throw new Error(`Duplicate URL: ${url}`);

    urls.add(url);
  }
}

hasDuplicateURL(FILE)
