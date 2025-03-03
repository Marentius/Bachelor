'use client'
import Link from 'next/link'
import '../style/index.css'
import { useEffect, useState } from 'react'

export default function Home() {
  const [backgroundImage, setBackgroundImage] = useState('');

  function randomImage(){
    const images = [
     '/background1.jpg',
     '/background2.jpg',
     '/background3.jpg',
     '/background4.avif',
     '/background5.jpg',
     '/background6.jpg'];
    const size = images.length;
    const x = Math.floor(size * Math.random());
    return "url(" + images[x] + ")";
  }
  
  useEffect(() => {
    // Sett bakgrunnsbilde direkte når komponenten monteres
    setBackgroundImage(randomImage());
  }, []);

  return (
    <div className="home-intro" style={{ backgroundImage: backgroundImage }}>
      <div className="menu-container">
        <div className="menu-box">
          <h1 className="menu-title">Welcome to Europris' vizualization app</h1>
          <Link href="/map" className="menu-item">
          Go to map!
          </Link>
        </div>
      </div>
    </div>
  );
}
