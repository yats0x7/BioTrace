import React from 'react';
import { Bell, Search, Menu } from 'lucide-react';
import { ThemeToggle } from '@/components/shared/theme-toggle';
import { UserNav } from '@/components/shared/user-nav';

export function TopHeader() {
  return (
    <header className="h-16 border-b bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/50 sticky top-0 z-40 flex items-center justify-between px-4 md:px-6">
      
      {/* Mobile Menu & Breadcrumbs */}
      <div className="flex items-center gap-4">
        <button className="md:hidden p-2 text-muted-foreground hover:text-foreground">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </button>
        <div className="hidden sm:flex text-sm text-muted-foreground">
          <span>Dashboard</span>
          <span className="mx-2">/</span>
          <span className="text-foreground font-medium">Overview</span>
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
        
        <button className="relative p-2 text-muted-foreground hover:text-foreground transition-colors rounded-full hover:bg-muted">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-destructive"></span>
          <span className="sr-only">Notifications</span>
        </button>

        <UserNav />
      </div>
    </header>
  );
}
