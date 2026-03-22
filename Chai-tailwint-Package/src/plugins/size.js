// plugins/sizePlugin.js

import { escapeClass } from "../core/utils.js";

export default function sizePlugin(cls) {
  if (!cls.startsWith('chai-')) return null;

  // Helper: convert scale number to rem (Tailwind-like: 1 unit = 0.25rem)
  const scaleToRem = (num) => {
    const n = Number(num);
    return isNaN(n) ? null : `${n * 0.25}rem`;
  };

  let match;

  // ────────────────────────────────────────────────
  // 1. Basic width/height: chai-w-64, chai-h-100, chai-w-50p
  // ────────────────────────────────────────────────
  match = cls.match(/^chai-(w|h)-(\d+)(p)?$/);
  if (match) {
    const [, dimension, rawValue, isPercent] = match;
    const property = dimension === 'w' ? 'width' : 'height';

    let value;
    if (isPercent) {
      value = `${rawValue}%`;
    } else {
      const rem = scaleToRem(rawValue);
      if (rem === null) return null;
      value = rem;
    }

    return `.${cls} { ${property}: ${value}; }\n`;
  }

  // ────────────────────────────────────────────────
  // 2. Keyword sizes: chai-w-full, chai-h-screen, chai-w-fit, etc.
  // ────────────────────────────────────────────────
  const sizeKeywords = {
    full: '100%',
    screen: { w: '100vw', h: '100vh' },
    auto: 'auto',
    fit: 'fit-content',
    min: 'min-content',
    max: 'max-content'
  };

  match = cls.match(/^chai-(w|h)-(full|screen|auto|fit|min|max)$/);
  if (match) {
    const [, dimension, key] = match;
    const property = dimension === 'w' ? 'width' : 'height';

    let value = sizeKeywords[key];
    if (typeof value === 'object') {
      value = value[dimension];
    }

    if (value) {
      return `.${cls} { ${property}: ${value}; }\n`;
    }
  }

  // ────────────────────────────────────────────────
  // 3. Min / Max: chai-min-w-40, chai-max-h-200, chai-min-h-100p
  // ────────────────────────────────────────────────
  match = cls.match(/^chai-(min|max)-(w|h)-(\d+)(p)?$/);
  if (match) {
    const [, limit, dimension, rawValue, isPercent] = match;

    let property;
    if (limit === 'min') {
      property = dimension === 'w' ? 'min-width' : 'min-height';
    } else {
      property = dimension === 'w' ? 'max-width' : 'max-height';
    }

    let value;
    if (isPercent) {
      value = `${rawValue}%`;
    } else {
      const rem = scaleToRem(rawValue);
      if (rem === null) return null;
      value = rem;
    }

    return `.${cls} { ${property}: ${value}; }\n`;
  }

  // ────────────────────────────────────────────────
  // 4. Arbitrary values: chai-w-[300px], chai-h-[45vh], chai-min-w-[50%]
  //    Supports negative: chai--w-[2rem]
  // ────────────────────────────────────────────────
  match = cls.match(/^chai-(-)?(min|max|)?(w|h)-\[(.+)\]$/);
  if (match) {
    const [, negative, limit, dimension, rawValue] = match;
    const isNegative = !!negative;

    let property;
    if (limit) {
      property = limit === 'min'
        ? (dimension === 'w' ? 'min-width' : 'min-height')
        : (dimension === 'w' ? 'max-width' : 'max-height');
    } else {
      property = dimension === 'w' ? 'width' : 'height';
    }

    // Clean value: remove leading - if present inside brackets for negative case
    let finalValue = rawValue;
    if (isNegative && !rawValue.startsWith('-')) {
      finalValue = `-${rawValue}`;
    } else if (!isNegative && rawValue.startsWith('-')) {
      finalValue = rawValue.substring(1); // rare case
    }

    return `.${escapeClass(cls)} { ${property}: ${finalValue}; }\n`;
  }

  return null;
}