'use client';

import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { PROFILE_MAP_COORDS } from '@/lib/mock-data/profile-data';

function MapBounds() {
  const map = useMap();
  useEffect(() => {
    if (PROFILE_MAP_COORDS.length > 0) {
      // Just a static fit for the mock data spread globally
      map.setView([20, 0], 1);
    }
  }, [map]);
  return null;
}

export default function ProfileMap() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="w-full h-full min-h-[300px] z-0 rounded-lg overflow-hidden relative">
      <MapContainer 
        center={[20, 0]} 
        zoom={1} 
        className="w-full h-full absolute inset-0 z-0"
        zoomControl={false}
        scrollWheelZoom={false}
        dragging={false}
        doubleClickZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        
        {PROFILE_MAP_COORDS.map((coord, i) => (
          <CircleMarker
            key={i}
            center={[coord.lat, coord.lng]}
            radius={6}
            pathOptions={{ 
              color: 'hsl(var(--primary))', 
              fillColor: 'hsl(var(--primary))', 
              fillOpacity: 0.8,
              weight: 2
            }}
          >
            <Popup className="custom-popup">
              <span className="font-semibold text-xs">{coord.name}</span>
            </Popup>
          </CircleMarker>
        ))}
        <MapBounds />
      </MapContainer>
    </div>
  );
}
