// plugins/responsivePlugin.js

import { generateCSS } from "../core/generator.js";

const BREAKPOINTS = {
  sm:  "640px",
  md:  "768px",
  lg:  "1024px",
  xl:  "1280px",
  "2xl": "1536px",   // added common Tailwind breakpoint
};

export default function responsivePlugin(cls) {
  // console.log(cls.startsWith("chai-"));
  if (!cls.startsWith("chai-")) return null;

  // ────────────────────────────────────────────────
  // Pattern 1: Standard min-width responsive prefix
  // chai-md:flex    → @media (min-width: 768px) { .chai-flex { ... } }
  // ────────────────────────────────────────────────
  let match = cls.match(/^chai-(sm|md|lg|xl|2xl)-(.+)$/);
  // console.log(match)
  if (match) {
    const [, bpKey, innerClass] = match;

    if (!(bpKey in BREAKPOINTS)) return null;

    const mediaQuery = `(min-width: ${BREAKPOINTS[bpKey]})`;
    const baseClass = `chai-${innerClass}`;
    let innerCSS = generateCSS(baseClass);

    if (!innerCSS || innerCSS.trim() === "") return null;

    innerCSS = innerCSS.replace(
      new RegExp(`chai-${innerClass}`, "g"),
      cls
    );

    // Wrap in media query (preserve indentation if multi-line)
    const wrapped = `
      @media ${mediaQuery} {
        ${innerCSS.trim()}
      }
      `.trim();

    return wrapped + "\n";
  }

  // ────────────────────────────────────────────────
  // Pattern 2: max-width responsive prefix (less common but useful)
  // chai-max-md:hidden   → @media (max-width: 767.98px) { .chai-hidden { ... } }
  // ────────────────────────────────────────────────
  match = cls.match(/^chai-max-(sm|md|lg|xl|2xl)-(.+)$/);
  if (match) {
    const [, bpKey, innerClass] = match;

    if (!(bpKey in BREAKPOINTS)) return null;

    // console.log(bpKey,in)

    // max-width is usually one pixel below the next breakpoint
    const maxValue = bpKey === "sm" ? "639.98px" :
                     bpKey === "md" ? "767.98px" :
                     bpKey === "lg" ? "1023.98px" :
                     bpKey === "xl" ? "1279.98px" :
                     "1535.98px";

    const mediaQuery = `(max-width: ${maxValue})`;
    const baseClass = `chai-${innerClass}`;

    let innerCSS = generateCSS(baseClass);

    if (!innerCSS || innerCSS.trim() === "") return null;

    innerCSS = innerCSS.replace(
      new RegExp(`chai-${innerClass}`, "g"),
      cls
    );

    // console.log(innerCSS.trim())

    return `
@media ${mediaQuery} {
  ${innerCSS.trim()}
}
`.trim() + "\n";
  }

  // ────────────────────────────────────────────────
  // Pattern 3: Arbitrary breakpoint (very powerful)
  // chai-[900px]:p-8    → @media (min-width: 900px) { .chai-p-8 { ... } }
  // chai-max-[500px]:hidden
  // ────────────────────────────────────────────────
  match = cls.match(/^chai-(max-)?\[(.+?)\]-(.+)$/);
  if (match) {
    const [, maxPrefix, rawBp, innerClass] = match;
    const isMax = !!maxPrefix;

    // Validate arbitrary breakpoint (simple check – could be enhanced)
    if (!/^\d+(px|em|rem|vw|vh)$/.test(rawBp)) return null;

    const mediaQuery = isMax
      ? `(max-width: ${rawBp})`
      : `(min-width: ${rawBp})`;

    const baseClass = `chai-${innerClass}`;
    let innerCSS = generateCSS(baseClass);

    if (!innerCSS || innerCSS.trim() === "") return null;

    innerCSS = innerCSS.replace(
      new RegExp(`chai-${innerClass}`, "g"),
      cls
    );
    
    return `
@media ${mediaQuery} {
  ${innerCSS.trim()}
}
`.trim() + "\n";
  }

  return null;
}