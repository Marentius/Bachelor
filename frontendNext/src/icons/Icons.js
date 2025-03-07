import L from 'leaflet';

const defaultIcon = L.icon({
    iconUrl: '/flower.png',

    iconSize: [25, 25],
    popupAnchor: [0, -15]
});

export { defaultIcon };

// https://leafletjs.com/examples/custom-icons/