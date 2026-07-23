import { useMutation, useQueryClient } from '@tanstack/react-query';
import { uploadService } from '@/services/upload.service';
import { mlService } from '@/services/ml.service';
import { useUploadStore } from '@/store/upload-store';
import { useAuthStore } from '@/store/auth-store';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export type ProcessingStage = 
  | 'Uploading Sample'
  | 'Uploading Complete'
  | 'Analyzing DNA'
  | 'Predicting Species'
  | 'Saving Results'
  | 'Analysis Complete';

export function useUploadWizard() {
  const { 
    currentStep, 
    metadata, 
    selectedFile, 
    setStep, 
    nextStep, 
    prevStep, 
    updateMetadata, 
    setFile, 
    setProcessing,
    reset 
  } = useUploadStore();
  
  const { user } = useAuthStore();
  const queryClient = useQueryClient();
  const router = useRouter();
  
  const [processingStage, setProcessingStage] = useState<ProcessingStage>('Uploading Sample');

  const submitUpload = useMutation({
    mutationFn: async () => {
      if (!selectedFile) throw new Error('No file selected');
      if (!user?.id) throw new Error('Not authenticated');
      
      setProcessing(true);
      
      // Stage: Uploading Sample
      setProcessingStage('Uploading Sample');
      const sample = await uploadService.processUpload(selectedFile, metadata, user.id);
      
      // Stage: Uploading Complete
      setProcessingStage('Uploading Complete');
      await new Promise(resolve => setTimeout(resolve, 500)); // UI delay for readability
      
      // Stage: Analyzing DNA
      setProcessingStage('Analyzing DNA');
      try {
        // Stage: Predicting Species (ML API Call handles both effectively)
        setProcessingStage('Predicting Species');
        
        // Pass sequence parameters if we are in sequence mode
        const isSeqMode = useUploadStore.getState().uploadMethod === 'sequence';
        const mlParams = useUploadStore.getState().mlParams;
        const sequenceStr = useUploadStore.getState().sequenceString;
        
        const prediction = await mlService.analyzeSample(
          sample.id, 
          sample.storage_url,
          isSeqMode ? sequenceStr : undefined,
          isSeqMode ? mlParams.threshold : undefined,
          isSeqMode ? mlParams.gap : undefined
        );
        
        // Stage: Saving Results (API already saved, we are just finishing)
        setProcessingStage('Saving Results');
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Stage: Analysis Complete
        setProcessingStage('Analysis Complete');
        await new Promise(resolve => setTimeout(resolve, 300));
        
        return { sample, prediction };
      } catch (error: Error | unknown) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        throw new Error(`Upload succeeded, but ML analysis failed: ${message}`);
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['dashboard-stats', user?.id] });
      queryClient.invalidateQueries({ queryKey: ['recent-activity'] });
      queryClient.invalidateQueries({ queryKey: ['identifications'] });
      
      toast.success('Analysis Complete!', {
        description: `Successfully analyzed ${data.prediction.total_sequences} sequences.`,
      });
      
      reset();
      router.push(`/dashboard/results/${data.sample.id}`);
    },
    onError: (error: Error) => {
      setProcessing(false);
      toast.error('Upload Process Failed', {
        description: error.message || 'There was an error processing your sample.',
      });
    }
  });

  return {
    currentStep,
    metadata,
    selectedFile,
    isProcessing: useUploadStore((state) => state.isProcessing),
    processingStage,
    setStep,
    nextStep,
    prevStep,
    updateMetadata,
    setFile,
    submitUpload,
  };
}
