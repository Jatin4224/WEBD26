import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";

// ⚠️ IMPORT YOUR MARKDOWN FILE HERE (Depends on Vite/Create-React-App setup)
import readmeContent from "./README.md?raw";
// --- REUSABLE ICONS ---
const Icons = {
  BookOpen: (props) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  ),
  Code: (props) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  ),
};

// --- FLOATING PARTICLES (PEACH) ---
const Particles = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {[...Array(15)].map((_, i) => (
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

// --- MAC-STYLE CODE BLOCK ---
const CodeBlock = ({ code, language }) => (
  <div className="relative group rounded-2xl overflow-hidden bg-[#050403] border border-[#ffbda7]/10 my-6 shadow-[0_0_30px_rgba(255,189,167,0.05)]">
    <div className="absolute top-0 left-0 w-full h-10 bg-[#ffbda7]/5 border-b border-[#ffbda7]/10 flex items-center justify-between px-4 backdrop-blur-md">
      <div className="flex gap-2">
        <div className="w-2.5 h-2.5 rounded-full bg-zinc-700 hover:bg-red-500 transition-colors"></div>
        <div className="w-2.5 h-2.5 rounded-full bg-zinc-700 hover:bg-yellow-500 transition-colors"></div>
        <div className="w-2.5 h-2.5 rounded-full bg-zinc-700 hover:bg-green-500 transition-colors"></div>
      </div>
      <span className="text-[10px] uppercase tracking-wider text-[#ffbda7]/60 font-semibold">
        {language || "jsx"}
      </span>
    </div>
    <div className="p-4 pt-14 overflow-x-auto text-sm font-mono leading-relaxed text-[#ffe4db]/90 selection:bg-[#ffbda7]/30">
      <pre>
        <code>{code}</code>
      </pre>
    </div>
  </div>
);

// --- MAIN DYNAMIC COMPONENT ---
export const NotesShowcase = () => {
  const [markdownParts, setMarkdownParts] = useState([]);
  const [toc, setToc] = useState([]); // Table of Contents for sidebar

  useEffect(() => {
    // 1. Split markdown by "# " (H1 tags)
    const sections = readmeContent
      .split(/(?=^#\s)/m)
      .filter((s) => s.trim().length > 0);
    setMarkdownParts(sections);

    // 2. Extract H1 titles for the sidebar menu
    const headers = sections.map((section) => {
      const firstLine = section.split("\n")[0];
      return firstLine.replace("# ", "").trim();
    });
    setToc(headers);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  // Maps standard markdown tags to our beautiful Tailwind UI components
  const MarkdownComponents = {
    h1: ({ children }) => (
      <h2 className="text-3xl text-[#ffcba4] font-cinzel mb-8 flex items-center gap-3 border-b border-[#ffbda7]/10 pb-4">
        <span className="text-zinc-700">#</span> {children}
      </h2>
    ),
    h2: ({ children }) => (
      <h3 className="text-xl font-bold text-zinc-100 mb-2 mt-10">{children}</h3>
    ),
    h3: ({ children }) => (
      <h4 className="text-[#ff9a76] font-medium text-sm tracking-wide mb-2 uppercase mt-4">
        {children}
      </h4>
    ),
    p: ({ children }) => (
      <p className="text-zinc-400 leading-relaxed text-sm mb-4">{children}</p>
    ),
    ul: ({ children }) => (
      <ul className="list-disc list-outside ml-4 text-zinc-400 text-sm leading-relaxed space-y-2 mb-6">
        {children}
      </ul>
    ),
    li: ({ children }) => <li className="text-zinc-400">{children}</li>,
    code: ({ node, inline, className, children, ...props }) => {
      const match = /language-(\w+)/.exec(className || "");
      if (!inline) {
        return (
          <CodeBlock
            code={String(children).replace(/\n$/, "")}
            language={match?.[1]}
          />
        );
      }
      return (
        <code
          className="text-[#ffbda7] bg-[#ffbda7]/10 px-1.5 py-0.5 rounded font-mono text-xs"
          {...props}
        >
          {children}
        </code>
      );
    },
  };

  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@700&display=swap');
          .font-cinzel { font-family: 'Cinzel Decorative', serif; font-weight: 700; }
        `}
      </style>

      <section className="relative min-h-screen bg-[#0a0807] text-white overflow-hidden font-sans selection:bg-[#ffbda7]/30 selection:text-[#ffe4db]">
        {/* Background Grids & Glows */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,189,167,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,189,167,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] z-0 fixed" />
        <div className="fixed top-[-10%] right-[-5%] w-[50%] h-[50%] bg-[#ffbda7]/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="fixed bottom-[-10%] left-[-5%] w-[40%] h-[40%] bg-[#ff9a76]/5 blur-[100px] rounded-full pointer-events-none" />
        <Particles />

        {/* 
          UPDATED TO FULL WIDTH: max-w-[1600px] provides a much wider, full-screen feel 
        */}
        <div className="w-full max-w-[1600px] mx-auto px-6 sm:px-12 py-20 lg:py-24 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* LEFT SIDEBAR (Sticky) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-3 xl:col-span-4 lg:sticky lg:top-24 flex flex-col items-start"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#ffbda7]/30 bg-[#ffbda7]/10 backdrop-blur-md mb-6 shadow-[0_0_15px_rgba(255,189,167,0.15)] font-cinzel">
              <Icons.BookOpen className="w-4 h-4 text-[#ffbda7]" />
              <span className="text-xs uppercase tracking-[0.15em] text-[#ffbda7] mt-0.5">
                Documentation
              </span>
            </div>

            <h1 className="text-4xl xl:text-5xl font-bold leading-[1.1] mb-4 text-zinc-100 font-cinzel tracking-tight">
              Mastering <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ffcba4] to-[#ff9a76] drop-shadow-sm">
                Framer Motion
              </span>
            </h1>

            <p className="text-zinc-400 text-base xl:text-lg leading-relaxed mb-8 border-l-2 border-[#ffbda7]/30 pl-4">
              My personal notes covering core animations, motion values,
              draggability, CSS variables, and advanced exit transitions.
            </p>

            {/* Dynamic Table of Contents fetched from Markdown */}
            <div className="hidden lg:flex flex-col gap-3 w-full">
              {toc.map((partTitle, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-[#ffbda7]/10 text-sm text-zinc-400 hover:text-[#ffbda7] hover:bg-[#ffbda7]/5 transition-colors cursor-pointer"
                >
                  <Icons.Code className="w-4 h-4 flex-shrink-0" />
                  <span className="truncate">{partTitle}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT CONTENT (Dynamically Rendered Markdown Cards) */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-9 xl:col-span-8 flex flex-col gap-8"
          >
            {markdownParts.length > 0 ? (
              markdownParts.map((sectionContent, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="bg-[#0a0807]/60 backdrop-blur-xl border border-[#ffbda7]/10 rounded-[2rem] p-6 md:p-10 shadow-[0_0_30px_rgba(0,0,0,0.3)]"
                >
                  <ReactMarkdown components={MarkdownComponents}>
                    {sectionContent}
                  </ReactMarkdown>
                </motion.div>
              ))
            ) : (
              <div className="text-zinc-500 animate-pulse mt-10">
                Loading notes from README.md...
              </div>
            )}
          </motion.div>
        </div>
      </section>
    </>
  );
};
