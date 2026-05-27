import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function LoginButton() {
  return (
    <motion.button
      whileTap={{ scale: 0.96 }}
      whileHover={{
        boxShadow: "0 0 28px rgba(125, 249, 255, 0.35)",
      }}
      transition={{ duration: 0.2 }}
      className="
        group relative flex h-16 w-full items-center justify-center
        rounded-2xl border border-cyan-200/70
        bg-black/20 text-white backdrop-blur-md
        shadow-[0_0_18px_rgba(125,249,255,0.18)]
        overflow-hidden
      "
    >
      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-200/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <span className="relative text-base font-semibold tracking-[8px]">
        LOG IN
      </span>

      <motion.span
        className="absolute right-7"
        initial={{ x: 0 }}
        whileHover={{ x: 5 }}
      >
        <ArrowRight size={28} strokeWidth={1.5} />
      </motion.span>
    </motion.button>
  );
}
