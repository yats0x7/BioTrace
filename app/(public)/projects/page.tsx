'use client';

import React, { useState } from 'react';
import { ProjectCard } from '@/components/shared/project-card';
import { useProjects } from '@/hooks/use-projects';
import { Loader2, Search, FolderOpen } from 'lucide-react';
import { EmptyState } from '@/components/shared/wrappers';

export default function PublicProjectsPage() {
  const { data: projects, isLoading } = useProjects();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProjects = projects?.filter(p => {
    return p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
           (p.description || '').toLowerCase().includes(searchQuery.toLowerCase());
  }) || [];

  return (
    <div className="container py-12 md:py-16">
      <div className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4 text-foreground">Community Projects</h1>
        <p className="text-xl text-muted-foreground max-w-2xl">
          Join global and local biodiversity monitoring initiatives. Explore active research projects worldwide.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-8">
        <div className="relative w-full sm:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input 
            placeholder="Search projects..." 
            className="flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 pl-9 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            value={searchQuery}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
          />
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
    </div>
  );
}
