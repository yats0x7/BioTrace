import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { projectService } from '@/services/project.service';
import { useAuthStore } from '@/store/auth-store';
import { toast } from 'sonner';

export function useProjects() {
  const { user } = useAuthStore();
  
  return useQuery({
    queryKey: ['projects', user?.id],
    queryFn: () => projectService.getProjects(),
  });
}

export function useProject(id: string) {
  const { user } = useAuthStore();
  
  return useQuery({
    queryKey: ['project', id, user?.id],
    queryFn: () => projectService.getProjectById(id),
    enabled: !!id,
  });
}

export function useJoinProject() {
  const queryClient = useQueryClient();
  const { user } = useAuthStore();

  return useMutation({
    mutationFn: (projectId: string) => projectService.joinProject(projectId),
    onSuccess: (_, projectId) => {
      queryClient.invalidateQueries({ queryKey: ['projects', user?.id] });
      queryClient.invalidateQueries({ queryKey: ['project', projectId, user?.id] });
      queryClient.invalidateQueries({ queryKey: ['dashboard-stats'] });
      toast.success('Successfully joined project!');
    },
    onError: (error: Error) => {
      toast.error('Failed to join project', {
        description: error.message
      });
    }
  });
}
