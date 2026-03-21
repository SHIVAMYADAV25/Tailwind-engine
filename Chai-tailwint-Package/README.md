##  Chai Color Plugin

This plugin lets you apply **colors using utility classes**, just like Tailwind.

Instead of writing CSS manually, you just use class names like:

```
chai-bg-red-500
chai-text-blue-300
chai-bc-green-700
```

---

##  How It Works

Each class follows this structure:

```
chai-[type]-[color]-[shade]/[opacity]
```

###  1. Type (What you want to color)

| Type | CSS Property     |
| ---- | ---------------- |
| bg   | background-color |
| text | color            |
| bc   | border-color     |

---

###  2. Color & Shade

Colors come from your `colors.js` file.

Example:

```
chai-bg-red-500
```

 Converts to:

```css
.chai-bg-red-500 {
  background-color: #ef4444;
}
```

---

###  3. Opacity (Optional)

You can add opacity using `/value`

Example:

```
chai-bg-red-500/50
```

 Converts to:

```css
.chai-bg-red-500\/50 {
  background-color: rgba(239, 68, 68, 0.5);
}
```

---

###  4. Dark Mode Support 

Add `dark-` prefix to apply styles only in dark mode.

Example:

```
chai-dark-bg-gray-900
```

Converts to:

```css
.dark .chai-dark-bg-gray-900 {
  background-color: #111827;
}
```

---

##  Real Usage Example

### HTML

```html
<div class="chai-bg-blue-500 chai-text-white chai-bc-blue-700">
  Hello World
</div>
```

### Generated CSS

```css
.chai-bg-blue-500 {
  background-color: #3b82f6;
}

.chai-text-white {
  color: #ffffff;
}

.chai-bc-blue-700 {
  border-color: #1d4ed8;
}
```

---

##  Combined Example (with opacity + dark)

### HTML

```html
<div class="chai-bg-red-500/50 chai-dark-bg-gray-900">
  Card
</div>
```

### CSS Output

```css
.chai-bg-red-500\/50 {
  background-color: rgba(239, 68, 68, 0.5);
}

.dark .chai-dark-bg-gray-900 {
  background-color: #111827;
}
```

---

##  Summary (Super Simple)

* `bg` → background color
* `text` → text color
* `bc` → border color
* `/50` → opacity
* `dark-` → only in dark mode

---

# Chai Background Plugin (Simple Guide)

This plugin gives you **ready-to-use background utilities**, just like Tailwind—but simpler.

You control everything using class names like:

```html
<div class="chai-bg-gradient-indigo-blue chai-bg-cover chai-bg-center"></div>
```

---

# 1. Gradient Backgrounds

## Preset Gradients

Use predefined modern gradients:

```html
<div class="chai-bg-gradient-indigo-blue"></div>
```

### CSS Output

```css
.chai-bg-gradient-indigo-blue {
  background: linear-gradient(135deg, #4f46e5, #06b6d4);
}
```

---

## Available Presets

* `chai-bg-gradient-indigo-blue`
* `chai-bg-gradient-dark-indigo`
* `chai-bg-gradient-purple-pink`
* `chai-bg-gradient-blue-cyan`
* `chai-bg-gradient-indigo-purple`
* `chai-bg-gradient-green-teal`
* `chai-bg-gradient-orange-pink`

---

## Custom Gradient (Dynamic)

You can create your own gradients:

```html
<div class="chai-bg-gradient-red-500-blue-500"></div>
```

### CSS Output

```css
.chai-bg-gradient-red-500-blue-500 {
  background: linear-gradient(135deg, #ef4444, #3b82f6);
}
```

---

## 🔹 Direction Control

```html
<div class="chai-bg-gradient-to-right-red-500-blue-500"></div>
```

### CSS Output

```css
.chai-bg-gradient-to-right-red-500-blue-500 {
  background: linear-gradient(to right, #ef4444, #3b82f6);
}
```

---

# 2. Background Images

##  Safe Image System
```html
<div class="chai-bg-img-hero"></div>
```

### CSS Output

```css
.chai-bg-img-hero {
  background-image: url("https://images.unsplash.com/photo-1507525428034-b723cf961d3e");
}
```

---

##  Available Images

* `chai-bg-img-hero`
* `chai-bg-img-night`
* `chai-bg-img-gradient`

