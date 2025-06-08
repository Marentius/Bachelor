import L from 'leaflet';
import { createFlowerIcon } from '../icons/Icons';

/**
 * Oppretter og håndterer en blomsteranimasjon på kartet
 * 
 * Funksjonen:
 * 1. Oppretter en markør med blomsterikon på butikkens posisjon
 * 2. Viser animasjonen i 3 sekunder
 * 3. Fjerner markøren automatisk etter visning
 * 
 * @param {L.Map} map - Leaflet kartinstansen
 * @param {Object} store - Butikkobjekt med posisjonsinformasjon
 * @param {number} saleSizeCategory - Kategori for salgsstørrelse (1-3)
 */
export function createFlowerAnimation(map, store, saleSizeCategory) {
    // Avbryter hvis kartet ikke er tilgjengelig
    if (!map) return;

    // Oppretter blomsterikon basert på salgsstørrelse
    const flowerIcon = createFlowerIcon(saleSizeCategory);
    
    // Legger til markør med blomsterikon på kartet
    const flowerMarker = L.marker([store.latitude, store.longitude], {
        icon: flowerIcon
    }).addTo(map);
    
    // Fjerner blomstermarkøren etter 3 sekunder
    setTimeout(() => {
        if (map) {
            map.removeLayer(flowerMarker);
        }
    }, 3000);
} 