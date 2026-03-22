#!/usr/bin/env node

import path from "path";
import fs from "fs";
import { scanFiles } from "../core/scanner.js";
import { generateCSS } from "../core/generator.js";
import { registerPlugin } from "../core/context.js";

// ────────────────────────────────────────────────
// Import plugins
// ────────────────────────────────────────────────
import spacingPlugin      from "../plugins/spacing.js";
import sizePlugin         from "../plugins/size.js";
import typographyPlugin   from "../plugins/typography.js";
import flexPlugin         from "../plugins/flex.js";
import layoutPlugin       from "../plugins/layout.js";
import positionPlugin     from "../plugins/position.js";
import borderPlugin       from "../plugins/border.js";
import backgroundPlugin   from "../plugins/background.js";
import colorPlugin        from "../plugins/colors.js";
import shadowPlugin       from "../plugins/shadow.js";
import transitionPlugin   from "../plugins/transition.js";
import interactionPlugin  from "../plugins/interaction.js";
// import buttonPlugin       from "../plugins/button.js";       // renamed from btnplgin
import hoverPlugin        from "../plugins/hover.js";
import responsivePlugin   from "../plugins/responsive.js";

// ────────────────────────────────────────────────
// Register in correct order: base → layout → styling → variants last
// ────────────────────────────────────────────────
registerPlugin(colorPlugin);
registerPlugin(spacingPlugin);
registerPlugin(sizePlugin);
registerPlugin(typographyPlugin);
registerPlugin(flexPlugin);
registerPlugin(layoutPlugin);
registerPlugin(positionPlugin);
registerPlugin(borderPlugin);
registerPlugin(backgroundPlugin);
registerPlugin(shadowPlugin);
registerPlugin(transitionPlugin);
registerPlugin(interactionPlugin);
// registerPlugin(buttonPlugin);

// Variants / pseudo-classes MUST come AFTER normal rules
registerPlugin(hoverPlugin);
registerPlugin(responsivePlugin);     // last – wraps other classes

// ────────────────────────────────────────────────
// Run in current working directory (user's project)
const projectRoot = process.cwd();

console.log("Scanning project for chai-* classes...");

const classes = scanFiles(projectRoot);

console.log(`Found ${classes.size} unique chai-* classes`);

const generated = new Map(); // deduplicate

classes.forEach(cls => {
  const rule = generateCSS(cls);
  if (rule && rule.trim()) {
    if (!generated.has(cls)) {
      generated.set(cls, rule);
    }
  }
});



let finalCSS = "";
for (const rule of generated.values()) {
  finalCSS += rule;
}

// console.log(finalCSS);

// Output
const distDir = path.join(projectRoot, "dist");
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

const outputFile = path.join(distDir, "chai.css");
fs.writeFileSync(outputFile, finalCSS.trim() + "\n");

console.log(`\n✅ Generated ${generated.size} rules`);
console.log(`Output written to: ${outputFile}`);