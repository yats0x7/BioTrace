import React from 'react';
import { MAP_STATISTICS, MapSample } from '@/lib/mock-data/map-data';
import { DashboardCard } from '@/components/shared/wrappers';
import { Fingerprint, Globe, MapPin, Target, Users } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface MapSidebarProps {
  samples: MapSample[];
}

export function MapSidebar({ samples }: MapSidebarProps) {
  // Compute top species from currently filtered samples
  const speciesCounts = samples.reduce((acc, sample) => {
    acc[sample.species] = (acc[sample.species] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const topSpecies = Object.entries(speciesCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  const recentSamples = [...samples]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  return (
    <div className="w-full lg:w-80 shrink-0 flex flex-col gap-6 overflow-y-auto max-h-[calc(100vh-10rem)] pr-2 custom-scrollbar">
      {/* Global Statistics */}
      <DashboardCard className="p-5">
        <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
          <Globe className="h-5 w-5 text-primary" /> Map Statistics
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-muted/30 p-3 rounded-lg border">
            <span className="text-2xl font-bold block">{MAP_STATISTICS.totalSamples}</span>
            <span className="text-xs text-muted-foreground uppercase flex items-center gap-1"><Target className="h-3 w-3"/> Samples</span>
          </div>
          <div className="bg-muted/30 p-3 rounded-lg border">
            <span className="text-2xl font-bold block">{MAP_STATISTICS.totalProjects}</span>
            <span className="text-xs text-muted-foreground uppercase flex items-center gap-1"><MapPin className="h-3 w-3"/> Projects</span>
          </div>
          <div className="bg-muted/30 p-3 rounded-lg border">
            <span className="text-2xl font-bold block">{MAP_STATISTICS.totalSpecies}</span>
            <span className="text-xs text-muted-foreground uppercase flex items-center gap-1"><Fingerprint className="h-3 w-3"/> Species</span>
          </div>
          <div className="bg-muted/30 p-3 rounded-lg border">
            <span className="text-2xl font-bold block">{MAP_STATISTICS.totalMembers}</span>
            <span className="text-xs text-muted-foreground uppercase flex items-center gap-1"><Users className="h-3 w-3"/> Members</span>
          </div>
        </div>
      </DashboardCard>

      {/* Top Species */}
      <DashboardCard className="p-5">
        <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
          <Fingerprint className="h-5 w-5 text-primary" /> Top Species Found
        </h3>
        <div className="space-y-3">
          {topSpecies.length > 0 ? topSpecies.map(([species, count]) => (
            <div key={species} className="flex justify-between items-center text-sm border-b pb-2 last:border-0 last:pb-0">
              <span className="font-medium truncate pr-2">{species}</span>
              <span className="bg-primary/10 text-primary px-2 py-0.5 rounded-full text-xs font-semibold shrink-0">
                {count}
              </span>
            </div>
          )) : (
            <p className="text-sm text-muted-foreground text-center py-2">No species in current view.</p>
          )}
        </div>
      </DashboardCard>

      {/* Recent Samples */}
      <DashboardCard className="p-5">
        <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
          <Target className="h-5 w-5 text-primary" /> Recent Samples
        </h3>
        <div className="space-y-4">
          {recentSamples.length > 0 ? recentSamples.map(sample => (
            <div key={sample.id} className="text-sm border-b pb-3 last:border-0 last:pb-0">
              <div className="font-semibold truncate mb-1">{sample.name}</div>
              <div className="text-xs text-muted-foreground mb-1 truncate">{sample.projectName}</div>
              <div className="flex justify-between items-center mt-2 text-xs">
                <span className={`${sample.confidence >= 90 ? 'text-emerald-500' : sample.confidence >= 70 ? 'text-yellow-500' : 'text-red-500'} font-medium`}>
                  {sample.confidence}% Match
                </span>
                <span className="text-muted-foreground">
                  {formatDistanceToNow(new Date(sample.date), { addSuffix: true })}
                </span>
              </div>
            </div>
          )) : (
            <p className="text-sm text-muted-foreground text-center py-2">No samples in current view.</p>
          )}
        </div>
      </DashboardCard>
    </div>
  );
}
