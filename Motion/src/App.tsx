import { motion, useMotionValue, useSpring, useTransform } from "motion/react";

const App = () => {
  // source value
  const sliderValue = useMotionValue(1);

  // derived value
  const opacity = useTransform(sliderValue, [1, 5], [0.2, 1]);
  //
  const scale = useSpring(sliderValue, { stiffness: 200, damping: 20 });
  return (
    <div className="flex items-center justify-center min-h-screen">
      <motion.div
        className="rounded-full w-32 h-12 bg-blue-500"
        style={{ opacity, scale }} // ✅ bind transform here
        onHoverStart={() => sliderValue.set(5)}
        // ✅ change source
        onHoverEnd={() => sliderValue.set(1)}
      />
    </div>
  );
};

export default App;
