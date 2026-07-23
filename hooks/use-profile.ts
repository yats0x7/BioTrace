import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { createClient } from '@/lib/supabase/client';
import { useAuthStore } from '@/store/auth-store';
import { toast } from 'sonner';

export function useProfile() {
  const { user, profile: storeProfile, setProfile } = useAuthStore();
  const supabase = createClient();
  const queryClient = useQueryClient();

  // We primarily use the auth-store's profile, but we can query it if needed
  const { data: profile, isLoading } = useQuery({
    queryKey: ['profile', user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user!.id)
        .single();
      
      if (error) throw error;
      setProfile(data); // Sync with store
      return data;
    },
    enabled: !!user?.id && !storeProfile,
    initialData: storeProfile,
  });

  const updateProfile = useMutation({
    mutationFn: async (updates: Partial<typeof profile>) => {
      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user!.id)
        .select()
        .single();
        
      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      setProfile(data);
      queryClient.invalidateQueries({ queryKey: ['profile', user?.id] });
      toast.success('Profile updated successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to update profile');
    }
  });

  return {
    profile: profile || storeProfile,
    isLoading,
    updateProfile,
  };
}
