import { useState, useEffect, useRef } from "react";
import PHONES_IMG from "../assets/phones.png";
import CHARACTER_IMG from "../assets/obito.png";

/* ─── GOOGLE FONT ─── */
const fontLink = document.createElement("link");
fontLink.rel = "stylesheet";
fontLink.href =
  "https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&family=DM+Sans:wght@400;500;600&display=swap";
document.head.appendChild(fontLink);

/* ─── SPIRAL LOGO ─── */
function SpiralLogo({ size = 32, color = "#e8622a", spinning = false }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      style={spinning ? { animation: "spin 8s linear infinite" } : {}}
    >
      <path
        d="M20 4 C28.8 4 36 11.2 36 20 C36 28.8 28.8 36 20 36 C11.2 36 4 28.8 4 20 C4 13.8 7.6 8.4 13 5.8"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M20 10 C25.5 10 30 14.5 30 20 C30 25.5 25.5 30 20 30 C14.5 30 10 25.5 10 20 C10 16.2 12 12.9 15 11.1"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M20 16 C22.2 16 24 17.8 24 20 C24 22.2 22.2 24 20 24 C17.8 24 16 22.2 16 20"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

/* ─── PARTICLE FIELD ─── */
function ParticleField() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const particles = Array.from({ length: 55 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.8 + 0.3,
      dx: (Math.random() - 0.5) * 0.3,
      dy: -Math.random() * 0.4 - 0.1,
      opacity: Math.random() * 0.6 + 0.1,
      pulse: Math.random() * Math.PI * 2,
    }));
    let animId;
    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.pulse += 0.02;
        p.x += p.dx;
        p.y += p.dy;
        if (p.y < -5) {
          p.y = canvas.height + 5;
          p.x = Math.random() * canvas.width;
        }
        if (p.x < -5) p.x = canvas.width + 5;
        if (p.x > canvas.width + 5) p.x = -5;
        const alpha = p.opacity * (0.6 + 0.4 * Math.sin(p.pulse));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(232,98,42,${alpha})`;
        ctx.fill();
      });
      animId = requestAnimationFrame(draw);
    }
    draw();
    const onResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
    };
  }, []);
  return (
    <canvas
      ref={canvasRef}
      style={{ position: "fixed", inset: 0, zIndex: 1, pointerEvents: "none" }}
    />
  );
}

/* ─── CURSOR GLOW ─── */
function CursorGlow() {
  const glowRef = useRef(null);
  const pos = useRef({ x: -200, y: -200 });
  const current = useRef({ x: -200, y: -200 });
  useEffect(() => {
    const move = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", move);
    let id;
    function lerp(a, b, t) {
      return a + (b - a) * t;
    }
    function animate() {
      current.current.x = lerp(current.current.x, pos.current.x, 0.08);
      current.current.y = lerp(current.current.y, pos.current.y, 0.08);
      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${current.current.x - 200}px, ${current.current.y - 200}px)`;
      }
      id = requestAnimationFrame(animate);
    }
    animate();
    return () => {
      window.removeEventListener("mousemove", move);
      cancelAnimationFrame(id);
    };
  }, []);
  return (
    <div
      ref={glowRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: 400,
        height: 400,
        borderRadius: "50%",
        pointerEvents: "none",
        zIndex: 2,
        background:
          "radial-gradient(circle, rgba(232,98,42,0.12) 0%, transparent 70%)",
        transition: "none",
      }}
    />
  );
}

/* ─── ANIMATED COUNTER ─── */
function Counter({ target, suffix = "" }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !started.current) {
          started.current = true;
          const num = parseFloat(target.replace(/[^0-9.]/g, ""));
          const isDecimal = target.includes(".");
          const duration = 1800;
          const steps = 60;
          let step = 0;
          const timer = setInterval(() => {
            step++;
            const progress = step / steps;
            const eased = 1 - Math.pow(1 - progress, 3);
            const val = num * eased;
            setCount(isDecimal ? val.toFixed(1) : Math.floor(val));
            if (step >= steps) clearInterval(timer);
          }, duration / steps);
        }
      },
      { threshold: 0.5 },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target]);
  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

