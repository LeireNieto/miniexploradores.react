import React, { useEffect, useState } from "react";
import ActividadCard from "./ActividadCard";
import FiltroCiudad from './FiltroCiudad';
import Mapa from "./Mapa";
import Clima from "./Clima";
import Button from "./Button";

function normalize(str) {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

export default function Actividades() {
  const [actividades, setActividades] = useState([]);
  const [ciudad, setCiudad] = useState("");
  const [mostrarMapa, setMostrarMapa] = useState(false);
  const [mostrarClima, setMostrarClima] = useState(false);
  const [scrollIndex, setScrollIndex] = useState(0);
  const visibleCards = 4;

  useEffect(() => {
    fetch("/actividades.json")
      .then(res => res.json())
      .then(data => setActividades(data));
  }, []);

  const actividadesFiltradas = ciudad
    ? actividades.filter(a => normalize(a.ciudad) === normalize(ciudad))
    : [];

  const maxIndex = Math.max(actividadesFiltradas.length - visibleCards, 0);

  useEffect(() => {
    if (scrollIndex > maxIndex) setScrollIndex(0);
  }, [actividadesFiltradas, maxIndex, scrollIndex]);

  const handleLeftClick = () => {
    setScrollIndex(i => Math.max(i - 1, 0));
  };

  const handleRightClick = () => {
    setScrollIndex(i => Math.min(i + 1, maxIndex));
  };

  return (
    <div className="actividades-pagina">
      <h2>Actividades</h2>

      <div className="filtro-botones">
        <FiltroCiudad ciudad={ciudad} setCiudad={setCiudad} />
        <Button
          isActive={mostrarMapa}
          onToggle={() => setMostrarMapa(m => !m)}
          textoActivo="Ocultar mapa"
          textoInactivo="Ver mapa"
        />
        <Button
          isActive={mostrarClima}
          onToggle={() => setMostrarClima(c => !c)}
          textoActivo="Ocultar clima"
          textoInactivo="Ver clima"
        />
      </div>

      {ciudad === "" && <p>Selecciona una ciudad para ver las actividades.</p>}
      {ciudad !== "" && actividadesFiltradas.length === 0 && (
        <p>No hay actividades para esta ciudad.</p>
      )}

      {ciudad !== "" && actividadesFiltradas.length > 0 && (
        <div className="carousel-container">
  <button className="carousel-btn left" onClick={handleLeftClick} disabled={scrollIndex === 0}>‹</button>

  <div className="carousel-wrapper">
    <div className="carousel-cards" style={{ transform: `translateX(-${scrollIndex * 25}%)` }}>
      {actividadesFiltradas.map((actividad, idx) => (
        <ActividadCard key={idx} actividad={actividad} />
      ))}
    </div>
  </div>

  <button className="carousel-btn right" onClick={handleRightClick} disabled={scrollIndex === maxIndex}>›</button>
</div>

      )}

      <div className="info-extra">
        {mostrarMapa && (
          <div className="mapa">
            <Mapa actividades={actividadesFiltradas} />
          </div>
        )}
        {mostrarClima && (
          <div className="clima">
            <Clima ciudad={ciudad} />
          </div>
        )}
      </div>
    </div>
  );
}
