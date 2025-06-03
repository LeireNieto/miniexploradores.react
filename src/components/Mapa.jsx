import { useEffect } from "react";
import "leaflet/dist/leaflet.css";


export default function Mapa({ actividades }) {
  useEffect(() => {
    // Solo inicializar una vez
    let map = L.map("mapa").setView([43.2630, -2.9350], 12);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(map);

    // Limpiar marcadores previos
    map.eachLayer((layer) => {
      if (layer instanceof L.Marker) map.removeLayer(layer);
    });

    // Añadir marcadores de actividades filtradas
    actividades.forEach((a) => {
      if (a.lat && a.lng) {
        L.marker([a.lat, a.lng])
          .addTo(map)
          .bindPopup(`<strong>${a.nombre}</strong><br>${a.ubicacion}`);
      }
    });

    // Centrar mapa si hay actividades
    if (actividades.length && actividades[0].lat && actividades[0].lng) {
      map.setView([actividades[0].lat, actividades[0].lng], 13);
    }

    // Limpieza al desmontar
    return () => map.remove();
  }, [actividades]);

  return <div id="mapa" style={{ width: "984px", height: "400px", margin: "51px auto" }}></div>;
}
