# part 1 - First steps

## 1 - starting point of the animation (animate prop & initial prop)

### tailwind class vs initial prop

- it depends on you what u want to use to define initial state i prefer using tailwind classs to define initial state nd animate prop for animations.

## 2 - Addinng a from state to the animation

### using !bg-black important mark in taiwlind with motion what will happen?

- inline stype always wins for any css selector esxpect !important so never use ! in your styles because it will break all the animations.

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

## 4 - Adding interactivity (Hover, focus and tap -- making bouncy effect)

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

# par 2 - Motion values

## 1 - The core of motion

### useMotionValue hook - used to create our own custom motion values

- important note:- when creating own custom motion value. motion expects u to use style property instead of animate and initial property.

- set and get function can be used to manipulate the value

```jsx
import { motion, useMotionValue } from "motion/react";

const App = () => {
  const scale = useMotionValue(2);
  //scale.set scale.get
  return (
    <div className="flex items-center justify-center min-h-screen text-white ">
      <motion.div
        className="rounded-full w-32 h-12 bg-blue-500"
        style={{
          scale,
        }}
      ></motion.div>
    </div>
  );
};

export default App;
```

## 2 - Make it bounce

### useSpring hook

```jsx
import { motion, useSpring } from "motion/react";
import { useEffect } from "react";

const App = () => {
  const scale = useSpring(10, {
    stiffness: 200,
    mass: 1,
  });

  useEffect(() => {
    scale.set(1); // 🔥 THIS triggers animation
  });

  return (
    <div className="flex items-center justify-center min-h-screen">
      <motion.div
        className="rounded-full w-32 h-12 bg-blue-500"
        style={{ scale }}
      />
    </div>
  );
};

export default App;
```
