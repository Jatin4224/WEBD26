import React from "react";
import { motion } from "framer-motion";

// --- JAPANESE AESTHETIC ELEMENTS ---
const HankoStamp = ({ text }) => (
  <div className="absolute top-6 right-6 w-10 h-10 border-2 border-[#ff7b54] text-[#ff7b54] text-xs font-bold flex items-center justify-center rounded-sm opacity-60 rotate-[3deg] font-serif shadow-[0_0_10px_rgba(255,123,84,0.2)]">
    <span style={{ writingMode: "vertical-rl" }}>{text}</span>
  </div>
);

const VerticalAccentText = ({ text }) => (
  <div
    className="hidden lg:block absolute -left-12 top-10 text-[#ffbda7]/20 text-4xl font-serif tracking-widest pointer-events-none select-none"
    style={{ writingMode: "vertical-rl", textOrientation: "upright" }}
  >
    {text}
  </div>
);

// --- ELEGANT RAW COMPONENTS ---
const JapH1 = ({ children, kanji }) => (
  <div className="mb-12 relative border-b border-[#ffbda7]/10 pb-6">
    <span className="block text-[#ff9a76] text-sm font-serif tracking-[0.3em] uppercase mb-2">
      {kanji}
    </span>
    <h1 className="text-4xl md:text-5xl font-cinzel text-[#ffe4db] drop-shadow-md">
      {children}
    </h1>
  </div>
);

const JapH2 = ({ children }) => (
  <h2 className="text-2xl font-cinzel text-[#ffbda7] mt-12 mb-6 flex items-center gap-4">
    <span className="w-2 h-2 rounded-full bg-[#ff9a76] shadow-[0_0_8px_#ff9a76]"></span>
    {children}
  </h2>
);

const JapH3 = ({ children }) => (
  <h3 className="text-lg font-serif tracking-wide text-[#ffe4db]/80 mt-8 mb-4 border-l-2 border-[#ffbda7]/30 pl-3">
    {children}
  </h3>
);

const JapP = ({ children }) => (
  <p className="text-base md:text-lg text-[#a68a80] leading-relaxed font-sans mb-6 font-light">
    {children}
  </p>
);

const JapCode = ({ code }) => (
  <div className="relative my-8 group">
    <div className="absolute inset-0 bg-gradient-to-r from-[#ffbda7]/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-md"></div>
    <div className="relative bg-[#0d0908] border border-[#ffbda7]/10 rounded-xl p-4 md:p-6 overflow-x-auto shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]">
      <div className="absolute top-0 right-4 px-2 py-1 bg-[#ffbda7]/10 rounded-b-md border border-t-0 border-[#ffbda7]/20 text-[#ffbda7]/60 text-[10px] uppercase tracking-widest font-mono">
        Code
      </div>
      <pre className="text-[#e8d5cf] font-mono text-sm md:text-base leading-loose pt-4">
        <code>{code}</code>
      </pre>
    </div>
  </div>
);

