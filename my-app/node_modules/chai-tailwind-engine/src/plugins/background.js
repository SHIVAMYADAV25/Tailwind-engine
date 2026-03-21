import { colors } from "../core/colors.js";

// -------------------------
// IMAGE MAP (SAFE SYSTEM)
// -------------------------
const bgImages = {
  hero: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
  night: "https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d",
  gradient: "https://images.unsplash.com/photo-1557683316-973673baf926"
};

// -------------------------
// GRADIENT PRESETS
// -------------------------
const gradientMap = {
  // 🔥 Default modern SaaS (BEST PICK)
  "indigo-blue": "linear-gradient(135deg, #4f46e5, #06b6d4)",

  // 🌙 Dark premium (very Vercel style)
  "dark-indigo": "linear-gradient(135deg, #0f172a, #1e293b, #4f46e5)",

  // ✨ Soft premium (smooth, not harsh)
  "purple-pink": "linear-gradient(135deg, #7c3aed, #ec4899)",

  // 🌊 Calm & clean (startup vibe)
  "blue-cyan": "linear-gradient(135deg, #2563eb, #22d3ee)",

  // ⚡ Slightly bold but still clean
  "indigo-purple": "linear-gradient(135deg, #6366f1, #9333ea)",

  // 🌿 Fresh modern UI
  "green-teal": "linear-gradient(135deg, #10b981, #14b8a6)",

  // 🔥 Warm premium (not too flashy)
  "orange-pink": "linear-gradient(135deg, #f97316, #ec4899)"
};

export default function backgroundPlugin(cls) {

  let match;

  // -------------------------
  // GRADIENT PRESET
  // -------------------------
  match = cls.match(/^chai-bg-gradient-(.+)$/);

  if (match && gradientMap[match[1]]) {
    return `.${cls} {
      background: ${gradientMap[match[1]]};
    }\n`;
  }

  // -------------------------
  // CUSTOM GRADIENT
  // chai-bg-gradient-red-500-blue-500
  // -------------------------
// -------------------------
// DYNAMIC GRADIENT SYSTEM
// -------------------------
match = cls.match(
  /^chai-bg-gradient-(to-(left|right|top|bottom))?-?([a-z]+)(?:-(\d+))?-([a-z]+)(?:-(\d+))?$/
);

if (match) {
  const [, dir, direction, c1, s1, c2, s2] = match;

  const directions = {
    left: "to left",
    right: "to right",
    top: "to top",
    bottom: "to bottom"
  };

  const finalDir = direction ? directions[direction] : "135deg";

  const color1 = typeof colors[c1] === "string"
    ? colors[c1]
    : colors[c1]?.[s1 || 500];

  const color2 = typeof colors[c2] === "string"
    ? colors[c2]
    : colors[c2]?.[s2 || 500];

  if (!color1 || !color2) return null;

  return `.${cls} {
    background: linear-gradient(${finalDir}, ${color1}, ${color2});
  }\n`;
}

  // -------------------------
  // BACKGROUND IMAGE (SAFE)
  // chai-bg-img-hero
  // -------------------------
  match = cls.match(/^chai-bg-img-(\w+)$/);

  if (match) {
    const key = match[1];
    const url = bgImages[key];

    if (!url) return null;

    return `.${cls} {
      background-image: url("${url}");
    }\n`;
  }

  // -------------------------
  // BACKGROUND SIZE
  // -------------------------
  if (cls === "chai-bg-cover") {
  return `.chai-bg-cover { background-size: cover; }\n`;
}

  if (cls === "chai-bg-contain") {
    return `.chai-bg-contain { background-size: contain; }\n`;
  }

  // -------------------------
  // BACKGROUND POSITION (simple)
  // -------------------------
  match = cls.match(/^chai-bg-(center|top|bottom|left|right)$/);

  if (match) {
    return `.${cls} {
      background-position: ${match[1]};
    }\n`;
  }

  // -------------------------
  // BACKGROUND POSITION (advanced)
  // chai-bg-top-left
  // -------------------------
  match = cls.match(/^chai-bg-(top|bottom|center)-(left|right|center)$/);

  if (match) {
    return `.${cls} {
      background-position: ${match[1]} ${match[2]};
    }\n`;
  }

  // -------------------------
  // BACKGROUND REPEAT
  // -------------------------
  if (cls === "chai-bg-no-repeat") {
    return `.chai-bg-no-repeat { background-repeat: no-repeat; }\n`;
  }

  if (cls === "chai-bg-repeat") {
    return `.chai-bg-repeat { background-repeat: repeat; }\n`;
  }

  // -------------------------
  // BACKGROUND ATTACHMENT
  // -------------------------
  if (cls === "chai-bg-fixed") {
    return `.chai-bg-fixed { background-attachment: fixed; }\n`;
  }

  // -------------------------
  // BACKGROUND BLEND (optional)
  // -------------------------
  if (cls === "chai-bg-overlay") {
    return `.chai-bg-overlay { background-blend-mode: overlay; }\n`;
  }

  // -------------------------
  // SHORTCUT (VERY USEFUL)
  // chai-bg-full
  // -------------------------
  if (cls === "chai-bg-full") {
    return `.chai-bg-full {
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
    }\n`;
  }

  return null;
}