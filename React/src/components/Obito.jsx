import React, { useMemo } from "react";
import { motion } from "framer-motion";
import obito from "../assets/obitoAI.png";

const ObitoAssistant = () => {
  // 1. Generate Hex Data Stream background
  const hexData = useMemo(() => {
    const chars = "01ABCDEFabcdef0987654321";
    let txt = "";
    for (let i = 0; i < 800; i++) {
      txt += chars[Math.floor(Math.random() * chars.length)];
      if ((i + 1) % 40 === 0) txt += "\n";
      else txt += " ";
    }
    return txt;
  }, []);

  // 2. Generate initial particle states to prevent hydration mismatches
  const particles = useMemo(() => {
    return Array.from({ length: 35 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      dur: 4 + Math.random() * 8,
      delay: Math.random() * 8,
      size: 1 + Math.random() * 3,
      opacity: 0.3 + Math.random() * 0.5,
    }));
  }, []);

  // 3. Mandala ring configurations
  const mandalaRings = [
    { size: 120, dur: 8, dir: 1, type: "solid" },
    { size: 200, dur: 12, dir: -1, type: "solid" },
    { size: 290, dur: 16, dir: 1, type: "dashed" },
    { size: 380, dur: 20, dir: -1, type: "solid" },
    { size: 470, dur: 25, dir: 1, type: "dashed" },
    { size: 560, dur: 30, dir: -1, type: "solid" },
    { size: 650, dur: 35, dir: 1, type: "dotted" },
    { size: 740, dur: 40, dir: -1, type: "solid" },
    { size: 830, dur: 45, dir: 1, type: "dashed" },
    { size: 900, dur: 50, dir: -1, type: "solid" },
  ];

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#1a0a00] font-['Inter',sans-serif]">
      {/* Base Radial Gradient */}
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_at_50%_30%,#7a2800_0%,#4a1200_35%,#1a0800_70%,#0a0400_100%)]" />

      {/* Floating Particles */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 0, scale: 1 }}
            animate={{
              opacity: [0, p.opacity, p.opacity * 0.5, 0],
              y: [0, -1000],
              scale: [1, 1, 0.3],
            }}
            transition={{
              duration: p.dur,
              delay: p.delay,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute -bottom-3 rounded-full bg-[#ff8040]"
            style={{ left: `${p.x}%`, width: p.size, height: p.size }}
          />
        ))}
      </div>

      {/* Mandala Rings (HTML) */}
      <div className="pointer-events-none fixed left-1/2 top-1/2 h-[900px] w-[900px] -translate-x-1/2 -translate-y-1/2 opacity-[0.13]">
        {mandalaRings.map((ring, idx) => (
          <motion.div
            key={idx}
            animate={{ rotate: ring.dir === 1 ? 360 : -360 }}
            transition={{
              duration: ring.dur,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-[1.5px] border-[#e87030]"
            style={{
              width: ring.size,
              height: ring.size,
              borderStyle: ring.type,
            }}
          />
        ))}
      </div>

      {/* Mandala SVG Decor */}
      <svg
        className="pointer-events-none fixed left-1/2 top-1/2 h-[900px] w-[900px] -translate-x-1/2 -translate-y-1/2 opacity-[0.08]"
        viewBox="0 0 900 900"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g transform="translate(450,450)">
          {/* Wave Petals */}
          <g opacity="0.6">
            {Array.from({ length: 12 }).map((_, i) => (
              <path
                key={`petal-${i}`}
                d="M0,-60 Q20,-30 0,0 Q-20,-30 0,-60"
                fill="rgba(255,120,40,0.4)"
                transform={`rotate(${i * 30})`}
              />
            ))}
          </g>
          {/* Spokes */}
          <g stroke="rgba(255,120,40,0.5)" strokeWidth="0.8">
            {Array.from({ length: 8 }).map((_, i) => (
              <line
                key={`spoke-${i}`}
                x1="0"
                y1="-420"
                x2="0"
                y2="420"
                transform={`rotate(${i * 22.5})`}
              />
            ))}
          </g>
          {/* Tick Marks */}
          <g stroke="rgba(255,140,50,0.6)" strokeWidth="1.2">
            {Array.from({ length: 24 }).map((_, i) => (
              <line
                key={`tick-${i}`}
                x1="195"
                y1="0"
                x2="210"
                y2="0"
                transform={`rotate(${i * 15})`}
              />
            ))}
          </g>
          {/* Outer arc */}
          <circle
            cx="0"
            cy="0"
            r="300"
            fill="none"
            stroke="rgba(255,120,40,0.3)"
            strokeWidth="1"
            strokeDasharray="8 4"
          />
        </g>
      </svg>

      {/* Circuit SVG Background */}
      <svg
        className="pointer-events-none fixed inset-0 h-full w-full opacity-20"
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMax slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g stroke="rgba(220,110,30,1)" strokeWidth="1" fill="none">
          <path d="M0 680 H200 V640 H350 V680 H500" />
          <path d="M700 680 H900 V640 H1050 V680 H1200" />
          <path d="M100 720 H300 V700" />
          <path d="M900 720 H1100 V700" />
          <path d="M0 750 H150 V720 H250" />
          <path d="M950 750 H1200" />
          <circle cx="200" cy="680" r="4" fill="rgba(220,110,30,0.8)" />
          <circle cx="350" cy="640" r="4" fill="rgba(220,110,30,0.8)" />
          <circle cx="900" cy="680" r="4" fill="rgba(220,110,30,0.8)" />
          <circle cx="1050" cy="640" r="4" fill="rgba(220,110,30,0.8)" />
          <circle cx="300" cy="720" r="3" fill="rgba(220,110,30,0.6)" />
          <circle cx="900" cy="720" r="3" fill="rgba(220,110,30,0.6)" />
          <rect
            x="160"
            y="628"
            width="40"
            height="24"
            rx="2"
            strokeWidth="1.5"
            fill="rgba(30,15,5,0.8)"
          />
          <rect
            x="990"
            y="628"
            width="40"
            height="24"
            rx="2"
            strokeWidth="1.5"
            fill="rgba(30,15,5,0.8)"
          />
        </g>
      </svg>

      {/* Main Content Page */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-[1000px] flex-col items-center">
        {/* Nav */}
        <nav className="flex w-full items-center justify-between px-8 py-5">
          <span className="text-lg font-bold tracking-[1px] text-white">
            obito AI
          </span>
          <button className="flex items-center gap-1.5 rounded-full border-[1.5px] border-white/35 bg-white/5 px-5 py-2 text-sm font-medium text-white backdrop-blur-md transition-colors hover:border-white/60 hover:bg-white/10">
            Initialize &rarr;
          </button>
        </nav>

        {/* Hero Title & Subtitle */}
        <div className="mt-8 flex flex-col items-center px-4">
          <h1 className="z-[2] select-none text-center text-[clamp(60px,10vw,110px)] font-black leading-none tracking-[-2px] text-white drop-shadow-[0_4px_40px_rgba(0,0,0,0.6)]">
            obito
          </h1>
          <p className="z-[2] mt-4 max-w-lg text-center text-[17px] leading-relaxed text-white/70 drop-shadow-md">
            Your deeply personal AI assistant. Obito learns your workflows,
            remembers your context, and acts as your digital sensei.
          </p>
        </div>

        {/* Center Stage Container */}
        <div className="relative flex h-[420px] w-full max-w-[900px] items-center justify-center">
          {/* Scroll Card (Left) */}
          <motion.div
            animate={{ y: [0, -8, 0], rotate: [-4, -6, -4] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="absolute left-[6%] top-[30%] z-[3] cursor-pointer"
          >
            <div className="absolute -top-1.5 left-1/2 h-3 w-[80%] -translate-x-1/2 rounded-full bg-gradient-to-r from-[#8b6030] via-[#c8962a] to-[#8b6030]" />
            <div className="min-w-[160px] rounded-[10px] border-[1.5px] border-[#b48c50]/50 bg-gradient-to-br from-[#dcbe8c] to-[#c8a56e] p-6 pb-7 text-center shadow-[inset_0_0_0_1.5px_rgba(160,120,60,0.5),0_8px_32px_rgba(0,0,0,0.5)]">
              <div className="mb-2 flex justify-center text-[28px] text-[#6b3d0a]">
                🧠
              </div>
              <div className="text-[17px] font-extrabold uppercase leading-[1.2] tracking-[0.5px] text-[#3a1d02]">
                Deep
                <br />
                Context
              </div>
            </div>
            <div className="absolute -bottom-1.5 left-1/2 h-3 w-[80%] -translate-x-1/2 rounded-full bg-gradient-to-r from-[#8b6030] via-[#c8962a] to-[#8b6030]" />
          </motion.div>

          {/* Reticle */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
            className="absolute left-[43%] top-[15%] z-[3] flex h-10 w-10 items-center justify-center rounded-full border-[1.5px] border-[#ff8c3299]"
          >
            <div className="absolute h-full w-[1px] bg-[#ff8c3280]" />
            <div className="absolute h-[1px] w-full bg-[#ff8c3280]" />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
              className="h-5 w-5 rounded-full border border-[#ff8c3266]"
            />
          </motion.div>

          {/* Data Streams */}
          <motion.div
            animate={{ y: [-20, 20], opacity: [0, 0.7, 0.7, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            className="pointer-events-none absolute right-[1%] top-[5%] z-[2] font-mono text-[9px] leading-[1.6] tracking-[0.5px] text-[#ff8c3280]"
          >
            10101010
            <br />
            SYNC:OK
            <br />
            84.7.3.1
            <br />
            NODE:ACT
            <br />
            01001101
            <br />
            PKT:SENT
            <br />
            11000110
          </motion.div>

          <motion.div
            animate={{ y: [-20, 20], opacity: [0, 0.7, 0.7, 0] }}
            transition={{
              repeat: Infinity,
              duration: 3,
              ease: "easeInOut",
              delay: 1.5,
            }}
            className="pointer-events-none absolute left-[1%] top-[5%] z-[2] font-mono text-[9px] leading-[1.6] tracking-[0.5px] text-[#ff8c3280]"
          >
            SYS:BOOT
            <br />
            01100011
            <br />
            LINK:UP
            <br />
            10010111
            <br />
            ERR:0000
            <br />
            00111010
            <br />
            STATUS:1
          </motion.div>

          {/* Hero Character */}
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="absolute bottom-0 z-[4] flex h-[600px] w-[560px] items-end justify-center"
          >
            <img
              src={obito}
              alt="Obito AI Assistant"
              className="h-full w-full object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.7)]"
              onError={(e) => {
                e.target.style.display = "none";
                e.target.nextSibling.style.display = "flex";
              }}
            />
            <div className="hidden h-[320px] w-[200px] items-center justify-center text-center text-[13px] text-[#ffc86480]">
              Add obitoAI.png <br /> to your assets
            </div>
          </motion.div>

          {/* Floating Action Buttons */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            animate={{
              boxShadow: [
                "0px 0px 0px 0px rgba(255,96,32,0.5)",
                "0px 0px 0px 8px rgba(255,96,32,0)",
                "0px 0px 0px 0px rgba(255,96,32,0)",
              ],
            }}
            transition={{
              boxShadow: { repeat: Infinity, duration: 2.5, ease: "easeInOut" },
            }}
            className="absolute left-[28%] top-[38%] z-[5] flex cursor-pointer items-center gap-2 rounded-full border border-white/20 bg-[#281e14d9] px-[18px] py-2.5 text-[13px] font-semibold text-white shadow-[0_4px_20px_rgba(0,0,0,0.4)] backdrop-blur-md transition-colors"
          >
            <motion.div
              animate={{
                boxShadow: [
                  "0px 0px 0px 0px rgba(255,96,32,0.5)",
                  "0px 0px 0px 6px rgba(255,96,32,0)",
                  "0px 0px 0px 0px rgba(255,96,32,0)",
                ],
              }}
              transition={{
                repeat: Infinity,
                duration: 1.5,
                ease: "easeInOut",
              }}
              className="h-2 w-2 rounded-full bg-[#ff6020]"
            />
            💬 Ask Obito anything
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            animate={{
              boxShadow: [
                "0px 0px 0px 0px rgba(255,96,32,0.5)",
                "0px 0px 0px 8px rgba(255,96,32,0)",
                "0px 0px 0px 0px rgba(255,96,32,0)",
              ],
            }}
            transition={{
              boxShadow: {
                repeat: Infinity,
                duration: 2.5,
                ease: "easeInOut",
                delay: 1,
              },
            }}
            className="absolute left-[56%] top-[58%] z-[5] flex cursor-pointer items-center gap-2 rounded-full border border-white/20 bg-[#281e14d9] px-[18px] py-2.5 text-[13px] font-semibold text-white shadow-[0_4px_20px_rgba(0,0,0,0.4)] backdrop-blur-md transition-colors"
          >
            ⚡ Automate workflow
          </motion.div>

          {/* Flame Card (Right) */}
          <div className="absolute right-[5%] top-[25%] z-[3] cursor-pointer">
            <div className="relative flex h-[160px] w-[160px] items-center justify-center">
              {/* Ripple Rings */}
              {[0, 0.8, 1.6].map((delay, idx) => (
                <motion.div
                  key={`ripple-${idx}`}
                  animate={{ scale: [0.85, 1.35], opacity: [0.7, 0] }}
                  transition={{
                    repeat: Infinity,
                    duration: 2.4,
                    ease: "easeOut",
                    delay,
                  }}
                  className="absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 rounded-full border-[1.5px] border-[#ff8c0099]"
                />
              ))}

              {/* Rotating Dashed Ring SVG */}
              <motion.svg
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
                className="absolute inset-0"
                viewBox="0 0 160 160"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="80"
                  cy="80"
                  r="74"
                  fill="none"
                  stroke="url(#fg)"
                  strokeWidth="2.5"
                  strokeDasharray="6 4"
                />
                <defs>
                  <linearGradient id="fg" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ff6000" />
                    <stop offset="50%" stopColor="#ffcc00" />
                    <stop offset="100%" stopColor="#ff3000" />
                  </linearGradient>
                </defs>
                <g stroke="#ff9030" strokeWidth="2">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <line
                      key={`flame-tick-${i}`}
                      x1="80"
                      y1="6"
                      x2="80"
                      y2="16"
                      transform={`rotate(${i * 30} 80 80)`}
                    />
                  ))}
                </g>
              </motion.svg>

              {/* Central Glow */}
              <motion.div
                animate={{
                  filter: [
                    "drop-shadow(0 0 8px #ff6020) drop-shadow(0 0 20px #ff3000)",
                    "drop-shadow(0 0 16px #ffaa40) drop-shadow(0 0 40px #ff6000)",
                    "drop-shadow(0 0 8px #ff6020) drop-shadow(0 0 20px #ff3000)",
                  ],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 2,
                  ease: "easeInOut",
                }}
                className="absolute left-1/2 top-1/2 h-[120px] w-[120px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,120,0,0.3)_0%,transparent_70%)]"
              />

              {/* Flame Content */}
              <motion.div
                animate={{
                  filter: [
                    "drop-shadow(0 0 8px #ff6020) drop-shadow(0 0 20px #ff3000)",
                    "drop-shadow(0 0 16px #ffaa40) drop-shadow(0 0 40px #ff6000)",
                    "drop-shadow(0 0 8px #ff6020) drop-shadow(0 0 20px #ff3000)",
                  ],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 2,
                  ease: "easeInOut",
                }}
                className="relative z-[2] text-center"
              >
                <motion.span
                  animate={{ scaleY: [1, 1.07, 0.95, 1], skewX: [0, 2, -2, 0] }}
                  transition={{
                    repeat: Infinity,
                    duration: 0.8,
                    ease: "easeInOut",
                  }}
                  className="block text-[32px]"
                >
                  ⚡
                </motion.span>
                <div className="mt-0.5 text-[14px] font-extrabold uppercase leading-[1.2] tracking-[0.5px] text-[#ffcc60] drop-shadow-[0_0_10px_#ff8000]">
                  Master
                  <br />
                  Your Day
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Bottom Panel */}
        <div className="relative mt-2.5 w-full max-w-[800px] px-4">
          <div className="relative overflow-hidden rounded-xl border-[1.5px] border-[#78502880] bg-gradient-to-br from-[#1e1206f2] to-[#140c04fa] px-8 pb-5 pt-6 shadow-[0_0_0_1px_rgba(255,120,40,0.1),0_8px_40px_rgba(0,0,0,0.6)]">
            {/* Scanning Line */}
            <motion.div
              animate={{ y: ["-100%", "400%"], opacity: [0.6, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
              className="pointer-events-none absolute left-0 right-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#ff782899] to-transparent"
            />

            {/* Corner Accents */}
            <div className="absolute left-1.5 top-1.5 h-3.5 w-3.5 border-l-2 border-t-2 border-[#b47832b3]" />
            <div className="absolute right-1.5 top-1.5 h-3.5 w-3.5 border-r-2 border-t-2 border-[#b47832b3]" />
            <div className="absolute bottom-1.5 left-1.5 h-3.5 w-3.5 border-b-2 border-l-2 border-[#b47832b3]" />
            <div className="absolute bottom-1.5 right-1.5 h-3.5 w-3.5 border-b-2 border-r-2 border-[#b47832b3]" />

            {/* Hex Data BG */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden p-2 font-mono text-[8px] leading-[1.5] tracking-[1px] text-[#b4641e1f] opacity-50">
              {hexData}
            </div>

            <div className="relative z-10 mb-2 text-center text-[11px] font-bold uppercase tracking-[3px] text-[#c88c3cb3]">
              A new era of intelligence.
            </div>

            <div className="relative z-10 mb-[18px] text-center text-[24px] font-bold leading-[1.3] text-white">
              you dictate the goals.
              <br />
              <span className="text-white/90">
                obito executes them on your behalf.
              </span>
            </div>

            {/* Main Button */}
            <button className="group relative z-10 flex w-full items-center justify-center gap-2.5 overflow-hidden rounded-[40px] border-[1.5px] border-[#96642880] bg-gradient-to-br from-[#32230ff2] to-[#231608fa] px-8 py-3.5 text-[17px] font-semibold text-white transition-colors hover:border-[#ffa03cb3]">
              <motion.div
                animate={{
                  backgroundPosition: ["-200% center", "200% center"],
                }}
                transition={{ repeat: Infinity, duration: 2.5, ease: "linear" }}
                className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(255,140,40,0.08)_50%,transparent_100%)] bg-[length:200%_100%]"
              />
              Meet your AI <span className="text-[20px]">&rarr;</span>
            </button>
          </div>

          <div className="mt-2.5 pb-3 text-center text-[12px] text-white/35">
            By continuing, you agree to our{" "}
            <a href="#" className="text-white/50 underline">
              terms &amp; conditions
            </a>{" "}
            &amp;{" "}
            <a href="#" className="text-white/50 underline">
              privacy policy
            </a>
            .
          </div>
        </div>
      </div>

      {/* Rotating Diamond Sparkle */}
      <motion.svg
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
        className="fixed bottom-6 right-6 z-20 h-[30px] w-[30px] opacity-70"
        viewBox="0 0 30 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M15 2L18 12H28L20 18L23 28L15 22L7 28L10 18L2 12H12L15 2Z"
          fill="rgba(255,220,140,0.8)"
          stroke="rgba(255,200,100,0.5)"
          strokeWidth="0.5"
        />
      </motion.svg>
    </div>
  );
};

export default ObitoAssistant;
