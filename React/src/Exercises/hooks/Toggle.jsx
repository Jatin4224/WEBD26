import React from "react";

function Toggle({ label, checked, handleToggle }) {
  return (
    <label
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.75rem",
        cursor: "pointer",
        marginBottom: "2rem",
      }}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => {
          handleToggle(event.target.checked);
        }}
      />

      <span>{label}</span>
    </label>
  );
}

export default Toggle;
