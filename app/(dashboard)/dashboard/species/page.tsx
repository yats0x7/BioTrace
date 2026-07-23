'use client';

import React, { useState, useMemo } from 'react';
import { PageContainer, PageHeader, DashboardCard, EmptyState } from '@/components/shared/wrappers';
import { SPECIES_STATISTICS, MOCK_SPECIES_DB } from '@/lib/mock-data/species-data';
import { SpeciesCard } from '@/components/species/species-card';
import { ConservationStatusChart, FamilyRepresentationChart } from '@/components/species/species-charts';
import { Fingerprint, Search, ShieldAlert, Target, Database } from 'lucide-react';

export default function SpeciesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [familyFilter, setFamilyFilter] = useState('all');

  const families = useMemo(() => Array.from(new Set(MOCK_SPECIES_DB.map(s => s.family))).sort(), []);

  const filteredSpecies = useMemo(() => {
    return MOCK_SPECIES_DB.filter(species => {
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        if (!species.commonName.toLowerCase().includes(query) && !species.scientificName.toLowerCase().includes(query)) {
          return false;
        }
      }
      if (statusFilter !== 'all' && species.conservationStatus !== statusFilter) {
        return false;
      }
      if (familyFilter !== 'all' && species.family !== familyFilter) {
        return false;
      }
      return true;
    });
  }, [searchQuery, statusFilter, familyFilter]);

  return (
    <PageContainer className="max-w-7xl">
      <PageHeader 
        title="Species Database" 
        description="Explore the global catalog of species detected across all projects."
      />

      {/* Top Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <DashboardCard className="p-4 bg-primary/5 border-primary/20">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-primary/10 rounded-lg">
              <Database className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold">{SPECIES_STATISTICS.totalSpecies}</p>
              <p className="text-xs text-muted-foreground uppercase font-medium">Total Species</p>
            </div>
          </div>
        </DashboardCard>
        <DashboardCard className="p-4 bg-red-500/5 border-red-500/20">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-red-500/10 rounded-lg">
              <ShieldAlert className="h-5 w-5 text-red-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-red-500">{SPECIES_STATISTICS.threatenedSpecies}</p>
              <p className="text-xs text-muted-foreground uppercase font-medium">Threatened</p>
            </div>
          </div>
        </DashboardCard>
        <DashboardCard className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-muted rounded-lg">
              <Target className="h-5 w-5 text-muted-foreground" />
            </div>
            <div>
              <p className="text-2xl font-bold">{SPECIES_STATISTICS.projectsCovered}</p>
              <p className="text-xs text-muted-foreground uppercase font-medium">Projects Covered</p>
            </div>
          </div>
        </DashboardCard>
        <DashboardCard className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-muted rounded-lg">
              <Fingerprint className="h-5 w-5 text-muted-foreground" />
            </div>
            <div>
              <p className="text-2xl font-bold">{SPECIES_STATISTICS.totalSamples}</p>
              <p className="text-xs text-muted-foreground uppercase font-medium">Total Samples</p>
            </div>
          </div>
        </DashboardCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Charts */}
        <DashboardCard className="p-6 col-span-1 lg:col-span-1">
          <h3 className="font-semibold mb-4">Conservation Status</h3>
          <ConservationStatusChart />
          <div className="mt-4 flex flex-wrap gap-2 justify-center text-xs">
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500"></span> Least Concern</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-yellow-500"></span> Near Threatened</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-orange-500"></span> Vulnerable</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500"></span> Endangered</span>
          </div>
        </DashboardCard>
        
        <DashboardCard className="p-6 col-span-1 lg:col-span-2">
          <h3 className="font-semibold mb-4">Families Represented</h3>
          <FamilyRepresentationChart />
        </DashboardCard>
      </div>

      {/* Explorer Controls */}
      <div className="flex flex-col md:flex-row gap-4 items-center mb-6 bg-card p-2 rounded-lg border shadow-sm">
        <div className="relative w-full md:w-96 shrink-0">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input 
            placeholder="Search by common or scientific name..." 
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 pl-9 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex-1 flex flex-wrap md:flex-nowrap gap-3 w-full">
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="flex h-10 w-full md:w-auto rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            <option value="all">All Statuses</option>
            <option value="Endangered">Endangered</option>
            <option value="Vulnerable">Vulnerable</option>
            <option value="Near Threatened">Near Threatened</option>
            <option value="Least Concern">Least Concern</option>
          </select>

          <select 
            value={familyFilter}
            onChange={(e) => setFamilyFilter(e.target.value)}
            className="flex h-10 w-full md:w-auto rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            <option value="all">All Families</option>
            {families.map(f => (
              <option key={f} value={f}>{f}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Grid */}
      {filteredSpecies.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredSpecies.map(species => (
            <SpeciesCard key={species.id} species={species} />
          ))}
        </div>
      ) : (
        <EmptyState 
          icon={Fingerprint}
          title="No species found"
          description="Upload an eDNA sample or join a public project to begin building your biodiversity database."
        />
      )}

    </PageContainer>
  );
}
