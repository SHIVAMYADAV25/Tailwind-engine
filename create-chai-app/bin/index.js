#!/usr/bin/env node

import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import { fileURLToPath } from "url";

const projectName = process.argv[2];

if (!projectName) {
  console.log("❌ Please provide project name");
  console.log("Usage: npx create-chai-app my-app");
  process.exit(1);
}

const targetDir = path.join(process.cwd(), projectName);


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const templateDir = path.join(__dirname, "../template");

// check if exists
if (fs.existsSync(targetDir)) {
  console.log("❌ Folder already exists");
  process.exit(1);
}

// create project
fs.mkdirSync(targetDir);

// copy template
fs.cpSync(templateDir, targetDir, { recursive: true });

console.log("📁 Project created");

// install dependencies
process.chdir(targetDir);
execSync("npm install", { stdio: "inherit" });

console.log("\n🚀 Ready!");
console.log(`cd ${projectName}`);
console.log("npm run dev");