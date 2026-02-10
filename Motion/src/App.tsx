import { motion } from "motion/react";

const App = () => {
  return (
    <div className="flex items-center justify-center min-h-screen text-white ">
      <motion.button
        className="bg-black p-3 rounded-lg"
        animate={{
          backgroundColor: "grey",
          color: "#0f0",
          // transform: "scale(2) translateY(50px)", instead of this using individual more preferable
          scale: 2,
          y: 50,
          x: -150,
          rotate: 2800,
        }}
        initial={{
          backgroundColor: "#00f",
        }}
      >
        zoro
      </motion.button>
    </div>
  );
};

export default App;
