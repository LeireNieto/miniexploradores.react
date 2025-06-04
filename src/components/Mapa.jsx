import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";


export default function Mapa({ actividades }) {
  // Si no hay actividades, muestra el mapa centrado en Bilbao
  const defaultPosition = [43.2630, -2.9350];
  const position = actividades.length && actividades[0].lat && actividades[0].lng
    ? [actividades[0].lat, actividades[0].lng]
    : defaultPosition;

  return (
    <div className="mapa">
      <MapContainer center={position} zoom={13}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {actividades.map((a, idx) =>
          a.lat && a.lng ? (
            <Marker key={idx} position={[a.lat, a.lng]}>
              <Popup>
                <strong>{a.nombre}</strong>
                <br />
                {a.ubicacion}
              </Popup>
            </Marker>
          ) : null
        )}
      </MapContainer>
    </div>
  );
}
