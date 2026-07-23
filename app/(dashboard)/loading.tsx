import React from 'react';
import { LoadingSkeleton, PageContainer } from '@/components/shared/wrappers';

export default function DashboardLoading() {
  return (
    <PageContainer className="flex items-center justify-center min-h-[50vh]">
      <LoadingSkeleton text="Loading dashboard..." />
    </PageContainer>
  );
}
