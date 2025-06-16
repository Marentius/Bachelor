import { useState, useEffect } from 'react';
import { eventEmitter } from '../service/WebSocket';
import '../style/SalesCounter.css';


export default function SalesCounter() {
    const [dailySales, setDailySales] = useState(0);
    const [isUpdating, setIsUpdating] = useState(false);

    useEffect(() => {
        const handleDailySales = (count) => {
            setIsUpdating(true);
            setDailySales(count);
            // Fjerner oppdateringsindikasjon etter 1 sekund
            setTimeout(() => setIsUpdating(false), 1000);
        };

        // Lytter etter oppdateringer av dagens salgstall
        eventEmitter.on('dailySales', handleDailySales);

        return () => {
            eventEmitter.removeListener('dailySales', handleDailySales);
        };
    }, []);

    return (
        <div className={`sales-counter ${isUpdating ? 'updating' : ''}`}>
            <h2>Antall salg i dag</h2>
            <div className="counter-value">{dailySales}</div>
        </div>
    );
} 