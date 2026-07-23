import React from 'react';
import { DashboardCard } from './wrappers';
import { Users, Fingerprint, Globe, MapPin, Target } from 'lucide-react';
import { motion } from 'framer-motion';
import type { ProjectWithStats } from '@/services/project.service';
import { formatDistanceToNow } from 'date-fns';
import { useRouter } from 'next/navigation';

export function ProjectCard({ project }: { project: ProjectWithStats }) {
  const router = useRouter();
  
  const progress = Math.min(100, Math.round((project.current_samples / project.target_samples) * 100)) || 0;

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <DashboardCard 
        className="flex flex-col h-full cursor-pointer hover:border-primary/50 transition-colors"
        onClick={() => router.push(`/dashboard/projects/${project.id}`)}
      >
        <div className="h-32 bg-muted/30 rounded-t-lg -mx-6 -mt-6 mb-4 relative overflow-hidden border-b">
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-primary/5" />
          <div className="absolute bottom-3 left-4 flex gap-2">
            <span className="px-2.5 py-1 rounded-full bg-background/90 text-xs font-semibold backdrop-blur-sm shadow-sm border">
              {project.category}
            </span>
            <span className="px-2.5 py-1 rounded-full bg-background/90 text-xs font-semibold backdrop-blur-sm shadow-sm border capitalize">
              {project.visibility}
            </span>
          </div>
          {project.is_member && (
            <div className="absolute top-3 right-4">
              <span className="px-2.5 py-1 rounded-full bg-emerald-500/90 text-white text-xs font-semibold backdrop-blur-sm shadow-sm">
                Joined
              </span>
            </div>
          )}
        </div>

        <div className="flex-1 flex flex-col">
          <h3 className="font-bold text-lg leading-tight mb-2 line-clamp-1">{project.name}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-4 flex-1">
            {project.description}
          </p>

          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-medium">
                <span className="flex items-center gap-1.5 text-muted-foreground"><Target className="h-3.5 w-3.5"/> Progress</span>
                <span>{progress}%</span>
              </div>
              <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                  className="h-full bg-primary" 
                />
              </div>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{project.current_samples} samples</span>
                <span>{project.target_samples} goal</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-4 border-t">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-md bg-muted/50">
                  <Users className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-semibold">{project.member_count}</span>
                  <span className="text-[10px] text-muted-foreground uppercase">Members</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-md bg-muted/50">
                  <Fingerprint className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-semibold">{project.species_count}</span>
                  <span className="text-[10px] text-muted-foreground uppercase">Species</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-muted-foreground pt-2">
              <span className="flex items-center gap-1"><MapPin className="h-3 w-3"/> {project.region}</span>
              <span>Updated {formatDistanceToNow(new Date(project.updated_at), { addSuffix: true })}</span>
            </div>
          </div>
        </div>
      </DashboardCard>
    </motion.div>
  );
}
