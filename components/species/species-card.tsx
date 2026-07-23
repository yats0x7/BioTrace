import React from 'react';
import { DashboardCard } from '@/components/shared/wrappers';
import { SpeciesDetail } from '@/lib/mock-data/species-data';
import { Fingerprint, Activity, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { formatDistanceToNow } from 'date-fns';

export function SpeciesCard({ species }: { species: SpeciesDetail }) {
  const router = useRouter();
  
  return (
    <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
      <DashboardCard 
        className="flex flex-col h-full cursor-pointer hover:border-primary/50 transition-colors"
        onClick={() => router.push(`/dashboard/species/${species.id}`)}
      >
        <div className="h-40 bg-muted/30 rounded-t-lg -mx-6 -mt-6 mb-4 relative overflow-hidden border-b flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent" />
          <Fingerprint className="h-16 w-16 text-primary/20 absolute" />
          <div className="absolute bottom-3 left-4 flex gap-2">
            <span className={`px-2.5 py-1 rounded-full text-xs font-semibold backdrop-blur-sm shadow-sm border ${
              species.conservationStatus === 'Endangered' || species.conservationStatus === 'Critically Endangered' ? 'bg-red-500/10 text-red-500 border-red-500/20' :
              species.conservationStatus === 'Vulnerable' || species.conservationStatus === 'Near Threatened' ? 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20' :
              'bg-emerald-500/10 text-emerald-600 border-emerald-500/20'
            }`}>
              {species.conservationStatus}
            </span>
          </div>
        </div>

        <div className="flex-1 flex flex-col">
          <h3 className="font-bold text-lg leading-tight mb-1">{species.commonName}</h3>
          <p className="text-sm text-muted-foreground italic mb-4">{species.scientificName}</p>

          <div className="space-y-4 flex-1">
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-muted-foreground block mb-1">Family</span>
                <span className="font-medium">{species.family}</span>
              </div>
              <div>
                <span className="text-muted-foreground block mb-1">Order</span>
                <span className="font-medium">{species.order}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs">
              <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="text-muted-foreground line-clamp-1">{species.geographicRange}</span>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-4 border-t">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-md bg-muted/50">
                  <Activity className="h-4 w-4 text-emerald-500" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-emerald-500">{species.averageConfidence}%</span>
                  <span className="text-[10px] text-muted-foreground uppercase">Confidence</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-md bg-muted/50">
                  <Fingerprint className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-semibold">{species.detectedSamples}</span>
                  <span className="text-[10px] text-muted-foreground uppercase">Samples</span>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <span className="text-xs text-muted-foreground block mb-1">Found in:</span>
              <div className="flex flex-wrap gap-1">
                {species.projectNames.map((name, i) => (
                  <span key={i} className="text-[10px] bg-muted px-2 py-0.5 rounded-full whitespace-nowrap">
                    {name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </DashboardCard>
    </motion.div>
  );
}
