import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./LoadingScreen.module.css";
import gif from "../../assets/chess.png";
// List every asset you want preloaded
const ASSETS = [
  "/sprites/idle.gif",
  "/sprites/walking.gif",
  "/sprites/jump.gif",
  "/backgrounds/outside.jpg",
  "/backgrounds/inside.jpg",
];

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let loaded = 0;

    ASSETS.forEach((src) => {
      const img = new Image();
      img.src = src;
      // Called when each image finishes loading
      img.onload = img.onerror = () => {
        loaded++;
        setProgress(Math.round((loaded / ASSETS.length) * 100));
        if (loaded === ASSETS.length) {
          // Small delay so user sees 100%
          setTimeout(() => setDone(true), 600);
        }
      };
    });
  }, []);

  // When done, wait for exit animation then call onComplete
  return (
    <AnimatePresence onExitComplete={onComplete}>
      {!done && (
        <motion.div
          className={styles.screen}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <img src={gif} alt="Loading..." className={styles.gif} />
          <p className={styles.text}>pushing pixels...</p>
          <div className={styles.bar}>
            <motion.div
              className={styles.fill}
              animate={{ width: `${progress}%` }}
              transition={{ ease: "easeOut" }}
            />
          </div>
          <span className={styles.percent}>{progress}%</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
