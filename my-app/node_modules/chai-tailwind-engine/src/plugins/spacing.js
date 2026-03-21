export default function spacingPlugin(cls) {

  let match;

  // -----------------------
  // p-10 / m-20
  // -----------------------
  match = cls.match(/^chai-(p|m)-(\d+)$/);

  if (match) {
    const [, type, value] = match;
    const property = type === "p" ? "padding" : "margin";

    return `.${cls} { ${property}: ${value}px; }\n`;
  }

  // -----------------------
  // pt-10 / mb-20 etc
  // -----------------------
  match = cls.match(/^chai-(p|m)(t|b|l|r)-(\d+)$/);

  if (match) {
    const [, type, dir, value] = match;

    const base = type === "p" ? "padding" : "margin";

    const dirMap = {
      t: "top",
      b: "bottom",
      l: "left",
      r: "right"
    };

    return `.${cls} { ${base}-${dirMap[dir]}: ${value}px; }\n`;
  }

  // -----------------------
  // px / py / mx / my
  // -----------------------
  match = cls.match(/^chai-(p|m)(x|y)-(\d+)$/);

  if (match) {
    const [, type, axis, value] = match;

    const base = type === "p" ? "padding" : "margin";

    if (axis === "x") {
      return `.${cls} { ${base}-left: ${value}px; ${base}-right: ${value}px; }\n`;
    }

    if (axis === "y") {
      return `.${cls} { ${base}-top: ${value}px; ${base}-bottom: ${value}px; }\n`;
    }
  }

  // -----------------------
  // mx-auto (VERY IMPORTANT)
  // -----------------------
  if (cls === "chai-mx-auto") {
    return `.chai-mx-auto { margin-left: auto; margin-right: auto; }\n`;
  }

  if (cls === "chai-text-center") {
    return `.chai-text-center { text-align: center; }\n`;
  }

  // -----------------------
  // no match
  // -----------------------
  return null;
}