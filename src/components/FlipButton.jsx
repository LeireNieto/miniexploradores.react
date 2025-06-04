import React from "react";

export default function FlipButton({ onClick, showText }) {
  return (
    <button
      className="flip-btn"
      onClick={onClick}
      aria-label="Girar tarjeta"
      type="button"
    >
      ⟳ {showText && <span className="btn-text">Ver más info</span>}
    </button>
  );
}
