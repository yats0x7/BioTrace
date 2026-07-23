'use client';

import React, { useState } from 'react';
import { PageContainer, PageHeader, EmptyState } from '@/components/shared/wrappers';
import { ProjectCard } from '@/components/shared/project-card';
import { useProjects } from '@/hooks/use-projects';
import { Loader2, Search, Filter, FolderOpen } from 'lucide-react';

export default function ProjectsPage() {
  const { data: projects, isLoading } = useProjects();
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<'all' | 'joined'>('all');

  const filteredProjects = projects?.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (p.description || '').toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === 'all' || (filter === 'joined' && p.is_member);
    return matchesSearch && matchesFilter;
  }) || [];

  return (
    <PageContainer>
      <PageHeader 
        title="Community Projects" 
        description="Join global and local biodiversity monitoring initiatives."
      />

      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-8">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input 
            placeholder="Search projects..." 
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 pl-9 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            value={searchQuery}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2 w-full sm:w-auto">
          <button 
            onClick={() => setFilter('all')}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors flex-1 sm:flex-none ${filter === 'all' ? 'bg-primary text-primary-foreground shadow-sm' : 'bg-muted/50 hover:bg-muted text-muted-foreground'}`}
          >
            All Projects
          </button>
          <button 
            onClick={() => setFilter('joined')}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors flex-1 sm:flex-none ${filter === 'joined' ? 'bg-primary text-primary-foreground shadow-sm' : 'bg-muted/50 hover:bg-muted text-muted-foreground'}`}
          >
            My Projects
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center min-h-[400px] text-muted-foreground">
          <Loader2 className="h-8 w-8 animate-spin mb-4" />
          <p>Loading projects...</p>
        </div>
      ) : filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <EmptyState 
          icon={FolderOpen}
          title="No Projects Found"
          description={searchQuery ? `No projects match "${searchQuery}".` : "There are currently no projects available to display."}
        />
      )}
    </PageContainer>
  );
}
