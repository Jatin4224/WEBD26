# Beginner Tutorial: React + Tailwind + GSAP + SVG ClipPath + ScrollTrigger

This guide teaches you how to build the animation system in this project from the ground up.

You will learn:

- How the project is structured
- How React renders the sections
- How Tailwind styles the page
- How GSAP animates elements
- How ScrollTrigger connects animation to scroll
- How SVG `clipPath` creates organic image reveals
- How SVG path drawing works
- How pinned scroll scenes work

The final result is inspired by high-end portfolio sites like Yaroflasher: full-screen scenes, animated text, organic media masks, long SVG lines, and scroll-controlled motion.

---

## 1. What You Are Building

The page has six main animation ideas:

1. A large landing hero.
2. Multiple full-screen scroll sections.
3. Each section reveals text and an image using a GSAP timeline.
4. Images are clipped inside irregular SVG shapes.
5. A background SVG line draws as the user scrolls.
6. One section pins to the viewport and animates while the page continues scrolling.

The important mindset:

> Do not think of this as one giant animation. Think of it as many small timelines attached to page sections.

That is how professional sites usually stay manageable.

---

## 2. Project Setup

The project is a Vite React app.

Files:

```txt
react-gsap-clip-scrolltrigger/
  index.html
  package.json
  postcss.config.js
  tailwind.config.js
  src/
    main.jsx
    App.jsx
    styles.css
```

Run the project:

```bash
npm.cmd install
npm.cmd run dev
```

If PowerShell blocks `npm`, use `npm.cmd` instead of `npm`.

Build the project:

```bash
npm.cmd run build
```

---

## 3. Dependencies

Open `package.json`.

Important packages:

```json
{
  "react": "^19.0.0",
  "react-dom": "^19.0.0",
  "gsap": "^3.13.0",
  "tailwindcss": "^3.4.17",
  "vite": "^7.0.0"
}
```

What each one does:

- `react`: Builds the UI.
- `react-dom`: Mounts React into the browser.
- `gsap`: Handles animations.
- `tailwindcss`: Utility classes for styling.
- `vite`: Development server and build tool.

---

## 4. React Entry Point

Open `src/main.jsx`.

```jsx
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./styles.css";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
```

This file does three things:

1. Imports React.
2. Imports the main `App` component.
3. Renders `App` inside the `#root` element in `index.html`.

The real animation work happens in `App.jsx`.

---

## 5. Tailwind And Global CSS

Open `src/styles.css`.

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

These lines activate Tailwind.

Below that, the project adds small global styles:

```css
html {
  background: #08090b;
}

body {
  margin: 0;
  background: #08090b;
  color: #f5f0e8;
}
```

This gives the site a dark base.

There is also this class:

```css
.animated-path {
  stroke-dasharray: var(--path-length);
  stroke-dashoffset: var(--path-length);
}
```

This is used for SVG line drawing.

At first, the SVG path is fully hidden because its dash offset equals its full length. GSAP later animates `strokeDashoffset` to `0`, which makes the line appear to draw itself.

---

## 6. Importing GSAP

Open `src/App.jsx`.

At the top:

```jsx
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
```

What this means:

- `useRef`: Lets React give us access to a real DOM element.
- `useLayoutEffect`: Runs after React places elements on the page, before the browser paints the final layout.
- `gsap`: The animation library.
- `ScrollTrigger`: GSAP plugin that connects animations to scroll position.

You must register ScrollTrigger:

```js
gsap.registerPlugin(ScrollTrigger);
```

Without this, ScrollTrigger animations will not work.

---

## 7. Understanding The Slide Data

Near the top of `App.jsx`, there is a `slides` array:

```js
const slides = [
  {
    eyebrow: "01 / SVG mask",
    title: "Cinematic clips inside organic shapes",
    body: "The image is clipped by an SVG path...",
    image: "https://images.unsplash.com/...",
    color: "#ff4d2d",
    path: "M617.15,356.23c1.56...",
  },
];
```

Each slide has:

- `eyebrow`: Small label text.
- `title`: Big headline.
- `body`: Paragraph text.
- `image`: Image URL.
- `color`: Accent color.
- `path`: SVG path shape used for the image mask.

This is a clean React pattern.

Instead of writing every section manually, we store section content in data and render it with `.map()`.

---

## 8. Rendering Sections With React

Inside the `return`, this code renders each slide:

