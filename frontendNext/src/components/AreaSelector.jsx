'use client'
import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

export const predefinedAreas = {
    'ost-norge': {
        center: [60.5, 11.5],
        zoom: 8,
        name: 'Øst-Norge'
    },
    'sor-norge': {
        center: [59.0, 10.0],
        zoom: 8,
        name: 'Sør-Norge'
    },
    'sor-sverige': {
        center: [58.0, 14.0],
        zoom: 8,
        name: 'Sør-Sverige'
    },
    'nord-norge': {
        center: [69.0, 18.0],
        zoom: 7,
        name: 'Nord-Norge'
    },
    'vest-norge': {
        center: [61.0, 5.0],
        zoom: 8,
        name: 'Vest-Norge'
    }
};


export default function AreaSelector({ onAreaChange }) {
    const searchParams = useSearchParams();

    useEffect(() => {
        const area = searchParams.get('area');
        if (area && predefinedAreas[area]) {
            const newCenter = predefinedAreas[area].center;
            const newZoom = predefinedAreas[area].zoom;
            onAreaChange(newCenter, newZoom);
        }
    }, [searchParams, onAreaChange]);

    return null;
} 