import fs from "fs";
import path from "path";

export default async function listFiles(args = {}) {
  const dir = args.dir || "/";
  const full = path.join(process.cwd(), dir);

  const files = fs.readdirSync(full, { withFileTypes: true });

  return files.map(f => ({
    name: f.name,
    type: f.isDirectory() ? "dir" : "file"
  }));
}
