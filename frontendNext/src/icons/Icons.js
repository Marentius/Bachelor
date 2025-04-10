
import L from 'leaflet';

const defaultIcon = L.icon({
    iconUrl: '/warehouse.png',
    iconSize: [20, 20]
});

// Funksjon for å lage blomsterikon basert på kategori
const createFlowerIcon = (saleSizeCategory) => {
    // Bestem størrelsen basert på kategori
    // Kategori 1 = liten, 2 = medium, 3 = stor
    let size;
    let flower;
    if (saleSizeCategory === 1) {
        size = 30; // Liten blomst
        flower = 'standardFlower.svg'
    } else if (saleSizeCategory === 2) {
        size = 60; // Medium blomst
        flower = 'mediumSustainable.svg'
    } else if (saleSizeCategory === 3) {
        size = 120; // Stor blomst
        flower = 'sustainableFlower.svg'
    } else {
        size = 30; // Standard størrelse hvis kategori er ukjent
    }
    
    return L.divIcon({
        html: `<img src="/${flower}" class="animated-flower" alt="Blomst" style="width:${size}px; height:${size}px;" />`,
        className: 'transparent-flower',
        iconSize: [size, size],
        iconAnchor: [size/2, size] // Sentrer ankerpunktet
    });
};

export { defaultIcon, createFlowerIcon };

// https://leafletjs.com/examples/custom-icons/