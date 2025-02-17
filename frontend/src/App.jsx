import { useEffect } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import './App.css'

function App() {
  useEffect(() => {
    // Initialiser kartet
    const map = L.map('map').setView([59.9139, 10.7522], 13); // Oslo sentrum

    // Legg til kartlag (OpenStreetMap)
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    // Legg til en markør
    const marker = L.marker([59.9139, 10.7522]).addTo(map);
    marker.bindPopup("<b>Hei!</b><br>Dette er Oslo sentrum.").openPopup();

    // Cleanup funksjon
    return () => {
      map.remove();
    };
  }, []);

  return (
    <div className="app-container">
      <h1>Kart Visualisering</h1>
      <div id="map"></div>
    </div>
  );
}

export default App
