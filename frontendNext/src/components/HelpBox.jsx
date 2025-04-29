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
                    <p>Viser salgsstørrelse</p>
                </li>
                <li className="list-item">
                    <p><strong>Liten blomst (30px):</strong> Lite salg: 0kr - 300kr</p>
                </li>
                <li className="list-item">
                    <p><strong>Medium blomst (60px):</strong> Medium salg: 300kr - 1000kr</p>
                </li>
                <li className="list-item">
                    <p><strong>Stor blomst (120px):</strong> Stort salg: over 1000kr</p>
                </li>
                <li className="list-item">
                    <img src="warehouseRedDot.png" alt="Europris varehus" className="list-img"/>
                    <p>Europris varehus</p>
                </li>
            </ul>
        </div>
    )
}