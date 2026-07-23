import React from 'react';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="container py-24 sm:py-32 flex flex-col items-center text-center space-y-8">
      <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-foreground">
        Discover <span className="text-primary">Biodiversity</span> with AI
      </h1>
      <p className="max-w-2xl text-lg text-muted-foreground">
        BioTrace accelerates environmental DNA (eDNA) research. Upload samples, identify species with high confidence, and contribute to global biodiversity tracking.
      </p>
      <div className="flex gap-4 items-center">
        <Link href="/register" className="bg-primary text-primary-foreground px-6 py-3 rounded-md font-medium hover:bg-primary/90 transition-colors shadow-sm">
          Get Started
        </Link>
        <Link href="/projects" className="bg-secondary text-secondary-foreground px-6 py-3 rounded-md font-medium hover:bg-secondary/80 transition-colors shadow-sm">
          Explore Projects
        </Link>
      </div>
    </div>
  );
}
