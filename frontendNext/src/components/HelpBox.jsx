


export default function HelpBox() {

    return (
        <div className="helpBox">
            <ul className="list">
                <li className="list-item">
                    <img src="standardFlower.svg" alt="Blomst" className="helpBoxFlower"/>
                    <p>Lite salg</p>
                </li>
                <li className="list-item">
                    <img src="mediumSustainable.svg" alt="Blomst" className="helpBoxFlower"/>
                    <p>Medium salg</p>
                </li>
                <li className="list-item">
                    <img src="sustainableFlower.svg" alt="Blomst" className="helpBoxFlower"/>
                    <p>Stort salg</p>
                </li>
            </ul>

        </div>
    )
}