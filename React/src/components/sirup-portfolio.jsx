"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useScroll,
  useTransform,
} from "framer-motion";
import Profile from "../assets/image.png";

// ─────────────────────────────────────────────────────────────
// ✏️  EDIT EVERYTHING HERE
// ─────────────────────────────────────────────────────────────
const DATA = {
  wordmark: "JATIN SHARMA",
  years: "2020 – 2025",
  nthYear: "5",
  captionDate: "2020.01",
  captionText: "First project\nlaunched online",
  shortBio:
    "A developer and designer with roots in interactive experiences, building work both locally and internationally. Expanding into various creative fields.",
  name: "JATIN\nSHARMA",
  works: [
    {
      id: "01",
      cat: "DESIGN",
      title: "Brand Identity System",
      tags: "VISUAL · TYPOGRAPHY · COLOR",
      image:
        "https://images.pexels.com/photos/33949901/pexels-photo-33949901.jpeg",
    },
    {
      id: "02",
      cat: "DEVELOPMENT",
      title: "Web Application UI",
      tags: "REACT · NEXT.JS · TAILWIND",
      image:
        "https://images.pexels.com/photos/33987072/pexels-photo-33987072.jpeg",
    },
    {
      id: "03",
      cat: "MOTION",
      title: "Interactive Experience",
      tags: "THREE.JS · WEBGL · GSAP",
      image:
        "https://images.pexels.com/photos/33987076/pexels-photo-33987076.jpeg",
    },
    {
      id: "03",
      cat: "MOTION",
      title: "Interactive Experience",
      tags: "THREE.JS · WEBGL · GSAP",
      image:
        "https://images.pexels.com/photos/33986933/pexels-photo-33986933.jpeg",
    },
    {
      id: "03",
      cat: "MOTION",
      title: "Interactive Experience",
      tags: "THREE.JS · WEBGL · GSAP",
      image:
        "https://images.pexels.com/photos/33948499/pexels-photo-33948499.jpeg",
    },
    {
      id: "03",
      cat: "MOTION",
      title: "Interactive Experience",
      tags: "THREE.JS · WEBGL · GSAP",
      image:
        "https://images.pexels.com/photos/33986887/pexels-photo-33986887.jpeg",
    },
  ],
  aboutEst: "est. 2020 · based in your city",
  aboutBody:
    "With a design sensibility that moves between clean systems thinking and expressive visual storytelling, I build digital experiences that sit at the intersection of art and engineering. My work spans branding, interfaces, and motion — always chasing the detail that makes something feel inevitable.",
  aboutCta:
    "Currently open to select freelance collaborations and full-time opportunities.",
  footerName: "Your Name",
  socials: [
    { label: "Twitter", href: "#" },
    { label: "GitHub", href: "#" },
    { label: "Dribbble", href: "#" },
    { label: "Email", href: "mailto:you@example.com" },
  ],
};