---

#  3. Background Size

```html
<div class="chai-bg-cover"></div>
```

### CSS

```css
background-size: cover;
```

```html
<div class="chai-bg-contain"></div>
```

### CSS

```css
background-size: contain;
```

---

#  4. Background Position

##  Simple

```html
chai-bg-center
chai-bg-top
chai-bg-bottom
chai-bg-left
chai-bg-right
```

### CSS

```css
background-position: center;
```

---

##  Advanced

```html
chai-bg-top-left
chai-bg-bottom-right
```

### CSS

```css
background-position: top left;
```

---

#  5. Background Repeat

```html
chai-bg-no-repeat
```

```css
background-repeat: no-repeat;
```

```html
chai-bg-repeat
```

```css
background-repeat: repeat;
```

---

#  6. Background Attachment

```html
chai-bg-fixed
```

```css
background-attachment: fixed;
```

---

#  7. Background Overlay (Blend)

```html
chai-bg-overlay
```

```css
background-blend-mode: overlay;
```

---

#  8. Shortcut Utility (Most Useful)

##  Full Background Setup

```html
<div class="chai-bg-full"></div>
```

### CSS

```css
background-size: cover;
background-position: center;
background-repeat: no-repeat;
```

---

# Super Simple Summary

* `chai-bg-gradient-*` → gradients
* `chai-bg-img-*` → images
* `chai-bg-cover` → full fit
* `chai-bg-center` → position
* `chai-bg-no-repeat` → clean background
* `chai-bg-full` → everything in one

---

---

## Responsive Utilities

This plugin allows you to apply any utility class at specific screen sizes using breakpoints.

### Breakpoints

| Prefix | Min Width |
| ------ | --------- |
| sm     | 640px     |
| md     | 768px     |
| lg     | 1024px    |
| xl     | 1280px    |

---

### Usage

```html
<div class="chai-md-flex chai-lg-gap-20"></div>
```

### Generated CSS

```css
@media (min-width: 768px) {
  .chai-flex {
    display: flex;
  }
}

@media (min-width: 1024px) {
  .chai-gap-20 {
    gap: 20px;
  }
}
```

---

## Border Utilities

This plugin controls borders, width, color, and radius.

### Basic Border

```html
<div class="chai-border"></div>
```

```css
border-width: 1px;
border-style: solid;
border-color: #e5e7eb;
```

---

### Border Width

```html
chai-bw-2
```

```css
border-width: 2px;
border-style: solid;
```

---

### Border Sides

```html
chai-border-t
chai-border-b
chai-border-l
chai-border-r
```

```css
border-top-width: 1px;
```

---

### Border Color

```html
chai-bc-red-500
```

```css
border-color: #ef4444;
```

---

### Border Radius

```html
chai-rounded-10
```

```css
border-radius: 10px;
```

```html
chai-rounded-full
```

```css
border-radius: 9999px;
```

---

## Flexbox Utilities

This plugin gives full control over flex layouts.

### Enable Flex

```html
chai-flex
```

```css
display: flex;
```

---

### Direction

```html
chai-flex-row
chai-flex-col
```

```css
flex-direction: row;
flex-direction: column;
```

---

### Justify Content

```html
chai-justify-center
chai-justify-between
chai-justify-around
chai-justify-evenly
chai-justify-start
chai-justify-end
```

```css
justify-content: space-between;
```

---

### Align Items

```html
chai-items-center
chai-items-start
chai-items-end
chai-items-stretch
chai-items-baseline
```

```css
align-items: center;
```

---

### Gap

```html
chai-gap-20
chai-gap-x-10
chai-gap-y-5
```

```css
gap: 20px;
column-gap: 10px;
row-gap: 5px;
```

---

### Flex Behavior

```html
chai-flex-1
```

```css
flex: 1;
```

```html
chai-flex-grow
```

```css
flex-grow: 1;
```

```html
chai-flex-none
```

```css
flex: none;
```

```html
chai-flex-wrap
```

```css
flex-wrap: wrap;
```

---

## Hover Utilities

This plugin applies styles only on hover.

### Background Color on Hover

```html
chai-hover-bg-red-500
```

```css
.chai-hover-bg-red-500:hover {
  background-color: #ef4444;
}
```

