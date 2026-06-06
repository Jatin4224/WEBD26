import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

// --- ASSETS (Replace with your actual paths) ---
import obitoAvatar from "../assets/obitoAI.png";
import obitoAngry from "../assets/angry.png";
import obitoCurious from "../assets/curious.png";
import obitoConfident from "../assets/confident.png";

const ASSETS = {
  avatar: obitoAvatar || "https://via.placeholder.com/150",
  fullConfident: obitoConfident || "https://via.placeholder.com/400",
  fullThinking: obitoCurious || "https://via.placeholder.com/400",
  fullSerious: obitoAngry || "https://via.placeholder.com/400",
};

// --- THE EXACT GRID FROM YOUR UPLOADED IMAGE ---
const MANGA_PAGE_LAYOUT = [
  { left: "1%", top: "1%", width: "55%", height: "23.5%", clipPath: "none" },
  { left: "57%", top: "1%", width: "42%", height: "23.5%", clipPath: "none" },
  {
    left: "1%",
    top: "25.5%",
    width: "32%",
    height: "23.5%",
    clipPath: "polygon(0 0, 100% 0, 68.75% 100%, 0 100%)",
  },
  {
    left: "24%",
    top: "25.5%",
    width: "42%",
    height: "23.5%",
    clipPath: "polygon(23.8% 0, 100% 0, 76.2% 100%, 0 100%)",
  },
  {
    left: "57%",
    top: "25.5%",
    width: "42%",
    height: "23.5%",
    clipPath: "polygon(23.8% 0, 100% 0, 100% 100%, 0 100%)",
  },
  {
    left: "1%",
    top: "50%",
    width: "74%",
    height: "23.5%",
    clipPath: "polygon(0 0, 100% 0, 79.7% 100%, 0 100%)",
  },
  {
    left: "61%",
    top: "50%",
    width: "38%",
    height: "23.5%",
    clipPath: "polygon(39.5% 0, 100% 0, 100% 100%, 0 100%)",
  },
  {
    left: "1%",
    top: "74.5%",
    width: "54%",
    height: "23.5%",
    clipPath: "polygon(0 0, 100% 0, 72.2% 100%, 0 100%)",
  },
  {
    left: "41%",
    top: "74.5%",
    width: "58%",
    height: "23.5%",
    clipPath: "polygon(25.9% 0, 100% 0, 100% 100%, 0 100%)",
  },
];

