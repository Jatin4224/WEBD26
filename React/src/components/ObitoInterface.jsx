import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import obito from "../assets/obitoAI.png";

const ObitoChatInterface = () => {
  const [inputText, setInputText] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "obito",
      text: "System initialized. Context loaded. How can I assist your workflow today?",
      timestamp: "09:00 AM",
    },
    {
      id: 2,
      sender: "user",
      text: "Can you analyze my recent code commits and summarize the changes?",
      timestamp: "09:02 AM",
    },
    {
      id: 3,
      sender: "obito",
      text: "Scanning repository... \n\nI found 4 recent commits. You primarily refactored the authentication flow and updated the database schema. I've compiled a detailed brief in your secure workspace.",
      timestamp: "09:02 AM",
    },
  ]);

  // Simulated hex stream for the right panel
  const [dataStream, setDataStream] = useState("");
  useEffect(() => {
    const chars = "01ABCDEFabcdef0987654321";
    const interval = setInterval(() => {
      let txt = "";
      for (let i = 0; i < 150; i++) {
        txt += chars[Math.floor(Math.random() * chars.length)];
        if ((i + 1) % 15 === 0) txt += "\n";
        else txt += " ";
      }
      setDataStream(txt);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newUserMsg = {
      id: Date.now(),
      sender: "user",
      text: inputText,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, newUserMsg]);
    setInputText("");
  };

  return (
    <div className="relative flex h-screen w-full overflow-hidden bg-[#1a0a00] font-['Inter',sans-serif] text-white">
      {/* Subtle Background */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,#4a1200_0%,#1a0800_60%,#0a0400_100%)] opacity-60" />

      {/* Circuit SVG Background (Faint) */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.05]"
        viewBox="0 0 1200 800"
        preserveAspectRatio="none"
      >
        <g stroke="#ff8c32" strokeWidth="1" fill="none">
          <path d="M0 680 H200 V640 H350 V680 H500" />
          <path d="M700 680 H900 V640 H1050 V680 H1200" />
          <circle cx="200" cy="680" r="4" fill="#ff8c32" />
          <circle cx="350" cy="640" r="4" fill="#ff8c32" />
        </g>
      </svg>

      {/* LEFT SIDEBAR - Navigation & History */}
      <div className="relative z-10 hidden w-[280px] flex-col border-r border-[#78502840] bg-[#0a0400cc] backdrop-blur-md md:flex">
        <div className="flex items-center gap-3 border-b border-[#78502840] p-6">
          <div className="flex h-8 w-8 items-center justify-center rounded-full border border-[#ff8c3266] bg-[#ff8c3220] text-sm">
            🧠
          </div>
          <span className="text-lg font-bold tracking-widest text-[#ffcc60]">
            obito.
          </span>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <div className="mb-4 text-xs font-semibold uppercase tracking-[2px] text-[#ff8c3280]">
            Recent Threads
          </div>
          <div className="flex flex-col gap-2">
            {[
              "Code Refactoring Analysis",
              "Project Roadmap v2",
              "Database Schema Migration",
              "Weekly Sync Notes",
            ].map((thread, i) => (
              <button
                key={i}
                className="flex items-center gap-3 rounded-lg border border-transparent px-3 py-2.5 text-left text-sm text-white/70 transition-colors hover:border-[#78502866] hover:bg-[#ff8c3210] hover:text-white"
              >
                <span className="text-[#ff8c3280]">💬</span>
                <span className="truncate">{thread}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="border-t border-[#78502840] p-4">
          <button className="flex w-full items-center justify-center gap-2 rounded-full border border-[#ff8c3266] bg-[#ff8c3210] py-2.5 text-sm font-semibold text-[#ffcc60] transition-colors hover:bg-[#ff8c3220]">
            <span className="text-lg">+</span> New Protocol
          </button>
        </div>
      </div>

      {/* CENTER - Main Chat Area */}
      <div className="relative z-10 flex flex-1 flex-col">
        {/* Top Header */}
        <header className="flex items-center justify-between border-b border-[#78502840] bg-[#1a0a00cc] p-5 backdrop-blur-md">
          <div>
            <h2 className="text-base font-semibold">Active Session</h2>
            <p className="font-mono text-xs text-[#ff8c3280]">
              NODE: ONLINE • LATENCY: 12ms
            </p>
          </div>
          <button className="rounded-full border border-[#78502880] px-4 py-1.5 text-xs font-medium text-white/70 transition-colors hover:bg-white/5">
            End Session
          </button>
        </header>

        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="mx-auto flex max-w-3xl flex-col gap-6">
            {messages.map((msg, idx) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className={`flex gap-4 ${msg.sender === "user" ? "flex-row-reverse" : "flex-row"}`}
              >
                {/* Avatar */}
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#78502866] bg-[#1a0a00]">
                  {msg.sender === "obito" ? (
                    <img
                      src={obito}
                      alt="obito"
                      className="h-6 w-6 object-contain"
                      onError={(e) => {
                        e.target.style.display = "none";
                        e.target.nextSibling.style.display = "block";
                      }}
                    />
                  ) : (
                    <div className="text-sm">👤</div>
                  )}
                  <div
                    className="hidden text-[10px]"
                    style={{ display: "none" }}
                  >
                    🤖
                  </div>
                </div>

                {/* Message Bubble */}
                <div
                  className={`flex max-w-[80%] flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}
                >
                  <div className="mb-1 flex items-center gap-2">
                    <span className="text-xs font-medium text-white/50">
                      {msg.sender === "user" ? "You" : "Obito"}
                    </span>
                    <span className="font-mono text-[10px] text-[#ff8c3266]">
                      {msg.timestamp}
                    </span>
                  </div>
                  <div
                    className={`whitespace-pre-wrap rounded-2xl border p-4 text-sm leading-relaxed shadow-lg ${
                      msg.sender === "user"
                        ? "rounded-tr-sm border-[#ff8c3266] bg-gradient-to-br from-[#32230f] to-[#231608] text-white"
                        : "rounded-tl-sm border-[#78502840] bg-[#1e1206cc] text-white/90 backdrop-blur-sm"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Input Area */}
        <div className="p-4 md:p-6">
          <div className="mx-auto max-w-3xl">
            <div className="relative rounded-2xl border-[1.5px] border-[#78502880] bg-[#1e1206f2] p-2 shadow-[0_0_0_1px_rgba(255,120,40,0.1),0_8px_30px_rgba(0,0,0,0.4)] backdrop-blur-md focus-within:border-[#ff8c3299] focus-within:shadow-[0_0_15px_rgba(255,140,50,0.2)] transition-all duration-300">
              {/* Decorative Tech Corners */}
              <div className="absolute left-1.5 top-1.5 h-2 w-2 border-l border-t border-[#ff8c3266]" />
              <div className="absolute right-1.5 top-1.5 h-2 w-2 border-r border-t border-[#ff8c3266]" />
              <div className="absolute bottom-1.5 left-1.5 h-2 w-2 border-b border-l border-[#ff8c3266]" />
              <div className="absolute bottom-1.5 right-1.5 h-2 w-2 border-b border-r border-[#ff8c3266]" />

              <form
                onSubmit={handleSend}
                className="flex items-end gap-2 relative z-10"
              >
                <button
                  type="button"
                  className="p-3 text-white/40 hover:text-[#ffcc60] transition-colors"
                >
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
                      d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                    />
                  </svg>
                </button>

                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Transmit your query to Obito..."
                  className="max-h-[150px] min-h-[44px] w-full resize-none bg-transparent py-3 text-sm text-white placeholder-white/30 outline-none"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSend(e);
                    }
                  }}
                />

                <button
                  type="submit"
                  disabled={!inputText.trim()}
                  className="mb-1 mr-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#ff8c32] to-[#e87030] text-white shadow-[0_0_15px_rgba(255,140,50,0.4)] disabled:opacity-50 disabled:shadow-none transition-all hover:scale-105 active:scale-95"
                >
                  <svg
                    width="18"
                    height="18"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 12h14M12 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </form>
            </div>
            <div className="mt-2 text-center font-mono text-[10px] text-white/30">
              Obito AI v2.0.4 // SHINOBI PROTOCOL ACTIVE
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT SIDEBAR - Context & Status Stream */}
      <div className="relative z-10 hidden w-[260px] flex-col border-l border-[#78502840] bg-[#0a0400cc] backdrop-blur-md lg:flex">
        <div className="border-b border-[#78502840] p-5">
          <div className="text-xs font-bold uppercase tracking-[2px] text-white/70">
            Neural Context
          </div>
        </div>

        <div className="flex-1 p-5">
          {/* Status Rings */}
          <div className="mb-8 flex items-center justify-center">
            <div className="relative flex h-32 w-32 items-center justify-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
                className="absolute inset-0 rounded-full border border-dashed border-[#ff8c3266]"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
                className="absolute inset-2 rounded-full border border-[#78502880]"
              />
              <div className="text-center">
                <div className="font-mono text-xl font-bold text-[#ffcc60]">
                  98%
                </div>
                <div className="text-[9px] uppercase tracking-wider text-white/40">
                  Sync Rate
                </div>
              </div>
            </div>
          </div>

          {/* Active Memory Blocks */}
          <div className="mb-6">
            <div className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-[#ff8c3280]">
              Active Memory
            </div>
            <div className="flex flex-wrap gap-2">
              {["React", "Framer Motion", "Tailwind", "Git History"].map(
                (tag) => (
                  <span
                    key={tag}
                    className="rounded border border-[#78502866] bg-[#1a0a00] px-2 py-1 font-mono text-[9px] text-white/60"
                  >
                    {tag}
                  </span>
                ),
              )}
            </div>
          </div>

          {/* Data Stream Box */}
          <div className="relative h-48 overflow-hidden rounded-lg border border-[#78502840] bg-[#1a0a00] p-3 shadow-inner">
            <div className="absolute left-0 top-0 h-[1px] w-full bg-gradient-to-r from-transparent via-[#ff8c32] to-transparent opacity-50" />
            <motion.div
              className="font-mono text-[8px] leading-[1.6] tracking-wider text-[#ff8c3240]"
              key={dataStream}
              initial={{ opacity: 0.5 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {dataStream}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ObitoChatInterface;
