import React from "react";
import demoVideo from "../assets/video.mp4";
import PhonePreview from "./PhonePreview";
export default function Animated() {
  return (
    <main className="min-h-screen bg-[#0b0b0c] text-white relative overflow-hidden">
      {/* Background Texture */}
      <div
        className="absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1641154639569-8aaad4c80b5c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDN8fGdyZXlpc2glMjB0ZXh0dXJlfGVufDB8fDB8fHww')",
        }}
      />

      <section className="relative z-10 min-h-screen flex items-center justify-center px-6 py-16">
        <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          {/* Left Content */}
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-cyan-300 mb-4">
              Mobile UI Library
            </p>

            <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
              Beautiful Components for
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-300 to-orange-400">
                React Native Apps
              </span>
            </h1>

            <p className="text-lg text-zinc-300 max-w-xl leading-8 mb-8">
              A modern UI component library for Expo and React Native apps.
              Build clean, animated, and production-ready mobile interfaces
              faster.
            </p>

            <div className="flex flex-wrap gap-4 mb-10">
              <button className="px-7 py-4 rounded-2xl bg-white text-black font-semibold hover:scale-105 transition">
                Explore Components
              </button>

              <button className="px-7 py-4 rounded-2xl border border-white/20 bg-white/5 backdrop-blur-md hover:bg-white/10 transition">
                View Docs
              </button>
            </div>
          </div>

          {/* Right Mobile Video Preview */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              {/* Phone Glow */}
              <div className="absolute inset-0 bg-orange-400/20 blur-[80px] rounded-full" />
              <PhonePreview />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
