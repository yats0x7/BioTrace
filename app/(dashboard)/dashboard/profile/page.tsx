'use client';

import React, { useState } from 'react';
import { PageContainer, DashboardCard } from '@/components/shared/wrappers';
import { PROFILE_USER, PROFILE_STATS, PROFILE_ACHIEVEMENTS, PROFILE_ACTIVITY, PROFILE_PROJECTS, PROFILE_TOP_SPECIES } from '@/lib/mock-data/profile-data';
import { MonthlyUploadChart, SpeciesDetectedChart, ProjectDistributionChart } from '@/components/profile/profile-charts';
import { EditProfileModal } from '@/components/profile/edit-profile-modal';
import { MapPin, Briefcase, Calendar, Upload, Fingerprint, Folder, FileText, Activity, ShieldAlert, Award, Clock, ArrowRight } from 'lucide-react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';

import { useAuthStore } from '@/store/auth-store';

const ProfileMap = dynamic(() => import('@/components/profile/profile-map'), {
  ssr: false,
  loading: () => <div className="w-full h-[300px] bg-muted/20 animate-pulse rounded-lg" />
});

export default function ProfilePage() {
  const { user, profile } = useAuthStore();
  
  const [userProfile, setUserProfile] = useState({
    ...PROFILE_USER,
    name: profile?.full_name || user?.user_metadata?.full_name || PROFILE_USER.name,
    email: user?.email || PROFILE_USER.email,
  });

  React.useEffect(() => {
    setUserProfile(prev => ({
      ...prev,
      name: profile?.full_name || user?.user_metadata?.full_name || prev.name,
      email: user?.email || prev.email,
    }));
  }, [user, profile]);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleSaveProfile = (newData: Partial<typeof userProfile>) => {
    setUserProfile({ ...userProfile, ...newData });
    setIsEditModalOpen(false);
  };

  return (
    <PageContainer className="max-w-7xl space-y-8">
      {/* Top Section */}
      <div className="relative rounded-2xl bg-card border p-6 md:p-8 flex flex-col md:flex-row gap-8 items-start md:items-center">
        <div className="h-24 w-24 md:h-32 md:w-32 rounded-full bg-primary/20 flex items-center justify-center shrink-0 border-4 border-background shadow-md">
          <span className="text-4xl md:text-5xl font-bold text-primary">
            {userProfile.name.split(' ').map((n: string) => n[0]).join('').substring(0, 2)}
          </span>
        </div>
        <div className="flex-1 space-y-3">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">{userProfile.name}</h1>
              <p className="text-muted-foreground">{userProfile.email}</p>
            </div>
            <button 
              onClick={() => setIsEditModalOpen(true)}
              className="px-4 py-2 bg-primary/10 text-primary hover:bg-primary/20 transition-colors rounded-md text-sm font-medium w-fit shrink-0"
            >
              Edit Profile
            </button>
          </div>
          <p className="max-w-3xl text-sm leading-relaxed">{userProfile.bio}</p>
          <div className="flex flex-wrap gap-4 pt-2 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5"><Briefcase className="h-4 w-4" /> {userProfile.institution}</span>
            <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4" /> {userProfile.country}</span>
            <span className="flex items-center gap-1.5"><Award className="h-4 w-4" /> {userProfile.contributorLevel}</span>
            <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4" /> Member since {new Date(userProfile.memberSince).getFullYear()}</span>
          </div>
        </div>
      </div>

      {/* Contribution Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Samples Uploaded', value: PROFILE_STATS.samplesUploaded, icon: Upload },
          { label: 'Species Identified', value: PROFILE_STATS.speciesIdentified, icon: Fingerprint },
          { label: 'Projects Joined', value: PROFILE_STATS.projectsJoined, icon: Folder },
          { label: 'Avg ML Confidence', value: `${PROFILE_STATS.averageConfidence}%`, icon: Activity },
          { label: 'Reports Generated', value: PROFILE_STATS.reportsGenerated, icon: FileText },
          { label: 'Map Contributions', value: PROFILE_STATS.mapContributions, icon: MapPin },
          { label: 'Conservation Impact', value: PROFILE_STATS.conservationContributions, icon: ShieldAlert },
          { label: 'Total Analyses', value: PROFILE_STATS.totalAnalysisCompleted, icon: Activity },
        ].map((stat, i) => (
          <DashboardCard key={i} className="p-4 flex items-center gap-4">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
              <stat.icon className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-xs text-muted-foreground uppercase font-medium">{stat.label}</p>
            </div>
          </DashboardCard>
        ))}
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column - Charts & Activity */}
        <div className="lg:col-span-2 space-y-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <DashboardCard className="p-6">
              <h3 className="font-semibold mb-6">Monthly Uploads</h3>
              <MonthlyUploadChart />
            </DashboardCard>
            <DashboardCard className="p-6">
              <h3 className="font-semibold mb-6">Species Detected</h3>
              <SpeciesDetectedChart />
            </DashboardCard>
          </div>

          <DashboardCard className="p-6">
            <h3 className="font-semibold mb-6">Achievements</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {PROFILE_ACHIEVEMENTS.map(ach => (
                <div key={ach.id} className="border rounded-xl p-4 flex flex-col items-center text-center gap-2 bg-muted/20">
                  <div className="h-12 w-12 rounded-full bg-yellow-500/10 flex items-center justify-center text-yellow-600 mb-1">
                    <Award className="h-6 w-6" />
                  </div>
                  <h4 className="font-semibold text-sm">{ach.title}</h4>
                  <p className="text-xs text-muted-foreground">{ach.description}</p>
                </div>
              ))}
            </div>
          </DashboardCard>

          <DashboardCard className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold text-lg flex items-center gap-2"><Folder className="h-5 w-5 text-primary"/> Joined Projects</h3>
              <Link href="/dashboard/projects" className="text-sm text-primary hover:underline flex items-center gap-1">
                View All <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="space-y-4">
              {PROFILE_PROJECTS.map(proj => (
                <div key={proj.id} className="border rounded-xl p-5 bg-card">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                    <div>
                      <h4 className="font-semibold text-lg">{proj.name}</h4>
                      <p className="text-sm text-muted-foreground">{proj.role}</p>
                    </div>
                    <div className="flex gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1"><Upload className="h-4 w-4" /> {proj.samplesSubmitted}</span>
                      <span className="flex items-center gap-1"><Fingerprint className="h-4 w-4" /> {proj.speciesDetected}</span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs font-medium">
                      <span>Contribution Progress</span>
                      <span className="text-primary">{proj.progress}%</span>
                    </div>
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: `${proj.progress}%` }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </DashboardCard>
        </div>

        {/* Right Column - Map, Species, Activity */}
        <div className="space-y-8">
          
          <DashboardCard className="p-6">
            <h3 className="font-semibold mb-4">Contribution Map</h3>
            <p className="text-sm text-muted-foreground mb-4">Locations of your uploaded samples.</p>
            <ProfileMap />
          </DashboardCard>

          <DashboardCard className="p-6">
            <h3 className="font-semibold mb-6 flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" /> Project Distribution
            </h3>
            <ProjectDistributionChart />
          </DashboardCard>

          <DashboardCard className="p-6">
            <h3 className="font-semibold text-lg mb-6 flex items-center gap-2">
              <Fingerprint className="h-5 w-5 text-primary" /> Top Species
            </h3>
            <div className="space-y-4">
              {PROFILE_TOP_SPECIES.map((species, i) => (
                <div key={i} className="flex justify-between items-center border-b pb-3 last:border-0 last:pb-0">
                  <div className="flex-1 min-w-0 pr-4">
                    <p className="font-medium truncate text-sm">{species.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{species.project}</p>
                  </div>
                  <div className="flex flex-col items-end shrink-0">
                    <span className="text-emerald-500 font-semibold text-xs">{species.confidence}% avg</span>
                    <span className="text-[10px] text-muted-foreground bg-muted px-1.5 py-0.5 rounded-sm mt-1">{species.count} detects</span>
                  </div>
                </div>
              ))}
            </div>
          </DashboardCard>

          <DashboardCard className="p-6">
            <h3 className="font-semibold text-lg mb-6 flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" /> Recent Activity
            </h3>
            <div className="relative border-l border-muted ml-3 space-y-6">
              {PROFILE_ACTIVITY.map(activity => (
                <div key={activity.id} className="relative pl-6">
                  <div className="absolute w-3 h-3 bg-primary rounded-full -left-[6.5px] top-1.5 ring-4 ring-background" />
                  <p className="font-medium text-sm leading-tight mb-1">{activity.title}</p>
                  <p className="text-xs text-muted-foreground">{formatDistanceToNow(new Date(activity.date), { addSuffix: true })}</p>
                </div>
              ))}
            </div>
          </DashboardCard>

        </div>
      </div>

      <EditProfileModal 
        isOpen={isEditModalOpen} 
        onClose={() => setIsEditModalOpen(false)} 
        initialData={userProfile} 
        onSave={handleSaveProfile} 
      />
    </PageContainer>
  );
}
