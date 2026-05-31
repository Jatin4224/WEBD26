import React from "react";
import { motion } from "framer-motion";
import racoon from "../assets/racoon.png"; // Make sure the path is correct

const RaccoonAssistant = () => {
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-[#0a0507] text-[#fff2ee] font-['DM_Sans',sans-serif]">
      {/* Dark ambient background with glowing radial gradients and subtle texture */}
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background: `
            url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4'%3E%3Crect width='4' height='4' fill='transparent'/%3E%3Crect x='0' y='0' width='2' height='2' fill='%23ff8c6b' opacity='0.03'/%3E%3Crect x='2' y='2' width='2' height='2' fill='%23ff8c6b' opacity='0.03'/%3E%3C/svg%3E"),
            radial-gradient(ellipse at 50% 0%, rgba(255, 140, 107, 0.15) 0%, transparent 50%),
            radial-gradient(ellipse at 50% 100%, rgba(255, 140, 107, 0.08) 0%, transparent 50%),
            linear-gradient(135deg, #130a0d 0%, #0a0507 100%)
          `,
        }}
      />

      {/* NAV */}
      <nav className="relative z-10 flex items-center justify-between px-5 py-5 md:px-10">
        <a
          href="#"
          className="flex items-center gap-2.5 text-lg font-semibold text-[#fff2ee] no-underline drop-shadow-[0_0_10px_rgba(255,140,107,0.3)]"
        >
          <svg
            className="h-9 w-9"
            viewBox="0 0 36 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              width="36"
              height="36"
              rx="10"
              fill="#1a0f12"
              stroke="#ff8c6b"
              strokeWidth="1"
              strokeOpacity="0.5"
            />
            <text
              x="18"
              y="25"
              textAnchor="middle"
              fontSize="20"
              filter="drop-shadow(0px 0px 4px rgba(255,140,107,0.5))"
            >
              🦝
            </text>
          </svg>
          raccoon
        </a>
        <a
          href="#"
          className="flex items-center gap-1.5 rounded-full border-[1.5px] border-[#ff8c6b]/50 bg-[#ff8c6b]/5 px-5 py-2 text-sm font-medium text-[#ff8c6b] transition-all duration-300 hover:bg-[#ff8c6b] hover:text-[#0a0507] hover:shadow-[0_0_20px_rgba(255,140,107,0.4)]"
        >
          Sign in &nbsp;→
        </a>
      </nav>

      {/* HERO */}
      <div className="relative z-10 px-5 pt-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-4 font-['Playfair_Display'] text-[clamp(52px,8vw,88px)] font-black leading-[1.05] tracking-tight text-[#fff2ee] drop-shadow-[0_0_30px_rgba(255,140,107,0.15)]"
        >
          Your personal
          <br />
          <span className="text-[#ff8c6b] drop-shadow-[0_0_20px_rgba(255,140,107,0.4)]">
            AI assistant.
          </span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mx-auto max-w-[480px] text-[17px] leading-relaxed text-[#cba69e]"
        >
          The effortlessly personal AI companion that understands you, remembers
          everything, and helps you get things done.
        </motion.p>
      </div>

      {/* CONTENT GRID */}
      <div className="relative z-10 mx-auto mt-10 flex max-w-[1100px] flex-col items-center gap-5 px-5 lg:grid lg:grid-cols-[280px_1fr_280px] lg:gap-0">
        {/* LEFT CARDS */}
        <div className="flex w-full flex-col gap-5 py-5 sm:flex-row lg:flex-col">
          {/* Card 1 */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="group flex-1 rounded-[18px] border border-[#ff8c6b]/20 bg-[#1a0f12]/60 p-[18px] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:scale-[1.01] hover:border-[#ff8c6b]/40 hover:shadow-[0_0_30px_rgba(255,140,107,0.15)]"
          >
            <div className="mb-3 h-10 w-full overflow-hidden rounded-lg border border-[#ff8c6b]/10 bg-[#0a0507]/50 shadow-inner">
              <svg
                width="100%"
                height="40"
                viewBox="0 0 260 40"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="10"
                  y="8"
                  rx="4"
                  ry="4"
                  height="7"
                  fill="#ff8c6b"
                  opacity="0.8"
                  filter="drop-shadow(0 0 4px rgba(255,140,107,0.5))"
                >
                  <animate
                    attributeName="width"
                    values="0;120;120"
                    dur="2.5s"
                    repeatCount="indefinite"
                    keyTimes="0;0.4;1"
                  />
                </rect>
                <rect
                  x="10"
                  y="20"
                  rx="4"
                  ry="4"
                  height="7"
                  fill="#ff8c6b"
                  opacity="0.5"
                >
                  <animate
                    attributeName="width"
                    values="0;90;90"
                    dur="2.5s"
                    begin="0.3s"
                    repeatCount="indefinite"
                    keyTimes="0;0.4;1"
                  />
                </rect>
                <rect
                  x="10"
                  y="32"
                  rx="4"
                  ry="4"
                  height="6"
                  fill="#ff8c6b"
                  opacity="0.3"
                >
                  <animate
                    attributeName="width"
                    values="0;60;60"
                    dur="2.5s"
                    begin="0.6s"
                    repeatCount="indefinite"
                    keyTimes="0;0.4;1"
                  />
                </rect>
                <rect
                  x="150"
                  y="6"
                  width="100"
                  rx="5"
                  ry="5"
                  height="30"
                  fill="rgba(255,140,107,0.15)"
                  stroke="#ff8c6b"
                  strokeWidth="1"
                  opacity="0"
                  filter="drop-shadow(0 0 6px rgba(255,140,107,0.3))"
                >
                  <animate
                    attributeName="opacity"
                    values="0;0;1;1"
                    dur="2.5s"
                    repeatCount="indefinite"
                    keyTimes="0;0.5;0.7;1"
                  />
                </rect>
              </svg>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="mb-1 text-[15px] font-semibold text-[#fff2ee]">
                  Smart conversations
                </div>
                <div className="text-[13px] leading-relaxed text-[#cba69e]">
                  Natural chat,
                  <br />
                  instant answers.
                </div>
              </div>
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#ff8c6b] text-[#0a0507] shadow-[0_0_15px_rgba(255,140,107,0.6)]">
                <svg
                  width="20"
                  height="20"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </div>
            </div>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.55 }}
            className="group flex-1 rounded-[18px] border border-[#ff8c6b]/20 bg-[#1a0f12]/60 p-[18px] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:scale-[1.01] hover:border-[#ff8c6b]/40 hover:shadow-[0_0_30px_rgba(255,140,107,0.15)]"
          >
            <div className="mb-3 h-10 w-full overflow-hidden rounded-lg border border-[#ff8c6b]/10 bg-[#0a0507]/50 shadow-inner">
              <svg
                width="100%"
                height="40"
                viewBox="0 0 260 40"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g>
                  <rect
                    x="8"
                    y="5"
                    width="80"
                    height="5"
                    rx="2"
                    fill="#ff8c6b"
                    opacity="0.3"
                  />
                  <rect
                    x="8"
                    y="13"
                    width="70"
                    height="5"
                    rx="2"
                    fill="#ff8c6b"
                    opacity="0.2"
                  />
                  <rect
                    x="8"
                    y="21"
                    width="75"
                    height="5"
                    rx="2"
                    fill="#ff8c6b"
                    opacity="0.2"
                  />
                  <rect
                    x="8"
                    y="29"
                    width="55"
                    height="5"
                    rx="2"
                    fill="#ff8c6b"
                    opacity="0.15"
                  />
                </g>
                <text
                  x="105"
                  y="24"
                  fontSize="14"
                  fill="#ff8c6b"
                  opacity="0.8"
                  filter="drop-shadow(0 0 4px rgba(255,140,107,0.5))"
                >
                  →
                </text>
                <g>
                  <rect
                    x="125"
                    y="10"
                    rx="2"
                    height="5"
                    fill="#ff8c6b"
                    opacity="0.9"
                    filter="drop-shadow(0 0 4px rgba(255,140,107,0.5))"
                  >
                    <animate
                      attributeName="width"
                      values="0;110;110"
                      dur="2s"
                      repeatCount="indefinite"
                      keyTimes="0;0.5;1"
                    />
                  </rect>
                  <rect
                    x="125"
                    y="20"
                    rx="2"
                    height="5"
                    fill="#ff8c6b"
                    opacity="0.6"
                  >
                    <animate
                      attributeName="width"
                      values="0;80;80"
                      dur="2s"
                      begin="0.2s"
                      repeatCount="indefinite"
                      keyTimes="0;0.5;1"
                    />
                  </rect>
                  <rect
                    x="125"
                    y="30"
                    rx="2"
                    height="5"
                    fill="#ff8c6b"
                    opacity="0.4"
                  >
                    <animate
                      attributeName="width"
                      values="0;60;60"
                      dur="2s"
                      begin="0.4s"
                      repeatCount="indefinite"
                      keyTimes="0;0.5;1"
                    />
                  </rect>
                </g>
              </svg>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="mb-1 text-[15px] font-semibold text-[#fff2ee]">
                  Summarize anything
                </div>
                <div className="text-[13px] leading-relaxed text-[#cba69e]">
                  Clear summaries,
                  <br />
                  reduced noise.
                </div>
              </div>
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#ff8c6b] text-[#0a0507] shadow-[0_0_15px_rgba(255,140,107,0.6)]">
                <svg
                  width="20"
                  height="20"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
            </div>
          </motion.div>
        </div>

        {/* CENTER MASCOT */}
        <div className="relative flex min-h-[260px] w-full items-end justify-center lg:min-h-[340px]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.6 }}
            className="relative"
          >
            {/* Panel Left */}
            <motion.div
              animate={{ y: ["-60%", "-60%", "-60%"], x: [0, -6, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
              className="absolute -left-7 top-1/2 w-[110px] -translate-y-[60%] rounded-xl border border-[#ff8c6b]/30 bg-[#1a0f12]/80 p-2 backdrop-blur-xl shadow-[0_0_20px_rgba(255,140,107,0.1)]"
            >
              <svg width="90" height="26" viewBox="0 0 90 26">
                <circle
                  cx="7"
                  cy="7"
                  r="5"
                  fill="#ff8c6b"
                  opacity="0.9"
                  filter="drop-shadow(0 0 3px rgba(255,140,107,0.8))"
                />
                <circle cx="21" cy="7" r="5" fill="#ff8c6b" opacity="0.4" />
                <circle cx="35" cy="7" r="5" fill="#ff8c6b" opacity="0.2" />
                <rect
                  x="0"
                  y="17"
                  width="90"
                  height="3"
                  rx="1.5"
                  fill="#ff8c6b"
                  opacity="0.15"
                />
                <rect
                  x="0"
                  y="17"
                  rx="1.5"
                  height="3"
                  fill="#ff8c6b"
                  opacity="0.8"
                  filter="drop-shadow(0 0 3px rgba(255,140,107,0.6))"
                >
                  <animate
                    attributeName="width"
                    values="0;90;0"
                    dur="3s"
                    repeatCount="indefinite"
                  />
                </rect>
              </svg>
            </motion.div>

            {/* Panel Right */}
            <motion.div
              animate={{ y: ["-50%", "-50%", "-50%"], x: [0, 6, 0] }}
              transition={{
                repeat: Infinity,
                duration: 5,
                ease: "easeInOut",
                delay: 0.5,
              }}
              className="absolute -right-7 top-[40%] w-[110px] -translate-y-1/2 rounded-xl border border-[#ff8c6b]/30 bg-[#1a0f12]/80 p-2 backdrop-blur-xl shadow-[0_0_20px_rgba(255,140,107,0.1)]"
            >
              <svg width="90" height="26" viewBox="0 0 90 26">
                <rect
                  x="0"
                  y="0"
                  width="28"
                  height="10"
                  rx="3"
                  fill="#ff8c6b"
                  opacity="0.2"
                />
                <rect
                  x="32"
                  y="0"
                  width="18"
                  height="10"
                  rx="3"
                  fill="#ff8c6b"
                  opacity="0.4"
                />
                <circle
                  cx="60"
                  cy="5"
                  r="5"
                  fill="none"
                  stroke="#ff8c6b"
                  strokeWidth="1.5"
                  opacity="0.8"
                  filter="drop-shadow(0 0 3px rgba(255,140,107,0.5))"
                />
                <line
                  x1="64"
                  y1="9"
                  x2="72"
                  y2="17"
                  stroke="#ff8c6b"
                  strokeWidth="1.5"
                  opacity="0.8"
                />
                <rect
                  x="0"
                  y="17"
                  width="90"
                  height="3"
                  rx="1.5"
                  fill="#ff8c6b"
                  opacity="0.15"
                />
                <rect
                  x="0"
                  y="17"
                  rx="1.5"
                  height="3"
                  fill="#ff8c6b"
                  opacity="0.7"
                  filter="drop-shadow(0 0 3px rgba(255,140,107,0.5))"
                >
                  <animate
                    attributeName="width"
                    values="0;60;90;0"
                    dur="4s"
                    repeatCount="indefinite"
                  />
                </rect>
              </svg>
            </motion.div>

            {/* Mascot Element */}
            <motion.div
              animate={{ y: [0, -14, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="relative z-10 w-[210px] drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)] lg:w-[280px]"
            >
              <img
                className="relative z-10 w-[210px] drop-shadow-[0_10px_20px_rgba(255,140,107,0.15)] lg:w-[280px]"
                src={racoon}
                alt="Raccoon AI mascot"
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.nextSibling.style.display = "flex";
                }}
              />
              {/* Fallback Emoji */}
              <div
                className="hidden h-[240px] w-full items-center justify-center text-[100px] lg:h-[320px] lg:text-[120px]"
                style={{ display: "none" }}
              >
                🦝
              </div>
            </motion.div>

            {/* Ambient Peach Glow behind Mascot */}
            <motion.div
              animate={{ opacity: [0.3, 0.6, 0.3], scaleX: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="pointer-events-none absolute -bottom-5 left-1/2 h-[80px] w-[280px] -translate-x-1/2 rounded-full blur-2xl"
              style={{
                background:
                  "radial-gradient(ellipse, rgba(255,140,107,0.5) 0%, transparent 60%)",
              }}
            />
          </motion.div>
        </div>

        {/* RIGHT CARDS */}
        <div className="flex w-full flex-col gap-5 py-5 sm:flex-row lg:flex-col">
          {/* Card 3 */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="group flex-1 rounded-[18px] border border-[#ff8c6b]/20 bg-[#1a0f12]/60 p-[18px] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:scale-[1.01] hover:border-[#ff8c6b]/40 hover:shadow-[0_0_30px_rgba(255,140,107,0.15)]"
          >
            <div className="mb-3 h-10 w-full overflow-hidden rounded-lg border border-[#ff8c6b]/10 bg-[#0a0507]/50 shadow-inner">
              <svg
                width="100%"
                height="40"
                viewBox="0 0 260 40"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="8"
                  y="4"
                  width="32"
                  height="32"
                  rx="5"
                  fill="none"
                  stroke="#ff8c6b"
                  strokeWidth="1"
                  opacity="0.3"
                />
                <line
                  x1="8"
                  y1="13"
                  x2="40"
                  y2="13"
                  stroke="#ff8c6b"
                  strokeWidth="0.8"
                  opacity="0.3"
                />
                <rect
                  x="13"
                  y="17"
                  width="6"
                  height="6"
                  rx="1"
                  fill="#ff8c6b"
                  opacity="0.2"
                />
                <rect
                  x="22"
                  y="17"
                  width="6"
                  height="6"
                  rx="1"
                  fill="#ff8c6b"
                  opacity="0.9"
                  filter="drop-shadow(0 0 4px rgba(255,140,107,0.6))"
                >
                  <animate
                    attributeName="opacity"
                    values="0.9;0.2;0.9"
                    dur="2s"
                    repeatCount="indefinite"
                  />
                </rect>
                <rect
                  x="31"
                  y="17"
                  width="6"
                  height="6"
                  rx="1"
                  fill="#ff8c6b"
                  opacity="0.2"
                />
                <rect
                  x="13"
                  y="26"
                  width="6"
                  height="6"
                  rx="1"
                  fill="#ff8c6b"
                  opacity="0.2"
                />
                <rect
                  x="22"
                  y="26"
                  width="6"
                  height="6"
                  rx="1"
                  fill="#ff8c6b"
                  opacity="0.2"
                />

                <line
                  x1="52"
                  y1="20"
                  x2="72"
                  y2="20"
                  stroke="#ff8c6b"
                  strokeWidth="1.2"
                  opacity="0.6"
                  strokeDasharray="4 2"
                >
                  <animate
                    attributeName="stroke-dashoffset"
                    values="0;-12"
                    dur="1s"
                    repeatCount="indefinite"
                  />
                </line>
                <circle cx="80" cy="20" r="5" fill="#ff8c6b" opacity="0.3" />
                <line
                  x1="86"
                  y1="20"
                  x2="106"
                  y2="20"
                  stroke="#ff8c6b"
                  strokeWidth="1.2"
                  opacity="0.6"
                  strokeDasharray="4 2"
                >
                  <animate
                    attributeName="stroke-dashoffset"
                    values="0;-12"
                    dur="1s"
                    repeatCount="indefinite"
                  />
                </line>
                <circle
                  cx="114"
                  cy="20"
                  r="5"
                  fill="#ff8c6b"
                  opacity="0.9"
                  filter="drop-shadow(0 0 5px rgba(255,140,107,0.6))"
                >
                  <animate
                    attributeName="r"
                    values="5;7;5"
                    dur="2s"
                    repeatCount="indefinite"
                  />
                </circle>
                <line
                  x1="120"
                  y1="20"
                  x2="140"
                  y2="20"
                  stroke="#ff8c6b"
                  strokeWidth="1.2"
                  opacity="0.6"
                  strokeDasharray="4 2"
                >
                  <animate
                    attributeName="stroke-dashoffset"
                    values="0;-12"
                    dur="1s"
                    repeatCount="indefinite"
                  />
                </line>
                <circle cx="148" cy="20" r="5" fill="#ff8c6b" opacity="0.3" />

                <circle
                  cx="210"
                  cy="14"
                  r="4"
                  fill="none"
                  stroke="#ff8c6b"
                  strokeWidth="1.2"
                  opacity="0.4"
                />
                <circle cx="228" cy="8" r="3" fill="#ff8c6b" opacity="0.3" />
                <circle cx="232" cy="24" r="3" fill="#ff8c6b" opacity="0.2" />
                <line
                  x1="213"
                  y1="12"
                  x2="226"
                  y2="9"
                  stroke="#ff8c6b"
                  strokeWidth="0.8"
                  opacity="0.3"
                />
                <line
                  x1="213"
                  y1="16"
                  x2="230"
                  y2="23"
                  stroke="#ff8c6b"
                  strokeWidth="0.8"
                  opacity="0.3"
                />
              </svg>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="mb-1 text-[15px] font-semibold text-[#fff2ee]">
                  Plan your day
                </div>
                <div className="text-[13px] leading-relaxed text-[#cba69e]">
                  Effortless organization,
                  <br />
                  smart insights.
                </div>
              </div>
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#ff8c6b] text-[#0a0507] shadow-[0_0_15px_rgba(255,140,107,0.6)]">
                <svg
                  width="20"
                  height="20"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
              </div>
            </div>
          </motion.div>

          {/* Card 4 */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.55 }}
            className="group flex-1 rounded-[18px] border border-[#ff8c6b]/20 bg-[#1a0f12]/60 p-[18px] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:scale-[1.01] hover:border-[#ff8c6b]/40 hover:shadow-[0_0_30px_rgba(255,140,107,0.15)]"
          >
            <div className="mb-3 h-10 w-full overflow-hidden rounded-lg border border-[#ff8c6b]/10 bg-[#0a0507]/50 shadow-inner">
              <svg
                width="100%"
                height="40"
                viewBox="0 0 260 40"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="130"
                  cy="20"
                  r="4"
                  fill="#ff8c6b"
                  opacity="0.9"
                  filter="drop-shadow(0 0 4px rgba(255,140,107,0.6))"
                />
                <circle
                  cx="130"
                  cy="20"
                  fill="none"
                  stroke="#ff8c6b"
                  strokeWidth="1.2"
                  opacity="0"
                >
                  <animate
                    attributeName="r"
                    values="4;20;35"
                    dur="2s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    values="0.7;0.3;0"
                    dur="2s"
                    repeatCount="indefinite"
                  />
                </circle>
                <circle
                  cx="130"
                  cy="20"
                  fill="none"
                  stroke="#ff8c6b"
                  strokeWidth="1"
                  opacity="0"
                >
                  <animate
                    attributeName="r"
                    values="4;20;35"
                    dur="2s"
                    begin="0.6s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    values="0.5;0.2;0"
                    dur="2s"
                    begin="0.6s"
                    repeatCount="indefinite"
                  />
                </circle>
                <circle
                  cx="130"
                  cy="20"
                  r="7"
                  fill="none"
                  stroke="#ff8c6b"
                  strokeWidth="1.5"
                  opacity="0.8"
                />
                <line
                  x1="135"
                  y1="25"
                  x2="142"
                  y2="32"
                  stroke="#ff8c6b"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  opacity="0.8"
                />

                <rect
                  x="5"
                  y="6"
                  width="110"
                  height="6"
                  rx="3"
                  fill="#ff8c6b"
                  opacity="0.15"
                />
                <rect
                  x="5"
                  y="16"
                  width="95"
                  height="6"
                  rx="3"
                  fill="#ff8c6b"
                  opacity="0.1"
                />
                <rect
                  x="5"
                  y="26"
                  width="100"
                  height="6"
                  rx="3"
                  fill="#ff8c6b"
                  opacity="0.1"
                />

                <rect
                  x="155"
                  y="6"
                  width="100"
                  height="6"
                  rx="3"
                  fill="#ff8c6b"
                  opacity="0.5"
                  filter="drop-shadow(0 0 3px rgba(255,140,107,0.3))"
                >
                  <animate
                    attributeName="opacity"
                    values="0.1;0.8;0.1"
                    dur="3s"
                    repeatCount="indefinite"
                  />
                </rect>
                <rect
                  x="155"
                  y="16"
                  width="80"
                  height="6"
                  rx="3"
                  fill="#ff8c6b"
                  opacity="0.3"
                >
                  <animate
                    attributeName="opacity"
                    values="0.05;0.5;0.05"
                    dur="3s"
                    begin="0.3s"
                    repeatCount="indefinite"
                  />
                </rect>
              </svg>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="mb-1 text-[15px] font-semibold text-[#fff2ee]">
                  Find what you need
                </div>
                <div className="text-[13px] leading-relaxed text-[#cba69e]">
                  Unified search,
                  <br />
                  accessible memories.
                </div>
              </div>
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#ff8c6b] text-[#0a0507] shadow-[0_0_15px_rgba(255,140,107,0.6)]">
                <svg
                  width="20"
                  height="20"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-4.35-4.35"
                  />
                </svg>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* CTA BUTTON */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.9 }}
        className="relative z-10 px-5 pb-10 pt-10 text-center"
      >
        <a
          href="#"
          className="inline-flex items-center gap-3 rounded-full border-none bg-gradient-to-r from-[#ff8c6b] to-[#ff6b4a] px-12 py-[18px] text-lg font-bold text-[#0a0507] shadow-[0_0_25px_rgba(255,140,107,0.4)] no-underline transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(255,140,107,0.6)] active:translate-y-0"
        >
          Get started
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#0a0507]/20 text-base">
            →
          </div>
        </a>
        <p className="mt-4 text-[13px] text-[#cba69e]">
          No credit card required
        </p>
      </motion.div>

      {/* AWARD BADGE */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 1.2 }}
        className="fixed bottom-7 left-7 z-20 flex items-center gap-3 rounded-[14px] border border-[#ff8c6b]/30 bg-[#1a0f12]/80 p-2.5 px-4 backdrop-blur-xl shadow-[0_0_20px_rgba(0,0,0,0.5)]"
      >
        <div className="text-[28px] drop-shadow-[0_0_8px_rgba(255,215,0,0.6)]">
          🥇
        </div>
        <div className="text-[11px] font-bold leading-[1.3] text-[#fff2ee] tracking-wide">
          Product Design
          <br />
          <span className="text-[#ff8c6b]">Gold Award</span>
        </div>
      </motion.div>

      {/* SPARKLE */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 1.3 }}
        className="fixed bottom-9 right-9 z-20"
      >
        <svg
          width="32"
          height="32"
          viewBox="0 0 28 28"
          fill="none"
          style={{ filter: "drop-shadow(0 0 10px rgba(255,140,107,0.8))" }}
        >
          <path
            d="M14 2 L15.5 12 L26 14 L15.5 16 L14 26 L12.5 16 L2 14 L12.5 12 Z"
            fill="#ff8c6b"
            opacity="0.9"
          >
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 14 14"
              to="360 14 14"
              dur="8s"
              repeatCount="indefinite"
            />
          </path>
        </svg>
      </motion.div>
    </div>
  );
};

export default RaccoonAssistant;