// ─── SVG PLACEHOLDERS ────────────────────────────────────────
const CARD_SVGS = [
  <svg
    key="a"
    viewBox="0 0 200 280"
    className="w-[70%] h-auto"
    style={{ filter: "brightness(0.6) saturate(1.2)" }}
  >
    <rect width="200" height="280" fill="#1e1428" />
    <rect
      x="20"
      y="40"
      width="160"
      height="100"
      rx="8"
      fill="#3a2850"
      opacity="0.8"
    />
    <rect
      x="20"
      y="160"
      width="100"
      height="12"
      rx="4"
      fill="#604070"
      opacity="0.6"
    />
    <rect
      x="20"
      y="180"
      width="140"
      height="8"
      rx="4"
      fill="#3a2850"
      opacity="0.5"
    />
    <rect
      x="20"
      y="196"
      width="120"
      height="8"
      rx="4"
      fill="#3a2850"
      opacity="0.4"
    />
    <circle cx="160" cy="230" r="20" fill="#8060a0" opacity="0.3" />
  </svg>,
  <svg
    key="b"
    viewBox="0 0 200 280"
    className="w-[70%] h-auto"
    style={{ filter: "brightness(0.6) saturate(1.2)" }}
  >
    <rect width="200" height="280" fill="#14181e" />
    <rect
      x="15"
      y="30"
      width="80"
      height="130"
      rx="12"
      fill="#203050"
      opacity="0.8"
    />
    <rect
      x="105"
      y="30"
      width="80"
      height="60"
      rx="12"
      fill="#2a4060"
      opacity="0.7"
    />
    <rect
      x="105"
      y="100"
      width="80"
      height="60"
      rx="12"
      fill="#1a3040"
      opacity="0.7"
    />
    <rect
      x="15"
      y="175"
      width="170"
      height="70"
      rx="12"
      fill="#1a2838"
      opacity="0.8"
    />
  </svg>,
  <svg
    key="c"
    viewBox="0 0 200 280"
    className="w-[70%] h-auto"
    style={{ filter: "brightness(0.6) saturate(1.2)" }}
  >
    <rect width="200" height="280" fill="#1a1020" />
    <circle
      cx="100"
      cy="100"
      r="60"
      fill="none"
      stroke="#604070"
      strokeWidth="1"
      opacity="0.6"
    />
    <circle
      cx="100"
      cy="100"
      r="40"
      fill="none"
      stroke="#804090"
      strokeWidth="1"
      opacity="0.5"
    />
    <circle cx="100" cy="100" r="20" fill="#a060b0" opacity="0.4" />
    <rect
      x="20"
      y="185"
      width="160"
      height="10"
      rx="4"
      fill="#3a2050"
      opacity="0.6"
    />
    <rect
      x="40"
      y="205"
      width="120"
      height="10"
      rx="4"
      fill="#2a1840"
      opacity="0.5"
    />
  </svg>,
];

const FILM_SVGS = [
  { bg: "#2a2040" },
  { bg: "#1a1030" },
  { bg: "#1a2030" },
  { bg: "#281018" },
];

// ─── MOTION VARIANTS ─────────────────────────────────────────
const easeOutExpo = [0.22, 1, 0.36, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 44, filter: "blur(12px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: easeOutExpo },
  },
};

const staggerParent = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

// ─── REVEAL WRAPPER ───────────────────────────────────────────
function Reveal({ children, delay = 0 }) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-90px" }}
      transition={{ delay: delay / 1000 }}
    >
      {children}
    </motion.div>
  );
}

// ─── MARQUEE ─────────────────────────────────────────────────
function Marquee() {
  const words = ["Portfolio", "Design", "Development", "Creative"];
  const all = [...words, ...words];

  return (
    <div
      className="overflow-hidden py-6 border-y"
      style={{ borderColor: "rgba(240,232,224,0.06)" }}
    >
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 18, ease: "linear", repeat: Infinity }}
        style={{ display: "flex", gap: 0, whiteSpace: "nowrap" }}
      >
        {all.map((w, i) => (
          <motion.span
            key={i}
            whileHover={{ color: "rgba(232,180,160,0.28)", y: -4 }}
            transition={{ duration: 0.25 }}
            style={{
              fontFamily: "'Playfair Display',serif",
              fontWeight: 900,
              fontStyle: "italic",
              fontSize: 48,
              color: "rgba(240,232,224,0.06)",
              padding: "0 32px",
              flexShrink: 0,
              letterSpacing: "-0.02em",
            }}
          >
            {w}&nbsp;<span style={{ color: "rgba(232,180,160,0.15)" }}>✦</span>
            &nbsp;
          </motion.span>
        ))}
      </motion.div>
    </div>
  );
}

