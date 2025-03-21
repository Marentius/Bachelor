import L from 'leaflet';

const defaultIcon = L.icon({
    iconUrl: '/warehouse.png',
    iconSize: [20, 20]
});

// Funksjon for å lage blomsterikon basert på kategori
const createFlowerIcon = (category) => {
    // Bestem størrelsen basert på kategori
    // Kategori 1 = liten, 2 = medium, 3 = stor
    let size;
    switch (category) {
        case 1:
            size = 30; // Liten blomst
            break;
        case 2:
            size = 60; // Medium blomst
            break;
        case 3:
            size = 90; // Stor blomst
            break;
        default:
            size = 30; // Standard størrelse hvis kategori er ukjent
    }
    
    return L.divIcon({
        html: `<img src="/1.svg" class="animated-flower" alt="Blomst" style="width:${size}px; height:${size}px;" />`,
        className: 'flower-icon-container',
        iconSize: [size, size],
        iconAnchor: [size/2, size] // Sentrer ankerpunktet
    });
};

export { defaultIcon, createFlowerIcon };

// https://leafletjs.com/examples/custom-icons/