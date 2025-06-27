'use client'
import { useMemo } from "react";
import dynamic from "next/dynamic";
import '../service/WebSocket'

/**
 * Hovedkomponent for applikasjonen som viser kartet.
 * 
 * Funksjonalitet:
 * - Laster Map-komponenten dynamisk
 * - Håndterer WebSocket-tilkobling for sanntids data
 * - Viser lasteindikator mens kartet initialiseres
 */
export default function Home() {

  const Map = useMemo(() => dynamic(
    () => import('@/components/Map'),
    { 
      loading: () => <p>Laster kart..</p>,
      ssr: false // Deaktiverer server-side rendering for Map-komponenten
    }
  ), [])

  return (
    <div>
      <Map />
    </div>
  );
}