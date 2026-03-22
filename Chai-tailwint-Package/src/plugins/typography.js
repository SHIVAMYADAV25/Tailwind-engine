// plugins/typographyPlugin.js

import { escapeClass } from "../core/utils.js";

export default function typographyPlugin(cls) {
  if (!cls.startsWith('chai-')) return null;

  // ────────────────────────────────────────────────
  // 1. Font Size: chai-fs-16 → font-size: 1rem (but we use rem scale)
  //    Also supports chai-fs-[2.5rem] arbitrary
  // ────────────────────────────────────────────────
  let match = cls.match(/^chai-fs-(?:\[(.+)\]|(\d+))$/);
  if (match) {
    const value = match[1] ? match[1] : `${Number(match[2]) / 16}rem`; // convert px input to rem
    // console.log(`.${escapeClass(cls)} { font-size: ${value}; }\n`);
    return `.${escapeClass(cls)} { font-size: ${value}; }\n`;
  }

  // ────────────────────────────────────────────────
  // 2. Font Weight: chai-fw-semibold, chai-fw-700, etc.
  // ────────────────────────────────────────────────
  match = cls.match(/^chai-fw-(.+)$/);
  if (match) {
    const key = match[1];
    const weightMap = {
      thin:       100,
      extralight: 200,
      light:      300,
      normal:     400,
      medium:     500,
      semibold:   600,
      bold:       700,
      extrabold:  800,
      black:      900,
      // Also allow direct numbers like fw-500
      ...(Number(key) ? { [key]: Number(key) } : {})
    };

    const weight = weightMap[key] || 400; // fallback normal
    return `.${cls} { font-weight: ${weight}; }\n`;
  }

  // ────────────────────────────────────────────────
  // 3. Text Align
  // ────────────────────────────────────────────────
  match = cls.match(/^chai-text-(left|center|right|justify|start|end)$/);
  if (match) {
    return `.${cls} { text-align: ${match[1]}; }\n`;
  }

  // ────────────────────────────────────────────────
  // 4. Line Height: chai-lh-24 → line-height: 1.5rem
  //    chai-lh-[1.6] arbitrary
  // ────────────────────────────────────────────────
  match = cls.match(/^chai-lh-(?:\[(.+)\]|(\d+))$/);
  if (match) {
    let value;
    if (match[1]) {
      value = match[1]; // arbitrary e.g. 1.6, 150%, 32px → kept as-is
    } else {
      value = `${Number(match[2]) / 16}rem`; // assume input was px → convert to rem
    }

    
    return `.${escapeClass(cls)} { line-height: ${value}; }\n`;
  }

  // ────────────────────────────────────────────────
  // 5. Letter Spacing (tracking): chai-ls-2 → 0.125em etc.
  //    chai-ls-[0.05em] arbitrary
  // ────────────────────────────────────────────────
  match = cls.match(/^chai-ls-(?:\[(.+)\]|(\d+)|(-?\d+)|tighter|tight|normal|wide|wider|widest)$/);
  if (match) {
    let value;
    if (match[1]) {
      value = match[1]; // arbitrary
    } else if (match[2] || match[3]) {
      value = `${Number(match[2] || match[3]) * 0.025}em`; // scale like Tailwind: 1 = 0.025em
    } else {
      const named = {
        tighter: '-0.05em',
        tight:   '-0.025em',
        normal:  '0em',
        wide:    '0.025em',
        wider:   '0.05em',
        widest:  '0.1em'
      };
      value = named[match[0].split('-')[2]] || '0em';
    }

    return `.${escapeClass(cls)} { letter-spacing: ${value}; }\n`;
  }

  // ────────────────────────────────────────────────
  // 6. Text Transform
  // ────────────────────────────────────────────────
  if (cls === 'chai-uppercase')   return `.${cls} { text-transform: uppercase; }\n`;
  if (cls === 'chai-lowercase')   return `.${cls} { text-transform: lowercase; }\n`;
  if (cls === 'chai-capitalize')  return `.${cls} { text-transform: capitalize; }\n`;
  if (cls === 'chai-normal-case') return `.${cls} { text-transform: none; }\n`;

  // ────────────────────────────────────────────────
  // 7. Font Style
  // ────────────────────────────────────────────────
  if (cls === 'chai-italic')      return `.${cls} { font-style: italic; }\n`;
  if (cls === 'chai-not-italic')  return `.${cls} { font-style: normal; }\n`;

  return null;
}