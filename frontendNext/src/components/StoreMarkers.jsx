import { Marker, Popup } from 'react-leaflet';
import { defaultIcon } from '../icons/Icons';

/**
 * @param {Array} stores - Liste over butikkobjekter med posisjon og metadata
 * @param {Object} activeEvents - Objekt som mapper butikknummer til aktive eventer
 */
export default function StoreMarkers({ stores, activeEvents }) {
    return (
        <>
            {/* Mapper gjennom hver butikk og lager en markør for den */}
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
        </>
    );
} 