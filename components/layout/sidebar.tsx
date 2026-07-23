'use client';

import React from 'react';
import Link from 'next/link';
import { Home, Upload, BarChart2, Folder, Settings, Fingerprint, Map, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

const items = [
  { name: 'Overview', href: '/dashboard', icon: Home },
  { name: 'Upload Sample', href: '/dashboard/upload', icon: Upload },
  { name: 'Results', href: '/dashboard/results', icon: BarChart2 },
  { name: 'Projects', href: '/dashboard/projects', icon: Folder },
  { name: 'Species', href: '/dashboard/species', icon: Fingerprint },
  { name: 'Map', href: '/dashboard/map', icon: Map },
  { name: 'Profile', href: '/dashboard/profile', icon: User },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="hidden md:flex flex-col w-64 border-r bg-card fixed inset-y-0 z-50">
      <div className="h-16 flex items-center px-6 border-b">
        <span className="font-bold text-xl text-primary flex items-center gap-2">
          <img src="/frog.png" alt="BioTrace Logo" className="h-8 w-8 object-contain rounded-md" />
          BioTrace
        </span>
      </div>
      
      <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        {items.map((item) => {
          const isActive = item.href === '/dashboard' 
            ? pathname === '/dashboard' 
            : pathname.startsWith(item.href);
            
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                isActive 
                  ? "bg-primary/10 text-primary" 
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.name}
            </Link>
          );
        })}
      </div>

      <div className="p-4 border-t">
        <DemoToggle />
      </div>
    </div>
  );
}

function DemoToggle() {
  const { isDemoMode, toggleDemoMode } = require('@/store/demo-store').useDemoStore();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border">
      <div>
        <p className="text-xs font-semibold">Demo Mode</p>
        <p className="text-[10px] text-muted-foreground">Mock data enabled</p>
      </div>
      <button 
        onClick={toggleDemoMode}
        className={cn(
          "relative inline-flex h-5 w-9 items-center rounded-full transition-colors",
          isDemoMode ? "bg-primary" : "bg-muted-foreground/30"
        )}
      >
        <span 
          className={cn(
            "inline-block h-3 w-3 transform rounded-full bg-white transition-transform",
            isDemoMode ? "translate-x-5" : "translate-x-1"
          )}
        />
      </button>
    </div>
  );
}