// ─── WORK CARD ───────────────────────────────────────────────
function WorkCard({ work, svgEl, index }) {
  return (
    <motion.article
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      whileHover="hover"
      style={{
        aspectRatio: "3/4",
        background: "linear-gradient(135deg,#2a2040 0%,#1a1030 100%)",
        position: "relative",
        overflow: "hidden",
        cursor: "pointer",
        transformOrigin: "center",
      }}
      transition={{ delay: index * 0.08 }}
    >
      <motion.div
        variants={{ hover: { scale: 0.98 } }}
        transition={{ duration: 0.45, ease: easeOutExpo }}
        style={{ position: "absolute", inset: 0 }}
      >
        {work.image ? (
          <motion.img
            src={work.image}
            alt={work.title}
            className="absolute inset-0 w-full h-full object-cover"
            style={{ filter: "brightness(0.65)" }}
            variants={{ hover: { scale: 1.08, filter: "brightness(0.78)" } }}
            transition={{ duration: 0.8, ease: easeOutExpo }}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            {svgEl}
          </div>
        )}
      </motion.div>

      <motion.div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 50% 35%, rgba(232,180,160,0.14), transparent 35%)",
          opacity: 0,
        }}
        variants={{ hover: { opacity: 1 } }}
        transition={{ duration: 0.45 }}
      />

      <motion.div
        className="absolute inset-x-0 bottom-0 p-6"
        initial={{ opacity: 0, y: 22 }}
        variants={{ hover: { opacity: 1, y: 0 } }}
        transition={{ duration: 0.45, ease: easeOutExpo }}
        style={{
          background:
            "linear-gradient(to top,rgba(10,8,20,0.95) 0%,transparent 100%)",
        }}
      >
        <p
          style={{
            fontFamily: "'DM Mono',monospace",
            fontSize: 10,
            letterSpacing: "0.25em",
            color: "rgba(232,180,160,0.6)",
            marginBottom: 6,
          }}
        >
          {work.id} / {work.cat}
        </p>
        <p
          style={{
            fontFamily: "'Playfair Display',serif",
            fontWeight: 700,
            fontSize: 20,
            color: "#f0e8e0",
            lineHeight: 1.2,
          }}
        >
          {work.title}
        </p>
        <p
          style={{
            fontFamily: "'DM Mono',monospace",
            fontSize: 9,
            letterSpacing: "0.2em",
            color: "rgba(232,180,160,0.5)",
            marginTop: 4,
          }}
        >
          {work.tags}
        </p>
      </motion.div>
    </motion.article>
  );
}

// ─── FILM FRAME ──────────────────────────────────────────────
function FilmFrame({ bg, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22, rotate: -4 }}
      animate={{ opacity: 1, y: 0, rotate: 0 }}
      whileHover={{
        scale: 1.1,
        rotate: index % 2 === 0 ? -2 : 2,
        borderColor: "rgba(232,180,160,0.7)",
        y: -8,
      }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 18,
        delay: 0.8 + index * 0.08,
      }}
      style={{
        width: "clamp(70px,12vw,110px)",
        aspectRatio: "3/4",
        flexShrink: 0,
        border: "2px solid rgba(240,232,224,0.25)",
        background: bg,
        position: "relative",
        overflow: "hidden",
        cursor: "pointer",
      }}
    >
      <motion.img
        src="https://images.unsplash.com/photo-1621761484409-ce4ee9b21dfc?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHRhdHRvJTIwZ3V5fGVufDB8fDB8fHww"
        alt="film frame"
        className="absolute inset-0 w-full h-full object-cover"
        whileHover={{ scale: 1.12 }}
        transition={{ duration: 0.5, ease: easeOutExpo }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to top, rgba(0,0,0,0.25), transparent)",
        }}
      />
    </motion.div>
  );
}