---

### Background with Opacity

```html
chai-hover-bg-red-500/50
```

```css
background-color: rgba(239, 68, 68, 0.5);
```

---

### Text Color on Hover

```html
chai-hover-text-blue-500
```

```css
color: #3b82f6;
```

---

### Shadow on Hover

```html
chai-hover-shadow-0px-4px-10px-black
```

```css
box-shadow: 0px 4px 10px #000000;
```

---

## Interaction Utilities

These utilities control how users interact with elements.

### Cursor

```html
chai-cursor-pointer
```

```css
cursor: pointer;
```

Used for clickable elements like buttons, cards, and links.

---

### Disable Text Selection

```html
chai-select-none
```

```css
user-select: none;
```

Prevents users from selecting text (useful for buttons, UI controls).

---

## Hover Utilities

These apply styles only when the user hovers over an element.

### Background Color on Hover

```html
chai-hover-bg-red-500
```

```css
.chai-hover-bg-red-500:hover {
  background-color: #ef4444;
}
```

---

### Background with Opacity

```html
chai-hover-bg-red-500/50
```

```css
background-color: rgba(239, 68, 68, 0.5);
```

---

### Text Color on Hover

```html
chai-hover-text-blue-500
```

```css
color: #3b82f6;
```

---

### Shadow on Hover

```html
chai-hover-shadow-0px-4px-10px-black
```

```css
box-shadow: 0px 4px 10px #000000;
```

---

## Layout Utilities

These utilities control structure, positioning, and visibility.

---

### Display

```html
chai-block
chai-inline
chai-inline-block
chai-inline-flex
chai-hidden
```

```css
display: block;
display: inline;
display: inline-block;
display: inline-flex;
display: none;
```

---

### Position

```html
chai-relative
chai-absolute
chai-fixed
chai-sticky
```

```css
position: relative;
position: absolute;
position: fixed;
position: sticky;
top: 0;
```

---

### Text Alignment

```html
chai-text-center
chai-text-left
chai-text-right
```

```css
text-align: center;
text-align: left;
text-align: right;
```

---

### Overflow

```html
chai-overflow-hidden
chai-overflow-auto
```

```css
overflow: hidden;
overflow: auto;
```

---

### Visibility

```html
chai-visible
chai-invisible
```

```css
visibility: visible;
visibility: hidden;
```

---


---

## Shadow Utilities

This plugin allows you to add shadows using simple class names.

---

### Custom Shadow

You can define a shadow using this format:

```html
chai-shadow-[x]-[y]-[blur]-[color]
```

Example:

```html
<div class="chai-shadow-0px-4px-10px-gray"></div>
```

### CSS Output

```css
.chai-shadow-0px-4px-10px-gray {
  box-shadow: 0px 4px 10px #6b7280;
}
```

If the color exists in your color system, it automatically uses the **500 shade**.

---

### Preset Shadows

For quick usage, you can use predefined sizes:

```html
chai-shadow-sm
chai-shadow-md
chai-shadow-lg
```

### CSS Output

```css
.chai-shadow-sm {
  box-shadow: 0 1px 2px rgba(0,0,0,0.1);
}

.chai-shadow-md {
  box-shadow: 0 4px 10px rgba(0,0,0,0.15);
}

.chai-shadow-lg {
  box-shadow: 0 10px 20px rgba(0,0,0,0.2);
}
```

---

## Size Utilities

This plugin controls width and height using simple class patterns.

---

### Fixed Size (px)

```html
chai-w-200
chai-h-100
```

### CSS

```css
width: 200px;
height: 100px;
```

---

### Percentage Size

Add `p` at the end:

```html
chai-w-50p
chai-h-100p
```

### CSS

```css
width: 50%;
height: 100%;
```

---

### Preset Sizes

```html
chai-w-full
chai-h-full
```

```css
width: 100%;
height: 100%;
```

---

```html
chai-w-screen
chai-h-screen
```

```css
width: 100vw;
height: 100vh;
```

---

```html
chai-w-auto
chai-h-fit
chai-w-max
```

```css
width: auto;
height: fit-content;
width: max-content;
```

---

### Min / Max Size

```html
chai-min-w-200
chai-max-h-500
```

### CSS

```css
min-width: 200px;
max-height: 500px;
```

