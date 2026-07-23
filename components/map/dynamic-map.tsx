'use client';

import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, CircleMarker, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapSample } from '@/lib/mock-data/map-data';
import Link from 'next/link';

// Fix Leaflet default icon issues in Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface DynamicMapProps {
  samples: MapSample[];
  showHeatmap: boolean;
}

// Custom DivIcon for Confidence Colors
const createConfidenceIcon = (confidence: number) => {
  let colorClass = 'bg-red-500';
  if (confidence >= 90) colorClass = 'bg-emerald-500';
  else if (confidence >= 70) colorClass = 'bg-yellow-500';

  const html = `
    <div class="relative flex items-center justify-center w-6 h-6">
      <div class="absolute inset-0 ${colorClass} rounded-full opacity-40 animate-ping"></div>
      <div class="relative w-4 h-4 ${colorClass} rounded-full border-2 border-white shadow-sm"></div>
    </div>
  `;

  return L.divIcon({
    html,
    className: 'bg-transparent border-0',
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [0, -12],
  });
};

// Component to dynamically fit map bounds to markers if needed (optional)
function MapEffect({ samples }: { samples: MapSample[] }) {
  const map = useMap();
  useEffect(() => {
    if (samples.length > 0) {
      // For global map, we might just want to stay at a zoomed out view instead of fitting bounds perfectly every time.
      // map.fitBounds(L.latLngBounds(samples.map(s => [s.lat, s.lng])));
    }
  }, [samples, map]);
  return null;
}

export default function DynamicMap({ samples, showHeatmap }: DynamicMapProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // Prevent SSR issues

  return (
    <MapContainer 
      center={[20, 0]} 
      zoom={2} 
      className="w-full h-full min-h-[500px] z-0"
      zoomControl={false}
    >
      {/* Dark Theme CartoDB Tiles */}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
      />

      {/* Heatmap Simulation via glowing translucent circles */}
      {showHeatmap && samples.map((sample) => (
        <CircleMarker
          key={`heat-${sample.id}`}
          center={[sample.lat, sample.lng]}
          radius={20}
          pathOptions={{ 
            color: 'transparent',
            fillColor: sample.confidence >= 90 ? '#10b981' : sample.confidence >= 70 ? '#eab308' : '#ef4444', 
            fillOpacity: 0.15 
          }}
        />
      ))}

      {/* Individual Markers */}
      {samples.map((sample) => (
        <Marker
          key={`marker-${sample.id}`}
          position={[sample.lat, sample.lng]}
          icon={createConfidenceIcon(sample.confidence)}
        >
          <Popup className="custom-popup">
            <div className="p-1 min-w-[200px]">
              <h4 className="font-bold text-sm mb-1">{sample.name}</h4>
              <p className="text-xs text-muted-foreground mb-3">{sample.projectName}</p>
              
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between border-b pb-1">
                  <span className="text-muted-foreground">Species</span>
                  <span className="font-medium">{sample.species}</span>
                </div>
                <div className="flex justify-between border-b pb-1">
                  <span className="text-muted-foreground">Confidence</span>
                  <span className={`font-semibold ${sample.confidence >= 90 ? 'text-emerald-500' : sample.confidence >= 70 ? 'text-yellow-500' : 'text-red-500'}`}>
                    {sample.confidence}%
                  </span>
                </div>
                <div className="flex justify-between border-b pb-1">
                  <span className="text-muted-foreground">Date</span>
                  <span className="font-medium">{new Date(sample.date).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between pb-2">
                  <span className="text-muted-foreground">Uploaded By</span>
                  <span className="font-medium">{sample.uploadedBy}</span>
                </div>
              </div>
              
              <Link 
                href={`/dashboard/projects/${sample.projectId}`}
                className="mt-2 block w-full text-center bg-primary text-primary-foreground py-1.5 rounded-md text-xs font-semibold hover:bg-primary/90 transition-colors"
              >
                View Project Results
              </Link>
            </div>
          </Popup>
        </Marker>
      ))}
      <MapEffect samples={samples} />
    </MapContainer>
  );
}
