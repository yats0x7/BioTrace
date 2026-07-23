import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string | Date): string {
  if (!date) return '';
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(date));
}

export function formatConfidence(score: number): string {
  return `${(score * 100).toFixed(1)}%`;
}

export function truncate(str: string, length: number): string {
  if (!str) return '';
  if (str.length <= length) return str;
  return `${str.substring(0, length)}...`;
}

export function statusColor(status: 'pending' | 'processing' | 'complete' | 'failed' | string): string {
  switch (status) {
    case 'pending': return 'bg-yellow-500/10 text-yellow-500';
    case 'processing': return 'bg-blue-500/10 text-blue-500';
    case 'complete': return 'bg-emerald-500/10 text-emerald-500';
    case 'failed': return 'bg-red-500/10 text-red-500';
    default: return 'bg-slate-500/10 text-slate-500';
  }
}
