// Monday, Reviewed in One Line — make.fun entry
// Writes a single-line review of Monday to /output/entry.txt.
// The gate requires UTF-8 text of 1-200 characters, not only whitespace.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const ENTRY =
  "Monday: one star. The coffee was cold, the 9am could have been an email, and my inbox greeted me like a debt collector with a grudge.";

const OUTPUT_DIR = "/output";
const OUTPUT_FILE = `${OUTPUT_DIR}/entry.txt`;

// Validate the entry before writing it, so a bad line can never
// reach the gate: one line, 1-200 characters, not only whitespace.
function validateEntry(text: string): void {
  if (text.length < 1 || text.length > 200) {
    throw new Error(`Entry must be 1-200 characters, got ${text.length}`);
  }
  if (text.trim().length === 0) {
    throw new Error("Entry must not be only whitespace");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("Entry must be a single line");
  }
}

validateEntry(ENTRY);

// Create the output directory if it is not there already.
// Never remove /output itself: the grader mounts it and runs this
// program as an unprivileged user, so deleting it fails the run.
mkdirSync(OUTPUT_DIR, { recursive: true });

writeFileSync(OUTPUT_FILE, ENTRY, "utf8");

// Read-back round-trip check: what landed on disk must be exactly
// the line we validated, byte for byte.
const written = readFileSync(OUTPUT_FILE, "utf8");
if (written !== ENTRY) {
  throw new Error("Read-back mismatch: /output/entry.txt differs from ENTRY");
}

console.log(`Wrote ${ENTRY.length} characters to ${OUTPUT_FILE}`);
