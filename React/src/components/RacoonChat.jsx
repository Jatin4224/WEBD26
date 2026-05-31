import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import racoon from "../assets/racoon.png"; // Ensure this path matches your setup

const RaccoonChat = () => {
  const [inputText, setInputText] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "raccoon",
      text: "Good morning! I've organized your schedule for the day and prepared a quick summary of your reading list. What would you like to start with?",
      time: "09:00 AM",
    },
    {
      id: 2,
      sender: "user",
      text: "Can you give me the summary of the reading list first?",
      time: "09:05 AM",
    },
    {
      id: 3,
      sender: "raccoon",
      text: "Of course. You have three main articles saved. The most pressing is the 'React Server Components' deep dive. It covers the new rendering paradigms and takes about 15 minutes to read. Shall I pull up the key bullet points?",
      time: "09:05 AM",
    },
  ]);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMsg = {
      id: Date.now(),
      sender: "user",
      text: inputText,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputText("");

    // Simulate AI typing response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: "raccoon",
          text: "I'm on it. Processing your request now...",
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
    }, 1000);
  };

  return (
    <div className="relative flex h-screen w-full overflow-hidden bg-[#f0e8dc] font-['DM_Sans',sans-serif] text-[#2d1508]">
      {/* Light faded brown gradient with subtle linen texture overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background: `
            url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4'%3E%3Crect width='4' height='4' fill='transparent'/%3E%3Crect x='0' y='0' width='2' height='2' fill='%23c8b6a6' opacity='0.4'/%3E%3Crect x='2' y='2' width='2' height='2' fill='%23c8b6a6' opacity='0.4'/%3E%3C/svg%3E"),
            linear-gradient(135deg, #f4eee8 0%, #d8c8b8 100%)
          `,
        }}
      />

      {/* LEFT SIDEBAR - History & Navigation */}
      <aside className="relative z-10 hidden w-[280px] flex-col border-r border-[#b4825a]/20 bg-white/30 backdrop-blur-md md:flex">
        {/* Brand/Logo */}
        <div className="flex items-center gap-2.5 p-6 text-lg font-semibold text-[#3d1e0e]">
          <svg
            className="h-8 w-8"
            viewBox="0 0 36 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="36" height="36" rx="10" fill="#3d1e0e" />
            <text x="18" y="25" textAnchor="middle" fontSize="20">
              🦝
            </text>
          </svg>
          raccoon
        </div>

        {/* New Chat Button */}
        <div className="px-5 pb-4">
          <button className="flex w-full items-center justify-center gap-2 rounded-full border border-[#b4825a]/40 bg-white/50 py-2.5 text-sm font-medium text-[#3d1e0e] shadow-sm transition-colors hover:bg-white/80 hover:shadow">
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
            New conversation
          </button>
        </div>

        {/* History List */}
        <div className="flex-1 overflow-y-auto px-3">
          <div className="mb-2 px-3 pt-2 text-xs font-semibold uppercase tracking-wider text-[#6b4c30]/70">
            Recent
          </div>
          <div className="flex flex-col gap-1">
            {[
              "Reading list summary",
              "Weekly meal planning",
              "React component refactor",
              "Gift ideas for Sarah",
            ].map((title, i) => (
              <button
                key={i}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-colors ${
                  i === 0
                    ? "bg-[#c17a3a]/10 font-medium text-[#3d1e0e]"
                    : "text-[#6b4c30] hover:bg-white/40"
                }`}
              >
                <svg
                  width="16"
                  height="16"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="opacity-60"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
                <span className="truncate">{title}</span>
              </button>
            ))}
          </div>
        </div>

        {/* User Profile Area */}
        <div className="border-t border-[#b4825a]/20 p-4">
          <button className="flex w-full items-center gap-3 rounded-xl p-2 transition-colors hover:bg-white/40">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#3d1e0e] text-xs font-bold text-white">
              US
            </div>
            <div className="flex-1 text-left">
              <div className="text-sm font-semibold text-[#3d1e0e]">
                User Account
              </div>
              <div className="text-xs text-[#6b4c30]">Pro Plan</div>
            </div>
          </button>
        </div>
      </aside>

      {/* MAIN CHAT AREA */}
      <main className="relative z-10 flex flex-1 flex-col">
        {/* Mobile Header */}
        <header className="flex items-center justify-between border-b border-[#b4825a]/20 bg-white/30 p-4 backdrop-blur-md md:hidden">
          <div className="flex items-center gap-2 font-semibold text-[#3d1e0e]">
            <span>🦝</span> raccoon
          </div>
          <button className="text-[#3d1e0e]">
            <svg
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </header>

        {/* Chat Feed */}
        <div className="flex-1 overflow-y-auto px-4 py-8 md:px-8">
          <div className="mx-auto flex max-w-3xl flex-col gap-8">
            <AnimatePresence>
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-4 ${msg.sender === "user" ? "flex-row-reverse" : "flex-row"}`}
                >
                  {/* Avatar */}
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full shadow-sm">
                    {msg.sender === "raccoon" ? (
                      <div className="flex h-full w-full items-center justify-center rounded-full border border-[#b4825a]/30 bg-white/60 backdrop-blur-md">
                        <img
                          src={racoon}
                          alt="Raccoon"
                          className="h-6 w-6 object-contain"
                          onError={(e) => {
                            e.target.style.display = "none";
                            e.target.nextSibling.style.display = "block";
                          }}
                        />
                        <span
                          className="hidden text-sm"
                          style={{ display: "none" }}
                        >
                          🦝
                        </span>
                      </div>
                    ) : (
                      <div className="flex h-full w-full items-center justify-center rounded-full bg-[#3d1e0e] text-sm text-white">
                        US
                      </div>
                    )}
                  </div>

                  {/* Message Bubble */}
                  <div
                    className={`flex max-w-[80%] flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}
                  >
                    <div className="mb-1 flex items-center gap-2 px-1">
                      <span className="text-xs font-medium text-[#6b4c30]">
                        {msg.sender === "user" ? "You" : "Raccoon Assistant"}
                      </span>
                      <span className="text-[10px] text-[#b4825a]">
                        {msg.time}
                      </span>
                    </div>

                    <div
                      className={`whitespace-pre-wrap px-5 py-3.5 text-[15px] leading-relaxed shadow-sm ${
                        msg.sender === "user"
                          ? "rounded-2xl rounded-tr-sm bg-[#3d1e0e] text-[#f5ede3]"
                          : "rounded-2xl rounded-tl-sm border border-[#b4825a]/20 bg-white/60 text-[#2d1508] backdrop-blur-md"
                      }`}
                    >
                      {/* Using Playfair Display subtly for AI text to give it an elegant, bookish feel */}
                      <span
                        className={
                          msg.sender === "raccoon"
                            ? "font-['Playfair_Display'] text-[16px] tracking-wide"
                            : ""
                        }
                      >
                        {msg.text}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area */}
        <div className="p-4 md:p-6 md:pb-8">
          <div className="mx-auto max-w-3xl">
            <form
              onSubmit={handleSend}
              className="relative flex items-end gap-2 rounded-[24px] border border-[#b4825a]/30 bg-white/50 p-2.5 shadow-[0_8px_32px_rgba(100,50,10,0.08)] backdrop-blur-xl focus-within:border-[#c17a3a]/50 focus-within:bg-white/70 transition-all duration-300"
            >
              <button
                type="button"
                className="mb-1 ml-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[#c17a3a] transition-colors hover:bg-[#c17a3a]/10"
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
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSend(e);
                  }
                }}
                placeholder="Ask raccoon anything..."
                className="max-h-[150px] min-h-[44px] w-full resize-none bg-transparent py-2.5 text-[15px] text-[#2d1508] placeholder-[#b4825a] outline-none"
                rows="1"
              />

              <button
                type="submit"
                disabled={!inputText.trim()}
                className="mb-1 mr-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#3d1e0e] text-white shadow-md transition-transform disabled:opacity-50 disabled:shadow-none hover:scale-105 active:scale-95"
              >
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
                    d="M12 19V5m-7 7l7-7 7 7"
                  />
                </svg>
              </button>
            </form>

            <div className="mt-3 text-center text-xs text-[#6b4c30]/60">
              Raccoon can make mistakes. Consider verifying important
              information.
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RaccoonChat;
