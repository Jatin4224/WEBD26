//useId hook
/*
Finish it up by adding a unique ID to the button, and connecting it to the label. You should be able to trigger the toggle by clicking the "Dark Mode" text.

*/
import React, { useId } from "react";

function Toggle({
  label,
  checked,
  handleToggle,
  backdropColor = "white",
  size = 16,
}) {
  const id = useId();
  const padding = size * 0.1;
  const width = size * 2 + padding * 2;

  const wrapperStyle = {
    width,
    padding,
    "--radius": size * 0.25 + "px",
    "--backdrop-color": backdropColor,
  };

  const ballStyle = {
    width: size,
    height: size,
    transform: checked ? `translateX(100%)` : `translateX(0%)`,
  };

  return (
    <div className={styles.wrapper}>
      <label htmlFor={id}>{label}</label>
      <button
        id={id}
        className={styles.toggle}
        type="button"
        aria-pressed={checked}
        style={wrapperStyle}
        onClick={() => {
          handleToggle(!checked);
        }}
      >
        <span className={styles.ball} style={ballStyle} />
      </button>
    </div>
  );
}
