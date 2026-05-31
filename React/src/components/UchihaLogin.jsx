import { useEffect, useRef, useState } from "react";

import bg from "../assets/house-room-two.png";
import doorLeft from "../assets/left-door.png";
import doorRight from "../assets/right-door.png";
import doorSound from "../assets/door.mp3";
import Character from "./Character";
import stormVideo from "../assets/storm.mp4";

const YOUTUBE_VIDEO_ID = "5j7OGHxO4PI";
export default function UchihaLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [doorOpen, setDoorOpen] = useState(false);
  const audioRef = useRef(null);
  const videoRef = useRef(null);

  const handleLogin = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1800);
  };

  const playVideo = () => {
    videoRef.current?.play();
  };

  const pauseVideo = () => {
    videoRef.current?.pause();
  };
  useEffect(() => {
    if (!audioRef.current) return;
    if (doorOpen) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    } else {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, [doorOpen]);

  return (
    <section
      className={`relative min-h-screen overflow-hidden bg-cover bg-center text-[#e8b84b] ${
        loading ? "animate-earthquake" : ""
      }`}
      style={{ backgroundImage: `url(${bg})` }}
      s
    >
      {/* Page vignette overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_80%_at_50%_50%,transparent_30%,rgba(0,0,0,0.55)_100%)]" />
      <audio ref={audioRef} src={doorSound} preload="auto" />

      {/* Door */}
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{ zIndex: 10 }}
      >
        <div
          className="relative mb-20"
          style={{ width: "440px", height: "660px", cursor: "pointer" }}
          onMouseEnter={() => {
            setDoorOpen(true);
            playVideo();
          }}
          onMouseLeave={() => {
            setDoorOpen(false);
            pauseVideo();
          }}
        >
          {/* Left panel */}
          {/* Left panel */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "50%",
              height: "100%",
              overflow: "visible",
              zIndex: 2,
              transformStyle: "preserve-3d",

              transformOrigin: "left center",
              transform: doorOpen
                ? "perspective(1600px) rotateY(-108deg)"
                : "perspective(1600px) rotateY(0deg)",

              transition: "transform 1.15s cubic-bezier(0.77,0,0.18,1)",
            }}
          >
            {/* thickness edge */}
            <div
              style={{
                position: "absolute",
                top: 0,
                right: "-12px",
                width: "12px",
                height: "100%",
                background: "linear-gradient(to right,#1d1008,#3a2211,#120905)",
                transform: "rotateY(90deg)",
                transformOrigin: "left center",
                boxShadow: "0 0 18px rgba(0,0,0,0.5)",
              }}
            />

            {/* face */}
            <img
              src={doorLeft}
              alt=""
              draggable={false}
              style={{
                position: "absolute",
                inset: 0,
                width: "200%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "left center",
                userSelect: "none",
                pointerEvents: "none",
                backfaceVisibility: "hidden",
                boxShadow: "inset -8px 0 18px rgba(0,0,0,0.45)",
              }}
            />
          </div>

          {/* Right panel */}
          {/* Right panel */}
          <div
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              width: "50%",
              height: "100%",
              overflow: "visible",
              zIndex: 2,
              transformStyle: "preserve-3d",

              transformOrigin: "right center",
              transform: doorOpen
                ? "perspective(1600px) rotateY(108deg)"
                : "perspective(1600px) rotateY(0deg)",

              transition: "transform 1.15s cubic-bezier(0.77,0,0.18,1)",
            }}
          >
            {/* thickness edge */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: "-12px",
                width: "12px",
                height: "100%",
                background: "linear-gradient(to left,#1d1008,#3a2211,#120905)",
                transform: "rotateY(-90deg)",
                transformOrigin: "right center",
                boxShadow: "0 0 18px rgba(0,0,0,0.5)",
              }}
            />

            {/* face */}
            <img
              src={doorRight}
              alt=""
              draggable={false}
              style={{
                position: "absolute",
                inset: 0,
                width: "200%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "right center",
                userSelect: "none",
                pointerEvents: "none",
                backfaceVisibility: "hidden",
                boxShadow: "inset 8px 0 18px rgba(0,0,0,0.45)",
              }}
            />
          </div>

          {/* Login form — revealed behind doors */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 0,
              overflow: "hidden",
              borderRadius: "2px",
            }}
          >
            <video
              ref={videoRef}
              src={stormVideo}
              loop
              playsInline
              preload="auto"
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                pointerEvents: "none",
              }}
            />
            {/* Subtle inner vignette so form text pops */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "radial-gradient(ellipse 80% 80% at 50% 50%, transparent 20%, rgba(0,0,0,0.6) 100%)",
              }}
            />
            <div
              className={`absolute inset-0 z-[1] flex flex-col items-center justify-center gap-4 px-6 py-8 transition-opacity duration-500 delay-500 ${
                doorOpen
                  ? "pointer-events-auto opacity-100"
                  : "pointer-events-none opacity-0"
              }`}
            >
              <h2 className="mb-2 text-center text-[22px] font-semibold tracking-[0.12em] text-[#dbe8ff] drop-shadow-[0_0_18px_rgba(180,210,255,0.22)]">
                Welcome Back
              </h2>

              <input
                type="text"
                placeholder="Username"
                className="w-full rounded-lg border border-[rgba(170,195,235,0.28)] bg-[rgba(6,12,24,0.58)] px-4 py-[11px] text-sm text-[#edf5ff] outline-none backdrop-blur-md placeholder:text-[rgba(220,235,255,0.55)] shadow-[inset_0_0_18px_rgba(0,0,0,0.45)]"
              />

              <div className="relative w-full">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="w-full rounded-lg border border-[rgba(170,195,235,0.28)] bg-[rgba(6,12,24,0.58)] px-4 py-[11px] pr-11 text-sm text-[#edf5ff] outline-none backdrop-blur-md placeholder:text-[rgba(220,235,255,0.55)] shadow-[inset_0_0_18px_rgba(0,0,0,0.45)]"
                />

                <button
                  onClick={() => setShowPassword((p) => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 bg-transparent p-0 text-[13px] text-[rgba(220,235,255,0.65)] transition hover:text-[#ffffff]"
                >
                  {showPassword ? "hide" : "show"}
                </button>
              </div>

              <button
                onClick={handleLogin}
                disabled={loading}
                className={`w-full rounded-lg border border-[rgba(180,205,255,0.35)] px-4 py-[11px] text-sm font-semibold tracking-[0.08em] text-[#eef6ff] backdrop-blur-sm transition-all duration-200
      ${
        loading
          ? "cursor-not-allowed bg-[rgba(155,180,220,0.15)]"
          : "bg-[rgba(120,155,210,0.18)] hover:bg-[rgba(150,180,235,0.24)]"
      }`}
              >
                {loading ? "Entering..." : "Enter"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
