'use client'
import { useMemo } from "react";
import dynamic from "next/dynamic";
import '../../service/WebSocket'

export default function Home() {

  const Map = useMemo(() => dynamic(
    () => import('@/components/Map'),
    { 
      loading: () => <p>Laster kart..</p>,
      ssr: false
    }
  ), [])

  return (
    <div>
      <Map />
    </div>
  );
}

// https://medium.com/@tomisinabiodun/displaying-a-leaflet-map-in-nextjs-85f86fccc10c