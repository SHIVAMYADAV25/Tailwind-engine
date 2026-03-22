import { colors } from "../core/colors.js";
import { escapeClass, escapeClass2, escapeClassName, hexToRgba } from "../core/utils.js";

const namedGradients = {
  "indigo-blue": "linear-gradient(135deg, #4f46e5, #06b6d4)",
  "purple-pink": "linear-gradient(135deg, #7c3aed, #ec4899)",
  "blue-cyan": "linear-gradient(135deg, #2563eb, #22d3ee)",
  "green-teal": "linear-gradient(135deg, #10b981, #14b8a6)",
  "orange-pink": "linear-gradient(135deg, #f97316, #ec4899)",
};

export default function backgroundPlugin(cls) {
  if (!cls.startsWith("chai-")) return null;

  let match;

  // ✅ Gradient direction
  match = cls.match(/^chai-bg-gradient-to-(t|tr|r|br|b|bl|l|tl)$/);
  if (match) {
    const dirMap = {
      t: "to top",
      tr: "to top right",
      r: "to right",
      br: "to bottom right",
      b: "to bottom",
      bl: "to bottom left",
      l: "to left",
      tl: "to top left",
    };

    return `.${cls} {
      background-image: linear-gradient(${dirMap[match[1]]}, var(--tw-gradient-stops, currentColor));
    }\n`;
  }

  // ✅ Named gradients
  match = cls.match(/^chai-bg-gradient-([a-z-]+)$/);
  if (match) {
    const gradient = namedGradients[match[1]];
    if (gradient) {
      return `.${cls} { background-image: ${gradient}; }\n`;
    }
  }

  // ✅ Arbitrary background (FIXED CORE)
  match = cls.match(/^chai-bg-\[(.+)\]$/);
  if (match) {
    const value = match[1];

    const property =
      value.startsWith("#") || value.startsWith("rgb")
        ? "background-color"
        : "background-image";

      

    return `.${escapeClass2(cls)} {
      ${property}: ${value};
    }\n`;
  }

  // ✅ Gradient color stops
  match = cls.match(/^chai-(from|via|to)-([a-z]+)(?:-(\d+))?(?:\/(\d+))?$/);
  if (match) {
    const [, stop, colorName, shade, opacity] = match;

    const colorGroup = colors[colorName];
    if (!colorGroup) return null;

    let colorValue =
      typeof colorGroup === "string"
        ? colorGroup
        : colorGroup[shade || "500"];

    if (!colorValue) return null;

    // ✅ FIXED opacity
    if (opacity) {
      colorValue = hexToRgba(colorValue, Number(opacity) / 100);
    }

    const varName = `--tw-gradient-${stop}`;

    return `.${escapeClass(cls)} { ${varName}: ${colorValue}; }\n`;
  }

  // ✅ Size
  if (cls === "chai-bg-auto") return `.chai-bg-auto { background-size: auto; }\n`;
  if (cls === "chai-bg-cover") return `.chai-bg-cover { background-size: cover; }\n`;
  if (cls === "chai-bg-contain") return `.chai-bg-contain { background-size: contain; }\n`;

  // ✅ Position
  match = cls.match(/^chai-bg-(top|bottom|center|left|right)$/);
  if (match) {
    return `.${cls} { background-position: ${match[1]}; }\n`;
  }

  match = cls.match(/^chai-bg-(top|bottom|center)-(left|right|center)$/);
  if (match) {
    return `.${cls} {
      background-position: ${match[1]} ${match[2]};
    }\n`;
  }

  // ✅ Repeat
  if (cls === "chai-bg-repeat") return `.chai-bg-repeat { background-repeat: repeat; }\n`;
  if (cls === "chai-bg-no-repeat") return `.chai-bg-no-repeat { background-repeat: no-repeat; }\n`;
  if (cls === "chai-bg-repeat-x") return `.chai-bg-repeat-x { background-repeat: repeat-x; }\n`;
  if (cls === "chai-bg-repeat-y") return `.chai-bg-repeat-y { background-repeat: repeat-y; }\n`;
  if (cls === "chai-bg-repeat-round") return `.chai-bg-repeat-round { background-repeat: round; }\n`;
  if (cls === "chai-bg-repeat-space") return `.chai-bg-repeat-space { background-repeat: space; }\n`;

  // ✅ Attachment
  if (cls === "chai-bg-fixed") return `.chai-bg-fixed { background-attachment: fixed; }\n`;
  if (cls === "chai-bg-local") return `.chai-bg-local { background-attachment: local; }\n`;
  if (cls === "chai-bg-scroll") return `.chai-bg-scroll { background-attachment: scroll; }\n`;

  return null;
}