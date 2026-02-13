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
