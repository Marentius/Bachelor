'use client'
import { useEffect } from 'react';
import { useMap } from 'react-leaflet';


export default function MapController({ center, zoom }) {
    const map = useMap();
    
    useEffect(() => {
        map.setView(center, zoom);
    }, [center, zoom, map]);

    return null;
} 