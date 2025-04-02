'use client'
import { MapContainer, TileLayer, GeoJSON, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import '../style/Map.css';
import { useState, useEffect } from 'react';

import norwayBorders from '../geoJSON/Norge-S.geojson'
import stateBorders from '../geoJSON/Fylker-S.geojson'
import storeData from '../data/storeData.json'
import { defaultIcon } from '../icons/Icons';

import MapController from '../controller/MapController';  //Gir tilgang til Leaflet-kartobjektet
import Animation from './Animation';

/**
 * Map - Hovedkomponent for kartvisningen
 * 
 * Dette komponentet integrerer alle kartrelaterte funksjonaliteter:
 * - Viser et kart med Norge og fylkesgrenser
 * - Viser markører for alle butikker
 * - Håndterer realtime-oppdateringer fra WebSocket
 * - Viser blomsteranimasjoner når butikker mottar salg
 */

export default function Map() {
    const [stores, setStores] = useState([]); //Butikker som skal vises på kartet
    const [isMobile, setIsMobile] = useState(false); //Om skjermen er mobil
    const [activeEvents, setActiveEvents] = useState({}); //Aktive salgseventer
    const [mapInstance, setMapInstance] = useState(null); //Referanse til det faktiske Leaflet-kartobjektet
    
    // Dynamisk beregning av kartets zoom-nivå og senterpunkt basert på skjermstørrelse
    const zoom = isMobile ? 4 : 5;
    const center = isMobile ? [59.82, 17.67] : [65.53, 21.62];
    
    // Kjører ved oppstart for å initialisere butikklisten og sjekke skjermstørrelse
    useEffect(() => {
        //Filtrerer butikkdata for å bare inkludere butikker med gyldige koordinater
        const stores = storeData.filter(store => store.latitude && store.longitude)
        setStores(stores);

        // Sjekker om skjermen er over eller under 768px
        if (window.innerWidth <= 768) {
            setIsMobile(true);
        }
    }, []);

    /**
     * Callback-funksjon som mottar Leaflet-kartobjektet fra MapController
     * Dette gir oss tilgang til det faktiske kartobjektet
     */

    const handleMapReady = (map) => {
        setMapInstance(map);
    };

    return (
        <div className="app-container">
            <MapContainer 
                className="map-container"
                center={center}
                zoom={zoom}
                scrollWheelZoom={true}
            >
                {/* MapController som oss tilgang til Leaflet-kartobjektet */}
                <MapController onMapReady={handleMapReady} />
            
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                
                <GeoJSON 
                    className="geojson-norway"
                    data={[norwayBorders, stateBorders]}
                />
                
                {/* Itererer gjennom alle butikker og lager markører for hver butikk */}
                {stores.map(store => (
                    <Marker 
                        key={store.storeNo}              
                        position={[store.latitude, store.longitude]} 
                        icon={defaultIcon}               
                    >
                        <Popup>
                            <div>
                                <h3>{store.name}</h3>
                                <p>Butikknr: {store.storeNo}</p>
                                {activeEvents[store.storeNo]}
                            </div>
                        </Popup>
                    </Marker>
                ))}
                
                {/* Animation håndterer WebSocket-eventer og animasjoner */}
                {/* Vises kun når mapInstance er tilgjengelig (kartet er lastet) */}
                {mapInstance && (
                    <Animation 
                        mapInstance={mapInstance}
                        stores={stores}
                        setActiveEvents={setActiveEvents}  // Gir mulighet til å oppdatere aktive eventer
                    />
                )}
            </MapContainer>
        </div>
    )
}

// Kilder
// https://react-leaflet.js.org/docs/start-installation/
// https://react-leaflet.js.org/docs/start-setup/
// https://leafletjs.com/examples/quick-start/
// https://medium.com/@tomisinabiodun/displaying-a-leaflet-map-in-nextjs-85f86fccc10c