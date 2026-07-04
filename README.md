# ☕ chai-css

> Utility-first CSS engine with your own prefix. Zero runtime. Zero conflicts.

[![npm version](https://img.shields.io/npm/v/chai-css.svg?style=flat-square)](https://www.npmjs.com/package/chai-css)
[![npm downloads](https://img.shields.io/npm/dm/chai-css.svg?style=flat-square)](https://www.npmjs.com/package/chai-css)
[![license](https://img.shields.io/npm/l/chai-css.svg?style=flat-square)](./LICENSE)

Chai CSS is a build-time CSS utility engine that converts `chai-*` inline class names into real, optimized CSS. It works like Tailwind but lets you use **your own prefix** — so it's safe to drop into any existing codebase without conflicts.

---

## Table of Contents

- [Why Chai CSS](#why-chai-css)
- [Quick Start](#quick-start)
- [Installation](#installation)
- [CLI Usage](#cli-usage)
- [Configuration](#configuration)
- [Class Reference](#class-reference)
  - [Spacing](#spacing)
  - [Typography](#typography)
  - [Layout & Flexbox](#layout--flexbox)
  - [Sizing](#sizing)
  - [Colors & Backgrounds](#colors--backgrounds)
  - [Borders & Effects](#borders--effects)
  - [Hover & State Variants](#hover--state-variants)
  - [Responsive Variants](#responsive-variants)
- [Custom Prefix](#custom-prefix)
- [Extending Chai](#extending-chai)
- [How It Works](#how-it-works)
- [Comparison](#comparison)
- [Contributing](#contributing)
- [License](#license)

---

## Why Chai CSS

Most utility CSS frameworks assume they own the entire stylesheet. That breaks down fast in:

- **Legacy projects** where class names like `p-4` or `text-white` already mean something else
- **Design systems** where multiple libraries share the same HTML
- **Micro-frontends** where styles from different teams need to coexist safely

Chai solves this with a **prefixed engine**. Every utility class is namespaced — so `chai-p-4`, `myapp-p-4`, or `ui-p-4` will never collide with anything.

---

## Quick Start

```bash
npx create-chai-app my-app
cd my-app
npm run build
open template/index.html
```

That's it. Start writing `chai-*` classes in your HTML and run `npm run build` to generate your CSS.

---

## Installation

### Via scaffolding (recommended)

```bash
npx create-chai-app my-app
```

This creates a project with a working template, build script, and config file already set up.

### Manual install

```bash
npm install chai-css --save-dev
```

Or with yarn:

```bash
yarn add chai-css --dev
```

Or with pnpm:

```bash
pnpm add chai-css --save-dev
```

---

## CLI Usage

Chai ships with a CLI for scanning and building.

### Build

Scan your HTML/template files and generate a CSS output file:

```bash
npx chai build
```

Or using the shorthand defined in your `package.json`:

```bash
npm run build
```

### Watch mode

Rebuild automatically when files change:

```bash
npx chai watch
```

### Init

Generate a default `chai.config.js` in your project root:

```bash
npx chai init
```

### Full CLI options

```
Usage: chai [command] [options]

Commands:
  build       Scan source files and emit CSS output
  watch       Watch for changes and rebuild
  init        Create a default chai.config.js

Options:
  --config    Path to config file       [default: "chai.config.js"]
  --input     Glob of files to scan     [default: "**/*.html"]
  --output    Output CSS file path      [default: "dist/chai.css"]
  --prefix    Utility class prefix      [default: "chai"]
  --minify    Minify output CSS         [default: false]
  -v, --version  Show version number
  -h, --help     Show help
```

---

## Configuration

Create a `chai.config.js` at your project root:

```js
// chai.config.js
module.exports = {
  // Glob patterns for files to scan
  content: [
    './src/**/*.html',
    './templates/**/*.html',
    './pages/**/*.jsx',
  ],

  // Your custom prefix (default: "chai")
  prefix: 'chai',

  // Output file path
  output: './dist/chai.css',

  // Minify the generated CSS
  minify: false,

  // Extend or override the default theme
  theme: {
    colors: {
      brand: '#6A9E4F',
      'brand-dark': '#3E6B2B',
    },
    spacing: {
      '13': '52px',
      '15': '60px',
    },
    borderRadius: {
      '4xl': '2rem',
    },
  },

  // Add custom utility patterns
  extend: {
    utilities: {
      'text-balance': { 'text-wrap': 'balance' },
      'grid-auto-fit': { 'grid-template-columns': 'repeat(auto-fit, minmax(240px, 1fr))' },
    },
  },
};
```

---

## Class Reference

All classes follow the pattern: `{prefix}-{property}-{value}`

Default prefix is `chai`. Replace `chai-` with your own prefix if configured.

---

### Spacing

Spacing values use a `4px` base unit (`n * 4px`). So `chai-p-4` = `padding: 16px`.

| Class | CSS Output |
|---|---|
| `chai-p-{n}` | `padding: n*4px` |
| `chai-px-{n}` | `padding-left: n*4px; padding-right: n*4px` |
| `chai-py-{n}` | `padding-top: n*4px; padding-bottom: n*4px` |
| `chai-pt-{n}` | `padding-top: n*4px` |
| `chai-pr-{n}` | `padding-right: n*4px` |
| `chai-pb-{n}` | `padding-bottom: n*4px` |
| `chai-pl-{n}` | `padding-left: n*4px` |
| `chai-m-{n}` | `margin: n*4px` |
| `chai-mx-{n}` | `margin-left: n*4px; margin-right: n*4px` |
| `chai-my-{n}` | `margin-top: n*4px; margin-bottom: n*4px` |
| `chai-mt-{n}` | `margin-top: n*4px` |
| `chai-mr-{n}` | `margin-right: n*4px` |
| `chai-mb-{n}` | `margin-bottom: n*4px` |
| `chai-ml-{n}` | `margin-left: n*4px` |
| `chai-mx-auto` | `margin-left: auto; margin-right: auto` |
| `chai-gap-{n}` | `gap: n*4px` |
| `chai-gap-x-{n}` | `column-gap: n*4px` |
| `chai-gap-y-{n}` | `row-gap: n*4px` |
| `chai-space-x-{n}` | `margin-left: n*4px` on children |
| `chai-space-y-{n}` | `margin-top: n*4px` on children |

**Examples:**

```html
<div class="chai-p-6 chai-mx-auto chai-mt-8">
  Padded, centered, with top margin
</div>
```

---

### Typography

| Class | CSS Output |
|---|---|
| `chai-fs-{n}` | `font-size: npx` |
| `chai-text-xs` | `font-size: 12px` |
| `chai-text-sm` | `font-size: 14px` |
| `chai-text-base` | `font-size: 16px` |
| `chai-text-lg` | `font-size: 18px` |
| `chai-text-xl` | `font-size: 20px` |
| `chai-text-2xl` | `font-size: 24px` |
| `chai-text-3xl` | `font-size: 30px` |
| `chai-fw-thin` | `font-weight: 100` |
| `chai-fw-light` | `font-weight: 300` |
| `chai-fw-normal` | `font-weight: 400` |
| `chai-fw-medium` | `font-weight: 500` |
| `chai-fw-semibold` | `font-weight: 600` |
| `chai-fw-bold` | `font-weight: 700` |
| `chai-fw-extrabold` | `font-weight: 800` |
| `chai-fw-black` | `font-weight: 900` |
| `chai-lh-none` | `line-height: 1` |
| `chai-lh-tight` | `line-height: 1.25` |
| `chai-lh-snug` | `line-height: 1.375` |
| `chai-lh-normal` | `line-height: 1.5` |
| `chai-lh-relaxed` | `line-height: 1.625` |
| `chai-lh-loose` | `line-height: 2` |
| `chai-ls-tight` | `letter-spacing: -0.05em` |
| `chai-ls-normal` | `letter-spacing: 0` |
| `chai-ls-wide` | `letter-spacing: 0.05em` |
| `chai-ls-wider` | `letter-spacing: 0.1em` |
| `chai-ls-widest` | `letter-spacing: 0.2em` |
| `chai-ls-[value]` | `letter-spacing: value` (arbitrary) |
| `chai-text-left` | `text-align: left` |
| `chai-text-center` | `text-align: center` |
| `chai-text-right` | `text-align: right` |
| `chai-text-justify` | `text-align: justify` |
| `chai-italic` | `font-style: italic` |
| `chai-not-italic` | `font-style: normal` |
| `chai-underline` | `text-decoration: underline` |
| `chai-no-underline` | `text-decoration: none` |
| `chai-uppercase` | `text-transform: uppercase` |
| `chai-lowercase` | `text-transform: lowercase` |
| `chai-capitalize` | `text-transform: capitalize` |
| `chai-truncate` | `overflow: hidden; text-overflow: ellipsis; white-space: nowrap` |

---

### Layout & Flexbox

| Class | CSS Output |
|---|---|
| `chai-block` | `display: block` |
| `chai-inline` | `display: inline` |
| `chai-inline-block` | `display: inline-block` |
| `chai-flex` | `display: flex` |
| `chai-inline-flex` | `display: inline-flex` |
| `chai-grid` | `display: grid` |
| `chai-hidden` | `display: none` |
| `chai-flex-row` | `flex-direction: row` |
| `chai-flex-col` | `flex-direction: column` |
| `chai-flex-wrap` | `flex-wrap: wrap` |
| `chai-flex-nowrap` | `flex-wrap: nowrap` |
| `chai-flex-1` | `flex: 1 1 0%` |
| `chai-flex-auto` | `flex: 1 1 auto` |
| `chai-flex-none` | `flex: none` |
| `chai-flex-grow` | `flex-grow: 1` |
| `chai-flex-shrink` | `flex-shrink: 1` |
| `chai-justify-start` | `justify-content: flex-start` |
| `chai-justify-end` | `justify-content: flex-end` |
| `chai-justify-center` | `justify-content: center` |
| `chai-justify-between` | `justify-content: space-between` |
| `chai-justify-around` | `justify-content: space-around` |
| `chai-justify-evenly` | `justify-content: space-evenly` |
| `chai-items-start` | `align-items: flex-start` |
| `chai-items-end` | `align-items: flex-end` |
| `chai-items-center` | `align-items: center` |
| `chai-items-baseline` | `align-items: baseline` |
| `chai-items-stretch` | `align-items: stretch` |
| `chai-self-auto` | `align-self: auto` |
| `chai-self-start` | `align-self: flex-start` |
| `chai-self-end` | `align-self: flex-end` |
| `chai-self-center` | `align-self: center` |
| `chai-grid-cols-{n}` | `grid-template-columns: repeat(n, minmax(0, 1fr))` |
| `chai-grid-rows-{n}` | `grid-template-rows: repeat(n, minmax(0, 1fr))` |
| `chai-col-span-{n}` | `grid-column: span n / span n` |
| `chai-row-span-{n}` | `grid-row: span n / span n` |
| `chai-relative` | `position: relative` |
| `chai-absolute` | `position: absolute` |
| `chai-fixed` | `position: fixed` |
| `chai-sticky` | `position: sticky` |
| `chai-inset-0` | `top: 0; right: 0; bottom: 0; left: 0` |
| `chai-top-{n}` | `top: n*4px` |
| `chai-right-{n}` | `right: n*4px` |
| `chai-bottom-{n}` | `bottom: n*4px` |
| `chai-left-{n}` | `left: n*4px` |
| `chai-z-{n}` | `z-index: n` |

---

### Sizing

| Class | CSS Output |
|---|---|
| `chai-w-{n}` | `width: n*4px` |
| `chai-w-full` | `width: 100%` |
| `chai-w-screen` | `width: 100vw` |
| `chai-w-auto` | `width: auto` |
| `chai-max-w-{n}` | `max-width: n*4px` |
| `chai-max-w-full` | `max-width: 100%` |
| `chai-max-w-screen` | `max-width: 100vw` |
| `chai-min-w-{n}` | `min-width: n*4px` |
| `chai-h-{n}` | `height: n*4px` |
| `chai-h-full` | `height: 100%` |
| `chai-h-screen` | `height: 100vh` |
| `chai-min-h-{n}` | `min-height: n*4px` |
| `chai-min-h-screen` | `min-height: 100vh` |
| `chai-max-h-{n}` | `max-height: n*4px` |
| `chai-overflow-hidden` | `overflow: hidden` |
| `chai-overflow-auto` | `overflow: auto` |
| `chai-overflow-scroll` | `overflow: scroll` |
| `chai-overflow-visible` | `overflow: visible` |
| `chai-overflow-x-hidden` | `overflow-x: hidden` |
| `chai-overflow-y-auto` | `overflow-y: auto` |

---

### Colors & Backgrounds

Chai ships with a full color palette. Shades run from `50` to `950`.

**Available color names:** `slate`, `gray`, `zinc`, `neutral`, `stone`, `red`, `orange`, `amber`, `yellow`, `lime`, `green`, `emerald`, `teal`, `cyan`, `sky`, `blue`, `indigo`, `violet`, `purple`, `fuchsia`, `pink`, `rose`

| Class | CSS Output |
|---|---|
| `chai-text-{color}-{shade}` | `color: {hex}` |
| `chai-text-white` | `color: #ffffff` |
| `chai-text-black` | `color: #000000` |
| `chai-bg-{color}-{shade}` | `background-color: {hex}` |
| `chai-bg-white` | `background-color: #ffffff` |
| `chai-bg-transparent` | `background-color: transparent` |
| `chai-bg-gradient-to-t` | `background-image: linear-gradient(to top, ...)` |
| `chai-bg-gradient-to-r` | `background-image: linear-gradient(to right, ...)` |
| `chai-bg-gradient-to-b` | `background-image: linear-gradient(to bottom, ...)` |
| `chai-bg-gradient-to-l` | `background-image: linear-gradient(to left, ...)` |
| `chai-bg-gradient-to-tr` | `background-image: linear-gradient(to top right, ...)` |
| `chai-bg-gradient-to-br` | `background-image: linear-gradient(to bottom right, ...)` |
| `chai-from-{color}-{shade}` | Gradient start color |
| `chai-via-{color}-{shade}` | Gradient middle color |
| `chai-to-{color}-{shade}` | Gradient end color |
| `chai-opacity-{n}` | `opacity: n/100` |
| `chai-bc-{color}-{shade}` | `border-color: {hex}` |

**Example:**

```html
<div class="chai-bg-gradient-to-br chai-from-indigo-600 chai-to-purple-700 chai-text-white">
  Gradient card
</div>
```

---

### Borders & Effects

| Class | CSS Output |
|---|---|
| `chai-border` | `border-width: 1px` |
| `chai-border-{n}` | `border-width: npx` |
| `chai-border-t-{n}` | `border-top-width: npx` |
| `chai-border-b-{n}` | `border-bottom-width: npx` |
| `chai-border-solid` | `border-style: solid` |
| `chai-border-dashed` | `border-style: dashed` |
| `chai-border-dotted` | `border-style: dotted` |
| `chai-rounded` | `border-radius: 4px` |
| `chai-rounded-sm` | `border-radius: 2px` |
| `chai-rounded-md` | `border-radius: 6px` |
| `chai-rounded-lg` | `border-radius: 8px` |
| `chai-rounded-xl` | `border-radius: 12px` |
| `chai-rounded-2xl` | `border-radius: 16px` |
| `chai-rounded-3xl` | `border-radius: 24px` |
| `chai-rounded-full` | `border-radius: 9999px` |
| `chai-shadow-sm` | `box-shadow: 0 1px 2px rgba(0,0,0,0.05)` |
| `chai-shadow` | `box-shadow: 0 1px 3px rgba(0,0,0,0.1)` |
| `chai-shadow-md` | `box-shadow: 0 4px 6px rgba(0,0,0,0.1)` |
| `chai-shadow-lg` | `box-shadow: 0 10px 15px rgba(0,0,0,0.1)` |
| `chai-shadow-xl` | `box-shadow: 0 20px 25px rgba(0,0,0,0.1)` |
| `chai-shadow-2xl` | `box-shadow: 0 25px 50px rgba(0,0,0,0.25)` |
| `chai-shadow-none` | `box-shadow: none` |
| `chai-ring-{n}` | `outline: npx solid` |
| `chai-ring-{color}-{shade}` | `outline-color: {hex}` |
| `chai-transition` | `transition: all 150ms ease` |
| `chai-transition-colors` | `transition: color, background-color, border-color 150ms ease` |
| `chai-transition-transform` | `transition: transform 150ms ease` |
| `chai-duration-{n}` | `transition-duration: nms` |
| `chai-ease-in` | `transition-timing-function: ease-in` |
| `chai-ease-out` | `transition-timing-function: ease-out` |
| `chai-ease-in-out` | `transition-timing-function: ease-in-out` |
| `chai-cursor-pointer` | `cursor: pointer` |
| `chai-cursor-default` | `cursor: default` |
| `chai-cursor-not-allowed` | `cursor: not-allowed` |
| `chai-select-none` | `user-select: none` |
| `chai-pointer-events-none` | `pointer-events: none` |

---

### Hover & State Variants

Prefix any utility with `chai-hover-` to apply it on `:hover`.

| Class | Effect |
|---|---|
| `chai-hover-bg-{color}-{shade}` | Background on hover |
| `chai-hover-text-{color}-{shade}` | Text color on hover |
| `chai-hover-shadow-{size}` | Box shadow on hover |
| `chai-hover-scale-{n}` | `transform: scale(n/100)` on hover |
| `chai-hover-translate-y-{n}` | `transform: translateY(n*4px)` on hover |
| `chai-hover-opacity-{n}` | Opacity on hover |
| `chai-hover-ring-{n}` | Outline ring on hover |
| `chai-hover-underline` | Text underline on hover |
| `chai-focus-ring-{n}` | Outline ring on focus |
| `chai-focus-outline-none` | `outline: none` on focus |
| `chai-active-scale-{n}` | Scale on active/press |
| `chai-disabled-opacity-{n}` | Opacity when disabled |

**Example:**

```html
<button class="
  chai-px-6 chai-py-3
  chai-bg-blue-600 chai-text-white chai-rounded-lg
  chai-transition chai-duration-200
  chai-hover-bg-blue-700 chai-hover-shadow-lg chai-hover-scale-105
  chai-active-scale-95
  chai-focus-ring-2 chai-focus-outline-none
">
  Click me
</button>
```

---

### Responsive Variants

Prefix any utility with a breakpoint to apply it conditionally.

| Prefix | Breakpoint |
|---|---|
| `chai-sm-{utility}` | `@media (min-width: 640px)` |
| `chai-md-{utility}` | `@media (min-width: 768px)` |
| `chai-lg-{utility}` | `@media (min-width: 1024px)` |
| `chai-xl-{utility}` | `@media (min-width: 1280px)` |
| `chai-2xl-{utility}` | `@media (min-width: 1536px)` |

Breakpoints can be combined with hover variants:

```html
<!-- Stack on mobile, row on md and above -->
<div class="chai-flex chai-flex-col chai-md-flex-row chai-gap-4">
  ...
</div>

<!-- Different background per breakpoint -->
<div class="chai-bg-gray-100 chai-md-bg-indigo-100 chai-lg-bg-purple-100">
  ...
</div>
```

---

## Custom Prefix

Change the prefix in `chai.config.js` to use any namespace you like:

```js
// chai.config.js
module.exports = {
  prefix: 'ui',  // now all classes are ui-p-4, ui-flex, etc.
  content: ['./src/**/*.html'],
  output: './dist/ui.css',
};
```

```html
<!-- With prefix: "ui" -->
<div class="ui-p-8 ui-bg-blue-600 ui-rounded-xl ui-text-white">
  Hello
</div>
```

This makes Chai safe to use alongside Bootstrap, Tailwind, or any legacy CSS — no class name will ever conflict.

---

## Extending Chai

### Custom colors

```js
module.exports = {
  theme: {
    colors: {
      brand: '#6A9E4F',
      'brand-light': '#EBF4E4',
      'brand-dark': '#3E6B2B',
    },
  },
};
```

Usage: `chai-bg-brand`, `chai-text-brand-dark`

### Custom spacing scale

```js
module.exports = {
  theme: {
    spacing: {
      '13': '52px',
      '15': '60px',
      '18': '72px',
      '72': '288px',
      '84': '336px',
      '96': '384px',
    },
  },
};
```

### Custom utilities

Define arbitrary CSS utilities that get emitted as-is:

```js
module.exports = {
  extend: {
    utilities: {
      'text-balance':    { 'text-wrap': 'balance' },
      'scroll-smooth':   { 'scroll-behavior': 'smooth' },
      'grid-auto-fit':   { 'grid-template-columns': 'repeat(auto-fit, minmax(240px, 1fr))' },
      'glass':           { 'backdrop-filter': 'blur(12px)', 'background': 'rgba(255,255,255,0.15)' },
    },
  },
};
```

Usage: `chai-text-balance`, `chai-glass`

---

## How It Works

Chai's engine runs entirely at **build time** — there is no JavaScript in the browser.

```
your HTML files
      │
      ▼
  [chai scan]          ← finds every chai-* class
      │
      ▼
  [resolver]           ← maps class → CSS declaration
      │
      ▼
  [deduplication]      ← removes duplicates
      │
      ▼
  [media grouping]     ← groups responsive variants
      │
      ▼
  dist/chai.css        ← single optimized output file
```

The output is a plain static CSS file. Link it in your HTML:

```html
<link rel="stylesheet" href="./dist/chai.css" />
```

No PostCSS. No Babel. No runtime. Works in any HTML, PHP, Rails, Django, static site — anything that can link a stylesheet.

---

## Comparison

| Feature | Chai CSS | Tailwind CSS | Bootstrap |
|---|---|---|---|
| Custom prefix | ✅ Built-in | ❌ Not supported | ❌ Not supported |
| Build-time output | ✅ Yes | ✅ Yes (JIT) | ⚠️ Partial |
| Zero runtime | ✅ Yes | ✅ Yes | ✅ Yes |
| Conflict-safe | ✅ Fully isolated | ❌ Can conflict | ❌ Can conflict |
| Utility-first | ✅ Yes | ✅ Yes | ⚠️ Component-first |
| One-command scaffold | ✅ create-chai-app | ⚠️ Manual | ⚠️ Manual |
| Config required | ❌ Optional | ⚠️ Recommended | ❌ Not needed |
| Custom design tokens | ✅ Yes | ✅ Yes | ⚠️ Limited |

---

## Contributing

Contributions are welcome! Please open an issue before submitting a large PR.

```bash
# Clone the repo
git clone https://github.com/your-org/chai-css.git
cd chai-css

# Install dependencies
npm install

# Run tests
npm test

# Build the CLI
npm run build
```

Please follow the existing code style and add tests for any new utility classes or config options.

---

## License

MIT © chai-css contributors

---

> Built with 🍵 — utility-first CSS, your way.
