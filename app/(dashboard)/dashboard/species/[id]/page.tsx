'use client';

import React, { use } from 'react';
import { PageContainer, DashboardCard } from '@/components/shared/wrappers';
import { MOCK_SPECIES_DB } from '@/lib/mock-data/species-data';
import { ConfidenceDistributionChart } from '@/components/species/species-charts';
import { ArrowLeft, MapPin, Fingerprint, Activity, Clock, ShieldAlert } from 'lucide-react';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';

export default function SpeciesDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  
  const species = MOCK_SPECIES_DB.find(s => s.id === id);

  if (!species) {
    return (
      <PageContainer>
        <div className="flex flex-col items-center justify-center min-h-[400px]">
          <h2 className="text-2xl font-bold mb-2">Species Not Found</h2>
          <p className="text-muted-foreground mb-6">The species you are looking for does not exist in the database.</p>
          <Link 
            href="/dashboard/species"
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
          >
            Back to Species Explorer
          </Link>
        </div>
      </PageContainer>
    );
  }

  const statusColor = 
    species.conservationStatus === 'Endangered' || species.conservationStatus === 'Critically Endangered' ? 'text-red-500 bg-red-500/10 border-red-500/20' :
    species.conservationStatus === 'Vulnerable' || species.conservationStatus === 'Near Threatened' ? 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20' :
    'text-emerald-500 bg-emerald-500/10 border-emerald-500/20';

  return (
    <PageContainer className="max-w-6xl">
      <div className="mb-4">
        <Link 
          href="/dashboard/species"
          className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Species Explorer
        </Link>
      </div>

      {/* Hero Section */}
      <div className="relative rounded-2xl overflow-hidden bg-card border mb-8 flex flex-col md:flex-row items-center gap-8 p-8">
        <div className="w-32 h-32 md:w-48 md:h-48 rounded-full bg-primary/10 flex items-center justify-center border-4 border-background shadow-lg shrink-0 relative overflow-hidden">
           <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent" />
           <Fingerprint className="h-16 w-16 md:h-24 md:w-24 text-primary/40 relative z-10" />
        </div>
        
        <div className="flex-1 text-center md:text-left">
          <div className="flex flex-col md:flex-row items-center gap-3 mb-2">
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight">{species.commonName}</h1>
            <span className={`px-3 py-1 rounded-full text-sm font-semibold border ${statusColor} mt-2 md:mt-0`}>
              {species.conservationStatus}
            </span>
          </div>
          <p className="text-xl text-muted-foreground italic mb-6">{species.scientificName}</p>
          
          <div className="flex flex-wrap justify-center md:justify-start gap-6">
            <div className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-emerald-500" />
              <div>
                <p className="text-lg font-semibold leading-none">{species.averageConfidence}%</p>
                <p className="text-xs text-muted-foreground uppercase">Avg Confidence</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Fingerprint className="h-5 w-5 text-primary" />
              <div>
                <p className="text-lg font-semibold leading-none">{species.detectedSamples}</p>
                <p className="text-xs text-muted-foreground uppercase">Samples</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          <DashboardCard className="p-6">
            <h3 className="font-semibold text-lg mb-4">Description</h3>
            <p className="text-muted-foreground leading-relaxed">
              {species.description}
            </p>
          </DashboardCard>

          <DashboardCard className="p-6">
            <h3 className="font-semibold text-lg mb-6">Confidence Distribution</h3>
            <ConfidenceDistributionChart />
          </DashboardCard>

          <DashboardCard className="p-6">
            <h3 className="font-semibold text-lg mb-6 flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" /> Recent Detections
            </h3>
            <div className="relative border-l border-muted ml-3 space-y-8">
              {species.recentDetections.map((detection, i) => (
                <div key={i} className="relative pl-6">
                  <div className="absolute w-3 h-3 bg-primary rounded-full -left-[6.5px] top-1.5 ring-4 ring-background" />
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <p className="font-medium">{detection.sampleName}</p>
                      <p className="text-xs text-muted-foreground">{detection.projectName}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-semibold bg-emerald-500/10 text-emerald-500 px-2 py-1 rounded-full">
                        {detection.confidence}% Match
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {formatDistanceToNow(new Date(detection.date), { addSuffix: true })}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </DashboardCard>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          <DashboardCard className="p-6">
            <h3 className="font-semibold text-lg mb-4">Taxonomy</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between border-b pb-2">
                <span className="text-muted-foreground">Order</span>
                <span className="font-medium">{species.order}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-muted-foreground">Family</span>
                <span className="font-medium">{species.family}</span>
              </div>
              <div className="flex justify-between pb-1">
                <span className="text-muted-foreground">Genus</span>
                <span className="font-medium italic">{species.genus}</span>
              </div>
            </div>
          </DashboardCard>

          <DashboardCard className="p-6">
            <h3 className="font-semibold text-lg mb-4">Ecology</h3>
            <div className="space-y-4 text-sm">
              <div>
                <span className="text-muted-foreground block mb-1">Habitat</span>
                <span className="font-medium leading-tight block">{species.habitat}</span>
              </div>
              <div>
                <span className="text-muted-foreground block mb-1 flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5" /> Geographic Range
                </span>
                <span className="font-medium leading-tight block">{species.geographicRange}</span>
              </div>
            </div>
          </DashboardCard>
          
          <DashboardCard className="p-6">
            <h3 className="font-semibold text-lg mb-4">Detected In Projects</h3>
            <div className="flex flex-col gap-2">
              {species.projectNames.map((name, i) => (
                <Link 
                  key={i}
                  href={`/dashboard/projects/${species.projectIds[i]}`}
                  className="bg-muted hover:bg-muted/80 p-3 rounded-lg text-sm font-medium transition-colors flex items-center justify-between group"
                >
                  {name}
                  <ArrowLeft className="h-4 w-4 rotate-180 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              ))}
            </div>
          </DashboardCard>
        </div>
      </div>
    </PageContainer>
  );
}
