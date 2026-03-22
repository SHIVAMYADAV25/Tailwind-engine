// plugins/borderPlugin.js

import { colors } from "../core/colors.js";
import { hexToRgba } from "../core/utils.js"; // assume you have this helper

const DEFAULT_BORDER_COLOR = colors.gray?.[200] || "#e5e7eb";

export default function borderPlugin(cls) {
  if (!cls.startsWith("chai-")) return null;

  let match;

  // ────────────────────────────────────────────────
  // 1. Default border (chai-border) → 1px solid gray-200
  // ────────────────────────────────────────────────
  if (cls === "chai-border") {
    return `.chai-border {
      border-width: 1px;
      border-style: solid;
      border-color: ${DEFAULT_BORDER_COLOR};
    }\n`;
  }

  // ────────────────────────────────────────────────
  // 2. Border width – all sides
  //    chai-bw-2 → border-width: 0.5rem;
  //    chai-border-[3px]
  // ────────────────────────────────────────────────
  match = cls.match(/^chai-bw-(\d+)$/);
  if (match) {
    const width = Number(match[1]) * 0.25; // 1 unit = 0.25rem (Tailwind scale)
    return `.${cls} { border-width: ${width}rem; }\n`;
  }

  match = cls.match(/^chai-border-\[(.+)\]$/);
  if (match) {
    return `.${cls} { border-width: ${match[1]}; }\n`;
  }

  // ────────────────────────────────────────────────
  // 3. Directional border width
  //    chai-border-t-4, chai-border-x-2, chai-border-r-[5px]
  // ────────────────────────────────────────────────
  match = cls.match(/^chai-border-(t|r|b|l|x|y)-(\d+)$/);
  if (match) {
    const [, side, value] = match;
    const widthRem = Number(value) * 0.25;

    let properties = "";
    if (side === "x") {
      properties = `border-left-width: ${widthRem}rem; border-right-width: ${widthRem}rem;`;
    } else if (side === "y") {
      properties = `border-top-width: ${widthRem}rem; border-bottom-width: ${widthRem}rem;`;
    } else {
      const sideMap = { t: "top", r: "right", b: "bottom", l: "left" };
      properties = `border-${sideMap[side]}-width: ${widthRem}rem;`;
    }

    return `.${cls} { ${properties} }\n`;
  }

  match = cls.match(/^chai-border-(t|r|b|l|x|y)-\[(.+)\]$/);
  if (match) {
    const [, side, value] = match;
    let properties = "";
    if (side === "x") {
      properties = `border-left-width: ${value}; border-right-width: ${value};`;
    } else if (side === "y") {
      properties = `border-top-width: ${value}; border-bottom-width: ${value};`;
    } else {
      const sideMap = { t: "top", r: "right", b: "bottom", l: "left" };
      properties = `border-${sideMap[side]}-width: ${value};`;
    }
    return `.${cls} { ${properties} }\n`;
  }

  // ────────────────────────────────────────────────
  // 4. Border color (chai-bc-red-500, chai-bc-primary/70)
  // ────────────────────────────────────────────────
  match = cls.match(/^chai-bc-([a-z]+)(?:-(\d+))?(?:\/(\d+))?$/);
  if (match) {
    const [, colorName, shade, opacity] = match;

    const colorGroup = colors[colorName];
    if (!colorGroup) return null;

    let colorValue = typeof colorGroup === "string"
      ? colorGroup
      : colorGroup[shade || "500"];

    if (!colorValue) return null;

    if (opacity) {
      const op = Number(opacity) / 100;
      colorValue = hexToRgba(colorValue, op);
    }

    return `.${cls} { border-color: ${colorValue}; }\n`;
  }

  // ────────────────────────────────────────────────
  // 5. Border style
  // ────────────────────────────────────────────────
  const borderStyles = [
    "solid", "dashed", "dotted", "double", "hidden", "none"
  ];
  if (borderStyles.includes(cls.replace("chai-border-", ""))) {
    const style = cls.replace("chai-border-", "");
    return `.${cls} { border-style: ${style}; }\n`;
  }

  // ────────────────────────────────────────────────
  // 6. Border radius
  //    chai-rounded-8 → border-radius: 2rem;
  //    chai-rounded-full, chai-rounded-[16px]
  // ────────────────────────────────────────────────
  match = cls.match(/^chai-rounded-(\d+)$/);
  if (match) {
    const radius = Number(match[1]) * 0.25;
    return `.${cls} { border-radius: ${radius}rem; }\n`;
  }

  if (cls === "chai-rounded-full") {
    return `.chai-rounded-full { border-radius: 9999px; }\n`;
  }

  match = cls.match(/^chai-rounded-\[(.+)\]$/);
  if (match) {
    return `.${cls} { border-radius: ${match[1]}; }\n`;
  }

  // ────────────────────────────────────────────────
  // 7. Directional radius (optional – very useful)
  //    chai-rounded-tl-4, chai-rounded-br-[10px]
  // ────────────────────────────────────────────────
  match = cls.match(/^chai-rounded-(tl|tr|br|bl)-(\d+)$/);
  if (match) {
    const [, corner, value] = match;
    const radius = Number(value) * 0.25;
    const cornerMap = {
      tl: "top-left",
      tr: "top-right",
      br: "bottom-right",
      bl: "bottom-left"
    };
    return `.${cls} { border-${cornerMap[corner]}-radius: ${radius}rem; }\n`;
  }

  // ────────────────────────────────────────────────
  // 8. Border opacity (chai-border-opacity-75)
  // ────────────────────────────────────────────────
  match = cls.match(/^chai-border-opacity-(\d+)$/);
  if (match) {
    const opacity = Number(match[1]) / 100;
    return `.${cls} { --tw-border-opacity: ${opacity}; }\n`;
  }

  return null;
}