export default function MangaGridForm() {
  const [questions, setQuestions] = useState([]);
  const [questionText, setQuestionText] = useState(
    "What is your shinobi name?",
  );
  const [expression, setExpression] = useState("Confident");
  const [fieldType, setFieldType] = useState("Short Text");
  const [mode, setMode] = useState("build");

  const expressions = [
    { label: "Confident", icon: "💥" },
    { label: "Thinking", icon: "💭" },
    { label: "Serious", icon: "💢" },
  ];

  const handleAddQuestion = (e) => {
    e.preventDefault();
    if (!questionText.trim()) return;
    setQuestions([
      ...questions,
      { id: Date.now(), text: questionText, type: fieldType, expression },
    ]);
    setQuestionText("");
  };

  return (
    <div className="min-h-screen w-full text-black font-sans overflow-x-hidden selection:bg-yellow-400 selection:text-black">
      {/* GLOBAL STYLES & GRUNGE BACKGROUND GENERATOR */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bangers&family=Kalam:wght@400;700&display=swap');
        .font-manga-bold { font-family: 'Bangers', cursive; letter-spacing: 0.05em; }
        .font-manga-text { font-family: 'Kalam', cursive; }
        
        /* The New Grunge Gradient Background */
        .bg-grunge-texture {
          background-color: #350929; /* Deep Purple Base */
          background-image: 
            radial-gradient(ellipse at center, rgba(217, 101, 27, 0.95) 0%, rgba(154, 32, 54, 0.85) 45%, rgba(53, 9, 41, 1) 100%),
            url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
          background-blend-mode: normal, overlay;
        }

        .manga-halftone {
          background-image: radial-gradient(circle, #000 1.5px, transparent 1.5px);
          background-size: 10px 10px;
          opacity: 0.1;
        }
        .manga-speedlines {
          background: repeating-linear-gradient(90deg, transparent, transparent 10px, rgba(0,0,0,0.1) 10px, rgba(0,0,0,0.1) 12px);
        }
        .manga-shadow { box-shadow: 6px 6px 0px 0px #000000; }
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #350929; border-left: 2px solid black; }
        ::-webkit-scrollbar-thumb { background: #d9651b; }
      `}</style>

      {mode === "build" ? (
        <StoryboardEditor
          questions={questions}
          questionText={questionText}
          setQuestionText={setQuestionText}
          expression={expression}
          setExpression={setExpression}
          fieldType={fieldType}
          setFieldType={setFieldType}
          expressions={expressions}
          handleAddQuestion={handleAddQuestion}
          onLaunch={() => setMode("read")}
        />
      ) : (
        <MangaGridReader
          questions={questions}
          onClose={() => setMode("build")}
        />
      )}
    </div>
  );
}

/* ========================================= */
/* 1. BUILDER MODE                           */
/* ========================================= */
function StoryboardEditor({
  questions,
  questionText,
  setQuestionText,
  expression,
  setExpression,
  fieldType,
  setFieldType,
  expressions,
  handleAddQuestion,
  onLaunch,
}) {
  const previewEndRef = useRef(null);
  useEffect(
    () => previewEndRef.current?.scrollIntoView({ behavior: "smooth" }),
    [questions],
  );

  return (
    <div className="flex h-screen w-full bg-grunge-texture">
      {/* LEFT: SCRIPT WRITER */}
      <div className="w-[450px] shrink-0 border-r-4 border-black bg-white flex flex-col relative z-20">
        <header className="p-6 border-b-4 border-black bg-black text-white">
          <h1 className="text-4xl font-manga-bold tracking-widest uppercase text-yellow-400">
            Page Layout
          </h1>
          <p className="text-sm font-manga-text font-bold">
            Draft your 9-panel form...
          </p>
        </header>
        <div className="flex-1 overflow-y-auto p-6 space-y-6 relative">
          <div className="absolute inset-0 manga-halftone pointer-events-none" />
          <form
            onSubmit={handleAddQuestion}
            className="relative z-10 space-y-6"
          >
            <div className="bg-white border-4 border-black manga-shadow p-5">
              <label className="block text-xl font-manga-bold uppercase mb-3">
                1. Dialogue
              </label>
              <textarea
                value={questionText}
                onChange={(e) => setQuestionText(e.target.value)}
                placeholder="What is your mission?"
                className="w-full border-2 border-black p-3 font-manga-text text-lg outline-none focus:bg-yellow-50 resize-none h-24"
              />
            </div>
            <div className="bg-white border-4 border-black manga-shadow p-5">
              <label className="block text-xl font-manga-bold uppercase mb-3">
                2. Sensei's Emotion
              </label>
              <div className="grid grid-cols-3 gap-2">
                {expressions.map((exp) => (
                  <button
                    key={exp.label}
                    type="button"
                    onClick={() => setExpression(exp.label)}
                    className={`border-2 border-black py-2 font-manga-bold text-sm uppercase ${expression === exp.label ? "bg-black text-white" : "bg-white hover:bg-gray-200"}`}
                  >
                    <span className="block text-2xl">{exp.icon}</span>
                    {exp.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="bg-white border-4 border-black manga-shadow p-5">
              <label className="block text-xl font-manga-bold uppercase mb-3">
                3. Input Type
              </label>
              <div className="grid grid-cols-2 gap-2">
                {["Short Text", "Email", "Phone", "Number"].map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setFieldType(type)}
                    className={`border-2 border-black py-2 font-manga-bold uppercase ${fieldType === type ? "bg-black text-white" : "bg-white hover:bg-gray-200"}`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-yellow-400 border-4 border-black py-4 text-3xl font-manga-bold uppercase manga-shadow hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
            >
              Add Panel !
            </button>
          </form>
        </div>
      </div>

      {/* RIGHT: STORYBOARD LIST */}
      <div className="flex-1 overflow-y-auto p-12 flex flex-col items-center">
        <div className="w-full max-w-2xl border-4 border-black bg-white p-4 mb-8 flex justify-between items-center manga-shadow">
          <h2 className="text-2xl font-manga-bold uppercase">
            Panels ({questions.length}/9 per page)
          </h2>
          <button
            onClick={onLaunch}
            className="bg-black text-white font-manga-bold px-6 py-2 uppercase text-xl hover:bg-yellow-400 hover:text-black transition-colors"
          >
            Publish Page ►
          </button>
        </div>
        <div className="w-full max-w-2xl space-y-4">
          {questions.map((q, idx) => (
            <div
              key={q.id}
              className="w-full border-4 border-black p-4 flex gap-4 bg-white relative manga-shadow"
            >
              <div className="absolute top-0 right-0 bg-black text-white font-manga-bold px-2">
                Panel {idx + 1}
              </div>
              <div className="w-16 h-16 border-2 border-black bg-gray-100 overflow-hidden relative">
                <img
                  src={getExpressionAsset(q.expression)}
                  className="w-full h-full object-cover relative z-10 scale-125 pt-2"
                  alt="sensei"
                />
              </div>
              <div className="flex-1">
                <p className="font-manga-text font-bold text-lg leading-tight">
                  "{q.text}"
                </p>
                <span className="text-xs font-manga-bold uppercase bg-yellow-200 px-2 py-1 mt-1 inline-block border border-black">
                  {q.type}
                </span>
              </div>
            </div>
          ))}
          <div ref={previewEndRef} className="h-20" />
        </div>
      </div>
    </div>
  );
}

/* ========================================= */
/* 2. MANGA GRID READER (With New Background)*/
/* ========================================= */
function MangaGridReader({ questions, onClose }) {
  const [formData, setFormData] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const pages = [];
  for (let i = 0; i < questions.length; i += 9) {
    pages.push(questions.slice(i, i + 9));
  }
  if (pages.length === 0) pages.push([]);

  const handleInput = (id, value) =>
    setFormData((prev) => ({ ...prev, [id]: value }));
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  if (isSubmitted) return <SuccessPanel onClose={onClose} />;

  return (
    <div className="min-h-screen w-full py-12 px-4 flex flex-col items-center bg-grunge-texture">
      <div className="fixed top-4 right-4 z-50 bg-black text-white font-manga-bold px-4 py-2 border-4 border-white shadow-xl flex gap-4">
        <button onClick={onClose} className="text-yellow-400 hover:text-white">
          Exit Editor ✖
        </button>
      </div>

      <form onSubmit={handleSubmit} className="w-full max-w-4xl space-y-16">
        {pages.map((pageQuestions, pageIndex) => (
          <div key={pageIndex} className="w-full flex flex-col items-center">
            {/* Page Header - Updated to white/yellow for contrast against dark background */}
            <div className="w-full max-w-[900px] flex justify-between items-end mb-4 px-2">
              <h2 className="font-manga-bold text-4xl text-white drop-shadow-md">
                PAGE {pageIndex + 1}
              </h2>
              <span className="font-manga-text text-yellow-400 font-bold text-xl drop-shadow-sm">
                The Interrogation
              </span>
            </div>

            {/* The 9-Panel Grid Wrapper */}
            <div className="relative w-full max-w-[900px] aspect-[1/1.3] bg-black border-4 border-black shadow-[12px_12px_0_0_#000]">
              {MANGA_PAGE_LAYOUT.map((layout, index) => {
                const question = pageQuestions[index];

                return question ? (
                  <PanelQuestion
                    key={question.id}
                    layout={layout}
                    question={question}
                    value={formData[question.id] || ""}
                    onChange={(val) => handleInput(question.id, val)}
                  />
                ) : (
                  <PanelFiller
                    key={`filler-${index}`}
                    layout={layout}
                    index={index}
                  />
                );
              })}
            </div>
          </div>
        ))}

        <div className="flex justify-center pb-20">
          <button
            type="submit"
            className="bg-yellow-400 border-8 border-black px-16 py-6 font-manga-bold text-5xl uppercase shadow-[8px_8px_0_0_#000] hover:translate-x-2 hover:translate-y-2 hover:shadow-none transition-all"
          >
            Submit Record!
          </button>
        </div>
      </form>
    </div>
  );
}

/* --- Active Question Panel --- */
function PanelQuestion({ layout, question, value, onChange }) {
  return (
    <div
      className="absolute bg-white overflow-hidden group flex flex-col"
      style={{
        left: layout.left,
        top: layout.top,
        width: layout.width,
        height: layout.height,
        clipPath: layout.clipPath,
      }}
    >
      <div className="absolute inset-0 manga-halftone z-0 pointer-events-none" />

      <img
        src={getExpressionAsset(question.expression)}
        alt="Sensei"
        className="absolute -bottom-4 -right-10 h-[120%] opacity-40 object-contain mix-blend-multiply z-0 pointer-events-none grayscale"
      />

      <div className="relative z-10 w-full h-full flex flex-col justify-between p-4 md:p-6">
        <div className="self-start bg-white border-4 border-black p-3 inline-block shadow-[4px_4px_0_0_#000] relative max-w-[80%]">
          <div className="absolute -bottom-3 left-6 w-4 h-4 bg-white border-b-4 border-r-4 border-black rotate-45" />
          <p className="font-manga-text font-bold text-sm md:text-xl leading-tight">
            {question.text}
          </p>
        </div>

        <input
          type={
            question.type === "Email"
              ? "email"
              : question.type === "Number"
                ? "number"
                : "text"
          }
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="TYPE HERE..."
          required
          className="self-end mt-4 w-[90%] bg-white/90 backdrop-blur-sm border-4 border-black p-2 md:p-4 font-manga-bold text-xl md:text-3xl uppercase outline-none focus:bg-yellow-200 transition-colors shadow-[4px_4px_0_0_#000] focus:translate-x-1 focus:translate-y-1 focus:shadow-none"
        />
      </div>
    </div>
  );
}

/* --- Filler Panel for Empty Grid Slots --- */
function PanelFiller({ layout, index }) {
  const fillers = ["ゴゴゴ", "ドン", "...", "!!", "シーン"];
  const symbol = fillers[index % fillers.length];

  return (
    <div
      className="absolute bg-white overflow-hidden flex items-center justify-center"
      style={{
        left: layout.left,
        top: layout.top,
        width: layout.width,
        height: layout.height,
        clipPath: layout.clipPath,
      }}
    >
      <div className="absolute inset-0 manga-speedlines opacity-40" />
      <span className="relative z-10 font-manga-bold text-6xl md:text-8xl text-black/20 transform rotate-12 select-none">
        {symbol}
      </span>
    </div>
  );
}

/* --- Success Screen --- */
function SuccessPanel({ onClose }) {
  return (
    <div className="min-h-screen w-full flex items-center justify-center p-6 bg-grunge-texture">
      <motion.div
        initial={{ scale: 0.5, rotate: -5, opacity: 0 }}
        animate={{ scale: 1, rotate: 0, opacity: 1 }}
        transition={{ type: "spring", bounce: 0.6 }}
        className="relative bg-white border-[16px] border-white w-full max-w-5xl h-[80vh] flex flex-col items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 bg-black" />
        <div className="absolute inset-0 manga-speedlines opacity-50 bg-[#d9651b] mix-blend-screen" />
        <h1 className="relative z-10 text-[10vw] font-manga-bold text-white uppercase tracking-widest drop-shadow-[8px_8px_0_#d9651b] text-center leading-none">
          MISSION
          <br />
          ACCOMPLISHED!!
        </h1>
        <button
          onClick={onClose}
          className="relative z-10 mt-12 bg-white text-black border-4 border-black font-manga-bold px-8 py-4 text-3xl manga-shadow hover:bg-yellow-400"
        >
          Return to HQ
        </button>
      </motion.div>
    </div>
  );
}

function getExpressionAsset(label) {
  switch (label) {
    case "Serious":
      return ASSETS.fullSerious;
    case "Thinking":
      return ASSETS.fullThinking;
    case "Confident":
    default:
      return ASSETS.fullConfident;
  }
}