```jsx
{
  slides.map((slide, index) => (
    <section
      className={`panel ${index === 2 ? "pinned-scene" : ""} ...`}
      key={slide.title}
    >
      ...
    </section>
  ));
}
```

Beginner explanation:

- `slides.map(...)` loops over every slide object.
- For each slide, React returns one `<section>`.
- `index` is the slide number: `0`, `1`, `2`.
- If the index is `2`, we add the class `pinned-scene`.

This line:

```jsx
index === 2 ? "pinned-scene" : "";
```

means:

> If this is the third slide, make it pinned. Otherwise, add no extra class.

---

## 9. Tailwind Layout Classes

Example section:

```jsx
<section className="panel relative grid items-center gap-10 px-5 py-24 md:grid-cols-[0.9fr_1.1fr] md:px-10">
```

Important classes:

- `panel`: Custom class from `styles.css`. Gives the section `min-height: 100vh`.
- `relative`: Allows children to position themselves relative to the section.
- `grid`: Uses CSS Grid.
- `items-center`: Vertically centers grid items.
- `gap-10`: Adds space between columns.
- `px-5`: Horizontal padding on mobile.
- `py-24`: Vertical padding.
- `md:grid-cols-[0.9fr_1.1fr]`: On medium screens and up, use two columns.
- `md:px-10`: More horizontal padding on larger screens.

This creates a responsive layout:

- Mobile: text and image stack vertically.
- Desktop: text on the left, image on the right.

---

## 10. The SVG ClipPath Reveal

This is the most important visual trick.

Inside each section:

