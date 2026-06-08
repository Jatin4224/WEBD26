# React Tailwind GSAP SVG ClipPath ScrollTrigger

Complete starter for Yaroflasher-style scroll scenes:

- React components
- Tailwind styling
- GSAP timelines
- ScrollTrigger
- SVG `clipPath` image reveals
- SVG path drawing with `strokeDasharray` / `strokeDashoffset`
- Pinned scroll section

## Run

```bash
npm install
npm run dev
```

Then open the local Vite URL.

## Main Files

- `src/App.jsx`: all animation logic and markup
- `src/styles.css`: Tailwind imports and small global animation helpers
- `tailwind.config.js`: Tailwind setup

## Where The Animation Happens

### ScrollTrigger setup

```js
gsap.registerPlugin(ScrollTrigger);
```

### SVG line draw

```js
const mainPathLength = mainPath.getTotalLength();

mainPath.style.setProperty("--path-length", mainPathLength);

gsap.to(mainPath, {
  strokeDashoffset: 0,
  ease: "none",
  scrollTrigger: {
    trigger: ".page",
    start: "top top",
    end: "bottom bottom",
    scrub: 1
  }
});
```

### SVG clipPath reveal

```jsx
<clipPath id={`clip-${index}`}>
  <path className="clip-mask" d={slide.path} />
</clipPath>

<foreignObject width="700" height="700" clipPath={`url(#clip-${index})`}>
  <img className="panel-image h-full w-full object-cover" src={slide.image} alt="" />
</foreignObject>
```

### Section timeline

```js
gsap.timeline({
  scrollTrigger: {
    trigger: panel,
    start: "top 70%",
    end: "bottom 35%",
    toggleActions: "play reverse play reverse"
  }
})
  .to(mask, { scale: 1, duration: 0.9, ease: "expo.out" })
  .to(image, { scale: 1, duration: 1.2, ease: "power3.out" }, "<")
  .to(textItems, {
    autoAlpha: 1,
    y: 0,
    duration: 0.75,
    stagger: 0.12,
    ease: "power3.out"
  }, "<0.05");
```
