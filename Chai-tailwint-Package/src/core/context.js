export const context = {
  plugins: []
};

export function registerPlugin(plugin) {
  if (typeof plugin !== "function") {
    console.warn("Invalid plugin:", plugin);
    return;
  }
  context.plugins.push(plugin);
}