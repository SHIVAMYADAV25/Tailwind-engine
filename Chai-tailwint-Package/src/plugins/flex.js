// plugins/flexPlugin.js

export default function flexPlugin(cls) {
  if (!cls.startsWith('chai-')) return null;

  // Helper: convert gap scale to rem (1 unit = 0.25rem like spacing)
  const scaleToRem = (num) => {
    const n = Number(num);
    return isNaN(n) ? null : `${n * 0.25}rem`;
  };

  let match;

  // ────────────────────────────────────────────────
  // 1. Display: chai-flex
  // ────────────────────────────────────────────────
  if (cls === 'chai-flex') {
    return `.chai-flex { display: flex; }\n`;
  }

  // ────────────────────────────────────────────────
  // 2. Flex Direction: chai-flex-row, chai-flex-col, reverses
  // ────────────────────────────────────────────────
  match = cls.match(/^chai-flex-(row|col)(-(reverse))?$/);
  if (match) {
    const direction = match[1] === 'row' ? 'row' : 'column';
    const reverse = match[2] ? '-reverse' : '';
    return `.${cls} { flex-direction: ${direction}${reverse}; }\n`;
  }

  // ────────────────────────────────────────────────
  // 3. Flex Wrap: chai-flex-wrap, chai-flex-nowrap, chai-flex-wrap-reverse
  // ────────────────────────────────────────────────
  if (cls === 'chai-flex-wrap') {
    return `.chai-flex-wrap { flex-wrap: wrap; }\n`;
  }
  if (cls === 'chai-flex-nowrap') {
    return `.chai-flex-nowrap { flex-wrap: nowrap; }\n`;
  }
  if (cls === 'chai-flex-wrap-reverse') {
    return `.chai-flex-wrap-reverse { flex-wrap: wrap-reverse; }\n`;
  }

  // ────────────────────────────────────────────────
  // 4. Justify Content
  // ────────────────────────────────────────────────
  match = cls.match(/^chai-justify-(start|end|center|between|around|evenly)$/);
  if (match) {
    const map = {
      start:    'flex-start',
      end:      'flex-end',
      center:   'center',
      between:  'space-between',
      around:   'space-around',
      evenly:   'space-evenly'
    };
    return `.${cls} { justify-content: ${map[match[1]]}; }\n`;
  }

  // ────────────────────────────────────────────────
  // 5. Align Items
  // ────────────────────────────────────────────────
  match = cls.match(/^chai-items-(start|end|center|baseline|stretch)$/);
  if (match) {
    const map = {
      start:    'flex-start',
      end:      'flex-end',
      center:   'center',
      baseline: 'baseline',
      stretch:  'stretch'
    };
    return `.${cls} { align-items: ${map[match[1]]}; }\n`;
  }

  // ────────────────────────────────────────────────
  // 6. Align Content (for multi-line flex)
  // ────────────────────────────────────────────────
  match = cls.match(/^chai-content-(start|end|center|between|around|evenly|baseline|stretch)$/);
  if (match) {
    const map = {
      start:    'flex-start',
      end:      'flex-end',
      center:   'center',
      between:  'space-between',
      around:   'space-around',
      evenly:   'space-evenly',
      baseline: 'baseline',
      stretch:  'stretch'
    };
    return `.${cls} { align-content: ${map[match[1]]}; }\n`;
  }

  // ────────────────────────────────────────────────
  // 7. Gap (chai-gap-4, chai-gap-x-6, chai-gap-y-8)
  // ────────────────────────────────────────────────
  match = cls.match(/^chai-gap-(\d+)$/);
  if (match) {
    const rem = scaleToRem(match[1]);
    if (rem) return `.${cls} { gap: ${rem}; }\n`;
  }

  match = cls.match(/^chai-gap-(x|y)-(\d+)$/);
  if (match) {
    const axis = match[1] === 'x' ? 'column-gap' : 'row-gap';
    const rem = scaleToRem(match[2]);
    if (rem) return `.${cls} { ${axis}: ${rem}; }\n`;
  }

  // ────────────────────────────────────────────────
  // 8. Flex shorthand: chai-flex-1, chai-flex-auto, chai-flex-initial, chai-flex-none
  // ────────────────────────────────────────────────
  if (cls === 'chai-flex-1')      return `.chai-flex-1 { flex: 1 1 0%; }\n`;
  if (cls === 'chai-flex-auto')   return `.chai-flex-auto { flex: 1 1 auto; }\n`;
  if (cls === 'chai-flex-initial') return `.chai-flex-initial { flex: 0 1 auto; }\n`;
  if (cls === 'chai-flex-none')   return `.chai-flex-none { flex: none; }\n`;

  // ────────────────────────────────────────────────
  // 9. Grow / Shrink
  // ────────────────────────────────────────────────
  if (cls === 'chai-flex-grow')     return `.chai-flex-grow { flex-grow: 1; }\n`;
  if (cls === 'chai-flex-grow-0')   return `.chai-flex-grow-0 { flex-grow: 0; }\n`;
  if (cls === 'chai-flex-shrink')   return `.chai-flex-shrink { flex-shrink: 1; }\n`;
  if (cls === 'chai-flex-shrink-0') return `.chai-flex-shrink-0 { flex-shrink: 0; }\n`;

  // ────────────────────────────────────────────────
  // 10. Align Self (per-item alignment)
  // ────────────────────────────────────────────────
  match = cls.match(/^chai-self-(auto|start|end|center|stretch|baseline)$/);
  if (match) {
    const map = {
      auto:     'auto',
      start:    'flex-start',
      end:      'flex-end',
      center:   'center',
      stretch:  'stretch',
      baseline: 'baseline'
    };
    return `.${cls} { align-self: ${map[match[1]]}; }\n`;
  }

  // ────────────────────────────────────────────────
  // 11. Order: chai-order-first, chai-order-last, chai-order-12
  // ────────────────────────────────────────────────
  match = cls.match(/^chai-order-(first|last|\d+)$/);
  if (match) {
    let value;
    if (match[1] === 'first') value = '-9999';
    else if (match[1] === 'last') value = '9999';
    else value = match[1];
    return `.${cls} { order: ${value}; }\n`;
  }

  // ────────────────────────────────────────────────
  // 12. Flex Basis (chai-basis-32, chai-basis-full, chai-basis-auto)
  // ────────────────────────────────────────────────
  match = cls.match(/^chai-basis-(full|auto|\d+)$/);
  if (match) {
    let value;
    if (match[1] === 'full') value = '100%';
    else if (match[1] === 'auto') value = 'auto';
    else {
      const rem = scaleToRem(match[1]);
      if (!rem) return null;
      value = rem;
    }
    return `.${cls} { flex-basis: ${value}; }\n`;
  }

  return null;
}