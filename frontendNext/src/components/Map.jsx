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
import SalesCounter from './SalesCounter';
import AreaSelector from './AreaSelector';
import MapController from './MapController';

/**
 * Map - Hovedkomponent for kartvisningen
 * 
 * Dette komponentet integrerer alle kartrelaterte funksjonaliteter:
 * - Viser et kart med Norge og fylkesgrenser
 * - Viser markører for alle butikker
 * - Håndterer sanntids-oppdateringer fra WebSocket
 * - Viser blomsteranimasjoner når butikker mottar salg
 * - Viser dagens salgstall
 */
export default function Map() {
    const [stores, setStores] = useState([]);
    const [mapCenter, setMapCenter] = useState([65.53, 21.62]);
    const [mapZoom, setMapZoom] = useState(5);

    // Håndterer endring av område
    const handleAreaChange = (newCenter, newZoom) => {
        setMapCenter(newCenter);
        setMapZoom(newZoom);
    };

    useEffect(() => {
        const stores = storeData.filter(store => store.latitude && store.longitude)
        setStores(stores);
    }, []);

    return (
        <div className="app-container">
            <AreaSelector onAreaChange={handleAreaChange} />
            <MapContainer 
                className="map-container"
                center={mapCenter}
                zoom={mapZoom}
                scrollWheelZoom={true}
                minZoom={4}
            >
                <MapController center={mapCenter} zoom={mapZoom} />
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
                    {stores
                        .map(store => (
                            <Marker 
                                key={`${store.storeNo}-${store.latitude}-${store.longitude}`}              
                                position={[store.latitude, store.longitude]} 
                                icon={warehouseIcon}               
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
                <HelpBox />
                <SalesCounter />
                <img src="logo.png" alt="Europris logo" className="logo"/>
            </MapContainer>
        </div>
    )
}