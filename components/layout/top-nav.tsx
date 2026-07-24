import React from 'react';
import Link from 'next/link';
import { ThemeToggle } from '@/components/shared/theme-toggle';

export function TopNav() {
  return (
    <header className="h-16 border-b bg-background/80 backdrop-blur-md sticky top-0 z-50">
      <div className="container h-full flex items-center justify-between">
        <Link href="/" className="font-bold text-xl text-primary flex items-center gap-2">
          <img src="/frog.png" alt="BioTrace Logo" className="h-8 w-8 object-contain rounded-md" />
          BioTrace
        </Link>
        
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link href="/projects" className="text-muted-foreground hover:text-foreground transition-colors">
            Projects
          </Link>
          <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
            About
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Link 
            href="/login" 
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Log in
          </Link>
          <Link 
            href="/register" 
            className="text-sm font-medium bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors shadow-sm"
          >
            Sign up
          </Link>
        </div>
      </div>
    </header>
  );
}
