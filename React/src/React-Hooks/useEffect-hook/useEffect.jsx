import React from "react";
import {
  ChevronUp,
  ChevronsUp,
  ChevronDown,
  ChevronsDown,
  RotateCcw,
  Hash,
} from "react-feather";

function UseEffectCounter({ name, initialVal = 0 }) {
  const [count, setCount] = React.useState(initialVal);

  React.useEffect(() => {
    document.title = `(${count}) — Counter 2.0`;
    console.log("Document title is:", document.title);
  }, [count]);

  if (count === 30) {
    window.alert("rukhja bhai");
  }
  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4 text-white">
      <div className="w-full max-w-md rounded-3xl border border-zinc-800 bg-zinc-900/70 backdrop-blur-xl p-8 shadow-2xl">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="h-12 w-12 rounded-2xl bg-indigo-500/20 flex items-center justify-center">
            <Hash className="text-indigo-400" size={22} />
          </div>

          <div>
            <h2 className="text-2xl font-bold">Hi {name}! 👋</h2>
            <p className="text-zinc-400 text-sm">Interactive Counter UI</p>
          </div>
        </div>

        {/* Counter Display */}
        <div className="rounded-2xl bg-zinc-800/60 border border-zinc-700 p-6 mb-6">
          <p className="text-zinc-400 text-sm mb-2">Current Value</p>

          <div className="text-6xl font-black tracking-tight text-center">
            {count}
          </div>
        </div>

        {/* Controls */}
        <div className="grid grid-cols-2 gap-4">
          {/* +1 */}
          <button
            onClick={() => setCount(count + 1)}
            className="flex items-center justify-center gap-2 rounded-2xl bg-emerald-500 hover:bg-emerald-400 transition-all duration-200 py-4 font-semibold shadow-lg hover:scale-[1.02]"
          >
            <ChevronUp size={18} />
            +1
          </button>

          {/* +10 */}
          <button
            onClick={() => setCount(count + 10)}
            className="flex items-center justify-center gap-2 rounded-2xl bg-blue-500 hover:bg-blue-400 transition-all duration-200 py-4 font-semibold shadow-lg hover:scale-[1.02]"
          >
            <ChevronsUp size={18} />
            +10
          </button>

          {/* -1 */}
          <button
            onClick={() => setCount(count - 1)}
            className="flex items-center justify-center gap-2 rounded-2xl bg-orange-500 hover:bg-orange-400 transition-all duration-200 py-4 font-semibold shadow-lg hover:scale-[1.02]"
          >
            <ChevronDown size={18} />
            -1
          </button>

          {/* -10 */}
          <button
            onClick={() => setCount(count - 10)}
            className="flex items-center justify-center gap-2 rounded-2xl bg-rose-500 hover:bg-rose-400 transition-all duration-200 py-4 font-semibold shadow-lg hover:scale-[1.02]"
          >
            <ChevronsDown size={18} />
            -10
          </button>
        </div>

        {/* Reset */}
        <button
          onClick={() => setCount(initialVal)}
          className="mt-5 w-full flex items-center justify-center gap-2 rounded-2xl border border-zinc-700 bg-zinc-800 hover:bg-zinc-700 transition-all duration-200 py-4 font-semibold"
        >
          <RotateCcw size={18} />
          Reset
        </button>
      </div>
    </div>
  );
}

export default UseEffectCounter;