// ─── ARCH PORTAL ─────────────────────────────────────────────
function ArchPortal() {
  const { scrollYProgress } = useScroll();
  const portraitY = useTransform(scrollYProgress, [0, 0.35], [0, -70]);
  const textY = useTransform(scrollYProgress, [0, 0.35], [0, 50]);

  const archStyle = {
    width: "100%",
    aspectRatio: "3/4",
    position: "relative",
    overflow: "hidden",
    borderRadius: "50% 50% 0 0 / 35% 35% 0 0",
    background: `
     radial-gradient(
  circle at 25% 35%,
  rgba(210, 235, 255, 0.28) 0%,
  rgba(165, 205, 255, 0.22) 18%,
  rgba(90, 140, 220, 0.16) 42%,
  rgba(28, 44, 88, 0.72) 70%,
  rgba(8, 12, 24, 1) 100%
)
    `,
    boxShadow:
      "0 0 70px rgba(60,120,255,0.08), inset 0 0 90px rgba(0,0,0,0.55)",
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92, y: 70, filter: "blur(12px)" }}
      animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 1.15, ease: easeOutExpo }}
      style={{
        position: "relative",
        width: "min(680px,95vw)",
        margin: "0 auto",
      }}
    >
      <motion.div
        initial={{ opacity: 0, x: -70 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.1, delay: 0.35, ease: easeOutExpo }}
        style={{
          position: "absolute",
          bottom: "-4%",
          left: "-34%",
          zIndex: 10,
          fontFamily: "'Playfair Display',serif",
          fontWeight: 900,
          fontSize: "clamp(50px,12vw,110px)",
          color: "#f0e8e0",
          letterSpacing: "-0.03em",
          lineHeight: 0.85,
          whiteSpace: "nowrap",
          textShadow: "0 4px 30px rgba(0,0,0,0.4)",
          userSelect: "none",
          pointerEvents: "none",
          zIndex: 30,
        }}
      >
        WORKS
      </motion.div>

      <motion.div
        style={{ ...archStyle, zIndex: 20 }}
        whileHover={{ scale: 1.015 }}
        transition={{ duration: 0.6, ease: easeOutExpo }}
      >
        <motion.div
          animate={{ opacity: [0.35, 0.7, 0.35], scale: [1, 1.03, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: "absolute",
            inset: -3,
            zIndex: 5,
            pointerEvents: "none",
            borderRadius: "50% 50% 0 0 / 35% 35% 0 0",
            border: "1px solid rgba(232,180,160,0.24)",
          }}
        />

        <motion.img
          src={Profile}
          alt="portrait"
          style={{
            position: "absolute",
            bottom: 0,
            left: "50%",
            x: "-50%",
            y: portraitY,
            width: "80%",
            height: "100%",
            zIndex: 20,

            filter: `
      brightness(0.78)
      contrast(1.08)
      drop-shadow(0 18px 30px rgba(0,0,0,0.45))
      drop-shadow(0 40px 80px rgba(0,0,0,0.38))
      drop-shadow(0 0 24px rgba(255,255,255,0.08))
    `,
          }}
          initial={{ opacity: 0, y: 50, scale: 1.04 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          whileHover={{
            scale: 1.03,
            y: -6,
            filter: `
      brightness(0.82)
      contrast(1.1)
      drop-shadow(0 24px 36px rgba(0,0,0,0.5))
      drop-shadow(0 50px 90px rgba(0,0,0,0.42))
      drop-shadow(0 0 32px rgba(232,180,160,0.18))
    `,
          }}
          transition={{
            duration: 1,
            delay: 0.25,
            ease: easeOutExpo,
          }}
        />

        <motion.div
          style={{
            position: "absolute",
            top: "8%",
            left: "50%",
            x: "-50%",
            y: textY,
            textAlign: "center",
            whiteSpace: "nowrap",
            zIndex: 10,
          }}
          initial={{ opacity: 0, y: -28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.45, ease: easeOutExpo }}
        >
          <span
            style={{
              fontFamily: "'Playfair Display',serif",
              fontWeight: 900,
              color: "#f0e8e0",
              letterSpacing: "-0.02em",
              lineHeight: 1,
              textShadow: "0 2px 20px rgba(0,0,0,0.5)",
              display: "block",
              fontSize: "clamp(42px,8vw,100px)",
            }}
          >
            {DATA.years}
          </span>
          <span
            style={{
              fontFamily: "'Playfair Display',serif",
              fontStyle: "italic",
              fontWeight: 900,
              fontSize: "clamp(60px,14vw,130px)",
              color: "#f0e8e0",
              lineHeight: 0.85,
              letterSpacing: "-0.04em",
              display: "block",
            }}
          >
            {DATA.nthYear}
            <em
              style={{
                fontFamily: "'Playfair Display',serif",
                fontWeight: 400,
                fontSize: "0.45em",
                verticalAlign: "super",
              }}
            >
              th
            </em>
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -28 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.65, ease: easeOutExpo }}
          style={{
            position: "absolute",
            top: "28%",
            left: "10%",
            zIndex: 10,
            fontFamily: "'DM Mono',monospace",
            fontSize: 20,
            letterSpacing: "0.08em",
            color: "rgba(240,232,224,0.45)",
            lineHeight: 1.7,
            width: 130,
          }}
        >
          {DATA.captionDate}
          <br />
          {DATA.captionText.split("\n").map((l, i) => (
            <span key={i}>
              {l}
              <br />
            </span>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.8, ease: easeOutExpo }}
          style={{
            position: "absolute",
            bottom: "30%",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 10,
            fontFamily: "'Playfair Display',serif",
            fontWeight: 900,
            fontSize: "clamp(18px,4vw,40px)",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "#f0e8e0",
            whiteSpace: "nowrap",
            textShadow: "0 2px 20px rgba(0,0,0,0.6)",
          }}
        >
          ANNIVERSARY
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.95, ease: easeOutExpo }}
          style={{
            position: "absolute",
            bottom: "5%",
            left: "1%",
            zIndex: 20,
            fontFamily: "'Libre Baskerville',serif",
            fontSize: 14,
            lineHeight: 1.8,
            color: "rgba(240,232,224,0.45)",
            width: "42%",
          }}
        >
          {DATA.shortBio}
        </motion.div>

        <motion.div
          variants={staggerParent}
          initial="hidden"
          animate="visible"
          style={{
            position: "absolute",
            left: "-5%",
            bottom: "18%",
            display: "flex",
            gap: 6,
            zIndex: 30,
          }}
        >
          {FILM_SVGS.map((f, i) => (
            <FilmFrame key={i} bg={f.bg} index={i} />
          ))}
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
        style={{
          position: "absolute",
          right: -60,
          top: "50%",
          transform: "translateY(-50%) rotate(90deg)",
          transformOrigin: "center",
          fontFamily: "'DM Mono',monospace",
          fontSize: 9,
          letterSpacing: "0.4em",
          textTransform: "uppercase",
          color: "rgba(240,232,224,0.35)",
          whiteSpace: "nowrap",
          display: "flex",
          alignItems: "center",
          gap: 12,
          zIndex: 30,
        }}
      >
        <span
          style={{
            display: "block",
            width: 30,
            height: 1,
            background: "rgba(240,232,224,0.25)",
          }}
        />
        ABOUT
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 28 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.9, delay: 1.1, ease: easeOutExpo }}
        style={{
          position: "absolute",
          right: -68,
          bottom: "15%",
          zIndex: 30,
          fontFamily: "'Playfair Display',serif",
          fontWeight: 900,
          fontSize: "clamp(24px,5vw,48px)",
          color: "#f0e8e0",
          writingMode: "vertical-rl",
          textOrientation: "mixed",
          letterSpacing: "0.05em",
          lineHeight: 1,
        }}
      >
        {DATA.name}
      </motion.div>
    </motion.div>
  );
}

