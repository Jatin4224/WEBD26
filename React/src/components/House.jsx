import { useState } from "react";
import bgImage from "../assets/house-background.png";
import houseOff from "../assets/house-dark.png";
import houseOn from "../assets/house-light.png";
import font from "../assets/font-owl.png";
import loginHint from "../assets/login-hint.png";

export default function House() {
  const [hovered, setHovered] = useState(false);

  return (
    <section
      className="relative overflow-hidden bg-cover bg-top min-h-screen"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="relative z-10 mx-auto flex min-h-screen max-w-[1800px] items-center justify-between px-10 lg:px-20">
        {/* LEFT — font + hint stacked, overlapping each other */}
        <div className="relative w-[480px] lg:w-[560px] flex">
          <div className="w-800">
            <img src={font} alt="Title" className="w-full ml-16 mt-16" />
          </div>
          <img
            src={loginHint}
            alt="Login hint"
            className="absolute top-1/2 left-170 z-20 w-[50%] -translate-y-1/4  mt-50"
          />
        </div>

        {/* RIGHT — house */}
        <div
          className="relative cursor-pointer select-none flex-shrink-0 mt-80 left-20"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {/* glow bloom */}
          <div
            className={`absolute inset-0 rounded-full blur-3xl transition-all duration-700 mb-40 ${
              hovered
                ? "opacity-100 bg-[#f6b75a]/30 scale-40 "
                : "opacity-0 scale-100"
            }`}
          />

          {/* dark — default */}
          <img
            src={houseOff}
            alt="House"
            className={`relative z-10 w-[1000px] lg:w-[700px] transition-all duration-700 ${
              hovered ? "opacity-0" : "opacity-100"
            }`}
          />

          {/* lit — on hover */}
          <img
            src={houseOn}
            alt="House lights on"
            className={`absolute top-0 left-0 z-20 w-[1000px] lg:w-[700px] transition-all duration-700 ${
              hovered ? "opacity-100" : "opacity-0"
            }`}
          />
        </div>
      </div>
    </section>
  );
}
