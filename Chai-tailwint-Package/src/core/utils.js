export function hexToRgba(hex, alpha = 1) {
  hex = hex.replace("#", "");
  if (hex.length === 3) {
    hex = hex.split("").map(c => c + c).join("");
  }
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

// General escape (for colors, text, etc.)
export function escapeClass(cls) {
  const raw = cls.replace(/\\([[\]#\/.:%])/g, "$1");
  return raw.replace(/([[\]#\/.:%])/g, "\\$1");
}

export function escapeClass2(cls) {
  const raw = cls.replace(/\\([[\]#()/:.%])/g, "$1");

  return raw.replace(/([[\]#()/:.%])/g, "\\$1");
}

export function escapeClassName(cls) {
  return cls.replace(/([^a-zA-Z0-9_-])/g, "\\$1");
}