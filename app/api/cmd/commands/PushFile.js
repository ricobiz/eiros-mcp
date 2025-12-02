import fs from "fs";
import path from "path";

export default async function pushFile({ path: filePath, content }) {
  const full = path.join(process.cwd(), filePath);

  fs.writeFileSync(full, content, "utf-8");

  return {
    saved: true,
    path: filePath,
    size: content.length
  };
}