const JapCard = ({ children, kanjiWatermark, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay, ease: "easeOut" }}
      className="relative bg-[#140e0c]/80 backdrop-blur-md border border-[#ffbda7]/10 p-8 md:p-12 mb-12 rounded-sm shadow-[0_10px_40px_-10px_rgba(0,0,0,0.8)]"
    >
      {/* Decorative corners */}
      <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-[#ffbda7]/40"></div>
      <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-[#ffbda7]/40"></div>
      <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-[#ffbda7]/40"></div>
      <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-[#ffbda7]/40"></div>

      {children}
      <VerticalAccentText text={kanjiWatermark} />
    </motion.div>
  );
};

// --- MAIN COMPONENT ---
export const FunkyNotes = () => {
  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700&family=Noto+Serif+JP:wght@300;400;700&display=swap');
          .font-cinzel { font-family: 'Cinzel Decorative', serif; }
          .font-serif { font-family: 'Noto Serif JP', serif; }
        `}
      </style>

      {/* Dark Peach / Black Background */}
      <section className="relative min-h-screen bg-[#0a0706] text-white py-24 px-4 md:px-8 overflow-hidden selection:bg-[#ffbda7]/30 selection:text-[#ffe4db]">
        {/* Background Glowing "Sun" / Peach Accents */}
        <div className="fixed top-[-20%] left-[-10%] w-[60%] h-[60%] bg-[#ff9a76]/5 blur-[150px] rounded-full pointer-events-none" />
        <div className="fixed bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#ffbda7]/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-4xl mx-auto relative z-10">
          {/* HEADER SECTION */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-center mb-24 relative"
          >
            <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 text-9xl text-[#ffbda7]/5 font-serif select-none pointer-events-none whitespace-nowrap">
              開発ノート
            </div>
            <h1 className="text-5xl md:text-7xl font-cinzel text-[#ffe4db] font-bold tracking-wider mb-4 relative z-10">
              Framer Motion
            </h1>
            <p className="text-[#ff9a76] font-serif tracking-[0.5em] uppercase text-sm md:text-base relative z-10">
              Developer Notes & Mastery
            </p>
            <div className="w-px h-16 bg-gradient-to-b from-[#ffbda7]/50 to-transparent mx-auto mt-8"></div>
          </motion.div>

          {/* ================= PART 1 ================= */}
          <JapCard kanjiWatermark="第一部" delay={0.1}>
            <HankoStamp text="基礎" /> {/* "Foundation" */}
            <JapH1 kanji="Part 1">First steps</JapH1>
            <JapH2>[1] starting point of the animation</JapH2>
            <JapH3>tailwind class vs initial prop</JapH3>
            <JapP>
              - it depends on you what u want to use to define initial state i
              prefer using tailwind classs to define initial state nd animate
              prop for animations.
            </JapP>
            <JapH2>[2] Addinng a from state to the animation</JapH2>
            <JapH3>
              using !bg-black important mark in taiwlind with motion what will
              happen?
            </JapH3>
            <JapP>
              - inline stype always wins for any css selector esxpect !important
              so never use ! in your styles because it will break all the
              animations.
            </JapP>
            <JapH2>[3] Making the animation loop with keyFrames</JapH2>
            <JapCode
              code={`<motion.div
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
></motion.div>`}
            />
            <JapH2>[4] Adding interactivity</JapH2>
            <JapH3>(Hover, focus and tap -- making bouncy effect)</JapH3>
            <JapCode
              code={`<motion.button
  className="h-16 rounded-full px-8 bg-blue-600"
  whileHover={{ scale: 2 }}
  whileFocus={{ scale: 2.2 }}
  whileTap={{ scale: 1.7 }}
  //onTap
  //onTapStart
  //onTapCancel={asyncFunction}
>
  Hover
</motion.button>`}
            />
          </JapCard>

          {/* ================= PART 2 ================= */}
          <JapCard kanjiWatermark="第二部" delay={0.2}>
            <HankoStamp text="価値" /> {/* "Value" */}
            <JapH1 kanji="Part 2">Motion values</JapH1>
            <JapH2>[1] The core of motion</JapH2>
            <JapH3>useMotionValue hook</JapH3>
            <JapP>
              - important note:- when creating own custom motion value. motion
              expects u to use style property instead of animate and initial
              property.
              <br />
              <br />- set and get function can be used to manipulate the value
            </JapP>
            <JapCode
              code={`import { motion, useMotionValue } from "motion/react";

const App = () => {
  const scale = useMotionValue(2);
  //scale.set scale.get
  return (
    <div className="flex items-center justify-center min-h-screen text-white ">
      <motion.div
        className="rounded-full w-32 h-12 bg-blue-500"
        style={{ scale }}
      ></motion.div>
    </div>
  );
};
export default App;`}
            />
            <JapH2>[2] Make it bounce like a spring</JapH2>
            <JapH3>useSpring hook</JapH3>
            <JapCode
              code={`import { motion, useMotionValue, useSpring } from "motion/react";

const App = () => {
  const scale = useSpring(1, {
    stiffness: 200,
    damping: 20,
    mass: 0.5,
    velocity: 0,
  });
  return (
    <div className="flex items-center justify-center min-h-screen text-white ">
      <motion.div
        className="rounded-full w-32 h-12 bg-blue-500"
        style={{ scale }}
        whileHover={{ scale: 2 }}
      ></motion.div>
    </div>
  );
};
export default App;`}
            />
            <JapH2>[3] Transforming motion values</JapH2>
            <JapH3>useTransform hook</JapH3>
            <JapP>
              - This example demonstrates how useTransform in Framer Motion
              creates derived animations from a single source value. Here,
              sliderValue is a MotionValue that acts as the main driver of the
              animation. When the user hovers over the element, sliderValue
              changes from 1 to 5.
              <br />
              <br />- The useTransform hook listens to this change and maps the
              input range [1, 5] to an output range [0.2, 1], producing a new
              motion value called opacity. As a result, the element smoothly
              fades in as the hover begins and fades out when the hover ends.
            </JapP>
            <JapCode
              code={`import { motion, useMotionValue, useTransform } from "motion/react";

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
export default App;`}
            />
            <JapH2>[4] Making elements draggable</JapH2>
            <JapH3>drag & dragConstraints</JapH3>
            <JapP>
              Combining it with useTransform: Because we added our own x motion
              value, and that value is updated by the drag, we now have a motion
              value we can use to drive other animations.
            </JapP>
            <JapCode
              code={`import { motion, useMotionValue, useTransform } from "motion/react";

const App = () => {
  const x = useMotionValue(0);
  
  //making scale animation
  const scale = useTransform(x, [-100, 0, 100], [1, 1, 1.5]); 
  //making elment circular
  const borderRadius = useTransform(x, [-100, 0, 100], ["50%", "0%", "50%"]); 
  //changing background color
  const backgroundColor = useTransform(
    x, [-100, 1, 100], ["#6d4b7e", "blue", "green"],
  );

  return (
    <div className="flex items-center justify-center min-h-screen">
      <motion.div
        style={{ x, scale, borderRadius, backgroundColor }}
        className="w-32 h-32 bg-[#306a87] rounded-md flex items-center justify-center text-white"
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
      />
    </div>
  );
};
export default App;`}
            />
            <JapH2>[5] Animating CSS variables</JapH2>
            <JapH3>css variables (custom properties)</JapH3>
            <JapCode
              code={`import { motion } from "motion/react";

const App = () => {
  const scale = useMotionValue(20);

  return (
    <motion.div
      style={{
        "--scale": scale,
      }}
    />
  );
};`}
            />
          </JapCard>

          {/* ================= PART 3 ================= */}
          <JapCard kanjiWatermark="第三部" delay={0.3}>
            <HankoStamp text="高度" /> {/* "Advanced" */}
            <JapH1 kanji="Part 3">Stepping Up</JapH1>
            <JapH2>[1] Exit Animations</JapH2>
            <JapH3>[ 1 ] exitProp</JapH3>
            <JapP>
              - The exit prop is similar to initial and animate in the way you
              use it. You simply pass in a style, and Framer Motion will apply
              this when the element leaves the DOM.
            </JapP>
            <JapH3>[ 2 ] AnimatePresence</JapH3>
            <JapP>
              - &lt;AnimatePresence&gt; is a component that wraps around the
              elements (could be one, or multiple!) you want to animate when
              they leave the DOM.
              <br />
              <br />
              - The important thing this component adds, is that it as soon as
              an element gets removed from the dom, it actually keeps it around
              a little bit longer, until the exit animation finishes. Only then
              it will really unmount it from the page.
              <br />
              <br />- So even if you render an element conditionally in React{" "}
              <code>someBoolean && &lt;motion.div /&gt;</code>, the element
              still stays in the DOM when someBoolean becomes false. Thanks to
              the AnimatePresence component.
            </JapP>
            <JapCode
              code={`import { useState } from "react";
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
      
      <AnimatePresence initial={false}>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
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
export default App;`}
            />
            <JapH2>[2] Variants</JapH2>
            <JapP>
              - The past few lessons we have been using the initial, animate and
              exit props. Perhaps you noticed that there were a few moments
              where we repeated quite some styles. There’s a solution for that!
              It is called variants.
              <br />
              <br />- In essence a variant is a JavaScript object containing all
              animation styles, like you would also use them on for example the
              animate prop.
            </JapP>
            <JapCode
              code={`const variants = {
  visible: { opacity: 1, x: 0 },
  hidden: { opacity: 0, x: 30 },
};

// Using the variants
<motion.div
  variants={variants}
  initial="hidden"
  animate="visible"
  exit="hidden"
/>`}
            />
            <JapP>
              - Then, instead of setting the styles directly on the initial,
              animate and exit props, you can reference the variant names.
              Framer Motion will then use the styles you have defined on your
              variants object. And look at that, suddenly you have removed quite
              a bit of repetition from your code.
            </JapP>
          </JapCard>
        </div>
      </section>
    </>
  );
};
