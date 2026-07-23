'use client';

import React from 'react';
import { Search, Menu, ChevronRight } from 'lucide-react';
import { ThemeToggle } from '@/components/shared/theme-toggle';
import { UserNav } from '@/components/shared/user-nav';
import { usePathname } from 'next/navigation';
import { NotificationsDropdown } from '@/components/layout/notifications-dropdown';

export function TopHeader() {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);

  const getBreadcrumbs = () => {
    if (segments.length === 0) return [];
    if (segments.length === 1 && segments[0] === 'dashboard') {
      return ['Dashboard', 'Overview'];
    }
    
    return segments.map((segment) => {
      // Custom mapping for known routes
      if (segment.toLowerCase() === 'upload') return 'Upload Sample';
      if (segment.toLowerCase() === 'map') return 'Interactive Map';
      
      // Default formatting: hyphens to spaces and capitalize
      return segment
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    });
  };

  const breadcrumbs = getBreadcrumbs();

  return (
    <header className="h-16 border-b bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/50 sticky top-0 z-40 flex items-center justify-between px-4 md:px-6">
      
      {/* Mobile Menu & Breadcrumbs */}
      <div className="flex items-center gap-4">
        <button className="md:hidden p-2 text-muted-foreground hover:text-foreground">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </button>
        <div className="hidden sm:flex items-center text-sm text-muted-foreground">
          {breadcrumbs.map((crumb, index) => (
            <React.Fragment key={index}>
              <span className={index === breadcrumbs.length - 1 ? "text-foreground font-medium" : ""}>
                {crumb}
              </span>
              {index < breadcrumbs.length - 1 && (
                <span className="mx-2 text-muted-foreground/50">/</span>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-2 md:gap-4">
        <div className="relative hidden md:block">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <input
            type="search"
            placeholder="Search species..."
            className="h-9 w-64 rounded-md border bg-muted/50 pl-9 pr-4 text-sm outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
          />
        </div>
        
        <ThemeToggle />
        
        <NotificationsDropdown />

        <UserNav />
      </div>
    </header>
  );
}
