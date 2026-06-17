"use client";

import React, { useMemo, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

const cover =
  "https://assets.awwwards.com/awards/images/2022/04/the-message-to-ukraine-cover-case-study.jpg";

const gallery = [
  "https://images.unsplash.com/photo-1561542320-9a18cd340469?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1515669097368-22e68427d265?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1549880338-65ddcdfd017b?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1519677100203-a0e668c92439?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=900&q=80",
];

const cities = [
  "Kyiv",
  "Kharkiv",
  "Odesa",
  "Dnipro",
  "Donetsk",
  "Zaporizhzhia",
  "Lviv",
  "Kryvyi Rih",
  "Mykolaiv",
  "Mariupol",
  "Luhansk",
  "Sevastopol",
];

const poem = [
  {
    en: "Fair",
    ua: "Справедливих",
    line: "Бачила державу - в ній людей правдивих.",
    note: "I saw the state - there are truthful people all around me.",
  },
  {
    en: "Dreamy",
    ua: "мрійливих",
    line: "Чула шум Дніпра і співи козаків,",
    note: "I heard the noise of the Dnieper and the singing of the Cossacks.",
  },
  {
    en: "Happy",
    ua: "Щасливих",
    line: "Серед гір високих, міст і сіл красивих.",
    note: "Among the high mountains, beautiful cities and villages.",
  },
  {
    en: "Brave",
    ua: "сміливих",
    line: "Народилась я в полях квітучих,",
    note: "I was born in blooming fields.",
  },
];

function TornImage({ src, className = "", rotate = "-rotate-2", label }) {
  return (
    <motion.figure
      initial={{ opacity: 0, y: 45 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
      className={`relative shrink-0 bg-[#eadfc9] p-2 shadow-[0_18px_40px_rgba(0,0,0,.24)] ${rotate} ${className}`}
    >
      <div className="absolute inset-0 z-10 mix-blend-multiply opacity-40 [background-image:radial-gradient(#111_1px,transparent_1px)] [background-size:4px_4px]" />
      <img
        src={src}
        alt={label || "Ukraine collage clipping"}
        className="h-full w-full object-cover grayscale contrast-125 sepia"
      />
      {label ? (
        <figcaption className="absolute -bottom-5 left-4 z-20 font-serif text-sm italic text-[#efe2cb]">
          {label}
        </figcaption>
      ) : null}
    </motion.figure>
  );
}

function LaneMenu({ open, onClose }) {
  const lanes = [
    [
      "1991",
      "About",
      "A declaration of love: beautiful, truthful and timeless.",
    ],
    ["2021", "Index", "Nature, cities, language, food, people, and freedom."],
    ["UKR", "Gallery", "Newspaper cuts, halftones, birds, fields, songs."],
    ["OBYS", "Credits", "Poem by Olia Olianishyna. Site by Obys."],
  ];

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 grid grid-rows-4 bg-[#f1e3cb] text-black md:grid-cols-4 md:grid-rows-1"
        >
          {lanes.map((lane, index) => (
            <motion.button
              key={lane[1]}
              type="button"
              onClick={onClose}
              initial={{ y: index % 2 ? "100%" : "-100%" }}
              animate={{ y: "0%" }}
              exit={{ y: index % 2 ? "100%" : "-100%" }}
              transition={{
                duration: 0.72,
                ease: [0.76, 0, 0.24, 1],
                delay: index * 0.035,
              }}
              className="group relative overflow-hidden border-b border-black/20 bg-[#f1e3cb] p-4 text-left md:border-b-0 md:border-r md:p-5"
            >
              <span className="ukraine-serif block text-[clamp(34px,7vw,112px)] leading-none">
                {lane[0]}
              </span>
              <span className="absolute bottom-4 left-4 text-[clamp(35px,7vw,118px)] font-black uppercase leading-[.78] tracking-normal md:left-5">
                {lane[1]}
              </span>
              <span className="absolute right-4 top-5 max-w-[16rem] text-right text-sm leading-tight opacity-70 md:left-6 md:right-auto md:top-1/2 md:-translate-y-1/2 md:text-left md:text-lg md:opacity-0 md:transition-opacity md:duration-300 md:group-hover:opacity-100">
                {lane[2]}
              </span>
            </motion.button>
          ))}
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export default function TheMessageToUkraineLanding() {
  const [menuOpen, setMenuOpen] = useState(false);
  const horizontalRef = useRef(null);
  const { scrollYProgress: pageProgress } = useScroll();
  const { scrollYProgress: horizontalProgress } = useScroll({
    target: horizontalRef,
    offset: ["start start", "end end"],
  });
  const smoothPageProgress = useSpring(pageProgress, {
    stiffness: 90,
    damping: 25,
    mass: 0.35,
  });
  const smoothHorizontalProgress = useSpring(horizontalProgress, {
    stiffness: 80,
    damping: 24,
    mass: 0.3,
  });
  const x = useTransform(smoothHorizontalProgress, [0, 1], ["0vw", "-385vw"]);
  const preloader = useMemo(() => ["The", "message", "to", "Ukraine"], []);

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#11100e] text-[#efe2cb] selection:bg-[#efe2cb] selection:text-black">
      <style>{`
        @import url("https://fonts.googleapis.com/css2?family=Inter:wght@500;700;900&family=Playfair+Display:ital,wght@0,700;1,500&display=swap");
        .ukraine-serif { font-family: "Playfair Display", Georgia, serif; }
        .ukraine-sans { font-family: Inter, Arial, sans-serif; }
        .mtuk-safe { max-width: 100%; overflow-wrap: anywhere; }
        .marquee-track { animation: mtuk-marquee 18s linear infinite; will-change: transform; }
        @keyframes mtuk-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .paper-edge { clip-path: polygon(1% 3%, 15% 0, 28% 2%, 43% 0, 60% 3%, 76% 1%, 98% 4%, 100% 28%, 97% 45%, 100% 64%, 98% 98%, 75% 95%, 58% 100%, 42% 96%, 20% 100%, 2% 95%, 0 68%, 3% 51%, 0 32%); }
        @media (max-width: 767px) {
          .mtuk-horizontal { transform: none !important; }
        }
      `}</style>

      <motion.div
        initial={{ y: 0 }}
        animate={{ y: "-100%" }}
        transition={{ delay: 1.2, duration: 1.05, ease: [0.76, 0, 0.24, 1] }}
        className="pointer-events-none fixed inset-0 z-[70] grid grid-cols-4 bg-[#f1e3cb] text-black"
      >
        {preloader.map((word, index) => (
          <motion.div
            key={word}
            initial={{ y: 70, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: index * 0.12, duration: 0.75 }}
            className="flex items-center justify-center border-r border-black/20"
          >
            <span className="ukraine-serif rotate-[-8deg] text-[clamp(28px,5vw,104px)] italic">
              {word}
            </span>
          </motion.div>
        ))}
      </motion.div>

      <LaneMenu open={menuOpen} onClose={() => setMenuOpen(false)} />

      <motion.div
        className="fixed left-0 top-0 z-[60] h-1 origin-left bg-[#efe2cb]"
        style={{ scaleX: smoothPageProgress, width: "100%" }}
      />

      <header className="fixed left-0 right-0 top-0 z-40 flex items-start justify-between px-5 py-5 mix-blend-difference md:px-8">
        <a
          href="#top"
          className="ukraine-sans text-sm font-bold uppercase tracking-normal text-white"
        >
          The message to Ukraine
        </a>
        <button
          type="button"
          onClick={() => setMenuOpen(true)}
          className="ukraine-sans text-sm font-bold uppercase tracking-normal text-white"
        >
          Menu
        </button>
      </header>

      <section
        id="top"
        className="relative min-h-[100svh] overflow-hidden px-4 pt-24 md:px-8"
      >
        <motion.img
          src={cover}
          alt="The Message to Ukraine cover collage"
          initial={{ scale: 1.14, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1.35, duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 h-full w-full object-cover opacity-75"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,transparent_0,rgba(17,16,14,.08)_34%,rgba(17,16,14,.88)_82%)]" />

        <motion.div
          initial={{ opacity: 0, y: 70 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.55, duration: 1 }}
          className="relative z-10 mx-auto flex min-h-[calc(100svh-6rem)] max-w-[1500px] flex-col justify-between"
        >
          <p className="max-w-[32rem] text-lg leading-tight md:text-2xl">
            It is a message to our country - Ukraine and to Ukrainians.
          </p>
          <div className="pb-[9vh]">
            <h1 className="ukraine-serif mtuk-safe text-[clamp(62px,15vw,230px)] font-bold uppercase leading-[.78] tracking-normal">
              Ukraine
            </h1>
            <div className="mt-5 flex flex-wrap items-end justify-between gap-5 border-t border-[#efe2cb]/50 pt-5">
              <p className="ukraine-serif max-w-xl text-3xl italic leading-none md:text-6xl">
                beautiful, truly and timeless.
              </p>
              <p className="max-w-sm text-sm uppercase leading-tight md:text-base">
                A digital love letter built from poem fragments, halftone
                clippings, vertical rhythm, and horizontal discovery.
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="relative bg-[#efe2cb] py-16 text-black md:py-24">
        <div className="overflow-hidden border-y border-black">
          <div className="marquee-track flex w-max py-3 text-[clamp(40px,8vw,118px)] font-black uppercase leading-none">
            {Array.from({ length: 10 }).map((_, index) => (
              <span key={index} className="px-5">
                Ukraine - Ukraine - Ukraine -
              </span>
            ))}
          </div>
        </div>
        <div className="mx-auto grid max-w-[1500px] gap-12 px-5 pt-20 md:grid-cols-[1.2fr_.8fr] md:px-8">
          <motion.p
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="ukraine-serif text-[clamp(46px,8vw,126px)] leading-[.86]"
          >
            One day our team decided to create a website but not usual for us.
          </motion.p>
          <div className="space-y-8 text-xl leading-tight md:text-3xl">
            <p>
              We wanted to make a declaration of love: beautiful, truly and
              timeless. This message goes from our hearts to millions of hearts
              all around the world.
            </p>
            <TornImage
              src={gallery[0]}
              className="paper-edge h-[18rem] w-full sm:h-[22rem]"
              label="nature."
            />
          </div>
        </div>
      </section>

      <section
        ref={horizontalRef}
        className="relative bg-[#11100e] md:h-[650vh]"
      >
        <div className="md:sticky md:top-0 md:flex md:h-screen md:items-center md:overflow-hidden">
          <motion.div
            style={{ x }}
            className="mtuk-horizontal flex flex-col gap-12 px-5 py-16 md:h-full md:w-max md:flex-row md:items-center md:gap-[4vw] md:px-[5vw] md:py-0"
          >
            {poem.map((item, index) => (
              <article
                key={item.en}
                className="relative flex min-h-[36rem] w-full flex-col justify-between overflow-hidden border-l border-[#efe2cb]/30 pl-5 md:h-[78vh] md:w-[92vw] md:shrink-0 md:pl-9 lg:w-[82vw]"
              >
                <span className="text-sm uppercase text-[#efe2cb]/70">
                  0{index + 1}
                </span>
                <TornImage
                  src={gallery[(index + 1) % gallery.length]}
                  className={`paper-edge pointer-events-none absolute h-52 w-44 opacity-70 sm:h-64 sm:w-56 md:h-[31vh] md:w-[26vw] md:opacity-100 ${index % 2 ? "right-0 top-10 md:right-6 md:top-4" : "bottom-20 right-0 md:bottom-16 md:right-2"}`}
                  rotate={index % 2 ? "rotate-3" : "-rotate-3"}
                />
                <div className="relative z-10">
                  <p className="mb-5 max-w-[32rem] text-sm leading-tight text-[#efe2cb]/70 sm:text-base md:text-xl">
                    ( {item.note} )
                  </p>
                  <h2 className="ukraine-serif mtuk-safe text-[clamp(45px,11vw,150px)] leading-[.82] md:leading-[.72]">
                    {item.ua}
                  </h2>
                  <p className="mt-5 max-w-[44rem] text-[clamp(30px,6vw,72px)] font-black uppercase leading-[.86]">
                    {item.en}
                  </p>
                </div>
                <p className="relative z-10 max-w-[38rem] text-xl leading-tight sm:text-2xl md:text-5xl">
                  {item.line}
                </p>
              </article>
            ))}

            <article className="relative min-h-[48rem] w-full shrink-0 md:h-[78vh] md:w-[100vw]">
              <h2 className="ukraine-serif text-[clamp(66px,14vw,190px)] leading-[.8] md:absolute md:left-0 md:top-0 md:leading-[.74]">
                Cities
              </h2>
              <div className="mt-10 grid w-full grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2 md:absolute md:bottom-0 md:left-0 md:mt-0 md:grid-cols-3">
                {cities.map((city) => (
                  <motion.span
                    key={city}
                    whileHover={{ x: 15, color: "#fff" }}
                    className="border-b border-[#efe2cb]/30 py-2 text-[clamp(28px,5vw,64px)] font-black uppercase leading-none"
                  >
                    {city}
                  </motion.span>
                ))}
              </div>
            </article>
          </motion.div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#efe2cb] px-5 py-20 text-black md:px-8 md:py-28">
        <div className="mx-auto grid max-w-[1500px] gap-10 md:grid-cols-[.85fr_1.15fr]">
          <div>
            <p className="mb-8 text-sm uppercase">Language:</p>
            <h2 className="text-[clamp(56px,11vw,180px)] font-black uppercase leading-[.76]">
              Every line of a song goes straight to my soul.
            </h2>
          </div>
          <div className="relative min-h-[34rem] overflow-hidden sm:min-h-[42rem]">
            <TornImage
              src={gallery[2]}
              className="paper-edge absolute left-0 top-0 h-60 w-52 md:h-96 md:w-80"
            />
            <TornImage
              src={gallery[3]}
              className="paper-edge absolute right-0 top-20 h-64 w-52 rotate-6 md:h-[30rem] md:w-[23rem]"
            />
            <TornImage
              src={gallery[4]}
              className="paper-edge absolute bottom-4 left-[16%] h-60 w-60 -rotate-6 md:h-[26rem] md:w-[26rem]"
            />
            <motion.p
              initial={{ opacity: 0, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="ukraine-serif absolute left-[8%] top-[42%] z-20 max-w-[33rem] text-[clamp(32px,7vw,76px)] italic leading-[.9]"
            >
              Just search, listen to, and feel the magic.
            </motion.p>
          </div>
        </div>
      </section>

      <section className="bg-[#11100e] px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-[1500px]">
          <div className="grid gap-8 md:grid-cols-4">
            {["Nature", "Language", "Food", "People"].map((word, index) => (
              <motion.div
                key={word}
                initial={{ opacity: 0, y: 55 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="min-h-[22rem] border border-[#efe2cb]/40 p-4"
              >
                <span className="text-sm">0{index + 1}</span>
                <h3 className="mt-16 text-[clamp(38px,4vw,70px)] font-black uppercase leading-[.8]">
                  {word}
                </h3>
                <p className="mt-6 text-lg leading-tight text-[#efe2cb]/70">
                  {word === "Food"
                    ? "Borscht, varenyky, wheat, fire, tables full of memory."
                    : "A small chapter in the bigger poem about Ukrainian soul."}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <footer className="relative overflow-hidden bg-[#efe2cb] text-black">
        <div className="overflow-hidden border-y border-black">
          <div className="marquee-track flex w-max py-3 text-[clamp(38px,7vw,108px)] font-black uppercase leading-none">
            {Array.from({ length: 10 }).map((_, index) => (
              <span key={index} className="px-5">
                We succeed in this - Ukraine -
              </span>
            ))}
          </div>
        </div>
        <div className="mx-auto grid max-w-[1500px] gap-12 px-5 py-16 md:grid-cols-[1fr_1fr] md:px-8 md:py-24">
          <div>
            <h2 className="ukraine-serif text-[clamp(58px,10vw,170px)] leading-[.8]">
              This message goes from our hearts.
            </h2>
          </div>
          <div className="space-y-9 text-xl leading-tight md:text-3xl">
            <p>
              Poem: the author is Olia Olianishyna. Editor: Nataliia Proskurina,
              teacher of Ukrainian language and literature.
            </p>
            <div className="grid grid-cols-2 gap-6 text-base uppercase">
              <a
                href="mailto:info@obys.agency"
                className="border-t border-black pt-3"
              >
                Say Hi!
                <br />
                info@obys.agency
              </a>
              <a
                href="https://obys.agency/"
                className="border-t border-black pt-3"
              >
                Credits:
                <br />
                Site by Obys
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
