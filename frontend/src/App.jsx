import Map from './components/Map';
import './App.css'
// Importerer og starter WebSocket-klienten som kobler til backend
import './service/WebSocket'

function App() {
  return (
    <Map />
  );
}

export default App

// Kilder
// https://react-leaflet.js.org/docs/start-installation/
// https://react-leaflet.js.org/docs/start-setup/
// https://leafletjs.com/examples/quick-start/