import React, { useState } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
} from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  FileText,
  Lightbulb,
  ClipboardList,
  Plus,
  Search,
  Settings,
} from "lucide-react";

const COHORT_DATA = [
  {
    id: "w1",
    weekNumber: "01",
    weekTitleSans: "Foundation",
    weekTitleSerif: "Week.",
    learnings: [
      "React Native basics & Architecture",
      "Expo Ecosystem & Project Setup",
      "Components, Props & Core Layouts",
      "State Management via useState",
      "Styling with StyleSheet utility",
      "Navigation flows with React Navigation",
    ],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    finalProject: {
      title: "Notes App",
      description:
        "A simple notes app to create, edit and delete your daily thoughts seamlessly.",
      codeLink: "#",
      demoLink: "#",
    },
    notes: [
      {
        id: "n1",
        type: "ideas",
        title: "Ideas for App",
        content: "Build a habit tracker with streaks and reminders.",
        date: "Apr 20, 2026",
      },
      {
        id: "n2",
        type: "cohort",
        title: "Cohort Learnings",
        content:
          "Today I learned about props and state separation in core elements.",
        date: "Apr 19, 2026",
      },
      {
        id: "n3",
        type: "next",
        title: "Next Steps",
        content:
          "Integrate AsyncStorage and make it fully offline-first next week.",
        date: "Apr 18, 2026",
      },
    ],
  },
  {
    id: "w2",
    weekNumber: "02",
    weekTitleSans: "Advanced",
    weekTitleSerif: "State.",
    learnings: [
      "Custom Animations with Reanimated",
      "Context API & Global State Management",
      "Asynchronous Storage configurations",
      "Native Device Features Integration",
      "Optimizing FlatLists & Performance Rendering",
    ],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    finalProject: {
      title: "Fitness Tracker",
      description:
        "Monitor daily workouts, track running paths via GPS, and analyze visual graphs.",
      codeLink: "#",
      demoLink: "#",
    },
    notes: [
      {
        id: "n4",
        type: "cohort",
        title: "Animation Mechanics",
        content:
          "Shared values react significantly smoother than standard state flags.",
        date: "Apr 26, 2026",
      },
      {
        id: "n5",
        type: "next",
        title: "Production Review",
        content: "Profile layouts require image caching extensions.",
        date: "Apr 24, 2026",
      },
    ],
  },
];

