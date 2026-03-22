import fs from "fs";
import path from "path";

const IGNORE_DIRS = ["node_modules", ".git", "dist", ".next", "build", "public"];

export function scanFiles(dir, classes = new Set()) {
  let files;
  try {
    files = fs.readdirSync(dir);
  } catch (err) {
    return classes;
  }

  files.forEach(file => {
    const fullPath = path.join(dir, file);

    // Skip ignored folders
    if (IGNORE_DIRS.some(ig => fullPath.includes(ig))) return;

    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      scanFiles(fullPath, classes);
    } else {
      // Scan only likely files (you can expand list)
      if (!/\.(html|js|jsx|ts|tsx|vue|svelte|astro|php|css)$/.test(file)) {
        return;
      }

      let content;
      try {
        content = fs.readFileSync(fullPath, "utf-8");
      } catch {
        return;
      }

      // Better regex – catches class, className, 'className={...}'
      const classRegex = /(?:class|className)\s*=\s*(?:"([^"]*)"|'([^']*)'|{{?\s*([^}\s>]+)\s*}}?)/gi;
      let match;
      while ((match = classRegex.exec(content)) !== null) {
        const raw = (match[1] || match[2] || match[3] || "").trim();
        if (!raw) continue;

        raw.split(/\s+/).forEach(c => {
          const trimmed = c.trim();
          if (trimmed.startsWith("chai-")) {
            classes.add(trimmed);
          }
        });
      }
    }
  });

  return classes;
}