---

## Final Understanding

With these utilities, you now control:

* **Depth** → shadows
* **Dimensions** → width & height
* **Scaling** → min/max constraints

Example:

```html
<div class="
  chai-w-300 
  chai-h-200 
  chai-shadow-md 
  chai-rounded-10 
  chai-bg-white
">
  Card
</div>
```

---

## Spacing Utilities

This plugin controls **padding and margin** using simple class names.

---

### Basic Spacing

```html
chai-p-20
chai-m-10
```

### CSS

```css
padding: 20px;
margin: 10px;
```

---

### Directional Spacing

```html
chai-pt-10   /* padding-top */
chai-mb-20   /* margin-bottom */
chai-pl-15   /* padding-left */
chai-mr-5    /* margin-right */
```

### CSS

```css
padding-top: 10px;
margin-bottom: 20px;
padding-left: 15px;
margin-right: 5px;
```

---

### Axis-Based Spacing

```html
chai-px-20
chai-py-10
chai-mx-30
chai-my-5
```

### CSS

```css
padding-left: 20px;
padding-right: 20px;

padding-top: 10px;
padding-bottom: 10px;

margin-left: 30px;
margin-right: 30px;

margin-top: 5px;
margin-bottom: 5px;
```

---

### Auto Margin (Centering)

```html
chai-mx-auto
```

### CSS

```css
margin-left: auto;
margin-right: auto;
```

Commonly used to **center containers horizontally**.

---

## Transition Utilities

This plugin controls animations and smooth effects.

---

### Enable Transition

```html
chai-transition
```

### CSS

```css
transition: all 0.2s ease;
```

This adds smooth animation to all changes (hover, resize, etc.).

---

### Duration

```html
chai-duration-300
```

### CSS

```css
transition-duration: 300ms;
```

---

### Timing Function (Easing)

```html
chai-ease-in
chai-ease-out
chai-ease-in-out
```

### CSS

```css
transition-timing-function: ease-in;
transition-timing-function: ease-out;
transition-timing-function: ease-in-out;
```

---

## Practical Example

```html
<div class="
  chai-p-20
  chai-mx-auto
  chai-w-300
  chai-bg-blue-500
  chai-transition
  chai-duration-300
  chai-ease-in-out
  chai-hover-bg-blue-700
">
  Button
</div>
```

This defines:

* spacing (padding + centering)
* size (width)
* color (background)
* animation (smooth hover transition)

---

## Final Mental Model

* `p` → padding
* `m` → margin
* `x / y` → horizontal / vertical
* `t b l r` → direction
* `transition` → enable animation
* `duration-*` → speed
* `ease-*` → animation style

---

## Typography Utilities

This plugin controls **font size, weight, alignment, and text spacing**.

---

### Font Size

```html
chai-fs-16
chai-fs-24
```

### CSS

```css
font-size: 16px;
font-size: 24px;
```

You directly define the size in pixels.

---

### Font Weight

```html
chai-fw-light
chai-fw-normal
chai-fw-medium
chai-fw-semibold
chai-fw-bold
chai-fw-extrabold
```

### CSS

```css
font-weight: 300;
font-weight: 400;
font-weight: 500;
font-weight: 600;
font-weight: 700;
font-weight: 800;
```

---

### Text Alignment

```html
chai-text-left
chai-text-center
chai-text-right
chai-text-justify
```

### CSS

```css
text-align: left;
text-align: center;
text-align: right;
text-align: justify;
```

---

### Line Height

```html
chai-lh-24
```

### CSS

```css
line-height: 24px;
```

Controls spacing between lines of text.

---

### Letter Spacing

```html
chai-ls-2
```

### CSS

```css
letter-spacing: 2px;
```

Controls spacing between characters.

---

## Practical Example

```html
<div class="
  chai-fs-18
  chai-fw-semibold
  chai-lh-28
  chai-ls-1
  chai-text-center
">
  Clean Typography System
</div>
```

This defines:

* size → readable text
* weight → emphasis
* line height → spacing between lines
* letter spacing → readability
* alignment → layout

---

## Final Mental Model

* `fs-*` → font size
* `fw-*` → font weight
* `text-*` → alignment
* `lh-*` → line height
* `ls-*` → letter spacing

---