import L from 'leaflet';

const warehouseIcon = L.icon({
    iconUrl: '/warehouse.svg',
    iconSize: [25, 25]
});

/**
 * Lager et blomsterikon basert på salgsstørrelse
 * 
 * Kategorier:
 * - Kategori 1: Lite salg (0-299kr) -> Liten blomst (30px)
 * - Kategori 2: Medium salg (300-999kr) -> Medium blomst (60px)
 * - Kategori 3: Stort salg (>1000kr) -> Stor blomst (120px)
 */
const createFlowerIcon = (saleSizeCategory) => {
    let size;
    let flower;
    
    // Velger blomsttype og størrelse basert på salgskategori
    if (saleSizeCategory === 1) {
        size = 30; // Liten blomst
        flower = 'smallSale.svg'
    } else if (saleSizeCategory === 2) {
        size = 60; // Medium blomst
        flower = 'mediumSale.svg'
    } else if (saleSizeCategory === 3) {
        size = 120; // Stor blomst
        flower = 'largeSale.svg'
    } else {
        size = 30; // Standard størrelse hvis kategori er ukjent
        flower = 'smallSale.svg'
    }
    
    // Oppretter et div-ikon med den valgte blomsten
    return L.divIcon({
        html: `<img src="/${flower}" class="animated-flower" alt="Blomst" style="width:${size}px; height:${size}px;" />`,
        className: 'transparent-flower',
        iconSize: [size, size],
        iconAnchor: [size/2, size + 10]  // size/2 sentrerer blomsten horisontalt over butikkmarkøren(x-akse), size + 10 plasserer blomsten 10px over butikkmarkøren
    });
};

export { warehouseIcon, createFlowerIcon };
