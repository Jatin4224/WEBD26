import { motion } from "motion/react";

const App = () => {
  return (
    <div className="flex items-center justify-center min-h-screen text-white ">
      <motion.button
        className="h-16 rounded-full px-8 bg-blue-600"
        whileHover={{
          scale: 2,
        }}
        whileFocus={{
          scale: 2.2,
        }}
        whileTap={{
          scale: 7,
        }}
        //onTap
        //onTapStart
        //onTapCancel={asyncFunction}
      >
        Hover
      </motion.button>
    </div>
  );
};

export default App;
