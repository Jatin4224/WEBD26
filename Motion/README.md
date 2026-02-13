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

## 2 - Make it bounce like a spring

### useSpring hook

```jsx
import { motion, useMotionValue, useSpring } from "motion/react";

const App = () => {
  const scale = useSpring(1, {
    stiffness: 200,
    damping: 20,
    mass: 0.5,
    velocity: 0,
  });
  //scale.set scale.get
  return (
    <div className="flex items-center justify-center min-h-screen text-white ">
      <motion.div
        className="rounded-full w-32 h-12 bg-blue-500"
        style={{
          scale,
        }}
        whileHover={{
          scale: 2,
        }}
      ></motion.div>
    </div>
  );
};

export default App;
```

## 3 - Transforming motion values

### useTransform hook

- This example demonstrates how useTransform in Framer Motion creates derived animations from a single source value. Here, sliderValue is a MotionValue that acts as the main driver of the animation. When the user hovers over the element, sliderValue changes from 1 to 5.
- The useTransform hook listens to this change and maps the input range [1, 5] to an output range [0.2, 1], producing a new motion value called opacity. As a result, the element smoothly fades in as the hover begins and fades out when the hover ends. This pattern highlights the core idea behind useTransform: instead of animating multiple properties independently, you animate a single source value and derive multiple visual effects from it, leading to cleaner, more predictable, and more scalable animations.

```jsx
import { motion, useMotionValue, useTransform } from "motion/react";

const App = () => {
  // source value
  const sliderValue = useMotionValue(1);

  // derived value
  const opacity = useTransform(sliderValue, [1, 5], [0.2, 1]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <motion.div
        className="rounded-full w-32 h-12 bg-blue-500"
        style={{ opacity }}
        onHoverStart={() => sliderValue.set(5)}
        onHoverEnd={() => sliderValue.set(1)}
      />
    </div>
  );
};

export default App;
```

## 4 - Making elements draggable

### drag & dragConstraints

```jsx
import { motion, useMotionValue } from "motion/react";

const App = () => {
  const x = useMotionValue(0);
  return (
    <div className="flex items-center justify-center min-h-screen">
      <motion.div
        drag="x" // sirf x axis mehi drag hoga left nd right
        dragConstraints={{ left: 0, right: 0 }} //drag element but it will jump back to 0
        style={{ x }} // if i dont provide this motion will create its own default value but now when i dragging element our own custom value of x is changing so we can use it in many task.
        className="rounded-full w-32 h-12 bg-blue-500"
      ></motion.div>
    </div>
  );
};

export default App;
```
