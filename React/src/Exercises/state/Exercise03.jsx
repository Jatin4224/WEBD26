/* task

Counter 2.0
The counter has been upgraded, and now supports several functions.

The buttons have already been added to the page, but they don't do anything yet. Your job is to wire up the buttons.

Acceptance Criteria:

The  button should increase the count by 1.
The  button should increase the count by 10.
The  button should reset the count to 0.
The  button should set the count to a random number between 1 and 100.
The  button should decrease the count by 10.
The  button should decrease the count by 1.

*/

import React from "react";
import {
  ChevronUp,
  ChevronsUp,
  ChevronDown,
  ChevronsDown,
  RotateCcw,
  Hash,
} from "react-feather";

function Exercise03() {
  const [count, setCount] = React.useState(0);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center overflow-hidden px-6">
      {/* background blur */}
      <div className="absolute w-[500px] h-[500px] bg-fuchsia-500/20 blur-3xl rounded-full top-[-100px] left-[-100px]" />
      <div className="absolute w-[400px] h-[400px] bg-cyan-500/20 blur-3xl rounded-full bottom-[-100px] right-[-100px]" />

      <div className="relative w-full max-w-md rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-2xl shadow-[0_0_80px_rgba(255,255,255,0.05)] p-8">
        {/* heading */}
        <div className="text-center mb-8">
          <p className="text-zinc-400 text-sm tracking-[0.35em] uppercase">
            Counter Value
          </p>

          <h1 className="text-8xl font-black text-white mt-4 tracking-tight">
            {count}
          </h1>
        </div>

        {/* buttons */}
        <div className="grid grid-cols-3 gap-4">
          <button
            onClick={() => setCount(count + 1)}
            className="group h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all duration-300 active:scale-95"
          >
            <ChevronUp
              className="text-white group-hover:scale-125 transition-transform"
              size={24}
            />
          </button>

          <button
            onClick={() => setCount(count + 10)}
            className="group h-16 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-400/20 flex items-center justify-center hover:scale-[1.03] transition-all duration-300 active:scale-95"
          >
            <ChevronsUp
              className="text-cyan-300 group-hover:-translate-y-1 transition-transform"
              size={24}
            />
          </button>

          <button
            onClick={() => setCount(0)}
            className="group h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center shadow-lg shadow-fuchsia-500/20 hover:scale-[1.03] transition-all duration-300 active:scale-95"
          >
            <RotateCcw
              className="text-white group-hover:rotate-180 transition-transform duration-500"
              size={22}
            />
          </button>

          <button
            onClick={() => setCount(Math.floor(Math.random() * 100) + 1)}
            className="group h-16 rounded-2xl bg-gradient-to-br from-amber-400/20 to-orange-500/20 border border-orange-400/20 flex items-center justify-center hover:scale-[1.03] transition-all duration-300 active:scale-95"
          >
            <Hash
              className="text-orange-300 group-hover:rotate-12 transition-transform"
              size={24}
            />
          </button>

          <button
            onClick={() => setCount(count - 10)}
            className="group h-16 rounded-2xl bg-gradient-to-br from-pink-500/20 to-rose-500/20 border border-pink-400/20 flex items-center justify-center hover:scale-[1.03] transition-all duration-300 active:scale-95"
          >
            <ChevronsDown
              className="text-pink-300 group-hover:translate-y-1 transition-transform"
              size={24}
            />
          </button>

          <button
            onClick={() => setCount(count - 1)}
            className="group h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all duration-300 active:scale-95"
          >
            <ChevronDown
              className="text-white group-hover:scale-125 transition-transform"
              size={24}
            />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Exercise03;
