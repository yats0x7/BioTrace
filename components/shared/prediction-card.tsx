import React from 'react';
import { ConfidenceBadge } from './confidence-badge';
import { Fingerprint, Cpu, Clock, ChevronRight } from 'lucide-react';
import { DashboardCard } from './wrappers';
import type { Identification } from '@/lib/types';
import { formatDistanceToNow } from 'date-fns';

interface PredictionCardProps {
  identification: Identification;
  sampleName: string;
  onClick?: () => void;
}

export function PredictionCard({ identification, sampleName, onClick }: PredictionCardProps) {
  return (
    <DashboardCard 
      className={`p-5 transition-all hover:shadow-md ${onClick ? 'cursor-pointer hover:border-primary/50' : ''}`}
      onClick={onClick}
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Fingerprint className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-lg leading-tight">{identification.scientific_name}</h3>
            <p className="text-sm text-muted-foreground line-clamp-1">Sample: {sampleName}</p>
          </div>
        </div>
        {onClick && <ChevronRight className="h-5 w-5 text-muted-foreground" />}
      </div>

      <div className="flex flex-wrap items-center gap-4 mt-6 pt-4 border-t border-border/50">
        <ConfidenceBadge confidence={identification.confidence || 0} />
        
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Cpu className="h-3.5 w-3.5" />
          <span>Render ML</span>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-muted-foreground ml-auto">
          <Clock className="h-3.5 w-3.5" />
          <span>{formatDistanceToNow(new Date(identification.identified_at), { addSuffix: true })}</span>
        </div>
      </div>
    </DashboardCard>
  );
}
