'use client';

import React from 'react';
import { PageContainer, PageHeader, EmptyState, DashboardCard } from '@/components/shared/wrappers';
import { useQuery } from '@tanstack/react-query';
import { resultsService } from '@/services/results.service';
import { BarChart2, Loader2, Fingerprint, ChevronRight, MapPin, Clock } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { formatDistanceToNow } from 'date-fns';

export default function ResultsPage() {
  const router = useRouter();

  const { data: samples, isLoading } = useQuery({
    queryKey: ['samples-list'],
    queryFn: () => resultsService.getRecentSamples(),
  });

  return (
    <PageContainer>
      <PageHeader 
        title="Analysis Results" 
        description="View ML predictions and species identifications from your eDNA samples."
      />
      
      {isLoading ? (
        <div className="flex flex-col items-center justify-center min-h-[400px] text-muted-foreground">
          <Loader2 className="h-8 w-8 animate-spin mb-4" />
          <p>Loading your analysis results...</p>
        </div>
      ) : samples && samples.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {samples.map((sample) => (
            <DashboardCard 
              key={sample.id}
              className="p-5 transition-all hover:shadow-md cursor-pointer hover:border-primary/50 flex flex-col"
              onClick={() => router.push(`/dashboard/results/${sample.id}`)}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Fingerprint className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-base leading-tight line-clamp-1">{sample.file_name}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5 capitalize">{sample.ecosystem || 'Unknown Ecosystem'}</p>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground shrink-0" />
              </div>
        
              <div className="mt-auto pt-4 border-t border-border/50 flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 text-xs font-medium">
                  <span className={`px-2 py-0.5 rounded-full ${sample.upload_status === 'completed' ? 'bg-emerald-500/10 text-emerald-600' : 'bg-yellow-500/10 text-yellow-600'}`}>
                    {sample.upload_status === 'completed' ? 'Analyzed' : 'Processing'}
                  </span>
                </div>
                
                <div className="flex flex-col gap-1 items-end text-xs text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <span>{formatDistanceToNow(new Date(sample.uploaded_at), { addSuffix: true })}</span>
                    <Clock className="h-3 w-3" />
                  </div>
                </div>
              </div>
            </DashboardCard>
          ))}
        </div>
      ) : (
        <div className="min-h-[500px] border rounded-xl flex items-center justify-center bg-card">
          <EmptyState 
            icon={BarChart2}
            title="No Results Yet" 
            description="You haven't uploaded any samples for ML analysis yet. Upload a sample to see species predictions here."
            action={
              <Link 
                href="/dashboard/upload" 
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
              >
                Upload a Sample
              </Link>
            }
          />
        </div>
      )}
    </PageContainer>
  );
}
