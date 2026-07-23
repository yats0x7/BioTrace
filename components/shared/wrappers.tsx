import React from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

export function PageContainer({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={cn("max-w-7xl mx-auto space-y-6", className)}>
      {children}
    </div>
  );
}

export function PageHeader({ title, description, children }: { title: string; description?: string; children?: React.ReactNode }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
        {description && <p className="text-muted-foreground mt-1">{description}</p>}
      </div>
      {children && <div>{children}</div>}
    </div>
  );
}

export function Section({ title, children, className }: { title?: string; children: React.ReactNode; className?: string }) {
  return (
    <section className={cn("space-y-4", className)}>
      {title && <h2 className="text-lg font-semibold">{title}</h2>}
      {children}
    </section>
  );
}

export function DashboardCard({ title, children, className, action, ...props }: React.HTMLAttributes<HTMLDivElement> & { title?: React.ReactNode; action?: React.ReactNode }) {
  return (
    <div className={cn("rounded-xl border bg-card text-card-foreground shadow-sm", className)} {...props}>
      {(title || action) && (
        <div className="flex items-center justify-between p-6 pb-4">
          {title && <h3 className="font-semibold leading-none tracking-tight">{title}</h3>}
          {action && <div>{action}</div>}
        </div>
      )}
      <div className="p-6 pt-0">
        {children}
      </div>
    </div>
  );
}

export function StatCard({ title, value, description, icon: Icon }: { title: string; value: string | number; description?: string; icon?: React.ElementType }) {
  return (
    <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6 flex flex-col justify-between hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between pb-2">
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        {Icon && <Icon className="h-4 w-4 text-muted-foreground" />}
      </div>
      <div>
        <div className="text-2xl font-bold">{value}</div>
        {description && <p className="text-xs text-muted-foreground mt-1">{description}</p>}
      </div>
    </div>
  );
}

export function EmptyState({ title, description, icon: Icon, action }: { title: string; description: string; icon?: React.ElementType; action?: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center min-h-[300px] border border-dashed rounded-xl bg-muted/20">
      {Icon && <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-4"><Icon className="h-6 w-6 text-muted-foreground" /></div>}
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-sm text-muted-foreground mt-1 max-w-sm mb-4">{description}</p>
      {action && action}
    </div>
  );
}

export function LoadingSkeleton({ text = "Loading..." }: { text?: string }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[200px] gap-3 text-muted-foreground">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
      <p className="text-sm animate-pulse">{text}</p>
    </div>
  );
}
