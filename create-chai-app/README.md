# Chai CSS 

A lightweight utility-first CSS engine inspired by Tailwind — but simpler, faster, and fully class-driven.

Create a project instantly and start writing CSS using intuitive class names.

---

##  Getting Started

Create a new app using:

```bash
npx create-chai-app my-app
```

Then navigate into your project:

```bash
cd my-app
```

Build the CSS:

```bash
npm run build
```

Now open:

```bash
template/index.html
```

You can start using Chai classes directly inside HTML.

---

##  Project Structure

```
my-app/
├── template/
│   ├── dist/          → Generated CSS output
│   ├── index.html     → Your main file
│   └── package.json
├── package.json
└── README.md
```

---

##  How It Works

You don’t write CSS manually.

You write **class names**, and Chai converts them into real CSS.

Example:

```html
<div class="chai-bg-blue-500 chai-text-white chai-p-20"></div>
```

Generated CSS:

```css
.chai-bg-blue-500 { background-color: #3b82f6; }
.chai-text-white { color: #ffffff; }
.chai-p-20 { padding: 20px; }
```

---

##  Quick Starter Example

Paste this inside `index.html`:

```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="./dist/output.css">
</head>
<body>

  <div class="
    chai-flex 
    chai-justify-center 
    chai-items-center 
    chai-h-screen 
    chai-bg-gradient-indigo-blue
  ">
    <div class="
      chai-bg-white 
      chai-p-20 
      chai-rounded-10 
      chai-shadow-md 
      chai-text-center
      chai-transition 
      chai-duration-300
      chai-hover-bg-blue-500
      chai-hover-text-white
      chai-cursor-pointer
    ">
      Hello Chai CSS
    </div>
  </div>

</body>
</html>
```

---

##  Core Concepts

### 1. Spacing

```html
chai-p-20     → padding: 20px
chai-mx-auto  → center horizontally
chai-px-10    → left + right padding
```

---

### 2. Colors

```html
chai-bg-red-500
chai-text-blue-300
chai-bc-gray-200
```

---

### 3. Flexbox

```html
chai-flex
chai-justify-between
chai-items-center
chai-gap-10
```

---

### 4. Size

```html
chai-w-200
chai-h-100
chai-w-full
chai-h-screen
```

---

### 5. Typography

```html
chai-fs-18
chai-fw-semibold
chai-text-center
chai-lh-24
```

---

### 6. Borders

```html
chai-border
chai-bw-2
chai-rounded-10
chai-rounded-full
```

---

### 7. Shadows

```html
chai-shadow-md
chai-shadow-0px-4px-10px-gray
```

---

### 8. Backgrounds

```html
chai-bg-gradient-indigo-blue
chai-bg-img-hero
chai-bg-cover
chai-bg-center
```

---

### 9. Hover Effects

```html
chai-hover-bg-blue-500
chai-hover-text-white
chai-hover-shadow-0px-4px-10px-black
```

---

### 10. Transitions

```html
chai-transition
chai-duration-300
chai-ease-in-out
```

---

### 11. Responsive Design

```html
chai-md-flex
chai-lg-gap-20
```

Applies styles only at specific screen sizes.

---

### 12. Interaction

```html
chai-cursor-pointer
chai-select-none
```

---

### 13. Layout

```html
chai-block
chai-hidden
chai-relative
chai-absolute
chai-overflow-hidden
```

---

##  Example: Card UI

```html
<div class="
  chai-w-300 
  chai-p-20 
  chai-bg-white 
  chai-rounded-10 
  chai-shadow-md 
  chai-transition 
  chai-hover-shadow-lg
">
  <h2 class="chai-fs-20 chai-fw-bold chai-mb-10">
    Card Title
  </h2>

  <p class="chai-fs-14 chai-lh-20 chai-text-gray-600">
    This is a simple card using Chai CSS utilities.
  </p>

  <button class="
    chai-mt-15 
    chai-p-10 
    chai-bg-blue-500 
    chai-text-white 
    chai-rounded-5 
    chai-hover-bg-blue-700
  ">
    Click Me
  </button>
</div>
```

---

##  Development Workflow

Every time you add new classes:

```bash
npm run build
```

This regenerates your CSS.

---

##  Mental Model

Instead of writing CSS like this:

```css
.card {
  padding: 20px;
  background: white;
  border-radius: 10px;
}
```

You write:

```html
<div class="chai-p-20 chai-bg-white chai-rounded-10"></div>
```

---

##  Why Chai CSS?

* No config needed
* No learning curve like Tailwind
* Direct, readable class names
* Fully customizable system
* Lightweight and fast

---

##  Advanced Usage

You can combine everything:

```html
<div class="
  chai-flex 
  chai-md-flex-col 
  chai-gap-20 
  chai-bg-gradient-to-right-blue-500-purple-500 
  chai-p-30 
  chai-rounded-15
">
</div>
```

---


