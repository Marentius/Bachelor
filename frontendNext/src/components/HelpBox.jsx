import '../style/HelpBox.css';

export default function HelpBox() {

    return (
        <div className="helpBox">
            <ul className="list">
                <li className="list-item">
                    <h2>Forklaring av markører</h2>
                </li>
                <li className="list-item">
                    <img src="standardFlower.svg" alt="Blomst" className="list-img"/>
                    <p>Lite salg: 0kr - 300kr</p>
                </li>
                <li className="list-item">
                    <img src="mediumSustainable.svg" alt="Blomst" className="list-img"/>
                    <p>Medium salg: 300kr - 1000kr</p>
                </li>
                <li className="list-item">
                    <img src="sustainableFlower.svg" alt="Blomst" className="list-img"/>
                    <p>Stort salg: over 1000kr</p>
                </li>
                <li className="list-item">
                    <img src="warehouseRedDot.png" alt="Blomst" className="list-img"/>
                    <p>Europris varehus</p>
                </li>
            </ul>
        </div>
    )
}