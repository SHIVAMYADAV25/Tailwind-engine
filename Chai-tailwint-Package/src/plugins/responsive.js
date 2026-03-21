import { generateCSS } from "../core/generator.js";

export default function responsivePlugin(cls) {

  // -------------------------
  // BREAKPOINTS
  // -------------------------
  const breakpoints = {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px"
  };

  // -------------------------
  // MATCH RESPONSIVE CLASS
  // chai-md-p-20
  // -------------------------
  const match = cls.match(/^chai-(sm|md|lg|xl)-(.+)$/);

  if (!match) return null;

  const [, bp, innerClass] = match;

  // recreate inner class
  const baseClass = `chai-${innerClass}`;

  // generate base CSS
  const innerCSS = generateCSS(baseClass);

  if (!innerCSS) return null;

  // wrap in media query
  return `
@media (min-width: ${breakpoints[bp]}) {
  ${innerCSS}
}
`;
}