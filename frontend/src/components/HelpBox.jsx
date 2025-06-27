import '../style/HelpBox.css';

// HelpBox - Viser hjelpeinformasjon på kartet

export default function HelpBox() {

    return (
        <div className="helpBox">
            <ul className="list">
                <li className="list-item">
                    <h2>Forklaring av markører</h2>
                </li>
                <li className="list-item">
                    <img src="smallSale.svg" alt="Blomst" className="list-img"/>
                    <p>Lite salg: 0kr - 299kr</p>
                </li>
                <li className="list-item">
                    <img src="mediumSale.svg" alt="Blomst" className="list-img"/>
                    <p>Medium salg: 300kr - 999kr</p>
                </li>
                <li className="list-item">
                    <img src="largeSale.svg" alt="Blomst" className="list-img"/>
                    <p>Stort salg: 1000kr eller mer</p>
                </li>
                <li className="list-item">
                    <h3>Klikk eller zoom inn på en gruppe for å finne ditt:</h3>
                </li>
                <li className="list-item">
                    <img src="warehouse.svg" alt="Europris varehus" className="list-img"/>
                    <p>Europris varehus</p>
                </li>
            </ul>
        </div>
    )
}