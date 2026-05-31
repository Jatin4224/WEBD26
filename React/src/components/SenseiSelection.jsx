import React, { useState } from "react";
import obitoAvatar from "../assets/obitoAI.png";
import obitoAngry from "../assets/angry.png";
import obitoCurious from "../assets/curious.png";
import obitoConfident from "../assets/confident.png";

// You will replace these with your actual 3D character transparent PNGs
const ASSETS = {
  mainObito: obitoAvatar,
  kakashiThumb: obitoConfident,
  obitoThumb: obitoCurious,
  guyThumb: obitoAngry,
};

export default function SenseiSelection() {
  const [selectedSensei, setSelectedSensei] = useState("obito");

  const senseis = [
    {
      id: "kakashi",
      name: "Kakashi",
      desc: "Cool. Calm. Always one step ahead.",
      thumb: ASSETS.kakashiThumb,
    },
    {
      id: "obito",
      name: "Obito",
      desc: "Smart. Mysterious. Gets things done.",
      thumb: ASSETS.obitoThumb,
    },
    {
      id: "guy",
      name: "Might Guy",
      desc: "Energetic. Passionate. Never gives up.",
      thumb: ASSETS.guyThumb,
    },
  ];

  return (
    <div className="min-h-screen w-full bg-black flex items-center justify-center font-sans">
      {/* Mobile constraint container to match the screenshot proportions */}
      <div className="relative w-full max-w-[400px] min-h-screen md:min-h-[850px] md:h-[850px] bg-[#F24E1E] overflow-hidden flex flex-col md:rounded-3xl shadow-2xl">
        {/* Top Header / Large Background Text */}
        <div className="relative w-full pt-12 flex justify-center z-0">
          <h1 className="text-[110px] font-black text-white tracking-tighter leading-none select-none">
            {selectedSensei}
          </h1>
        </div>

        {/* Floating Pills & Main Character */}
        <div className="relative w-full flex-1 flex justify-center items-end -mt-16 z-10">
          {/* Left Pill */}
          <button className="absolute left-4 top-20 bg-[#6C8DFF] text-white text-sm font-semibold py-2 px-4 rounded-full shadow-lg hover:scale-105 transition-transform">
            Start my lesson
          </button>

          {/* Right Pill */}
          <button className="absolute right-4 top-40 bg-[#6C8DFF] text-white text-sm font-semibold py-2 px-4 rounded-full shadow-lg hover:scale-105 transition-transform">
            Continue streak
          </button>

          {/* Main 3D Character Showcase */}
          <div className="relative w-64 h-80 flex justify-center items-end">
            <div className="w-full h-full bg-black/10 rounded-full blur-2xl absolute bottom-0"></div>
            {/* Replace with your 3D image */}
            <img
              src={ASSETS.mainObito}
              alt="Selected Sensei"
              className="relative z-10 w-full h-auto object-contain drop-shadow-2xl"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://via.placeholder.com/250x350/transparent/fff?text=3D+Character";
              }}
            />
          </div>
        </div>

        {/* Text Section */}
        <div className="text-center text-white px-6 mt-4 z-20">
          <h2 className="text-xl font-bold tracking-tight">you are shinobi.</h2>
          <h2 className="text-xl font-bold tracking-tight">
            {selectedSensei} is your learning sensei.
          </h2>
        </div>

        {/* Selection Area */}
        <div className="w-full px-4 mt-6 z-20 pb-8">
          <p className="text-white text-center font-semibold mb-3">
            Choose your sensei
          </p>

          {/* Sensei Cards Grid */}
          <div className="grid grid-cols-3 gap-3">
            {senseis.map((sensei) => {
              const isSelected = selectedSensei === sensei.id;

              return (
                <div
                  key={sensei.id}
                  onClick={() => setSelectedSensei(sensei.id)}
                  className={`relative flex flex-col items-center rounded-2xl p-3 cursor-pointer transition-all duration-300 ease-in-out ${
                    isSelected
                      ? "bg-[#F24E1E] shadow-[0_0_0_2px_rgba(255,255,255,0.9),0_0_15px_rgba(255,255,255,0.5)] z-10 scale-105"
                      : "bg-[#6E7B54] hover:bg-[#7a885f]"
                  }`}
                >
                  {/* Thumbnail Placeholder */}
                  <div className="w-full aspect-square mb-2">
                    <img
                      src={sensei.thumb}
                      alt={sensei.name}
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src =
                          "https://via.placeholder.com/80/transparent/fff?text=Thumb";
                      }}
                    />
                  </div>

                  <div className="w-full text-left flex-1 flex flex-col">
                    <h3 className="text-white font-bold text-[13px] leading-tight mb-1">
                      {sensei.name}
                    </h3>
                    <p className="text-white/80 text-[10px] leading-[1.2] flex-1">
                      {sensei.desc}
                    </p>

                    {/* Radio Button UI */}
                    <div className="w-full flex justify-start mt-2">
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center border-2 ${
                          isSelected
                            ? "border-white bg-white"
                            : "border-white/50 bg-transparent"
                        }`}
                      >
                        {isSelected && (
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#F24E1E"
                            strokeWidth="4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Let's Start Button */}
          <button className="w-full bg-[#1A1A1A] text-white font-bold text-lg rounded-full py-4 mt-6 flex justify-center items-center gap-2 hover:bg-black transition-colors shadow-lg">
            Let's start
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </button>

          {/* Footer Terms */}
          <p className="text-white/80 text-xs text-center mt-6 px-4">
            By continuing, you agree to our <br />
            <a href="#" className="underline hover:text-white">
              terms & conditions
            </a>{" "}
            &{" "}
            <a href="#" className="underline hover:text-white">
              privacy policy
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
