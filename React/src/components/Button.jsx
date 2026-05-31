import obitoAngry from "../assets/angry.png";
import obitoCurious from "../assets/curious.png";
import obitoConfident from "../assets/confident.png";
import { useEffect, useState } from "react";

const happyFrames = [obitoAngry, obitoConfident, obitoCurious];

export default function FrameCharacter() {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setFrame((prev) => (prev + 1) % happyFrames.length);
    }, 180);

    return () => clearInterval(id);
  }, []);

  return <img src={happyFrames[frame]} className="h-[520px] object-contain" />;
}