export default function CohortChronicles() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentData = COHORT_DATA[currentIndex];

  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-10, 10]);
  const opacity = useTransform(
    x,
    [-200, -150, 0, 150, 200],
    [0.5, 1, 1, 1, 0.5],
  );

  const handleNext = () => {
    if (currentIndex < COHORT_DATA.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleDragEnd = (event, info) => {
    const swipeThreshold = 140;
    if (info.offset.x < -swipeThreshold) {
      handleNext();
    } else if (info.offset.x > swipeThreshold) {
      handlePrev();
    }
  };

  const getNoteIcon = (type) => {
    switch (type) {
      case "ideas":
        return <Lightbulb className="w-4 h-4 text-orange-400" />;
      case "cohort":
        return <ClipboardList className="w-4 h-4 text-red-400" />;
      default:
        return <FileText className="w-4 h-4 text-[#cce8e4]" />;
    }
  };

  return (
    // Outer Wrapper with Deep Black Background
    <div className="relative w-full min-h-screen bg-[#050505] overflow-hidden text-neutral-200 p-4 md:p-8 flex flex-col items-center justify-between selection:bg-red-500/30">
      {/* --- DYNAMIC RED/ORANGE MESH BACKGROUND GLOWS --- */}
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.7, 0.5] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-10%] left-[10%] w-[70vw] h-[70vw] max-w-[800px] max-h-[800px] bg-red-600/40 rounded-full blur-[120px] mix-blend-screen pointer-events-none"
      />
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
          x: [0, 50, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        className="absolute top-[20%] right-[5%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] bg-orange-600/30 rounded-full blur-[100px] mix-blend-screen pointer-events-none"
      />
      <motion.div
        animate={{ opacity: [0.2, 0.4, 0.2] }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        className="absolute bottom-[-10%] left-[30%] w-[60vw] h-[40vw] max-w-[700px] max-h-[400px] bg-rose-900/40 rounded-full blur-[150px] mix-blend-screen pointer-events-none"
      />

      {/* Optional Noise Overlay for texture */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay z-0"
        style={{
          backgroundImage:
            'url("https://grainy-gradients.vercel.app/noise.svg")',
        }}
      ></div>

      {/* --- HEADER: Mixed Typography --- */}
      <header className="relative z-10 w-full max-w-7xl flex flex-col md:flex-row justify-between items-start md:items-end mb-8 pt-4">
        <div className="flex flex-col">
          <p className="text-xs tracking-[0.2em] uppercase text-neutral-400 mb-2">
            Weekly Updates
          </p>
          <div className="flex items-baseline gap-3">
            <h1 className="text-4xl md:text-5xl font-sans font-medium tracking-tight text-white leading-none">
              Cohort
            </h1>
            <h1 className="text-5xl md:text-6xl font-serif italic text-[#cce8e4] leading-none tracking-tighter">
              Chronicles.
            </h1>
          </div>
        </div>
        <p className="text-neutral-400 mt-4 md:mt-0 text-sm max-w-[200px] leading-relaxed border-l border-neutral-700 pl-4">
          My interactive learning journey through the{" "}
          <span className="text-white italic font-serif">dev stack.</span>
        </p>
      </header>

      {/* --- MAIN CONTENT AREA --- */}
      <main className="relative z-10 w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-12 items-center my-auto px-2">
        {/* LEFT: Swipeable Dark Glass Card */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center relative min-h-[600px] w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentData.id}
              style={{ x, rotate, opacity }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={handleDragEnd}
              whileDrag={{ scale: 1.02, cursor: "grabbing" }}
              // 1. WIDER & PREMIUM GLASS: Removed aspect ratio, set to max-w-2xl, added gradient glass
              className="w-full max-w-2xl bg-gradient-to-br from-white/[0.07] to-black/60 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] p-8 md:p-10 shadow-[0_30px_60px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.1)] text-white cursor-grab relative overflow-hidden flex flex-col justify-between min-h-[580px]"
              initial={{ scale: 0.95, opacity: 0, filter: "blur(10px)", y: 20 }}
              animate={{ scale: 1, opacity: 1, filter: "blur(0px)", y: 0 }}
              exit={{ scale: 0.9, opacity: 0, filter: "blur(10px)", y: -20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              <div>
                {/* Header: Scaled up slightly for the wider card */}
                <div className="flex justify-between items-end mb-8 border-b border-white/10 pb-5">
                  <div className="flex items-baseline gap-3">
                    <span className="text-sm font-sans tracking-[0.25em] text-neutral-500 uppercase">
                      Week {currentData.weekNumber}
                    </span>
                    <h2 className="text-3xl md:text-4xl font-sans font-medium text-white tracking-tight ml-2">
                      {currentData.weekTitleSans}
                    </h2>
                    <h2 className="text-4xl md:text-5xl font-serif italic text-[#cce8e4] tracking-tighter">
                      {currentData.weekTitleSerif}
                    </h2>
                  </div>
                </div>

                {/* Video Embedded */}
                {currentData.videoUrl && (
                  <div className="w-full aspect-video rounded-2xl overflow-hidden mb-8 bg-[#050505] border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)] relative group ring-1 ring-white/5">
                    <iframe
                      src={currentData.videoUrl}
                      title="Recap"
                      className="w-full h-full border-0 mix-blend-luminosity group-hover:mix-blend-normal transition-all duration-700"
                      allowFullScreen
                    />
                  </div>
                )}

                {/* Learnings: 2. NOW IN A 2-COLUMN GRID */}
                <div className="mb-8">
                  <h3 className="text-xs tracking-[0.2em] text-neutral-500 uppercase mb-4 flex items-center gap-2">
                    <span className="w-4 h-[1px] bg-neutral-600"></span>
                    Key Learnings
                  </h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 text-sm font-sans text-neutral-300">
                    {currentData.learnings.map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="text-[#cce8e4]/60 mt-1 text-[10px]">
                          ◆
                        </span>
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* 3. Edge-to-Edge Flush Footer */}
              <div className="mt-auto pt-5 border-t border-white/10 flex items-center justify-between bg-white/[0.02] -mx-8 md:-mx-10 -mb-8 md:-mb-10 p-8 md:p-10">
                <div>
                  <h4 className="text-[10px] text-neutral-500 uppercase tracking-[0.25em] mb-1.5">
                    Final Project
                  </h4>
                  <h3 className="text-base font-medium text-white tracking-wide">
                    {currentData.finalProject.title}
                  </h3>
                </div>
                <div className="flex gap-6">
                  <a
                    href={currentData.finalProject.codeLink}
                    className="text-xs font-sans tracking-[0.15em] uppercase text-neutral-400 hover:text-[#cce8e4] transition-colors border-b border-transparent hover:border-[#cce8e4] pb-1"
                  >
                    Code
                  </a>
                  <a
                    href={currentData.finalProject.demoLink}
                    className="text-xs font-sans tracking-[0.15em] uppercase text-[#cce8e4] hover:text-white transition-colors border-b border-[#cce8e4]/30 hover:border-white pb-1"
                  >
                    Live Demo
                  </a>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* RIGHT: 3D Hover Mobile Screen (Dark Glass) */}
        <div
          className="lg:col-span-5 flex justify-center items-center"
          style={{ perspective: 1200 }}
        >
          <motion.div
            whileHover={{ rotateY: -10, rotateX: 5, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="w-full max-w-[320px] aspect-[9/19] bg-[#050505]/80 backdrop-blur-xl rounded-[3rem] p-2 shadow-[0_20px_50px_rgba(0,0,0,0.8)] border border-white/10 relative flex flex-col justify-between overflow-hidden cursor-pointer"
          >
            {/* Notch */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-[#050505] rounded-b-3xl z-20 flex items-center justify-center">
              <div className="w-12 h-1 bg-neutral-800 rounded-full" />
            </div>

            {/* Inner Screen */}
            <div className="w-full h-full bg-[#0a0a0a] rounded-[2.5rem] pt-12 p-5 text-neutral-200 flex flex-col justify-between overflow-y-auto overflow-x-hidden relative border border-white/5">
              <div>
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-xl font-serif italic text-[#cce8e4] tracking-tight">
                    Notes.
                  </h3>
                  <span className="text-[10px] text-neutral-500 font-sans tracking-[0.2em] uppercase">
                    Wk {currentData.weekNumber}
                  </span>
                </div>

                <div className="space-y-4">
                  <AnimatePresence mode="popLayout">
                    {currentData.notes.map((note) => (
                      <motion.div
                        key={note.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="bg-white/5 border border-white/5 rounded-2xl p-4 flex gap-4 hover:bg-white/10 transition-colors"
                      >
                        <div className="pt-1">{getNoteIcon(note.type)}</div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium text-white truncate mb-1">
                            {note.title}
                          </h4>
                          <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed">
                            {note.content}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>

              {/* Minimal Nav Bar */}
              <div className="mt-6 pt-4 flex items-center justify-around text-neutral-600 relative">
                <button className="hover:text-white transition-colors">
                  <FileText className="w-5 h-5" />
                </button>
                <button className="hover:text-white transition-colors">
                  <Search className="w-5 h-5" />
                </button>
                <button className="hover:text-white transition-colors">
                  <Settings className="w-5 h-5" />
                </button>

                {/* Floating Action Button */}
                <button className="absolute -top-10 right-0 bg-[#cce8e4] text-[#050505] rounded-full p-3 hover:scale-110 transition-transform">
                  <Plus className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      {/* --- MINIMALIST PAGINATION FOOTER --- */}
      <footer className="relative z-10 w-full border-t border-neutral-800 pt-6 pb-2 mt-8 flex flex-col md:flex-row items-center justify-between gap-6 text-xs font-sans uppercase tracking-[0.2em] text-neutral-500">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="flex items-center gap-2 hover:text-white disabled:opacity-30 transition-colors group"
        >
          <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          Prev
        </button>

        <div className="flex items-center gap-3">
          {COHORT_DATA.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                index === currentIndex
                  ? "w-8 bg-[#cce8e4]"
                  : "w-1.5 bg-neutral-800 hover:bg-neutral-600"
              }`}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          disabled={currentIndex === COHORT_DATA.length - 1}
          className="flex items-center gap-2 hover:text-white disabled:opacity-30 transition-colors group"
        >
          Next
          <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </button>
      </footer>
    </div>
  );
}
