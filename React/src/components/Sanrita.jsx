import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

const projects = [
  {
    name: "ALEXIS JAY ADRIAN",
    tags: "ART DIRECTION + DESIGN + BRANDING + DEVELOPMENT",
    left: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1400&q=85",
    right:
      "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&w=1500&q=85",
  },
  {
    name: "S.R.W+",
    tags: "BRANDING + ART DIRECTION + CONTENT CREATION + DESIGN + DEVELOPMENT",
    left: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1400&q=85",
    right:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1500&q=85",
  },
  {
    name: "PODIUM GLOBAL",
    tags: "ART DIRECTION + DESIGN + DEVELOPMENT",
    left: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1400&q=85",
    right:
      "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=1500&q=85",
  },
  {
    name: "ELDER GROWN",
    tags: "DESIGN + BRANDING + CONTENT CREATION + VIDEO",
    left: "https://images.unsplash.com/photo-1445307806294-bff7f67ff225?auto=format&fit=crop&w=1400&q=85",
    right:
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1500&q=85",
  },
];

function Header({ showTrails, onToggle }) {
  return (
    <header className="sr-header">
      <svg
        className="sr-logo"
        viewBox="0 0 384 86"
        role="img"
        aria-label="San Rita"
      >
        <text x="0" y="66">
          SAN RITA
        </text>
      </svg>

      <button className="trail-toggle" type="button" onClick={onToggle}>
        <span>{showTrails ? "HIDE TRAILS" : "SHOW TRAILS"}</span>
        <svg viewBox="0 0 28 28" aria-hidden="true">
          <path d="M14 3v22M3 14h22" />
          <path d="M8 22 14 3l6 19" />
        </svg>
      </button>
    </header>
  );
}

function TopographicMap({ y }) {
  const paths = useMemo(
    () =>
      Array.from({ length: 54 }, (_, index) => {
        const base = 18 + index * 19;
        const amp = 22 + (index % 8) * 5;
        const drift = (index % 6) * 36;
        return `M -90 ${base} C ${80 + drift} ${base - amp}, ${180 + drift} ${base + amp}, ${
          315 + drift
        } ${base - 6} S ${520 + drift} ${base + amp}, ${690 + drift} ${base - 10} S ${
          910 + drift
        } ${base - amp}, ${1110 + drift} ${base + 9} S ${1370 + drift} ${base + amp}, 1620 ${
          base - 8
        } S 1810 ${base - amp}, 2030 ${base + 7}`;
      }),
    [],
  );

  return (
    <motion.div className="topo-wrap" style={{ y }}>
      <svg
        className="topo"
        viewBox="0 0 1920 980"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <g>
          {paths.map((d, index) => (
            <path key={index} d={d} />
          ))}
        </g>
        <g transform="translate(35 52) rotate(-8)">
          {Array.from({ length: 18 }, (_, index) => (
            <ellipse
              key={index}
              cx="250"
              cy="260"
              rx={72 + index * 26}
              ry={42 + index * 15}
              transform={`rotate(${index * 9} 250 260)`}
            />
          ))}
        </g>
        <g transform="translate(1260 18) rotate(-13)">
          {Array.from({ length: 20 }, (_, index) => (
            <ellipse
              key={index}
              cx="250"
              cy="220"
              rx={62 + index * 22}
              ry={34 + index * 14}
              transform={`rotate(${index * 8} 250 220)`}
            />
          ))}
        </g>
      </svg>
    </motion.div>
  );
}

