import { colors } from "../core/colors.js";
import { hexToRgba } from "../core/utils.js";

const DEFAULT_SHADE = "500";
const OPACITY_FALLBACK = 100;

export default function colorPlugin(cls) {
  if (!cls.startsWith("chai-")) return null;

  // ✅ Prevent conflict with arbitrary values like chai-bg-[...]
  if (cls.includes("[")) return null;

  const match = cls.match(
    /^chai-(dark-)?(bg|text|bc|ring|outline|decoration|caret|accent|fill|stroke)-([a-z]+)(?:-(\d{1,3}))?(?:\/(\d{1,3}))?$/
  );
  // console.log(match);

  if (!match) return null;

  const [
    ,
    darkPrefix,
    variant,
    colorBase,
    shadeStr,
    opacityStr
  ] = match;

  const propertyMap = {
    bg: "background-color",
    text: "color",
    bc: "border-color",
    ring: "box-shadow",
    outline: "outline-color",
    decoration: "text-decoration-color",
    caret: "caret-color",
    accent: "accent-color",
    fill: "fill",
    stroke: "stroke",
  };

  const cssProperty = propertyMap[variant];
  // console.log(cssProperty);
  if (!cssProperty) return null;

  const colorGroup = colors[colorBase];
  if (!colorGroup) return null;

  let hexColor;

  if (typeof colorGroup === "string") {
    hexColor = colorGroup;
  } else {
    const shade = shadeStr || DEFAULT_SHADE;
    hexColor = colorGroup[shade];
    if (!hexColor) return null;
  }

  let finalValue = hexColor;

  if (opacityStr) {
    const opacity = Number(opacityStr);
    if (opacity < 0 || opacity > 100) return null;

    if (opacity < 100) {
      finalValue = hexToRgba(hexColor, opacity / 100);
    }
  }

  if (variant === "ring") {
    const ringWidth = shadeStr ? Number(shadeStr) : 3;
    const shadowValue = `0 0 0 ${ringWidth}px ${finalValue}`;
    finalValue = shadowValue;
  }


  const safeClass = cls
  .replace(/\[/g, "\\[")
  .replace(/\]/g, "\\]")
  .replace(/\#/g, "\\#")
  .replace(/\//g, "\\/");

  const selector = darkPrefix
    ? `.dark .${safeClass}`
    : `.${safeClass}`;

  // console.log(`${selector} { ${cssProperty}: ${finalValue}; }\n`);
  return `${selector} { ${cssProperty}: ${finalValue}; }\n`;
}