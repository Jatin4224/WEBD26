# Part 1 - First steps

## [1] starting point of the animation (animate prop & initial prop)

### tailwind class vs initial prop

- it depends on you what u want to use to define initial state i prefer using tailwind classs to define initial state nd animate prop for animations.

## [2] Addinng a from state to the animation

### using !bg-black important mark in taiwlind with motion what will happen?

- inline stype always wins for any css selector esxpect !important so never use ! in your styles because it will break all the animations.

## [3] Making the animation loop with keyFrames

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

## [4] Adding interactivity (Hover, focus and tap -- making bouncy effect)

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

# Part 2 - Motion values

## [1] The core of motion

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

## [2] - Make it bounce like a spring

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

## [3] Transforming motion values

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

## [4] Making elements draggable

### drag & dragConstraints

#### example 1

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

#### example 2 - combining it with useTransform

- Because we added our own x motion value, and that value is updated by the drag, we now have a motion value we can use to drive other animations.

### Acceptance criteria

- The color should change when the element moves to the left or right. Be creative with the colors, but make sure the left, center and right ends have different colors! Remember that you should use hex colors (#f00) instead of color names (red) to enable Framer Motion to animate the colors.
- When the block is moved to the right, it should become larger. When it moves to the left, the size shouldn’t change.
- When moved left and right, the square should become a circle.

```jsx
import { motion, useMotionValue, useTransform } from "motion/react";

const App = () => {
  const x = useMotionValue(0);
  //making scale animation
  const scale = useTransform(x, [-100, 0, 100], [1, 1, 1.5]); // if we drag to right our elements becomes large
  //making elment circular
  const borderRadius = useTransform(x, [-100, 0, 100], ["50%", "0%", "50%"]); // if i drag elment it becomes cirle
  //changing background color
  const backgroundColor = useTransform(
    x,
    [-100, 1, 100],
    ["#6d4b7e", "blue", "green"],
  );
  return (
    <div className="flex items-center justify-center min-h-screen">
      <motion.div
        style={{ x, scale, borderRadius, backgroundColor }}
        className="w-32 h-32 bg-[#306a87] rounded-md flex items-center justify-center text-white"
        drag="x"
        // We talk about the dragConstraints later.
        // For now, it helps with bouncing the square back to the center
        // when you release it.
        dragConstraints={{ left: 0, right: 0 }}
      />
    </div>
  );
};

export default App;
```

## [5] Animating CSS variables (custom properties)

### css variables

- CSS Variables (or CSS Custom Properties would be the correct name), are a way to define variables in CSS. You can then use these variables in your CSS, and change them with JavaScript. Mozilla Developer Docs does a very good job on describing them in detail. Or take a look at a video of me, using CSS variables to make a gradient follow the cursor.

```css
:root {
  --header-size: 60px;
}

main {
  padding-top: var(--header-size);
}

.header {
  height: var(--header-size);
}
```

- With the above code we defined a variable named --header-size with a value of 60px, that we then use in our .header class to define a height, but also use on the main element to add some padding.

#### Good to know:

- All CSS custom properties are prefixed with --
- You can define them on any element, just like a regular CSS property
- If you define a variable on an element, all it’s children will have access to it.
- If you override a property on a child, from that element on (including all its children) will use the new value.

### Using CSS variables with Framer Motion

```jsx
import { motion } from "motion/react";

const App = () => {
  const scale = useMotionValue(20);

  return (
    <motion.div
      style={{
        "--scale": scale,
      }}
    />
  );
};
```

# Part 3 - Stepping Up Your Game

## [1] Exit Animations

### [ 1 ] exitProp

- The exit prop is similar to initial and animate in the way you use it. You simply pass in a style, and Framer Motion will apply this when the element leaves the DOM.

- For it to work though, we need to introduce one more component.

### [ 2 ] AnimatePresence

- <AnimatePresence> is a component that wraps around the elements (could be one, or multiple!) you want to animate when they leave the DOM.
- The important thing this component adds, is that it as soon as an element gets removed from the dom, it actually keeps it around a little bit longer, until the exit animation finishes. Only then it will really unmount it from the page.The important thing this component adds, is that it as soon as an element gets removed from the dom, it actually keeps it around a little bit longer, until the exit animation finishes. Only then it will really unmount it from the page.

- So even if you render an element conditionally in React someBoolean && <motion.div />, the element still stays in the DOM when someBoolean becomes false. Thanks to the AnimatePresence component.

```jsx
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const App = () => {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <div className="grid min-h-[400px] items-start rounded-3xl p-5 shadow-2xl">
      <button
        className="mx-auto rounded-full bg-black px-5 py-3 text-white"
        onClick={() => setIsVisible((prev) => !prev)}
      >
        Toggle visibility
      </button>
      <AnimatePresence initial={false} // animation fades in when page loads ❌ >
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }} //fade in animation
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="mx-auto w-full max-w-[300px] rounded-2xl bg-white p-4 text-black"
          >
            <div className="mb-3 aspect-video w-full rounded-xl bg-gray-300" />
            Random card
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
```

## [2] Variants

- The past few lessons we have been using the initial, animate and exit props. Perhaps you noticed that there were a few moments where we repeated quite some styles. There’s a solution for that! It is called variants.

### Defining the variants

- In essence a variant is a JavaScript object containing all animation styles, like you would also use them on for example the animate prop.

```jsx
const variants = {
  visible: {
    opacity: 1,
    x: 0,
  },
  hidden: {
    opacity: 0,
    x: 30,
  },
};
```

- At the top level we now have two keys: visible and hidden. These are the names of the variants. You can name them whatever you want, but it’s best to use names that are descriptive of the state they represent. There is also no limit on how many variants you add.

- In our case the states are called visible and hidden, but it could very well be open and closed or active and inactive.

### Using the variants

- Once you have defined your variants, you can pass them to a new prop on the motion component called variants.

```jsx
<motion.div
  variants={variants}
  initial="hidden"
  animate="visible"
  exit="hidden"
/>
```

- Then, instead of setting the styles directly on the initial, animate and exit props, you can reference the variant names. Framer Motion will then use the styles you have defined on your variants object.

- And look at that, suddenly you have removed quite a bit of repetition from your code.

```jsx
import {
  motion,
  useMotionValue,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { useState } from "react";

const App = () => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="flex items-end justify-center min-h-screen pb-4">
      <button
        className="bg-white px-4 py-2 rounded-full"
        onClick={() => setOpenModal((open) => !open)}
      >
        Toggle Dialog
      </button>

      <AnimatePresence>
        {openModal && (
          <motion.div
            variants={{
              open: {
                opacity: 1,
                y: 0,
              },
              closed: {
                opacity: 0,
                y: 20,
              },
            }}
            initial="closed"
            animate="open"
            exit="closed"
            className="pointer-events-none fixed inset-0 flex items-end pb-20 justify-center"
          >
            <div className="w-[300px] max-w-full bg-white text-black rounded-2xl p-2 pb-6 pointer-events-auto overflow-hidden">
              <header className="flex justify-end">
                <motion.button
                  variants={{
                    open: {
                      scale: 1,
                    },
                    closed: {
                      scale: 0,
                    },
                  }}
                  onClick={() => setOpenModal(false)}
                  aria-label="Close"
                  className="block w-8 h-8 bg-black rounded-full p-2"
                >
                  <svg viewBox="0 0 512 512" className="fill-white">
                    <path d="M443.6 387.1 312.4 255.4l131.5-130c5.4-5.4 5.4-14.2 0-19.6l-37.4-37.6c-2.6-2.6-6.1-4-9.8-4-3.7 0-7.2 1.5-9.8 4L256 197.8 124.9 68.3c-2.6-2.6-6.1-4-9.8-4-3.7 0-7.2 1.5-9.8 4L68 105.9c-5.4 5.4-5.4 14.2 0 19.6l131.5 130L68.4 387.1c-2.6 2.6-4.1 6.1-4.1 9.8 0 3.7 1.4 7.2 4.1 9.8l37.4 37.6c2.7 2.7 6.2 4.1 9.8 4.1 3.5 0 7.1-1.3 9.8-4.1L256 313.1l130.7 131.1c2.7 2.7 6.2 4.1 9.8 4.1 3.5 0 7.1-1.3 9.8-4.1l37.4-37.6c2.6-2.6 4.1-6.1 4.1-9.8-.1-3.6-1.6-7.1-4.2-9.7z" />
                  </svg>
                </motion.button>
              </header>
              <div className="mt-4">
                <motion.img
                  variants={{
                    open: {
                      opacity: 1,
                      y: 0,
                    },
                    closed: {
                      opacity: 0,
                      y: 20,
                    },
                  }}
                  className="rounded-xl"
                  src="https://plus.unsplash.com/premium_photo-1772065873904-e6b60d3be0e6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyfHx8ZW58MHx8fHx8"
                />
              </div>
              <p className="mt-4 font-bold text-2xl px-6">Bambi</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
```
