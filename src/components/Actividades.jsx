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

  useEffect(() => {
    fetch("/actividades.json")
      .then(res => res.json())
      .then(data => setActividades(data));
  }, []);

  const actividadesFiltradas = ciudad
    ? actividades.filter(
      a => normalize(a.ciudad) === normalize(ciudad)
    )
    : [];

  return (
    <div>
      <h2>Actividades</h2>
      {/* Filtro y botones alineados */}
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

      {/* Tarjetas alineadas horizontalmente */}
      <div className="contenedor-tarjetas">
        {ciudad === "" && <p>Selecciona una ciudad para ver las actividades.</p>}
        {ciudad !== "" && actividadesFiltradas.length === 0 && (
          <p>No hay actividades para esta ciudad.</p>
        )}
        {ciudad !== "" && actividadesFiltradas.length > 0 &&
          actividadesFiltradas.map((actividad, idx) => (
            <ActividadCard key={idx} actividad={actividad} />
          ))
        }
      </div>

      {/* Mapa y clima debajo de las tarjetas */}
      <div className="info-extra">
        {mostrarMapa && (
          <div className="mapa">
            <Mapa ciudad={ciudad} />
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
