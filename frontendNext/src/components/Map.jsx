'use client'
import { MapContainer, TileLayer, GeoJSON, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'
import '../style/Map.css';
import { useState, useEffect } from 'react';

import norwayBorders from '../geoJSON/Norge-S.geojson'
import stateBorders from '../geoJSON/Fylker-S.geojson'
import sweden from '../geoJSON/sweden.geojson'
import storeData from '../data/storeData.json'
import { warehouseIcon } from '../icons/Icons';

import Animation from './Animation';
import HelpBox from './HelpBox';

/**
 * Map - Hovedkomponent for kartvisningen
 * 
 * Dette komponentet integrerer alle kartrelaterte funksjonaliteter:
 * - Viser et kart med Norge og fylkesgrenser
 * - Viser markører for alle butikker
 * - Håndterer sanntids-oppdateringer fra WebSocket
 * - Viser blomsteranimasjoner når butikker mottar salg
 */
export default function Map() {

     // State for å holde styr på butikkene som skal vises på kartet
     const [stores, setStores] = useState([]);
    
    /**
     * Initialiserer butikklisten ved komponentoppstart
     * Filtrerer bort butikker uten gyldige koordinater
     */
    useEffect(() => {
        const stores = storeData.filter(store => store.latitude && store.longitude)
        setStores(stores);
    }, []);

    return (
        <div className="app-container">
            <MapContainer 
                className="map-container"
                center={[65.53, 21.62]}
                zoom={5}
                scrollWheelZoom={true}
                minZoom={4}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                
                {/* GeoJSON for land- og fylkesgrenser */}
                <GeoJSON 
                    className="geojson-norway"
                    data={[norwayBorders, stateBorders, sweden]}
                />

                    {/* Itererer gjennom alle butikker og lager markører for hver butikk */}
                    {stores.map(store => (
                        <Marker 
                            key={`${store.storeNo}-${store.latitude}-${store.longitude}`}              
                            position={[store.latitude, store.longitude]} 
                            icon={warehouseIcon}               
                        >
                            <Popup>
                                <div>
                                    <h3>{store.name}</h3>
                                    <p>Butikknr: {store.storeNo}</p>
                                    <p>Land: {store.country}</p>
                                </div>
                            </Popup>
                        </Marker>
                    ))}
                
                <Animation stores={stores} />
                <HelpBox />
                <img src="logo.png" alt="Europris logo" className="logo"/>
            </MapContainer>
        </div>
    )
}