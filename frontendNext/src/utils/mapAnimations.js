import L from 'leaflet';
import { createFlowerIcon } from '../icons/Icons';

/**
 * @function createFlowerAnimation - Funksjon som oppretter og håndterer en blomsteranimasjon på kartet
 * når en butikk mottar et salg.
 * @param {L.Map} mapInstance - Instansen av Leaflet-kartet
 * @param {Object} store - Butikkobjekt med latitude og longitude
 * @param {string} category - Salgskategori som bestemmer blomstens utseende
 * @returns {void}
 */

export function createFlowerAnimation(mapInstance, store, category) {
    if (!mapInstance) return;

    const flowerIcon = createFlowerIcon(category);
    
    const flowerMarker = L.marker([store.latitude, store.longitude], {
        icon: flowerIcon,
        zIndexOffset: 1000 //Sikrer at blomsten vises over andre markører
    }).addTo(mapInstance);
    
    // En timer som fjerner blomstermarkøren etter 5 sekunder
    setTimeout(() => {
        if (mapInstance) {
            mapInstance.removeLayer(flowerMarker);
        }
    }, 5000);
} 