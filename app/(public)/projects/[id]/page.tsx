'use client';

import React, { use } from 'react';
import { DashboardCard } from '@/components/shared/wrappers';
import { useProject } from '@/hooks/use-projects';
import { Loader2, ArrowLeft, Users, Target, Activity, MapPin, Globe } from 'lucide-react';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import { motion } from 'framer-motion';
import { PROJECT_MOCK_DATA } from '@/lib/mock-data/projects-data';

export default function PublicProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { data: project, isLoading } = useProject(id);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="container py-12 md:py-16">
        <div className="flex flex-col items-center justify-center min-h-[400px]">
          <h2 className="text-2xl font-bold mb-2">Project Not Found</h2>
          <p className="text-muted-foreground mb-6">The project you are looking for does not exist.</p>
          <Link 
            href="/projects"
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
          >
            Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  const progress = Math.min(100, Math.round((project.current_samples / project.target_samples) * 100)) || 0;
  
  // Use unique data for the specific project, fallback to first
  const mockData = PROJECT_MOCK_DATA[id] || PROJECT_MOCK_DATA['11111111-1111-1111-1111-111111111111'];

  return (
    <div className="container py-8 md:py-12 max-w-6xl">
      <div className="mb-6">
        <Link 
          href="/projects"
          className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Projects
        </Link>
      </div>

      {/* Hero Section */}
      <div className="relative rounded-2xl overflow-hidden bg-card border mb-8">
        <div 
          className="h-48 bg-cover bg-center relative"
          style={{ backgroundImage: `url(${project.image_url})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute top-4 left-6 flex gap-2 z-10">
             <span className="px-3 py-1 rounded-full bg-background/90 text-sm font-semibold shadow-sm border">
              {project.category}
            </span>
          </div>
        </div>
        <div className="p-8 pt-0 relative">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 -mt-8">
            <div className="bg-card p-1 rounded-xl shadow-sm border inline-flex relative z-10">
               <div className="h-20 w-20 rounded-lg bg-primary/10 flex items-center justify-center">
                 <Globe className="h-10 w-10 text-primary" />
               </div>
            </div>
            
            <div className="flex-1 pt-2">
              <h1 className="text-3xl font-bold tracking-tight mb-2">{project.name}</h1>
              <p className="text-muted-foreground max-w-3xl leading-relaxed">
                {project.description}
              </p>
            </div>
            
            <div className="flex-shrink-0">
              <Link
                href="/login"
                className="px-8 py-3 rounded-md font-semibold transition-all w-full md:w-auto shadow-sm flex items-center justify-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Log in to Join
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Progress */}
          <DashboardCard className="p-6">
            <h3 className="font-semibold text-lg mb-6 flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" /> Sampling Progress
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between font-medium">
                <span className="text-2xl">{progress}% <span className="text-sm text-muted-foreground font-normal">Completed</span></span>
                <span className="text-muted-foreground">{project.current_samples} / {project.target_samples} Samples</span>
              </div>
              <div className="h-4 w-full bg-muted rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                  className="h-full bg-primary" 
                />
              </div>
            </div>
          </DashboardCard>

          {/* Species Identified */}
          <DashboardCard className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                <Activity className="h-5 w-5 text-primary" /> Species Identified
              </h3>
              <span className="text-sm font-medium bg-muted px-3 py-1 rounded-full">{project.species_count} Total</span>
            </div>
            
            <div className="grid gap-4">
              {mockData.species.map((species: any, i: number) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-lg border bg-muted/20">
                  <div>
                    <h4 className="font-medium">{species.name}</h4>
                    <span className="text-xs text-muted-foreground uppercase">{species.status}</span>
                  </div>
                  <div className="bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 px-3 py-1 rounded-full text-xs font-semibold">
                    {species.confidence * 100}% Match
                  </div>
                </div>
              ))}
            </div>
          </DashboardCard>
          
          {/* Activity Timeline */}
          <DashboardCard className="p-6">
            <h3 className="font-semibold text-lg mb-6">Recent Activity</h3>
            <div className="relative border-l border-muted ml-3 space-y-8">
              {mockData.activity.map((activity: any, i: number) => (
                <div key={i} className="relative pl-6">
                  <div className="absolute w-3 h-3 bg-primary rounded-full -left-[6.5px] top-1.5 ring-4 ring-background" />
                  <p className="text-sm">
                    <span className="font-semibold">{activity.user}</span> {activity.action}
                  </p>
                  <span className="text-xs text-muted-foreground mt-1 block">{activity.time}</span>
                </div>
              ))}
            </div>
          </DashboardCard>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          <DashboardCard className="p-6">
            <h3 className="font-semibold text-lg mb-4">Details</h3>
            <div className="space-y-4 text-sm">
              <div className="flex justify-between border-b pb-3">
                <span className="text-muted-foreground flex items-center gap-2"><MapPin className="h-4 w-4"/> Region</span>
                <span className="font-medium">{project.region}</span>
              </div>
              <div className="flex justify-between border-b pb-3">
                <span className="text-muted-foreground">Status</span>
                <span className="font-medium text-emerald-500">{project.status}</span>
              </div>
              <div className="flex justify-between pb-1">
                <span className="text-muted-foreground">Created</span>
                <span className="font-medium">{formatDistanceToNow(new Date(project.created_at), { addSuffix: true })}</span>
              </div>
            </div>
          </DashboardCard>

          <DashboardCard className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" /> Members
              </h3>
              <span className="text-sm font-medium bg-muted px-2.5 py-1 rounded-full">{project.member_count}</span>
            </div>
            
            <div className="space-y-4 mt-6">
              {mockData.members.map((member: any, i: number) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary shrink-0">
                    {member.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{member.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{member.role}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-xs font-semibold">{member.contributions}</p>
                    <p className="text-[10px] text-muted-foreground">samples</p>
                  </div>
                </div>
              ))}
            </div>
          </DashboardCard>
        </div>
      </div>
    </div>
  );
}
