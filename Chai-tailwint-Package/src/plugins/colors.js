import { colors } from "../core/colors.js"; 
import { hexToRgba } from "../core/utils.js";

export default function colorPlugin(cls) {

  const match = cls.match(
    /^chai-(dark-)?(bg|text|bc)-([a-z-]+)(?:-(\d+))?(?:\/(\d+))?$/
  );

  if (!match) return null;

  const [, isDark, type, colorName, shade, opacity] = match;

  const propertyMap = {
    bg: "background-color",
    text: "color",
    bc: "border-color"
  };

  const property = propertyMap[type];

  const colorGroup = colors[colorName];
  if (!colorGroup) return null;

  let value;

  if (typeof colorGroup === "string") {
    value = colorGroup;
  } else {
    const finalShade = shade || 500;
    value = colorGroup[finalShade];

    if (!value) return null;
  }

  if (opacity) {
    value = hexToRgba(value, Number(opacity) / 100);
  }

  if (isDark) {
    return `.dark .${cls} { ${property}: ${value}; }\n`;
  }

  return `.${cls} { ${property}: ${value}; }\n`;
}