import L from 'leaflet';

const defaultIcon = L.icon({
    iconUrl: '/warehouse.png',
    iconSize: [15, 15]
});

// Funksjon for å lage blomsterikon basert på kategori
const createFlowerIcon = (saleSizeCategory) => {
    // Bestem størrelsen basert på kategori
    // Kategori 1 = liten, 2 = medium, 3 = stor
    let size;
    if (saleSizeCategory === 1) {
        size = 30; // Liten blomst
    } else if (saleSizeCategory === 2) {
        size = 60; // Medium blomst
    } else if (saleSizeCategory === 3) {
        size = 120; // Stor blomst
    } else {
        size = 30; // Standard størrelse hvis kategori er ukjent
    }
    
    return L.divIcon({
        html: `<img src="/standardFlower.svg" class="animated-flower" alt="Blomst" style="width:${size}px; height:${size}px;" />`,
        className: 'transparent-flower',
        iconSize: [size, size],
        iconAnchor: [size/2, size]
    });
};

export { defaultIcon, createFlowerIcon };

// https://leafletjs.com/examples/custom-icons/