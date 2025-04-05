import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import stompClient from '../service/WebSocket';
import { createFlowerAnimation } from '../utils/flowerAnimation';

/**
 * @param {Array} stores - Liste over butikker med posisjonsinformasjon
 * @param {Function} setActiveEvents - State-setter for å oppdatere aktive hendelser
 */
export default function Animation({ stores, setActiveEvents }) {
    const map = useMap();
    
    // WebSocket-lytting 
    useEffect(() => {
        const handleEvent = (message) => {
            try {
                const event = JSON.parse(message.body);
                const { storeNo, saleSizeCategory, receiptTotalIncVat: amount } = event;
                
                // Finner butikken i butikklisten basert på butikknummer
                const store = stores.find(s => s.storeNo == storeNo);
                if (!store) return;
                
                // Oppdaterer state med det nye aktive eventet
                // Bruker en funksjonsform av setState for å sikre at vi alltid jobber med siste state
                setActiveEvents(prev => ({
                    ...prev,                          
                    [storeNo]: {                      
                        saleSizeCategory,                     
                        timestamp: Date.now(),        
                        amount                        
                    }
                }));
                
                createFlowerAnimation(map, store, saleSizeCategory);
                
                setTimeout(() => {
                    setActiveEvents(prev => {
                        const newEvents = {...prev};     
                        delete newEvents[storeNo];       
                        return newEvents;               
                    });
                }, 5000);
                
            } catch (error) {
                console.error('Feil ved håndtering av event:', error);
            }
        };

        const subscription = stompClient.subscribe('/topic/receipts', handleEvent);

        return () => subscription?.unsubscribe();
        
    }, [map, stores, setActiveEvents]);

    return null;
} 