```jsx
<svg
  className="h-full w-full overflow-visible"
  viewBox="0 0 700 700"
  aria-hidden="true"
>
  <defs>
    <clipPath id={`clip-${index}`}>
      <path className="clip-mask" d={slide.path} />
    </clipPath>
  </defs>

  <path
    d={slide.path}
    fill="none"
    stroke={slide.color}
    strokeWidth="2"
    opacity="0.75"
  />

  <foreignObject width="700" height="700" clipPath={`url(#clip-${index})`}>
    <img
      className="panel-image h-full w-full object-cover"
      src={slide.image}
      alt=""
    />
  </foreignObject>
</svg>
```

Let us break this down.

### SVG ViewBox

```jsx
viewBox = "0 0 700 700";
```

This says:

> The SVG coordinate system is 700 units wide and 700 units tall.

The path data was designed for that same coordinate system.

### Defining A ClipPath

```jsx
<defs>
  <clipPath id={`clip-${index}`}>
    <path className="clip-mask" d={slide.path} />
  </clipPath>
</defs>
```

`<defs>` stores reusable SVG definitions.

`<clipPath>` defines a mask shape.

The path is the organic blob.

### Drawing The Outline

```jsx
<path
  d={slide.path}
  fill="none"
  stroke={slide.color}
  strokeWidth="2"
  opacity="0.75"
/>
```

This draws the same shape as a thin outline.

This is optional, but it helps the visual feel intentional.

### Putting An Image Inside The ClipPath

```jsx
<foreignObject width="700" height="700" clipPath={`url(#clip-${index})`}>
  <img
    className="panel-image h-full w-full object-cover"
    src={slide.image}
    alt=""
  />
</foreignObject>
```

`foreignObject` lets you place HTML inside SVG.

Here, we place an ordinary `<img>` inside the SVG, then clip it using the SVG path.

Result:

> The rectangular image becomes visible only inside the organic shape.

---

## 11. Why Each ClipPath ID Must Be Unique

This code uses:

```jsx
id={`clip-${index}`}
```

That creates:

```txt
clip-0
clip-1
clip-2
```

If all sections used the same ID, the browser could confuse the masks. Unique IDs keep each section independent.

---

## 12. The React Animation Container

At the top of `App`:

```jsx
const rootRef = useRef(null);
```

Then:

```jsx
<main ref={rootRef} className="page relative overflow-hidden bg-ink text-paper">
```

This gives GSAP a scoped root element.

Later:

```js
const ctx = gsap.context(() => {
  ...
}, rootRef);
```

`gsap.context` keeps animations scoped to this component.

This is important in React because React components can mount and unmount. When the component unmounts, this cleanup runs:

```js
return () => ctx.revert();
```

That removes GSAP animations and ScrollTriggers cleanly.

---

## 13. useLayoutEffect

The animation code is inside:

```js
useLayoutEffect(() => {
  ...
}, []);
```

Why not run GSAP directly in the component body?

Because React must first render the HTML. GSAP needs real DOM elements to animate.

`useLayoutEffect` waits until the DOM exists, then runs the animation setup.

The empty dependency array:

```js
[];
```

means:

> Run this setup once when the component mounts.

---

## 14. SVG Line Drawing

The background line is rendered by this component:

```jsx
function BackgroundLine() {
  return (
    <svg className="pointer-events-none fixed inset-0 z-0 h-screen w-full opacity-35">
      <g className="path-track">
        <path
          className="animated-path"
          d="M-80,520 C130,210 300,780..."
          fill="none"
          stroke="#f5f0e8"
          strokeWidth="1.4"
        />
      </g>
    </svg>
  );
}
```

Key classes:

- `fixed`: The SVG stays fixed behind the page.
- `inset-0`: Covers the full viewport.
- `z-0`: Places it behind content.
- `pointer-events-none`: It does not block clicks or scroll.

### Measuring The Path

In GSAP setup:

```js
const mainPath = document.querySelector(".animated-path");
const mainPathLength = mainPath.getTotalLength();
```

`getTotalLength()` returns the length of the SVG path.

Example:

```txt
Path length = 2900
```

Then:

```js
mainPath.style.setProperty("--path-length", mainPathLength);
```

This sets a CSS variable used in `styles.css`.

### Animating The Draw

```js
gsap.to(mainPath, {
  strokeDashoffset: 0,
  ease: "none",
  scrollTrigger: {
    trigger: ".page",
    start: "top top",
    end: "bottom bottom",
    scrub: 1,
  },
});
```

Meaning:

- Animate the path.
- Change `strokeDashoffset` to `0`.
- Start when the top of `.page` reaches the top of the viewport.
- End when the bottom of `.page` reaches the bottom of the viewport.
- `scrub: 1` makes animation follow scroll smoothly.

---

## 15. Moving The Background Line Horizontally

```js
gsap.to(".path-track", {
  xPercent: -45,
  ease: "none",
  scrollTrigger: {
    trigger: ".page",
    start: "top top",
    end: "bottom bottom",
    scrub: 1,
  },
});
```

This moves the `<g>` group containing the path.

`xPercent: -45` means:

> Move left by 45% of its own width.

Together with the stroke draw, it creates a flowing line effect.

---

## 16. Setting Initial Animation States

For each `.panel`, the code finds elements:

```js
const mask = panel.querySelector(".clip-mask");
const image = panel.querySelector(".panel-image");
const textItems = panel.querySelectorAll(".text-reveal");
const accent = panel.querySelector(".accent-line");
```

Then it sets initial states:

```js
gsap.set(mask, { scale: 0, transformOrigin: "50% 50%" });
gsap.set(image, { scale: 1.18, transformOrigin: "50% 50%" });
gsap.set(textItems, { autoAlpha: 0, y: 42 });
gsap.set(accent, { scaleX: 0, transformOrigin: "left center" });
```

Important GSAP terms:

- `gsap.set(...)`: Instantly applies styles. No animation.
- `scale: 0`: Make the SVG mask invisible.
- `scale: 1.18`: Image starts slightly zoomed in.
- `autoAlpha: 0`: Opacity 0 and visibility hidden.
- `y: 42`: Text starts 42 pixels lower.
- `scaleX: 0`: Accent line starts collapsed.

This prepares the scene before the animation plays.

---

## 17. Creating A Timeline For Each Section

The main section animation:

```js
gsap
  .timeline({
    scrollTrigger: {
      trigger: panel,
      start: "top 70%",
      end: "bottom 35%",
      toggleActions: "play reverse play reverse",
    },
  })
  .to(mask, {
    scale: 1,
    duration: 0.9,
    ease: "expo.out",
  })
  .to(
    image,
    {
      scale: 1,
      duration: 1.2,
      ease: "power3.out",
    },
    "<",
  )
  .to(
    accent,
    {
      scaleX: 1,
      duration: 0.5,
      ease: "power3.out",
    },
    "<0.15",
  )
  .to(
    textItems,
    {
      autoAlpha: 1,
      y: 0,
      duration: 0.75,
      stagger: 0.12,
      ease: "power3.out",
    },
    "<0.05",
  );
```

Think of a timeline as a movie sequence:

1. Reveal the blob mask.
2. Zoom the image out to normal size.
3. Expand the accent line.
4. Reveal the text.

### Timeline Position Syntax

This part:

```js
"<";
```

means:

> Start this animation at the same time as the previous one.

This:

```js
"<0.15";
```

means:

> Start 0.15 seconds after the previous animation starts.

This is how you create overlapping, polished motion.

---

## 18. Understanding ScrollTrigger Start And End

```js
scrollTrigger: {
  trigger: panel,
  start: "top 70%",
  end: "bottom 35%",
  toggleActions: "play reverse play reverse"
}
```

`trigger: panel`

The current section controls the animation.

`start: "top 70%"`

The animation starts when the top of the section reaches 70% down the viewport.

`end: "bottom 35%"`

The animation is considered ended when the bottom of the section reaches 35% down the viewport.

`toggleActions`

```txt
onEnter onLeave onEnterBack onLeaveBack
```

So:

```js
"play reverse play reverse";
```

means:

- Scrolling down into section: play.
- Scrolling down out of section: reverse.
- Scrolling back into section: play.
- Scrolling back above section: reverse.

---

## 19. Text Reveal Pattern

In JSX:

```jsx
<p className="text-reveal counter ...">
  {slide.eyebrow}
</p>

<h2 className="text-reveal ...">
  {slide.title}
</h2>

<p className="text-reveal ...">
  {slide.body}
</p>
```

Every text element that should animate gets:

```txt
text-reveal
```

Then GSAP collects all of them:

```js
const textItems = panel.querySelectorAll(".text-reveal");
```

And animates them together:

```js
gsap.to(textItems, {
  autoAlpha: 1,
  y: 0,
  stagger: 0.12,
});
```

`stagger: 0.12` means each item starts 0.12 seconds after the previous one.

This creates a smooth cascade.

---

## 20. Pinned Scroll Scene

The third section has the class `pinned-scene`.

```jsx
className={`panel ${index === 2 ? "pinned-scene" : ""} ...`}
```

Then GSAP finds pinned scenes:

```js
gsap.utils.toArray(".pinned-scene").forEach((panel) => {
  gsap
    .timeline({
      scrollTrigger: {
        trigger: panel,
        start: "top top",
        end: "+=75%",
        pin: true,
        scrub: 1,
      },
    })
    .to(panel.querySelector(".panel-media"), {
      rotate: 3,
      scale: 0.92,
      ease: "none",
    })
    .to(
      panel.querySelector(".counter"),
      {
        y: -28,
        autoAlpha: 0.35,
        ease: "none",
      },
      "<",
    );
});
```

Important part:

```js
pin: true;
```

This keeps the section fixed in place while the user continues scrolling.

`scrub: 1`

The animation follows the scroll.

`end: "+=75%"`

The pinned section lasts for 75% of the viewport height.

---

## 21. Difference Between Toggle And Scrub Animations

This project uses both.

### Toggle Animation

```js
toggleActions: "play reverse play reverse";
```

Good for:

- Revealing text
- Fading content
- Intro animations

It behaves like:

> When the section appears, play the animation.

### Scrub Animation

```js
scrub: 1;
```

Good for:

- Path drawing
- Pinned animations
- Parallax
- Progress-based motion

It behaves like:

> The animation progress is linked to the scroll progress.

---

## 22. How To Add A New Section

To add another scene, add another object to `slides`:

```js
{
  eyebrow: "04 / New scene",
  title: "Your new animated section",
  body: "Write your text here.",
  image: "https://images.unsplash.com/your-image",
  color: "#f5f0e8",
  path: "M617.15,356.23..."
}
```

React will automatically render it.

The GSAP loop will automatically animate it because it has the `.panel` class.

---

## 23. How To Replace The SVG Blob Shape

You need an SVG path.

You can create one in:

- Figma
- Illustrator
- SVG Path Editor
- Inkscape

The important thing:

> Use a path designed for the same viewBox size, or adjust the `viewBox`.

Current SVG:

```jsx
viewBox = "0 0 700 700";
```

So your path should fit inside `0..700` on both x and y axes.

---

## 24. How To Use A Video Instead Of An Image

Replace:

```jsx
<img
  className="panel-image h-full w-full object-cover"
  src={slide.image}
  alt=""
/>
```

With:

```jsx
<video
  className="panel-image h-full w-full object-cover"
  src="/your-video.mp4"
  muted
  autoPlay
  loop
  playsInline
/>
```

For mobile Safari, `muted` and `playsInline` are important.

---

## 25. How To Debug ScrollTrigger

Add `markers: true`:

```js
scrollTrigger: {
  trigger: panel,
  start: "top 70%",
  end: "bottom 35%",
  markers: true
}
```

This shows visual markers in the browser.

Use markers while learning, then remove them for production.

---

## 26. Common Beginner Mistakes

### Mistake 1: Forgetting To Register ScrollTrigger

Wrong:

```js
import { ScrollTrigger } from "gsap/ScrollTrigger";
```

Right:

```js
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
```

### Mistake 2: Animating Before The DOM Exists

Wrong:

```js
const el = document.querySelector(".panel");
gsap.to(el, { opacity: 1 });
```

Directly inside the component body, this can run too early.

Right:

```js
useLayoutEffect(() => {
  gsap.to(".panel", { opacity: 1 });
}, []);
```

### Mistake 3: Reusing ClipPath IDs

Wrong:

```jsx
<clipPath id="clip">
```

Right:

```jsx
<clipPath id={`clip-${index}`}>
```

### Mistake 4: Forgetting Initial States

If you do not set initial states:

```js
gsap.set(textItems, { autoAlpha: 0, y: 42 });
```

Your elements may flash on screen before animating.

### Mistake 5: Too Many Huge Animations

Do not animate everything at once.

Better:

> One timeline per section.

---

## 27. Practice Exercises

Try these in order.

### Exercise 1

Change the first slide title.

Find:

```js
title: "Cinematic clips inside organic shapes";
```

Replace it with your own text.

### Exercise 2

Change the first slide accent color.

```js
color: "#ff4d2d";
```

Try:

```js
color: "#00d5ff";
```

### Exercise 3

Make text reveal slower.

Find:

```js
duration: 0.75;
```

Try:

```js
duration: 1.2;
```

### Exercise 4

Make the image start more zoomed in.

Find:

```js
gsap.set(image, { scale: 1.18 });
```

Try:

```js
gsap.set(image, { scale: 1.35 });
```

### Exercise 5

Enable ScrollTrigger markers.

Add:

```js
markers: true;
```

inside one ScrollTrigger config.

### Exercise 6

Create a fourth section by adding a new object to the `slides` array.

---

## 28. Learning Path

Follow this order:

1. Learn basic React components.
2. Learn Tailwind utility classes.
3. Learn `gsap.to`, `gsap.from`, and `gsap.fromTo`.
4. Learn `gsap.timeline`.
5. Learn ScrollTrigger `start`, `end`, `scrub`, and `pin`.
6. Learn basic SVG paths.
7. Learn SVG `clipPath`.
8. Combine all of them into section-based animation scenes.

Do not try to master everything in one day. Build one small effect at a time.

---

## 29. Minimal GSAP Examples

### Fade In

```js
gsap.from(".box", {
  opacity: 0,
  y: 40,
  duration: 1,
});
```

### Timeline

```js
const tl = gsap.timeline();

tl.from(".title", { opacity: 0, y: 40 }).from(".image", {
  opacity: 0,
  scale: 0.9,
});
```

### ScrollTrigger

```js
gsap.from(".section-title", {
  opacity: 0,
  y: 50,
  scrollTrigger: {
    trigger: ".section-title",
    start: "top 80%",
  },
});
```

### Scrubbed ScrollTrigger

```js
gsap.to(".line", {
  x: 500,
  scrollTrigger: {
    trigger: ".section",
    start: "top top",
    end: "bottom top",
    scrub: true,
  },
});
```

### Pinned Section

```js
gsap.to(".panel-content", {
  scale: 0.8,
  scrollTrigger: {
    trigger: ".panel",
    start: "top top",
    end: "+=100%",
    scrub: true,
    pin: true,
  },
});
```

---

## 30. Final Mental Model

This project is built from five simple ideas:

1. React renders sections from data.
2. Tailwind handles layout and responsive styling.
3. SVG paths create custom shapes.
4. GSAP timelines animate each section.
5. ScrollTrigger decides when those timelines play.

Once you understand that, you can build many premium website animations.

Start small:

- First animate text.
- Then animate an image.
- Then clip the image with SVG.
- Then connect it to scroll.
- Then add pinned scenes.

That is the same path professionals follow, just with more polish and iteration.
