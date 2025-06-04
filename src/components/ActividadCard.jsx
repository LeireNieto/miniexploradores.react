import React, { useState } from "react";

export default function ActividadCard({ actividad }) {
  const [flip, setFlip] = useState(false);

  return (
    <div className={`card actividad-card${flip ? " flip" : ""}`}>
      <div className="card-inner">
        <div className="card-front">
          <img src={`/imagenes/${actividad.imagen}`} alt={actividad.nombre}         />
          <h3>{actividad.nombre}</h3>
         
          <button className="flip-btn" onClick={() => setFlip(!flip)}>
            🔄 Más info
          </button>

          <button className="fav-btn">♥</button>
        </div>

        {/* BACK */}
        <div className="card-back">
          <p>{actividad.descripcion}</p>
          <p><strong>Edad recomendada:</strong> {actividad.edad}</p>
          <p><strong>Precio:</strong> {actividad.precio}</p>
          <p><strong>Ubicación:</strong> {actividad.ubicacion}</p>
          {actividad.enlace && (
            <a href={actividad.enlace} target="_blank" rel="noopener noreferrer">
              Más información
            </a>
          )}

          {/* Mismo botón de giro sin texto */}
          <button className="flip-btn" onClick={() => setFlip(!flip)}>
            🔄
          </button>
        </div>
      </div>
    </div>
  );
}
