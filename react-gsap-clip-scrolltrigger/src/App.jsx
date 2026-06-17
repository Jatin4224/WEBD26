import React from "react";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const slides = [
  {
    eyebrow: "01 / SVG mask",
    title: "Cinematic clips inside organic shapes",
    body: "The image is clipped by an SVG path. GSAP scales and morphs the mask while the text enters on a staggered timeline.",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=80",
    color: "#ff4d2d",
    theme: {
      bg: "#130f12",
      text: "#fff1eb",
      muted: "rgba(255, 241, 235, 0.66)",
      wash: "rgba(255, 77, 45, 0.38)",
      glow: "rgba(255, 190, 124, 0.22)",
    },
    path: "M617.15,356.23c1.56,42.06-13.73,84.27-37.75,123.63-22.25,36.47-48.75,69.62-82,96.8-31.35,25.61-67.08,43.23-105.19,56.22-30.37,10.36-61.48,17.5-93.59,19.64-25.71,1.72-51-.08-74.93-10.72-23.29-10.33-40.62-27.62-55.26-47.87C147.49,565,132.07,533,117.48,500.63,102.29,467,91,432,85.7,395.27c-10.53-72.78,7-138,53.77-194.73A538.73,538.73,0,0,1,276.64,81.73c16.42-10,33.29-18.93,51.39-25.46,41.85-15.11,82.49-11.54,122.06,7.9,42.55,20.9,75.27,52.87,101.73,91.58,26,38.12,46.08,79.07,56.92,124.23C613.71,300.71,617.3,329.21,617.15,356.23Z",
  },
  {
    eyebrow: "02 / Stroke draw",
    title: "Long SVG lines travel through the page",
    body: "A background path uses strokeDasharray and strokeDashoffset. ScrollTrigger ties the draw and horizontal shift to scroll progress.",
    image:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1400&q=80",
    color: "#a6bcc7",
    theme: {
      bg: "#071116",
      text: "#effbff",
      muted: "rgba(239, 251, 255, 0.66)",
      wash: "rgba(166, 188, 199, 0.34)",
      glow: "rgba(92, 113, 255, 0.2)",
    },
    path: "M303.82,652.12c-58,.13-106-23-147.52-61.81-23-21.5-40.86-46.91-56.87-73.76-21.12-35.4-39.24-72.27-53.21-111.09-11.1-30.85-18.9-62.37-19.89-95.42-1.55-51.21,16.94-92.8,57.54-124.51,21.61-16.88,45-30.94,68.75-44.38,40.32-22.78,81-44.88,123.6-63.22C312.89,62.16,350.58,50,390.71,48.27,465.13,45,534,61.86,593.42,108.72c28.42,22.39,47.8,51.8,60.63,85.39a298.37,298.37,0,0,1,19.68,111.51c-.58,42.75-11.5,83-29.54,121.39-9.19,19.57-18.58,39.25-30.08,57.48-33.49,53.06-80.37,91.63-135.79,120-43.88,22.43-90.27,37.67-139.2,44.48C327.43,650.55,315.59,651.08,303.82,652.12Z",
  },
  {
    eyebrow: "03 / Pinned scroll",
    title: "Sections feel like scenes, not blocks",
    body: "Each scene is pinned while its own timeline plays. This gives you controlled editorial motion without fighting normal page scroll.",
    image:
      "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=1400&q=80",
    color: "#9aa36d",
    theme: {
      bg: "#101307",
      text: "#fbffe7",
      muted: "rgba(251, 255, 231, 0.66)",
      wash: "rgba(154, 163, 109, 0.35)",
      glow: "rgba(255, 214, 102, 0.18)",
    },
    path: "M42.55,412.43c.54-87.32,35.2-150.22,97.58-198.47,15.71-12.15,33.42-21.9,50.85-31.61,39.4-21.95,79.14-43.29,118.85-64.68,30.28-16.3,61.23-31.22,95.44-37.33C468.39,69.06,525,83.63,574.22,125c40.36,33.9,68.3,75.76,78.93,128.07,5.64,27.72,5.37,55.65,1.31,83.52-4.37,30-12.91,58.86-24.59,86.77-13.46,32.17-35.06,58.41-60.85,81.36A513.92,513.92,0,0,1,388.65,609.06c-32.52,10.88-65.87,16.39-100.31,13.54C266,620.75,244.4,615,223,608.63c-33.43-10-65.88-22.23-96.52-39.22-46.33-25.68-71.43-65.61-79.57-117C44.44,436.85,43.46,421,42.55,412.43Z",
  },
];

