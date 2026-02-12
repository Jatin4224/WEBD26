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
