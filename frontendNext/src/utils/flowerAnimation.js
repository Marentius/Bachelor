import L from 'leaflet';
import { createFlowerIcon } from '../icons/Icons';

/**
 * @function createFlowerAnimation - Funksjon som oppretter og håndterer en blomsteranimasjon på kartet
 * når en butikk mottar et salg.
 * @param {L.Map} map - Instansen av Leaflet-kartet
 * @param {Object} store - Butikkobjekt med latitude og longitude
 * @param {string} saleSizeCategory - Salgskategori som bestemmer blomstens utseende
 * @returns {void}
 */

export function createFlowerAnimation(map, store, saleSizeCategory) {
    if (!map) return;

    const flowerIcon = createFlowerIcon(saleSizeCategory);
    
    const flowerMarker = L.marker([store.latitude, store.longitude], {
        icon: flowerIcon
    }).addTo(map);
    
    // En timer som fjerner blomstermarkøren etter 5 sekunder
    setTimeout(() => {
        if (map) {
            map.removeLayer(flowerMarker);
        }
    }, 5000);
} 