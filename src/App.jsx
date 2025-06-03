import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Actividades from "./components/Actividades";
import Clima from "./components/Clima";
import Mapa from "./components/Mapa";
import { AppProvider, useAppContext } from "./context/AppContext";

function App() {
  return (
    <AppProvider>
      <div className="app-container">
        <Header />
        <main>
          <Actividades />
          <ClimaWrapper />
          <MapaWrapper />
        </main>
        <Footer />
      </div>
    </AppProvider>
  );
}

// Estos componentes condicionales muestran/ocultan Clima y Mapa según el contexto
function ClimaWrapper() {
  const { showClima } = useAppContext();
  return showClima ? <Clima /> : null;
}

function MapaWrapper() {
  const { showMapa } = useAppContext();
  return showMapa ? <Mapa /> : null;
}

export default App;
