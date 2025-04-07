'use client'
import { MapContainer, TileLayer, GeoJSON, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import '../style/Map.css';
import { useState, useEffect } from 'react';

import norwayBorders from '../geoJSON/Norge-S.geojson'
import stateBorders from '../geoJSON/Fylker-S.geojson'
import municipalityBorders from '../geoJSON/Kommuner-S.geojson'
import storeData from '../data/storeData.json'
import { defaultIcon } from '../icons/Icons';

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
    
    // Kjører ved oppstart for å initialisere butikklisten og sjekke skjermstørrelse
    useEffect(() => {
        //Filtrerer butikkdata for å bare inkludere butikker med gyldige koordinater
        const stores = storeData.filter(store => store.latitude && store.longitude)
        setStores(stores);
    }, []);

    return (
        <div className="app-container">
            <MapContainer 
                className="map-container"
                center={[65.53, 21.62]}
                zoom={5.5}
                scrollWheelZoom={true}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                
                <GeoJSON 
                    className="geojson-norway"
                    data={[norwayBorders, stateBorders, municipalityBorders]}
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
                            </div>
                        </Popup>
                    </Marker>
                ))}
                
                <Animation stores={stores} />
            </MapContainer>
        </div>
    )
}

// Kilder
// https://react-leaflet.js.org/docs/start-installation/
// https://react-leaflet.js.org/docs/start-setup/
// https://leafletjs.com/examples/quick-start/
// https://medium.com/@tomisinabiodun/displaying-a-leaflet-map-in-nextjs-85f86fccc10c