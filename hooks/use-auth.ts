import { useAuthStore } from '@/store/auth-store';

export function useAuth() {
  const user = useAuthStore((state) => state.user);
  const profile = useAuthStore((state) => state.profile);
  const isLoading = useAuthStore((state) => state.isLoading);
  
  const isAuthenticated = !!user;

  return {
    user,
    profile,
    isLoading,
    isAuthenticated,
  };
}
