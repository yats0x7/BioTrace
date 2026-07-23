'use client';

import React from 'react';
import { useAuth } from '@/hooks/use-auth';
import { useDashboard } from '@/hooks/use-dashboard';
import { useNotifications } from '@/hooks/use-notifications';
import { PageContainer, PageHeader, DashboardCard, StatCard, EmptyState, LoadingSkeleton } from '@/components/shared/wrappers';
import { ProjectCard, NotificationCard, ActivityCard } from '@/components/shared/cards';
import { FileText, MapPin, Activity, Bell, FolderOpen } from 'lucide-react';
import { motion, Variants } from 'framer-motion';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

export default function DashboardPage() {
  const { profile } = useAuth();
  const { stats, projects, activities, alerts, isLoading: isDashboardLoading } = useDashboard();
  const { notifications, markAsRead, isLoading: isNotificationsLoading } = useNotifications();

  if (isDashboardLoading || isNotificationsLoading) {
    return (
      <PageContainer className="flex items-center justify-center min-h-[50vh]">
        <LoadingSkeleton text="Loading your dashboard..." />
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <PageHeader 
          title={`Welcome back, ${profile?.full_name?.split(' ')[0] || 'User'}`} 
          description="Here is what's happening with your biodiversity projects today."
        />
      </motion.div>

      {alerts && alerts.length > 0 && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="space-y-4">
          {alerts.map(alert => (
            <div key={alert.id} className="bg-destructive/15 text-destructive border border-destructive/20 rounded-lg p-4 flex items-start gap-3">
              <Activity className="h-5 w-5 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-medium text-sm">{alert.title}</h4>
                <p className="text-sm mt-1">{alert.message}</p>
              </div>
            </div>
          ))}
        </motion.div>
      )}

      <motion.div 
        variants={containerVariants} 
        initial="hidden" 
        animate="show" 
        className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
      >
        <motion.div variants={itemVariants}>
          <StatCard title="Total Samples" value={stats?.totalSamples || 0} icon={FileText} description="Uploaded across all projects" />
        </motion.div>
        <motion.div variants={itemVariants}>
          <StatCard title="Identified Species" value={stats?.totalSpecies || 0} icon={Activity} description="ML identified high confidence" />
        </motion.div>
        <motion.div variants={itemVariants}>
          <StatCard title="Projects Joined" value={stats?.projectsJoined || 0} icon={FolderOpen} description="Active community projects" />
        </motion.div>
        <motion.div variants={itemVariants}>
          <StatCard title="Total Contributions" value={stats?.contributions || 0} icon={MapPin} description="Uploads and validations" />
        </motion.div>
      </motion.div>

      <motion.div 
        variants={containerVariants} 
        initial="hidden" 
        animate="show" 
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-7"
      >
        <motion.div variants={itemVariants} className="lg:col-span-5 space-y-6">
          <DashboardCard title="Recent Projects">
            {projects && projects.length > 0 ? (
              <div className="grid sm:grid-cols-2 gap-4">
                {projects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            ) : (
              <EmptyState title="No projects yet" description="Join or create a community project to get started." icon={FolderOpen} />
            )}
          </DashboardCard>
          
          <DashboardCard title="Recent Activity">
             {activities && activities.length > 0 ? (
               <div className="flex flex-col">
                 {activities.map((activity) => (
                   <ActivityCard key={activity.id} activity={activity} />
                 ))}
               </div>
             ) : (
               <EmptyState title="No activity" description="Upload a sample to see activity here." icon={Activity} />
             )}
          </DashboardCard>
        </motion.div>
        
        <motion.div variants={itemVariants} className="lg:col-span-2 space-y-6">
          <DashboardCard title="Notifications" action={<Bell className="h-4 w-4 text-muted-foreground" />}>
            {notifications && notifications.length > 0 ? (
              <div className="flex flex-col -mx-2">
                {notifications.map((notification) => (
                  <NotificationCard 
                    key={notification.id} 
                    notification={notification} 
                    onRead={() => markAsRead.mutate(notification.id)} 
                  />
                ))}
              </div>
            ) : (
              <EmptyState title="All caught up" description="You have no new notifications." icon={Bell} />
            )}
          </DashboardCard>
        </motion.div>
      </motion.div>
    </PageContainer>
  );
}
