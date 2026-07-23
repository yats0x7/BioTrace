import { createClient } from '@/lib/supabase/client';
import type { Project, Sample, Notification, ActivityLog, Alert } from '@/lib/types';

export class DashboardService {
  private supabase = createClient();

  async getDashboardStats(userId: string) {
    const [
      { count: samplesCount },
      { count: speciesCount },
      { count: projectsCount },
      { data: profile }
    ] = await Promise.all([
      this.supabase.from('samples').select('*', { count: 'exact', head: true }).eq('uploader_id', userId),
      this.supabase.from('identifications').select('*', { count: 'exact', head: true }).not('scientific_name', 'is', null), // Note: ML integration not implemented, using global or distinct? Using total for now.
      this.supabase.from('project_members').select('*', { count: 'exact', head: true }).eq('user_id', userId),
      this.supabase.from('profiles').select('total_uploads, total_identifications').eq('id', userId).single(),
    ]);

    return {
      totalSamples: samplesCount || 0,
      totalSpecies: speciesCount || 0,
      projectsJoined: projectsCount || 0,
      contributions: (profile?.total_uploads || 0) + (profile?.total_identifications || 0),
    };
  }

  async getRecentProjects(limit = 3): Promise<Project[]> {
    const { data, error } = await this.supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data;
  }

  async getRecentActivity(limit = 5): Promise<ActivityLog[]> {
    const { data, error } = await this.supabase
      .from('activity_logs')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data;
  }

  async getRecentAlerts(limit = 3): Promise<Alert[]> {
    const { data, error } = await this.supabase
      .from('alerts')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data;
  }
}

export const dashboardService = new DashboardService();
