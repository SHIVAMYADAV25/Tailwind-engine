export default function flexPlugin(cls) {
  let match;

  // ---------------------
  // FLEX DISPLAY
  // ---------------------
  if (cls === "chai-flex") {
    return `.chai-flex { display: flex; }\n`;
  }

  // ---------------------
  // FLEX DIRECTION (better naming)
  // ---------------------
  match = cls.match(/^chai-flex-(row|col)$/);

  if (match) {
    const map = {
      row: "row",
      col: "column"
    };

    return `.${cls} { flex-direction: ${map[match[1]]}; }\n`;
  }

  // ---------------------
  // JUSTIFY CONTENT
  // ---------------------
  match = cls.match(/^chai-justify-(center|between|around|evenly|start|end)$/);

  if (match) {
    const map = {
      center: "center",
      between: "space-between",
      around: "space-around",
      evenly: "space-evenly",
      start: "flex-start",
      end: "flex-end"
    };

    return `.${cls} { justify-content: ${map[match[1]]}; }\n`;
  }

  // ---------------------
  // ALIGN ITEMS
  // ---------------------
  match = cls.match(/^chai-items-(center|start|end|stretch|baseline)$/);

  if (match) {
    const map = {
      center: "center",
      start: "flex-start",
      end: "flex-end",
      stretch: "stretch",
      baseline: "baseline"
    };

    return `.${cls} { align-items: ${map[match[1]]}; }\n`;
  }

  // ---------------------
  // GAP
  // ---------------------
  match = cls.match(/^chai-gap-(\d+)$/);

  if (match) {
    return `.${cls} { gap: ${match[1]}px; }\n`;
  }

  // gap-x
  match = cls.match(/^chai-gap-x-(\d+)$/);
  if (match) {
    return `.${cls} { column-gap: ${match[1]}px; }\n`;
  }

  // gap-y
  match = cls.match(/^chai-gap-y-(\d+)$/);
  if (match) {
    return `.${cls} { row-gap: ${match[1]}px; }\n`;
  }

  // ---------------------
  // FLEX GROW / SHRINK
  // ---------------------


  // console.log(cls);
  if (cls === "chai-flex-1") {
    return `.chai-flex-1 { flex: 1; }\n`;
  }

  if (cls === "chai-flex-grow") {
    return `.chai-flex-grow { flex-grow: 1; }\n`;
  }

  if (cls === "chai-flex-none") {
    return `.chai-flex-none { flex: none; }\n`;
  }

  if (cls === "chai-flex") {
    return `.chai-flex { display: flex; }\n`;
  }

  if (cls === "chai-flex-wrap") {
    return `.chai-flex-wrap { flex-wrap: wrap; }\n`;
  }

  return null;
}

