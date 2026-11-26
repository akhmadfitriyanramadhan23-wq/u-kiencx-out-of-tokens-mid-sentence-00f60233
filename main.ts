import { mkdirSync, writeFileSync } from "node:fs";

// Out of Tokens, Mid-Sentence — one-line error message an AI agent shows
// when it runs out of tokens mid-sentence. Template: rule (token budget
// exhausted) -> literal violation (the agent stops talking) -> flat
// consequence (it bills you for the silence). Specific and named: error
// code 402, token 128,000, deploy_notes.md.
const line =
  "ERROR 402: Token budget exhausted at token 128,000 in deploy_notes.md; the agent has stopped talking and is now billing you for silence.";

// Gate: entry must be 1-140 characters (UTF-8 code points), non-blank.
const MAX_CHARS = 140;
const count = [...line].length;
if (count < 1 || count > MAX_CHARS) {
  throw new Error(`line is ${count} characters, must be 1-${MAX_CHARS}`);
}
if (!line.trim()) {
  throw new Error("line is blank");
}
if (line.includes("\n")) {
  throw new Error("line must be a single line");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
// Exactly the line: no trailing newline, no extra whitespace.
writeFileSync(`${outDir}/entry.txt`, line, "utf8");