function TerrainMask() {
  return (
    <svg
      className="terrain-mask"
      viewBox="0 0 1920 980"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <filter id="softCutout">
          <feGaussianBlur stdDeviation="26" />
        </filter>
        <mask id="projectImageCuts">
          <rect width="1920" height="980" fill="white" />
          <g filter="url(#softCutout)">
            <rect
              x="-20"
              y="82"
              width="775"
              height="545"
              rx="210"
              fill="black"
            />
            <rect
              x="920"
              y="352"
              width="940"
              height="438"
              rx="210"
              fill="black"
            />
          </g>
          <rect
            x="30"
            y="126"
            width="690"
            height="452"
            rx="170"
            fill="black"
            opacity="0.9"
          />
          <rect
            x="990"
            y="388"
            width="805"
            height="345"
            rx="170"
            fill="black"
            opacity="0.9"
          />
        </mask>
        <radialGradient id="terrainShade" cx="55%" cy="48%" r="78%">
          <stop offset="0%" stopColor="#254331" stopOpacity="0.9" />
          <stop offset="58%" stopColor="#0b1711" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#020605" stopOpacity="1" />
        </radialGradient>
      </defs>
      <rect
        width="1920"
        height="980"
        fill="url(#terrainShade)"
        mask="url(#projectImageCuts)"
      />
      <rect
        width="1920"
        height="980"
        fill="#06100c"
        opacity="0.45"
        mask="url(#projectImageCuts)"
      />
    </svg>
  );
}

