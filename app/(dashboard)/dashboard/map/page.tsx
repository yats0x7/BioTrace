'use client';

import React, { useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { PageContainer, PageHeader } from '@/components/shared/wrappers';
import { MOCK_MAP_SAMPLES, MAP_STATISTICS } from '@/lib/mock-data/map-data';
import { MapFilters } from '@/components/map/map-filters';
import { MapSidebar } from '@/components/map/map-sidebar';
import { Loader2 } from 'lucide-react';

// Dynamically import the map component with SSR disabled
const DynamicMap = dynamic(() => import('@/components/map/dynamic-map'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[500px] flex items-center justify-center bg-muted/20 border rounded-lg">
      <div className="flex flex-col items-center gap-4 text-muted-foreground">
        <Loader2 className="h-8 w-8 animate-spin" />
        <p>Loading interactive map...</p>
      </div>
    </div>
  ),
});

export default function MapPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [projectFilter, setProjectFilter] = useState('all');
  const [confidenceFilter, setConfidenceFilter] = useState('all');
  const [timelineFilter, setTimelineFilter] = useState('all');
  const [showHeatmap, setShowHeatmap] = useState(false);

  // Filter the mock samples based on active filters
  const filteredSamples = useMemo(() => {
    return MOCK_MAP_SAMPLES.filter(sample => {
      // Search
      const searchLower = searchQuery.toLowerCase();
      if (searchQuery && 
          !sample.name.toLowerCase().includes(searchLower) && 
          !sample.species.toLowerCase().includes(searchLower)) {
        return false;
      }

      // Project
      if (projectFilter !== 'all' && sample.projectId !== projectFilter) {
        return false;
      }

      // Confidence
      if (confidenceFilter !== 'all') {
        if (confidenceFilter === 'high' && sample.confidence < 90) return false;
        if (confidenceFilter === 'medium' && (sample.confidence < 70 || sample.confidence >= 90)) return false;
        if (confidenceFilter === 'low' && sample.confidence >= 70) return false;
      }

      // Timeline
      if (timelineFilter !== 'all') {
        const sampleDate = new Date(sample.date);
        const now = new Date();
        const diffTime = Math.abs(now.getTime() - sampleDate.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        if (timelineFilter === 'week' && diffDays > 7) return false;
        if (timelineFilter === 'month' && diffDays > 30) return false;
        if (timelineFilter === 'year' && diffDays > 365) return false;
      }

      return true;
    });
  }, [searchQuery, projectFilter, confidenceFilter, timelineFilter]);

  return (
    <PageContainer className="max-w-7xl flex flex-col h-[calc(100vh-8rem)]">
      <PageHeader 
        title="Biodiversity Map" 
        description="Interactive visualization of global eDNA samples and biodiversity hotspots."
      />
      
      <div className="mb-4">
        <MapFilters 
          searchQuery={searchQuery} setSearchQuery={setSearchQuery}
          projectFilter={projectFilter} setProjectFilter={setProjectFilter}
          confidenceFilter={confidenceFilter} setConfidenceFilter={setConfidenceFilter}
          timelineFilter={timelineFilter} setTimelineFilter={setTimelineFilter}
          showHeatmap={showHeatmap} setShowHeatmap={setShowHeatmap}
        />
      </div>

      <div className="flex flex-col lg:flex-row gap-6 flex-1 min-h-0">
        <MapSidebar samples={filteredSamples} />
        
        <div className="flex-1 rounded-xl overflow-hidden border shadow-sm relative bg-card h-[500px] lg:h-full z-0">
          <DynamicMap samples={filteredSamples} showHeatmap={showHeatmap} />
        </div>
      </div>
    </PageContainer>
  );
}
