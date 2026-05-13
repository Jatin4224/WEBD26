import React from "react";

const stickersData = [
  {
    src: "https://cdn-icons-png.flaticon.com/512/616/616494.png",
    alt: "leaf",
    width: 80,
    height: 80,
  },
  {
    src: "https://cdn-icons-png.flaticon.com/512/833/833472.png",
    alt: "flower",
    width: 70,
    height: 70,
  },
  {
    src: "https://cdn-icons-png.flaticon.com/512/2909/2909768.png",
    alt: "star",
    width: 75,
    height: 75,
  },
  {
    src: "https://cdn-icons-png.flaticon.com/512/742/742751.png",
    alt: "heart",
    width: 65,
    height: 65,
  },
];

function getSticker() {
  const randomIndex = Math.floor(Math.random() * stickersData.length);
  return stickersData[randomIndex];
}

function Exercise08() {
  const [stickers, setStickers] = React.useState([]);

  return (
    <button
      className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-zinc-900 via-black to-zinc-800 cursor-pointer flex items-center justify-center"
      onClick={(event) => {
        const stickerData = getSticker();

        const newSticker = {
          ...stickerData,
          x: event.clientX,
          y: event.clientY,
          //   id: Math.random(),
          id: crypto.randomUUID(),
        };

        const newStickers = [...stickers, newSticker];
        setStickers(newStickers);
      }}
    >
      <h1 className="text-white text-3xl font-bold tracking-wide pointer-events-none">
        Click Anywhere ✨
      </h1>

      {stickers.map((sticker) => (
        <img
          key={sticker.id}
          className="absolute pointer-events-none select-none transition-transform duration-300 hover:scale-110"
          src={sticker.src}
          alt={sticker.alt}
          style={{
            left: sticker.x - sticker.width / 2,
            top: sticker.y - sticker.height / 2,
            width: sticker.width,
            height: sticker.height,
          }}
        />
      ))}
    </button>
  );
}

export default Exercise08;