function App() {
  const rootRef = useRef(null);
  const themeOverlayRef = useRef(null);

  const changeTheme = (slide, media, event) => {
    const overlay = themeOverlayRef.current;
    const mask = media.querySelector(".clip-mask");
    const image = media.querySelector(".panel-image");
    const outline = media.querySelector(".shape-outline");

    const x = event.clientX;
    const y = event.clientY;

    const radius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    );

    gsap.killTweensOf(overlay);

    gsap.set(overlay, {
      background: `radial-gradient(circle at ${x}px ${y}px, ${slide.theme.wash} 0%, ${slide.theme.glow} 34%, transparent 68%)`,
      clipPath: `circle(0px at ${x}px ${y}px)`,
      opacity: 0,
      filter: "blur(18px)",
      mixBlendMode: "screen",
    });

    gsap
      .timeline()
      .to(overlay, {
        opacity: 1,
        clipPath: `circle(${radius}px at ${x}px ${y}px)`,
        duration: 0.95,
        ease: "power3.inOut",
      })
      .to(
        rootRef.current,
        {
          "--theme-bg": slide.theme.bg,
          "--theme-text": slide.theme.text,
          "--theme-muted": slide.theme.muted,
          "--theme-accent": slide.color,
          duration: 0.95,
          ease: "power3.inOut",
        },
        "<0.18",
      )
      .to(
        [mask, image, outline],
        {
          scale: 1.06,
          duration: 0.36,
          transformOrigin: "50% 50%",
          ease: "power3.out",
          yoyo: true,
          repeat: 1,
        },
        "<",
      )
      .to(overlay, {
        opacity: 0,
        duration: 0.55,
        ease: "power2.out",
      });
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mainPath = document.querySelector(".animated-path");
      const mainPathLength = mainPath.getTotalLength();

      mainPath.style.setProperty("--path-length", mainPathLength);

      gsap.to(mainPath, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
          trigger: ".page",
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        },
      });

      gsap.to(".path-track", {
        xPercent: -45,
        ease: "none",
        scrollTrigger: {
          trigger: ".page",
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        },
      });

      gsap.utils.toArray(".panel").forEach((panel) => {
        const mask = panel.querySelector(".clip-mask");
        const image = panel.querySelector(".panel-image");
        const textItems = panel.querySelectorAll(".text-reveal");
        const accent = panel.querySelector(".accent-line");

        gsap.set(mask, { scale: 0, transformOrigin: "50% 50%" });
        gsap.set(image, { scale: 1.18, transformOrigin: "50% 50%" });
        gsap.set(textItems, { autoAlpha: 0, y: 42 });
        gsap.set(accent, { scaleX: 0, transformOrigin: "left center" });

        gsap
          .timeline({
            scrollTrigger: {
              trigger: panel,
              start: "top 70%",
              end: "bottom 35%",
              toggleActions: "play reverse play reverse",
            },
          })
          .to(mask, {
            scale: 1,
            duration: 0.9,
            ease: "expo.out",
          })
          .to(
            image,
            {
              scale: 1,
              duration: 1.2,
              ease: "power3.out",
            },
            "<",
          )
          .to(
            accent,
            {
              scaleX: 1,
              duration: 0.5,
              ease: "power3.out",
            },
            "<0.15",
          )
          .to(
            textItems,
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.75,
              stagger: 0.12,
              ease: "power3.out",
            },
            "<0.05",
          );
      });

      gsap.utils.toArray(".pinned-scene").forEach((panel) => {
        gsap
          .timeline({
            scrollTrigger: {
              trigger: panel,
              start: "top top",
              end: "+=75%",
              pin: true,
              scrub: 1,
            },
          })
          .to(panel.querySelector(".panel-media"), {
            rotate: 3,
            scale: 0.92,
            ease: "none",
          })
          .to(
            panel.querySelector(".counter"),
            {
              y: -28,
              autoAlpha: 0.35,
              ease: "none",
            },
            "<",
          );
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <main
      ref={rootRef}
      className="page relative overflow-hidden"
      style={{
        "--theme-bg": "#101010",
        "--theme-text": "#f5f0e8",
        "--theme-muted": "rgba(245, 240, 232, 0.68)",
        "--theme-accent": "#ff5a36",
        backgroundColor: "var(--theme-bg)",
        color: "var(--theme-text)",
      }}
    >
      <div
        ref={themeOverlayRef}
        className="pointer-events-none fixed inset-0 z-50 opacity-0"
      />

      <BackgroundLine />

      <header className="fixed left-0 right-0 top-0 z-40 flex items-center justify-between px-5 py-5 md:px-10">
        <a
          href="#top"
          className="text-sm font-semibold uppercase tracking-[0.22em]"
          style={{ color: "var(--theme-text)" }}
        >
          Motion Lab
        </a>

        <div
          className="hidden items-center gap-4 text-xs uppercase tracking-[0.18em] md:flex"
          style={{ color: "var(--theme-muted)" }}
        >
          <span>GSAP</span>
          <span>SVG ClipPath</span>
          <span>ScrollTrigger</span>
        </div>
      </header>

      <section
        id="top"
        className="relative flex min-h-screen items-end px-5 pb-16 pt-28 md:px-10 md:pb-24"
      >
        <div className="relative z-10 max-w-5xl">
          <p
            className="mb-5 text-sm uppercase tracking-[0.24em]"
            style={{ color: "var(--theme-accent)" }}
          >
            React / Tailwind / GSAP
          </p>

          <h1 className="max-w-4xl text-5xl font-black leading-[0.92] md:text-8xl">
            Scroll scenes with SVG masks and cinematic reveals
          </h1>
        </div>
      </section>

      {slides.map((slide, index) => (
        <section
          className={`panel ${
            index === 2 ? "pinned-scene" : ""
          } relative grid items-center gap-10 px-5 py-24 md:grid-cols-[0.9fr_1.1fr] md:px-10`}
          key={slide.title}
        >
          <div className="relative z-10 max-w-xl">
            <p
              className="text-reveal counter mb-5 text-sm uppercase tracking-[0.24em]"
              style={{ color: slide.color }}
            >
              {slide.eyebrow}
            </p>

            <div
              className="accent-line mb-7 h-px w-36"
              style={{ backgroundColor: slide.color }}
            />

            <h2 className="text-reveal text-4xl font-black leading-[0.95] md:text-7xl">
              {slide.title}
            </h2>

            <p
              className="text-reveal mt-7 max-w-md text-base leading-7 md:text-lg"
              style={{ color: "var(--theme-muted)" }}
            >
              {slide.body}
            </p>
          </div>

          <div
            className="panel-media relative z-10 mx-auto aspect-square w-full max-w-[680px] cursor-pointer"
            onClick={(event) => changeTheme(slide, event.currentTarget, event)}
          >
            <svg
              className="h-full w-full overflow-visible"
              viewBox="0 0 700 700"
              aria-hidden="true"
            >
              <defs>
                <clipPath id={`clip-${index}`}>
                  <path className="clip-mask" d={slide.path} />
                </clipPath>
              </defs>

              <path
                className="shape-outline"
                d={slide.path}
                fill="none"
                stroke={slide.color}
                strokeWidth="2"
                opacity="0.75"
              />

              <foreignObject
                width="700"
                height="700"
                clipPath={`url(#clip-${index})`}
              >
                <img
                  className="panel-image h-full w-full object-cover"
                  src={slide.image}
                  alt=""
                />
              </foreignObject>
            </svg>
          </div>
        </section>
      ))}

      <section className="flex min-h-[70vh] items-center justify-center px-5 text-center">
        <div>
          <p
            className="mb-5 text-sm uppercase tracking-[0.24em]"
            style={{ color: "var(--theme-muted)" }}
          >
            That is the pattern
          </p>

          <h2 className="text-4xl font-black md:text-7xl">
            Build each section as a timeline.
          </h2>
        </div>
      </section>
    </main>
  );
}

function BackgroundLine() {
  return (
    <svg
      className="pointer-events-none fixed inset-0 z-0 h-screen w-full opacity-35"
      viewBox="0 0 1920 1080"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <g className="path-track">
        <path
          className="animated-path"
          d="M-80,520 C130,210 300,780 540,410 C760,70 920,910 1180,500 C1430,105 1600,780 1900,430 C2130,160 2320,760 2580,480"
          fill="none"
          stroke="var(--theme-text)"
          strokeWidth="1.4"
          strokeDasharray="var(--path-length)"
          strokeDashoffset="var(--path-length)"
        />
      </g>
    </svg>
  );
}

export default App;
