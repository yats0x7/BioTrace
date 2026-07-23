import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { useUploadWizard } from '@/hooks/use-upload';
import { MapPin, Navigation } from 'lucide-react';

const MapPicker = dynamic(() => import('./map-picker'), { 
  ssr: false,
  loading: () => (
    <div className="w-full h-[400px] bg-muted/50 animate-pulse rounded-md flex items-center justify-center">
      <MapPin className="h-8 w-8 text-muted-foreground opacity-50" />
    </div>
  )
});

export function Step2Location() {
  const { metadata, updateMetadata, prevStep, nextStep } = useUploadWizard();
  const [position, setPosition] = useState<{lat: number, lng: number} | null>(metadata.coordinates);
  
  const handleGetCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setPosition({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        },
        (err) => {
          console.error(err);
          alert("Unable to retrieve your location");
        }
      );
    }
  };

  const handleNext = () => {
    updateMetadata({ coordinates: position });
    nextStep();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h3 className="text-lg font-medium">Sample Collection Location</h3>
        <p className="text-sm text-muted-foreground">
          Click on the map to drop a pin where the eDNA sample was collected, or use your current device location.
        </p>
      </div>
      
      <div className="flex items-center gap-2 mb-2">
        <button 
          type="button" 
          onClick={handleGetCurrentLocation}
          className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3 py-2"
        >
          <Navigation className="h-4 w-4 mr-2" />
          Use Current Location
        </button>
        {position && (
          <span className="text-xs text-muted-foreground">
            Selected: {position.lat.toFixed(5)}, {position.lng.toFixed(5)}
          </span>
        )}
      </div>

      <div className="border rounded-md p-1 bg-muted/20 relative z-0">
        <MapPicker position={position} onPositionChange={setPosition} />
      </div>

      <div className="flex justify-between pt-4 border-t">
        <button 
          type="button"
          onClick={prevStep}
          className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
        >
          Back
        </button>
        
        <button 
          type="button"
          onClick={handleNext}
          className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
        >
          {position ? 'Continue to File Upload' : 'Skip & Continue'}
        </button>
      </div>
    </div>
  );
}
