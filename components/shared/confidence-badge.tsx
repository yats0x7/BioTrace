import React from 'react';
import { cn } from '@/lib/utils';
import { ShieldCheck, ShieldAlert, Shield } from 'lucide-react';

interface ConfidenceBadgeProps {
  confidence: number; // 0.0 to 1.0
  className?: string;
}

export function ConfidenceBadge({ confidence, className }: ConfidenceBadgeProps) {
  const percentage = Math.round(confidence * 100);
  
  let colorClass = 'bg-red-500/10 text-red-500 border-red-500/20';
  let Icon = ShieldAlert;
  let label = 'Low Confidence';

  if (percentage >= 80) {
    colorClass = 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20';
    Icon = ShieldCheck;
    label = 'High Confidence';
  } else if (percentage >= 50) {
    colorClass = 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
    Icon = Shield;
    label = 'Moderate Confidence';
  }

  return (
    <div className={cn("inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border", colorClass, className)}>
      <Icon className="w-3.5 h-3.5" />
      <span>{percentage}% - {label}</span>
    </div>
  );
}
