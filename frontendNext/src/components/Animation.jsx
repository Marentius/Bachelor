import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import { eventEmitter } from '../service/WebSocket';
import { createFlowerAnimation } from '../utils/flowerAnimation';

/**
 * @param {Array} stores - Liste over butikker med posisjonsinformasjon
 */
export default function Animation({ stores }) {
    const map = useMap();
    
    useEffect(() => {
        const handleSale = (event) => {
            const { storeNo, saleSizeCategory } = event;
            
            const store = stores.find(s => s.storeNo == storeNo);
            if (!store) return;
            
            createFlowerAnimation(map, store, saleSizeCategory);
        };

        eventEmitter.on('sale', handleSale);

        return () => eventEmitter.removeListener('sale', handleSale);
        
    }, [map, stores]);

    return null;
} 