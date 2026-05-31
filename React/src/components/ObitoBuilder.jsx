import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const initialBlocks = [
  {
    id: 1,
    type: "welcome",
    title: "Welcome to Obito Forms",
    description: "Let's build something beautiful. It only takes a minute.",
    required: false,
  },
  {
    id: 2,
    type: "short_text",
    title: "First, what should we call you?",
    description: "First and last name, please.",
    required: true,
  },
  {
    id: 3,
    type: "multiple_choice",
    title: "What is your primary use case?",
    description: "Select the option that best fits your needs.",
    required: true,
    options: [
      "Lead Generation",
      "Customer Feedback",
      "Event Registration",
      "Internal Survey",
    ],
  },
  {
    id: 4,
    type: "ending",
    title: "Thank you for your time!",
    description: "We will be in touch shortly.",
    required: false,
  },
];

const ObitoFormBuilder = () => {
  const [blocks, setBlocks] = useState(initialBlocks);
  const [activeId, setActiveId] = useState(2);

  const activeBlock = blocks.find((b) => b.id === activeId);

  return (
    <div className="relative flex h-screen w-full overflow-hidden bg-[#1a0a00] font-['Inter',sans-serif] text-white">
      {/* Background Ambience */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,#4a1200_0%,#1a0800_60%,#0a0400_100%)] opacity-60" />

      {/* Circuit SVG Background (Faint) */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.04]"
        viewBox="0 0 1200 800"
        preserveAspectRatio="none"
      >
        <g stroke="#ff8c32" strokeWidth="1" fill="none">
          <path d="M0 680 H200 V640 H350 V680 H500" />
          <path d="M700 680 H900 V640 H1050 V680 H1200" />
          <path d="M100 720 H300 V700" />
          <path d="M900 720 H1100 V700" />
          <circle cx="200" cy="680" r="4" fill="#ff8c32" />
          <circle cx="350" cy="640" r="4" fill="#ff8c32" />
          <circle cx="300" cy="720" r="3" fill="#ff8c32" />
        </g>
      </svg>

      {/* TOP NAV */}
      <nav className="absolute left-0 right-0 top-0 z-20 flex h-14 items-center justify-between border-b border-[#78502840] bg-[#0a0400cc] px-6 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <button className="flex h-8 w-8 items-center justify-center rounded-md text-white/50 hover:bg-white/5 hover:text-white transition-colors">
            <svg
              width="20"
              height="20"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
          </button>
          <div className="flex items-center gap-2">
            <span className="font-bold tracking-wide text-[#ffcc60]">
              obito
            </span>
            <span className="text-white/30">/</span>
            <input
              type="text"
              defaultValue="Customer Onboarding Flow"
              className="bg-transparent text-sm font-medium text-white/90 outline-none hover:border-b border-[#ff8c3240] focus:border-[#ff8c32]"
            />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="rounded-full px-4 py-1.5 text-sm font-medium text-white/70 transition-colors hover:text-white">
            Preview
          </button>
          <button className="rounded-full bg-[#white] px-5 py-1.5 text-sm font-semibold text-[#1a0a00] transition-transform hover:scale-105 active:scale-95 bg-white">
            Publish
          </button>
        </div>
      </nav>

      <div className="relative z-10 mt-14 flex h-[calc(100vh-56px)] w-full">
        {/* LEFT SIDEBAR - Blocks Panel */}
        <div className="flex w-[280px] flex-col border-r border-[#78502840] bg-[#0a0400cc] backdrop-blur-md">
          <div className="flex items-center justify-between border-b border-[#78502840] p-4">
            <span className="text-xs font-bold uppercase tracking-[1.5px] text-white/70">
              Content
            </span>
            <button className="text-xl text-[#ff8c32] hover:text-[#ffcc60]">
              +
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-3">
            <div className="flex flex-col gap-1">
              {blocks.map((block, index) => (
                <button
                  key={block.id}
                  onClick={() => setActiveId(block.id)}
                  className={`group relative flex items-center gap-3 rounded-lg px-3 py-3 text-left transition-all ${
                    activeId === block.id
                      ? "bg-[#ff8c3215] shadow-[inset_2px_0_0_#ff8c32]"
                      : "hover:bg-white/5"
                  }`}
                >
                  {/* Icon Placeholder based on type */}
                  <div
                    className={`flex h-6 w-6 items-center justify-center rounded text-xs ${activeId === block.id ? "bg-[#ff8c3230] text-[#ffcc60]" : "bg-white/5 text-white/40"}`}
                  >
                    {block.type === "welcome"
                      ? "👋"
                      : block.type === "ending"
                        ? "🏁"
                        : index}
                  </div>
                  <div className="flex-1 truncate">
                    <div
                      className={`truncate text-sm ${activeId === block.id ? "font-medium text-white" : "text-white/70"}`}
                    >
                      {block.title || "Empty Block"}
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-[#78502860] py-3 text-sm font-medium text-white/50 transition-colors hover:border-[#ff8c32] hover:bg-[#ff8c3210] hover:text-[#ffcc60]">
              <svg
                width="16"
                height="16"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Add new block
            </button>
          </div>
        </div>

        {/* CENTER - Canvas / Preview */}
        <div className="relative flex flex-1 flex-col items-center justify-center overflow-y-auto p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeId}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="w-full max-w-2xl"
            >
              {/* Typeform-style question UI */}
              <div className="flex items-start gap-4">
                <div className="flex items-center text-xl font-bold text-[#ff8c32]">
                  {activeBlock.id} <span className="ml-2 text-sm">→</span>
                </div>
                <div className="flex-1">
                  <h1
                    className="text-2xl md:text-3xl font-semibold leading-tight text-white mb-2 outline-none"
                    contentEditable
                    suppressContentEditableWarning
                  >
                    {activeBlock.title}
                  </h1>

                  {activeBlock.description && (
                    <p
                      className="text-lg text-white/50 outline-none mb-8"
                      contentEditable
                      suppressContentEditableWarning
                    >
                      {activeBlock.description}
                    </p>
                  )}

                  {/* Input Types */}
                  {activeBlock.type === "short_text" && (
                    <div className="mt-8">
                      <input
                        type="text"
                        placeholder="Type your answer here..."
                        className="w-full border-b border-white/20 bg-transparent pb-3 text-2xl text-white placeholder-white/20 outline-none transition-colors focus:border-[#ff8c32]"
                        readOnly
                      />
                    </div>
                  )}

                  {activeBlock.type === "multiple_choice" && (
                    <div className="mt-8 flex flex-col gap-3">
                      {activeBlock.options.map((opt, i) => (
                        <div
                          key={i}
                          className="group flex cursor-pointer items-center gap-3 rounded-xl border border-white/10 bg-[#1e1206f2] p-3 transition-all hover:border-[#ff8c3260] hover:bg-[#ff8c3210]"
                        >
                          <div className="flex h-7 w-7 items-center justify-center rounded border border-[#ff8c3240] bg-[#1a0a00] text-xs font-bold text-[#ffcc60]">
                            {String.fromCharCode(65 + i)}
                          </div>
                          <span className="text-lg text-white/90">{opt}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Mock "OK" Button */}
                  {["short_text", "welcome"].includes(activeBlock.type) && (
                    <div className="mt-8 flex items-center gap-4">
                      <button className="flex items-center gap-2 rounded-md bg-[#ff8c32] px-6 py-2.5 text-lg font-bold text-[#1a0a00] transition-transform hover:scale-105">
                        OK
                        <svg
                          width="18"
                          height="18"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="3"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </button>
                      <span className="text-xs text-white/30">
                        Press Enter ↵
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* RIGHT SIDEBAR - Settings Panel */}
        <div className="flex w-[300px] flex-col border-l border-[#78502840] bg-[#0a0400cc] backdrop-blur-md">
          {/* Tabs */}
          <div className="flex border-b border-[#78502840]">
            <button className="flex-1 border-b-2 border-[#ff8c32] py-4 text-xs font-bold uppercase tracking-wider text-white">
              Question
            </button>
            <button className="flex-1 py-4 text-xs font-bold uppercase tracking-wider text-white/40 hover:text-white/70">
              Design
            </button>
            <button className="flex-1 py-4 text-xs font-bold uppercase tracking-wider text-white/40 hover:text-white/70">
              Logic
            </button>
          </div>

          {/* Settings Content */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="mb-6">
              <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-white/40">
                Block Type
              </label>
              <select className="w-full rounded-lg border border-[#78502860] bg-[#1a0a00] p-2.5 text-sm text-white outline-none focus:border-[#ff8c32]">
                <option value="short_text">Short Text</option>
                <option value="multiple_choice">Multiple Choice</option>
                <option value="welcome">Welcome Screen</option>
                <option value="ending">Ending Screen</option>
              </select>
            </div>

            <div className="mb-6 h-[1px] w-full bg-[#78502840]" />

            <div className="mb-6 space-y-4">
              <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-white/40">
                Settings
              </label>

              {/* Toggle 1 */}
              <div className="flex items-center justify-between">
                <span className="text-sm text-white/80">Required</span>
                <div
                  className={`flex h-5 w-9 cursor-pointer items-center rounded-full p-1 transition-colors ${activeBlock.required ? "bg-[#ff8c32]" : "bg-white/20"}`}
                >
                  <motion.div
                    layout
                    className="h-3 w-3 rounded-full bg-white shadow-sm"
                    animate={{ x: activeBlock.required ? 16 : 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                </div>
              </div>

              {/* Toggle 2 */}
              <div className="flex items-center justify-between">
                <span className="text-sm text-white/80">Description</span>
                <div
                  className={`flex h-5 w-9 cursor-pointer items-center rounded-full p-1 transition-colors ${activeBlock.description ? "bg-[#ff8c32]" : "bg-white/20"}`}
                >
                  <motion.div
                    layout
                    className="h-3 w-3 rounded-full bg-white shadow-sm"
                    animate={{ x: activeBlock.description ? 16 : 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                </div>
              </div>
            </div>

            {activeBlock.type === "multiple_choice" && (
              <>
                <div className="mb-6 h-[1px] w-full bg-[#78502840]" />
                <div>
                  <label className="mb-3 block text-xs font-semibold uppercase tracking-wider text-white/40">
                    Choices
                  </label>
                  <div className="space-y-2">
                    {activeBlock.options.map((opt, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <div className="flex h-6 w-6 items-center justify-center rounded bg-white/5 text-xs text-white/50">
                          {String.fromCharCode(65 + i)}
                        </div>
                        <input
                          type="text"
                          defaultValue={opt}
                          className="w-full rounded border border-transparent bg-white/5 px-3 py-1.5 text-sm text-white outline-none hover:bg-white/10 focus:border-[#ff8c3240] focus:bg-white/10"
                        />
                        <button className="text-white/30 hover:text-red-400">
                          ×
                        </button>
                      </div>
                    ))}
                    <button className="mt-2 text-sm text-[#ff8c32] hover:text-[#ffcc60]">
                      + Add Choice
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ObitoFormBuilder;
