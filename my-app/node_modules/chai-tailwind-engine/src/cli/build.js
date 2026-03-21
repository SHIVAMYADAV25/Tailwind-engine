#!/usr/bin/env node

import path from "path";
import fs from "fs";
import { scanFiles } from "../core/scanner.js";
import { generateCSS } from "../core/generator.js";

// plugins
import { registerPlugin } from "../core/context.js";
import spacingPlugin from "../plugins/spacing.js";
import colorPlugin from "../plugins/colors.js";
import flexPlugin from "../plugins/flex.js";
import typographyPlugin from "../plugins/typography.js";
import borderPlugin from "../plugins/border.js";
import layout from "../plugins/layout.js";
import size from "../plugins/size.js";
import hoverPlugin from "../plugins/hover.js";
import interaction from "../plugins/interaction.js";
import transitionPlugin from "../plugins/transition.js";
import responsivePlugin from "../plugins/responsive.js";
import shadowPlugin from "../plugins/shadow.js";
import position from "../plugins/position.js";
import backgroundPlugin from "../plugins/background.js";
import buttonPlugin from "../plugins/btnplgin.js";

// register plugins
registerPlugin(typographyPlugin);
registerPlugin(borderPlugin);
registerPlugin(layout);
registerPlugin(size);
registerPlugin(shadowPlugin);
registerPlugin(spacingPlugin);
registerPlugin(colorPlugin);
registerPlugin(flexPlugin);
registerPlugin(hoverPlugin);
registerPlugin(interaction);
registerPlugin(transitionPlugin);
registerPlugin(position);
registerPlugin(backgroundPlugin);
registerPlugin(buttonPlugin);
registerPlugin(responsivePlugin);

// 🔥 IMPORTANT: use user project
const projectRoot = process.cwd();

// scan user project
const classes = scanFiles(projectRoot);

let css = "";

classes.forEach(cls => {
  css += generateCSS(cls);
});

// output inside USER project
const distDir = path.join(projectRoot, "dist");

if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir);
}

const outputFile = path.join(distDir, "chai.css");

fs.writeFileSync(outputFile, css);

console.log("✅ CSS Generated at:", outputFile);