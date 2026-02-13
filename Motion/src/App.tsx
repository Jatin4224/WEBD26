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
