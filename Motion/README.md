# part 1

## 1 - starting point of the animation (animate prop & initial prop)

### tailwind class vs initial prop

- it depends on you what u want to use to define initial state i prefer using tailwind classs to define initial state nd animate prop for animations.

## 2 - Addinng a from state to the animation

### using !bg-black important mark in taiwlind with motion what will happen?

- inline stype always wins for any css selector esxpect !important so never use ! in your styles because it will break all the animations.

### tailwindcs

## 3 - Making the animation loop with keyFrames

```jsx
<motion.div
  className="bg-gray-400 w-24 h-24"
  animate={{
    scale: [1, 2, 2, 1, 1],
    rotate: [0, 0, 180, 180, 0],
    borderRadius: ["0%", "0%", "50%", "50%", "0%"],
  }}
  transition={{
    ease: "easeInOut",
    repeat: Infinity,
    repeatDelay: 1,
    duration: 2,
  }}
></motion.div>
```

### 4 - Adding interactivity (Hover, focus and tap -- making bouncy effect)

```jsx
<motion.button
  className="h-16 rounded-full px-8 bg-blue-600"
  whileHover={{
    scale: 2,
  }}
  whileFocus={{
    scale: 2.2,
  }}
  whileTap={{
    scale: 1.7,
  }}
  //onTap
  //onTapStart
  //onTapCancel={asyncFunction}
>
  Hover
</motion.button>
```
