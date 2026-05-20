import { motion } from "framer-motion";
import demoVideo from "../assets/video.mp4";

export default function PhonePreview() {
  return (
    <div className="relative flex justify-center [perspective:1200px]">
      <motion.div
        className="relative w-[330px] h-[650px] rounded-[44px] bg-[#151515] p-[10px] shadow-[0_35px_80px_rgba(0,0,0,0.55)]"
        initial={{ rotateY: -14, rotateX: 5, rotateZ: 3 }}
        whileHover={{
          rotateY: -4,
          rotateX: 0,
          rotateZ: 0,
          scale: 1.04,
        }}
        transition={{ type: "spring", stiffness: 140, damping: 18 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* phone screen */}
        <div className="relative h-full w-full overflow-hidden rounded-[34px] bg-black">
          {/* notch */}
          <div className="absolute top-3 left-1/2 z-20 h-7 w-32 -translate-x-1/2 rounded-full bg-black" />

          <video
            src={demoVideo}
            autoPlay
            muted
            loop
            playsInline
            className="h-full w-full object-cover"
          />

          {/* glass reflection */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-30" />
        </div>
      </motion.div>
    </div>
  );
}
