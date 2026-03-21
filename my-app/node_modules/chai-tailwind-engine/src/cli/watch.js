import fs from "fs";
import { exec } from "child_process";

console.log("👀 Watching files...");

let timeout;

fs.watch(process.cwd(), { recursive: true }, (event, file) => {
  if (!file) return;

  if (file.endsWith(".html") || file.endsWith(".js")) {
    clearTimeout(timeout);

    timeout = setTimeout(() => {
      console.log("🔄 Building CSS...");
      exec("chai", { stdio: "inherit" });
    }, 200);
  }
});