// plugins/spacingPlugin.js

import { escapeClass } from "../core/utils.js";

export default function spacingPlugin(cls) {
  if (!cls.startsWith('chai-')) return null;

  // Helper to convert scale number → rem (Tailwind default: 1 unit = 0.25rem)
  const scaleToRem = (num) => {
    const n = Number(num);
    return isNaN(n) ? null : `${n * 0.25}rem`;
  };

  let match;

  // ────────────────────────────────────────────────
  // 1. Negative prefix detection
  // ────────────────────────────────────────────────
  const isNegative = cls.startsWith('chai--');
  const baseCls = isNegative ? cls.replace('chai--', 'chai-') : cls;
  const sign = isNegative ? '-' : '';

  // ────────────────────────────────────────────────
  // 2. All-sides: chai-p-8 / chai--m-12 / chai-p-px
  // ────────────────────────────────────────────────
  match = baseCls.match(/^chai-(p|m)-(\d+|px)$/);
  if (match) {
    const [, type, rawValue] = match;
    const property = type === 'p' ? 'padding' : 'margin';

    let value;
    if (rawValue === 'px') {
      value = '1px';
    } else {
      const rem = scaleToRem(rawValue);
      if (!rem) return null;
      value = rem;
    }

    return `.${cls} { ${property}: ${sign}${value}; }\n`;
  }

  // ────────────────────────────────────────────────
  // 3. Directional: chai-pt-6 / chai--mb-10 / chai-pr-px
  // ────────────────────────────────────────────────
  match = baseCls.match(/^chai-(p|m)(t|r|b|l)-(\d+|px)$/);
  if (match) {
    const [, type, dir, rawValue] = match;
    const base = type === 'p' ? 'padding' : 'margin';

    const dirMap = { t: 'top', r: 'right', b: 'bottom', l: 'left' };
    const side = dirMap[dir];
    if (!side) return null;

    let value;
    if (rawValue === 'px') {
      value = '1px';
    } else {
      const rem = scaleToRem(rawValue);
      if (!rem) return null;
      value = rem;
    }

    return `.${cls} { ${base}-${side}: ${sign}${value}; }\n`;
  }

  // ────────────────────────────────────────────────
  // 4. Axis: chai-px-5 / chai--my-8 / chai-mx-px
  // ────────────────────────────────────────────────
  match = baseCls.match(/^chai-(p|m)(x|y)-(\d+|px)$/);
  if (match) {
    const [, type, axis, rawValue] = match;
    const base = type === 'p' ? 'padding' : 'margin';

    let value;
    if (rawValue === 'px') {
      value = '1px';
    } else {
      const rem = scaleToRem(rawValue);
      if (!rem) return null;
      value = rem;
    }

    if (axis === 'x') {
      return `.${cls} { ${base}-left: ${sign}${value}; ${base}-right: ${sign}${value}; }\n`;
    }
    if (axis === 'y') {
      return `.${cls} { ${base}-top: ${sign}${value}; ${base}-bottom: ${sign}${value}; }\n`;
    }
  }

  // ────────────────────────────────────────────────
  // 5. Auto margins (chai-mx-auto, chai-my-auto, chai-m-auto)
  // ────────────────────────────────────────────────
  if (cls === 'chai-mx-auto') {
    return `.chai-mx-auto { margin-left: auto; margin-right: auto; }\n`;
  }
  if (cls === 'chai-my-auto') {
    return `.chai-my-auto { margin-top: auto; margin-bottom: auto; }\n`;
  }
  if (cls === 'chai-m-auto') {
    return `.chai-m-auto { margin: auto; }\n`;
  }

  // ────────────────────────────────────────────────
  // 6. Arbitrary values: chai-p-[42px], chai--mt-[-2.5rem], chai-px-[15%]
  // ────────────────────────────────────────────────
  match = cls.match(/^chai-(-)?(p|m)(t|r|b|l|x|y)?-\[(.+)\]$/);
  // console.log(match)
  if (match) {
    const [, neg, type, dirOrAxis, value] = match;
    const isNeg = !!neg || value.startsWith('-'); // support both -[...] and [--...-[...]]
    const finalSign = (isNeg || value.startsWith('-')) ? '-' : '';
    const cleanValue = value.replace(/^-/, ''); // remove leading - if present inside []

    const propertyBase = type === 'p' ? 'padding' : 'margin';

    cls = escapeClass(cls);

    let property;
    if (!dirOrAxis) {
      property = propertyBase;
    } else if (dirOrAxis === 'x') {
      return `.${cls} { ${propertyBase}-left: ${finalSign}${value}; ${propertyBase}-right: ${finalSign}${value}; }\n`;
    } else if (dirOrAxis === 'y') {
      return `.${cls} { ${propertyBase}-top: ${finalSign}${value}; ${propertyBase}-bottom: ${finalSign}${value}; }\n`;
    } else {
      const dirMap = { t: 'top', r: 'right', b: 'bottom', l: 'left' };
      const side = dirMap[dirOrAxis];
      if (!side) return null;
      property = `${propertyBase}-${side}`;
    }

    // console.log(`.${escapeClass(cls)} { ${property}: ${finalSign}${cleanValue}; }\n`)

    return `.${escapeClass(cls)} { ${property}: ${finalSign}${cleanValue}; }\n`;
  }

  return null;
}