'use client';

import React from 'react';
import { PageContainer, PageHeader, DashboardCard } from '@/components/shared/wrappers';
import { useUploadWizard } from '@/hooks/use-upload';
import { StepIndicator } from '@/components/upload/step-indicator';
import { Step1Metadata } from '@/components/upload/steps/step-1-metadata';
import { Step2Location } from '@/components/upload/steps/step-2-location';
import { Step3File } from '@/components/upload/steps/step-3-file';
import { Step4Review } from '@/components/upload/steps/step-4-review';
import { ProcessingScreen } from '@/components/upload/processing-screen';
import { motion, AnimatePresence } from 'framer-motion';

const stepVariants = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 }
};

export default function UploadPage() {
  const { currentStep, isProcessing, processingStage } = useUploadWizard();

  if (isProcessing) {
    return <ProcessingScreen stage={processingStage} />;
  }

  return (
    <PageContainer className="max-w-4xl">
      <PageHeader 
        title="Upload eDNA Sample" 
        description="Follow the steps to submit a new sample for ML species identification."
      />

      <div className="py-6">
        <StepIndicator currentStep={currentStep} />
      </div>

      <DashboardCard className="overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            variants={stepVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
            className="p-2"
          >
            {currentStep === 1 && <Step1Metadata />}
            {currentStep === 2 && <Step2Location />}
            {currentStep === 3 && <Step3File />}
            {currentStep === 4 && <Step4Review />}
          </motion.div>
        </AnimatePresence>
      </DashboardCard>
    </PageContainer>
  );
}
