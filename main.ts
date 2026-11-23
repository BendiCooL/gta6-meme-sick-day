// Entry point for the make.fun bounty "gta6-meme-x-01" (Post a GTA 6 meme on X).
//
// The whole job of this program is to hand the house the address of the post:
// it copies POST.json from the repository root into the output directory the
// grader provides. The house reads the post itself from X; nothing else here
// is judged.
//
// Node 22, standard library only. Safe to run repeatedly over the same output
// directory: it never deletes the output directory (in the grader that
// directory is a mount point, and removing it would fail the run).

import { copyFileSync, mkdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = dirname(fileURLToPath(import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

mkdirSync(outDir, { recursive: true });
const outFile = join(outDir, "POST.json");
copyFileSync(join(repoRoot, "POST.json"), outFile);

// Read the copy back and check it really names a post: a corrupt POST.json
// would sink the entry at the gate, so fail loudly here instead of handing
// the house a pointer it cannot follow.
let named;
try {
  named = JSON.parse(readFileSync(outFile, "utf8"));
} catch {
  throw new Error(`POST.json in the output is not valid JSON: ${outFile}`);
}
if (typeof named?.url !== "string" || named.url === "") {
  throw new Error("POST.json in the output does not name a post URL");
}

console.log(`POST.json copied to ${outFile}`);
console.log(`Entry post: ${named.url}`);
