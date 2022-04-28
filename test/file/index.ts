import { readdirSync } from "fs";
import { resolve, dirname } from "path";

function readDirectory(p: string) {
  return readdirSync(p, "utf8")
    .filter((f) => f !== "index.ts")
    .map((f) => resolve(p, f));
}

const testFiles = readDirectory(dirname(__filename));

export default testFiles;
