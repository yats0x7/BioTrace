'use client';

import React, { use } from 'react';
import { PageContainer, PageHeader, DashboardCard } from '@/components/shared/wrappers';
import { useResultDetail } from '@/hooks/use-results';
import { Loader2, ArrowLeft, Calendar, MapPin, Search } from 'lucide-react';
import Link from 'next/link';
import { format } from 'date-fns';
import { SequenceCard } from '@/components/shared/sequence-card';

export default function ResultDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { sample, identifications, isLoading } = useResultDetail(id);

  if (isLoading) {
    return (
      <PageContainer className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </PageContainer>
    );
  }

  if (!sample || !identifications || identifications.length === 0) {
    return (
      <PageContainer>
        <div className="flex flex-col items-center justify-center min-h-[400px]">
          <h2 className="text-2xl font-bold mb-2">Result Not Found</h2>
          <p className="text-muted-foreground mb-6">The analysis report you are looking for does not exist or has no identified sequences.</p>
          <Link 
            href="/dashboard/results"
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
          >
            Back to Results
          </Link>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer className="max-w-6xl">
      <div className="mb-6">
        <Link 
          href="/dashboard/results"
          className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Results
        </Link>
      </div>
      
      <PageHeader 
        title={`Analysis Report: ${sample.file_name}`} 
        description={`Overview of ${identifications.length} sequence(s) predicted by the BioTrace ML model.`}
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-6">
        {/* Sequence List */}
        <div className="lg:col-span-3 space-y-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-lg flex items-center gap-2">
              <Search className="h-5 w-5 text-primary" /> Sequences Identified
            </h3>
            <span className="text-sm font-medium bg-muted px-2.5 py-1 rounded-full">
              {identifications.length} Total
            </span>
          </div>
          
          <div className="space-y-4">
            {identifications.map((identification) => (
              <SequenceCard key={identification.id} identification={identification} />
            ))}
          </div>
        </div>

        {/* Sample Metadata Sidebar */}
        <div className="space-y-6">
          <DashboardCard className="p-6 sticky top-24">
            <h3 className="font-semibold text-lg mb-4">Sample Overview</h3>
            
            <div className="space-y-4 text-sm">
              <div>
                <p className="text-muted-foreground mb-1 flex items-center"><Calendar className="h-4 w-4 mr-1"/> Upload Date</p>
                <p className="font-medium">{format(new Date(sample.uploaded_at), 'PPP')}</p>
              </div>
              
              <div className="h-px bg-border/50 w-full" />
              
              <div>
                <p className="text-muted-foreground mb-1 flex items-center"><MapPin className="h-4 w-4 mr-1"/> Location</p>
                {sample.coordinates ? (
                  <p className="font-medium truncate" title={sample.coordinates}>
                    Recorded (PostGIS Point)
                  </p>
                ) : (
                  <p className="text-muted-foreground italic">No location provided</p>
                )}
              </div>
              
              <div className="h-px bg-border/50 w-full" />
              
              <div>
                <p className="text-muted-foreground mb-1">Ecosystem</p>
                <p className="font-medium capitalize">{sample.ecosystem || 'N/A'}</p>
              </div>
              
              <div className="h-px bg-border/50 w-full" />
              
              <div>
                <p className="text-muted-foreground mb-1">Visibility</p>
                <p className="font-medium capitalize">{sample.visibility}</p>
              </div>
              
              <div className="h-px bg-border/50 w-full" />

              <div>
                <p className="text-muted-foreground mb-1">Pipeline Status</p>
                <p className="font-medium capitalize text-emerald-500">{sample.upload_status}</p>
              </div>
            </div>
          </DashboardCard>
        </div>
      </div>
    </PageContainer>
  );
}
