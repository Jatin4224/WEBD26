import React, { useState, useRef, useEffect } from "react";

// Replace these with your actual local imports for the avatar and full-body poses
import obitoAvatar from "../assets/obitoAI.png";
import obitoAngry from "../assets/harsh-angry.png";
import obitoCurious from "../assets/harsh-curious.png";
import obitoConfident from "../assets/confident.png";

// Link your full-body expression assets here:
const ASSETS = {
  avatar: obitoAvatar,
  fullConfident: obitoCurious,
  fullThinking: obitoCurious,
  fullSerious: obitoAngry,
  fullHappy: obitoConfident, // Add a happy asset if you have one!
};

export default function GuidedWebFormBuilder() {
  // --- BUILDER STATE ---
  const [questions, setQuestions] = useState([]);
  const [questionText, setQuestionText] = useState("What is your full name?");
  const [expression, setExpression] = useState("Confident");
  const [fieldType, setFieldType] = useState("Short Text");

  // --- PREVIEW & PUBLISH STATE ---
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [showPublishModal, setShowPublishModal] = useState(false);

  const previewEndRef = useRef(null);

  // Map expressions to the large full-body assets
  const expressions = [
    { image: ASSETS.fullConfident, label: "Confident", emoji: "😎" },
    { image: ASSETS.fullThinking, label: "Thinking", emoji: "🤔" },
    { image: ASSETS.fullSerious, label: "Serious", emoji: "⚠️" },
  ];

  const fieldTypes = [
    "Short Text",
    "Email",
    "Phone",
    "Dropdown",
    "Number",
    "Date",
  ];

  const getInputType = (type) => {
    if (type === "Email") return "email";
    if (type === "Phone") return "tel";
    if (type === "Number") return "number";
    if (type === "Date") return "date";
    return "text";
  };

  const getExpressionImage = (label) => {
    const found = expressions.find((e) => e.label === label);
    return found ? found.image : ASSETS.fullConfident;
  };

  const handleAddQuestion = (e) => {
    if (e) e.preventDefault();
    if (!questionText.trim()) return;

    setQuestions([
      ...questions,
      {
        id: Date.now(),
        text: questionText,
        type: fieldType,
        expression: expression,
        inputType: getInputType(fieldType),
      },
    ]);

    setQuestionText("");
    setFieldType("Short Text");
    setExpression("Confident");
  };

  // Scroll to bottom of builder history
  useEffect(() => {
    if (!isPreviewMode) {
      previewEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [questions, isPreviewMode]);

  // Combine saved questions and the current draft into one array for the preview flow
  const allQuestions = [...questions];
  if (questionText.trim() !== "") {
    allQuestions.push({
      id: "draft",
      text: questionText,
      type: fieldType,
      expression: expression,
      inputType: getInputType(fieldType),
    });
  }

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#f5efe8] text-[#151515] relative">
      {/* ========================================= */}
      {/* PUBLISH SUCCESS MODAL                       */}
      {/* ========================================= */}
      {showPublishModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm transition-all animate-fade-in">
          <div className="bg-white rounded-[32px] p-8 max-w-sm w-full shadow-2xl text-center transform scale-100 animate-pop-in">
            <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-5 shadow-inner">
              <svg
                className="w-10 h-10"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-black mb-2 text-gray-900">
              Form Published!
            </h2>
            <p className="text-gray-500 mb-8 font-medium">
              Your Jutsu Scroll is now live. Shinobi can now start filling it
              out!
            </p>
            <button
              onClick={() => setShowPublishModal(false)}
              className="w-full bg-[#ff4b12] text-white font-black text-lg py-4 rounded-2xl hover:bg-[#e63e09] transition hover:scale-105 shadow-xl shadow-orange-500/20"
            >
              Awesome
            </button>
          </div>
        </div>
      )}

      {/* ========================================= */}
      {/* FULL-SCREEN CINEMATIC PREVIEW MODE          */}
      {/* ========================================= */}
      {isPreviewMode && (
        <CinematicPreview
          questions={allQuestions}
          onClose={() => setIsPreviewMode(false)}
          getExpressionImage={getExpressionImage}
        />
      )}

      {/* ========================================= */}
      {/* LEFT CHAT BUILDER                           */}
      {/* ========================================= */}
      <section className="w-[460px] shrink-0 flex flex-col border-r border-orange-100 bg-[#fffaf4] shadow-2xl relative z-20">
        <header className="flex items-center justify-between px-6 py-5 border-b border-orange-100 bg-white">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-2xl bg-[#ff4b12] p-1 shadow-lg shadow-orange-300/40">
              <img
                src={ASSETS.avatar}
                alt="Obito"
                className="h-full w-full rounded-xl object-cover bg-black/20"
              />
            </div>
            <div>
              <h1 className="text-lg font-black">Obito Form Sensei</h1>
              <p className="text-xs font-semibold text-green-600">
                ● Online — building with you
              </p>
            </div>
          </div>
        </header>

        <div className="flex-1 space-y-6 overflow-y-auto px-5 py-6 scrollbar-hide pb-32">
          <SenseiMessage avatar={ASSETS.avatar}>
            Let’s build this form like a chat. First, what question should I ask
            your users?
          </SenseiMessage>

          {questions.map((q) => (
            <React.Fragment key={q.id}>
              <AdminMessage>{q.text}</AdminMessage>
              <SenseiMessage avatar={ASSETS.avatar}>
                <div className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  Added as <strong>{q.type}</strong> with{" "}
                  <strong>{q.expression}</strong> expression. What's next?
                </div>
              </SenseiMessage>
            </React.Fragment>
          ))}

          <AdminMessage>{questionText || "..."}</AdminMessage>

          <SenseiMessage avatar={ASSETS.avatar}>
            <p className="mb-3">Nice. What type of answer should users give?</p>
            <div className="grid grid-cols-2 gap-2">
              {fieldTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => setFieldType(type)}
                  className={`rounded-xl border px-3 py-3 text-sm font-bold transition ${
                    fieldType === type
                      ? "border-[#ff4b12] bg-[#ff4b12] text-white shadow-md shadow-orange-200"
                      : "border-orange-100 bg-white text-gray-600 hover:border-orange-300 hover:bg-orange-50"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </SenseiMessage>

          <SenseiMessage avatar={ASSETS.avatar} active>
            <p className="mb-4">How should I ask this? Choose my expression.</p>
            <div className="grid grid-cols-2 gap-2">
              {expressions.map((exp) => (
                <button
                  key={exp.label}
                  onClick={() => setExpression(exp.label)}
                  className={`flex items-center gap-3 rounded-xl border p-3 text-sm font-bold transition ${
                    expression === exp.label
                      ? "border-[#ff4b12] bg-orange-50 text-[#ff4b12] shadow-sm"
                      : "border-orange-100 bg-white text-gray-600 hover:bg-orange-50"
                  }`}
                >
                  <span className="text-xl">{exp.emoji}</span>
                  {exp.label}
                </button>
              ))}
            </div>
          </SenseiMessage>
        </div>

        <div className="absolute bottom-0 w-full border-t border-orange-100 bg-white p-4">
          <form onSubmit={handleAddQuestion} className="relative">
            <input
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
              placeholder="Type your question and press Enter..."
              className="w-full rounded-full bg-[#f3f3f3] py-4 pl-5 pr-14 text-sm font-bold outline-none ring-orange-300 transition focus:ring-2 focus:bg-white border border-transparent focus:border-orange-300"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-[#ff4b12] text-white shadow-md hover:bg-[#e63e09] transition hover:scale-105"
            >
              <svg
                className="w-4 h-4 ml-0.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
          </form>
        </div>
      </section>

      {/* ========================================= */}
      {/* RIGHT BUILDER HISTORY                     */}
      {/* ========================================= */}
      <section className="relative flex flex-1 items-center justify-center overflow-hidden bg-[#ff3d00] p-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.28),transparent_28%),radial-gradient(circle_at_80%_80%,rgba(0,0,0,0.22),transparent_35%)]" />

        <div className="relative h-full w-full max-w-5xl overflow-hidden rounded-[34px] border border-white/20 bg-black/10 shadow-2xl backdrop-blur-xl flex flex-col">
          <div className="flex items-center justify-between border-b border-white/10 bg-black/20 px-6 py-4 shrink-0 z-20">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-white/60">
                Builder History
              </p>
              <h2 className="text-xl font-black text-white">
                Form Layout Preview
              </h2>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setIsPreviewMode(true)}
                className="rounded-full bg-white/15 px-5 py-2 text-sm font-bold text-white hover:bg-white/25 transition flex items-center gap-2"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  ></path>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  ></path>
                </svg>
                View as End User
              </button>

              <button
                onClick={() => setShowPublishModal(true)}
                className="rounded-full bg-black px-5 py-2 text-sm font-bold text-white hover:bg-gray-900 transition flex items-center gap-2"
              >
                Publish Form
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                  ></path>
                </svg>
              </button>
            </div>
          </div>

          <div className="flex flex-1 overflow-hidden justify-center bg-black/15">
            <div className="w-full max-w-2xl flex flex-col px-12 py-10 overflow-y-auto scrollbar-hide scroll-smooth">
              {/* History of Completed Questions */}
              {questions.map((q, idx) => (
                <div
                  key={q.id}
                  className="mb-12 opacity-50 pointer-events-none transition-opacity"
                >
                  <p className="mb-5 text-sm font-black uppercase tracking-[0.25em] text-white/60">
                    Question {idx + 1} of {allQuestions.length}
                  </p>
                  <div className="relative mb-6 rounded-[32px] bg-white p-8 shadow-xl flex justify-between items-start gap-4">
                    <div className="absolute -left-4 top-12 h-8 w-8 rotate-45 rounded-md bg-white" />
                    <div className="flex-1">
                      <p className="mb-2 text-sm font-black text-[#ff4b12]">
                        Obito asks
                      </p>
                      <h1 className="text-3xl font-black leading-tight text-black">
                        {q.text}
                      </h1>
                    </div>
                  </div>
                  <div className="rounded-[30px] bg-white/10 p-5">
                    <input
                      disabled
                      placeholder={`Input Type: ${q.type}`}
                      className="w-full rounded-2xl border border-white/10 bg-white/10 px-5 py-4 text-lg font-semibold text-white/50 outline-none"
                    />
                  </div>
                </div>
              ))}

              {/* Current Draft Question */}
              <div className="mb-12 animate-fade-in-up">
                <p className="mb-5 text-sm font-black uppercase tracking-[0.25em] text-white/90">
                  Question {allQuestions.length} of {allQuestions.length}
                </p>

                <div className="relative mb-6 rounded-[32px] bg-white p-8 shadow-2xl flex justify-between items-start gap-4">
                  <div className="absolute -left-4 top-12 h-8 w-8 rotate-45 rounded-md bg-white" />
                  <div className="flex-1">
                    <p className="mb-2 text-sm font-black text-[#ff4b12]">
                      Obito asks
                    </p>
                    <h1 className="text-3xl font-black leading-tight text-black break-words">
                      {questionText || "..."}
                    </h1>
                  </div>
                </div>

                <div className="rounded-[30px] bg-white/15 p-5 backdrop-blur-md border border-white/10 shadow-lg">
                  <input
                    disabled
                    placeholder={`Type your ${fieldType.toLowerCase()} here...`}
                    className="w-full rounded-2xl border border-white/25 bg-white/20 px-5 py-5 text-lg font-semibold text-white placeholder-white/55 outline-none"
                  />
                  <button className="mt-5 w-full rounded-2xl bg-black py-4 text-lg font-black text-white opacity-50 cursor-not-allowed">
                    Continue →
                  </button>
                </div>
              </div>

              <div ref={previewEndRef} className="h-4 w-full"></div>
            </div>
          </div>
        </div>
      </section>

      {/* GLOBAL ANIMATIONS */}
      <style>{`
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        @keyframes pop-in {
          0% { opacity: 0; transform: scale(0.9); }
          100% { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in-up { animation: fade-in-up 0.5s ease-out forwards; }
        .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }
        .animate-pop-in { animation: pop-in 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}

/* ========================================= */
/* CINEMATIC PREVIEW COMPONENT                 */
/* ========================================= */
function CinematicPreview({ questions, onClose, getExpressionImage }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Typewriter state
  const [charIndex, setCharIndex] = useState(0);

  const activeQuestion = questions[currentStep];
  const isComplete = currentStep >= questions.length;
  const progressPercentage = (currentStep / questions.length) * 100;

  // --- Dynamic Theme based on Expression ---
  const getTheme = (expr) => {
    switch (expr) {
      case "Serious":
        return { color: "#ef4444", shadow: "rgba(239,68,68,0.5)" }; // Red
      case "Thinking":
        return { color: "#3b82f6", shadow: "rgba(59,130,246,0.5)" }; // Blue
      case "Confident":
      default:
        return { color: "#ff4b12", shadow: "rgba(255,75,18,0.5)" }; // Orange
    }
  };
  const activeTheme = getTheme(activeQuestion?.expression);

  // --- Typewriter Effect Logic ---
  useEffect(() => {
    // Reset typewriter index on new question
    setCharIndex(0);
  }, [currentStep]);

  useEffect(() => {
    if (!activeQuestion) return;

    // If user starts typing, auto-complete the text instantly
    if (inputValue.length > 0) {
      setCharIndex(activeQuestion.text.length);
      return;
    }

    // Type out character by character
    if (charIndex < activeQuestion.text.length) {
      const timer = setTimeout(() => {
        setCharIndex((prev) => prev + 1);
      }, 35); // Speed of typewriter
      return () => clearTimeout(timer);
    }
  }, [activeQuestion, charIndex, inputValue]);

  const displayedText = activeQuestion?.text.substring(0, charIndex);

  // --- Dynamic Placeholders ---
  const getPlaceholder = () => {
    if (activeQuestion?.expression === "Serious") return "Reply quickly...";
    if (activeQuestion?.type === "Email") return "e.g. shinobi@hiddenleaf.gov";
    if (activeQuestion?.type === "Phone") return "Enter your contact number...";
    if (activeQuestion?.type === "Number") return "Enter an amount...";
    if (activeQuestion?.type === "Date") return "Select a date...";
    return "Type your response here...";
  };

  const handleNext = () => {
    if (!inputValue.trim() && activeQuestion?.type !== "Button") return;

    setIsTransitioning(true);
    setTimeout(() => {
      setInputValue("");
      setCurrentStep((prev) => prev + 1);
      setIsTransitioning(false);
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#050505] overflow-hidden font-sans text-white animate-fade-in">
      {/* CINEMATIC BACKGROUND */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30 blur-xl scale-110"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1542281286-9e0a16bb7366?auto=format&fit=crop&w=1920&q=80')",
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]" />

      {/* TOP BAR: MOOD-REACTIVE CHAKRA PROGRESS & EXIT */}
      <div className="absolute top-0 left-0 w-full h-1.5 bg-white/10 z-50">
        <div
          className="h-full transition-all duration-700 ease-out"
          style={{
            width: `${progressPercentage}%`,
            backgroundColor: activeTheme.color,
            boxShadow: `0 0 15px ${activeTheme.color}`,
          }}
        />
      </div>
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-50 px-5 py-2.5 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-md text-sm font-bold flex items-center gap-2 transition"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          ></path>
        </svg>
        Exit Preview
      </button>

      {/* CONTENT LOGIC */}
      {isComplete ? (
        // SUCCESS SCREEN
        <div className="relative z-20 w-full h-full flex flex-col items-center justify-center animate-fade-in-up">
          <div className="text-7xl mb-8 animate-bounce">🎉</div>
          <h1 className="text-5xl font-black mb-4 tracking-tight drop-shadow-lg">
            Mission Accomplished.
          </h1>
          <p className="text-white/60 text-xl font-medium mb-12">
            Your responses have been successfully recorded.
          </p>
          <button
            onClick={onClose}
            className="px-8 py-4 bg-white text-black font-black rounded-full hover:scale-105 transition shadow-[0_0_30px_rgba(255,255,255,0.2)]"
          >
            Return to Builder
          </button>
        </div>
      ) : (
        // INTERACTIVE QUESTION (VISUAL NOVEL LAYOUT)
        <div className="relative w-full h-full flex items-center max-w-7xl mx-auto px-10">
          {/* LEFT PANEL: QUESTION & INPUT */}
          <div
            className={`w-[50%] flex flex-col justify-center z-30 transition-all duration-500 ease-in-out ${isTransitioning ? "opacity-0 -translate-x-8" : "opacity-100 translate-x-0"}`}
          >
            {/* FLOATING SPEECH BUBBLE (From Sensei) */}
            <div className="relative bg-black/40 backdrop-blur-md border border-white/10 p-8 rounded-[32px] rounded-br-sm shadow-2xl mb-12 w-full max-w-xl self-start">
              {/* CSS Tail pointing right to Obito */}
              <div className="absolute top-1/2 -right-3 w-6 h-6 bg-black/40 backdrop-blur-md border-t border-r border-white/10 transform rotate-45 -translate-y-1/2 z-[-1]" />

              <div className="absolute inset-0 rounded-[32px] rounded-br-sm shadow-[inset_0_0_20px_rgba(255,255,255,0.05)] pointer-events-none" />
              <p
                className="text-[11px] font-black uppercase tracking-[0.3em] mb-3"
                style={{ color: activeTheme.color }}
              >
                OBITO ASKS...
              </p>
              <h2 className="text-4xl font-medium leading-tight text-white/90 drop-shadow-md min-h-[90px]">
                {displayedText}
                {/* Blinking cursor effect while typing */}
                {charIndex < activeQuestion?.text.length && (
                  <span className="inline-block w-1.5 h-8 bg-white/50 ml-1 animate-pulse align-middle" />
                )}
              </h2>
            </div>

            {/* INPUT ANCHOR (User's Dialogue Bubble) */}
            <div className="group relative w-full max-w-xl self-start">
              {/* CSS Tail pointing left (originating from User) */}
              <div className="absolute bottom-6 -left-3 w-6 h-6 bg-white/10 backdrop-blur-md border-b border-l border-white/20 transform rotate-45 z-[-1]" />

              <input
                type={activeQuestion?.inputType}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleNext();
                }}
                placeholder={getPlaceholder()}
                className="w-full bg-white/10 backdrop-blur-md border-2 border-white/20 rounded-[32px] rounded-bl-sm text-white text-2xl font-medium py-6 px-8 outline-none transition-all placeholder:text-white/30 focus:bg-white/15 shadow-inner"
                style={{
                  // Apply dynamic glowing border based on mood
                  borderColor: inputValue.trim()
                    ? activeTheme.color
                    : undefined,
                  boxShadow: inputValue.trim()
                    ? `0 0 20px ${activeTheme.shadow}, inset 0 0 10px ${activeTheme.shadow}`
                    : undefined,
                }}
                autoFocus
              />
            </div>

            <div className="flex justify-between items-center mt-6 w-full max-w-xl pl-2">
              <p className="text-white/40 text-sm font-medium tracking-wide">
                Press{" "}
                <strong className="text-white/80 font-bold bg-white/10 px-2 py-1 rounded">
                  Enter ↵
                </strong>
              </p>
              <button
                onClick={handleNext}
                style={{
                  backgroundColor: inputValue.trim()
                    ? activeTheme.color
                    : "rgba(255,255,255,0.1)",
                  boxShadow: inputValue.trim()
                    ? `0 0 20px ${activeTheme.shadow}`
                    : "none",
                  color: inputValue.trim() ? "#fff" : "rgba(255,255,255,0.3)",
                }}
                className={`px-10 py-4 rounded-full font-bold text-lg transition-all duration-300 ${inputValue.trim() ? "hover:scale-105" : "cursor-not-allowed"}`}
              >
                Continue
              </button>
            </div>
          </div>

          {/* RIGHT PANEL: SENSEI CHARACTER */}
          <div className="absolute bottom-0 right-[5%] w-[45%] flex justify-center h-[90vh] z-10 pointer-events-none">
            <div className="absolute bottom-10 w-[70%] h-16 bg-black/80 blur-2xl rounded-[100%]" />
            <img
              src={getExpressionImage(activeQuestion?.expression)}
              alt="Sensei"
              className={`h-full object-contain drop-shadow-[0_0_40px_rgba(255,75,18,0.15)] transition-all duration-500 ease-in-out ${isTransitioning ? "opacity-0 scale-95 translate-x-4" : "opacity-100 scale-100 translate-x-0"}`}
            />
          </div>
        </div>
      )}
    </div>
  );
}

// --- SUB-COMPONENTS ---
function SenseiMessage({ children, active = false, avatar }) {
  return (
    <div className="flex gap-3">
      <div className="h-10 w-10 shrink-0 overflow-hidden rounded-2xl bg-orange-100">
        <img
          src={avatar}
          alt="Sensei"
          className="h-full w-full object-cover bg-black/10"
        />
      </div>
      <div
        className={`max-w-[85%] rounded-3xl rounded-tl-md p-4 text-sm font-semibold shadow-sm ${
          active
            ? "border-2 border-orange-200 bg-white"
            : "border border-orange-100 bg-white"
        }`}
      >
        {children}
      </div>
    </div>
  );
}

function AdminMessage({ children }) {
  return (
    <div className="flex justify-end">
      <div className="max-w-[85%] rounded-3xl rounded-tr-md bg-[#ff4b12] p-4 text-sm font-bold text-white shadow-lg shadow-orange-200 break-words">
        {children}
      </div>
    </div>
  );
}
