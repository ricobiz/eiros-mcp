import fs from "fs";
import path from "path";

export default async function readFile({ path: filePath }) {
  const full = path.join(process.cwd(), filePath);
  const data = fs.readFileSync(full, "utf-8");

  return { path: filePath, content: data };
}