/* ─── 3D TILT CARD ─── */
function TiltCard({ children, intensity = 12 }) {
  const ref = useRef(null);
  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    ref.current.style.transform = `perspective(800px) rotateY(${x * intensity}deg) rotateX(${-y * intensity}deg) scale(1.02)`;
  };
  const onLeave = () => {
    ref.current.style.transform =
      "perspective(800px) rotateY(0deg) rotateX(0deg) scale(1)";
  };
  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        transition: "transform 0.15s ease",
        transformStyle: "preserve-3d",
        willChange: "transform",
      }}
    >
      {children}
    </div>
  );
}

/* ─── MARQUEE ─── */
function Marquee() {
  const items = [
    "AI Generated",
    "Drag & Drop",
    "Mobile First",
    "Export Ready",
    "Dark Mode",
    "100+ Templates",
    "Real-time Preview",
    "Team Collaboration",
    "Auto Layout",
    "Component Library",
  ];
  return (
    <div
      style={{
        overflow: "hidden",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        background: "rgba(255,255,255,0.02)",
        padding: "12px 0",
        position: "relative",
        zIndex: 10,
      }}
    >
      <div
        style={{
          display: "flex",
          gap: 0,
          animation: "marquee 28s linear infinite",
          whiteSpace: "nowrap",
          width: "max-content",
        }}
      >
        {[...items, ...items, ...items].map((item, i) => (
          <span
            key={i}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              paddingRight: 48,
              fontSize: 13,
              fontWeight: 600,
              color: i % 2 === 0 ? "#e8622a" : "#6b7280",
              letterSpacing: "0.05em",
              textTransform: "uppercase",
            }}
          >
            <SpiralLogo size={12} color={i % 2 === 0 ? "#e8622a" : "#444"} />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─── ANIMATED WORD REVEAL ─── */
function WordReveal({ text, color = "white", delay = 0 }) {
  return (
    <span style={{ display: "inline-block" }}>
      {text.split(" ").map((word, i) => (
        <span
          key={i}
          style={{
            display: "inline-block",
            color,
            animation: `wordIn 0.6s cubic-bezier(0.16,1,0.3,1) both`,
            animationDelay: `${delay + i * 0.08}s`,
            marginRight: "0.25em",
          }}
        >
          {word}
        </span>
      ))}
    </span>
  );
}

/* ─── FLOATING BADGE ─── */
function FloatingBadge({ children, style }) {
  return (
    <div
      style={{
        position: "absolute",
        background: "rgba(20,20,20,0.85)",
        border: "1px solid rgba(232,98,42,0.3)",
        backdropFilter: "blur(12px)",
        borderRadius: 16,
        padding: "10px 16px",
        animation: "floatY 4s ease-in-out infinite",
        zIndex: 6,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/* ─── MAIN EXPORT ─── */
export default function FormBuild() {
  const NAV_LINKS = ["Features", "How it Works", "Examples", "Pricing", "FAQ"];
  const STATS = [
    { icon: "😊", stat: "10", suffix: "K+", label: "Happy Designers" },
    { spiral: true, stat: "250", suffix: "K+", label: "Screens Generated" },
    { icon: "❤️", stat: "50", suffix: "K+", label: "Projects Created" },
    { icon: "⭐", stat: "99", suffix: "%", label: "Satisfaction Rate" },
  ];
  const [navScrolled, setNavScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setNavScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className="min-h-screen text-white overflow-x-hidden"
      style={{
        background: "#0a0a0a",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      {/* ── CSS KEYFRAMES ── */}
      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-33.333%); } }
        @keyframes wordIn { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes floatY { 0%,100% { transform: translateY(0px); } 50% { transform: translateY(-10px); } }
        @keyframes floatChar { 0%,100% { transform: translateY(0px) scale(1); } 50% { transform: translateY(-14px) scale(1.01); } }
        @keyframes fadeSlideUp { from { opacity: 0; transform: translateY(32px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeSlideRight { from { opacity: 0; transform: translateX(40px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes pulseRing { 0% { box-shadow: 0 0 0 0 rgba(232,98,42,0.4); } 70% { box-shadow: 0 0 0 14px rgba(232,98,42,0); } 100% { box-shadow: 0 0 0 0 rgba(232,98,42,0); } }
        @keyframes gradientShift { 0%,100% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } }
        @keyframes glowPulse { 0%,100% { opacity: 0.35; } 50% { opacity: 0.55; } }
        .nav-link { position: relative; }
        .nav-link::after { content: ''; position: absolute; bottom: -2px; left: 0; width: 0; height: 1.5px; background: #e8622a; transition: width 0.3s ease; border-radius: 2px; }
        .nav-link:hover::after { width: 100%; }
        .btn-primary:hover { animation: pulseRing 1s ease; }
        .stat-card:hover { border-color: rgba(232,98,42,0.4) !important; background: rgba(232,98,42,0.08) !important; }
      `}</style>

      {/* ── PARTICLES ── */}
      <ParticleField />

      {/* ── CURSOR GLOW ── */}
      <CursorGlow />

      {/* ── AMBIENT BG GLOW (animated) ── */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-15%",
            left: "25%",
            width: 1000,
            height: 800,
            borderRadius: "50%",
            background:
              "radial-gradient(ellipse, rgba(180,70,20,0.3) 0%, rgba(120,40,10,0.12) 45%, transparent 72%)",
            animation: "glowPulse 6s ease-in-out infinite",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "10%",
            right: "5%",
            width: 500,
            height: 500,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(232,98,42,0.07) 0%, transparent 70%)",
            animation: "glowPulse 8s ease-in-out infinite reverse",
          }}
        />
        {/* Subtle grid */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(232,98,42,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(232,98,42,0.03) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* ── NAVBAR ── */}
      <nav
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          transition: "all 0.3s ease",
          background: navScrolled ? "rgba(10,10,10,0.85)" : "transparent",
          backdropFilter: navScrolled ? "blur(20px)" : "none",
          borderBottom: navScrolled
            ? "1px solid rgba(255,255,255,0.06)"
            : "1px solid transparent",
        }}
      >
        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            padding: "16px 40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              animation: "fadeSlideUp 0.6s ease both",
            }}
          >
            <SpiralLogo size={38} color="#e8622a" spinning />
            <span
              style={{
                fontSize: 20,
                fontWeight: 900,
                fontFamily: "'Syne', sans-serif",
                letterSpacing: "-0.5px",
              }}
            >
              <span style={{ color: "white" }}>Obito</span>
              <span style={{ color: "#e8622a" }}>Design</span>
            </span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
            {NAV_LINKS.map((l, i) => (
              <a
                key={l}
                href="#"
                className="nav-link"
                style={{
                  fontSize: 14,
                  fontWeight: 500,
                  color: "#9ca3af",
                  textDecoration: "none",
                  transition: "color 0.2s",
                  animation: `fadeSlideUp 0.6s ease both`,
                  animationDelay: `${0.1 + i * 0.05}s`,
                }}
                onMouseEnter={(e) => (e.target.style.color = "white")}
                onMouseLeave={(e) => (e.target.style.color = "#9ca3af")}
              >
                {l}
              </a>
            ))}
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              animation: "fadeSlideUp 0.6s 0.4s ease both",
            }}
          >
            <button
              style={{
                padding: "10px 20px",
                borderRadius: 12,
                border: "1px solid #333",
                background: "rgba(255,255,255,0.04)",
                color: "white",
                fontSize: 14,
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                e.target.style.borderColor = "#666";
                e.target.style.background = "rgba(255,255,255,0.08)";
              }}
              onMouseLeave={(e) => {
                e.target.style.borderColor = "#333";
                e.target.style.background = "rgba(255,255,255,0.04)";
              }}
            >
              Sign In
            </button>
            <button
              className="btn-primary"
              style={{
                padding: "10px 20px",
                borderRadius: 12,
                border: "none",
                background: "linear-gradient(135deg, #e8622a, #f0844d)",
                color: "white",
                fontSize: 14,
                fontWeight: 700,
                cursor: "pointer",
                transition: "all 0.2s",
                boxShadow: "0 4px 20px rgba(232,98,42,0.4)",
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "translateY(-1px)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "translateY(0)")
              }
            >
              Get Started <span style={{ fontSize: 16 }}>›</span>
            </button>
          </div>
        </div>
      </nav>

      {/* ── MARQUEE ── */}
      <Marquee />

      {/* ── HERO ── */}
      <section
        style={{
          position: "relative",
          maxWidth: 1280,
          margin: "0 auto",
          padding: "48px 40px 20px",
          zIndex: 10,
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 0,
            alignItems: "center",
          }}
        >
          {/* LEFT COPY */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              paddingRight: 32,
            }}
          >
            {/* Badge */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                borderRadius: 999,
                padding: "6px 16px",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.1em",
                color: "#d1d5db",
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.1)",
                width: "fit-content",
                marginBottom: 28,
                animation: "fadeSlideUp 0.7s 0.2s ease both",
              }}
            >
              <span style={{ color: "#e8622a", fontSize: 14 }}>✦</span>
              AI-POWERED DESIGN GENERATOR
            </div>

            {/* Headline */}
            <h1
              style={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 900,
                lineHeight: 1.0,
                marginBottom: 20,
                letterSpacing: "-1px",
              }}
            >
              <div
                style={{
                  fontSize: "clamp(44px, 4.5vw, 68px)",
                  display: "block",
                }}
              >
                <WordReveal text="From Idea to" color="white" delay={0.3} />
              </div>
              <div
                style={{
                  fontSize: "clamp(44px, 4.5vw, 68px)",
                  display: "block",
                }}
              >
                <WordReveal text="Beautiful" color="white" delay={0.45} />
              </div>
              <div
                style={{
                  fontSize: "clamp(44px, 4.5vw, 68px)",
                  display: "block",
                }}
              >
                <WordReveal text="App Designs" color="#e8622a" delay={0.6} />
              </div>
            </h1>

            {/* Accent line */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                marginBottom: 20,
                animation: "fadeSlideUp 0.7s 0.8s ease both",
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 2,
                  background: "linear-gradient(90deg, #e8622a, transparent)",
                  borderRadius: 2,
                }}
              />
              <SpiralLogo size={14} color="#e8622a" />
              <div
                style={{
                  width: 20,
                  height: 2,
                  background: "linear-gradient(90deg, #e8622a44, transparent)",
                  borderRadius: 2,
                }}
              />
            </div>

            <p
              style={{
                fontSize: 17,
                lineHeight: 1.7,
                color: "#9ca3af",
                maxWidth: 420,
                marginBottom: 36,
                animation: "fadeSlideUp 0.7s 0.9s ease both",
              }}
            >
              ObitoDesign uses AI to turn your ideas, prompts, or inspiration
              into stunning mobile app designs in seconds.
            </p>

            {/* CTA Buttons */}
            <div
              style={{
                display: "flex",
                gap: 14,
                marginBottom: 44,
                flexWrap: "wrap",
                animation: "fadeSlideUp 0.7s 1s ease both",
              }}
            >
              <button
                className="btn-primary"
                style={{
                  padding: "14px 28px",
                  borderRadius: 14,
                  border: "none",
                  background:
                    "linear-gradient(135deg, #e8622a 0%, #f0844d 50%, #e8622a 100%)",
                  backgroundSize: "200% 200%",
                  color: "white",
                  fontSize: 15,
                  fontWeight: 700,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  boxShadow: "0 8px 32px rgba(232,98,42,0.45)",
                  animation:
                    "fadeSlideUp 0.7s 1s ease both, gradientShift 3s ease infinite",
                  transition: "transform 0.2s, box-shadow 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow =
                    "0 14px 40px rgba(232,98,42,0.55)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 8px 32px rgba(232,98,42,0.45)";
                }}
              >
                Start Designing Now
                <span style={{ fontSize: 16 }}>✦</span>
              </button>
              <button
                style={{
                  padding: "14px 28px",
                  borderRadius: 14,
                  border: "1px solid rgba(255,255,255,0.12)",
                  background: "rgba(255,255,255,0.04)",
                  color: "white",
                  fontSize: 15,
                  fontWeight: 600,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  transition: "all 0.2s",
                  backdropFilter: "blur(8px)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.08)";
                  e.currentTarget.style.borderColor = "rgba(232,98,42,0.4)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                View Examples →
              </button>
            </div>

            {/* Feature pills */}
            <div
              style={{
                display: "flex",
                gap: 24,
                flexWrap: "wrap",
                animation: "fadeSlideUp 0.7s 1.1s ease both",
              }}
            >
              {[
                { icon: "⚡", title: "AI Generated", sub: "in Seconds" },
                { icon: "📱", title: "Mobile First", sub: "Designs" },
                { icon: "🚀", title: "Export Ready", sub: "for You" },
              ].map((f, i) => (
                <div
                  key={f.title}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    padding: "10px 16px",
                    borderRadius: 14,
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    cursor: "default",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(232,98,42,0.08)";
                    e.currentTarget.style.borderColor = "rgba(232,98,42,0.25)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                    e.currentTarget.style.borderColor =
                      "rgba(255,255,255,0.07)";
                  }}
                >
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 10,
                      background: "rgba(232,98,42,0.15)",
                      border: "1px solid rgba(232,98,42,0.25)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 18,
                    }}
                  >
                    {f.icon}
                  </div>
                  <div>
                    <p
                      style={{
                        fontSize: 13,
                        fontWeight: 700,
                        color: "white",
                        margin: 0,
                      }}
                    >
                      {f.title}
                    </p>
                    <p style={{ fontSize: 11, color: "#6b7280", margin: 0 }}>
                      {f.sub}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT VISUALS */}
          <div
            style={{
              position: "relative",
              height: 640,
              animation: "fadeSlideRight 0.9s 0.4s ease both",
            }}
          >
            {/* Glow blob behind assets */}
            <div
              style={{
                position: "absolute",
                top: "15%",
                left: "20%",
                width: 360,
                height: 360,
                borderRadius: "50%",
                background:
                  "radial-gradient(circle, rgba(232,98,42,0.18) 0%, transparent 70%)",
                filter: "blur(40px)",
                pointerEvents: "none",
                zIndex: 1,
                animation: "glowPulse 5s ease-in-out infinite",
              }}
            />
            {/* Phones with 3D tilt */}
            <div>
              {/* Character with float animation */}
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: "20%",

                  height: "100%",
                  width: "100%",
                  zIndex: 2,
                  animation: "floatChar 6s ease-in-out infinite",
                  filter:
                    "drop-shadow(0 24px 48px rgba(232,98,42,0.35)) drop-shadow(0 0 80px rgba(232,98,42,0.15))",
                }}
              >
                <img
                  src={CHARACTER_IMG}
                  alt="Obito character"
                  style={{
                    height: "100%",
                    width: "auto",
                    objectFit: "contain",
                  }}
                />
              </div>
            </div>

            {/* Floating live badge */}
            <FloatingBadge
              style={{ top: 60, left: "38%", animationDelay: "0s" }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: "#22c55e",
                    boxShadow: "0 0 6px #22c55e",
                    animation: "pulseRing 2s infinite",
                  }}
                />
                <span style={{ fontSize: 12, fontWeight: 700, color: "white" }}>
                  Live Generating...
                </span>
              </div>
            </FloatingBadge>

            {/* Floating sparkles */}
            {[
              { top: 40, left: "42%", size: 20, delay: "0s" },
              { top: 110, left: "60%", size: 11, delay: "1s" },
              { top: 25, right: "18%", size: 14, delay: "2s" },
              { top: 200, left: "28%", size: 9, delay: "0.5s" },
            ].map((s, i) => (
              <span
                key={i}
                style={{
                  position: "absolute",
                  top: s.top,
                  left: s.left,
                  right: s.right,
                  color: "#e8622a",
                  fontSize: s.size,
                  zIndex: 7,
                  animation: `floatY 3s ease-in-out infinite`,
                  animationDelay: s.delay,
                  pointerEvents: "none",
                }}
              >
                ✦
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <div
        style={{
          position: "relative",
          margin: "0 24px 0",
          borderRadius: 20,
          zIndex: 10,
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.08)",
          backdropFilter: "blur(20px)",
          overflow: "hidden",
        }}
      >
        {/* Top orange line accent */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "10%",
            right: "10%",
            height: 1,
            background:
              "linear-gradient(90deg, transparent, rgba(232,98,42,0.6), transparent)",
          }}
        />

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)" }}>
          {STATS.map((s, i) => (
            <div
              key={s.label}
              className="stat-card"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                padding: "24px 32px",
                borderRight:
                  i < 3 ? "1px solid rgba(255,255,255,0.06)" : "none",
                transition: "all 0.3s ease",
                cursor: "default",
                border:
                  i < 3 ? "right 1px solid rgba(255,255,255,0.06)" : "none",
              }}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: "50%",
                  background: "rgba(232,98,42,0.15)",
                  border: "1px solid rgba(232,98,42,0.3)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 22,
                  flexShrink: 0,
                  transition: "all 0.3s",
                }}
              >
                {s.spiral ? (
                  <SpiralLogo size={24} color="#e8622a" spinning />
                ) : (
                  s.icon
                )}
              </div>
              <div>
                <p
                  style={{
                    fontSize: 26,
                    fontWeight: 900,
                    color: "white",
                    margin: 0,
                    fontFamily: "'Syne', sans-serif",
                  }}
                >
                  <Counter target={s.stat} suffix={s.suffix} />
                </p>
                <p style={{ fontSize: 13, color: "#6b7280", margin: 0 }}>
                  {s.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