function AnimatedSmog() {
  const blobs = [
    {
      className: "smog-blob smog-blob-a",
      animate: {
        x: ["-8%", "8%", "-8%"],
        y: ["0%", "3%", "0%"],
        opacity: [0.22, 0.48, 0.22],
      },
      transition: { duration: 18, repeat: Infinity, ease: "easeInOut" },
    },
    {
      className: "smog-blob smog-blob-b",
      animate: {
        x: ["6%", "-7%", "6%"],
        y: ["2%", "-2%", "2%"],
        opacity: [0.2, 0.44, 0.2],
      },
      transition: { duration: 22, repeat: Infinity, ease: "easeInOut" },
    },
    {
      className: "smog-blob smog-blob-c",
      animate: {
        x: ["-5%", "10%", "-5%"],
        y: ["-2%", "1%", "-2%"],
        opacity: [0.16, 0.34, 0.16],
      },
      transition: { duration: 14, repeat: Infinity, ease: "easeInOut" },
    },
  ];

  return (
    <div className="smog-layer" aria-hidden="true">
      {blobs.map((blob) => (
        <motion.div
          key={blob.className}
          className={blob.className}
          animate={blob.animate}
          transition={blob.transition}
        />
      ))}
      <motion.div
        className="smog-vignette"
        animate={{ opacity: [0.56, 0.74, 0.56] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

function ProjectImages({ project, direction, leftY, rightY, activeIndex }) {
  return (
    <>
      <AnimatePresence initial={false}>
        <motion.div
          key={`${project.left}-left`}
          className="photo-cut photo-left"
          style={{ backgroundImage: `url(${project.left})`, y: leftY }}
          initial={{
            opacity: 0,
            scale: 1.18,
            x: direction > 0 ? -84 : 54,
            rotate: -2,
          }}
          animate={{ opacity: 1, scale: 1, x: 0, rotate: 0 }}
          exit={{ opacity: 0, scale: 1.1, x: direction > 0 ? 48 : -48 }}
          transition={{ duration: 1.45, ease: [0.16, 1, 0.3, 1] }}
        />
        <motion.div
          key={`${project.right}-right`}
          className="photo-cut photo-right"
          style={{ backgroundImage: `url(${project.right})`, y: rightY }}
          initial={{
            opacity: 0,
            scale: 1.18,
            x: direction > 0 ? 92 : -62,
            rotate: 2,
          }}
          animate={{ opacity: 1, scale: 1, x: 0, rotate: 0 }}
          exit={{ opacity: 0, scale: 1.1, x: direction > 0 ? -52 : 52 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.04 }}
        />
      </AnimatePresence>

      <AnimatePresence initial={false}>
        <motion.div
          key={`image-glow-${activeIndex}`}
          className="image-glow-sweep"
          initial={{ opacity: 0, scale: 0.72, x: direction > 0 ? -90 : 90 }}
          animate={{ opacity: [0, 0.78, 0], scale: [0.72, 1.32, 1.9], x: 0 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 1.35,
            times: [0, 0.34, 1],
            ease: [0.16, 1, 0.3, 1],
          }}
        />
      </AnimatePresence>
    </>
  );
}

function TrailPath({ show, y }) {
  if (!show) return null;

  return (
    <motion.svg
      className="main-trail"
      viewBox="0 0 100 1000"
      preserveAspectRatio="none"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      style={{ y }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      aria-hidden="true"
    >
      <motion.path
        d="M52 -92 C34 -22 73 35 44 102 S71 184 42 252 76 332 39 410 70 485 43 568 78 650 40 735 70 826 42 912 69 1002 39 1125"
        fill="none"
        stroke="currentColor"
        strokeWidth="4.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </motion.svg>
  );
}

function EyeMarker() {
  return (
    <motion.div
      className="eye-marker"
      animate={{ scale: [1, 1.06, 1], rotate: [0, -3, 0] }}
      transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
    >
      <svg viewBox="0 0 70 54" aria-hidden="true">
        <path d="M5 28C13 10 26 3 41 7c11 3 19 11 25 22-9 13-20 19-34 17C19 44 10 38 5 28Z" />
        <circle cx="35" cy="27" r="9" />
        <circle cx="35" cy="27" r="3" />
      </svg>
    </motion.div>
  );
}

function ProjectTitle({ project, direction, y }) {
  return (
    <motion.div className="project-title-shell" style={{ y }}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.section
          className="project-title-block"
          key={project.name}
          initial={{
            opacity: 0,
            y: direction > 0 ? 42 : -42,
            filter: "blur(10px)",
          }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{
            opacity: 0,
            y: direction > 0 ? -34 : 34,
            filter: "blur(8px)",
          }}
          transition={{ duration: 0.72, ease: [0.16, 1, 0.3, 1] }}
        >
          <EyeMarker />
          <div>
            <h1>{project.name}</h1>
            <p>
              {project.tags} <span className="arrow">-&gt;</span>
            </p>
          </div>
        </motion.section>
      </AnimatePresence>
    </motion.div>
  );
}

function Compass() {
  return (
    <svg className="compass" viewBox="0 0 70 70" aria-hidden="true">
      <path d="M35 3v13M35 54v13M3 35h13M54 35h13" />
      <path d="M42 24 37 47 28 40 21 47 28 22Z" />
    </svg>
  );
}

export default function SanRitaProjects() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showTrails, setShowTrails] = useState(true);
  const [trailOffset, setTrailOffset] = useState(0);
  const [direction, setDirection] = useState(1);
  const trailMotion = useMotionValue(0);
  const trailY = useSpring(trailMotion, {
    stiffness: 54,
    damping: 20,
    mass: 1.15,
  });
  const topoY = useTransform(trailY, (value) => value * -0.045);
  const leftImageY = useTransform(trailY, (value) => value * -0.08);
  const rightImageY = useTransform(trailY, (value) => value * -0.12);
  const titleY = useTransform(trailY, (value) => value * -0.035);
  const scrollLock = useRef(false);
  const wheelDelta = useRef(0);
  const touchStart = useRef(0);
  const activeProject = projects[activeIndex];

  useEffect(() => {
    trailMotion.set(trailOffset * 116);
  }, [trailMotion, trailOffset]);

  const goToProject = (step) => {
    setDirection(step);
    setTrailOffset((offset) => offset + step);
    setActiveIndex((index) => {
      const next = index + step;
      if (next < 0) return projects.length - 1;
      if (next >= projects.length) return 0;
      return next;
    });
  };

  const handleWheel = (event) => {
    wheelDelta.current += event.deltaY;
    if (Math.abs(wheelDelta.current) < 95 || scrollLock.current) return;
    scrollLock.current = true;
    goToProject(wheelDelta.current > 0 ? 1 : -1);
    wheelDelta.current = 0;
    window.setTimeout(() => {
      scrollLock.current = false;
    }, 720);
  };

  const handleTouchStart = (event) => {
    touchStart.current = event.touches[0].clientY;
  };

  const handleTouchEnd = (event) => {
    const distance = touchStart.current - event.changedTouches[0].clientY;
    if (Math.abs(distance) > 46) goToProject(distance > 0 ? 1 : -1);
  };

  const goToDot = (index) => {
    if (index === activeIndex) return;
    const step = index > activeIndex ? 1 : -1;
    setDirection(step);
    setTrailOffset((offset) => offset + index - activeIndex);
    setActiveIndex(index);
  };

  return (
    <main
      className="sanrita-page"
      onWheel={handleWheel}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <style>{css}</style>

      <ProjectImages
        project={activeProject}
        direction={direction}
        leftY={leftImageY}
        rightY={rightImageY}
        activeIndex={activeIndex}
      />
      <TerrainMask />
      <AnimatedSmog />
      <TopographicMap y={topoY} />
      <TrailPath show={showTrails} y={trailY} />

      <Header
        showTrails={showTrails}
        onToggle={() => setShowTrails((value) => !value)}
      />
      <ProjectTitle project={activeProject} direction={direction} y={titleY} />

      <p className="intro">
        EVERY PROJECT IS A JOURNEY.
        <br />
        HERE ARE THE STORIES WE'VE
        <br />
        SHAPED ALONG THE WAY.
      </p>

      <nav className="project-dots" aria-label="Projects">
        {projects.map((project, index) => (
          <button
            key={project.name}
            className={index === activeIndex ? "is-active" : ""}
            type="button"
            onClick={() => goToDot(index)}
            aria-label={project.name}
          />
        ))}
      </nav>

      <div className="scroll-hint" aria-hidden="true">
        SCROLL
      </div>
      <Compass />
    </main>
  );
}

const css = `
@import url("https://fonts.googleapis.com/css2?family=Anton&family=IBM+Plex+Mono:wght@500;700&display=swap");

* {
  box-sizing: border-box;
}

html,
body,
#root {
  min-height: 100%;
  margin: 0;
}

body {
  background: #07100d;
}

button {
  font: inherit;
}

.sanrita-page {
  position: relative;
  min-height: 100vh;
  overflow: hidden;
  isolation: isolate;
  background:
    radial-gradient(ellipse at 58% 48%, rgba(44, 67, 54, 0.44), transparent 48%),
    linear-gradient(135deg, #121f18 0%, #07100d 58%, #020706 100%);
  color: #dfffcb;
  font-family: "IBM Plex Mono", Consolas, monospace;
}

.sanrita-page::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  background:
    linear-gradient(180deg, rgba(0, 0, 0, 0.42), transparent 34%, rgba(4, 12, 9, 0.52) 100%),
    radial-gradient(ellipse at 69% 48%, rgba(218, 255, 196, 0.03) 0 20%, rgba(33, 55, 42, 0.26) 50%, rgba(8, 17, 13, 0.7) 82%);
}

.sanrita-page::after {
  content: "";
  position: absolute;
  inset: -50%;
  z-index: 6;
  opacity: 0.13;
  pointer-events: none;
  background-image:
    linear-gradient(0deg, rgba(255, 255, 255, 0.18) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 0, 0, 0.12) 1px, transparent 1px);
  background-size: 5px 5px, 9px 9px;
  mix-blend-mode: soft-light;
}

.sr-header {
  position: relative;
  z-index: 20;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: clamp(24px, 2.2vw, 42px) clamp(20px, 2.7vw, 52px);
}

.sr-logo {
  width: clamp(230px, 20vw, 382px);
  height: auto;
  overflow: visible;
  filter: drop-shadow(0 8px 12px rgba(0, 0, 0, 0.28));
}

.sr-logo text {
  fill: #dfffcb;
  font-family: "Anton", Impact, sans-serif;
  font-size: 69px;
  font-style: italic;
  letter-spacing: 0;
  transform: skewX(-12deg);
}

.trail-toggle {
  position: relative;
  display: flex;
  align-items: center;
  gap: 82px;
  height: 62px;
  min-width: 296px;
  padding: 0 25px;
  border: 0;
  background: #dfffcb;
  color: #0e1712;
  font-weight: 700;
  font-size: 16px;
  cursor: pointer;
  box-shadow: 0 18px 34px rgba(0, 0, 0, 0.34), 0 0 28px rgba(186, 255, 162, 0.08);
  clip-path: polygon(0 0, calc(100% - 15px) 0, 100% 15px, 100% 100%, 0 100%);
}

.trail-toggle svg {
  width: 23px;
  height: 23px;
  fill: none;
  stroke: currentColor;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.photo-cut {
  position: absolute;
  z-index: 1;
  background-position: center;
  background-size: cover;
  filter: saturate(0.92) contrast(1.04) brightness(0.84);
  will-change: transform, opacity;
  overflow: hidden;
}

.photo-cut::before {
  content: "";
  position: absolute;
  inset: -2px;
  z-index: 1;
  opacity: 0.18;
  pointer-events: none;
  background-image:
    radial-gradient(circle at 22% 18%, rgba(255, 255, 255, 0.24) 0 1px, transparent 1.5px),
    radial-gradient(circle at 74% 61%, rgba(0, 0, 0, 0.24) 0 1px, transparent 1.4px),
    linear-gradient(115deg, rgba(255, 255, 255, 0.1), rgba(0, 0, 0, 0.08));
  background-size: 4px 4px, 5px 5px, 100% 100%;
  mix-blend-mode: overlay;
}

.photo-cut::after {
  content: "";
  position: absolute;
  inset: 0;
  z-index: 2;
  pointer-events: none;
  background:
    radial-gradient(ellipse at center, transparent 0 44%, rgba(2, 7, 6, 0.22) 72%, rgba(0, 0, 0, 0.56) 100%),
    linear-gradient(180deg, rgba(0, 0, 0, 0.08), rgba(0, 0, 0, 0.24));
}

.photo-left {
  top: 6vh;
  left: -1vw;
  width: 43vw;
  height: 61vh;
  background-position: 44% 37%;
}

.photo-right {
  right: -1vw;
  bottom: 7vh;
  width: 58vw;
  height: 56vh;
  background-position: center 45%;
}

.image-glow-sweep {
  position: absolute;
  left: 24vw;
  top: 18vh;
  z-index: 2;
  width: 58vw;
  height: 64vh;
  pointer-events: none;
  border-radius: 50%;
  background:
    radial-gradient(ellipse at 38% 46%, rgba(220, 255, 191, 0.32) 0 9%, rgba(117, 178, 116, 0.2) 22%, transparent 56%),
    radial-gradient(ellipse at 68% 58%, rgba(150, 211, 176, 0.24) 0 12%, rgba(58, 109, 76, 0.2) 30%, transparent 62%);
  filter: blur(38px);
  mix-blend-mode: screen;
  will-change: transform, opacity;
}

.terrain-mask {
  position: absolute;
  inset: 0;
  z-index: 3;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.smog-layer {
  position: absolute;
  inset: -12vh -10vw;
  z-index: 4;
  overflow: hidden;
  pointer-events: none;
  mix-blend-mode: soft-light;
}

.smog-blob,
.smog-vignette {
  position: absolute;
  pointer-events: none;
  will-change: transform, opacity;
}

.smog-blob {
  filter: blur(46px);
  border-radius: 999px;
  mix-blend-mode: screen;
}

.smog-blob-a {
  left: -8vw;
  top: 10vh;
  width: 78vw;
  height: 42vh;
  background:
    radial-gradient(ellipse at 38% 48%, rgba(178, 211, 184, 0.34) 0 14%, rgba(87, 126, 98, 0.2) 38%, transparent 72%),
    radial-gradient(ellipse at 74% 50%, rgba(207, 235, 205, 0.18), transparent 58%);
}

.smog-blob-b {
  right: -14vw;
  top: 24vh;
  width: 88vw;
  height: 52vh;
  background:
    radial-gradient(ellipse at 56% 42%, rgba(157, 190, 172, 0.32) 0 18%, rgba(70, 105, 83, 0.22) 44%, transparent 76%),
    radial-gradient(ellipse at 22% 72%, rgba(210, 231, 205, 0.12), transparent 54%);
}

.smog-blob-c {
  left: 20vw;
  bottom: -12vh;
  width: 72vw;
  height: 46vh;
  background:
    radial-gradient(ellipse at 46% 42%, rgba(130, 166, 145, 0.28) 0 20%, rgba(35, 70, 50, 0.2) 48%, transparent 74%),
    radial-gradient(ellipse at 72% 58%, rgba(222, 242, 216, 0.12), transparent 52%);
}

.smog-vignette {
  inset: 0;
  background:
    radial-gradient(ellipse at 55% 47%, rgba(2, 7, 6, 0.26) 0 22%, rgba(3, 10, 8, 0.06) 34%, transparent 50%),
    radial-gradient(ellipse at center, transparent 0 42%, rgba(2, 7, 6, 0.48) 78%, rgba(0, 0, 0, 0.68) 100%);
  filter: blur(16px);
  mix-blend-mode: multiply;
}

.topo-wrap {
  position: absolute;
  inset: -2px;
  z-index: 5;
  will-change: transform;
}

.topo {
  position: absolute;
  inset: -2px;
  width: 100%;
  height: 100%;
  color: rgba(172, 207, 158, 0.13);
  opacity: 0.9;
}

.topo path,
.topo ellipse {
  fill: none;
  stroke: currentColor;
  stroke-width: 1.2;
  vector-effect: non-scaling-stroke;
}

.main-trail {
  position: absolute;
  top: -18vh;
  left: 30.6vw;
  z-index: 8;
  width: 5.5vw;
  height: 138vh;
  color: rgba(207, 255, 187, 0.68);
  filter: drop-shadow(0 0 6px rgba(198, 255, 177, 0.2));
  will-change: transform;
}

.project-title-shell {
  position: absolute;
  left: 30.6vw;
  top: 39.4vh;
  z-index: 14;
  will-change: transform;
}

.project-title-block {
  position: relative;
  display: flex;
  align-items: center;
  gap: 26px;
  color: #dfffcb;
}

.project-title-block h1 {
  margin: 0;
  font-family: "Anton", Impact, sans-serif;
  font-size: clamp(48px, 4.65vw, 88px);
  line-height: 0.88;
  font-weight: 400;
  letter-spacing: 0;
  text-transform: uppercase;
}

.project-title-block p {
  margin: 15px 0 0;
  font-size: clamp(10px, 0.72vw, 13px);
  font-weight: 700;
  color: rgba(223, 255, 203, 0.78);
  white-space: nowrap;
}

.arrow {
  display: inline-block;
  margin-left: 8px;
  font-size: 28px;
  line-height: 0;
  vertical-align: -5px;
  font-family: Arial, sans-serif;
  font-weight: 400;
}

.eye-marker {
  width: clamp(54px, 4vw, 78px);
  height: clamp(54px, 4vw, 78px);
  display: grid;
  place-items: center;
  flex: 0 0 auto;
  border-radius: 50%;
  border: 5px solid #dfffcb;
  background: rgba(4, 12, 9, 0.94);
  box-shadow: 0 0 0 3px rgba(184, 255, 160, 0.1), 0 13px 25px rgba(0, 0, 0, 0.36), 0 0 24px rgba(188, 255, 167, 0.16);
}

.eye-marker svg {
  width: 42px;
  fill: #dfffcb;
}

.eye-marker circle:first-of-type {
  fill: #07100d;
}

.intro {
  position: absolute;
  left: clamp(20px, 1.3vw, 28px);
  bottom: clamp(20px, 2.4vw, 42px);
  z-index: 14;
  margin: 0;
  max-width: 420px;
  color: rgba(226, 239, 219, 0.78);
  font-size: clamp(16px, 1.05vw, 22px);
  line-height: 1.28;
  font-weight: 500;
  text-transform: uppercase;
}

.project-dots {
  position: absolute;
  left: 50%;
  bottom: 38px;
  z-index: 16;
  display: flex;
  gap: 13px;
  transform: translateX(-50%);
}

.project-dots button {
  width: 11px;
  height: 11px;
  padding: 0;
  border: 1px solid rgba(223, 255, 203, 0.72);
  border-radius: 999px;
  background: transparent;
  cursor: pointer;
}

.project-dots button.is-active {
  background: #dfffcb;
}

.scroll-hint {
  position: absolute;
  left: 50%;
  bottom: 72px;
  z-index: 15;
  color: rgba(226, 239, 219, 0.58);
  font-size: 11px;
  font-weight: 700;
  transform: translateX(-50%);
}

.scroll-hint::after {
  content: "";
  display: block;
  width: 1px;
  height: 26px;
  margin: 8px auto 0;
  background: currentColor;
  animation: scrollPulse 1.25s ease-in-out infinite;
}

@keyframes scrollPulse {
  0% {
    transform: scaleY(0.2);
    transform-origin: top;
    opacity: 0.25;
  }
  50% {
    transform: scaleY(1);
    opacity: 1;
  }
  100% {
    transform: scaleY(0.2);
    transform-origin: bottom;
    opacity: 0.25;
  }
}

.compass {
  position: absolute;
  right: 22px;
  bottom: 20px;
  z-index: 15;
  width: 76px;
  height: 76px;
  fill: none;
  stroke: rgba(226, 239, 219, 0.72);
  stroke-width: 4;
  stroke-linecap: round;
  stroke-linejoin: round;
}

@media (max-width: 900px) {
  .sr-header {
    padding: 22px 18px;
  }

  .sr-logo {
    width: 210px;
  }

  .trail-toggle {
    min-width: auto;
    width: 160px;
    height: 52px;
    gap: 18px;
    padding: 0 16px;
    font-size: 12px;
  }

  .photo-left {
    top: 12vh;
    left: -16vw;
    width: 82vw;
    height: 42vh;
  }

  .photo-right {
    right: -38vw;
    width: 132vw;
    height: 50vh;
    bottom: 12vh;
  }

  .image-glow-sweep {
    left: 4vw;
    top: 24vh;
    width: 96vw;
    height: 52vh;
    filter: blur(32px);
  }

  .smog-layer {
    inset: -8vh -24vw;
  }

  .smog-blob {
    filter: blur(34px);
  }

  .smog-blob-a {
    left: -26vw;
    top: 14vh;
    width: 124vw;
    height: 34vh;
  }

  .smog-blob-b {
    right: -38vw;
    top: 34vh;
    width: 138vw;
    height: 40vh;
  }

  .smog-blob-c {
    left: -12vw;
    bottom: 0;
    width: 122vw;
    height: 34vh;
  }

  .main-trail {
    left: 31vw;
    top: -18vh;
    width: 14vw;
    height: 138vh;
  }

  .project-title-shell {
    left: 18px;
    right: 18px;
    top: 40vh;
  }

  .project-title-block {
    gap: 14px;
  }

  .project-title-block h1 {
    font-size: clamp(38px, 12vw, 70px);
  }

  .project-title-block p {
    white-space: normal;
    font-size: 10px;
  }

  .intro {
    max-width: 330px;
    font-size: 14px;
  }

  .project-dots,
  .scroll-hint {
    display: none;
  }
}
`;
