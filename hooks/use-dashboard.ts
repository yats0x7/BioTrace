import { useQuery } from '@tanstack/react-query';
import { dashboardService } from '@/services/dashboard.service';
import { useAuthStore } from '@/store/auth-store';

export function useDashboard() {
  const { user } = useAuthStore();

  const statsQuery = useQuery({
    queryKey: ['dashboard-stats', user?.id],
    queryFn: () => dashboardService.getDashboardStats(user!.id),
    enabled: !!user?.id,
  });

  const recentProjectsQuery = useQuery({
    queryKey: ['recent-projects'],
    queryFn: () => dashboardService.getRecentProjects(),
  });

  const recentActivityQuery = useQuery({
    queryKey: ['recent-activity'],
    queryFn: () => dashboardService.getRecentActivity(),
  });

  const alertsQuery = useQuery({
    queryKey: ['alerts'],
    queryFn: () => dashboardService.getRecentAlerts(),
  });

  return {
    stats: statsQuery.data,
    projects: recentProjectsQuery.data,
    activities: recentActivityQuery.data,
    alerts: alertsQuery.data,
    isLoading: 
      statsQuery.isLoading || 
      recentProjectsQuery.isLoading || 
      recentActivityQuery.isLoading || 
      alertsQuery.isLoading,
    isError: 
      statsQuery.isError || 
      recentProjectsQuery.isError || 
      recentActivityQuery.isError || 
      alertsQuery.isError,
  };
}
