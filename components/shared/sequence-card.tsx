import React, { useState } from 'react';
import { DashboardCard } from './wrappers';
import { ConfidenceBadge } from './confidence-badge';
import { ChevronDown, ChevronUp, AlertTriangle, Fingerprint, Activity } from 'lucide-react';
import type { Identification } from '@/lib/types';

export function SequenceCard({ identification }: { identification: Identification }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const {
    sequence_id,
    scientific_name,
    confidence,
    is_confused,
    top_candidates,
    species_details,
    processing_status
  } = identification;

  return (
    <DashboardCard className={`overflow-hidden transition-all duration-300 ${is_confused ? 'border-yellow-500/50' : ''}`}>
      <div 
        className="p-5 flex items-center justify-between cursor-pointer hover:bg-muted/30"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-4">
          <div className={`h-12 w-12 rounded-xl flex items-center justify-center ${is_confused ? 'bg-yellow-500/10' : 'bg-primary/10'}`}>
            <Fingerprint className={`h-6 w-6 ${is_confused ? 'text-yellow-500' : 'text-primary'}`} />
          </div>
          <div>
            <h3 className="font-semibold text-lg flex items-center gap-2">
              {scientific_name}
              {is_confused && (
                <span className="inline-flex items-center gap-1 text-xs font-medium bg-yellow-500/20 text-yellow-600 px-2 py-0.5 rounded-full">
                  <AlertTriangle className="h-3 w-3" /> Confused
                </span>
              )}
            </h3>
            <p className="text-sm text-muted-foreground flex items-center gap-2 mt-0.5">
              Sequence: {sequence_id || 'N/A'} • Status: <span className="capitalize">{processing_status}</span>
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <ConfidenceBadge confidence={confidence || 0} />
          {isExpanded ? <ChevronUp className="h-5 w-5 text-muted-foreground" /> : <ChevronDown className="h-5 w-5 text-muted-foreground" />}
        </div>
      </div>

      {isExpanded && (
        <div className="p-5 border-t bg-muted/10 space-y-6">
          {/* Top Candidates for Confused State */}
          {is_confused && top_candidates && Array.isArray(top_candidates) && (
            <div className="bg-yellow-500/5 border border-yellow-500/20 rounded-lg p-4">
              <h4 className="text-sm font-semibold text-yellow-600 mb-3 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" /> Alternative Candidates
              </h4>
              <div className="space-y-2">
                {top_candidates.map((candidate: { species: string; confidence: number }, idx: number) => (
                  <div key={idx} className="flex justify-between items-center text-sm">
                    <span className="font-medium">{candidate.species}</span>
                    <span className="text-muted-foreground">{Math.round(candidate.confidence * 100)}% Match</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Detailed Species Metadata */}
          {species_details && (
            <div>
              <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                <Activity className="h-4 w-4 text-primary" /> Species Analysis Details
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground mb-1">Common Name</p>
                  <p className="font-medium">{species_details.common_name || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">Order</p>
                  <p className="font-medium">{species_details.order || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">Family</p>
                  <p className="font-medium">{species_details.family || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">Genus</p>
                  <p className="font-medium">{species_details.genus || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">Conservation Status</p>
                  <p className="font-medium">{species_details.conservation_status || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">Database References</p>
                  <p className="font-medium">{species_details.sequence_count || 0} known sequences</p>
                </div>
                <div className="md:col-span-2 lg:col-span-3">
                  <p className="text-muted-foreground mb-1">Habitat & Range</p>
                  <p className="font-medium line-clamp-2">{species_details.habitat || 'N/A'} — {species_details.geographic_range || 'N/A'}</p>
                </div>
                <div className="md:col-span-2 lg:col-span-3">
                  <p className="text-muted-foreground mb-1">Description</p>
                  <p className="font-medium text-muted-foreground leading-relaxed">{species_details.description || 'No detailed description available.'}</p>
                </div>
              </div>
            </div>
          )}

          {!species_details && !is_confused && (
            <p className="text-sm text-muted-foreground italic">No extended species details provided by the ML model.</p>
          )}
        </div>
      )}
    </DashboardCard>
  );
}
