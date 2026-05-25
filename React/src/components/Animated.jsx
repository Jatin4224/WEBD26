import demoVideo from "../assets/video.mp4";
import foodDemoVideo from "../assets/food.mp4";
// Note: Make sure to import your image just like your video!
import demoImage from "../assets/image1.png";

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

// --- FLOATING PARTICLES (PEACH) ---
const Particles = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-[#ffbda7] rounded-full"
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
            boxShadow: "0 0 15px 2px rgba(255, 189, 167, 0.4)",
          }}
        />
      ))}
    </div>
  );
};

// --- DETAILED PREVIEW MODAL ---
const PreviewModal = ({ isOpen, onClose, videoSrc, imageSrc }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md"
          onClick={onClose}
        >
          {/* Modal Content */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-[400px] aspect-[9/19] bg-[#0c0a09] rounded-[2rem] sm:rounded-[3rem] border-[4px] border-[#ffbda7]/20 overflow-hidden shadow-[0_0_50px_rgba(255,189,167,0.15)] ring-1 ring-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-50 p-2.5 bg-black/50 hover:bg-[#ffbda7]/20 rounded-full text-white backdrop-blur-md transition-colors border border-white/10 hover:border-[#ffbda7]/50"
            >
              <Icons.Close className="w-5 h-5" />
            </button>

            {/* Media Inside Modal */}
            {videoSrc ? (
              <video
                src={videoSrc}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />
            ) : imageSrc ? (
              <img
                src={imageSrc}
                alt="App Preview Full"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-zinc-500 bg-[#0c0a09]">
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
const PhoneMockup = ({ videoSrc, imageSrc, onScreenClick }) => {
  return (
    <div className="relative flex justify-center items-center perspective-[2000px] mt-12 lg:mt-0 z-10 w-full">
      {/* Background Spotlight Glow (Peach) */}
      <div className="absolute inset-0 w-full h-[120%] top-[-10%] bg-[#ffbda7]/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute w-[80%] h-[80%] bg-[#ff9a76]/10 blur-[100px] rounded-full pointer-events-none" />

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
          <div className="w-[280px] sm:w-[320px] h-[580px] sm:h-[650px] bg-[#0c0a09] rounded-[2.5rem] sm:rounded-[3rem] border-[6px] sm:border-[8px] border-zinc-800/80 overflow-hidden relative shadow-[0_0_50px_rgba(0,0,0,0.8)] ring-1 ring-white/10">
            {/* Dynamic Island */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-24 sm:w-28 h-7 bg-black rounded-full z-40 flex items-center justify-between px-2 shadow-sm">
              <div className="w-2 h-2 bg-zinc-800 rounded-full"></div>
              <div className="w-2 h-2 bg-[#ffbda7] rounded-full shadow-[0_0_4px_#ffbda7]"></div>
            </div>

            {/* Interactive Media Player */}
            <div
              className="w-full h-full bg-[#0c0a09] relative group/screen cursor-pointer"
              onClick={onScreenClick}
            >
              {videoSrc ? (
                <video
                  src={videoSrc}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover transition-transform duration-700 group-hover/screen:scale-105"
                />
              ) : imageSrc ? (
                <img
                  src={imageSrc}
                  alt="App Preview"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover/screen:scale-105"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-zinc-600 text-sm font-sans">
                  No media provided
                </div>
              )}

              {/* Play/Expand Button Overlay */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/screen:opacity-100 transition-opacity duration-300 flex items-center justify-center z-30">
                <div className="w-16 h-16 rounded-full bg-[#ffbda7]/20 backdrop-blur-md flex items-center justify-center shadow-[0_0_20px_rgba(255,189,167,0.3)] border border-[#ffbda7]/30 transform group-hover/screen:scale-110 transition-transform duration-300">
                  <Icons.Play className="w-7 h-7 text-[#ffbda7] ml-1" />
                </div>
              </div>
            </div>

            {/* Mock Home Indicator */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-1/3 h-1 bg-white/30 rounded-full z-40 pointer-events-none"></div>
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
  videoSrc = "", // FIX: Default to empty string so imageSrc can trigger!
  imageSrc = "",
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
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@700&display=swap');
          .font-cinzel {
            font-family: 'Cinzel Decorative', serif;
            font-weight: 700;
          }
        `}
      </style>

      <section className="relative min-h-screen bg-[#0a0807] text-white overflow-hidden font-sans flex items-center justify-center py-20 lg:py-16 selection:bg-[#ffbda7]/30 selection:text-[#ffe4db]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,189,167,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,189,167,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] z-0" />
        <Particles />

        <div className="max-w-7xl w-full mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center relative z-10">
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
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#ffbda7]/30 bg-[#ffbda7]/10 backdrop-blur-md mb-6 shadow-[0_0_15px_rgba(255,189,167,0.15)] font-cinzel"
              >
                <Icons.Sparkle className="w-4 h-4 text-[#ffbda7]" />
                <span className="text-xs uppercase tracking-[0.15em] text-[#ffbda7] mt-0.5">
                  {badgeText}
                </span>
              </motion.div>
            )}

            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl lg:text-6xl leading-[1.1] tracking-tight mb-4 text-zinc-100 font-cinzel"
            >
              {title}
            </motion.h1>

            {subtitle && (
              <motion.h2
                variants={itemVariants}
                className="text-2xl sm:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-[#ffcba4] to-[#ff9a76] mb-6 drop-shadow-sm font-cinzel"
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
                    className="flex items-start gap-3 text-zinc-300 bg-white/[0.02] border border-[#ffbda7]/10 p-3 rounded-xl backdrop-blur-sm transition-colors hover:bg-[#ffbda7]/5"
                  >
                    <div className="flex-shrink-0 w-6 h-6 mt-0.5 rounded-full bg-[#ffbda7]/10 border border-[#ffbda7]/30 flex items-center justify-center shadow-[0_0_10px_rgba(255,189,167,0.1)]">
                      <Icons.Check className="w-3.5 h-3.5 text-[#ffbda7]" />
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
                className="inline-flex w-full sm:w-auto justify-center items-center px-8 py-4 rounded-full bg-gradient-to-r from-[#ffcba4] to-[#ff9a76] text-[#0a0807] font-bold text-sm tracking-wide hover:scale-105 hover:shadow-[0_0_30px_rgba(255,189,167,0.4)] transition-all duration-300 font-cinzel"
              >
                {ctaText}
              </a>
            </motion.div>
          </motion.div>

          {/* FIX: Passing both videoSrc and imageSrc down to PhoneMockup */}
          <PhoneMockup
            videoSrc={videoSrc}
            imageSrc={imageSrc}
            onScreenClick={() => setIsModalOpen(true)}
          />
        </div>
      </section>

      {/* FIX: Passing both videoSrc and imageSrc down to PreviewModal */}
      <PreviewModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        videoSrc={videoSrc}
        imageSrc={imageSrc}
      />
    </>
  );
};

// --- EXAMPLE USAGE (Your App.js) ---
export default function App() {
  return (
    <div>
      <AppShowcaseSection
        badgeText="Expo UI Showcase"
        title="Crafting cinematic mobile experiences with Expo."
        subtitle="Interactive UI Library for React Native"
        description="A curated collection of premium Expo app screens, animations, and UI experiments built to inspire developers and designers."
        features={[
          "Watch real app screen recordings",
          "Explore reusable components",
        ]}
        ctaText="Explore Components"
        videoSrc={demoVideo}
        imageSrc={demoImage} // Provide the imported image!
      />

      <AppShowcaseSection
        badgeText="Week 3 Assignment"
        title="Build Food delivery App."
        subtitle="Expo React Native Navigation Assignment"
        description="A One Piece-inspired food delivery app built with Expo and React Navigation."
        features={["Nested Stack, Tabs & Drawer", "Deep linking support"]}
        ctaText="View Assignment"
        videoSrc={foodDemoVideo} // Video plays
      />

      <AppShowcaseSection
        badgeText="Image Fallback Test"
        title="Testing the image fallback."
        subtitle="Only passing an image this time"
        description="Because we did not provide videoSrc, this section will automatically display the image provided."
        features={["No video source provided", "Image shows up perfectly"]}
        ctaText="Explore Components"
        // NO videoSrc here -> Falls back to imageSrc!
        imageSrc={demoImage}
      />
    </div>
  );
}
