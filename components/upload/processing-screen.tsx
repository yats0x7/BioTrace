import React from 'react';
import { PageContainer } from '@/components/shared/wrappers';
import { Loader2, CheckCircle2, UploadCloud, FileSearch, Database, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import type { ProcessingStage } from '@/hooks/use-upload';

const STAGES = [
  { id: 'Uploading Sample', icon: UploadCloud },
  { id: 'Uploading Complete', icon: CheckCircle2 },
  { id: 'Analyzing DNA', icon: FileSearch },
  { id: 'Predicting Species', icon: Sparkles },
  { id: 'Saving Results', icon: Database },
  { id: 'Analysis Complete', icon: CheckCircle2 },
];

export function ProcessingScreen({ stage }: { stage?: ProcessingStage }) {
  const currentStageIndex = STAGES.findIndex(s => s.id === stage) || 0;

  return (
    <PageContainer className="flex items-center justify-center min-h-[60vh]">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center space-y-8 max-w-md w-full"
      >
        <div className="relative">
          <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
          <div className="h-24 w-24 bg-primary/10 rounded-full flex items-center justify-center relative">
            <Loader2 className="h-12 w-12 text-primary animate-spin" />
          </div>
        </div>
        
        <div className="text-center">
          <h2 className="text-2xl font-bold tracking-tight mb-2">Processing Sample</h2>
          <p className="text-muted-foreground text-sm mb-8">
            Please wait while we run the ML pipeline. Do not close this page.
          </p>
        </div>

        <div className="w-full space-y-4">
          {STAGES.map((s, idx) => {
            const isCompleted = idx < currentStageIndex;
            const isCurrent = idx === currentStageIndex;
            const isPending = idx > currentStageIndex;

            let colorClass = 'text-muted-foreground/50';
            let bgClass = 'bg-muted/50 border-transparent';
            if (isCompleted) {
              colorClass = 'text-emerald-500';
              bgClass = 'bg-emerald-500/10 border-emerald-500/20';
            } else if (isCurrent) {
              colorClass = 'text-primary';
              bgClass = 'bg-primary/10 border-primary/20 shadow-sm';
            }

            const Icon = s.icon;

            return (
              <motion.div 
                key={s.id}
                initial={{ opacity: 0.5, x: -10 }}
                animate={{ 
                  opacity: isPending ? 0.4 : 1, 
                  x: 0,
                  scale: isCurrent ? 1.02 : 1
                }}
                className={`flex items-center gap-4 p-3 rounded-lg border transition-all duration-500 ${bgClass}`}
              >
                <div className={`p-2 rounded-full ${isCurrent ? 'bg-background shadow-sm' : ''}`}>
                  {isCurrent ? <Loader2 className={`h-5 w-5 animate-spin ${colorClass}`} /> : <Icon className={`h-5 w-5 ${colorClass}`} />}
                </div>
                <span className={`font-medium text-sm ${isCurrent ? 'text-foreground' : isCompleted ? 'text-foreground/80' : 'text-muted-foreground'}`}>
                  {s.id}
                </span>
                {isCompleted && <CheckCircle2 className="h-4 w-4 text-emerald-500 ml-auto" />}
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </PageContainer>
  );
}
