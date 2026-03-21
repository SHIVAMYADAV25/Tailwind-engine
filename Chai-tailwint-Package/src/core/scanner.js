import fs from "fs";
import path from "path";

const IGNORE = ["node_modules", ".git", "dist"];

export function scanFiles(dir) {
  let classes = new Set();

  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const fullPath = path.join(dir, file);

    // 🚨 ignore folders
    if (IGNORE.some(i => fullPath.includes(i))) return;

    if (fs.statSync(fullPath).isDirectory()) {
      const nested = scanFiles(fullPath);
      nested.forEach(c => classes.add(c));
    } else {
      if (!file.endsWith(".html") && !file.endsWith(".js")) return;

      const content = fs.readFileSync(fullPath, "utf-8");

      const matches = content.match(/class="([^"]+)"/g) || [];

      matches.forEach(match => {
        match.replace(/class="([^"]+)"/, (_, cls) => {
          cls.split(" ").forEach(c => {
            if (c.startsWith("chai-")) classes.add(c);
          });
        });
      });
    }
  });

  return classes;
}