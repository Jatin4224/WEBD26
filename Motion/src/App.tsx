import { motion, useMotionValue } from "motion/react";

const App = () => {
  const scale = useMotionValue(2);

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
