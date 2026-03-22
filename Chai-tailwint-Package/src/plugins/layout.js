// plugins/layoutPlugin.js

export default function layoutPlugin(cls) {
  if (!cls.startsWith('chai-')) return null;

  // ────────────────────────────────────────────────
  // Display types
  // ────────────────────────────────────────────────
  if (cls === 'chai-block') {
    return `.chai-block { display: block; }\n`;
  }
  if (cls === 'chai-inline') {
    return `.chai-inline { display: inline; }\n`;
  }
  if (cls === 'chai-inline-block') {
    return `.chai-inline-block { display: inline-block; }\n`;
  }
  if (cls === 'chai-inline-flex') {
    return `.chai-inline-flex { display: inline-flex; }\n`;
  }
  if (cls === 'chai-hidden') {
    return `.chai-hidden { display: none; }\n`;
  }

  // ────────────────────────────────────────────────
  // Position
  // ────────────────────────────────────────────────
  if (cls === 'chai-static') {
    return `.chai-static { position: static; }\n`;
  }
  if (cls === 'chai-relative') {
    return `.chai-relative { position: relative; }\n`;
  }
  if (cls === 'chai-absolute') {
    return `.chai-absolute { position: absolute; }\n`;
  }
  if (cls === 'chai-fixed') {
    return `.chai-fixed { position: fixed; }\n`;
  }
  if (cls === 'chai-sticky') {
    return `.chai-sticky { position: sticky; top: 0; }\n`; // top:0 is common default; can be overridden
  }

  // ────────────────────────────────────────────────
  // Overflow
  // ────────────────────────────────────────────────
  if (cls === 'chai-overflow-hidden') {
    return `.chai-overflow-hidden { overflow: hidden; }\n`;
  }
  if (cls === 'chai-overflow-auto') {
    return `.chai-overflow-auto { overflow: auto; }\n`;
  }
  if (cls === 'chai-overflow-visible') {
    return `.chai-overflow-visible { overflow: visible; }\n`;
  }
  if (cls === 'chai-overflow-scroll') {
    return `.chai-overflow-scroll { overflow: scroll; }\n`;
  }

  // ────────────────────────────────────────────────
  // Visibility
  // ────────────────────────────────────────────────
  if (cls === 'chai-visible') {
    return `.chai-visible { visibility: visible; }\n`;
  }
  if (cls === 'chai-invisible') {
    return `.chai-invisible { visibility: hidden; }\n`;
  }
  if (cls === 'chai-collapse') {
    return `.chai-collapse { visibility: collapse; }\n`; // useful in tables/flex
  }

  // ────────────────────────────────────────────────
  // Accessibility helpers (very common in layout)
  // ────────────────────────────────────────────────
  if (cls === 'chai-sr-only') {
    return `.chai-sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}\n`;
  }
  if (cls === 'chai-not-sr-only') {
    return `.chai-not-sr-only {
  position: static;
  width: auto;
  height: auto;
  padding: 0;
  margin: 0;
  overflow: visible;
  clip: auto;
  white-space: normal;
}\n`;
  }

  return null;
}