// ─── ROOT COMPONENT ───────────────────────────────────────────
export default function SirupPortfolio() {
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const ringX = useSpring(cursorX, { stiffness: 120, damping: 20, mass: 0.2 });
  const ringY = useSpring(cursorY, { stiffness: 120, damping: 20, mass: 0.2 });
  const cursorRef = useRef(null);

  useEffect(() => {
    const move = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [cursorX, cursorY]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,900&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=DM+Mono:wght@300;400&display=swap');

        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        body {
          cursor: none !important;
        }

        .blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(130px);
          opacity: 0.48;
          mix-blend-mode: screen;
        }
      `}</style>

      {/* custom cursor */}
      <motion.div
        ref={cursorRef}
        style={{
          position: "fixed",
          left: cursorX,
          top: cursorY,
          width: 10,
          height: 10,
          background: "#e8b4a0",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 9999,
          x: "-50%",
          y: "-50%",
          mixBlendMode: "difference",
        }}
      />
      <motion.div
        style={{
          position: "fixed",
          left: ringX,
          top: ringY,
          width: 36,
          height: 36,
          border: "1px solid rgba(232,180,160,0.5)",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 9998,
          x: "-50%",
          y: "-50%",
        }}
      />

      <div
        style={{
          fontFamily: "'Libre Baskerville',serif",
          background: "#0e0c14",
          color: "#f0e8e0",
          minHeight: "100vh",
          overflowX: "hidden",
          position: "relative",
        }}
      >
        {/* mesh blobs */}
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 0,
            overflow: "hidden",
            pointerEvents: "none",
          }}
        >
          {[
            { w: 650, h: 650, t: "-8%", l: "-8%", c: "#3f4f8c" },
            { w: 520, h: 520, t: "10%", l: "8%", c: "#ff2f43" },
            { w: 420, h: 420, t: "24%", l: "18%", c: "#ffe6ee" },
            { w: 620, h: 620, t: "12%", r: "-6%", c: "#f6b2b2" },
            { w: 500, h: 500, b: "0%", r: "2%", c: "#d73d52" },
            { w: 800, h: 800, t: "-15%", r: "-12%", c: "#28396d" },
          ].map((b, i) => (
            <motion.div
              key={i}
              className="blob"
              animate={{
                scale: [1, 1.16, 1],
                x: [0, i % 2 === 0 ? 24 : -24, 0],
                y: [0, i % 2 === 0 ? -22 : 22, 0],
              }}
              transition={{
                duration: 9 + i,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.35,
              }}
              style={{
                width: b.w,
                height: b.h,
                top: b.t,
                left: b.l,
                right: b.r,
                bottom: b.b,
                background: `radial-gradient(circle,${b.c} 0%,transparent 70%)`,
              }}
            />
          ))}
        </div>

        {/* grain */}
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 1,
            pointerEvents: "none",
            opacity: 0.04,
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          }}
        />

        <div style={{ position: "relative", zIndex: 2 }}>
          {/* HERO */}
          <section
            style={{
              minHeight: "100vh",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "40px 24px",
              position: "relative",
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: -18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: easeOutExpo }}
              style={{
                position: "absolute",
                top: 32,
                left: "50%",
                transform: "translateX(-50%)",
                fontFamily: "'DM Mono',monospace",
                fontWeight: 300,
                fontSize: 11,
                letterSpacing: "0.4em",
                textTransform: "uppercase",
                color: "rgba(240,232,224,0.5)",
              }}
            >
              {DATA.wordmark}
            </motion.div>

            <div style={{ marginRight: 80 }}>
              <ArchPortal />
            </div>
          </section>

          <Marquee />

          {/* WORKS HEADING */}
          <Reveal>
            <div style={{ padding: "120px 24px 80px", textAlign: "center" }}>
              <div
                style={{
                  fontFamily: "'DM Mono',monospace",
                  fontSize: 10,
                  letterSpacing: "0.35em",
                  textTransform: "uppercase",
                  color: "rgba(232,180,160,0.6)",
                  marginBottom: 24,
                }}
              >
                Selected Works
              </div>
              <div
                style={{
                  fontFamily: "'Playfair Display',serif",
                  fontWeight: 900,
                  fontSize: "clamp(48px,10vw,120px)",
                  letterSpacing: "-0.03em",
                  lineHeight: 0.9,
                  color: "#f0e8e0",
                }}
              >
                What I've
                <br />
                <motion.span
                  animate={{ opacity: [0.72, 1, 0.72] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  style={{
                    fontStyle: "italic",
                    color: "rgba(232,180,160,0.8)",
                  }}
                >
                  Built
                </motion.span>
              </div>
            </div>
          </Reveal>

          {/* WORK GRID */}
          <section
            style={{
              padding: "60px 24px 120px",
              maxWidth: 900,
              margin: "0 auto",
            }}
          >
            <motion.div
              variants={staggerParent}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
                gap: 2,
              }}
            >
              {DATA.works.map((w, i) => (
                <WorkCard key={w.id} work={w} svgEl={CARD_SVGS[i]} index={i} />
              ))}
            </motion.div>
          </section>

          {/* ABOUT */}
          <Reveal delay={150}>
            <section
              style={{
                padding: "80px 24px 120px",
                maxWidth: 700,
                margin: "0 auto",
                position: "relative",
              }}
            >
              <motion.div
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.1, ease: easeOutExpo }}
                style={{
                  position: "absolute",
                  left: "-10%",
                  top: 0,
                  width: 1,
                  height: "100%",
                  transformOrigin: "top",
                  background:
                    "linear-gradient(to bottom,transparent,rgba(232,180,160,0.2) 20%,rgba(232,180,160,0.2) 80%,transparent)",
                }}
              />

              <div
                style={{
                  fontFamily: "'DM Mono',monospace",
                  fontSize: 10,
                  letterSpacing: "0.3em",
                  color: "rgba(232,180,160,0.5)",
                  marginBottom: 32,
                }}
              >
                {DATA.aboutEst}
              </div>

              <h2
                style={{
                  fontFamily: "'Playfair Display',serif",
                  fontWeight: 700,
                  fontSize: "clamp(28px,5vw,48px)",
                  lineHeight: 1.2,
                  color: "#f0e8e0",
                  marginBottom: 32,
                }}
              >
                A creative mind
                <br />
                with{" "}
                <motion.em
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{
                    duration: 3.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  style={{
                    fontStyle: "italic",
                    color: "rgba(232,180,160,0.8)",
                  }}
                >
                  deep roots
                </motion.em>
                <br />
                in digital craft.
              </h2>

              <p
                style={{
                  fontFamily: "'Libre Baskerville',serif",
                  fontSize: 14,
                  lineHeight: 2,
                  color: "rgba(240,232,224,0.55)",
                  marginBottom: 24,
                }}
              >
                {DATA.aboutBody}
              </p>
              <p
                style={{
                  fontFamily: "'Libre Baskerville',serif",
                  fontSize: 14,
                  lineHeight: 2,
                  color: "rgba(240,232,224,0.55)",
                }}
              >
                {DATA.aboutCta}
              </p>
            </section>
          </Reveal>
          <Reveal delay={150}>
            <section
              style={{
                padding: "80px 24px 120px",
                maxWidth: 700,
                margin: "0 auto",
                position: "relative",
              }}
            >
              <motion.div
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.1, ease: easeOutExpo }}
                style={{
                  position: "absolute",
                  left: "-10%",
                  top: 0,
                  width: 1,
                  height: "100%",
                  transformOrigin: "top",
                  background:
                    "linear-gradient(to bottom,transparent,rgba(232,180,160,0.2) 20%,rgba(232,180,160,0.2) 80%,transparent)",
                }}
              />

              <div
                style={{
                  fontFamily: "'DM Mono',monospace",
                  fontSize: 10,
                  letterSpacing: "0.3em",
                  color: "rgba(232,180,160,0.5)",
                  marginBottom: 32,
                }}
              >
                {DATA.aboutEst}
              </div>

              <h2
                style={{
                  fontFamily: "'Playfair Display',serif",
                  fontWeight: 700,
                  fontSize: "clamp(28px,5vw,48px)",
                  lineHeight: 1.2,
                  color: "#f0e8e0",
                  marginBottom: 32,
                }}
              >
                A creative mind
                <br />
                with{" "}
                <motion.em
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{
                    duration: 3.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  style={{
                    fontStyle: "italic",
                    color: "rgba(232,180,160,0.8)",
                  }}
                >
                  deep roots
                </motion.em>
                <br />
                in digital craft.
              </h2>

              <p
                style={{
                  fontFamily: "'Libre Baskerville',serif",
                  fontSize: 14,
                  lineHeight: 2,
                  color: "rgba(240,232,224,0.55)",
                  marginBottom: 24,
                }}
              >
                {DATA.aboutBody}
              </p>
              <p
                style={{
                  fontFamily: "'Libre Baskerville',serif",
                  fontSize: 14,
                  lineHeight: 2,
                  color: "rgba(240,232,224,0.55)",
                }}
              >
                {DATA.aboutCta}
              </p>
            </section>
          </Reveal>

          {/* FOOTER */}
          <Reveal>
            <footer
              style={{
                padding: "60px 24px",
                borderTop: "1px solid rgba(240,232,224,0.08)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: 24,
              }}
            >
              <motion.div
                whileHover={{ x: 6, color: "rgba(232,180,160,0.9)" }}
                transition={{ duration: 0.25 }}
                style={{
                  fontFamily: "'Playfair Display',serif",
                  fontWeight: 900,
                  fontStyle: "italic",
                  fontSize: 28,
                  color: "#f0e8e0",
                }}
              >
                {DATA.footerName}
              </motion.div>
              <nav style={{ display: "flex", gap: 32 }}>
                {DATA.socials.map((s) => (
                  <motion.a
                    key={s.label}
                    href={s.href}
                    whileHover={{ y: -3, color: "rgba(232,180,160,0.8)" }}
                    transition={{ duration: 0.2 }}
                    style={{
                      fontFamily: "'DM Mono',monospace",
                      fontSize: 10,
                      letterSpacing: "0.25em",
                      textTransform: "uppercase",
                      color: "rgba(240,232,224,0.4)",
                      textDecoration: "none",
                    }}
                  >
                    {s.label}
                  </motion.a>
                ))}
              </nav>
            </footer>
          </Reveal>
        </div>
      </div>
    </>
  );
}
