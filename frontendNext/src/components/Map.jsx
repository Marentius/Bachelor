'use client'
import { MapContainer, TileLayer, GeoJSON, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import '../style/Map.css'
import { useState, useEffect } from 'react';
import norwayBorders from '../geoJSON/Norge-S.geojson'
import stateBorders from '../geoJSON/Fylker-S.geojson'
import storeData from '../data/storeData.json'
import { defaultIcon } from '../icons/Icons';



export default function Map() {

    const [stores, setStores] = useState([]);
    
    useEffect(() => {
        const stores = storeData.filter(store => store.latitude && store.longitude)
        setStores(stores);
    }, []);

    return (
        <div className="app-container">
            <MapContainer className="map-container"
                center={[65.53, 21.62]} 
                zoom={5} 
                scrollWheelZoom={true}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {/**GeoJSON for Norge og Fylker */}
                <GeoJSON className="geojson-norway"
                    data={[norwayBorders, stateBorders]}
                />
                {/**Markører for butikker */}
                {
                stores.map(store => (
                    <Marker 
                    key={store.storeNo}
                    position={[store.latitude, store.longitude]}
                    icon={defaultIcon}
                    >
                        <Popup>
                            {store.name}
                        </Popup>
                    </Marker>
                ))
            }
            </MapContainer>
        </div>
    )
}

// Kilder for kartinitialisering
// https://react-leaflet.js.org/docs/start-installation/
// https://react-leaflet.js.org/docs/start-setup/
// https://leafletjs.com/examples/quick-start/
// https://medium.com/@tomisinabiodun/displaying-a-leaflet-map-in-nextjs-85f86fccc10c