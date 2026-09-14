import { readFile, writeFile } from "node:fs/promises";
import { URL } from "node:url";

const indexPath = new URL("../dist/index.html", import.meta.url);
const html = await readFile(indexPath, "utf8");

// Rollup emits one self-contained IIFE for this app. Remove the module
// attribute so the exported folder also works when opened as file://, where
// browsers commonly block module scripts due to local-file CORS rules.
const prepared = html.replace(
  /<script type="module" crossorigin src="([^"]+)"><\/script>/,
  '<script defer src="$1"></script>',
);

if (prepared === html) {
  throw new Error("Could not find the Vite module script in dist/index.html");
}

await writeFile(indexPath, prepared);
