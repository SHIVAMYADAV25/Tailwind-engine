// plugins/hoverPlugin.js

import { colors } from "../core/colors.js";
import { hexToRgba } from "../core/utils.js";

export default function hoverPlugin(cls) {
  if (!cls.startsWith("chai-hover-")) return null;

  const base = cls.replace("chai-hover-", "");
  let property, value;

  let match;

  // ────────────────────────────────────────────────
  // 1. Background color hover
  //    chai-hover:bg-red-600
  //    chai-hover:bg-indigo-500/70
  //    chai-hover:bg-[#ff00aa]
  // ────────────────────────────────────────────────
  match = base.match(/^bg-([a-z]+)(?:-(\d+))?(?:\/(\d+))?$/);
  if (match) {
    const [, colorName, shade, opacity] = match;
    property = "background-color";

    let rawColor = colors[colorName];
    if (!rawColor) {
      // Arbitrary color fallback (e.g. bg-hotpink)
      value = colorName;
    } else if (typeof rawColor === "string") {
      value = rawColor;
    } else {
      value = rawColor[shade || "500"];
      if (!value) return null;
    }

    if (opacity) {
      const op = Number(opacity) / 100;
      value = hexToRgba(value, op);
    }

    return `.${cls}:hover { ${property}: ${value}; }\n`;
  }

  match = base.match(/^bg-\[(.+)\]$/);
  if (match) {
    property = "background-color";
    value = match[1];
    return `.${cls}:hover { ${property}: ${value}; }\n`;
  }

  // ────────────────────────────────────────────────
  // 2. Text color hover
  //    chai-hover:text-white
  //    chai-hover:text-blue-400/90
  // ────────────────────────────────────────────────
  match = base.match(/^text-([a-z]+)(?:-(\d+))?(?:\/(\d+))?$/);
  if (match) {
    const [, colorName, shade, opacity] = match;
    property = "color";

    let rawColor = colors[colorName];
    if (!rawColor) {
      value = colorName;
    } else if (typeof rawColor === "string") {
      value = rawColor;
    } else {
      value = rawColor[shade || "500"];
      if (!value) return null;
    }

    if (opacity) {
      const op = Number(opacity) / 100;
      value = hexToRgba(value, op);
    }

    return `.${cls}:hover { ${property}: ${value}; }\n`;
  }

  // ────────────────────────────────────────────────
  // 3. Shadow hover
  //    chai-hover:shadow-md
  //    chai-hover:shadow-2xl
  //    chai-hover:shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1)]
  // ────────────────────────────────────────────────
  match = base.match(/^shadow-(.+)$/);
  if (match) {
    property = "box-shadow";
    const shadowName = match[1];

    // Arbitrary shadow
    if (shadowName.startsWith("[")) {
      const arbitrary = shadowName.slice(1, -1);
      value = arbitrary;
    } else {
      // Predefined shadows (you can expand this map)
      const shadowMap = {
        sm:    "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        DEFAULT: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
        md:    "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
        lg:    "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
        xl:    "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
        "2xl": "0 25px 50px -12px rgb(0 0 0 / 0.25)",
        inner: "inset 0 2px 4px 0 rgb(0 0 0 / 0.06)",
        none:  "none"
      };
      value = shadowMap[shadowName] || "none";
    }

    return `.${cls}:hover { ${property}: ${value}; }\n`;
  }

  // ────────────────────────────────────────────────
  // 4. Border color hover
  //    chai-hover:border-red-500
  // ────────────────────────────────────────────────
  match = base.match(/^border-([a-z]+)(?:-(\d+))?(?:\/(\d+))?$/);
  if (match) {
    const [, colorName, shade, opacity] = match;
    property = "border-color";

    let rawColor = colors[colorName];
    if (!rawColor) return null;

    value = typeof rawColor === "string"
      ? rawColor
      : rawColor[shade || "500"];

    if (!value) return null;

    if (opacity) {
      const op = Number(opacity) / 100;
      value = hexToRgba(value, op);
    }

    return `.${cls}:hover { ${property}: ${value}; }\n`;
  }

  // ────────────────────────────────────────────────
  // 5. Ring (outer glow) hover – very popular
  //    chai-hover:ring-2 chai-hover:ring-blue-500/50
  // ────────────────────────────────────────────────
  match = base.match(/^ring(?:-(\d+))?$/);
  if (match) {
    const width = match[1] || "3";
    property = "box-shadow";
    value = `0 0 0 ${width}px rgba(59, 130, 246, 0.5)`; // blue-500 default
    return `.${cls}:hover { ${property}: ${value}; }\n`;
  }

  // ────────────────────────────────────────────────
  // 6. Scale transform hover (common for buttons/cards)
  //    chai-hover:scale-105
  // ────────────────────────────────────────────────
  match = base.match(/^scale-(\d+)$/);
  if (match) {
    const scale = Number(match[1]) / 100;
    property = "transform";
    value = `scale(${scale})`;
    return `.${cls}:hover { ${property}: ${value}; }\n`;
  }

  // ────────────────────────────────────────────────
  // 7. Opacity hover
  //    chai-hover:opacity-90
  // ────────────────────────────────────────────────
  match = base.match(/^opacity-(\d+)$/);
  if (match) {
    const op = Number(match[1]) / 100;
    property = "opacity";
    value = op;
    return `.${cls}:hover { ${property}: ${value}; }\n`;
  }

  // ────────────────────────────────────────────────
  // 8. Arbitrary hover style (fallback for anything)
  //    chai-hover:[filter:brightness(1.2)]
  // ────────────────────────────────────────────────
  match = base.match(/^\[(.+)\]$/);
  if (match) {
    const arbitrary = match[1];
    // Split on first colon to separate property:value
    const [prop, val] = arbitrary.split(":", 2);
    if (prop && val) {
      return `.${cls}:hover { ${prop.trim()}: ${val.trim()}; }\n`;
    }
  }

  return null;
}