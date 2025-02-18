import { MapContainer, TileLayer} from 'react-leaflet'
import './App.css'
// Importerer og starter WebSocket-klienten som kobler til backend
import './service/WebSocket'

function App() {
  return (
    <div className="app-container">
      {/* MapContainer er hovedkomponenten for kartet fra react-leaflet */}
      <MapContainer 
        // Setter startposisjon for kartet til midt i Norge [breddegrad, lengdegrad]
        center={[65, 13]} 
        // Setter startnivå for zoom
        zoom={5} 
        // Tillater zooming med musehjul
        scrollWheelZoom={true}
        // Setter kartet til å fylle hele nettleservinduet
        style={{ height: "100vh", width: "100vw" }}
      >
        {/* TileLayer laster inn selve kartbildene fra OpenStreetMap */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
    </div>
  );
}

export default App

// Kilder
// https://react-leaflet.js.org/docs/start-installation/
// https://react-leaflet.js.org/docs/start-setup/
// https://leafletjs.com/examples/quick-start/