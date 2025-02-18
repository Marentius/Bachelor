import { MapContainer, TileLayer} from 'react-leaflet'
import './App.css'

function App() {
  return (
    <div className="app-container">
      <MapContainer 
        center={[65, 13]} 
        zoom={5} 
        scrollWheelZoom={true}
        style={{ height: "100vh", width: "100vw" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
    </div>
  );
}

export default App
