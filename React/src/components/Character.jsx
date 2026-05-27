import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import racoon from "../assets/racoon-walk.gif";

export default function Character() {
  const [position, setPosition] = useState({ x: 80, y: 200 });

  const keys = useRef({});
  const positionRef = useRef({ x: 80, y: 200 });

  useEffect(() => {
    const speed = 4;

    const handleKeyDown = (e) => {
      keys.current[e.key] = true;
    };

    const handleKeyUp = (e) => {
      keys.current[e.key] = false;
    };

    const move = () => {
      let { x, y } = positionRef.current;

      if (keys.current.ArrowRight) x += speed;
      if (keys.current.ArrowLeft) x -= speed;
      if (keys.current.ArrowUp) y -= speed;
      if (keys.current.ArrowDown) y += speed;

      x = Math.max(0, Math.min(window.innerWidth - 320, x));
      y = Math.max(0, Math.min(window.innerHeight - 320, y));

      positionRef.current = { x, y };
      setPosition({ x, y });

      requestAnimationFrame(move);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    const animationId = requestAnimationFrame(move);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <motion.div
      className="absolute z-20 pointer-events-none select-none"
      animate={{
        x: position.x,
        y: position.y,
      }}
      transition={{
        type: "spring",
        stiffness: 220,
        damping: 28,
        mass: 0.6,
      }}
    >
      {/* lamp light */}
      <motion.div
        className="absolute left-1/2 top-[72%] -translate-x-1/2 h-40 w-64 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(245,252,255,0.95) 0%, rgba(205,235,255,0.75) 28%, rgba(130,190,255,0.35) 55%, rgba(130,190,255,0) 78%)",
        }}
        animate={{
          opacity: [0.7, 1, 0.7],
          scale: [0.95, 1.12, 0.95],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      {/* character */}
      <motion.img
        src={racoon}
        alt="Obito"
        className="relative z-20 w-80"
        animate={{
          y: [0, -2, 0],
        }}
        transition={{
          duration: 0.6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </motion.div>
  );
}
