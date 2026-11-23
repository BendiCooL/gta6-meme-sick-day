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

import { copyFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = dirname(fileURLToPath(import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

mkdirSync(outDir, { recursive: true });
copyFileSync(join(repoRoot, "POST.json"), join(outDir, "POST.json"));

console.log(`POST.json copied to ${join(outDir, "POST.json")}`);
