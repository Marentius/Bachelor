import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import { eventEmitter } from '../service/WebSocket';
import { createFlowerAnimation } from '../utils/flowerAnimation';

/**
 * Animation - Komponent for kartanimasjon ved salg
 * 
 * Lytter etter salgshendelser og viser animerte blomster
 * på kartet når det skjer et salg. Blomstene varierer i størrelse basert på
 * salgsbeløpet.
 * 
 * @param {Object} props - Komponentens props
 * @param props.stores - Liste over butikker med posisjonsinformasjon
 */
export default function Animation({ stores }) {
    // Henter referanse til kartet fra react-leaflet
    const map = useMap();
    

    useEffect(() => {
        /**
         * Håndterer innkommende salg
         * @param {Object} event - Salget
         * @param {string} event.storeNo - Butikkens nummer
         * @param {number} event.saleSizeCategory - Kategori for salgsstørrelse (1-3)
         */
        const handleSale = (event) => {
            const { storeNo, saleSizeCategory } = event;
            
            // Finner butikken som mottok salget
            const store = stores.find(s => s.storeNo == storeNo);
            if (!store) return;
            
            // Oppretter animasjon på butikkens posisjon
            createFlowerAnimation(map, store, saleSizeCategory);
        };

        // Lytter etter salg og triggger animasjon
        eventEmitter.on('sale', handleSale);

        // Rydder opp lytter 
        return () => eventEmitter.removeListener('sale', handleSale);
        
    }, [map, stores]);

    return null;
} 