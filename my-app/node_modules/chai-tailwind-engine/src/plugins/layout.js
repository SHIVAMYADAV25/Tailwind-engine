export default function layout(cls) {

  // ---------------------
  // DISPLAY
  // ---------------------
  if (cls === "chai-block") {
    return `.chai-block { display: block; }\n`;
  }

  if (cls === "chai-inline") {
    return `.chai-inline { display: inline; }\n`;
  }

  if (cls === "chai-inline-block") {
    return `.chai-inline-block { display: inline-block; }\n`;
  }

  if (cls === "chai-inline-flex") {
    return `.chai-inline-flex { display: inline-flex; }\n`;
  }

  if (cls === "chai-hidden") {
    return `.chai-hidden { display: none; }\n`;
  }

  // ---------------------
  // POSITION
  // ---------------------
  if (cls === "chai-relative") {
    return `.chai-relative { position: relative; }\n`;
  }

  if (cls === "chai-absolute") {
    return `.chai-absolute { position: absolute; }\n`;
  }

  if (cls === "chai-fixed") {
    return `.chai-fixed { position: fixed; }\n`;
  }

  if (cls === "chai-sticky") {
    return `.chai-sticky { position: sticky; top: 0; }\n`;
  }

  // ---------------------
  // TEXT ALIGNMENT
  // ---------------------
  if (cls === "chai-text-center") {
    return `.chai-text-center { text-align: center; }\n`;
  }

  if (cls === "chai-text-left") {
    return `.chai-text-left { text-align: left; }\n`;
  }

  if (cls === "chai-text-right") {
    return `.chai-text-right { text-align: right; }\n`;
  }

  // ---------------------
  // OVERFLOW
  // ---------------------
  if (cls === "chai-overflow-hidden") {
    return `.chai-overflow-hidden { overflow: hidden; }\n`;
  }

  if (cls === "chai-overflow-auto") {
    return `.chai-overflow-auto { overflow: auto; }\n`;
  }

  // ---------------------
  // VISIBILITY
  // ---------------------
  if (cls === "chai-visible") {
    return `.chai-visible { visibility: visible; }\n`;
  }

  if (cls === "chai-invisible") {
    return `.chai-invisible { visibility: hidden; }\n`;
  }

  

  return null;
}