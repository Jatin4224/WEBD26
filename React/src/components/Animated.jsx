import demoVideo from "../assets/video.mp4";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// --- REUSABLE ICONS ---
const Icons = {
  Check: (props) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  Sparkle: (props) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
    </svg>
  ),
  Close: (props) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  ),
  Play: (props) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M8 5v14l11-7z" />
    </svg>
  ),
};

// --- FLOATING PARTICLES ---
const Particles = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-indigo-400 rounded-full"
          initial={{
            opacity: Math.random() * 0.5 + 0.1,
            x: Math.random() * 100 + "vw",
            y: Math.random() * 100 + "vh",
            scale: Math.random() * 0.5 + 0.5,
          }}
          animate={{
            y: [null, Math.random() * -200 - 100],
            opacity: [null, 0],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            filter: "blur(1px)",
            boxShadow: "0 0 15px 2px rgba(129, 140, 248, 0.4)",
          }}
        />
      ))}
    </div>
  );
};

// --- DETAILED PREVIEW MODAL ---
const PreviewModal = ({ isOpen, onClose, videoSrc }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        >
          {/* Modal Content */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-[400px] aspect-[9/19] bg-[#0c0c0e] rounded-[2rem] sm:rounded-[3rem] border-[4px] border-zinc-800 overflow-hidden shadow-2xl ring-1 ring-white/20"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking the video itself
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-50 p-2.5 bg-black/50 hover:bg-black/80 rounded-full text-white backdrop-blur-md transition-colors border border-white/10"
            >
              <Icons.Close className="w-5 h-5" />
            </button>

            {/* Video Inside Modal */}
            {videoSrc ? (
              <video
                src={videoSrc}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-zinc-500 bg-zinc-900">
                No Preview Available
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// --- 3D PHONE MOCKUP COMPONENT ---
const PhoneMockup = ({ videoSrc, onScreenClick }) => {
  return (
    <div className="relative flex justify-center items-center perspective-[2000px] mt-12 lg:mt-0 z-10 w-full">
      {/* Background Spotlight Glow */}
      <div className="absolute inset-0 w-full h-[120%] top-[-10%] bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute w-[80%] h-[80%] bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none" />

      {/* 3D Tilted Wrapper */}
      <motion.div
        initial={{ rotateX: 25, rotateY: -15, rotateZ: 5, y: 50, opacity: 0 }}
        animate={{ rotateX: 15, rotateY: -10, rotateZ: 3, y: 0, opacity: 1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
        className="relative group"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Floating Animation Wrapper */}
        <motion.div
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* The Phone Container */}
          <div className="w-[280px] sm:w-[320px] h-[580px] sm:h-[650px] bg-[#0c0c0e] rounded-[2.5rem] sm:rounded-[3rem] border-[6px] sm:border-[8px] border-zinc-800/80 overflow-hidden relative shadow-[0_0_50px_rgba(0,0,0,0.8)] ring-1 ring-white/10">
            {/* Dynamic Island */}
            {/* <div className="absolute top-2 left-1/2 -translate-x-1/2 w-24 sm:w-28 h-7 bg-black rounded-full z-40 flex items-center justify-between px-2 shadow-sm">
              <div className="w-2 h-2 bg-zinc-800 rounded-full"></div>
              <div className="w-2 h-2 bg-indigo-900 rounded-full shadow-[0_0_4px_#4f46e5]"></div>
            </div> */}

            {/* Interactive Video Player */}
            <div
              className="w-full h-full bg-zinc-900 relative group/screen cursor-pointer"
              onClick={onScreenClick}
            >
              {videoSrc ? (
                <video
                  src={videoSrc}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover   transition-transform duration-700 group-hover/screen:scale-105"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-zinc-600 text-sm">
                  No video provided
                </div>
              )}

              {/* Play Button Overlay (Appears on hover) */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/screen:opacity-100 transition-opacity duration-300 flex items-center justify-center z-30">
                <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center shadow-lg border border-white/30 transform group-hover/screen:scale-110 transition-transform duration-300">
                  <Icons.Play className="w-7 h-7 text-white ml-1" />
                </div>
              </div>
            </div>

            {/* Mock Home Indicator */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-1/3 h-1 bg-white/50 rounded-full z-40 pointer-events-none"></div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

// --- MAIN REUSABLE COMPONENT ---
export const AppShowcaseSection = ({
  title = "Amazing App Title",
  subtitle = "The subtitle goes here",
  description = "A short description explaining the value proposition of the app and why users should download it right now.",
  features = ["Feature 1", "Feature 2", "Feature 3"],
  ctaText = "Download Now",
  ctaHref = "#",
  videoSrc = "",
  badgeText = "New Release",
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <>
      <section className="relative min-h-screen bg-[#050507] text-white overflow-hidden font-sans flex items-center justify-center py-20 lg:py-16 selection:bg-indigo-500/30 selection:text-indigo-200">
        {/* Background Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] z-0" />

        <Particles />

        <div className="max-w-7xl w-full mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center relative z-10">
          {/* Left Side: Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="flex flex-col items-start pt-10 lg:pt-0"
          >
            {badgeText && (
              <motion.div
                variants={itemVariants}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 backdrop-blur-md mb-6 shadow-[0_0_15px_rgba(99,102,241,0.15)]"
              >
                <Icons.Sparkle className="w-4 h-4 text-indigo-400" />
                <span className="text-xs uppercase tracking-[0.15em] text-indigo-300 font-semibold">
                  {badgeText}
                </span>
              </motion.div>
            )}

            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight mb-4 text-zinc-100"
            >
              {title}
            </motion.h1>

            {subtitle && (
              <motion.h2
                variants={itemVariants}
                className="text-2xl sm:text-3xl font-medium text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400 mb-6 drop-shadow-sm"
              >
                {subtitle}
              </motion.h2>
            )}

            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg text-zinc-400 max-w-xl leading-relaxed mb-8"
            >
              {description}
            </motion.p>

            {features && features.length > 0 && (
              <motion.ul
                variants={itemVariants}
                className="space-y-4 mb-10 max-w-md w-full"
              >
                {features.map((feature, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 text-zinc-300 bg-white/[0.02] border border-white/[0.05] p-3 rounded-xl backdrop-blur-sm transition-colors hover:bg-white/[0.04]"
                  >
                    <div className="flex-shrink-0 w-6 h-6 mt-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center shadow-[0_0_10px_rgba(99,102,241,0.1)]">
                      <Icons.Check className="w-3.5 h-3.5 text-indigo-400" />
                    </div>
                    <span className="font-medium text-sm sm:text-base leading-snug">
                      {feature}
                    </span>
                  </li>
                ))}
              </motion.ul>
            )}

            <motion.div variants={itemVariants} className="w-full sm:w-auto">
              <a
                href={ctaHref}
                className="inline-flex w-full sm:w-auto justify-center items-center px-8 py-4 rounded-full bg-white text-black font-semibold text-sm tracking-wide hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-all duration-300"
              >
                {ctaText}
              </a>
            </motion.div>
          </motion.div>

          {/* Right Side: Tilted Phone Mockup */}
          <PhoneMockup
            videoSrc={videoSrc}
            onScreenClick={() => setIsModalOpen(true)}
          />
        </div>
      </section>

      {/* The Detailed Preview Modal */}
      <PreviewModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        videoSrc={videoSrc}
      />
    </>
  );
};

// --- EXAMPLE USAGE (Your App.js) ---
export default function App() {
  return (
    <div>
      <AppShowcaseSection
        badgeText="Interactive Preview"
        title="Experience the app before you download."
        subtitle="Next-Gen UI Components"
        description="Stop wasting time building from scratch. Use our premium, highly customizable components to ship your product in days instead of months. Click the phone to see it in action."
        features={[
          "Click the phone for a detailed preview",
          "Fully responsive & animated modal",
          "Dark mode optimized with glassmorphism",
        ]}
        ctaText="Get Started For Free"
        ctaHref="#get-started"
        // Replace with your own vertical mobile video URL
        videoSrc={demoVideo}
      />
      <AppShowcaseSection
        badgeText="Interactive Preview"
        title="Experience the app before you download."
        subtitle="Next-Gen UI Components"
        description="Stop wasting time building from scratch. Use our premium, highly customizable components to ship your product in days instead of months. Click the phone to see it in action."
        features={[
          "Click the phone for a detailed preview",
          "Fully responsive & animated modal",
          "Dark mode optimized with glassmorphism",
        ]}
        ctaText="Get Started For Free"
        ctaHref="#get-started"
        // Replace with your own vertical mobile video URL
        videoSrc={demoVideo}
      />
      <AppShowcaseSection
        badgeText="Interactive Preview"
        title="Experience the app before you download."
        subtitle="Next-Gen UI Components"
        description="Stop wasting time building from scratch. Use our premium, highly customizable components to ship your product in days instead of months. Click the phone to see it in action."
        features={[
          "Click the phone for a detailed preview",
          "Fully responsive & animated modal",
          "Dark mode optimized with glassmorphism",
        ]}
        ctaText="Get Started For Free"
        ctaHref="#get-started"
        // Replace with your own vertical mobile video URL
        videoSrc={demoVideo}
      />
      <AppShowcaseSection
        badgeText="Interactive Preview"
        title="Experience the app before you download."
        subtitle="Next-Gen UI Components"
        description="Stop wasting time building from scratch. Use our premium, highly customizable components to ship your product in days instead of months. Click the phone to see it in action."
        features={[
          "Click the phone for a detailed preview",
          "Fully responsive & animated modal",
          "Dark mode optimized with glassmorphism",
        ]}
        ctaText="Get Started For Free"
        ctaHref="#get-started"
        // Replace with your own vertical mobile video URL
        videoSrc={demoVideo}
      />
    </div>
  );
}
