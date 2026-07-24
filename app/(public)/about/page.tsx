import React from 'react';
import Link from 'next/link';
import { Target, Lightbulb, Activity, Database, Users, Globe } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="container py-12 md:py-16 max-w-5xl">
      {/* Hero Section */}
      <div className="text-center mb-16 space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
          About <span className="text-primary">BioTrace</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          We are building the world's most advanced environmental DNA (eDNA) platform to accelerate global biodiversity monitoring.
        </p>
      </div>

      {/* Mission & Problem */}
      <div className="grid md:grid-cols-2 gap-12 mb-20">
        <div className="space-y-4">
          <div className="h-12 w-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-6">
            <Target className="h-6 w-6" />
          </div>
          <h2 className="text-2xl font-bold">Our Mission</h2>
          <p className="text-muted-foreground leading-relaxed">
            Our mission is to democratize access to advanced ecological research tools. By combining eDNA sequencing with cutting-edge machine learning, BioTrace empowers researchers, conservationists, and citizen scientists to identify and track biodiversity with unprecedented speed and accuracy.
          </p>
        </div>
        <div className="space-y-4">
          <div className="h-12 w-12 bg-orange-500/10 rounded-xl flex items-center justify-center text-orange-500 mb-6">
            <Lightbulb className="h-6 w-6" />
          </div>
          <h2 className="text-2xl font-bold">The Problem</h2>
          <p className="text-muted-foreground leading-relaxed">
            Traditional biodiversity monitoring is slow, expensive, and often invasive. Identifying species requires expert taxonomists and weeks of manual labor. As global ecosystems face unprecedented threats, we need faster, scalable solutions to track environmental changes before it's too late.
          </p>
        </div>
      </div>

      {/* Technology & Workflow */}
      <div className="bg-muted/30 rounded-3xl p-8 md:p-12 mb-20 border">
        <h2 className="text-3xl font-bold text-center mb-12">How BioTrace Works</h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center space-y-4">
            <div className="h-16 w-16 bg-blue-500/10 text-blue-500 rounded-full flex items-center justify-center mx-auto">
              <Activity className="h-8 w-8" />
            </div>
            <h3 className="font-semibold text-xl">1. eDNA Workflow</h3>
            <p className="text-sm text-muted-foreground">
              Researchers collect environmental samples (water, soil, air) and sequence the trace DNA left behind by organisms, generating raw FASTA files.
            </p>
          </div>
          <div className="text-center space-y-4">
            <div className="h-16 w-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto">
              <Database className="h-8 w-8" />
            </div>
            <h3 className="font-semibold text-xl">2. ML Prediction Pipeline</h3>
            <p className="text-sm text-muted-foreground">
              Our custom machine learning models analyze the nucleotide sequences against global taxonomies, instantly predicting species presence with high confidence.
            </p>
          </div>
          <div className="text-center space-y-4">
            <div className="h-16 w-16 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mx-auto">
              <Users className="h-8 w-8" />
            </div>
            <h3 className="font-semibold text-xl">3. Community Science</h3>
            <p className="text-sm text-muted-foreground">
              Results are aggregated into public community projects, mapping global biodiversity and providing open-source data to conservationists worldwide.
            </p>
          </div>
        </div>
      </div>

      {/* Impact & Future Vision */}
      <div className="grid md:grid-cols-2 gap-12 mb-20 items-center">
        <div className="order-2 md:order-1 bg-card border rounded-2xl p-8 shadow-sm flex items-center justify-center min-h-[300px]">
          <Globe className="h-32 w-32 text-muted-foreground/20" />
        </div>
        <div className="order-1 md:order-2 space-y-6">
          <h2 className="text-3xl font-bold">Impact & Future Vision</h2>
          <p className="text-muted-foreground leading-relaxed">
            BioTrace is more than just a software platform; it's a foundation for the next generation of ecological preservation. By drastically reducing the time it takes to process eDNA, we are enabling real-time ecosystem monitoring.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Our vision is a global, interconnected network of automated monitoring stations continuously feeding data into the BioTrace platform, providing a live "heartbeat" of the planet's biodiversity.
          </p>
          <div className="pt-4 flex gap-4">
            <Link href="/projects" className="bg-primary text-primary-foreground px-6 py-2.5 rounded-md font-medium hover:bg-primary/90 transition-colors">
              Explore Projects
            </Link>
            <Link href="/register" className="bg-muted text-foreground px-6 py-2.5 rounded-md font-medium hover:bg-muted/80 transition-colors border">
              Join the Platform
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
