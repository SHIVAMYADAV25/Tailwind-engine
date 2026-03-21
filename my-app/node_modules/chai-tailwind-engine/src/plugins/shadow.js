import { colors } from "../core/colors.js";

export default function shadowPlugin(cls) {

  // Pattern: chai-shadow-0px-4px-10px-gray
  const match = cls.match(/^chai-shadow-(.+)$/);

  if (!match) return;

  const value = match[1];

  // Split parts → ["0px", "4px", "10px", "gray"]
  const parts = value.split("-");

  if (parts.length < 4) return;

  const [x, y, blur, colorName] = parts;

  let color = colorName;

  // If color exists in palette, use shade 500
  if (colors[colorName]) {
    if (typeof colors[colorName] === "object") {
      color = colors[colorName][500];
    } else {
      color = colors[colorName];
    }
    return `.${cls} { box-shadow: ${x} ${y} ${blur} ${color}; }\n`;
  }

  

  const map = {
    sm: "0 1px 2px rgba(0,0,0,0.1)",
    md: "0 4px 10px rgba(0,0,0,0.15)",
    lg: "0 10px 20px rgba(0,0,0,0.2)"
  };

  const match1 = cls.match(/^chai-shadow-(sm|md|lg)$/);

  if (match1) {
    return `.${cls} { box-shadow: ${map[match1[1]]}; }\n`;
  }
}