import { context } from "./context.js";

export function generateCSS(className) {
  if (!className || !className.startsWith("chai-")) {
    return "";
  }

  for (const plugin of context.plugins) {
    try {
      const result = plugin(className);
      if (result && typeof result === "string" && result.trim()) {
        return result;
      }
    } catch (err) {
      console.error(`Plugin error for class "${className}":`, err.message);
    }
  }

  // Optional: log unknown classes during development
  // console.warn(`No plugin matched: ${className}`);

  return "";
}