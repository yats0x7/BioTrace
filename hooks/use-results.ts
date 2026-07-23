import { useQuery } from '@tanstack/react-query';
import { resultsService } from '@/services/results.service';
import { useAuthStore } from '@/store/auth-store';

export function useResults() {
  const { user } = useAuthStore();

  const { data: results, isLoading, error } = useQuery({
    queryKey: ['identifications', user?.id],
    queryFn: () => resultsService.getRecentIdentifications(),
    enabled: !!user?.id,
  });

  return {
    results,
    isLoading,
    error,
  };
}

export function useResultDetail(sampleId: string) {
  const { data: resultData, isLoading, error } = useQuery({
    queryKey: ['identifications', 'detail', sampleId],
    queryFn: () => resultsService.getIdentificationsBySampleId(sampleId),
    enabled: !!sampleId,
  });

  return {
    sample: resultData?.sample,
    identifications: resultData?.identifications,
    isLoading,
    error,
  };
}
