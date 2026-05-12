import React from "react";

function ColorPicker() {
  const [colors, setColors] = React.useState(["#FFD500", "#FF0040"]);

  const colorStops = colors.join(", ");
  const backgroundImage = `linear-gradient(${colorStops})`;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-950 text-white px-6 py-10">
      {/* Preview Card */}
      <div className="w-full max-w-md">
        <div
          className="h-48 w-full rounded-2xl shadow-2xl border border-white/10"
          style={{
            backgroundImage,
          }}
        />

        <p className="text-center text-sm text-zinc-400 mt-3">
          Live Gradient Preview
        </p>
      </div>

      {/* Form */}
      <form className="mt-10 w-full max-w-md space-y-4">
        {colors.map((color, index) => {
          const colorId = `color-${index}`;

          return (
            <div
              key={colorId}
              className="flex items-center justify-between bg-white/5 border border-white/10 rounded-xl px-4 py-3 backdrop-blur-md"
            >
              <label
                htmlFor={colorId}
                className="text-sm font-medium text-zinc-300"
              >
                Color {index + 1}
              </label>

              <div className="flex items-center gap-3">
                <span className="text-xs text-zinc-400">{color}</span>

                <input
                  id={colorId}
                  type="color"
                  value={color}
                  onChange={(event) => {
                    const nextColors = [...colors];
                    nextColors[index] = event.target.value;
                    setColors(nextColors);
                  }}
                  className="h-10 w-14 cursor-pointer rounded-lg border border-white/10 bg-transparent"
                />
              </div>
            </div>
          );
        })}
      </form>
    </div>
  );
}

export default ColorPicker;
