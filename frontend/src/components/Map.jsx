import { MapContainer, TileLayer, GeoJSON} from 'react-leaflet'
import '../style/Map.css'
// Importerer GeoJSON-data for Norge som String da Vite ikke kan importere GeoJSON-filer
// https://vite.dev/guide/assets
import norwayBorder from '../geoJSON/Norge-S.geojson?raw'

// Konverterer String til JSON 
const norwayBorderJSON = JSON.parse(norwayBorder)

function Map() {

    return (
        <div className="app-container">
            <MapContainer className='map-container'
                center={[65.53, 21.62]} 
                zoom={5} 
                scrollWheelZoom={true}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <GeoJSON className="geojson-norway"
                    data={norwayBorderJSON}
                />
            </MapContainer>
        </div>
    );
}

export default Map;

// Kilder for kartinitialisering
// https://react-leaflet.js.org/docs/start-installation/
// https://react-leaflet.js.org/docs/start-setup/
// https://leafletjs.com/examples/quick-start/