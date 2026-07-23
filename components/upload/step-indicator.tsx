import React from 'react';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';
import type { UploadStep } from '@/store/upload-store';

const steps = [
  { id: 1, name: 'Sample Info' },
  { id: 2, name: 'Location' },
  { id: 3, name: 'File Upload' },
  { id: 4, name: 'Review' },
];

export function StepIndicator({ currentStep }: { currentStep: UploadStep }) {
  return (
    <nav aria-label="Progress">
      <ol role="list" className="flex items-center justify-between">
        {steps.map((step, stepIdx) => (
          <li key={step.name} className={cn("relative", stepIdx !== steps.length - 1 ? "w-full pr-8 sm:pr-20" : "")}>
            {/* Connecting Line */}
            {stepIdx !== steps.length - 1 && (
              <div className="absolute top-4 left-0 -ml-px mt-0.5 w-full h-0.5 bg-muted" aria-hidden="true">
                <div 
                  className={cn("h-full bg-primary transition-all duration-500 ease-in-out")}
                  style={{ width: currentStep > step.id ? '100%' : '0%' }}
                />
              </div>
            )}
            
            <div className="relative flex flex-col items-center group">
              <span className={cn(
                "h-9 w-9 rounded-full flex items-center justify-center text-sm font-medium z-10 transition-colors border-2",
                currentStep > step.id 
                  ? "bg-primary border-primary text-primary-foreground" 
                  : currentStep === step.id 
                    ? "bg-background border-primary text-primary"
                    : "bg-background border-muted text-muted-foreground"
              )}>
                {currentStep > step.id ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <span>{step.id}</span>
                )}
              </span>
              <span className={cn(
                "absolute -bottom-6 text-xs font-medium w-max",
                currentStep >= step.id ? "text-foreground" : "text-muted-foreground"
              )}>
                {step.name}
              </span>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
}
