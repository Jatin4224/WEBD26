import { motion } from "motion/react";

const App = () => {
  return (
    <div className="flex items-center justify-center min-h-screen text-white ">
      <motion.div
        className="bg-gray-400 w-24 h-24"
        animate={{
          scale: [1, 2, 2, 1, 1],
          rotate: [0, 0, 180, 180, 0],
          borderRadius: ["0%", "0%", "50%", "50%", "0%"], //make sure all arrays are in same lenth for smooth aniamtion
        }}
        transition={{
          ease: "easeInOut",
          repeat: Infinity,
          repeatDelay: 1,
          duration: 2, //to control the multiple steps
          // times: [0, 0.25, 0.5, 0.75, 1], //firt animation starts at 0% second is 25%. it makes things more compilcated
        }}
      ></motion.div>
    </div>
  );
};

export default App;
