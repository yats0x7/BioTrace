import React from 'react';
import { Search, Map as MapIcon, SlidersHorizontal } from 'lucide-react';

interface MapFiltersProps {
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  projectFilter: string;
  setProjectFilter: (val: string) => void;
  confidenceFilter: string;
  setConfidenceFilter: (val: string) => void;
  timelineFilter: string;
  setTimelineFilter: (val: string) => void;
  showHeatmap: boolean;
  setShowHeatmap: (val: boolean) => void;
}

export function MapFilters({
  searchQuery, setSearchQuery,
  projectFilter, setProjectFilter,
  confidenceFilter, setConfidenceFilter,
  timelineFilter, setTimelineFilter,
  showHeatmap, setShowHeatmap
}: MapFiltersProps) {
  return (
    <div className="bg-card border rounded-lg p-3 shadow-sm flex flex-col md:flex-row gap-3 items-center w-full z-10 relative">
      <div className="relative w-full md:w-64 shrink-0">
        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input 
          placeholder="Search species or locations..." 
          className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 pl-8 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="flex-1 flex flex-wrap md:flex-nowrap gap-3 w-full">
        <select 
          value={projectFilter}
          onChange={(e) => setProjectFilter(e.target.value)}
          className="flex h-9 w-full md:w-auto rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        >
          <option value="all">All Projects</option>
          <option value="11111111-1111-1111-1111-111111111111">Global eDNA River Survey</option>
          <option value="22222222-2222-2222-2222-222222222222">Urban Canopy Assessment</option>
        </select>

        <select 
          value={confidenceFilter}
          onChange={(e) => setConfidenceFilter(e.target.value)}
          className="flex h-9 w-full md:w-auto rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        >
          <option value="all">All Confidence Levels</option>
          <option value="high">High (&ge; 90%)</option>
          <option value="medium">Medium (70-89%)</option>
          <option value="low">Low (&lt; 70%)</option>
        </select>

        <select 
          value={timelineFilter}
          onChange={(e) => setTimelineFilter(e.target.value)}
          className="flex h-9 w-full md:w-auto rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        >
          <option value="all">All Time</option>
          <option value="week">Last Week</option>
          <option value="month">Last Month</option>
          <option value="year">Last Year</option>
        </select>
      </div>

      <div className="flex items-center gap-2 shrink-0 border-l pl-3">
        <label className="text-sm font-medium cursor-pointer flex items-center gap-2 select-none">
          <MapIcon className="h-4 w-4" />
          <span className="hidden sm:inline">Heatmap</span>
          <input 
            type="checkbox" 
            checked={showHeatmap} 
            onChange={(e) => setShowHeatmap(e.target.checked)}
            className="w-4 h-4 rounded text-primary focus:ring-primary border-input bg-background"
          />
        </label>
      </div>
    </div>
  );
}
