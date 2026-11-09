import { readFile, writeFile } from "node:fs/promises";

const paths = ["lit/LICENSE", "lit-element/LICENSE", "lit-html/LICENSE", "@lit/reactive-element/LICENSE"];
const notices = await Promise.all(paths.map(path =>
  readFile(new URL("../node_modules/" + path, import.meta.url), "utf8"),
));
const license = await readFile(new URL("../LICENSE", import.meta.url), "utf8");
const bundle = new URL("../dist/local-forecast-card.js", import.meta.url);
const code = await readFile(bundle, "utf8");
const comment = [license, ...new Set(notices)].join("\n\n").replaceAll("*/", "* /");
await writeFile(bundle, "/*!\n" + comment + "\n*/\n" + code);
