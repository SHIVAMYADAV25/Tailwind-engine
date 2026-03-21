export default function size(cls) {
  let match;

  // -------------------------
  // WIDTH & HEIGHT (px / %)
  // -------------------------
  match = cls.match(/^chai-(w|h)-(\d+)(p)?$/);

  if (match) {
    const [, type, value, isPercent] = match;

    const property = type === "w" ? "width" : "height";
    const unit = isPercent ? "%" : "px";

    return `.${cls} { ${property}: ${value}${unit}; }\n`;
  }

  // -------------------------
  // PRESETS
  // -------------------------
  const sizeMap = {
    full: "100%",
    screen: {
      w: "100vw",
      h: "100vh"
    },
    auto: "auto",
    fit: "fit-content",
    max: "max-content"
  };

  match = cls.match(/^chai-(w|h)-(full|screen|auto|fit|max)$/);

  if (match) {
    const [, type, key] = match;

    const property = type === "w" ? "width" : "height";

    let value;

    if (key === "screen") {
      value = sizeMap.screen[type];
    } else {
      value = sizeMap[key];
    }

    return `.${cls} { ${property}: ${value}; }\n`;
  }

  // -------------------------
  // MIN / MAX
  // -------------------------
  match = cls.match(/^chai-(min|max)-(w|h)-(\d+)$/);

  if (match) {
    const [, limit, type, value] = match;

    const property =
      limit === "min"
        ? type === "w"
          ? "min-width"
          : "min-height"
        : type === "w"
        ? "max-width"
        : "max-height";

    return `.${cls} { ${property}: ${value}px; }\n`;
  }

  return null;
}