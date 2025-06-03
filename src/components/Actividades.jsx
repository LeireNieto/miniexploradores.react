import React, { useEffect, useState } from "react";
import ActividadCard from "./ActividadCard"; // tu componente para mostrar cada actividad

const ciudades = [
  { value: "", label: "Selecciona una ciudad" },
  { value: "Bilbao", label: "Bilbao" },
  { value: "San Sebastián", label: "San Sebastián" },
  { value: "Vitoria", label: "Vitoria" },
  { value: "Santander", label: "Santander" },
  { value: "Pamplona", label: "Pamplona" },
  { value: "Logroño", label: "Logroño" },
];

export default function Actividades() {
  const [actividades, setActividades] = useState([]);
  const [ciudad, setCiudad] = useState("");

  useEffect(() => {
    fetch("/actividades.json")
      .then(res => res.json())
      .then(data => setActividades(data));
  }, []);

  // Filtra las actividades según la ciudad seleccionada
  const actividadesFiltradas = ciudad
  ? actividades.filter(a =>
      a.ciudad.trim().toLowerCase() === ciudad.trim().toLowerCase()
    )
  : [];

     // Debug
  console.log({ ciudad, actividades, actividadesFiltradas });

  return (
    <div>
      <h2>Actividades</h2>
      <div className="filtro">
        <label htmlFor="ciudad">Ciudad:</label>
        <select
          id="ciudad"
          value={ciudad}
          onChange={e => setCiudad(e.target.value)}
        >
          {ciudades.map(c => (
            <option key={c.value} value={c.value}>
              {c.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        {ciudad === "" && <p>Selecciona una ciudad para ver las actividades.</p>}
        {ciudad !== "" && actividadesFiltradas.length === 0 && (
          <p>No hay actividades para esta ciudad.</p>
        )}
        {actividadesFiltradas.map((actividad, idx) => (
          <ActividadCard key={idx} actividad={actividad} />
        ))}
      </div>
    </div>
  );
}
