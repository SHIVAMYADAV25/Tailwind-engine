import { colors } from "../core/colors.js";

export default function borderPlugin(cls) {
  let match;

  // ---------------------
  // BASIC BORDER
  // ---------------------
  if (cls === "chai-border") {
    return `.chai-border {
      border-width: 1px;
      border-style: solid;
      border-color: #e5e7eb;
    }\n`;
  }

  // ---------------------
  // BORDER WIDTH
  // ---------------------
  match = cls.match(/^chai-bw-(\d+)$/);
  if (match) {
    return `.${cls} {
      border-width: ${match[1]}px;
      border-style: solid;
    }\n`;
  }

  // ---------------------
  // BORDER SIDES
  // ---------------------
  match = cls.match(/^chai-border-(t|b|l|r)$/);
  if (match) {
    const map = { t: "top", b: "bottom", l: "left", r: "right" };
    return `.${cls} {
      border-${map[match[1]]}-width: 1px;
      border-style: solid;
    }\n`;
  }

  // ---------------------
  // BORDER COLOR
  // ---------------------
  match = cls.match(/^chai-bc-([a-z]+)(?:-(\d+))?$/);
  if (match) {
    const [, color, shade] = match;

    if (!colors[color]) return null;

    const value =
      typeof colors[color] === "string"
        ? colors[color]
        : colors[color][shade || 500];

    if (!value) return null;

    return `.${cls} { border-color: ${value}; }\n`;
  }

  // ---------------------
  // RADIUS (PX ONLY)
  // ---------------------
  match = cls.match(/^chai-rounded-(\d+)$/);
  if (match) {
    return `.${cls} { border-radius: ${match[1]}px; }\n`;
  }

  if (cls === "chai-rounded-full") {
    return `.chai-rounded-full { border-radius: 9999px; }\n`;
  }

  return null;
}