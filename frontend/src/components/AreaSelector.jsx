'use client'
import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import fylkerGeoJSON from '../geoJSON/Fylker-S.geojson';
import swedenGeoJSON from '../geoJSON/sweden.geojson';
import storeData from '../data/storeData.json';

// Hjelpefunksjon for å finne senterpunktet til et polygon eller multipolygon
function getCenterOfAnyGeometry(geometry) {
    let coordinates = geometry.coordinates;
    if (geometry.type === 'MultiPolygon') {
        coordinates = coordinates.flat(2);
    } else if (geometry.type === 'Polygon') {
        coordinates = coordinates.flat(1);
    }
    if (!coordinates.length) return [0, 0];
    const lats = coordinates.map(coord => coord[1]);
    const lngs = coordinates.map(coord => coord[0]);
    const avgLat = lats.reduce((a, b) => a + b, 0) / lats.length;
    const avgLng = lngs.reduce((a, b) => a + b, 0) / lngs.length;
    return [avgLat, avgLng];
}

const fylkeAreas = {};
fylkerGeoJSON.features.forEach(feature => {
    const fylkesnavn = feature.properties.fylkesnavn;
    const key = fylkesnavn
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/ø/g, 'o')
        .replace(/å/g, 'a')
        .replace(/æ/g, 'e')
        .replace(/[^a-z0-9\-]/g, '');
    const center = getCenterOfAnyGeometry(feature.geometry);
    let zoom = 9;
    // Fylker
    if (key === 'oslo') zoom = 11;
    if (key === 'innlandet') zoom = 8;
    if (key === 'more-og-romsdal') zoom = 8;
    if (key === 'nordland') zoom = 7;
    if (key === 'troms') zoom = 7;
    if (key === 'trondelag') zoom = 7;
    if (key === 'vestfold') zoom = 10;
    if (key === 'vestland') zoom = 8;
    if (key === 'finnmark') zoom = 7;
    fylkeAreas[key] = {
        center,
        zoom,
        name: fylkesnavn
    };
});

const lanAreas = {};
swedenGeoJSON.features.forEach(feature => {
    const lanNavn = feature.properties.name;
    const key = lanNavn
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/å/g, 'a')
        .replace(/ä/g, 'a')
        .replace(/ö/g, 'o')
        .replace(/[^a-z0-9\-]/g, '');
    const center = getCenterOfAnyGeometry(feature.geometry);
    let zoom = 9;
    // Län
    if (key === 'blekinge') zoom = 10;
    if (key === 'dalarna') zoom = 8;
    if (key === 'gavleborg') zoom = 8;
    if (key === 'jamtland') zoom = 8;
    if (key === 'kalmar') zoom = 8;
    if (key === 'norrbotten') zoom = 7;
    if (key === 'varmland') zoom = 8;
    if (key === 'vasternorrland') zoom = 8;
    if (key === 'vasterbotten') zoom = 8;
    if (key === 'vastra-gotaland') zoom = 8;
    lanAreas[key] = {
        center,
        zoom,
        name: lanNavn
    };
});

//Butikker
const storeAreas = {};
if (Array.isArray(storeData)) {
    storeData.forEach(store => {
        if (store.latitude && store.longitude && store.name) {
            const key = store.name
                .toLowerCase()
                .replace(/\s+/g, '-')
                .replace(/ø/g, 'o')
                .replace(/å/g, 'a')
                .replace(/æ/g, 'e')
                .replace(/ä/g, 'a')
                .replace(/ö/g, 'o')
                .replace(/[^a-z0-9\-]/g, '');
            storeAreas[key] = {
                center: [parseFloat(store.latitude), parseFloat(store.longitude)],
                zoom: 13,
                name: store.name
            };
        }
    });
}

const allAreaAreas = { ...fylkeAreas, ...lanAreas };

export default function AreaSelector({ onAreaChange }) {
    const searchParams = useSearchParams();

    useEffect(() => {
        const store = searchParams.get('store');
        const area = searchParams.get('area');
        if (store && storeAreas[store]) {
            const newCenter = storeAreas[store].center;
            const newZoom = storeAreas[store].zoom;
            onAreaChange(newCenter, newZoom, store);
        } else if (area && allAreaAreas[area]) {
            const newCenter = allAreaAreas[area].center;
            const newZoom = allAreaAreas[area].zoom;
            onAreaChange(newCenter, newZoom, area);
        }
    }, [searchParams, onAreaChange]);

    return null;
} 