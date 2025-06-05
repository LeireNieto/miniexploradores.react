import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Importa tus estilos globales (puedes agregar más si los separas)

import './app.css';
import './assets/css/styles.css';
import './assets/css/footer.css';
import './assets/css/actividades.css';
import './assets/css/actividades-card.css';
import './assets/css/header.css';
import './assets/css/clima.css';
import './assets/css/mapa.css';
import './assets/css/filtro-botones.css';
import './assets/css/button.css';
import './assets/css/mapa.css';



// Renderiza la app en el div#root del index.html
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
