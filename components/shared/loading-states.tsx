import React from 'react';

export function CardSkeleton() {
  return (
    <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6 space-y-4">
      <div className="flex items-center gap-4">
        <div className="h-12 w-12 rounded-full bg-muted animate-pulse" />
        <div className="space-y-2">
          <div className="h-4 w-[200px] bg-muted animate-pulse rounded" />
          <div className="h-3 w-[150px] bg-muted animate-pulse rounded" />
        </div>
      </div>
      <div className="space-y-2 pt-4">
        <div className="h-4 w-full bg-muted animate-pulse rounded" />
        <div className="h-4 w-[80%] bg-muted animate-pulse rounded" />
      </div>
    </div>
  );
}

export function GridSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  );
}

export function ChartSkeleton() {
  return (
    <div className="rounded-xl border bg-card p-6 h-[300px] flex flex-col">
      <div className="h-5 w-[150px] bg-muted animate-pulse rounded mb-6" />
      <div className="flex-1 w-full bg-muted/30 animate-pulse rounded-md" />
    </div>
  );
}
