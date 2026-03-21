export default function transitionPlugin(cls) {

  if (cls === "chai-transition") {
    return `.chai-transition { transition: all 0.2s ease; }\n`;
  }

  let match;

  match = cls.match(/^chai-duration-(\d+)$/);
  if (match) {
    return `.${cls} { transition-duration: ${match[1]}ms; }\n`;
  }

  match = cls.match(/^chai-ease-(in|out|in-out)$/);
  if (match) {
    const map = {
      in: "ease-in",
      out: "ease-out",
      "in-out": "ease-in-out"
    };

    return `.${cls} { transition-timing-function: ${map[match[1]]}; }\n`;
  }

  return null;
}