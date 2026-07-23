import React from 'react';
import { Sidebar } from '@/components/layout/sidebar';
import { TopHeader } from '@/components/layout/top-header';
import { PageTransition } from '@/components/shared/page-transition';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-muted/20">
      <Sidebar />
      <div className="flex-1 flex flex-col md:pl-64">
        <TopHeader />
        <main className="flex-1 p-6">
          <PageTransition>
            {children}
          </PageTransition>
        </main>
      </div>
    </div>
  );
}
