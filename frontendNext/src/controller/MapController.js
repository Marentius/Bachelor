import { useMap } from 'react-leaflet';
import { useEffect } from 'react';

/**
 * MapController - En "headless component" som gir hovedkomponenten tilgang til Leaflet-kartobjektet
 *
 * Denne komponenten bruker useMap-hooken for å få tilgang til kartobjektet og sender det
 * tilbake til foreldrekomponenten via en callback. Dette er nødvendig fordi Leaflet-kartobjektet
 * ikke er direkte tilgjengelig i React-komponenter, men må aksesseres via denne hooken.
 * 
 * @param {Function} onMapReady - Callback-funksjon som kalles med kartobjektet når det er klart
 */
export default function MapController({ onMapReady }) {
    // useMap-hooken gir tilgang til det faktiske Leaflet-kartobjektet
    const map = useMap();
    
    useEffect(() => {
        if (map) {
            // Kaller callback-funksjonen med kartobjektet
            // Dette gir foreldrekomponenten tilgang til kartobjektet
            onMapReady(map);
        }
    }, [map, onMapReady]);
    
    return null;
}
